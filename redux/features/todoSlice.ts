import { ITodo } from "@/interfaces/Todo"
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

import { notifySucess, notifyError } from "@/components/ui/alert"

import { getAllTodos, deleteTodo, addTodo, checkTodo } from "@/lib/todo"

const initialState = {
  isTodosLoading: true,
  isAdding: false,
  todos: [],
} as any

// get all todos
export const getTodos = createAsyncThunk(
  "todo/getAllTodos",
  async (payload, { rejectWithValue }) => {
    let todos: ITodo

    try {
      // Retrieve the todos from localStorage
      let storedTodos = getTodosFromLocalStorage()

      if (storedTodos) {
        return storedTodos
      }

      // @ts-ignore
      todos = await getAllTodos()

      if (todos) {
        storeTodosInLocalStorage(todos)

        return todos
      } else {
        notifyError("Error to fetch occur.")
        return []
      }
    } catch (error) {
      return rejectWithValue("Something went wrong!")
    }
  }
)

// add todo
export const add = createAsyncThunk(
  "todo/add",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      // @ts-ignore
      const id = payload.id as number
      // @ts-ignore
      const title = payload.title as string

      // @ts-ignore
      const todo = await addTodo(id, title)

      if (todo.status === 201) {
        notifySucess("Succefull add todo.")
        dispatch(update({ success: true, id, title, completed: false }))
        dispatch(getTodos())
      } else {
        notifyError("Error when adding.")
        return { success: false }
      }
    } catch (error) {
      return rejectWithValue("Something went wrong!")
    }
  }
)

// check todo
export const check = createAsyncThunk(
  "todo/check",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      // @ts-ignore
      const id = payload.id as number
      // @ts-ignore
      const completed = !payload.completed as boolean
      // @ts-ignore
      const todo = await checkTodo(id, completed)

      if (todo.status === 200) {
        dispatch(checkIt({ success: true, id, completed }))
        dispatch(getTodos())
      } else {
        notifyError("Error when checking.")
        // @ts-ignore
        dispatch(getAllTodos())
        return { success: false }
      }
    } catch (error) {
      return rejectWithValue("Something went wrong!")
    }
  }
)

// delete todo
export const delTodo = createAsyncThunk(
  "todo/deleted",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      // @ts-ignore
      const id = payload.id as number

      // @ts-ignore
      const todo = await deleteTodo(id)

      if (todo.status === 200) {
        notifySucess("Succefull delete todo.")
        dispatch(remove({ success: true, id }))
        dispatch(getTodos())
      } else {
        notifyError("Error to delete occur.")
        return { success: false }
      }
    } catch (error) {
      return rejectWithValue("Something went wrong!")
    }
  }
)

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    update(state, { payload }) {
      const { success, id, title, completed } = payload as any

      if (success) {
        state.todos.push({ id, title, completed })
        storeTodosInLocalStorage(current(state).todos)
      }
    },
    remove(state, { payload }) {
      const { success, id } = payload as any

      if (success) {
        state.todos = state.todos.filter((todo: any) => todo.id != id)
        storeTodosInLocalStorage(current(state).todos)
      }
    },
    checkIt(state, { payload }) {
      const { success, id, completed } = payload as any

      if (success) {
        state.todos = state.todos.map((todo: ITodo) => {
          // If the current todo's id matches the id we're looking for
          if (todo.id === id) {
            // Return a new todo with the completed property updated
            return { ...todo, completed }
          } else {
            // Return the unchanged toto
            return todo
          }
        })

        storeTodosInLocalStorage(current(state).todos)
      }
    },
  },
  extraReducers: (builder) => {
    // get all user created by users themself
    builder.addCase(getTodos.pending, (state, { payload }) => {
      state.isTodosLoading = true
    })
    builder.addCase(getTodos.fulfilled, (state, { payload }) => {
      state.todos = payload
      state.isTodosLoading = false
    })
    builder.addCase(getTodos.rejected, (state, { payload }) => {
      state.isTodosLoading = false
    })
    // add todo
    builder.addCase(add.pending, (state, { payload }) => {
      state.isAdding = true
    })
    builder.addCase(add.fulfilled, (state, { payload }) => {
      state.isAdding = false
    })
    builder.addCase(add.rejected, (state, { payload }) => {
      state.isAdding = false
    })
    // check todo
    builder.addCase(check.pending, (state, { payload }) => {
      state.isChecking = true
    })
    builder.addCase(check.fulfilled, (state, { payload }) => {
      state.isChecking = false
    })
    builder.addCase(check.rejected, (state, { payload }) => {
      state.isChecking = false
    })
    // deleted todo
    builder.addCase(delTodo.pending, (state, { payload }) => {
      state.isdeleting = true
    })
    builder.addCase(delTodo.fulfilled, (state, { payload }) => {
      state.isdeleting = false
    })
    builder.addCase(delTodo.rejected, (state, { payload }) => {
      state.isdeleting = false
    })
  },
})

export const { update, remove, checkIt } = todoSlice.actions

export default todoSlice.reducer

const getTodosFromLocalStorage = () => {
  // Retrieve the string from localStorage
  let storedTodos = localStorage.getItem("todos")
  // Parse the string back into an array of objects
  const storedTodosArray = JSON.parse(storedTodos!)
  return storedTodosArray
}

const storeTodosInLocalStorage = (todos: ITodo) => {
  // Convert the array of objects to a string
  const arrayOfObjectsString = JSON.stringify(todos)

  // Store the string in localStorage with a chosen key
  localStorage.setItem("todos", arrayOfObjectsString)
}
