"use client"

import { motion } from "framer-motion"
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { experiences } from "../data/experiences"
import { useState } from "react"

interface ExperienceProps {
  isDark: boolean
}

export function Experience({ isDark }: ExperienceProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3)

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-4`}>
            <Briefcase className="inline w-8 h-8 mr-3 text-sky-600" />
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-sky-400 to-blue-600"></div>
          {displayedExperiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                <motion.div whileHover={{ scale: 1.05 }} className="group">
                  <Card
                    className={`${isDark ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-sky-200"} backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}
                  >
                    <CardHeader>
                      <CardTitle className="text-sky-700">{exp.title}</CardTitle>
                      <CardDescription className="text-gray-600 font-medium">
                        {exp.company} • {exp.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{exp.description}</p>

                      {/* Expandable content */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200 hidden group-hover:block"
                      >
                        <h4 className="font-medium text-sm mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-sky-100 text-sky-700">
                              {tech}
                            </Badge>
                          ))}
                          {exp.technologies.length === 0 && (
                            <span className="text-sm text-gray-500">No specific technologies listed</span>
                          )}
                        </div>

                        <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex}>{achievement}</li>
                          ))}
                        </ul>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-lg"></div>
            </motion.div>
          ))}
        </div>

        {/* See More/Less Button */}
        {experiences.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-8"
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className={`${
                isDark 
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100" 
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              } transition-all duration-300`}
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  See More ({experiences.length - 3} more)
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
} 