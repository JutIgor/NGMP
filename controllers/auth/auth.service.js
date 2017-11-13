import jwt from 'jsonwebtoken';

import { users, secretKey } from './mock';

export default class AuthService {
  constructor() {
    this.users = users;
  }

  getUserByLogin = (login) => this.users.find(e => e.login === login);

  getToken = (login) => jwt.sign({ login }, secretKey, { expiresIn: '1h' });
  
  validateSimple = (login, password) => {
    if (!(login && password)) return null;

    const user = this.getUserByLogin(login);

    return user.password === password
      ? this.getToken(login)
      : null;
  }
}

