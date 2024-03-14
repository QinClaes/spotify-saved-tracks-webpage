# Spotify Saved Tracks Exporter

This script displays all tracks (up to 100 at a time) from a public Spotify playlist onto a local webpage.

Instructions:

1. Create an app on the [Spotify for Developers dashboard](https://developer.spotify.com/dashboard/)
1. Run `npm install`
1. Rename `.env.template` to `.env`
1. In that env file, fill in:
   - **CLIENT_ID:** Get from app created in step 1
   - **CLIENT_SECRET:** Get from app created in step 1
   - **PLAYLIST_ID:** The ID of the playlist you want to use
1. Run `node main.js`
