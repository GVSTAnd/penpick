import { SpotifyClient } from '../services/spotify/client';
import { SpotifyApiError } from '../services/spotify/exceptions';
import { Playlist, PlaylistMetaData } from '../types/spotify-types';

const getRecommendedTracks = async (client: SpotifyClient, bands: string[]): Promise<string[]> => {
    const artistsId = await Promise.all(bands.map(band => client.getArtistID(band)));
    const topTracks = await Promise.all(artistsId.map(async artistId => await client.getTopTracks(artistId)));
    return topTracks.reduce((acc, tracks) => acc.concat(tracks), []);
};

const generatePlaylistMetaData = (playlistKey: string): PlaylistMetaData => {
    return {
        name: `Playlist if you like: ${playlistKey}`,
        description: 'Hope you like it. If it was usefull please share with your friends',
        public: true
    };
};

const getPlaylistUrl = async (client: SpotifyClient, tracks: string[], playlistKey: string): Promise<string> => {
    try {
        const playlistMeta: PlaylistMetaData = generatePlaylistMetaData(playlistKey);
        const playlist: Playlist = await client.createPlaylist(playlistMeta);

        for (let i = 0; i < tracks.length; i += 100) {
            const trackBatch = tracks.slice(i, i + 100);
            await client.addTracksToPlaylist(playlist.id, trackBatch);
        }

        return await playlist.link;
    } catch (error) {
        console.log(error);
        throw new SpotifyApiError();
    }
};

export { getPlaylistUrl, getRecommendedTracks };
