import { users } from '../../models';

export const index = (req, res, next) => {
  users.find({})
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
};