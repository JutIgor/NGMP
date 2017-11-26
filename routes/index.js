import usersRoutes from './users';
import productsRoutes from './products';
import authRoutes from './auth';
import citiesRoutes from './cities';

import jwtVerifier from '../middlewares/jwtVerifier';

export default (app) => {
  app.use('/api/users', jwtVerifier, usersRoutes);
  app.use('/api/products', jwtVerifier, productsRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/cities', citiesRoutes);

  app.use('/', (req, res) => {
    res.send('Hello World!');
  });
};