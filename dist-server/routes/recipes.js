"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _recipeController = _interopRequireDefault(require("../controllers/recipeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import passport from 'passport';
var router = (0, _express.Router)();
router.get('/', _recipeController["default"].indexRecipes);
router.get("/published", _recipeController["default"].indexPublishedRecipes);
router.post('/', _recipeController["default"].createRecipe);
router.put('/:id', _recipeController["default"].updateRecipe);
router["delete"]('/:id', _recipeController["default"].destroyRecipe);
router.get('/:id', _recipeController["default"].showRecipe); // router.post(
//   "/recipes",
//   passport.authenticate("jwt", { session: false }),
//   recipeController.createRecipe
// );
// router.put(
//   "/recipes/:id",
//   passport.authenticate("jwt", { session: false }),
//   recipeController.updateRecipe
// );
// router.delete(
//   "/recipes/:id",
//   passport.authenticate("jwt", { session: false }),
//   recipeController.destroyRecipe
// );

var _default = router;
exports["default"] = _default;