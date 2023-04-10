import { Request, Response, Router } from 'express';

import express from 'express';
import { getBandsRecomendations } from '../controllers/scrapping.controller';
import { getRecommendedTracks, getPlaylistUrl } from '../controllers/spotify.controller';
import { SpotifyClient } from '../services/spotify/client';
import { PlaylistDetails } from '../types/spotify-types';
import { capitalizeText, shuffleArray } from './utils';
const bandRouter: Router = express.Router();

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

    //check in file and if exist return the spotifyUrl

    const spotifyClient = new SpotifyClient();
    let recomendations: string[] = await getBandsRecomendations(band);
    recomendations = playlistDetail.topArtist ? recomendations.slice(0, 10) : recomendations;

    let tracks = await getRecommendedTracks(spotifyClient, recomendations);
    tracks = playlistDetail.shuffle ? shuffleArray(tracks) : tracks;

    const spotifyUrl = await getPlaylistUrl(spotifyClient, tracks, playlistDetail);

    await response.render('index.handlebars', { spotifyUrl });
});

export { bandRouter };
