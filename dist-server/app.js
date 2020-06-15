"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db = require('./db');

var express = require('express');

var app = express();
app.use((0, _compression["default"])());
app.use((0, _helmet["default"])());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(express["static"](_path["default"].join(__dirname, "public")));
app.use('/api/users', _routes["default"].users);
app.use('/api/recipes', _routes["default"].recipes);
app.use('/api/comments', _routes["default"].comments);
module.exports = app;