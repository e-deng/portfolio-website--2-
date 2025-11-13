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
    title: "Full Stack Intern",
    company: "Intellectra AI.",
    period: "June 2025 - Present",
    description: "Enhanced website performance and built responsive company website with custom styling. To be updated!",
    technologies: ["Carrd", "SEO Tools", "Deep Research Tools"],
    achievements: [
      "Created automated workflows for managing files and data in S3 and Supabase",
      "Developed a webpage to view and access stored data (PDFs and audiobooks)",      
      "Enhanced website SEO performance by 75% (from 40 to 70 score)",
      "Built responsive company website using Carrd with custom styling",
      "Conducted comprehensive research using multiple AI models to generate detailed book summary notes"
    ]
  },
  {
    title: "Freelance",
    company: "Freelance",
    period: "February 2023 - February 2023",
    description: "Built custom webpage for Jeemca modular homes",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    achievements: [
      "Developed clean, maintainable code for multiple client websites using Next.js, React, and TypeScript",
      "Implemented responsive design principles and cross-browser compatibility ensuring optimal user experience across all devices",
      "Collaborated with various development teams and stakeholders to create dynamic, user-friendly interfaces with modern UI/UX patterns"
    ]
  },
  {
    title: "Marketing Director",
    company: "Hack the 6ix",
    period: "November 2023 - Present",
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
      "Translated and updated product database labels for international market accessibility",
      "Collaborated with team members remotely to ensure accurate product information",
      "Improved database organization and data quality through systematic translation and categorization of 10000+ product entries"
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