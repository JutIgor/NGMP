const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

const parser = require('nomnom');
const through = require('through2');
const split = require('split');
const request = require('request');

const readDir = promisify(fs.readdir);

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
      case 'transform':
        transform();
        break;
      case 'io':
        inputOutput(file);
        break;
      case 'transform-file':
        transformFile(file);
        break;
      case 'bundle-css':
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
    console.log(chunk.toString());
    this.push(`${chunk.toString()}\n`);

    cb();
  });

  const flags = (() => {
    const flags = { flags: 'a' };
    let first = true;

    return () => {
      if (first) {
        first = false;
        return null;
      } else {
        return flags;
      }
    }
  })();

  function next(source, converter, flags) {
    return new Promise((res, rej) => {
      const dest = fs.createWriteStream('bundle.css', flags);

      source.on('end', () => {
        res();
      });

      source
        .pipe(converter)
        .pipe(dest);
    });
  }

  readDir(dirPath)
    .then(files => {
      return files
        .filter(file => path.extname(file) === '.css')
        .map(file => getFilePath(dirPath, file))
        .map(file => fs.createReadStream(file))
        .concat(request('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css'));
    })
    .then(streams => {
      streams
        .reduce((p, file) => p.then(() => next(file, converter(), flags())), Promise.resolve());
    })
}

function getJsonConverter() {
  let first = true;

  return through(function (chunk, enc, cb) {
    first && this.push('[');
    !first && this.push(',');

    first && (first = false);

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

if (__filename === process.argv[1]) {
  run()
}

module.exports = run;