import { ITodo } from "@/interfaces/Todo"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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
    try {
      // @ts-ignore
      const todos = await getAllTodos()
      if (todos) {
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
      const title = payload.title as string

      // @ts-ignore
      const todo = await addTodo(title)

      if (todo.status === 201) {
        notifySucess("Succefull add todo.")
        // @ts-ignore
        dispatch(getAllTodos())
        return { success: true }
      } else {
        notifyError("Error when adding.")
        // @ts-ignore
        dispatch(getAllTodos())
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
        // @ts-ignore
        dispatch(getAllTodos())
        return { success: true, id, completed } as any
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
  async (payload, { rejectWithValue }) => {
    try {
      // @ts-ignore
      const id = payload.id as number

      // @ts-ignore
      const todo = await deleteTodo(id)

      if (todo.status === 200) {
        notifySucess("Succefull delete todo.")
        return { success: true, id } as any
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
  name: "todo",
  initialState,
  reducers: {},
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
      const { id, completed } = payload
      console.log("fullkl", completed)
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
      const { id } = payload

      state.todos = state.todos.filter((todo: any) => todo.id != id)

      state.isdeleting = false
    })
    builder.addCase(delTodo.rejected, (state, { payload }) => {
      state.isdeleting = false
    })
  },
})

export default todoSlice.reducer
