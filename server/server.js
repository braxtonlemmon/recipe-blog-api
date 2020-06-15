require('dotenv').config({ path: './variables.env' });
const app = require('./app');
const http = require('http');

// const port = '9000';
// app.set('port', port);

// const server = http.createServer(app);

// server.listen(port);



const serverless = require('serverless-http');

module.exports.handler = serverless(app);
