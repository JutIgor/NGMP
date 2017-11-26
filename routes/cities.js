import { Router } from 'express';
import * as controller from '../controllers/cities';

const router = new Router();

router.get('/', controller.getCities);
router.get('/random', controller.getRandomCity);
router.get('/randomManually', controller.getRandomCityManually);
router.post('/create', controller.createCity);

export default router;