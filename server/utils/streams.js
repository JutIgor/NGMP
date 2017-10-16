const fs = require('fs');
const path = require('path');

const parser = require('nomnom');
const through = require('through2');
const split = require('split');

function run() {
  const { action, file } = parser
    .option('action', {
      abbr: 'a',
      help: 'Name of action',
      position: 0,
    })
    .option('file', {
      abbr: 'f',
      help: 'File path'
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
    }
  } else {
    console.log('Usage: node streams.js [action] [options]');
  }
}

function createPipe(source, dest, cb) {
  source
    .pipe(split())
    .pipe(cb)
    .pipe(dest);
}

function inputOutput(filePath) {
  createPipe(fs.createReadStream(filePath), process.stdout, getJsonConverter());
}

function transformFile(filePath) {
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

if (__filename === process.argv[1]) {
  run()
}

module.exports = run;