import { configureStore } from "@reduxjs/toolkit"

import todoSlice from "@/redux/features/todoSlice"

export const store = configureStore({
  reducer: {
    todoReducer: todoSlice,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
