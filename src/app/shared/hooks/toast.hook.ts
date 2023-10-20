import { ToastMessage } from "primereact/toast"
import { useContext } from "react"
import { ToastContext } from "../contexts/toast.context"

export const useToast = () => {
    const { toastRef } = useContext(ToastContext)

    const showSuccess = (message: string, options?: ToastMessage) => {
        toastRef.current?.show({
            severity: "success",
            summary: "Success",
            detail: message,
            ...options,
        })
    }

    const showError = (message: string, options?: ToastMessage) => {
        toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: message,
            ...options,
        })
    }


    return { showSuccess, showError }
}
