"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  size?: "default" | "sm" | "lg" | "full"
}

export function Drawer({ open, onClose, children, side = "right", size = "default" }: DrawerProps) {
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  // Calculate width/height based on side and size
  let sizeStyles = {}
  if (side === "left" || side === "right") {
    sizeStyles = {
      width: size === "sm" ? "300px" : size === "lg" ? "500px" : size === "full" ? "100%" : "400px",
      height: "100%",
    }
  } else {
    sizeStyles = {
      height: size === "sm" ? "200px" : size === "lg" ? "500px" : size === "full" ? "100%" : "300px",
      width: "100%",
    }
  }

  // Calculate position based on side
  let positionStyles = {}
  if (side === "left") {
    positionStyles = { top: 0, left: 0 }
  } else if (side === "right") {
    positionStyles = { top: 0, right: 0 }
  } else if (side === "top") {
    positionStyles = { top: 0, left: 0 }
  } else if (side === "bottom") {
    positionStyles = { bottom: 0, left: 0 }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 transition-opacity"
        onClick={onClose}
        style={{ opacity: isOpen ? 1 : 0 }}
      />
      <div
        className={cn(
          "fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out",
          side === "left" && "h-full transform -translate-x-full data-[state=open]:translate-x-0",
          side === "right" && "h-full transform translate-x-full data-[state=open]:translate-x-0",
          side === "top" && "w-full transform -translate-y-full data-[state=open]:translate-y-0",
          side === "bottom" && "w-full transform translate-y-full data-[state=open]:translate-y-0",
        )}
        style={{
          ...sizeStyles,
          ...positionStyles,
          transform: isOpen
            ? "translate(0, 0)"
            : side === "left"
              ? "translateX(-100%)"
              : side === "right"
                ? "translateX(100%)"
                : side === "top"
                  ? "translateY(-100%)"
                  : "translateY(100%)",
        }}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </div>
    </>
  )
}

const DrawerPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}
DrawerPortal.displayName = "DrawerPortal"

const DrawerOverlay = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  ),
)
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerTrigger = React.forwardRef<React.ElementRef<"button">, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "peer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  ),
)
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerClose = React.forwardRef<React.ElementRef<"button">, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
        className,
      )}
      {...props}
    />
  ),
)
DrawerClose.displayName = "DrawerClose"

const DrawerContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top data-[side=left]:slide-in-from-right data-[side=right]:slide-in-from-left data-[side=top]:slide-in-from-bottom",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-6 flex flex-col justify-end space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
DrawerDescription.displayName = "DrawerDescription"

export {
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
