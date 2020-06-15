"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authController = _interopRequireDefault(require("../controllers/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/login', _authController["default"].login);
router.get('/logout', _authController["default"].logout);
var _default = router;
exports["default"] = _default;