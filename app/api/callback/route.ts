import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  
  if (error) {
    return NextResponse.json({
      error: 'Spotify authorization failed',
      details: error
    }, { status: 400 })
  }
  
  if (!code) {
    return NextResponse.json({
      error: 'No authorization code received'
    }, { status: 400 })
  }
  
  // This is just a placeholder - the actual token exchange happens in the main Spotify route
  return NextResponse.json({
    message: 'Spotify callback received',
    code: code.substring(0, 10) + '...',
    note: 'This endpoint is for Spotify OAuth flow. Your refresh token should already be configured.'
  })
} 