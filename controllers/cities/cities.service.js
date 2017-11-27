import { cities } from '../../models';

class CitiesService {
  getCities = () => cities.find();

  getRandomCityManually = () => {
    return cities.count()
      .then(amount => Math.floor(Math.random() * amount))
      .then(skip => cities.aggregate([{ $skip: skip }, { $limit: 1 }]));
  };

  getRandomCity = () => cities.aggregate([{ $sample: { size: 1 } }]);

  createCity = (city) => cities.create(city);
}

export default new CitiesService();


