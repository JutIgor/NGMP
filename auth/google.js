import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

import { google as config } from './config';

passport.use(new Strategy(
  config,
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile.id);
  }
));
