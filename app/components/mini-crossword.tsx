"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, RotateCcw, Lightbulb, Sparkles } from "lucide-react"

interface CrosswordData {
  grid: (string | null)[][]
  clues: {
    across: { number: number; clue: string; answer: string; startRow: number; startCol: number }[]
    down: { number: number; clue: string; answer: string; startRow: number; startCol: number }[]
  }
  numbers: (number | null)[][]
}

const crosswordData: CrosswordData = {
  grid: [
    ["C", "O", "D", "E", null],
    ["A", null, "A", null, null],
    ["T", "E", "T", "A", null],
    [null, null, "A", null, null],
    ["B", "U", "G", null, null],
  ],
  clues: {
    across: [
      { number: 1, clue: "What programmers write", answer: "CODE", startRow: 0, startCol: 0 },
      { number: 5, clue: "Feline pet", answer: "CAT", startRow: 1, startCol: 0 },
      { number: 6, clue: "To consume food", answer: "EAT", startRow: 2, startCol: 1 },
      { number: 7, clue: "Software error", answer: "BUG", startRow: 4, startCol: 0 },
    ],
    down: [
      { number: 1, clue: "Feline pet", answer: "CAT", startRow: 0, startCol: 0 },
      { number: 2, clue: "Preposition meaning 'upon'", answer: "ON", startRow: 0, startCol: 1 },
      { number: 3, clue: "Information", answer: "DATA", startRow: 0, startCol: 2 },
      { number: 4, clue: "Breakfast food", answer: "EGG", startRow: 0, startCol: 3 },
    ],
  },
  numbers: [
    [1, 2, 3, 4, null],
    [5, null, null, null, null],
    [null, 6, null, null, null],
    [null, null, null, null, null],
    [7, null, null, null, null],
  ],
}

