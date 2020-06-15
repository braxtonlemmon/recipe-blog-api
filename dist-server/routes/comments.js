"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _commentController = _interopRequireDefault(require("../controllers/commentController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import passport from 'passport';
var router = (0, _express.Router)();
router.get('/', _commentController["default"].indexComments);
router.get('/:recipeid', _commentController["default"].recipeComments);
router.post('/', _commentController["default"].createComment);
router["delete"]("/:id", _commentController["default"].destroyComment); // router.delete('/comments/:id', passport.authenticate('jwt', { session: false }), commentsController.destroyComment);

var _default = router;
exports["default"] = _default;