import * as React from "react"
import { cn } from "/React-App/merged_my_portfolio/lib/utils"

const Textarea = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder-muted-foreground focus-visible-none focus-visible-2 focus-visible-ring focus-visible-offset-2 disabled-not-allowed disabled-50 md-sm",
        className
      )}
      ref={ref}
      {...rest}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
