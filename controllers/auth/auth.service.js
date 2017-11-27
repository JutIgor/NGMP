import jwt from 'jsonwebtoken';

import { secretKey } from './config';

import { users } from '../../models';

class AuthService {
  getUserByLogin = (login) => users.findOne({ login: login });

  getToken = (login) => jwt.sign({ login }, secretKey, { expiresIn: '1h' });

  validate = (login, password) => {
    return this.getUserByLogin(login)
      .then(({ password: pas }) => pas === password);
  }
}

export default new AuthService();
