const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const parser = require('nomnom');
const through = require('through2');
const split = require('split');
const request = require('request');

const readDir = promisify(fs.readdir);

const {
  streams: {
    CONSTANTS,
    DEFAULT_BUNDLE_NAME,
    EXTENSION,
    REQUEST_URL,
  },
} = require('../config/config.json');

function run() {
  const { action, file, path } = parser
    .option('action', {
      abbr: 'a',
      help: 'Name of action',
      position: 0,
    })
    .option('file', {
      abbr: 'f',
      help: 'File path'
    })
    .option('path', {
      abbr: 'p',
      help: 'Directory path'
    })
    .parse();

  if (action) {
    switch (action) {
      case CONSTANTS.TRANSFORM:
        transform();
        break;
      case CONSTANTS.IO:
        inputOutput(file);
        break;
      case CONSTANTS.TRANSFORM_FILE:
        transformFile(file);
        break;
      case CONSTANTS.BUNDLE_CSS:
        bundle(path);
        break;
    }
  } else {
    console.log('Usage: node streams.js [action] [options]');
  }
}

function help(param) {
  console.log(`The '${param}' is required for this action`);
}

function createPipe(source, dest, cb) {
  source
    .pipe(split())
    .pipe(cb)
    .pipe(dest);
}

function inputOutput(filePath) {
  if (!filePath) return help('file');

  createPipe(fs.createReadStream(filePath), process.stdout, getJsonConverter());
}

function transformFile(filePath) {
  if (!filePath) return help('file');

  const filename = path.basename(filePath).split('.').shift();
  const destFileName = `${filename}.json`;

  createPipe(fs.createReadStream(filePath), fs.createWriteStream(destFileName), getJsonConverter());
}

function transform() {
  const converter = through(function (chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase());

    cb();
  });

  createPipe(process.stdin, process.stdout, converter);
}

function bundle(dirPath) {
  if (!dirPath) return help('path');

  const converter = () => through(function (chunk, enc, cb) {
    this.push(`${chunk.toString()}\n`);

    cb();
  });

  function next(source, converter, flags) {
    return new Promise((res, rej) => {
      const dest = fs.createWriteStream(DEFAULT_BUNDLE_NAME, flags);

      source.on('end', () => {
        res();
      });

      source
        .pipe(converter)
        .pipe(dest);
    });
  }

  const flags = getFlags();

  readDir(dirPath)
    .then(files => {
      return files
        .filter(file => path.extname(file) === EXTENSION)
        .map(file => getFilePath(dirPath, file))
        .map(file => fs.createReadStream(file))
        .concat(request(REQUEST_URL));
    })
    .then(streams => {
      streams
        .reduce((p, file) => p.then(() => next(file, converter(), flags())), Promise.resolve());
    })
}

function getJsonConverter() {
  let first = true;

  return through(function (chunk, enc, cb) {
    if (first) {
      this.push('[');
      first = false;
    } else {
      this.push(',');
    }

    this.push(csvToJson(chunk.toString()));

    cb();
  }, function (cb) { // flush function 
    this.push(']');

    cb();
  });
}

function csvToJson(data) {
  const parsedData = data.split(/(".*")?,/g).filter(Boolean);

  return JSON.stringify(parsedData);
}

function getFilePath(dirPath, filePath) {
  return path.resolve(dirPath, filePath);
}

function getFlags() {
  const flags = { flags: 'a' };
  let first = true;

  return () => {
    if (first) {
      first = false;
      return null;
    } else {
      return flags;
    }
  };
};

if (__filename === process.argv[1]) {
  run()
}

module.exports = {
  csvToJson,
  getFilePath,
  getFlags,
  getJsonConverter,
  help,
  run,
};