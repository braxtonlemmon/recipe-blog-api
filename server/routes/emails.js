import { Router } from 'express';
import emailController from '../controllers/emailController';
import passport from 'passport';

const router = Router();

// GET all email addresses
router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  emailController.indexEmails
);

// POST new email address to db
router.post('/', emailController.createAddress);

// POST send a mass newsletter to all email addresses in db
router.post('/newsletter', emailController.sendNewsletter);

// POST send a test newsletter to myself
router.post('/newsletterTest', emailController.sendNewsletterTest);

export default router;


