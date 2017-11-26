import Cities from './cities.service';

export const getCities = (req, res, next) => {
  return Cities.getCities()
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
};

export const getRandomCity = (req, res, next) => {
  return Cities.getRandomCity()
    .then(data => res.json(data))
    .catch((err) => (console.log(err), res.status(404).end()));
};

export const getRandomCityManually = (req, res, next) => {
  return Cities.getRandomCityManually()
    .then(data => res.json(data))
    .catch((err) => (console.log(err), res.status(404).end()));
};

export const createCity = (req, res, next) => {
  const { name, country, capital, location } = req.body;

  return Cities.createCity({ name, country, capital, location })
    .then(data => res.json(data))
    .catch((err) => (console.log(err), res.status(422).end()));
};
