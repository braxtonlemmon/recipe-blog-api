import Comment from '../models/comment';
import { body, validationResult } from 'express-validator';

const recipeComments = (req, res, next) => {
  Comment.find({ recipe: req.params.recipeid })
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
  .sort({ level: 1, created: 1})
  .exec((err, comments) => {
    if (err) {
      return next(err);
    }
    res.send(comments);
    return;
  });
}

const createComment = [
  body('content', 'Content is required').trim().isLength({ min: 1, max: 1000 }),
  body('name').escape(),
  body('recipe', 'Recipe is required').trim().isLength({ min: 1 }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    const comment = new Comment({
      content: req.body.content,
      name: req.body.name === '' ? 'Anonymous' : req.body.name,
      created: Date.now(),
      recipe: req.body.recipe,
      replies: [],
      level: req.body.level === 0 ? 0 : 1,
      parent: req.body.parent
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
  createComment,
  destroyComment,
}