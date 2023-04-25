import { PlaylistDetails } from '../types/spotify-types';

const shuffleArray = (array: Array<any>): Array<any> => {
    return array.sort((a: any, b: any) => 0.5 - Math.random());
};

const capitalizeText = (word: string): string => {
    word = word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const generatePlaylistKey = (details: PlaylistDetails): string => {
    const topRelated = details.topArtist ? 'TOP10' : '-';
    const shuffled = details.shuffle ? 'Shuffled' : '-';
    return `${details.baseBand}${topRelated}${shuffled}`;
};

export { shuffleArray, capitalizeText, generatePlaylistKey };
