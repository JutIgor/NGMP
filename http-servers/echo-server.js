import createServer from './server';

const requestHandler = (request, response) => request.pipe(response);

createServer(requestHandler);