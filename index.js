import app from './app';
import db from './models';

const port = process.env.port || 8080;

db.sequelize.sync()
  .then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
  })
  .catch(err => console.info(err));

    // app.listen(port, () => console.log(`App listening on port ${port}!`))
