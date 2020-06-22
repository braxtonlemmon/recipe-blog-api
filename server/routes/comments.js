import { Router } from 'express';
import commentsController from '../controllers/commentController';
import passport from 'passport';
const router = Router();

// GET all comments for specific recipe
router.get('/:recipeid', commentsController.recipeComments);

// GET all comments (order by date)
router.get('/',       commentsController.indexComments);

// GET all unseen comments (order by date)
router.get('/unseen', commentsController.unseenComments);

// POST new comment to specific recipe
router.post('/',      commentsController.createComment);

// DELETE comment by id
router.delete('/:id', passport.authenticate('jwt', { session: false }), commentsController.destroyComment);

// GET comment data for comment update form
router.get(
  "/:id/edit",
  passport.authenticate("jwt", { session: false }),
  commentsController.updateCommentGet
)

// UPDATE single comment by id
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  commentsController.updateCommentPost
);

export default router;