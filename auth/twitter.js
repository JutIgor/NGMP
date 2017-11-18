import passport from 'passport';
import { Strategy } from 'passport-twitter';

import { twitter as config } from './config';

passport.use(new Strategy(
  config,
  (token, tokenSecret, profile, cb) => {
    return cb(null, profile);
  }
));