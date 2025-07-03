"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import {
  User,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Rocket,
  Menu,
  X,
  Code,
  GraduationCap,
} from "lucide-react"

// Import components
import { TypewriterText } from "./components/TypewriterText"
import { AnimatedCounter } from "./components/AnimatedCounter"
import { TechLogoGrid } from "./components/TechLogoGrid"
import { FloatingElements } from "./components/FloatingElements"
import { GlitterCursor } from "./components/GlitterCursor"

// Import data
import { projects } from "./data/projects"
import { experiences } from "./data/experiences"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300])

  useEffect(() => {
    setIsDark(theme === "dark")
  }, [theme])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDark ? "dark bg-gray-950" : "bg-gradient-to-br from-sky-50 to-blue-100"}`}>
      {/* Custom cursor */}
      <GlitterCursor isDark={isDark} />

      {/* Floating elements */}
      <FloatingElements isDark={isDark} />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 backdrop-blur-md border-b ${
          isDark ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"
            >
              {"<Emen />"}
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                {["home", "about", "education", "skills", "experience", "projects", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize hover:text-sky-600 transition-colors ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <Button onClick={toggleTheme} variant="outline" size="sm">
                  {isDark ? "☀️" : "🌙"}
                </Button>
              </div>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
              <div className="md:hidden">
                <Button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  variant="ghost"
                  size="sm"
                  className="p-2"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobile && isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {["home", "about", "education", "skills", "experience", "projects", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize text-left hover:text-sky-600 transition-colors ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <Button onClick={toggleTheme} variant="outline" size="sm" className="w-fit">
                  {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
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
              Crafting digital magic one line at a time!✨
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
              >
                <Rocket className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sky-300 text-sky-700 hover:bg-sky-50 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
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
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                I'm a passionate software engineer with a love for creating innovative solutions that make a difference.
                With expertise in full-stack development, I enjoy tackling complex problems and turning ideas into
                reality. I'm always looking for new challenges and opportunities to grow.
              </p>
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                When I'm not coding, you'll find me discovering new music, scrolling through the depths of the internet, or
                having deep philosophical conversations with my fish (just kidding... mostly). In reality, I enjoy reading,
                trying new restaurants, and occasionally attempting to adult properly.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div
                  className={`text-center p-4 ${isDark ? "bg-gradient-to-br from-gray-700 to-gray-600" : "bg-gradient-to-br from-sky-100 to-blue-100"} rounded-lg`}
                >
                  <div className="text-3xl font-bold text-sky-600">
                    <AnimatedCounter end={10} />+
                  </div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div
                  className={`text-center p-4 ${isDark ? "bg-gradient-to-br from-gray-700 to-gray-600" : "bg-gradient-to-br from-sky-100 to-blue-100"} rounded-lg`}
                >
                  <div className="text-3xl font-bold text-sky-600">
                    <AnimatedCounter end={3} />+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-800"} mb-6`}>
                Technical Skills
              </h3>
              <TechLogoGrid isDark={isDark} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`${isDark ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-sky-200"} backdrop-blur-sm rounded-lg border shadow-lg p-8`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-2`}>
                    University of Toronto
                  </h3>
                  <p className={`text-lg font-medium text-sky-600 mb-1`}>
                    Bachelor of Science in Computer Science
                  </p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
                    2021 - 2025
                  </p>
                  <div className="space-y-2">
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      • Relevant Coursework: Data Structures & Algorithms, Software Engineering, Database Systems, 
                      Computer Networks, Operating Systems, Machine Learning
                    </p>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      • GPA: 3.8/4.0
                    </p>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      • Dean's List: 2022, 2023, 2024
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-800"} mb-3`}>
                    Academic Achievements
                  </h4>
                  <ul className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"} space-y-2 list-disc pl-5`}>
                    <li>Computer Science Club President (2023-2024)</li>
                    <li>Hackathon Winner - TechHacks 2023</li>
                    <li>Teaching Assistant for Data Structures (2023)</li>
                    <li>Research Assistant in Machine Learning Lab</li>
                    <li>Published paper on "Efficient Algorithms for Graph Processing"</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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

      {/* Experience Section */}
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
            {experiences.map((exp, index) => (
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
                            {index === 0 && ["Carrd", "SEO Tools", "Deep Research Tools"].map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-sky-100 text-sky-700">
                                {tech}
                              </Badge>
                            ))}
                            {index === 1 && ["Next.js", "React", "TypeScript", "Tailwind CSS"].map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-sky-100 text-sky-700">
                                {tech}
                              </Badge>
                            ))}
                            {index === 2 && ["Excel", "Microsoft Teams"].map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-sky-100 text-sky-700">
                                {tech}
                              </Badge>
                            ))}
                            {index === 3 && [].map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-sky-100 text-sky-700">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                            {index === 0 && (
                              <>
                                <li>Enhanced website SEO performance by 75% (from 40 to 70 score)</li>
                                <li>Built responsive company website using Carrd with custom styling</li>
                                <li>Conducted comprehensive research using multiple AI models to generate detailed book summary notes</li>
                              </>
                            )}
                            {index === 1 && (
                              <>
                                <li>Developed clean, maintainable code for multiple client websites using Next.js, React, and TypeScript</li>
                                <li>Implemented responsive design principles and cross-browser compatibility ensuring optimal user experience across all devices</li>
                                <li>Collaborated with various development teams and stakeholders to create dynamic, user-friendly interfaces with modern UI/UX patterns</li>
                              </>
                            )}
                            {index === 2 && (
                              <>
                                <li>Translated and updated product database labels for international market accessibility</li>
                                <li>Collaborated with team members remotely to ensure accurate product information</li>
                                <li>Improved database organization and data quality through systematic translation and categorization of 10000+ product entries</li>
                              </>
                            )}
                            {index === 3 && (
                              <>
                                <li>Taught STEM concepts to 100+ elementary students across different age groups weekly</li>
                                <li>Covered topics including civil engineering, engineering design cycle, and hands-on problem solving</li>
                                <li>Adapted teaching methods to engage diverse learning styles and age-appropriate content delivery</li>
                              </>
                            )}
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
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm`}>
        <div className="container mx-auto px-6">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
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
                    {project.demo !== "#" && (
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-4`}>
              <Mail className="inline w-8 h-8 mr-3 text-sky-600" />
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>Get In Touch</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "your.email@example.com" },
                    { icon: Linkedin, label: "LinkedIn", value: "/in/yourprofile" },
                    { icon: Github, label: "GitHub", value: "@yourusername" },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-sky-200"
                    >
                      <contact.icon className="w-6 h-6 text-sky-600" />
                      <div>
                        <div className="font-medium text-gray-800">{contact.label}</div>
                        <div className="text-gray-600">{contact.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                  Let's Work Together
                </h3>
                <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                  want to say hi, feel free to reach out!
                </p>
                <Button size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${isDark ? "bg-gray-950" : "bg-gray-900"} text-white`}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent mb-4"
            >
              {"<Emen />"}
            </motion.div>
            <p className="text-gray-400 mb-6">Building the future, one line of code at a time.</p>
            <div className="flex justify-center space-x-6">
              {[Github, Linkedin, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="text-gray-400 hover:text-sky-400 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
              © 2024 Emen. Made with ❤️ and lots of ☕
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 