import { getBands } from '../services/scrapping';
import { ScrapingError } from '../services/scrapping/exceptions';
import { Band } from '../types/band-types';

function getBandsDistance(origin: Band, final: Band): Band {
    const deltaX = final.coordenates[0] - origin.coordenates[0];
    const deltaY = final.coordenates[1] - origin.coordenates[1];
    const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return { ...final, distance: delta };
}

const getBandsRecomendations = async (inputBand: string): Promise<string[]> => {
    try {
        const bands = await getBands(inputBand);
        const distance_bands: Band[] = bands.map((band: Band) => getBandsDistance(bands[0], band));
        distance_bands.sort((a: Band, b: Band) => (a.distance || 0) - (b.distance || 0));
        return distance_bands.map((band: Band) => band.name);
    } catch (error) {
        console.log(error);
        throw new ScrapingError(inputBand);
    }
};

export { getBandsRecomendations };
