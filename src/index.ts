import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { Application } from 'express';
import { engine } from 'express-handlebars';
import { routerApi } from './routes';
import { PORT } from './config/settings';

const app: Application = express();

app.use(express.static(path.join(__dirname, '../public/css')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../templates/'));
routerApi(app);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
