export interface Project {
  title: string
  description: string
  longDescription: string
  tech: string[]
  features: string[]
  github: string
  demo: string
  image: string
  status: "Completed" | "In Progress" | "Planned"
  timeline: string
}

export const projects: Project[] = [
  {
    title: "NextGenScrub",
    description:
      "A remote surgical training system using HoloLens 2 and AR to enable real-time mentorship, feedback, and skill assessment for junior surgeons.",
    longDescription:
      "Built with modern web technologies, this application features real-time collaboration, smart notifications, and predictive analytics to boost productivity.",
    tech: ["C#", "ShaderLab", "MRTK", "Photon", "OpenXR", "HoloLens2", "Unity", "GitHub"],
    features: [
      "Interactive Annotations",
      "Two-way Communication",
      "Live Video Streaming",
      "Session Recording of Audio + Video",
      "Remote Accessibility",
    ],
    github: "https://github.com/MalcolmFonseca/asclepius25-tablet",
    demo: "https://youtu.be/T47WuFNIdYA?si=z9HwMXxx4gxm6-SW",
    image: "/placeholder.svg?height=300&width=400",
    status: "Completed",
    timeline: "6 months",
  },
  {
    title: "Costco Chaos",
    description:
      "A chaotic Unity game where you race to complete a shopping list inside a maze-like Costco while dodging hazards and escaping The Rizzler.",
    longDescription:
      "Enterprise-grade chat solution with advanced security features, scalable architecture, and seamless user experience across all devices.",
    tech: ["Unity", "C#", "GitHub"],
    features: [
      "AI-powered enemy chase",
      "Randomized shopping objectives",
      "Maze-like level design",
      "Dynamic hazards and traps",
      "Timer-based gameplay",
    ],
    github: "https://github.com/e-deng/4483-game-design",
    demo: "#",
    image: "/placeholder.svg?height=300&width=400",
    status: "Completed",
    timeline: "2 months",
  },
  {
    title: "Personal Website",
    description:
      "A personal portfolio website built with Next.js to showcase projects, writing, and interactive coding demos.",
    longDescription:
      "Revolutionary voting system built on blockchain technology, featuring smart contracts for vote validation and transparent result tracking.",
    tech: ["Next.js", "Tailwind", "React", "TypeScript", "Framer Motion", "Shadcn/UI", "Vercel"],
    features: [
      "Responsive design",
      "Interactive project previews",
      "Project showcase",
      "Dark mode toggle",
    ],
    github: "#",
    demo: "#",
    image: "/placeholder.svg?height=300&width=400",
    status: "Completed",
    timeline: "1 week",
  },
] 