const http = require('http');
const app = require('./app');
const { PORT } = require('./config');

const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port);

console.log('Servidor corriendo en el puerto: ' + port);

