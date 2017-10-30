import createServer from './server';

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    {
      color: 'blue'
    }, {
      size: 'XL'
    }
  ],
};

const requestHandler = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(product));
};

createServer(requestHandler);