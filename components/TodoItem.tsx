import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

interface IProps {
  title: string
  completed: boolean
  onCheckTodo: () => void
  onDeleteTodo: () => void
}

export default function TodoItem({
  title,
  onCheckTodo,
  completed = false,
  onDeleteTodo,
}: IProps) {
  let [check, setCheck] = useState<boolean>(completed || false)

  const checkTodo = () => {
    setCheck((val) => !val)
    onCheckTodo()
  }

  const deleteTodo = () => {
    onDeleteTodo()
  }

  return (
    <div className="flex items-center gap-3 py-4 px-1 justify-between">
      <input
        checked={check}
        onChange={checkTodo}
        value={title}
        type="checkbox"
        className="cursor-pointer w-[1.2rem] h-[1.2rem] text-primaryColor bg-gray-100 border-gray-300 rounded focus:ring-primaryColor dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
      />
      {/* tittle with tooltip start here */}
      <p
        onClick={checkTodo}
        className="w-full line-clamps-1 font-[500] h-full cursor-pointer">
        {title}
      </p>
      <div
        onClick={deleteTodo}
        className="ring-1 ring-primaryColor p-1 rounded-full">
        <TrashIcon className="h-[14px] w-[14px] text-primaryColor cursor-pointer" />
      </div>
    </div>
  )
}
