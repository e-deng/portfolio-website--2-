"use client"

import { motion } from "framer-motion"
import { Heart, Star } from "lucide-react"

interface FloatingElementsProps {
  isDark: boolean
}

export const FloatingElements = ({ isDark }: FloatingElementsProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Original floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute w-2 h-2 ${isDark ? "bg-purple-300/30" : "bg-sky-300/30"} rounded-full`}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Floating Cinnamoroll stickers - day theme */}
      {!isDark &&
        [...Array(12)].map((_, i) => (
          <motion.div
            key={`cinna-${i}`}
            className="absolute"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-white to-blue-100 rounded-full border-2 border-pink-200 flex items-center justify-center shadow-lg">
              <Heart className="w-4 h-4 text-pink-400" />
            </div>
          </motion.div>
        ))}

      {/* Floating space elements - night theme */}
      {isDark &&
        [...Array(12)].map((_, i) => (
          <motion.div
            key={`space-${i}`}
            className="absolute"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-900 to-purple-800 rounded-full border-2 border-purple-400 flex items-center justify-center shadow-lg">
              <span className="text-sm">{["🌙", "⭐", "🌟", "✨"][i % 4]}</span>
            </div>
          </motion.div>
        ))}

      {/* Floating star elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Star className={`w-4 h-4 ${isDark ? "text-yellow-300/60" : "text-pink-300/60"}`} />
        </motion.div>
      ))}
    </div>
  )
} 