"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  phrases: string[]
  delay?: number
}

export const TypewriterText = ({ phrases, delay = 0 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing - even faster
          if (currentCharIndex < currentPhrase.length) {
            setDisplayText(currentPhrase.slice(0, currentCharIndex + 1))
            setCurrentCharIndex((prev) => prev + 1)
          } else {
            // Pause before deleting - much shorter pause
            setTimeout(() => setIsDeleting(true), 1000)
          }
        } else {
          // Deleting - even faster
          if (currentCharIndex > 0) {
            setDisplayText(currentPhrase.slice(0, currentCharIndex - 1))
            setCurrentCharIndex((prev) => prev - 1)
          } else {
            setIsDeleting(false)
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          }
        }
      },
      delay + (isDeleting ? 0.5 : 1), // Super fast typing
    )

    return () => clearTimeout(timer)
  }, [currentCharIndex, currentPhraseIndex, isDeleting, phrases])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-6 bg-sky-400 ml-1"
      />
    </span>
  )
} 