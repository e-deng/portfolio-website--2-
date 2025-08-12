/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Production optimizations for API routes
  experimental: {
    serverComponentsExternalPackages: ['nodemailer'],
  },
}

module.exports = nextConfig
