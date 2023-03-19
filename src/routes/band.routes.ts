import { Request, Response, Router } from 'express';

import express from 'express';
const bandRouter: Router = express.Router();

bandRouter.get('/', (request: Request, response: Response) => {
    response.render('index.handlebars');
});

bandRouter.post('/form', async (request: Request, response: Response) => {
    const band: string = request.body.band.trim();
    const shuffle_value: boolean = request.body.shuffle ? true : false;
    const top_ten: boolean = request.body.top ? true : false;
    try {
        const spotifyUrl = 'spotify URL';
        await response.render('index.handlebars', { spotifyUrl });
    } catch (error) {
        response.render('index.handlebars', { error });
    }
});

export { bandRouter };
