import passport from 'passport';
import { isObjectEmpty } from '../../utils';

import auth from './auth.service.js';

export const validateSimple = (req, res, next) => {
  const { body: { login, password } } = req;

  return auth.validate(login, password)
    .then(isAuthenticated => {
      return isAuthenticated
        ? res.status(200).json({ token: auth.getToken(login) })
        : res.status(401).send('Invalid login or password');
    });
};

export const passportAuth = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, { session: false }, (error, user, info) => {
    const err = error || !isObjectEmpty(info) && info;

    if (err) return res.status(401).json(err);

    return res.status(200).json({ token: auth.getToken(user) });
  })(req, res);
};
