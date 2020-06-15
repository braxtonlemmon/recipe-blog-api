"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("./users"));

var _recipes = _interopRequireDefault(require("./recipes"));

var _comments = _interopRequireDefault(require("./comments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  users: _users["default"],
  recipes: _recipes["default"],
  comments: _comments["default"]
};
exports["default"] = _default;