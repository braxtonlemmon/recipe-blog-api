import Recipe from '../models/recipe';
import Comment from '../models/comment';
import { body, validationResult } from 'express-validator';
const he = require('he');
const async = require('async');

const indexRecipes = (req, res, next) => {
  Recipe.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    data.forEach(recipe => {
      recipe.title = he.decode(recipe.title);
      recipe.images = recipe.images.map(image => he.decode(image));
      recipe.intro = he.decode(recipe.intro);
      recipe.quote = he.decode(recipe.quote);
      recipe.size = he.decode(recipe.size);
      recipe.steps = recipe.steps.map(step => he.decode(step));
      recipe.ingredients = recipe.ingredients.map(ingredient => he.decode(ingredient));
      recipe.description = he.decode(recipe.description);
      recipe.keywords = he.decode(recipe.keywords);
      recipe.category = he.decode(recipe.category);
      recipe.cook_method = he.decode(recipe.cook_method);
      recipe.cuisine = he.decode(recipe.cuisine);
    })
    return res.json({ success: true, data: data });
  });
}

const indexPublishedRecipes = (req, res, next) => {
  Recipe.find({ is_published: true })
  .exec(function(err, data) {
    if (err) return res.json({ success: false, error: err });
    data.forEach((recipe) => {
      recipe.title = he.decode(recipe.title);
      recipe.images = recipe.images.map(image => he.decode(image));
      recipe.intro = he.decode(recipe.intro);
      recipe.quote = he.decode(recipe.quote);
      recipe.size = he.decode(recipe.size);
      recipe.steps = recipe.steps.map((step) => he.decode(step));
      recipe.ingredients = recipe.ingredients.map((ingredient) => he.decode(ingredient));
      recipe.description = he.decode(recipe.description);
      recipe.keywords = he.decode(recipe.keywords);
      recipe.category = he.decode(recipe.category);
      recipe.cook_method = he.decode(recipe.cook_method);
      recipe.cuisine = he.decode(recipe.cuisine);
    });
    return res.json({ success: true, data: data });
  });
}

const showRecipe = (req, res, next) => {
  Recipe.findById(req.params.id)
  .exec(function(err, recipe) {
    if (err) { return next(err) }
    if (recipe === null) {
      const err = new Error('Recipe not found');
      err.status = 404;
      return next(err);
    }
    return res.json({ success: true, data: recipe });
  });
};

const createRecipe = [
  body('title', 'Title is required').trim().isLength({ min: 1 }),
  body('ingredients', 'Ingredients are required.').exists(),
  body('steps', 'Recipe steps are required.').exists(),
  body('images', "At least one image required.").exists(),
  body('size', 'Size is required').trim().isLength({ min: 1}),
  body('intro', 'Intro is required').trim().isLength({ min: 1 }),
  body('quote', 'Quote is required').trim().isLength({ min: 1 }),
  body('description', 'Description is required').trim().isLength({ min: 1 }),
  body('keywords', 'At least one keyword is required.').trim().isLength({ min: 1 }),
  body('prep_time', 'Prep time is required').exists(),
  body('cook_time', 'Cook time is required').exists(),
  body('category', 'Category is required').trim().isLength({ min: 1 }),
  body('cook_method', 'Cooking method is required').trim().isLength({ min: 1 }),
  body('cuisine', 'Cuisine is required').trim().isLength({ min: 1 }),


  body('title').escape(),
  body('ingredients.*').escape(),
  body('steps.*').escape(),
  body('size').escape(),
  body('intro').escape(),
  body('quote').escape(),
  body('images.*').escape(),
  body('description').escape(),
  body('keywords').escape(),
  body('prep_time').escape(),
  body('cook_time').escape(),
  body('category').escape(),
  body('cook_method').escape(),
  body('cuisine').escape(),

  (req, res, next) => {
    console.log(req.body.image);
    const errors = validationResult(req);
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: JSON.parse(req.body.ingredients),
      steps: JSON.parse(req.body.steps),
      size: req.body.size,
      intro: req.body.intro,
      quote: req.body.quote,
      images: JSON.parse(req.body.images),
      is_published: req.body.is_published,
      publish_date: req.body.is_published === 'true' ? Date.now() : null,
      description: req.body.description,
      keywords: req.body.keywords,
      prep_time: req.body.prep_time,
      cook_time: req.body.cook_time,
      category: req.body.category,
      cook_method: req.body.cook_method,
      cuisine: req.body.cuisine,
      ratings: []
    })
    // req.body.intro ? (recipe.intro = req.body.intro) : null;
    // req.body.quote ? (recipe.quote = req.body.quote) : null;
    if (!errors.isEmpty()) {
      res.send({ recipe: recipe, errors: errors.array() });
      return;
    }
    else {
      recipe.save(function(err) {
        console.log('saving');
        if (err) { 
          console.log('problem saving...');
          return next(err) 
        }
        res.send(recipe);
      })
    }
  }
];

