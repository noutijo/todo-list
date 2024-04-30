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
        className="input-border-style"
      />
      <button
        disabled={title == "" ? true : false}
        onClick={addTodo}
        className={`${
          title == "" ? "opacity-70" : ""
        } w-full md:w-fit px-4 py-2 bg-primaryColor text-white rounded-full`}>
        Add
      </button>
    </div>
  )
}
