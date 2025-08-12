import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({
    message: 'Environment Variables Test',
    timestamp: new Date().toISOString(),
    runtime: 'edge',
    
    // Check each variable individually
    spotify: {
      clientId: {
        exists: !!process.env.SPOTIFY_CLIENT_ID,
        length: process.env.SPOTIFY_CLIENT_ID?.length || 0,
        preview: process.env.SPOTIFY_CLIENT_ID ? `${process.env.SPOTIFY_CLIENT_ID.substring(0, 8)}...` : 'not set'
      },
      clientSecret: {
        exists: !!process.env.SPOTIFY_CLIENT_SECRET,
        length: process.env.SPOTIFY_CLIENT_SECRET?.length || 0,
        preview: process.env.SPOTIFY_CLIENT_SECRET ? `${process.env.SPOTIFY_CLIENT_SECRET.substring(0, 8)}...` : 'not set'
      },
      refreshToken: {
        exists: !!process.env.SPOTIFY_REFRESH_TOKEN,
        length: process.env.SPOTIFY_REFRESH_TOKEN?.length || 0,
        preview: process.env.SPOTIFY_REFRESH_TOKEN ? `${process.env.SPOTIFY_REFRESH_TOKEN.substring(0, 8)}...` : 'not set'
      }
    },
    
    // All environment variables
    allEnvVars: Object.keys(process.env).filter(key => key.includes('SPOTIFY')),
    
    // Instructions
    instructions: [
      '1. Check if variables exist and have correct lengths',
      '2. If all show "not set", environment variables are not configured',
      '3. Set them in Cloudflare Pages dashboard under Settings > Environment variables',
      '4. Redeploy the site after setting variables'
    ]
  })
} 