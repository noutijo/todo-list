"use client"

import { Provider } from "react-redux"
import { store } from "@/redux/store"

interface IProps {
  children: React.ReactNode
}

export default function StoreWrapper({ children }: IProps) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  )
}
