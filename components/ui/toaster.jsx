"use client"

import { useToast } from "/React-App/merged_my_portfolio/hooks/use-toast"
import {  Toast,  ToastClose,  ToastDescription,  ToastProvider,  ToastTitle,  ToastViewport,} from "../ui/toast"; // or correct relative path


export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
