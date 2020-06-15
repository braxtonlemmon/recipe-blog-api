"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // router.post('/',        userController.createUser);
// router.put('/:id',      userController.updateUser);
// router.delete('/:id',   userController.destroyUser);
// router.get('/:id',      userController.showUser);

router.post("/", _passport["default"].authenticate("jwt", {
  session: false
}), _userController["default"].createUser);
router.put("/:id", _passport["default"].authenticate("jwt", {
  session: false
}), _userController["default"].updateUser);
router["delete"]("/:id", _passport["default"].authenticate("jwt", {
  session: false
}), _userController["default"].destroyUser);
router.get("/:id", _passport["default"].authenticate("jwt", {
  session: false
}), _userController["default"].showUser);
var _default = router;
exports["default"] = _default;