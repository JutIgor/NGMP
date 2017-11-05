import fs from 'fs';
import path from 'path';
import through from 'through2';

const createServer = require('./server');

const converter = () => {
  return through(function (chunk, enc, cb) {
    this.push(chunk.toString().replace(/{message}/, 'Hi there!'));

    cb();
  });
};

const requestHandler = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  const html = path.resolve(__dirname, 'mock/index.html');
  const htmlStream = fs.createReadStream(html);

  htmlStream.on('error', function handleError(err) {
    response.statusCode = 500;
    response.end(err.message);
  });

  htmlStream
    .pipe(converter())
    .pipe(response);
};

createServer(requestHandler);