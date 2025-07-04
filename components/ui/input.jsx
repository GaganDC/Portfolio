import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(function Input(
  { className, type = "text", value, defaultValue, onChange, ...props },
  ref
) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      // 👇 This avoids the "read-only" warning
      {...(onChange ? { value, onChange } : { defaultValue })}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }
