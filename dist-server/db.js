"use strict";

var mongoose = require('mongoose');

var mongoDB = process.env.DB;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.connection.on('error', console.error.bind(console, 'connection error'));