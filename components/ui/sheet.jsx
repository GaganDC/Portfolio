"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"

import { cn } from "/React-App/merged_my_portfolio/lib/utils"
import { X } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = ({ className, ...props }) => (
  <SheetPrimitive.Portal className={cn(className)} {...props} />
)
SheetPortal.displayName = SheetPrimitive.Portal.displayName

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = {
  left: "left-0 top-0 h-full w-[80%] sm:max-w-sm",
  right: "right-0 top-0 h-full w-[80%] sm:max-w-sm",
  top: "top-0 left-0 w-full h-[80%] sm:max-h-screen",
  bottom: "bottom-0 left-0 w-full h-[80%] sm:max-h-screen",
}

const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out",
          sheetVariants[side],
          className
        )}
        {...props}
      >
        {/* ✅ Accessibility Title Fix */}
        <SheetPrimitive.Title>
          <VisuallyHidden>Sidebar</VisuallyHidden>
        </SheetPrimitive.Title>

        {children}

        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
)
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetTitle = SheetPrimitive.Title
const SheetDescription = SheetPrimitive.Description

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
}
