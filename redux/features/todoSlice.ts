import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { notifySucess, notifyError } from "@/components/ui/alert"

import { getAllTodos, deleteTodo } from "@/lib/todo"

const initialState = {
  isTodosLoading: true,
  todos: [],
} as any

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

export const delTodo = createAsyncThunk(
  "todo/deleted",
  async (payload, { rejectWithValue }) => {
    try {
      // @ts-ignore
      const id = payload.id as number

      // @ts-ignore
      const todo = await deleteTodo(id)
            console.log("resss", todo)

      if (todo.status===200) {
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
    // deleted user by admin
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
