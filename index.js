import mongoose from 'mongoose';

import { connectionString, defaultPort } from './config/config.json';

import app from './app';
import seed from './seed';

const port = process.env.port || defaultPort;
const listen = () => app.listen(port, () => console.log(`App listening on port ${port}!`));

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('error', () => console.log('connection error'));
db.once('open', () => seed().then(listen));
