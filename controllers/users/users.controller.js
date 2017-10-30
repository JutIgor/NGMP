import users from './mock';

export const index = (req, res, next) => {
  res.json(users);
};