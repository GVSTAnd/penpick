export class SpotifyApiError extends Error {
    constructor() {
        super('Connection error, please retry in a few minutes');
    }
}
