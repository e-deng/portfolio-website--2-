"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"

interface GlitterCursorProps {
  isDark: boolean
}

export const GlitterCursor = ({ isDark }: GlitterCursorProps) => {
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
      {/* Glitter particles only */}
      {glitterParticles.map((particle) => (
        <div
          key={particle.id}
          className={`fixed pointer-events-none z-[60] w-3 h-3`}
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