import { users } from '../../models';

export const index = (req, res, next) => {
  users.findAll({})
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
};