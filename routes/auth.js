import { Router } from 'express';
import * as controller from '../controllers/auth';

import passport from 'passport';

const router = new Router();

router.post('/', controller.passportAuth('local'));
router.post('/simple', controller.validateSimple);

router.get('/vk', passport.authenticate('vkontakte'));
router.get('/vk/callback', controller.passportAuth('vkontakte'));

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', controller.passportAuth('twitter'));

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', controller.passportAuth('google'));

export default router;