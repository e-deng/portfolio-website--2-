"use client"

import { motion } from "framer-motion"
import { Code } from "lucide-react"
import { TechLogoGrid } from "./TechLogoGrid"

interface SkillsProps {
  isDark: boolean
}

export function Skills({ isDark }: SkillsProps) {
  return (
    <section id="skills" className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-4`}>
            <Code className="inline w-8 h-8 mr-3 text-sky-600" />
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TechLogoGrid isDark={isDark} />
        </motion.div>
      </div>
    </section>
  )
} 