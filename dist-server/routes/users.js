"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/', _userController["default"].createUser);
router.put('/:id', _userController["default"].updateUser);
router["delete"]('/:id', _userController["default"].destroyUser);
router.get('/:id', _userController["default"].showUser);
var _default = router;
exports["default"] = _default;