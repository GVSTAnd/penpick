import { Application } from 'express';
import { bandRouter } from './band.routes';

function routerApi(app: Application) {
    app.use('/', bandRouter);
}

export { routerApi };
