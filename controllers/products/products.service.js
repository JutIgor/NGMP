import { products } from '../../models';

export const getProducts = () => products.findAll({});

export const getProductById = (id) => products.find({ where: { id: id } });

export const getProductReviewsById = (id) => products.find({
  attributes: ['reviews'],
  where: { id: id },
});

export const createProduct = (name, reviews) => {
  return products.create({ name, reviews });
}

