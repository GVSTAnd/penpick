import { SpotifyClient } from '../services/spotify/client';
import { SpotifyApiError } from '../services/spotify/exceptions';
import { Playlist, PlaylistMetaData, PlaylistOptions } from '../types/spotify-types';
import { shuffleArray } from './utils';

const getRecommendedTracks = async (client: SpotifyClient, bands: string[]): Promise<string[]> => {
    const artistsId = await Promise.all(bands.map(band => client.getArtistID(band)));
    const topTracks = await Promise.all(artistsId.map(async artistId => await client.getTopTracks(artistId)));
    return topTracks.reduce((acc, tracks) => acc.concat(tracks), []);
};

const generatePlaylistMetaData = (baseBand: string, options: PlaylistOptions): PlaylistMetaData => {
    const topRelated = options.topArtist ? 'TOP10' : '-';
    const shuffled = options.shuffle ? 'Shuffled' : '-';
    return {
        name: `Playlist if you like: ${baseBand}. ${topRelated} ${shuffled}`,
        description: 'Hope you like it. If it was usefull please share with your friends',
        public: true
    };
};

const getSpotifyUrl = async (baseBand: string, bands: string[], options: PlaylistOptions): Promise<string> => {
    try {
        const spotifyClient = new SpotifyClient();
        let tracks = await getRecommendedTracks(spotifyClient, bands);

        const playlistMeta: PlaylistMetaData = generatePlaylistMetaData(baseBand, options);
        const playlist: Playlist = await spotifyClient.createPlaylist(playlistMeta);

        tracks = (await options.shuffle) ? shuffleArray(tracks) : tracks;

        await spotifyClient.addTracksToPlaylist(playlist.id, tracks);

        return await playlist.link;
    } catch (error) {
        throw new SpotifyApiError();
    }
};
