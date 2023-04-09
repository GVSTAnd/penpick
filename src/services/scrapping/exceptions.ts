export class ScrapingError extends Error {}
export class BandNotFoundError extends ScrapingError {
    constructor(bandName: string) {
        super(`We dont find ${bandName}, are you sure you wrote it right?`);
    }
}
export class EmptyBandDataError extends ScrapingError {
    constructor(pageUrl: string) {
        super(`The following page doesnt have any band info ${pageUrl}`);
    }
}
