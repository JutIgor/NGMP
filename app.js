import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import queryParser from './middlewares/queryParser';
import cookieParser from './middlewares/cookieParser';

import './auth';

const app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(queryParser);
app.use(cookieParser);

routes(app);

export default app;