"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _commentController = _interopRequireDefault(require("../controllers/commentController"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/:recipeid', _commentController["default"].recipeComments);
router.get('/', _commentController["default"].indexComments);
router.post('/', _commentController["default"].createComment);
router["delete"]('/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _commentController["default"].destroyComment);
var _default = router;
exports["default"] = _default;