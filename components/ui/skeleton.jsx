

import { cn } from "/React-App/merged_my_portfolio/lib/utils" 
function Skeleton({
  className,
  ...props
}.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
