"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SectionIndicatorProps {
  isDark: boolean
  scrollToSection: (sectionId: string) => void
}

interface Section {
  id: string
  label: string
}

export function SectionIndicator({ isDark, scrollToSection }: SectionIndicatorProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [sectionOpacities, setSectionOpacities] = useState<Record<string, number>>({})

  const sections: Section[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for better detection
      const windowHeight = window.innerHeight
      const newOpacities: Record<string, number> = {}

      // Calculate opacity for each section based on distance from viewport center
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          const sectionCenter = offsetTop + offsetHeight / 2
          const viewportCenter = scrollPosition + windowHeight / 2
          const distance = Math.abs(sectionCenter - viewportCenter)
          const maxDistance = windowHeight * 0.8 // Distance at which opacity becomes 0.3
          
          // Calculate opacity: closer sections have higher opacity
          const opacity = Math.max(0.3, 1 - (distance / maxDistance))
          newOpacities[section.id] = opacity

          // Set active section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
          }
        }
      })

      setSectionOpacities(newOpacities)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => {
          const opacity = sectionOpacities[section.id] || 0.3
          const isActive = activeSection === section.id
          
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => scrollToSection(section.id)}
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? `${isDark ? "bg-sky-400" : "bg-sky-600"} scale-125`
                    : `${isDark ? "bg-gray-500" : "bg-gray-400"} hover:scale-110`
                }`}
              />
              
              {/* Section Name */}
              <motion.span
                animate={{ opacity }}
                transition={{ duration: 0.2 }}
                className={`text-sm transition-all duration-300 ${
                  isActive 
                    ? "font-bold" 
                    : "font-medium"
                } ${
                  isDark 
                    ? "text-gray-200" 
                    : "text-gray-700"
                } hover:opacity-100`}
              >
                {section.label}
              </motion.span>

              {/* Connecting line */}
              {index < sections.length - 1 && (
                <div className={`absolute left-1.5 top-3 w-px h-8 ${
                  isDark ? "bg-gray-600" : "bg-gray-300"
                }`} />
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
} 