import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import "animated-text-letters/index.css"

import { ToastContainer } from "react-toastify"

import StoreWrapper from "@/redux/provider"

const DM_SANS = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo App",
  description: "Stay organized and conquer your day with a to-do list.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <StoreWrapper>
        <body className={`bg-primaryColor ${DM_SANS.className}`}>
          {children}
          <ToastContainer theme="light" hideProgressBar={true} />
        </body>
      </StoreWrapper>
    </html>
  )
}
