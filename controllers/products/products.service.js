import products from './mock';

export default class ProductsService {
  constructor() {
    this.products = products;
    this.id = 2; // id for new products
  }

  getProducts = () => this.products;

  getProductById = (id) => this.products[id];

  getProductReviewsById = (id) => {
    const product = this.getProductById(id);

    return product && product.reviews;
  }

  addProduct = (reviews) => {
    this.products[++this.id] = { reviews };

    return this.products[this.id];
  }
}

