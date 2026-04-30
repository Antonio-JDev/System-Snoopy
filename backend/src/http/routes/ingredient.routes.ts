import { Router } from 'express';
import { IngredientController } from '../controllers/IngredientController.js';
import { authenticate, authorize } from '../../shared/middleware/auth.middleware.js';

const router = Router();
const ingredientController = new IngredientController();

// Todas as rotas requerem autenticação
// Apenas ADMIN pode gerenciar insumos
router.get('/', authenticate, ingredientController.getAll);
router.get('/:id', authenticate, ingredientController.getById);
router.post('/', authenticate, authorize(['ADMIN']), ingredientController.create);
router.put('/:id', authenticate, authorize(['ADMIN']), ingredientController.update);
router.delete('/:id', authenticate, authorize(['ADMIN']), ingredientController.delete);

export default router;

