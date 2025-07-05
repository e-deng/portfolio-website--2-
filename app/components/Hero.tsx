"use client"

import { motion, MotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Rocket, Mail } from "lucide-react"
import { TypewriterText } from "./TypewriterText"

interface HeroProps {
  isDark: boolean
  backgroundY: MotionValue<number>
}

export function Hero({ isDark, backgroundY }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <motion.div
        style={{ y: backgroundY }}
        className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-gray-800/30 to-gray-700/30" : "bg-gradient-to-br from-sky-200/30 to-blue-300/30"}`}
      />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Hey!
          </motion.div>
          <div className={`text-2xl md:text-3xl ${isDark ? "text-gray-300" : "text-gray-700"} font-light`}>
            I am{" "}
            <TypewriterText
              phrases={[
                "a Software Engineer.",
                "Emen.",
                "a New Grad.",
                "a Full Stack Developer.",
                "a Problem Solver.",
                "a Tech Enthusiast.",
                "ready to innovate.",
                "looking for new opportunities.",
                "a quick learner.",
                "a creative thinker.",
                "passionate about code.",
                "building the future.",
                "a team player.",
                "always learning.",
                "a detail-oriented developer.",
                "crafting digital experiences.",
                "solving complex problems.",
                "a lifelong student.",
                "bringing ideas to life.",
              ]}
              delay={100}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto leading-relaxed`}
          >
            Eager to innovate and excited for new opportunities ✨
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Rocket className="w-5 h-5 mr-2" />
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-sky-300 text-sky-700 hover:bg-sky-50 bg-transparent"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 