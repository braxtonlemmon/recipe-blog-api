import { Router } from 'express';
import userController from '../controllers/userController';
import passport from 'passport';

const router = Router();

// router.post('/',        userController.createUser);
// router.put('/:id',      userController.updateUser);
// router.delete('/:id',   userController.destroyUser);
// router.get('/:id',      userController.showUser);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.createUser
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.destroyUser
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.showUser
);


export default router;