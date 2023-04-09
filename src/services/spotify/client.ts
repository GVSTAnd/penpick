import {
    REFRESH_TOKEN,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    REFRESH_URL,
    SEARCH_URL,
    ARTIST_URL,
    CREATE_PLAYLIST_URL,
    PLAYLIST_URL,
    CURRENT_PLAYLISTS_URL
} from './constants';
import { Response } from 'node-fetch';
import fetch from 'node-fetch';
import { Playlist, PlaylistMetaData, SearchOptions } from '../../types/spotify-types';

export class SpotifyClient {
    private static instance: SpotifyClient;
    private accessToken = '';
    private tokenTime: Date = new Date();

    constructor() {
        if (SpotifyClient.instance) {
            return SpotifyClient.instance;
        }
        SpotifyClient.instance = this;
    }

    private async checkTokenTime(): Promise<void> {
        if (new Date() >= this.tokenTime) await this.refreshToken();
    }

    private async refreshToken(): Promise<void> {
        const body = new URLSearchParams();
        const headers = {
            Authorization:
                'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET, 'binary').toString('base64')
        };
        body.append('grant_type', 'refresh_token');
        body.append('refresh_token', REFRESH_TOKEN);

        const response: Response = await fetch(REFRESH_URL, {
            method: 'POST',
            body: body,
            headers: headers
        });

        const data: any = await response.json();
        const expireTime = new Date();
        expireTime.setSeconds(data.expires_in);
        this.accessToken = data.access_token;
        this.tokenTime = expireTime;
    }

    private async search(query: string, types: string[], options?: SearchOptions): Promise<any> {
        await this.checkTokenTime();
        const queryParameter = {
            query: query,
            types: types.join(','),
            ...options
        };
        const response: Response = await fetch(SEARCH_URL + new URLSearchParams(queryParameter));
        return await response.json();
    }

    async searchArtists(query: string, options?: SearchOptions): Promise<any> {
        const response: Response = await this.search(query, ['artist'], options);
        return await response.json();
    }

    async searchPlaylists(query: string, options?: SearchOptions): Promise<any> {
        const response: Response = await this.search(query, ['playlist'], options);
        return await response.json();
    }

    async getArtistID(artist: string): Promise<string> {
        const artistData = await this.searchArtists(artist);
        const artistItems: any[] = artistData.artists.items;
        return artistItems.length !== 0 ? artistItems[0].id : '';
    }

    async getTopTracks(artistId: string): Promise<string[]> {
        await this.checkTokenTime();
        const response: Response = await fetch(ARTIST_URL + `/${artistId}/top-tracks`);
        const tracksData: any = await response.json();
        return tracksData.tracks.map((track: any) => track.uri);
    }

    async createPlaylist(playlistMeta: PlaylistMetaData): Promise<Playlist> {
        await this.checkTokenTime();
        const response: Response = await fetch(CREATE_PLAYLIST_URL, {
            method: 'POST',
            body: JSON.stringify(playlistMeta),
            headers: { Authorization: `Bearer ${this.accessToken}` }
        });
        const playlistData: any = await response.json();
        return await { id: playlistData.id, link: playlistData.external_urls.spotify };
    }

    async addTracksToPlaylist(playlistId: string, tracks: string[]): Promise<void> {
        await this.checkTokenTime();
        const response: Response = await fetch(PLAYLIST_URL + `${playlistId}/tracks`, {
            method: 'POST',
            body: JSON.stringify({ uris: tracks }),
            headers: { Authorization: `Bearer ${this.accessToken}` }
        });
        const data = await response.json();
        await console.log(data);
    }
}
