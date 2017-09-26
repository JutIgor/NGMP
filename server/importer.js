import fs from 'fs';
import { promisify } from 'util';

import emitter from './emitter';

const readFile = promisify(fs.readFile);

class Importer {
  constructor(isSync) {
    emitter.on('dirwatcher:changed', path => this.import(path, isSync));
  }

  import(path, sync) {
    if (sync) return this.importSync(path);

    return this.importAsync(path);
  }

  importAsync(path) {
    readFile(path)
      .then(data => (console.log(`async import ${path} finished!`), this.csvToJson(data)))
      .catch(err => console.error(err));
  } 

  importSync(path) {
    const data = fs.readFileSync(path);

    console.log(`sync import ${path} finished!`);

    return this.csvToJson(data);
  }

  csvToJson(data) {
    const parsedData = data
      .toString()
      .split('\n')
      .map(line => line.split(/(".*")?,/g).filter(Boolean));

    return JSON.stringify(parsedData);
  }
}

export default Importer;