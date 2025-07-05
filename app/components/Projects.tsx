"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, ChevronUp, ChevronDown, Github, Rocket } from "lucide-react"
import { projects, Project } from "../data/projects"

interface ProjectsProps {
  isDark: boolean
}

export function Projects({ isDark }: ProjectsProps) {
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Get projects to display (first 3 or all)
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3)

  return (
    <section id="projects" className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-4`}>
            <Code className="inline w-8 h-8 mr-3 text-sky-600" />
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              isDark={isDark} 
            />
          ))}
        </div>

        {/* View More Button */}
        {projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setShowAllProjects(!showAllProjects)}
              size="lg"
              variant="outline"
              className={`border-2 transition-all duration-300 ${
                isDark 
                  ? "border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-gray-900" 
                  : "border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
              }`}
            >
              {showAllProjects ? (
                <>
                  <ChevronUp className="w-5 h-5 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 mr-2" />
                  View More Projects
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isDark: boolean
}

function ProjectCard({ project, index, isDark }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`${isDark ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-sky-200"} backdrop-blur-sm rounded-lg border shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={400}
          height={200}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant={project.status === "Completed" ? "default" : "secondary"}
            className={`${project.status === "Completed" ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"} text-white`}
          >
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
          {project.title}
        </h3>
        <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tech.length - 3} more
            </Badge>
          )}
        </div>

        {/* Timeline */}
        <div className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          ⏱️ {project.timeline}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {project.github !== "#" && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1" />
                Code
              </a>
            </Button>
          )}
          {project.colab && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.colab} target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.941 4.976a3.438 3.438 0 0 0-2.906 1.504c-.383.548-.594 1.194-.594 1.869 0 .675.211 1.321.594 1.869a3.438 3.438 0 0 0 2.906 1.504c.675 0 1.321-.211 1.869-.594.548-.383 1.194-.594 1.869-.594s1.321.211 1.869.594c.548.383 1.194.594 1.869.594a3.438 3.438 0 0 0 2.906-1.504c.383-.548.594-1.194.594-1.869 0-.675-.211-1.321-.594-1.869a3.438 3.438 0 0 0-2.906-1.504c-.675 0-1.321.211-1.869.594-.548.383-1.194-.594-1.869-.594s-1.321-.211-1.869-.594c-.548-.383-1.194-.594-1.869-.594z"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                Colab
              </a>
            </Button>
          )}
          {project.demo !== "#" && project.demo !== "" && (
            <Button size="sm" className="bg-sky-600 hover:bg-sky-700" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Rocket className="w-4 h-4 mr-1" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
} 