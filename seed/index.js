import data from './data.json';

import { cities, products, users } from '../models';

const seedIfNeeded = (model) => {
  const modelName = model.collection.name;

  return model.count()
    .then(count => count === 0 ? model.collection.insert(data[modelName]) : null)
    .catch(err => console.log(err));
};

const seed = () => {
  return Promise.all([
    seedIfNeeded(cities),
    seedIfNeeded(products),
    seedIfNeeded(users),
  ]);
};

export default seed;
