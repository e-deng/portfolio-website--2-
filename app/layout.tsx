import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Emen - Software Engineer Portfolio",
  description: "Personal portfolio website showcasing projects, skills, and experience in software engineering",
  keywords: ["software engineer", "portfolio", "web development", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Emen" }],
  creator: "Emen",
  openGraph: {
    title: "Emen - Software Engineer Portfolio",
    description: "Personal portfolio website showcasing projects, skills, and experience in software engineering",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emen - Software Engineer Portfolio",
    description: "Personal portfolio website showcasing projects, skills, and experience in software engineering",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
