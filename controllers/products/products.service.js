import { products } from '../../models';

class ProductsService {
  getProducts = () => products.find({});

  getProductById = (id) => products.findById(id);

  getProductReviewsById = (id) => this.getProductById(id).select('reviews');

  createProduct = (name, reviews) => products.create({ name, reviews });
}

export default new ProductsService();