export function MiniCrossword({ isDark }: { isDark: boolean }) {
  const [userGrid, setUserGrid] = useState<(string | null)[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(null)),
  )
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [selectedDirection, setSelectedDirection] = useState<"across" | "down">("across")
  const [isCompleted, setIsCompleted] = useState(false)
  const [showHint, setShowHint] = useState<{ type: "across" | "down"; number: number } | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(null)),
  )

  const checkCompletion = () => {
    let correct = true
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (crosswordData.grid[row][col] !== null) {
          if (userGrid[row][col]?.toUpperCase() !== crosswordData.grid[row][col]) {
            correct = false
            break
          }
        }
      }
      if (!correct) break
    }
    setIsCompleted(correct)
  }

  useEffect(() => {
    checkCompletion()
  }, [userGrid])

  const handleCellChange = (row: number, col: number, value: string) => {
    if (crosswordData.grid[row][col] === null) return

    const newGrid = [...userGrid]
    newGrid[row][col] = value.toUpperCase()
    setUserGrid(newGrid)

    // Auto-advance to next cell
    if (value && selectedDirection === "across" && col < 4) {
      const nextCol = col + 1
      if (crosswordData.grid[row][nextCol] !== null) {
        setSelectedCell({ row, col: nextCol })
        inputRefs.current[row][nextCol]?.focus()
      }
    } else if (value && selectedDirection === "down" && row < 4) {
      const nextRow = row + 1
      if (crosswordData.grid[nextRow][col] !== null) {
        setSelectedCell({ row: nextRow, col })
        inputRefs.current[nextRow][col]?.focus()
      }
    }
  }

  const handleCellClick = (row: number, col: number) => {
    if (crosswordData.grid[row][col] === null) return
    setSelectedCell({ row, col })
    inputRefs.current[row][col]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === "Backspace" && !userGrid[row][col]) {
      // Move to previous cell on backspace if current cell is empty
      if (selectedDirection === "across" && col > 0) {
        const prevCol = col - 1
        if (crosswordData.grid[row][prevCol] !== null) {
          setSelectedCell({ row, col: prevCol })
          inputRefs.current[row][prevCol]?.focus()
        }
      } else if (selectedDirection === "down" && row > 0) {
        const prevRow = row - 1
        if (crosswordData.grid[prevRow][col] !== null) {
          setSelectedCell({ row: prevRow, col })
          inputRefs.current[prevRow][col]?.focus()
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      setSelectedDirection(selectedDirection === "across" ? "down" : "across")
    }
  }

  const resetGrid = () => {
    setUserGrid(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(null)),
    )
    setIsCompleted(false)
    setShowHint(null)
  }

  const getHint = (type: "across" | "down", number: number) => {
    setShowHint({ type, number })
    setTimeout(() => setShowHint(null), 3000)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Crossword Grid */}
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <Card
          className={`${isDark ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-sky-200"} backdrop-blur-sm`}
        >
          <CardHeader className="text-center">
            <CardTitle className={`${isDark ? "text-gray-100" : "text-gray-800"}`}>Tech Mini Crossword</CardTitle>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center gap-2 text-green-600"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Completed! 🎉</span>
              </motion.div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-1 max-w-xs mx-auto mb-6">
              {Array(5)
                .fill(null)
                .map((_, row) =>
                  Array(5)
                    .fill(null)
                    .map((_, col) => {
                      const isBlocked = crosswordData.grid[row][col] === null
                      const number = crosswordData.numbers[row][col]
                      const isSelected = selectedCell?.row === row && selectedCell?.col === col
                      const isCorrect = userGrid[row][col]?.toUpperCase() === crosswordData.grid[row][col]

                      return (
                        <div
                          key={`${row}-${col}`}
                          className={`
                        relative w-12 h-12 border-2 
                        ${
                          isBlocked
                            ? isDark
                              ? "bg-gray-700 border-gray-600"
                              : "bg-gray-300 border-gray-400"
                            : isSelected
                              ? "border-sky-500 bg-sky-100"
                              : isCorrect && isCompleted
                                ? "border-green-500 bg-green-100"
                                : isDark
                                  ? "border-gray-600 bg-gray-700"
                                  : "border-gray-300 bg-white"
                        }
                        ${!isBlocked ? "cursor-pointer hover:border-sky-400" : ""}
                      `}
                          onClick={() => handleCellClick(row, col)}
                        >
                          {number && (
                            <span
                              className={`absolute top-0 left-1 text-xs font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}
                            >
                              {number}
                            </span>
                          )}
                          {!isBlocked && (
                            <input
                              ref={(el) => {
                                if (!inputRefs.current[row]) inputRefs.current[row] = []
                                inputRefs.current[row][col] = el
                              }}
                              type="text"
                              maxLength={1}
                              value={userGrid[row][col] || ""}
                              onChange={(e) => handleCellChange(row, col, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, row, col)}
                              className={`
                            w-full h-full text-center font-bold text-lg bg-transparent border-none outline-none
                            ${isDark ? "text-gray-100" : "text-gray-800"}
                          `}
                              style={{ cursor: "none" }}
                            />
                          )}
                        </div>
                      )
                    }),
                )}
            </div>

            <div className="flex gap-2 justify-center mb-4">
              <Button
                onClick={resetGrid}
                variant="outline"
                size="sm"
                className={`${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-sky-300 text-sky-700 hover:bg-sky-50"} bg-transparent`}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Badge variant={isCompleted ? "default" : "secondary"} className="px-3 py-1">
                {isCompleted ? "Complete!" : "In Progress"}
              </Badge>
            </div>

            <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"} text-center`}>
              <p>Click a cell to select • Tab to change direction</p>
              <p>
                Current direction: <span className="font-semibold capitalize">{selectedDirection}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Clues */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        {/* Across Clues */}
        <Card
          className={`${isDark ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-sky-200"} backdrop-blur-sm`}
        >
          <CardHeader>
            <CardTitle className={`text-lg ${isDark ? "text-gray-100" : "text-gray-800"}`}>Across</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {crosswordData.clues.across.map((clue) => (
              <div key={`across-${clue.number}`} className="flex items-start gap-3">
                <Badge variant="outline" className="min-w-[2rem] justify-center">
                  {clue.number}
                </Badge>
                <div className="flex-1">
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{clue.clue}</p>
                  {showHint?.type === "across" && showHint?.number === clue.number && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-sky-600 font-medium mt-1"
                    >
                      Answer: {clue.answer}
                    </motion.p>
                  )}
                </div>
                <Button onClick={() => getHint("across", clue.number)} variant="ghost" size="sm" className="p-1 h-auto">
                  <Lightbulb className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Down Clues */}
        <Card
          className={`${isDark ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-sky-200"} backdrop-blur-sm`}
        >
          <CardHeader>
            <CardTitle className={`text-lg ${isDark ? "text-gray-100" : "text-gray-800"}`}>Down</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {crosswordData.clues.down.map((clue) => (
              <div key={`down-${clue.number}`} className="flex items-start gap-3">
                <Badge variant="outline" className="min-w-[2rem] justify-center">
                  {clue.number}
                </Badge>
                <div className="flex-1">
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{clue.clue}</p>
                  {showHint?.type === "down" && showHint?.number === clue.number && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-sky-600 font-medium mt-1"
                    >
                      Answer: {clue.answer}
                    </motion.p>
                  )}
                </div>
                <Button onClick={() => getHint("down", clue.number)} variant="ghost" size="sm" className="p-1 h-auto">
                  <Lightbulb className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center p-6 rounded-lg ${isDark ? "bg-gradient-to-r from-purple-800 to-pink-800" : "bg-gradient-to-r from-sky-100 to-pink-100"} border-2 border-sky-300`}
          >
            <Sparkles className="w-8 h-8 text-sky-600 mx-auto mb-2" />
            <h3 className={`text-lg font-bold ${isDark ? "text-gray-100" : "text-gray-800"} mb-2`}>
              Congratulations! 🎉
            </h3>
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              You've completed the mini crossword! Great job solving the puzzle.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
