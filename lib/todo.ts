import { BASE_API } from "backend-apis/_endpointPaths"

// get all todos
export const getAllTodos = async () => {
  const res = await fetch(`${BASE_API}`, {
    method: "GET",
  })

  return res.json()
}

// add todo
export const addTodo = async (id: number, title: string, completed = false, userId= 1) => {
  const res = await fetch(`${BASE_API}`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      id,
      title,
      completed,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })

  return res
}

// check todo
export const checkTodo = async (id: number, completed: boolean) => {
  const res = await fetch(`${BASE_API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })

  return res
}

// delete todo
export const deleteTodo = async (id: number) => {
  const res = await fetch(`${BASE_API}/${id}`, {
    method: "DELETE",
  })

  return res
}
