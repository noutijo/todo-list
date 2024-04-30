import { configureStore } from "@reduxjs/toolkit"

import userTodo from "@/redux/features/todoSlice"

export const store = configureStore({
  reducer: {
    todoReducer: userTodo,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
