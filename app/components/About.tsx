"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import Image from "next/image"
import { AnimatedCounter } from "./AnimatedCounter"
import { aboutData } from "../data/about"

interface AboutProps {
  isDark: boolean
}

export function About({ isDark }: AboutProps) {
  return (
    <section id="about" className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-4`}>
            <User className="inline w-8 h-8 mr-3 text-sky-600" />
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index} className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-6 mt-8">
              {aboutData.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 ${isDark ? "bg-gradient-to-br from-gray-700 to-gray-600" : "bg-gradient-to-br from-sky-100 to-blue-100"} rounded-lg`}
                >
                  <div className="text-3xl font-bold text-sky-600">
                    <AnimatedCounter end={stat.value} />{stat.suffix}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                  isDark ? "ring-4 ring-gray-700" : "ring-4 ring-sky-200"
                }`}
              >
                <Image
                  src={aboutData.photo}
                  alt="Emen - Software Engineer"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${
                isDark ? "bg-sky-500" : "bg-sky-400"
              } opacity-80`}></div>
              <div className={`absolute -bottom-4 -left-4 w-6 h-6 rounded-full ${
                isDark ? "bg-blue-500" : "bg-blue-400"
              } opacity-60`}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 