import { Router } from 'express';
import * as controller from '../controllers/users';

const router = new Router();

router.get('/', controller.index);

export default router;