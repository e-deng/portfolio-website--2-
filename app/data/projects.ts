export interface Project {
  title: string
  description: string
  longDescription: string
  tech: string[]
  features: string[]
  github: string
  demo: string
  colab?: string
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
    tech: ["Next.js", "Tailwind", "React", "TypeScript", "Github", "Github Pages"],
    features: [
      "Responsive design",
      "Interactive project previews",
      "Project showcase",
      "Dark mode toggle",
    ],
    github: "https://github.com/e-deng/portfolio-website--2-",
    demo: "https://github.com/e-deng/portfolio-website--2-",
    image: "/placeholder.svg?height=300&width=400",
    status: "In Progress",
    timeline: "Always improving!",
  },
  {
    title: "Scanventory",
    description:
      "A smart inventory management app that lets users scan grocery items to automatically detect and log them, track quantities, set expiration dates with alerts, and organize items by storage location.",
    longDescription:
      "A smart inventory management app built with Next.js for a fast, responsive frontend and MongoDB as a scalable backend for authentication, real-time database, and storage. The app leverages Supabase's instant APIs for seamless CRUD operations, real-time updates for collaborative inventory tracking, and secure user management. Barcode scanning is integrated with modern browser APIs, and the UI is styled with Tailwind CSS for a clean, mobile-friendly experience.",
    tech: ["Next.js", "React", "TypeScript", "MongoDB", "Express.js", "Tailwind CSS", "Barcode Scanning APIs"],
    features: [
      "Manual item entry",
      "Barcode scanning for quick add",
      "Dynamic inventory updates",
      "Expiration date tracking with alerts",
      "Organize by storage location",
      "Quantity management",
      "Search and filter items",
    ],
    github: "https://github.com/e-deng/scanventory",
    demo: "",
    image: "/placeholder.svg?height=300&width=400",
    status: "In Progress",
    timeline: "1 week",
  },
  {
    title: "egg",
    description:
      "A community website for Swifties to log, share, and discuss Taylor Swift easter eggs they discover. Users can interact, post their findings, and connect with fellow fans.",
    longDescription:
      "A beautiful, interactive showcase of Taylor Swift Easter eggs and hidden clues discovered by Swifties around the world. Built with a MERN-style architecture using an Express.js backend, React frontend with Tailwind CSS, and Supabase (PostgreSQL) as the real-time database. The project features RESTful API endpoints, real-time updates, and a modern, collaborative user experience.",
    tech: ["React", "Express.js", "Tailwind CSS", "Supabase", "PostgreSQL", "GitHub"],
    features: [
      "User-submitted Easter eggs",
      "Commenting and discussion threads",
      "Real-time updates",
      "Community voting on findings",
      "Profile and achievement badges",
    ],
    github: "https://github.com/e-deng/eggs",
    demo: "",
    image: "/placeholder.svg?height=300&width=400",
    status: "In Progress",
    timeline: "1 month",
  },
  {
    title: "Sleep Apnea and Insomnia Detection",
    description:
      "A data-driven analysis using machine learning to uncover lifestyle and health factors affecting sleep quality and disorders like insomnia and sleep apnea.",
    longDescription:
      "Revolutionary voting system built on blockchain technology, featuring smart contracts for vote validation and transparent result tracking.",
    tech: ["Python", "Jupyter Notebook", "Google Colab"],
    features: [
      "correlation heatmap analysis",
      "Demographic-based sleep segmentation",
      "Predictive ML model for sleep risk",
      "Lifestyle behavior impact insights and recommendations",
    ],
    github: "#",
    colab: "https://colab.research.google.com/drive/1RW2VGpd7jdXdp0BonqoliLTRUaJBpFAh?usp=sharing",
    demo: "",
    image: "/placeholder.svg?height=300&width=400",
    status: "Completed",
    timeline: "2 months",
  },
] 