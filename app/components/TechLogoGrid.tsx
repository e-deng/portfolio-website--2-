"use client"

import { motion } from "framer-motion"

interface TechLogoGridProps {
  isDark: boolean
}

export const TechLogoGrid = ({ isDark }: TechLogoGridProps) => {
  const techCategories = [
    {
      title: "Programming Languages",
      techs: [
        { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "text-yellow-400" },
        { name: "Java", icon: "devicon-java-plain colored", color: "text-red-500" },
        { name: "Python", icon: "devicon-python-plain colored", color: "text-blue-600" },
        { name: "C#", icon: "devicon-csharp-plain colored", color: "text-purple-600" },
        { name: "SQL", icon: "devicon-mysql-plain colored", color: "text-blue-600" },
        { name: "HTML", icon: "devicon-html5-plain colored", color: "text-orange-500" },
      ]
    },
    {
      title: "Frontend Technologies",
      techs: [
        { name: "ReactJS", icon: "devicon-react-original colored", color: "text-cyan-400" },
        { name: "Angular", icon: "devicon-angularjs-plain colored", color: "text-red-600" },
        { name: "TypeScript", icon: "devicon-typescript-plain colored", color: "text-blue-600" },
        { name: "Next.js", icon: "devicon-nextjs-plain", color: "text-gray-800" },
        { name: "Tailwind", icon: "devicon-tailwindcss-plain colored", color: "text-cyan-500" },
      ]
    },
    {
      title: "Backend & Cloud",
      techs: [
        { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "text-green-500" },
        { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "text-green-500" },
        { name: "AWS", icon: "devicon-amazonwebservices-original", color: "text-yellow-500" },
      ]
    },
    {
      title: "Development Tools",
      techs: [
        { name: "Git", icon: "devicon-git-plain colored", color: "text-orange-500" },
        { name: "GitHub", icon: "devicon-github-original", color: "text-gray-800" },
        { name: "VS Code", icon: "devicon-vscode-plain colored", color: "text-blue-500" },
        { name: "Unity", icon: "devicon-unity-original", color: "text-gray-600" },
      ]
    },
    {
      title: "AI & Machine Learning",
      techs: [
        { name: "Google Colab", icon: "devicon-google-plain colored", color: "text-blue-500" },
        { name: "Anaconda", icon: "devicon-anaconda-plain colored", color: "text-green-600" },
      ]
    },
    {
      title: "Design & Productivity",
      techs: [
        { name: "Canva", icon: "devicon-canva-plain colored", color: "text-blue-500" },
        { name: "Jira", icon: "devicon-jira-plain colored", color: "text-blue-600" },
        { name: "Figma", icon: "devicon-figma-plain colored", color: "text-purple-600" },

      ]
    }
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {techCategories.map((category) => (
        <div key={category.title} className="text-center">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {category.techs.map((tech) => (
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
      ))}
    </div>
  )
} 