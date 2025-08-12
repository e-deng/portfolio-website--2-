import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const hasClientId = !!process.env.SPOTIFY_CLIENT_ID
  const hasClientSecret = !!process.env.SPOTIFY_CLIENT_SECRET
  const hasRefreshToken = !!process.env.SPOTIFY_REFRESH_TOKEN
  const hasRedirectUri = !!process.env.SPOTIFY_REDIRECT_URI
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    hasClientId,
    hasClientSecret,
    hasRefreshToken,
    hasRedirectUri,
    allVariablesPresent: hasClientId && hasClientSecret && hasRefreshToken && hasRedirectUri,
    clientIdLength: process.env.SPOTIFY_CLIENT_ID?.length || 0,
    refreshTokenLength: process.env.SPOTIFY_REFRESH_TOKEN?.length || 0,
  })
} 