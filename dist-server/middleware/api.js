"use strict";

var _comment = _interopRequireDefault(require("../models/comment"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var router = express.Router();
// Get comments for specific recipe
router.get('/comments/:recipeid', function (req, res, next) {
  _comment["default"].find({
    recipe: req.params.recipeid
  }).exec(function (err, comments) {
    if (err) {
      return next(err);
    }

    res.json({
      success: true,
      data: comments
    });
    return;
  });
}); // Create comment

router.post('/comments', [(0, _expressValidator.body)('content', 'Content is required').trim().isLength({
  min: 1,
  max: 1000
}), (0, _expressValidator.body)('name').escape(), (0, _expressValidator.body)('recipe', 'Recipe is required').trim().isLength({
  min: 1
}), function (req, res, next) {
  console.log('made it to here');
  var errors = (0, _expressValidator.validationResult)(req);
  var comment = new _comment["default"]({
    content: req.body.content,
    name: req.body.name === '' ? 'Anonymous' : req.body.name,
    created: Date.now(),
    recipe: req.body.recipe
  });

  if (!errors.isEmpty()) {
    res.send({
      comment: comment,
      errors: errors.array()
    });
    return;
  }

  comment.save(function (err) {
    if (err) {
      return next(err);
    }

    res.send(comment);
  });
}]);
module.exports = router;