import fs from 'fs';
import pathModule from 'path';
import { promisify } from 'util';

import emitter from './emitter';

const readDir = promisify(fs.readdir);
const stat = promisify(fs.stat);

class Dirwatcher {
  constructor() {
    this.intervalID = null;
    this.trackedFiles = {};
  }

  watch(path, delay) {
    this.intervalID = setInterval(() => {
      readDir(path)
        .then(files => {
          const filePaths = files.map(file => this.getFilePath(path, file));
          const stats = filePaths.map(filePath => this.getLastUpdateTimeAsync(filePath));

          return Promise.all(stats);
        })
        .then(stats => {
          stats.forEach(stat => {
            const { path, lastUpdateTime } = stat;

            if (this.trackedFiles[path] !== lastUpdateTime) {
              this.trackedFiles[path] = lastUpdateTime;

              emitter.emit('dirwatcher:changed', path);
            }
          });
        })
        .catch(err => console.error(err));
    }, delay);
  }

  unwatch() {
    clearInterval(this.intervalID);

    this.intervalID = null;
    this.trackedFiles = {};
  }

  getLastUpdateTimeAsync(path) {
    return stat(path)
      .then(({ mtimeMs }) => ({ path, lastUpdateTime: mtimeMs }));
  }

  getFilePath(dirPath, filePath) {
    return pathModule.resolve(dirPath, filePath);
  }
}

export default Dirwatcher;