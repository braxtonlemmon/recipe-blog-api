"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _recipeController = _interopRequireDefault(require("../controllers/recipeController"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/', _recipeController["default"].indexRecipes);
router.get("/published", _recipeController["default"].indexPublishedRecipes);
router.post("/recipes", _passport["default"].authenticate("jwt", {
  session: false
}), _recipeController["default"].createRecipe);
router.put("/recipes/:id", _passport["default"].authenticate("jwt", {
  session: false
}), _recipeController["default"].updateRecipe);
router["delete"]("/recipes/:id", _passport["default"].authenticate("jwt", {
  session: false
}), _recipeController["default"].destroyRecipe);
router.get('/:id', _recipeController["default"].showRecipe);
var _default = router;
exports["default"] = _default;