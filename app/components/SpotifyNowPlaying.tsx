'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, ExternalLink, Music, RefreshCw } from 'lucide-react'

interface Track {
  title: string
  artist: string
  albumImageUrl?: string
  songUrl: string
  playedAt?: string
  isPlaying?: boolean
}

interface SpotifyData {
  currentTrack: Track | null
  recentTracks: Track[]
}

interface SpotifyNowPlayingProps {
  isDark?: boolean
  spotifyProfileUrl?: string
}

export default function SpotifyNowPlaying({ isDark = false, spotifyProfileUrl }: SpotifyNowPlayingProps) {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchCurrentTrack = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    
    try {
      const response = await fetch(`/api/spotify?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      })
      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
        return
      }

      setSpotifyData(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch current track')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCurrentTrack()
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchCurrentTrack, 10000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
        </div>
      </div>
    )
  }

  if (error || !spotifyData) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <Music className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {error === 'Failed to fetch Spotify data' 
                ? 'Spotify integration temporarily unavailable' 
                : error || 'No track playing'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Check out my profile for music recommendations
            </p>
          </div>
          <button
            onClick={() => fetchCurrentTrack(true)}
            disabled={refreshing}
            className={`p-2 rounded-lg transition-colors ${
              refreshing 
                ? "text-gray-400 cursor-not-allowed" 
                : isDark 
                  ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
            title="Retry Spotify connection"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
        
        {/* Fallback: Show a link to Spotify profile */}
        <div className="text-center">
          <a 
            href="https://open.spotify.com/user/3m3nd3ng" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span>View My Spotify Profile</span>
          </a>
        </div>
      </div>
    )
  }

  const { currentTrack, recentTracks } = spotifyData

  return (
    <div className="space-y-6">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={() => fetchCurrentTrack(true)}
          disabled={refreshing}
          className={`p-2 rounded-lg transition-colors ${
            refreshing 
              ? "text-gray-400 cursor-not-allowed" 
              : isDark 
                ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" 
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          title="Refresh Spotify data"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </div>
      {/* Currently Playing */}
      {currentTrack && (
        <div>
          <h4 className={`font-semibold mb-3 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            Currently Playing
          </h4>
          <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <div className="relative">
                            {currentTrack.albumImageUrl ? (
                <img 
                  src={currentTrack.albumImageUrl} 
                  alt={`${currentTrack.title} album art`}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                  spotifyProfileUrl ? (
                    <a 
                      href={spotifyProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-black rounded flex items-center justify-center hover:bg-gray-800 transition-all duration-200 cursor-pointer"
                      title="View Spotify Profile"
                    >
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </a>
                  ) : (
                    <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                  )
                )}
              <div className="absolute inset-0 flex items-center justify-center">
                {currentTrack.isPlaying ? (
                  <Pause className="w-4 h-4 text-white bg-black bg-opacity-50 rounded-full p-1" />
                ) : (
                  <Play className="w-4 h-4 text-white bg-black bg-opacity-50 rounded-full p-1" />
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {currentTrack.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
            
            <a 
              href={currentTrack.songUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Top Tracks */}
      <div>
        <h4 className={`font-semibold mb-3 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
          Top Tracks
        </h4>
        {recentTracks && recentTracks.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {recentTracks.map((track, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 relative">
                                    {track.albumImageUrl ? (
                    <img 
                      src={track.albumImageUrl} 
                      alt={`${track.title} album art`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                      spotifyProfileUrl ? (
                        <a 
                          href={spotifyProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full bg-black flex items-center justify-center hover:bg-gray-800 transition-all duration-200 cursor-pointer"
                          title="View Spotify Profile"
                        >
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        </a>
                      ) : (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        </div>
                      )
                    )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {track.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {track.artist}
                  </p>
                  {track.playedAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                      {new Date(track.playedAt).toLocaleDateString()} at {new Date(track.playedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  )}
                </div>
                
                <a 
                  href={track.songUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-4 text-center ${isDark ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
            <Music className={`w-8 h-8 mx-auto mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              No top tracks found
            </p>
            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              Listen to more music on Spotify to see your top tracks!
            </p>

          </div>
        )}
      </div>
    </div>
  )
} 