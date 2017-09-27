import path from 'path';

import { config } from './config';
import { User, Product } from './models';
import Dirwatcher from './dirwatcher';
import Importer from './importer';

const {
  delay,
  directory,
  name,
} = config;

// console.log(config.name);
// const user = new User();
// const product = new Product();

const dirwatcher = new Dirwatcher();
const importer = new Importer();

dirwatcher.watch(path.resolve(__dirname, directory), delay);
