import Comment from '../models/comment';
import { body, validationResult } from 'express-validator';

const recipeComments = (req, res, next) => {
  Comment.find({ recipe: req.params.recipeid })
  .populate('recipe')
  .sort({ level: 1, created: 1})
  .exec((err, comments) => {
    if (err) {
      return next(err);
    }
    return res.json({ success: true, data: comments });
  });
}

const indexComments = (req, res, next) => {
  Comment.find({  })
  .populate('recipe')
  .sort({ created: -1})
  .exec((err, comments) => {
    if (err) {
      return next(err);
    }
    return res.json({ success: true, data: comments });
  });
}

const unseenComments = (req, res, next) => {
  Comment.find({ answered: false })
  .sort({ created: -1 })
  .exec((err, comments) => {
    if (err) {
      return next(err);
    }
    return res.json({ success: true, data: comments });
  });
}

const createComment = [
  body('content', 'Content is required').trim().isLength({ min: 1, max: 1000 }),
  body('name').escape(),
  // body('recipe', 'Recipe is required').trim().isLength({ min: 1 }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    const comment = new Comment({
      content: req.body.content,
      name: req.body.name === '' ? 'Anonymous' : req.body.name,
      created: Date.now(),
      recipe: req.body.recipe._id,
      level: req.body.level === 0 ? 0 : 1,
      parent: req.body.parent,
      fromAdmin: req.body.fromAdmin,
      answered: req.body.answered ? req.body.answered : false,
    });
    if (!errors.isEmpty()) {
      res.send({ comment: comment, errors: errors.array() });
      return;
    }
    comment.save(err => {
      if (err) {
        return next(err);
      }
      res.send(comment);
    })
  }
];

const updateCommentGet = function (req, res, next) {
  Comment.findById(req.params.id)
  .exec(function(err, comment) {
    if (err) { return next(err) }
    if (comment === null) {
      const err = new Error('Comment not found');
      err.status = 404;
      return next(err);
    }
    res.send({ success: true, comment: comment })
  })
}

const updateCommentPost = [
  body('content', 'Content is required').trim().isLength({ min: 1, max: 1000 }),
  body('name').escape(),
  // body('recipe', 'Recipe is required').trim().isLength({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);
    const comment = new Comment({
      content: req.body.content,
      name: req.body.name === '' ? 'Anonymous' : req.body.name,
      created: req.body.created,
      recipe: req.body.recipe._id,
      level: req.body.level,
      parent: req.body.parent,
      answered: req.body.answered,
      fromAdmin: req.body.fromAdmin,
      _id: req.params.id
    });
    if (!errors.isEmpty()) {
      res.send({ comment: comment, errors: errors.array() });
      return;
    }
    Comment.findByIdAndUpdate(req.params.id, comment, {}, function(err, theComment) {
      if (err) {
        return next(err);
      }
      res.send(theComment);
    })
  }
]

const destroyComment = (req, res, next) => {
  const id = req.params.id;
  Comment.findById(id)
  .exec((err, comment) => {
    if (err) {
      return next(err);
    }
    Comment.findByIdAndRemove(id, function deleteComment(err) {
      if (err) {
        return next(err);
      }
      res.send('comment deleted');
    })
  })
}

export default {
  recipeComments,
  indexComments,
  unseenComments,
  createComment,
  destroyComment,
  updateCommentGet,
  updateCommentPost
}