import createServer from './server';

const requestHandler = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
};

createServer(requestHandler);