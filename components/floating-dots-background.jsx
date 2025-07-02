"use client"

import { useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"

export default function FloatingDotsBackground() {
  const [dots, setDots] = useState([])
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  const currentTheme = theme === "system" ? resolvedTheme : theme

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100
    // optionally use mouse position later
  }, [])

  useEffect(() => {
    if (mounted) return
    setMounted(true)
    window.addEventListener("mousemove", handleMouseMove)

    const initialDots = Array.from({ length: 50 }, (_, i) => {
      const patterns = ["float", "orbit"]
      const pattern = patterns[i % patterns.length]
      const x = Math.random() * 100
      const y = Math.random() * 100
      return {
        id: i,
        x,
        y,
        pattern,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        centerX: x,
        centerY: y,
        radius: Math.random() * 10 + 5,
        animationSpeed: Math.random() * 0.01 + 0.005,
      }
    })

    setDots(initialDots)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mounted, handleMouseMove])

  useEffect(() => {
    if (!mounted || dots.length === 0) return

    const animateDots = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => {
          let { x, y, speedX, speedY } = dot

          if (dot.pattern === "float") {
            x = (x + speedX + 100) % 100
            y = (y + speedY + 100) % 100
          } else if (dot.pattern === "orbit") {
            dot.angle += dot.animationSpeed
            x = dot.centerX + Math.cos(dot.angle) * dot.radius
            y = dot.centerY + Math.sin(dot.angle) * dot.radius
          }

          return { ...dot, x, y }
        })
      )
    }

    const interval = setInterval(animateDots, 100)
    return () => clearInterval(interval)
  }, [dots, mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={`absolute rounded-full ${
            currentTheme === "light" ? "bg-black/100" : "bg-primary/100"
          }`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
