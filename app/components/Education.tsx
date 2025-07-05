"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { education } from "../data/education"

interface EducationProps {
  isDark: boolean
}

export function Education({ isDark }: EducationProps) {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-4`}>
            <GraduationCap className="inline w-8 h-8 mr-3 text-sky-600" />
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${isDark ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-sky-200"} backdrop-blur-sm rounded-lg border shadow-lg p-8`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-2`}>
                    {edu.institution}
                  </h3>
                  <p className={`text-lg font-medium text-sky-600 mb-1`}>
                    {edu.degree}
                  </p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
                    {edu.period}
                  </p>
                  <div className="space-y-2">
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      • Relevant Coursework: {edu.coursework.join(", ")}
                    </p>
                    {edu.gpa && (
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        • GPA: {edu.gpa}
                      </p>
                    )}
                    {edu.honors && edu.honors.map((honor, honorIndex) => (
                      <p key={honorIndex} className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        • {honor}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-800"} mb-3`}>
                    Academic Achievements
                  </h4>
                  <ul className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"} space-y-2 list-disc pl-5`}>
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 