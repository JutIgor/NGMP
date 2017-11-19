import passport from 'passport';
import { Strategy } from 'passport-local';

import { local as config } from './config';

import auth from '../controllers/auth/auth.service';

passport.use(new Strategy(
  config,
  (login, password, cb) => {
    return auth.validate(login, password)
      .then(isAuthenticated => {
        if (isAuthenticated) return cb(null, login);

        cb(null, false, { error: 'Invalid login or password' });
      });
  }
));
