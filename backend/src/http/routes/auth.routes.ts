import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';

const router = Router();
console.log('🔧 Criando AuthController...');
const authController = new AuthController();
console.log('✅ AuthController criado');

router.post('/login', (req, res, next) => {
  console.log('📥 Rota /login recebida');
  console.log('📦 Body:', { email: req.body?.email, password: req.body?.password ? '***' : undefined });
  // O método login já trata os erros e chama next(error), então não precisamos wrapper
  authController.login(req, res, next);
});

router.get('/me', authenticate, authController.getCurrentUser);

console.log('✅ Rotas de autenticação configuradas');
export default router;

