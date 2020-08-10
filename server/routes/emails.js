import { Router } from 'express';
import emailController from '../controllers/emailController';
const router = Router();

// GET all email addresses
router.get("/", emailController.emailsTotalCount);

// GET single email address from subscriberId
router.get('/:id', emailController.getEmail);

// POST new email address to db
router.post('/', emailController.createAddress);

// DELETE email address from db
router.delete('/:id', emailController.deleteAddress);

export default router;


