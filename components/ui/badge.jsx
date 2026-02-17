import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"// adjust this path as needed

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border-none px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground neu-raised-sm",
        secondary: "bg-secondary text-secondary-foreground neu-raised-sm",
        destructive: "bg-destructive text-destructive-foreground neu-raised-sm",
        outline: "text-foreground neu-raised-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
