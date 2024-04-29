"use client"

import { useEffect, useState } from "react"
import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"

export default function Todos() {
  const [todos, setTodos] = useState<{ id: number; title: string }[]>([])

  const handleAddTodo = (title: string) => {}
  const handleCheckTodo = (id: number) => {}
  const handleDeleteTodo = (id: number) => {}

  useEffect(() => {
    loadTodos()
  }, [])

  // fetch todos
  const loadTodos = () => {
    const todoList = [
      { id: 1, title: "Buy milk" },
      { id: 2, title: "Finish homework" },
      { id: 3, title: "Clean the house" },
      { id: 3, title: "Clean the house" },
      { id: 3, title: "Clean the house" },
      { id: 3, title: "Clean the house" },
      { id: 3, title: "Clean the house" },
      { id: 3, title: "Clean the houses" },
    ]

    setTodos(todoList)
  }

  return (
    <div className="text-sm flex flex-col h-auto gap-6 w-full md:max-w-2xl lg:max-w-xl bg-white p-6 lg:p-8 rounded-2xl relative text-black">
      <h1 className="font-bold text-2xl">Todo App</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      {/* list of todos */}
      <div className="divide-y divide flex flex-col max-h-[600px] md:max-h-[560px] lg:max-h-[420px] overflow-y-auto">
        {todos.length >= 1
          ? todos?.map((item) => (
              <TodoItem
                key={item.id}
                title={item.title}
                onCheckTodo={() => handleCheckTodo(item.id)}
                onDeleteTodo={() => handleDeleteTodo(item.id)}
              />
            ))
          : ""}
      </div>
    </div>
  )
}
