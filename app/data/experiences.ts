export interface Experience {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
  achievements: string[]
}

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Intellectra AI.",
    period: "June 2025 - February 2026",
    description: "Enhanced website performance and built responsive company website with custom styling. To be updated!",
    technologies: ["Python","Next.js", "PostgreSQL", "n8n", "supabase"],
    achievements: [
      "Developed 8 production web pages and full-stack features using Next.js, React, and Supabase, delivering scalable UI components and backend integrations for an AI-powered content platform.",
      "Deployed 2 core platform features (AI audiobook generation and book summarization), integrating frontend interfaces with automation pipelines capable of processing large multi-chapter book files.",
      "Implemented backend integrations with Supabase/PostgreSQL and workflow automation, enabling efficient data retrieval, API communication, and reliable AI-driven content generation."
    ]
  },
  {
    title: "Freelance",
    company: "Freelance",
    period: "February 2023 - February 2023",
    description: "Built custom webpage for Jeemca modular homes",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    achievements: [
      "Created 2 responsive web pages utilizing Next.js and React, delivering seamless user experiences across all devices.",
      "Translated wireframes and design mockups into production-ready frontend features, maintaining visual consistency.",
      "Performed cross-browser testing and debugging to identify and resolve compatibility issues and improve frontend stability"
    ]
  },
  {
    title: "Marketing Director",
    company: "Hack the 6ix",
    period: "November 2023 - October 2025",
    description: "Led marketing strategy, managed social media campaigns, and grew event reach and engagement.",
    technologies: [],
    achievements: [
      "Grew social media following by 1,000+ in the past year, driving record engagement and reach",
      "Achieved over 300,000 impressions on Instagram through targeted campaigns and content strategy",
      "Increased event and volunteer applications to all-time highs through effective marketing initiatives"
    ]
  },
  {
    title: "Merchandising Admin Assistant",
    company: "T&T Supermarket",
    period: "April 2024 - July 2024",
    description: "Assisted in teaching data structures and algorithms courses",
    technologies: ["Excel", "Microsoft Teams"],
    achievements: [
      "Translated and updated 10,000+ product database entries, improving international accessibility and overall data quality.",
      "Collaborated remotely with team members to ensure accuracy and consistency of multilingual product information."
    ]
  },
  {
    title: "Program Instructor",
    company: "University of Toronto - DEEP",
    period: "June 2022 - August 2022",
    description: "Assisted in teaching data structures and algorithms courses",
    technologies: [],
    achievements: [
      "Taught STEM concepts to 100+ elementary students across different age groups weekly",
      "Covered topics including civil engineering, engineering design cycle, and hands-on problem solving",
      "Adapted teaching methods to engage diverse learning styles and age-appropriate content delivery"
    ]
  },
  {
    title: "Swim Instructor / Lifeguard",
    company: "City of Markham",
    period: "September 2019 - May 2020",
    description: "Taught swimming lessons and ensured the safety of all pool patrons by enforcing safety protocols and responding to emergencies.",
    technologies: [],
    achievements: [
      "Taught over 10 different swimming levels, including pre-National Lifeguard course, to students of all ages and abilities",
      "Prepared and delivered engaging lesson plans for preschool, youth, and adult classes, adapting instruction to individual needs",
      "Ensured patron safety by enforcing pool regulations and responding promptly to emergencies",
      "Organized and led swim assessments, progress reports, and parent communications"
    ]
  },
] 