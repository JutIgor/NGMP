import usersRoutes from './users';
import productsRoutes from './products';

export default (app) => {
  app.use('/api/users', usersRoutes);
  app.use('/api/products', productsRoutes);

  app.use('/', (req, res) => {
    res.send('Hello World!');
  });
};