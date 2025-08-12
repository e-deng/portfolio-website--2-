import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    // Check environment variables
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
    
    console.log('Environment check:', {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      hasRefreshToken: !!refreshToken,
      clientIdLength: clientId?.length || 0
    })
    
    if (!clientId || !clientSecret || !refreshToken) {
      return NextResponse.json({
        error: 'Missing Spotify credentials',
        details: {
          hasClientId: !!clientId,
          hasClientSecret: !!clientSecret,
          hasRefreshToken: !!refreshToken,
          message: 'Environment variables not configured in Cloudflare Pages'
        },
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    // Try to get access token
    const authString = btoa(`${clientId}:${clientSecret}`)
    
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Token request failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        body: errorText
      })
      
      return NextResponse.json({
        error: 'Failed to get Spotify access token',
        details: {
          status: tokenResponse.status,
          statusText: tokenResponse.statusText,
          message: 'Check if refresh token is valid and app is configured correctly'
        },
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Try to fetch user profile (simpler than tracks)
    const profileResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (profileResponse.ok) {
      const profileData = await profileResponse.json()
      return NextResponse.json({
        success: true,
        message: 'Spotify API is working!',
        user: {
          id: profileData.id,
          displayName: profileData.display_name,
          email: profileData.email
        },
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        error: 'Failed to fetch user profile',
        details: {
          status: profileResponse.status,
          message: 'Access token obtained but profile fetch failed'
        },
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Spotify simple route error:', error)
    
    return NextResponse.json({
      error: 'Spotify API error',
      details: {
        message: error instanceof Error ? error.message : 'Unknown error',
        type: 'Edge Runtime Error'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 