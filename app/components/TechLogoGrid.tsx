"use client"

import { motion } from "framer-motion"

interface TechLogoGridProps {
  isDark: boolean
}

export const TechLogoGrid = ({ isDark }: TechLogoGridProps) => {
  const techLogos = [
    // Programming Languages
    { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "text-yellow-400" },
    { name: "Java", icon: "devicon-java-plain colored", color: "text-red-500" },
    { name: "Python", icon: "devicon-python-plain colored", color: "text-blue-600" },
    { name: "C#", icon: "devicon-csharp-plain colored", color: "text-purple-600" },
    { name: "C", icon: "devicon-c-plain colored", color: "text-blue-500" },
    { name: "SQL", icon: "devicon-mysql-plain colored", color: "text-blue-600" },
    
    // Tools & Frameworks
    { name: "ReactJS", icon: "devicon-react-original colored", color: "text-cyan-400" },
    { name: "Angular", icon: "devicon-angularjs-plain colored", color: "text-red-600" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored", color: "text-blue-600" },
    { name: "Next.js", icon: "devicon-nextjs-plain", color: "text-gray-800" },
    { name: "AWS", icon: "devicon-amazonwebservices-original", color: "text-yellow-500" },
    { name: "Git", icon: "devicon-git-plain colored", color: "text-orange-500" },
    { name: "GitHub", icon: "devicon-github-original", color: "text-gray-800" },
    { name: "Tailwind", icon: "devicon-tailwindcss-plain colored", color: "text-cyan-500" },
    { name: "Unity", icon: "devicon-unity-original", color: "text-gray-600" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "text-green-500" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "text-green-500" },
  ]

  const languages = techLogos.filter(tech => 
    ["JavaScript", "Java", "Python", "C#", "C", "SQL"].includes(tech.name)
  )
  const tools = techLogos.filter(tech => 
    ["ReactJS", "Angular", "TypeScript", "Next.js", "AWS", "Git", "GitHub", "Tailwind", "Unity", "Node.js", "MongoDB"].includes(tech.name)
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Languages Column */}
      <div>
        <h3 className={`text-lg text-center font-semibold mb-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          Programming Languages
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {languages.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.2, y: -5 }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className={`text-4xl ${tech.color}`}>
                <i className={tech.icon}></i>
              </div>
              <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools Column */}
      <div>
        <h3 className={`text-lg text-center font-semibold mb-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          Tools & Frameworks
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {tools.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.2, y: -5 }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className={`text-4xl ${tech.color}`}>
                <i className={tech.icon}></i>
              </div>
              <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 