const updateRecipe = [
  body("title", "Title is required").trim().isLength({ min: 1 }),
  body("ingredients", "Ingredients are required.").exists(),
  body("steps", "Recipe steps are required.").exists(),
  body("images", "At least one image required.").exists(),
  // body('duration', 'Recipe duration is required').exists(),
  body('size', 'Size is required').exists(),
  body('intro', 'Intro is required').trim().isLength({ min: 1 }),
  body('quote', 'Quote is required').trim().isLength({ min: 1 }),
  body('description', 'Description is required').trim().isLength({ min: 1 }),
  body('keywords', 'At least one keyword is required.').trim().isLength({ min: 1 }),
  body('prep_time', 'Prep time is required').exists(),
  body('cook_time', 'Cook time is required').exists(),
  body('category', 'Category is required').trim().isLength({ min: 1 }),
  body('cook_method', 'Cooking method is required').trim().isLength({ min: 1 }),
  body('cuisine', 'Cuisine is required').trim().isLength({ min: 1 }),
  
  body('title').escape(),
  body('ingredients.*').escape(),
  body('steps.*').escape(),
  body('images.*').escape(),
  // body('duration').escape(),
  body('size').escape(),
  body('intro').escape(),
  body('quote').escape(),
  body('description').escape(),
  body('keywords').escape(),
  body('prep_time').escape(),
  body('cook_time').escape(),
  body('category').escape(),
  body('cook_method').escape(),
  body('cuisine').escape(),


  (req, res, next) => {
    const errors = validationResult(req);
  
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: JSON.parse(req.body.ingredients),
      steps: JSON.parse(req.body.steps),
      duration: req.body.duration,
      size: req.body.size,
      images: JSON.parse(req.body.images),
      is_published: req.body.is_published,
      publish_date: Date.now(),
      intro: req.body.intro,
      quote: req.body.quote,
      description: req.body.description,
      keywords: req.body.keywords,
      prep_time: req.body.prep_time,
      cook_time: req.body.cook_time,
      category: req.body.category,
      cook_method: req.body.cook_method,
      cuisine: req.body.cuisine,
      
      _id: req.params.id,
    });
    // req.body.intro ? (recipe.intro = req.body.intro) : null;
    // req.body.quote ? (recipe.quote = req.body.quote) : null;
    if (!errors.isEmpty()) {
      res.send(errors.array());
      return;
    }
    else {
      Recipe.findByIdAndUpdate(req.params.id, recipe, {}, function (err, theRecipe) {
        if (err) {
          return next (err);
        }
        res.send(theRecipe);
      })
    }
  }
];

const updateRecipeRatings = (req, res, next) => {
  const id = req.params.id;
  const rating = req.body.rating;
  Recipe.findOneAndUpdate(
    { _id: id},
    { $push: { ratings: rating } },
    function(error, success) {
      if (error) {
        console.log(error);
        return next(err);
      } else {
        console.log(success);
        res.send(success);
      }
    }
  );
}

const destroyRecipe = (req, res, next) => {
  const id = req.params.id;
  async.parallel({
    recipe: function(callback) {
      Recipe.findById(id).exec(callback)
    },
    comments: function(callback) {
      Comment.find({ 'recipe': id }).exec(callback)
    },
  }, function(err, results) {
    if (err) { return next(err) }
    Recipe.findByIdAndRemove(id, function deleteRecipe(err) {
      if (err) { return next(err) }
      results.comments.forEach(comment => {
        Comment.findByIdAndRemove(comment._id, function deleteComment(err) {
          if (err) { return next(err) }
        })
      })
      res.send('recipe deleted');
    })
  })
}


export default {
  indexRecipes,
  indexPublishedRecipes,
  createRecipe,
  updateRecipe,
  destroyRecipe,
  showRecipe,
  updateRecipeRatings,
}

