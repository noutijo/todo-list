const BASE_URL = "https://jsonplaceholder.typicode.com"
const BASE_API = `${BASE_URL}/posts`

export const BackendApiEndpoints = {
  TODOS_LIST: `${BASE_API}`,
  TODO_ITEM: `${BASE_API}/{todo_id}`,
}
