"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import {
  Mail,
  Github,
  Linkedin,
  Rocket,
  Menu,
  X,
  Code,
  ChevronUp,
  ChevronDown,
  Download,
  Music,
} from "lucide-react"

// Import components
import { TypewriterText } from "./components/TypewriterText"
import { AnimatedCounter } from "./components/AnimatedCounter"
import { TechLogoGrid } from "./components/TechLogoGrid"
import { FloatingElements } from "./components/FloatingElements"
import { Education } from "./components/Education"
import { Experience } from "./components/Experience"
import { About } from "./components/About"
import { Projects } from "./components/Projects"
import { Contact } from "./components/Contact"
import { Hero } from "./components/Hero"
import { Footer } from "./components/Footer"
import { Navigation } from "./components/Navigation"
import { Skills } from "./components/Skills"
import { SectionIndicator } from "./components/SectionIndicator"
import { WorkInProgress } from "./components/WorkInProgress"

// Import data
import SpotifyNowPlaying from "./components/SpotifyNowPlaying"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSpotifySection, setShowSpotifySection] = useState(false)
  const [showWorkInProgress, setShowWorkInProgress] = useState(true)
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
      {/* Work in Progress Banner */}
      {showWorkInProgress && (
        <WorkInProgress isDark={isDark} onClose={() => setShowWorkInProgress(false)} />
      )}
      
      {/* Floating elements */}
      <FloatingElements isDark={isDark} />

      {/* Navigation */}
      <Navigation 
        isDark={isDark} 
        isMobile={isMobile} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        toggleTheme={toggleTheme} 
        scrollToSection={scrollToSection} 
      />

      {/* Section Indicator */}
      <SectionIndicator isDark={isDark} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <Hero isDark={isDark} backgroundY={backgroundY} />

      {/* About Section */}
      <About isDark={isDark} />

      {/* Education Section */}
      <Education isDark={isDark} />

      {/* Skills Section */}
      <Skills isDark={isDark} />

      {/* Experience Section */}
      <Experience isDark={isDark} />

      {/* Projects Section */}
      <Projects isDark={isDark} />

      {/* Contact Section */}
      <Contact isDark={isDark} showSpotifySection={showSpotifySection} setShowSpotifySection={setShowSpotifySection} />

      {/* Footer */}
      <Footer isDark={isDark} showSpotifySection={showSpotifySection} setShowSpotifySection={setShowSpotifySection} />

    </div>
  )
} 