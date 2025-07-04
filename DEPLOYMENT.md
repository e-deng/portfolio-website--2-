# Deployment Guide - Spotify Integration

## Overview
Your Spotify integration is already set up securely! The credentials are server-side only and never exposed to the client.

## Environment Variables for Deployment

When deploying to platforms like Vercel, Netlify, or Railway, add these environment variables in your hosting platform's dashboard:

```
SPOTIFY_CLIENT_ID=e2e607cf8cfb43bb8bcebfaf50a440f5
SPOTIFY_CLIENT_SECRET=e8853b047b4a41efafada3ffcc4a9f31
SPOTIFY_REFRESH_TOKEN=YOUR_NEW_REFRESH_TOKEN_WITH_PROPER_SCOPES
SPOTIFY_REDIRECT_URI=https://github.com/e-deng
```

## How It Works

1. **Server-Side Only**: All Spotify API calls happen on the server (in `/api/spotify/route.ts`)
2. **No Client Exposure**: Your credentials are never sent to the browser
3. **Your Account Only**: The integration will always show your Spotify data
4. **Public Access**: Anyone can visit your site and see your music, but they can't access your account

## Deployment Platforms

### Vercel
1. Go to your project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable above
4. Deploy!

### Netlify
1. Go to Site Settings → Environment Variables
2. Add each variable above
3. Deploy!

### Railway
1. Go to your project
2. Navigate to Variables tab
3. Add each variable above
4. Deploy!

## Security Notes

✅ **Secure**: Credentials are server-side only  
✅ **Private**: Your account stays private  
✅ **Public**: Anyone can see your music taste  
✅ **No Setup**: Visitors don't need to authenticate  

## Troubleshooting

If you see 403 errors after deployment:
1. Make sure your refresh token has the proper scopes:
   - `user-read-currently-playing`
   - `user-top-read`
   - `user-read-recently-played`
2. Regenerate the token using the token generator script if needed
3. Update the environment variable in your hosting platform

## Benefits of This Approach

- **Always Your Music**: Shows your actual listening data
- **No User Setup**: Visitors don't need Spotify accounts
- **Real-time**: Updates as you listen to music
- **Secure**: Your account credentials are protected
- **Personal Touch**: Adds personality to your portfolio 