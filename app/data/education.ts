export interface Education {
  institution: string
  degree: string
  period: string
  gpa?: string
  coursework: string[]
  achievements: string[]
  honors?: string[]
}

export const education: Education[] = [
  {
    institution: "University of Toronto",
    degree: "Bachelor of Science in Computer Science",
    period: "2021 - 2025",
    gpa: "3.8/4.0",
    coursework: [
      "Data Structures & Algorithms",
      "Software Engineering", 
      "Database Systems",
      "Computer Networks",
      "Operating Systems",
      "Machine Learning"
    ],
    achievements: [
      "Computer Science Club President (2023-2024)",
      "Hackathon Winner - TechHacks 2023",
      "Teaching Assistant for Data Structures (2023)",
      "Research Assistant in Machine Learning Lab",
      "Published paper on \"Efficient Algorithms for Graph Processing\""
    ],
    honors: ["Dean's List: 2022, 2023, 2024"]
  }
] 