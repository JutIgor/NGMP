import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import queryParser from './middlewares/queryParser';
import cookieParser from './middlewares/cookieParser';

import './auth';

const app = express();

app.use(bodyParser.json());
app.use(queryParser);
app.use(cookieParser);

routes(app);

export default app;