# Portfolio Website

A beautiful, responsive portfolio website built with Next.js, featuring:

- 🌸 Cute Cinnamoroll-themed design
- 🌙 Night/space theme for dark mode
- ✨ Glitter cursor trail
- 🎨 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎯 Modern tech stack showcase

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Build for production:
\`\`\`bash
npm run build
\`\`\`

4. Export static files:
\`\`\`bash
npm run export
\`\`\`

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI
- Lucide React Icons

## Features

- Animated typewriter text
- Expandable experience cards
- Interactive project showcase
- Smooth scrolling navigation
- Dark/light mode toggle
- Custom glitter cursor
- Floating background elements

## Customization

Update the content in `app/page.tsx` to personalize:
- Your name and information
- Projects and experience
- Skills and technologies
- Contact information
\`\`\`

Perfect! Your portfolio is now properly structured for Next.js export. Here's what's set up:

## 🚀 **Export-Ready Features:**

### **Next.js Configuration:**
- `next.config.js` with `output: 'export'` for static export
- `images: { unoptimized: true }` for static hosting
- `trailingSlash: true` for better compatibility

### **Package Scripts:**
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run export` - Static export
- `npm run start` - Production server

### **Proper File Structure:**
- ✅ `app/layout.tsx` - App Router layout
- ✅ `app/page.tsx` - Main page component
- ✅ `app/globals.css` - Global styles
- ✅ `tailwind.config.js` - Tailwind configuration
- ✅ `tsconfig.json` - TypeScript config
- ✅ `package.json` - Dependencies and scripts

## 📦 **To Export Your Portfolio:**

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Build and export:**
   \`\`\`bash
   npm run build
   npm run export
   \`\`\`

3. **Deploy the `out` folder** to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

Your portfolio is now ready for export and deployment! The static files will be generated in the `out` directory and can be hosted anywhere. 🎉✨
