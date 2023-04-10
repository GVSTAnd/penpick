import 'dotenv/config';

export const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || '';
export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';
export const USER_ID = process.env.SPOTIFY_USER_ID || '';

export const BASE_URL = 'https://api.spotify.com/v1';
export const REFRESH_URL = `https://accounts.spotify.com/api/token`;
export const SEARCH_URL = `${BASE_URL}/search?`;
export const ARTIST_URL = `${BASE_URL}/artists`;
export const USER_URL = `${BASE_URL}/users`;
export const PLAYLIST_URL = `${BASE_URL}/playlists`;
export const CREATE_PLAYLIST_URL = `${USER_URL}/${USER_ID}/playlists`;

export const regionTopTracks = 'US';
