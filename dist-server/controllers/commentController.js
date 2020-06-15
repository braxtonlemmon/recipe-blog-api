"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _comment = _interopRequireDefault(require("../models/comment"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var recipeComments = function recipeComments(req, res, next) {
  _comment["default"].find({
    recipe: req.params.recipeid
  }).exec(function (err, comments) {
    if (err) {
      return next(err);
    }

    return res.json({
      success: true,
      data: comments
    });
  });
};

var indexComments = function indexComments(req, res, next) {
  _comment["default"].find({}).exec(function (err, comments) {
    if (err) {
      return next(err);
    }

    res.send(comments);
    return;
  });
};

var createComment = [(0, _expressValidator.body)('content', 'Content is required').trim().isLength({
  min: 1,
  max: 1000
}), (0, _expressValidator.body)('name').escape(), (0, _expressValidator.body)('recipe', 'Recipe is required').trim().isLength({
  min: 1
}), function (req, res, next) {
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
}];

var destroyComment = function destroyComment(req, res, next) {
  var id = req.params.id;

  _comment["default"].findById(id).exec(function (err, comment) {
    if (err) {
      return next(err);
    }

    _comment["default"].findByIdAndRemove(id, function deleteComment(err) {
      if (err) {
        return next(err);
      }

      res.send('comment deleted');
    });
  });
};

var _default = {
  recipeComments: recipeComments,
  indexComments: indexComments,
  createComment: createComment,
  destroyComment: destroyComment
};
exports["default"] = _default;