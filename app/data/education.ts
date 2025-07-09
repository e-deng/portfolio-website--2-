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
    institution: "University of Western Ontario",
    degree: "Bachelor of Engineering Science in Software Engineering",
    period: "2020 - 2025",
    gpa: "3.7/4.0",
    coursework: [
      "Data Structures & Algorithms",
      "Web Development", 
      "Database Systems",
      "Project Management",
      "Operating Systems",
      "Machine Learning/AI"
    ],
    achievements: [
      "Computer Science Club President (2023-2024)",
      "Hackathon Winner - TechHacks 2023",
      "Teaching Assistant for Data Structures (2023)",
      "Research Assistant in Machine Learning Lab",
      "Published paper on \"Efficient Algorithms for Graph Processing\""
    ],
    honors: ["Dean's List"]
  }
] 