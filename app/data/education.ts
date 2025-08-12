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
    gpa: "/4.0",
    coursework: [
      "Data Structures & Algorithms",
      "Web Development", 
      "Database Systems",
      "Project Management",
      "Operating Systems",
      "Machine Learning/AI"
    ],
    achievements: [
      "To be added"
    ],
    honors: ["Dean's List"]
  }
] 