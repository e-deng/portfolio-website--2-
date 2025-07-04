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
      const response = await fetch('/api/spotify')
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
    
    // Refresh every 15 seconds
    const interval = setInterval(fetchCurrentTrack, 15000)
    
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
            <Play className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {error || 'No track playing'}
            </p>
          </div>
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
                    className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center hover:from-green-500 hover:to-green-700 transition-all duration-200 cursor-pointer"
                    title="View Spotify Profile"
                  >
                    <Music className="w-6 h-6 text-white" />
                  </a>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
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

      {/* Recently Played */}
      <div>
        <h4 className={`font-semibold mb-3 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
          Recently Played
        </h4>
        {recentTracks.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {recentTracks.map((track, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
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
                        className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center hover:from-green-500 hover:to-green-700 transition-all duration-200 cursor-pointer"
                        title="View Spotify Profile"
                      >
                        <Music className="w-5 h-5 text-white" />
                      </a>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <Music className="w-5 h-5 text-white" />
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
              No recently played tracks found
            </p>
            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              Start listening to some music on Spotify!
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 