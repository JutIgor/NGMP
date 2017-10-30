import { Router } from 'express';
import * as controller from '../controllers/products';

const router = new Router();

router.get('/', controller.getProducts);
router.post('/', controller.createProduct);
router.get('/:id', controller.getProductById);
router.get('/:id/reviews', controller.getProductReviewsById);

export default router;