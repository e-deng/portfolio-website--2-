"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Menu, X } from "lucide-react"

interface NavigationProps {
  isDark: boolean
  isMobile: boolean
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  toggleTheme: () => void
  scrollToSection: (sectionId: string) => void
}

export function Navigation({ 
  isDark, 
  isMobile, 
  isMenuOpen, 
  setIsMenuOpen, 
  toggleTheme, 
  scrollToSection 
}: NavigationProps) {
  return (
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
              <Button 
                asChild
                size="sm" 
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white"
              >
                <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-1" />
                  Resume
                </a>
              </Button>
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
              <Button 
                asChild
                variant="outline" 
                size="sm" 
                className="w-fit bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-sky-500"
              >
                <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-1" />
                  Resume
                </a>
              </Button>
              <Button onClick={toggleTheme} variant="outline" size="sm" className="w-fit">
                {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
} 