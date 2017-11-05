const http = require('http');

const defaultRequestHandler = (request, response) => response.end('Hello, World!');
const defaultPort = 3333;

const createServer = (requestHandler = defaultRequestHandler, port = defaultPort) => {
  const server = http.createServer(requestHandler);

  server.listen(port, (err) => {
    if (err) {
      return console.log('Error occurred', err);
    }

    console.log(`Server is listening on ${port}`);
  });
};

module.exports = createServer;