import passport from 'passport';
import { Strategy } from 'passport-local';

import { local as config } from './config';

import auth from '../controllers/auth/auth.service';

passport.use(new Strategy(
  config,
  (login, password, cb) => {
    const token = auth.validate(login, password);

    if (token) return cb(null, token);

    return cb(null, false, { error: 'Invalid login or password' });
  }
));
