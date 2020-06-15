import { Router } from 'express';
import commentsController from '../controllers/commentController';
// import passport from 'passport';
const router = Router();

router.get('/',       commentsController.indexComments);
router.get('/:recipeid', commentsController.recipeComments);
router.post('/',      commentsController.createComment);
router.delete("/:id", commentsController.destroyComment);

// router.delete('/comments/:id', passport.authenticate('jwt', { session: false }), commentsController.destroyComment);

export default router;