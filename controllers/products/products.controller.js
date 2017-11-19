import * as products from './products.service.js';

export const getProducts = (req, res, next) => {
  return products.getProducts()
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
};

export const getProductById = (req, res, next) => {
  const { params: { id } } = req;

  return products.getProductById(id)
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
}

export const getProductReviewsById = (req, res, next) => {
  const { params: { id } } = req;

  return products.getProductReviewsById(id)
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
}

export const createProduct = (req, res, next) => {
  const { body: { name, reviews } } = req;

  return products.createProduct(name, reviews)
    .then(data => res.json(data))
    .catch(() => res.status(422).end());
};

