"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  activeColor?: "slate" | "primary" | "red" | "accent"
}

export const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, isActive = false, activeColor = "primary", children, ...props }, ref) => {
    const colorClasses = {
      slate: "bg-slate-600 text-white",
      primary: "bg-primary text-primary-foreground",
      red: "bg-red-500 text-white",
      accent: "bg-accent text-accent-foreground",
    }

    const getHoverClasses = () => {
      if (isActive) return ""
      
      // Cuando está inactivo, cada botón tiene su propio hover según su color
      switch (activeColor) {
        case "slate":
          return "hover:bg-slate-600 hover:text-white hover:border-slate-600"
        case "primary":
          return "hover:bg-primary hover:text-primary-foreground hover:border-primary"
        case "red":
          return "hover:bg-red-500 hover:text-white hover:border-red-500"
        case "accent":
          return "hover:bg-accent hover:text-accent-foreground hover:border-accent"
        default:
          return "hover:border-accent/50"
      }
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          "border border-input",
          isActive
            ? `${colorClasses[activeColor]} shadow-lg border-0 hover:scale-105`
            : `bg-background ${getHoverClasses()}`,
          className
        )}
        style={
          isActive
            ? {
                backgroundColor:
                  activeColor === "slate"
                    ? "#475569"
                    : activeColor === "red"
                      ? "#ef4444"
                      : activeColor === "primary"
                        ? "var(--color-primary)"
                        : "var(--color-accent)",
                color:
                  activeColor === "slate" || activeColor === "red"
                    ? "#ffffff"
                    : activeColor === "primary"
                      ? "var(--color-primary-foreground)"
                      : "var(--color-accent-foreground)",
              }
            : undefined
        }
        onMouseEnter={(e) => {
          if (isActive) {
            const bgColor =
              activeColor === "slate"
                ? "#475569"
                : activeColor === "red"
                  ? "#ef4444"
                  : activeColor === "primary"
                    ? "var(--color-primary)"
                    : "var(--color-accent)"
            const textColor =
              activeColor === "slate" || activeColor === "red"
                ? "#ffffff"
                : activeColor === "primary"
                  ? "var(--color-primary-foreground)"
                  : "var(--color-accent-foreground)"
            e.currentTarget.style.setProperty("background-color", bgColor, "important")
            e.currentTarget.style.setProperty("color", textColor, "important")
          }
        }}
        onMouseLeave={(e) => {
          if (isActive) {
            const bgColor =
              activeColor === "slate"
                ? "#475569"
                : activeColor === "red"
                  ? "#ef4444"
                  : activeColor === "primary"
                    ? "var(--color-primary)"
                    : "var(--color-accent)"
            const textColor =
              activeColor === "slate" || activeColor === "red"
                ? "#ffffff"
                : activeColor === "primary"
                  ? "var(--color-primary-foreground)"
                  : "var(--color-accent-foreground)"
            e.currentTarget.style.setProperty("background-color", bgColor, "important")
            e.currentTarget.style.setProperty("color", textColor, "important")
          }
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
FilterButton.displayName = "FilterButton"


