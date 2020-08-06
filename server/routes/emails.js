import { Router } from 'express';
import emailController from '../controllers/emailController';
import passport from 'passport';

const router = Router();

// GET all email addresses
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  emailController.indexEmails
);

// POST new email address to db
router.post('/', emailController.createEmail);

export default router;


