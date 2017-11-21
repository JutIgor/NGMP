import usersRoutes from './users';
import productsRoutes from './products';
import authRoutes from './auth';

import jwtVerifier from '../middlewares/jwtVerifier';

export default (app) => {
  app.use('/api/users', jwtVerifier, usersRoutes);
  app.use('/api/products', jwtVerifier, productsRoutes);
  app.use('/api/auth', authRoutes);

  app.use('/', (req, res) => {
    res.send('Hello World!');
  });
};