import { toast } from "react-toastify"

//notification if sucess
export const notifySucess = (msg?: string) =>
  toast(`${msg || "Made Successfully."}`, {
    type: `success`,
    position: "top-center",
  })

//notification if error
export const notifyError = (msg?: string) =>
  toast(`${msg || "Error to proceed."}`, {
    type: `error`,
    position: "top-center",
  })
