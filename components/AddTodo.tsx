"use client"

import { useState } from "react"
import { useAppSelector } from "@/redux/hooks"
import ClipLoader from "react-spinners/ClipLoader"

interface IProps {
  onAddTodo: (title: string) => void
}

export default function AddTodo({ onAddTodo }: IProps) {
  let [title, setTitle] = useState<string>("")

  const isAdding = useAppSelector((state) => state?.todoReducer.isAdding)

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
          title == "" ? "opacity-[40%]" : ""
        } transition-all duration-300 ease-in font-medium w-full md:w-fit px-4 py-2 bg-primaryColor text-white rounded-full flex items-center justify-center`}>
        {isAdding ? (
          <ClipLoader
            color={"#fffff"}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "Add"
        )}
      </button>
    </div>
  )
}
