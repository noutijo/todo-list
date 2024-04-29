"use client"

import { useState } from "react"

interface IProps {
  onAddTodo: (title: string) => void
}

export default function AddTodo({ onAddTodo }: IProps) {
  let [title, setTitle] = useState<string>("")

  const OnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const addTodo = () => {
    if (title !== "") {
      onAddTodo(title)
      setTitle("")
    } else {
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <input
        onChange={OnChangeTitle}
        value={title}
        type="text"
        placeholder="Add a new todo"
        className="w-full px-3 py-2 outline-none rounded-lg bg-slate-100 hover:bg-slate-50 hover:border-gray-200 border-gray-300 border-[1px]"
      />
      <button
        disabled={title == "" ? true : false}
        onClick={addTodo}
        className={`${
          title == "" ? "opacity-75" : ""
        } w-full md:w-fit px-4 py-2 bg-primaryColor text-white rounded-full`}>
        Add
      </button>
    </div>
  )
}
