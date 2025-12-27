import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/me', authenticate, authController.getCurrentUser);

export default router;

