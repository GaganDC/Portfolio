import * as React from "react"
import { cn } from "../../lib/utils"

const Textarea = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border-none bg-background neu-inset-sm px-3 py-2 text-base ring-offset-background placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...rest}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
