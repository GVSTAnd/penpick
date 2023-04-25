import { Request, Response, Router } from 'express';

import express from 'express';
import { getRecommendedTracks, getPlaylistUrl } from '../controllers/spotify.controller';
import { getBandsRecomendations } from '../controllers/scraping.controller';
import { SpotifyClient } from '../services/spotify/client';
import { PlaylistDetails } from '../types/spotify-types';
import { capitalizeText, generatePlaylistKey, shuffleArray } from './utils';
import { CacheStorageClient } from '../services/storage/client';

const bandRouter: Router = express.Router();
const storage = new CacheStorageClient();

bandRouter.get('/', (request: Request, response: Response) => {
    response.render('index.handlebars');
});

bandRouter.post('/form', async (request: Request, response: Response) => {
    const band: string = request.body.band.trim();

    const playlistDetail: PlaylistDetails = {
        baseBand: capitalizeText(band),
        shuffle: request.body.shuffle ? true : false,
        topArtist: request.body.top ? true : false
    };

    const playlistKey = generatePlaylistKey(playlistDetail);

    const cachedPlaylist = storage.getValue(playlistKey);
    if (cachedPlaylist) return await response.json({ spotifyUrl: cachedPlaylist });

    try {
        const spotifyClient = new SpotifyClient();

        let recomendations: string[] = await getBandsRecomendations(band);
        recomendations = playlistDetail.topArtist ? recomendations.slice(0, 10) : recomendations;

        let tracks = await getRecommendedTracks(spotifyClient, recomendations);
        tracks = playlistDetail.shuffle ? shuffleArray(tracks) : tracks;

        const spotifyUrl = await getPlaylistUrl(spotifyClient, tracks, playlistKey);

        storage.setValue(playlistKey, spotifyUrl);

        return await response.json({ spotifyUrl });
    } catch (error: any) {
        response.send({ error: error.message });
    }
});

export { bandRouter };
