"use strict";

require('dotenv').config({
  path: './variables.env'
});

var app = require('./app');

var http = require('http'); // const port = '9000';
// app.set('port', port);
// const server = http.createServer(app);
// server.listen(port);


var serverless = require('serverless-http');

module.exports.handler = serverless(app);