"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface FooterProps {
  isDark: boolean
  showSpotifySection: boolean
  setShowSpotifySection: Dispatch<SetStateAction<boolean>>
}

export function Footer({ isDark, showSpotifySection, setShowSpotifySection }: FooterProps) {
  return (
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
            <motion.a
              href="https://github.com/e-deng"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-400 hover:text-sky-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/emen-deng"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-400 hover:text-sky-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:emen.dengg@gmail.com"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-400 hover:text-sky-400 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://open.spotify.com/user/3m3nd3ng"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-400 hover:text-green-400 transition-colors"
              title="Check out my music taste!"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </motion.a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
            © 2024 Emen. Made with ❤️ and lots of ☕
            <br />
            <button
              onClick={() => setShowSpotifySection(!showSpotifySection)}
              className="text-xs opacity-50 hover:opacity-100 transition-opacity cursor-pointer decoration-dotted"
            >
              💡 Click for a surprise!
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
} 