import ProductsService from './products.service.js';

const products = new ProductsService();

export const getProducts = (req, res, next) => {
  return res.json(products.getProducts());
};

export const getProductById = (req, res, next) => {
  const { params: { id } } = req;

  const product = products.getProductById(id);

  if (product) return res.json(product);

  return res.status(404).end();
}

export const getProductReviewsById = (req, res, next) => {
  const { params: { id } } = req;

  const product = products.getProductReviewsById(id);

  if (product) return res.json(product);

  return res.status(404).end();
}

export const createProduct = (req, res, next) => {
  const { body: { reviews } } = req;

  if (!reviews) return res.status(500).end();

  const newProduct = products.addProduct(reviews);

  return res.json(newProduct);

  res.end();
};

