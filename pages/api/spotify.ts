import type { NextApiRequest, NextApiResponse } from 'next'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set cache headers to prevent caching
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

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

    // Fetch top tracks (last 4 weeks)
    const topTracksResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    let recentTracks = []
    if (topTracksResponse.status <= 400) {
      const topTracksData = await topTracksResponse.json()
      if (topTracksData.items && topTracksData.items.length > 0) {
        recentTracks = topTracksData.items.map((item: any) => ({
          title: item.name,
          artist: item.artists.map((_artist: any) => _artist.name).join(", "),
          albumImageUrl: item.album.images[0]?.url,
          songUrl: item.external_urls.spotify,
          playedAt: null, // Top tracks don't have played_at
        }))
      }
    } else {
      // If short term fails, try medium term (last 6 months)
      try {
        const mediumTermResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
        // Silently handle fallback errors
      }
    }

    res.status(200).json({
      currentTrack,
      recentTracks,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Spotify API error:', error)
    res.status(500).json({ 
      error: 'Failed to fetch Spotify data',
      timestamp: new Date().toISOString()
    })
  }
} 