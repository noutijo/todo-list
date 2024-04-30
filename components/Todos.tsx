"use client"

import { useEffect, useState } from "react"
import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"
import { QueueListIcon } from "@heroicons/react/24/outline"

export default function Todos() {
  const [todos, setTodos] = useState<
    { id: number; title: string; done: boolean }[]
  >([])

  const handleAddTodo = (title: string) => {}
  const handleCheckTodo = (id: number) => {}
  const handleDeleteTodo = (id: number) => {}

  useEffect(() => {
    loadTodos()
  }, [])

  // fetch todos
  const loadTodos = () => {
    const todoList = [
      { id: 1, title: "Buy milk", done: false },
      { id: 2, title: "Finish homework", done: false },
      { id: 3, title: "Clean the house", done: true },
      { id: 3, title: "Clean the house", done: false },
      { id: 3, title: "Clean the house", done: true },
      { id: 3, title: "Clean the house", done: true },
      { id: 3, title: "Clean the house", done: false },
      { id: 3, title: "Clean the houses", done: false },
    ]

    setTodos(todoList)
  }

  return (
    <div className="text-sm flex flex-col h-auto gap-6 w-full md:max-w-2xl lg:max-w-xl bg-white p-6 lg:p-8 rounded-2xl relative text-black">
      <h1 className="font-bold text-2xl">Todo App</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      {/* list of todos */}
      <div className="divide-y divide flex flex-col max-h-[420px] overflow-y-auto">
        {todos.length >= 1 ? (
          todos?.map((item) => (
            <TodoItem
              key={item.id}
              title={item.title}
              done={item.done}
              onCheckTodo={() => handleCheckTodo(item.id)}
              onDeleteTodo={() => handleDeleteTodo(item.id)}
            />
          ))
        ) : (
          <div className="flex flex-col gap-1 items-center justify-center">
            <QueueListIcon className="h-[32px] w-[32px]  text-primaryColor" />
            <p className="text-gray-400">No todos found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
