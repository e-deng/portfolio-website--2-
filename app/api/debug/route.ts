import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    const hasClientId = !!process.env.SPOTIFY_CLIENT_ID
    const hasClientSecret = !!process.env.SPOTIFY_CLIENT_SECRET
    const hasRefreshToken = !!process.env.SPOTIFY_REFRESH_TOKEN
    const hasRedirectUri = !!process.env.SPOTIFY_REDIRECT_URI
    const hasGmailUser = !!process.env.GMAIL_USER
    const hasGmailPassword = !!process.env.GMAIL_APP_PASSWORD
    
    return NextResponse.json({
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      runtime: 'edge',
      
      // Spotify credentials
      spotify: {
        hasClientId,
        hasClientSecret,
        hasRefreshToken,
        hasRedirectUri,
        allVariablesPresent: hasClientId && hasClientSecret && hasRefreshToken && hasRedirectUri,
        clientIdLength: process.env.SPOTIFY_CLIENT_ID?.length || 0,
        clientSecretLength: process.env.SPOTIFY_CLIENT_SECRET?.length || 0,
        refreshTokenLength: process.env.SPOTIFY_REFRESH_TOKEN?.length || 0,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI || 'not set',
      },
      
      // Gmail credentials
      gmail: {
        hasUser: hasGmailUser,
        hasPassword: hasGmailPassword,
        allVariablesPresent: hasGmailUser && hasGmailPassword,
        userLength: process.env.GMAIL_USER?.length || 0,
        passwordLength: process.env.GMAIL_APP_PASSWORD?.length || 0,
      },
      
      // Overall status
      status: {
        spotifyReady: hasClientId && hasClientSecret && hasRefreshToken && hasRedirectUri,
        gmailReady: hasGmailUser && hasGmailPassword,
        allServicesReady: (hasClientId && hasClientSecret && hasRefreshToken && hasRedirectUri) && (hasGmailUser && hasGmailPassword)
      },
      
      // Deployment info
      deployment: {
        platform: 'Cloudflare Pages',
        edgeRuntime: true,
        note: 'Check if environment variables are set in Cloudflare Pages dashboard'
      }
    })
  } catch (error) {
    console.error('Debug route error:', error)
    return NextResponse.json(
      { 
        error: 'Debug route failed',
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : 'Internal error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 