import { BASE_API } from "backend-apis/_endpointPaths"

// get all todos
export const getAllTodos = async () => {
  const res = await fetch(`${BASE_API}`, {
    method: "GET",
  })

  return res.json()
}

// delete todo
export const deleteTodo = async (id: number) => {
  const res = await fetch(`${BASE_API}/${id}`, {
    method: "DELETE",
  })

  return res
}
