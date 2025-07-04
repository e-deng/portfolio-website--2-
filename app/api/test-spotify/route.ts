import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Missing Spotify credentials')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  })

  const data = await response.json()
  if (data.error) {
    throw new Error(`Token error: ${data.error} - ${data.error_description}`)
  }
  return data.access_token
}

export async function GET() {
  try {
    console.log('🔍 Testing Spotify API...')
    
    const accessToken = await getAccessToken()
    console.log('✅ Access token obtained')
    
    // Test currently playing
    const currentResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    
    // Test top tracks
    const topTracksResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    
    return NextResponse.json({
      success: true,
      currentlyPlayingStatus: currentResponse.status,
      topTracksStatus: topTracksResponse.status,
      accessTokenLength: accessToken.length,
      message: 'Spotify API is working correctly!'
    })
    
  } catch (error) {
    console.error('❌ Spotify API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Spotify API test failed'
    }, { status: 500 })
  }
} 