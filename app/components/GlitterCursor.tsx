"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface GlitterCursorProps {
  isDark: boolean
}

export const GlitterCursor = ({ isDark }: GlitterCursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [glitterParticles, setGlitterParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      opacity: number
      scale: number
      rotation: number
    }>
  >([])
  const particleIdRef = useRef(0)
  let animationFrame: number

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Create multiple particles per movement for a denser trail
      for (let i = 0; i < 3; i++) {
        const newParticle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 15,
          y: e.clientY + (Math.random() - 0.5) * 15,
          opacity: 1,
          scale: Math.random() * 0.5 + 0.5,
          rotation: Math.random() * 360,
        }

        setGlitterParticles((prev) => [...prev.slice(-25), newParticle]) // Increased max particles
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const updateParticles = () => {
      setGlitterParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            opacity: particle.opacity - 0.03, // Slower fade for longer trail
            scale: particle.scale * 0.98,
          }))
          .filter((particle) => particle.opacity > 0.1),
      )
      animationFrame = requestAnimationFrame(updateParticles)
    }

    animationFrame = requestAnimationFrame(updateParticles)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`fixed w-2 h-2 ${isDark ? "bg-sky-400" : "bg-sky-600"} rounded-full pointer-events-none z-50`}
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />

      {/* Glitter particles */}
      {glitterParticles.map((particle) => (
        <div
          key={particle.id}
          className={`fixed pointer-events-none z-40 w-3 h-3`}
          style={{
            left: particle.x - 6,
            top: particle.y - 6,
            opacity: particle.opacity,
            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
          }}
        >
          <Sparkles className={`w-full h-full ${isDark ? "text-sky-300" : "text-sky-500"}`} />
        </div>
      ))}
    </>
  )
} 