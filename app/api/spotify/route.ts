import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/spotify/callback'
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

// Get access token using refresh token
async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error('Missing Spotify credentials:', {
      hasClientId: !!CLIENT_ID,
      hasClientSecret: !!CLIENT_SECRET,
      hasRefreshToken: !!REFRESH_TOKEN
    })
    throw new Error('Missing Spotify credentials')
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

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
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Spotify token request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Error getting Spotify access token:', error)
    throw error
  }
}

export async function GET() {
  try {
    const accessToken = await getAccessToken()
    
    // Fetch currently playing track with timeout
    const currentController = new AbortController()
    const currentTimeoutId = setTimeout(() => currentController.abort(), 10000)

    let currentTrack = null
    try {
      const currentResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: currentController.signal,
      })

      clearTimeout(currentTimeoutId)

      if (currentResponse.status !== 204 && currentResponse.status <= 400) {
        const currentData = await currentResponse.json()
        if (currentData.item) {
          currentTrack = {
            title: currentData.item.name,
            artist: currentData.item.artists.map((_artist: any) => _artist.name).join(", "),
            albumImageUrl: currentData.item.album.images[0]?.url,
            songUrl: currentData.item.external_urls.spotify,
            isPlaying: currentData.is_playing,
          }
        }
      }
    } catch (currentError) {
      console.error('Error fetching current track:', currentError)
      // Continue without current track
    }

    // Fetch top tracks with timeout
    const topTracksController = new AbortController()
    const topTracksTimeoutId = setTimeout(() => topTracksController.abort(), 10000)

    let recentTracks = []
    try {
      const topTracksResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: topTracksController.signal,
      })

      clearTimeout(topTracksTimeoutId)

      if (topTracksResponse.status <= 400) {
        const topTracksData = await topTracksResponse.json()
        if (topTracksData.items && topTracksData.items.length > 0) {
          recentTracks = topTracksData.items.map((item: any) => ({
            title: item.name,
            artist: item.artists.map((_artist: any) => _artist.name).join(", "),
            albumImageUrl: item.album.images[0]?.url,
            songUrl: item.external_urls.spotify,
            playedAt: null,
          }))
        }
      } else {
        // Fallback to medium term if short term fails
        try {
          const mediumTermResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal: topTracksController.signal,
          })
          
          if (mediumTermResponse.status <= 400) {
            const mediumTermData = await mediumTermResponse.json()
            if (mediumTermData.items && mediumTermData.items.length > 0) {
              recentTracks = mediumTermData.items.map((item: any) => ({
                title: item.name,
                artist: item.artists.map((_artist: any) => _artist.name).join(", "),
                albumImageUrl: item.album.images[0]?.url,
                songUrl: item.external_urls.spotify,
                playedAt: null,
              }))
            }
          }
        } catch (fallbackError) {
          console.error('Fallback to medium term failed:', fallbackError)
        }
      }
    } catch (topTracksError) {
      console.error('Error fetching top tracks:', topTracksError)
      // Continue with empty tracks array
    }

    return NextResponse.json({
      currentTrack,
      recentTracks,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Spotify API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch Spotify data',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : 'Internal server error'
      },
      { status: 500 }
    )
  }
} 