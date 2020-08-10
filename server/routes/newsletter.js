import { Router } from 'express';
import newsletterController from '../controllers/newsletterController';
import passport from 'passport';

const router = Router();

// POST send a mass newsletter to all email addresses in db
router.post('/', newsletterController.sendNewsletter);

// POST send a test newsletter to myself
router.post('/test', newsletterController.sendNewsletterTest);

export default router;