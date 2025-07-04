import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/spotify/callback'
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

// Get access token using refresh token
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
  return data.access_token
}



export async function GET() {
  try {
    const accessToken = await getAccessToken()
    
    // Fetch currently playing track
    const currentResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    let currentTrack = null
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

    // Fetch recently played tracks
    const recentResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    let recentTracks = []
    if (recentResponse.status <= 400) {
      const recentData = await recentResponse.json()
      recentTracks = recentData.items.map((item: any) => ({
        title: item.track.name,
        artist: item.track.artists.map((_artist: any) => _artist.name).join(", "),
        albumImageUrl: item.track.album.images[0]?.url,
        songUrl: item.track.external_urls.spotify,
        playedAt: item.played_at,
      }))
    }

    return NextResponse.json({
      currentTrack,
      recentTracks,
    })
  } catch (error) {
    console.error('Spotify API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    )
  }
} 