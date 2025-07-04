# Portfolio Website

Hi there! 👋 I'm a passionate developer who loves creating beautiful and functional web experiences. This portfolio showcases my journey in web development, featuring projects that blend creativity with technical expertise.

## ✨ What Makes This Website Special

This portfolio isn't just another developer website - it's a carefully crafted experience that reflects my personality and skills:

- 🌸 **Cute Cinnamoroll-themed design** - Because who says tech can't be adorable?
- 🌙 **Night/space theme for dark mode** - Perfect for late-night coding sessions
- ✨ **Glitter cursor trail** - Adds a magical touch to every interaction
- 🎨 **Smooth animations with Framer Motion** - Because life is better with motion
- 📱 **Fully responsive design** - Looks great on any device
- 🎯 **Modern tech stack showcase** - Built with the latest technologies

## 🎭 Hidden Surprise

There's a little something special hidden within this website... Can you find it? 🕵️‍♀️

## 🛠️ How This Website Was Made

This portfolio was built using modern web technologies and best practices:

### **Tech Stack:**
- **Next.js 14** - For the framework and routing
- **React 18** - For the interactive components
- **TypeScript** - For type safety and better development experience
- **Tailwind CSS** - For styling and responsive design
- **Framer Motion** - For smooth animations and transitions
- **Radix UI** - For accessible UI components
- **Lucide React Icons** - For beautiful, consistent icons

### **Key Features:**
- Animated typewriter text that brings content to life
- Expandable experience cards for detailed project information
- Interactive project showcase with smooth transitions
- Smooth scrolling navigation for seamless browsing
- Dark/light mode toggle for user preference
- Custom glitter cursor that follows your mouse
- Floating background elements for visual depth

## 🚀 Getting Started

This portfolio is deployed on GitHub Pages and can be accessed at: [https://yourusername.github.io/your-repo-name](https://yourusername.github.io/your-repo-name)

To run this project locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Spotify API credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🎵 Spotify Integration Setup

To enable the Spotify "Now Playing" feature:

1. Create a Spotify app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Add `http://localhost:3000/api/auth/callback/spotify` to your app's redirect URIs
3. Get your Client ID and Client Secret from the dashboard
4. Generate a refresh token using the Spotify OAuth flow
5. Add all credentials to your `.env.local` file

The Spotify integration will show your currently playing track and top tracks from the last 4 weeks!
