"use client"

import { useEffect } from "react"

import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"
import { ITodo } from "@/interfaces/Todo"
import { getTodos, delTodo, add, check } from "@/redux/features/todoSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import AnimatedText from "animated-text-letters"

export default function Todos() {
  // redux custom dispatch
  const dispatch = useAppDispatch()
  //  get redux state
  const allTodos = useAppSelector((state) => state?.todoReducer.todos)
  const isTodosLoading = useAppSelector(
    (state) => state?.todoReducer.isTodosLoading
  )

  const handleAddTodo = (title: string) => {
    const id = new Date().getTime()
    // @ts-ignore
    dispatch(add({ id, title }), {})
  }

  const handleCheckTodo = (id: number, completed: boolean) => {
    // @ts-ignore
    dispatch(check({ id, completed }), {})
  }

  const handleDeleteTodo = async (id: number) => {
    // @ts-ignore
    dispatch(delTodo({ id }), {})
  }

  useEffect(() => {
    const loadAllTodos = async () => {
      dispatch(getTodos())
    }

    loadAllTodos()
  }, [])

  return (
    <div className="text-sm flex flex-col h-auto gap-6 w-full md:max-w-2xl lg:max-w-xl bg-white drop-shadow-xl p-6 lg:p-8 rounded-2xl relative text-black">
      <h1 className="font-bold text-2xl self-start">
        <AnimatedText
          text="Todo App"
          animation="pop-up"
          delay={32}
          easing="ease"
          transitionOnlyDifferentLetters={true}
          animationDuration={2000}
        />
      </h1>
      {/* add todo */}
      <AddTodo onAddTodo={handleAddTodo} />
      {/* list all todos */}
      <div className="divide-y divide flex flex-col max-h-[420px] overflow-y-auto">
        {allTodos?.length >= 1 && isTodosLoading == false ? (
          allTodos?.map((item: ITodo) => (
            <TodoItem
              key={item.id}
              title={item.title}
              completed={item.completed}
              onCheckTodo={() => handleCheckTodo(item.id, item.completed)}
              onDeleteTodo={() => handleDeleteTodo(item.id)}
            />
          ))
        ) : allTodos?.length < 1 && isTodosLoading == false ? (
          <NoTodosFound />
        ) : (
          ""
        )}
        {/* loading skeleton when fetching todos */}
        {isTodosLoading ? <LoadingSkeleton /> : ""}
      </div>
    </div>
  )
}

// afficher en cas de non disponibilité de todos
import { QueueListIcon } from "@heroicons/react/24/outline"

const NoTodosFound = () => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <QueueListIcon className="h-[32px] w-[32px]  text-primaryColor" />
      <p className="text-gray-400">No todos found.</p>
    </div>
  )
}

// loading skeleton
const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse w-full flex flex-col gap-3 items-center justify-center">
      {["", "", "", "", "", "", "", "", ""].map((_, __) => (
        <div key={__} className="rounded bg-slate-200 h-9 w-full"></div>
      ))}
    </div>
  )
}
