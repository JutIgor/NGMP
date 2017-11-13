import { Router } from 'express';
import * as controller from '../controllers/auth';

const router = new Router();

router.post('/', controller.validateSimple);

export default router;