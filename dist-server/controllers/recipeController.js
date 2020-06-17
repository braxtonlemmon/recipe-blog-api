"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _recipe = _interopRequireDefault(require("../models/recipe"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var he = require('he'); // const upload = require('../services/file-upload');


var indexRecipes = function indexRecipes(req, res, next) {
  _recipe["default"].find(function (err, data) {
    if (err) return res.json({
      success: false,
      error: err
    });
    data.forEach(function (recipe) {
      recipe.title = he.decode(recipe.title);
      recipe.image ? recipe.image = he.decode(recipe.image) : null;
      recipe.intro = he.decode(recipe.intro);
      recipe.quote = he.decode(recipe.quote);
      recipe.steps = recipe.steps.map(function (step) {
        return he.decode(step);
      });
      recipe.ingredients = recipe.ingredients.map(function (ingredient) {
        return he.decode(ingredient);
      });
    });
    return res.json({
      success: true,
      data: data
    });
  });
};

var indexPublishedRecipes = function indexPublishedRecipes(req, res, next) {
  _recipe["default"].find({
    is_published: true
  }).exec(function (err, data) {
    if (err) return res.json({
      success: false,
      error: err
    });
    data.forEach(function (recipe) {
      recipe.title = he.decode(recipe.title);
      recipe.image ? recipe.image = he.decode(recipe.image) : null;
      recipe.intro = he.decode(recipe.intro);
      recipe.quote = he.decode(recipe.quote);
      recipe.steps = recipe.steps.map(function (step) {
        return he.decode(step);
      });
      recipe.ingredients = recipe.ingredients.map(function (ingredient) {
        return he.decode(ingredient);
      });
    });
    return res.json({
      success: true,
      data: data
    });
  });
};

var showRecipe = function showRecipe(req, res, next) {
  _recipe["default"].findById(req.params.id).exec(function (err, recipe) {
    if (err) {
      return next(err);
    }

    if (recipe === null) {
      var _err = new Error('Recipe not found');

      _err.status = 404;
      return next(_err);
    }

    return res.json({
      success: true,
      data: recipe
    });
  });
};

var createRecipe = [// upload.single('image'),
(0, _expressValidator.body)('title', 'Title is required').trim().isLength({
  min: 1
}), (0, _expressValidator.body)('ingredients', 'Ingredients are required.').exists(), (0, _expressValidator.body)('steps', 'Recipe steps are required.').exists(), (0, _expressValidator.body)('title').escape(), (0, _expressValidator.body)('ingredients.*').escape(), (0, _expressValidator.body)('steps.*').escape(), (0, _expressValidator.body)('image').escape(), function (req, res, next) {
  console.log(req.body.image);
  var errors = (0, _expressValidator.validationResult)(req);
  var recipe = new _recipe["default"]({
    title: req.body.title,
    ingredients: JSON.parse(req.body.ingredients),
    steps: JSON.parse(req.body.steps),
    is_published: req.body.is_published,
    publish_date: req.body.is_published === 'true' ? Date.now() : null // image: req.file === undefined ? '' : req.file.location

  });
  req.body.image ? recipe.image = he.decode(req.body.image) : null;
  req.body.intro ? recipe.intro = req.body.intro : null;
  req.body.quote ? recipe.quote = req.body.quote : null;

  if (!errors.isEmpty()) {
    res.send({
      recipe: recipe,
      errors: errors.array()
    });
    return;
  } else {
    recipe.save(function (err) {
      console.log('saving');

      if (err) {
        console.log('problem saving...');
        return next(err);
      }

      res.send(recipe);
    });
  }
}];
var updateRecipe = [// upload.single('image'),
(0, _expressValidator.body)("title", "Title is required").trim().isLength({
  min: 1
}), (0, _expressValidator.body)("ingredients", "Ingredients are required.").exists(), (0, _expressValidator.body)("steps", "Recipe steps are required.").exists(), (0, _expressValidator.body)('title').escape(), (0, _expressValidator.body)('ingredients.*').escape(), (0, _expressValidator.body)('steps.*').escape(), (0, _expressValidator.body)('image').escape(), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  var originalRecipe = function originalRecipe(callback) {
    _recipe["default"].findById(req.params.id).exec(callback);
  };

  var recipe = new _recipe["default"]({
    title: req.body.title,
    ingredients: JSON.parse(req.body.ingredients),
    steps: JSON.parse(req.body.steps),
    is_published: req.body.is_published,
    publish_date: Date.now(),
    // image: req.file === undefined ? originalRecipe.image : req.file.location, 
    _id: req.params.id
  });
  req.body.image ? recipe.image = he.decode(req.body.image) : null;
  req.body.intro ? recipe.intro = req.body.intro : null;
  req.body.quote ? recipe.quote = req.body.quote : null;

  if (!errors.isEmpty()) {
    res.send(errors.array());
    return;
  } else {
    _recipe["default"].findByIdAndUpdate(req.params.id, recipe, {}, function (err, theRecipe) {
      if (err) {
        return next(err);
      }

      res.send(theRecipe);
    });
  }
}];

var destroyRecipe = function destroyRecipe(req, res, next) {
  var id = req.params.id;

  _recipe["default"].findById(id).exec(function (err, recipe) {
    if (err) {
      return next(err);
    }

    _recipe["default"].findByIdAndRemove(id, function deleteRecipe(err) {
      if (err) {
        return next(err);
      }

      res.send('recipe deleted');
    });
  });
};

var _default = {
  indexRecipes: indexRecipes,
  indexPublishedRecipes: indexPublishedRecipes,
  createRecipe: createRecipe,
  updateRecipe: updateRecipe,
  destroyRecipe: destroyRecipe,
  showRecipe: showRecipe
};
exports["default"] = _default;