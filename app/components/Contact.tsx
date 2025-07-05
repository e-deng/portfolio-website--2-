"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github, X } from "lucide-react"
import SpotifyNowPlaying from "../components/SpotifyNowPlaying"
import { Dispatch, SetStateAction } from "react"

interface ContactProps {
  isDark: boolean
  showSpotifySection: boolean
  setShowSpotifySection: Dispatch<SetStateAction<boolean>>
}

export function Contact({ isDark, showSpotifySection, setShowSpotifySection }: ContactProps) {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-gray-800/20 to-gray-700/20" : "bg-gradient-to-br from-sky-100/30 to-blue-100/30"}`} />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-4`}>
            <Mail className="inline w-8 h-8 mr-3 text-sky-600" />
            Let's Connect
          </h2>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-4`}>
            Have a question or just want to say hi? I'd love to hear from you!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-800"} mb-6`}>
                Get In Touch
              </h3>
              <div className="space-y-4">
                {[
                  { 
                    icon: Mail, 
                    label: "Email", 
                    value: "emen.dengg@gmail.com",
                    href: "mailto:emen.dengg@gmail.com",
                    description: "Send me a message"
                  },
                  { 
                    icon: Linkedin, 
                    label: "LinkedIn", 
                    value: "/in/emendeng",
                    href: "https://linkedin.com/in/emen-deng",
                    description: "Connect professionally"
                  },
                  { 
                    icon: Github, 
                    label: "GitHub", 
                    value: "@e-deng",
                    href: "https://github.com/e-deng",
                    description: "Check out my code"
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`block p-4 rounded-lg border transition-all duration-300 ${
                      isDark 
                        ? "bg-gray-800/50 border-gray-700 hover:border-sky-500 hover:bg-gray-800/70" 
                        : "bg-white/50 border-gray-200 hover:border-sky-400 hover:bg-white/70"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-sky-100"}`}>
                        <contact.icon className={`w-5 h-5 ${isDark ? "text-sky-400" : "text-sky-600"}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                          {contact.label}
                        </p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className={`p-8 rounded-xl border shadow-lg ${
                isDark 
                  ? "bg-gray-800/50 border-gray-700" 
                  : "bg-white/50 border-gray-200"
              }`}>
                <h3 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-800"} mb-6`}>
                  Send a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDark 
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-sky-500" 
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-sky-400"
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDark 
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-sky-500" 
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-sky-400"
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-sky-500" 
                          : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-sky-400"
                      }`}
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                        isDark 
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-sky-500" 
                          : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-sky-400"
                      }`}
                      placeholder="Share your thoughts, questions, or just drop a friendly message to let me know you were here!"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white py-3"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Spotify Section */}
          {showSpotifySection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <div className={`p-8 rounded-xl border shadow-lg ${
                isDark 
                  ? "bg-gray-800/50 border-gray-700" 
                  : "bg-white/50 border-gray-200"
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                        What I'm Listening To
                      </h3>
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        My Spotify vibes 🎵
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      asChild
                      className="bg-black hover:bg-gray-800 text-white"
                    >
                      <a 
                        href="https://open.spotify.com/user/3m3nd3ng" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        View Profile
                      </a>
                    </Button>
                    <Button
                      onClick={() => setShowSpotifySection(false)}
                      variant="outline"
                      size="sm"
                      className={`${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <SpotifyNowPlaying isDark={isDark} spotifyProfileUrl="https://open.spotify.com/user/3m3nd3ng" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
} 