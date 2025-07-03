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
    { name: "SQL", icon: "devicon-mysql-plain colored", color: "text-blue-600" },
    { name: "Python", icon: "devicon-python-plain colored", color: "text-blue-600" },
    { name: "C#", icon: "devicon-csharp-plain colored", color: "text-purple-600" },
    { name: "C", icon: "devicon-c-plain colored", color: "text-blue-500" },
    { name: "MySQL", icon: "devicon-mysql-plain colored", color: "text-orange-500" },
    
    // Tools & Libraries
    { name: "React", icon: "devicon-react-original colored", color: "text-cyan-400" },
    { name: "Git", icon: "devicon-git-plain colored", color: "text-orange-500" },
    { name: "AWS", icon: "devicon-amazonwebservices-original colored", color: "text-yellow-500" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "text-green-500" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "text-green-500" },
    { name: "jQuery", icon: "devicon-jquery-plain colored", color: "text-blue-600" },
    { name: "Express", icon: "devicon-express-original colored", color: "text-gray-600" },
    { name: "REST", icon: "devicon-nginx-original colored", color: "text-green-600" },
    { name: "Jira", icon: "devicon-jira-plain colored", color: "text-blue-500" },
    { name: "Confluence", icon: "devicon-confluence-original colored", color: "text-blue-600" },
    { name: "Insomnia", icon: "devicon-postman-plain colored", color: "text-orange-500" },
    { name: "Unity", icon: "devicon-unity-plain colored", color: "text-gray-600" },
    
    // Other Skills
    { name: "Agile", icon: "devicon-trello-plain colored", color: "text-blue-500" },
    { name: "SDLC", icon: "devicon-github-original colored", color: "text-gray-800 dark:text-white" },
    { name: "SCRUM", icon: "devicon-slack-plain colored", color: "text-purple-500" },
    { name: "Microsoft Office", icon: "devicon-microsoftsqlserver-plain colored", color: "text-red-500" },
    { name: "OracleVM", icon: "devicon-oracle-original colored", color: "text-red-600" },
    { name: "Cameo", icon: "devicon-visualstudio-plain colored", color: "text-purple-600" },
    { name: "Systems", icon: "devicon-linux-plain colored", color: "text-yellow-500" },
  ]

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
      {techLogos.map((tech) => (
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
  )
} 