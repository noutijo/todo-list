import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Tooltip } from "react-tooltip"
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
      <a
        onClick={checkTodo}
        className="w-full line-clamp-1 font-[500] cursor-pointer"
        data-tooltip-id="my-tooltip"
        data-tooltip-variant="light"
        data-tooltip-delay-show={100}
        data-tooltip-content={title}>
        {title}
      </a>
      <Tooltip
        id="my-tooltip"
        arrowColor="#FF8769"
        className="!max-w-[400px] !ring-1 !ring-gray-200 !text-wrap !h-auto !text-md !font-[500]"
      />
      {/* tittle with tooltip end here */}

      <div
        onClick={deleteTodo}
        className="ring-1 ring-primaryColor p-1 rounded-full">
        <TrashIcon className="h-[14px] w-[14px] text-primaryColor cursor-pointer" />
      </div>
    </div>
  )
}
