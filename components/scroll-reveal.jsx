"use client"

import React from "react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 600,
}) {
  const { ref, isVisible } = useScrollAnimation()

  const getAnimationClasses = () => {
    const base = "transition-all ease-out"
    const durationClass = `duration-[${duration}ms]`

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${base} ${durationClass} opacity-0 translate-y-8`
        case "fade-down":
          return `${base} ${durationClass} opacity-0 -translate-y-8`
        case "fade-left":
          return `${base} ${durationClass} opacity-0 -translate-x-8`
        case "fade-right":
          return `${base} ${durationClass} opacity-0 translate-x-8`
        case "fade-in":
          return `${base} ${durationClass} opacity-0`
        case "scale-up":
          return `${base} ${durationClass} opacity-0 scale-95`
        default:
          return `${base} ${durationClass} opacity-0 translate-y-8`
      }
    }

    return `${base} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
