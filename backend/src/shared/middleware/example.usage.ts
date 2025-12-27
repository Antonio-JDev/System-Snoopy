/**
 * EXEMPLO DE USO DOS MIDDLEWARES DE AUTENTICAÇÃO
 * 
 * Este arquivo serve apenas como referência e não deve ser importado
 */

import { Router } from 'express';
import { authenticate, authorize, optionalAuthenticate } from './index';

const router = Router();

// ============================================
// EXEMPLO 1: Rota pública (sem autenticação)
// ============================================
router.get('/public', async (req, res, next) => {
  try {
    return res.json({ message: 'Rota pública' });
  } catch (error) {
    next(error);
  }
});

// ============================================
// EXEMPLO 2: Rota protegida (requer autenticação)
// ============================================
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    // req.user está disponível aqui após o middleware authenticate
    const { userId, email, role } = req.user!;
    
    return res.json({
      userId,
      email,
      role,
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// EXEMPLO 3: Rota apenas para ADMIN
// ============================================
router.get('/admin/users', 
  authenticate,           // Primeiro verifica autenticação
  authorize('ADMIN'),     // Depois verifica se é ADMIN
  async (req, res, next) => {
    try {
      // Só chega aqui se for ADMIN autenticado
      return res.json({ message: 'Lista de usuários' });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// EXEMPLO 4: Rota para ADMIN ou ATTENDANT
// ============================================
router.get('/orders',
  authenticate,
  authorize('ADMIN', 'ATTENDANT'),  // Permite ADMIN ou ATTENDANT
  async (req, res, next) => {
    try {
      return res.json({ orders: [] });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// EXEMPLO 5: Autenticação opcional
// ============================================
router.get('/products', optionalAuthenticate, async (req, res, next) => {
  try {
    // Se houver token válido, req.user estará disponível
    // Se não houver, req.user será undefined
    const isAuthenticated = !!req.user;
    
    // Pode mostrar conteúdo adicional para usuários autenticados
    return res.json({
      products: [],
      isAuthenticated,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// EXEMPLO 6: Múltiplos middlewares
// ============================================
router.post('/orders/:id/deliver',
  authenticate,                    // 1. Verifica autenticação
  authorize('ADMIN', 'ATTENDANT'),  // 2. Verifica role
  async (req, res, next) => {
    try {
      // 3. Sua lógica aqui
      const { id } = req.params;
      const { userId } = req.user!;
      
      // Lógica de entrega...
      return res.json({ 
        message: 'Pedido marcado como entregue',
        orderId: id,
        deliveredBy: userId,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
