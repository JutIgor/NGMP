import Products from './products.service.js';

export const getProducts = (req, res, next) => {
  return Products.getProducts()
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
};

export const getProductById = (req, res, next) => {
  const { params: { id } } = req;

  return Products.getProductById(id)
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
}

export const getProductReviewsById = (req, res, next) => {
  const { params: { id } } = req;

  return Products.getProductReviewsById(id)
    .then(data => res.json(data))
    .catch(() => res.status(404).end());
}

export const createProduct = (req, res, next) => {
  const { body: { name, reviews } } = req;

  return Products.createProduct(name, reviews)
    .then(data => res.json(data))
    .catch(() => res.status(422).end());
};

