import { Router } from 'express';
import newsletterController from '../controllers/newsletterController';
import passport from 'passport';

const router = Router();

// POST send a mass newsletter to all email addresses in db
router.post('/', newsletterController.sendNewsletter);

// POST send a test newsletter to myself
router.post('/test', newsletterController.sendNewsletterTest);

// POST send a welcome email to new subscriber
router.post('/welcome', newsletterController.sendWelcome);

// POST send a notification of removal to admin email, then manually remove from list
router.post('/informUnsubscribe', newsletterController.informUnsubscribe);

export default router;