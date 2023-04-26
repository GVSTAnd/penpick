import {expect, test} from '@jest/globals';
import { MockSpotifyClient } from './mocks/spotify.mock';
import { getPlaylistUrl, getRecommendedTracks } from '../src/controllers/spotify.controller';
import { SpotifyApiError } from '../src/services/spotify/exceptions';



test('Recommended Tracks test', async () => {
    const client = new MockSpotifyClient()
    const tracks = await getRecommendedTracks(client,['nirvana','metallica'])
    expect(tracks.length).toBe(6);
  });

test('Get playlist url test', async () => {
    const client = new MockSpotifyClient()
    const playlistUrl = await getPlaylistUrl(client,['track1','track2','track3'],'playlistKey')
    expect(playlistUrl).toBe("https://spotify.com/someplaylistlol");
});

test('Get playlist url test error', async () => {
    const client = new MockSpotifyClient()
    await expect(() => getPlaylistUrl(client, ['track1', 'track2', 'track3'], 'error')).rejects.toThrow(SpotifyApiError);
}); 
