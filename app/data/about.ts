export interface AboutData {
  paragraphs: string[]
  stats: {
    label: string
    value: number
    suffix: string
  }[]
  photo: string
}

export const aboutData: AboutData = {
  paragraphs: [
    "I'm a passionate software engineer with a love for creating innovative solutions that make a difference. With expertise in full-stack development, I enjoy tackling complex problems and turning ideas into reality. I'm always looking for new challenges and opportunities to grow.",
    "When I'm not coding, you'll find me discovering new music, scrolling through the depths of the internet, or having deep philosophical conversations with my fish (just kidding... mostly). In reality, I enjoy reading, trying new restaurants, and occasionally attempting to adult properly."
  ],
  stats: [
    {
      label: "Projects Completed",
      value: 10,
      suffix: "+"
    },
    {
      label: "Years Experience",
      value: 3,
      suffix: "+"
    }
  ],
  photo: "/placeholder-user.jpg"
} 