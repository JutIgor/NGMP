import AuthService from './auth.service.js';

const auth = new AuthService();

export const validateSimple = (req, res, next) => {
  const { body: { login, password } } = req;

  const token = auth.validateSimple(login, password);

  return token
    ? res.status(200).json({ token })
    : res.status(401).send('Invalid login or password');
};