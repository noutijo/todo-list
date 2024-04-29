"use client"

import AddTodo from "./AddTodo"

export default function Todos() {
  const handleAddTodo = (title: string) => {}
  return (
    <div className="text-sm flex flex-col h-auto gap-6 w-full md:max-w-2xl lg:max-w-xl bg-white p-6 lg:p-8 rounded-2xl relative text-black">
      <h1 className="font-bold text-2xl">Todo App</h1>
      <AddTodo onAddTodo={handleAddTodo} />
    </div>
  )
}
