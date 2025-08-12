import { NextResponse } from 'next/server'

export const runtime = 'edge'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

export async function GET() {
  try {
    console.log('Testing Spotify token generation...')
    
    // Check credentials
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      return NextResponse.json({
        error: 'Missing credentials',
        details: {
          hasClientId: !!CLIENT_ID,
          hasClientSecret: !!CLIENT_SECRET,
          hasRefreshToken: !!REFRESH_TOKEN
        }
      }, { status: 400 })
    }

    console.log('Credentials check passed, attempting token request...')
    
    // Try to get access token
    const authString = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Token request failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      
      return NextResponse.json({
        error: 'Token request failed',
        details: {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        }
      }, { status: response.status })
    }

    const data = await response.json()
    console.log('Token response received:', Object.keys(data))
    
    if (data.error) {
      return NextResponse.json({
        error: 'Spotify API error',
        details: data
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Access token obtained successfully',
      tokenLength: data.access_token?.length || 0,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Test route error:', error)
    
    return NextResponse.json({
      error: 'Test route failed',
      details: {
        message: error instanceof Error ? error.message : String(error),
        type: error instanceof Error ? error.constructor.name : typeof error
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 