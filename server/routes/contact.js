import { Router } from 'express';
const router = Router();
import contactController from '../controllers/contactController';

router.post('/', contactController.sendMail);

export default router;