export class ScrapingError extends Error {
    constructor(bandName: string) {
        super(`We dont find ${bandName}, are you sure you wrote it right?`);
    }
}
