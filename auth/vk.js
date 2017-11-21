import passport from 'passport';
import { Strategy } from 'passport-vkontakte';

import { vk as config } from './config';

passport.use(new Strategy(
  config,
  (accessToken, refreshToken, params, profile, cb) => {
    cb(null, profile.username);
  }
));
