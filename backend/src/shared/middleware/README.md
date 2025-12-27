# Middlewares de Autenticação

## Uso dos Middlewares

### 1. `authenticate` - Autenticação obrigatória

Protege rotas que requerem autenticação. Verifica se o token JWT é válido.

```typescript
import { Router } from 'express';
import { authenticate } from '../shared/middleware';
import { AppError } from '../shared/errors/AppError';

const router = Router();

// Rota protegida - requer autenticação
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    // req.user contém os dados do usuário autenticado
    return res.json({ user: req.user });
  } catch (error) {
    next(error); // O errorHandler vai capturar
  }
});
```

### 2. `authorize` - Autorização por role

Verifica se o usuário tem a role necessária para acessar a rota.

```typescript
import { authenticate, authorize } from '../shared/middleware';

// Apenas administradores podem acessar
router.get('/admin', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    return res.json({ message: 'Acesso permitido' });
  } catch (error) {
    next(error);
  }
});

// Atendentes e administradores podem acessar
router.get('/orders', authenticate, authorize('ADMIN', 'ATTENDANT'), async (req, res, next) => {
  try {
    return res.json({ orders: [] });
  } catch (error) {
    next(error);
  }
});
```

### 3. `optionalAuthenticate` - Autenticação opcional

Tenta autenticar, mas não falha se não houver token. Útil para rotas públicas que podem mostrar conteúdo adicional se o usuário estiver autenticado.

```typescript
import { optionalAuthenticate } from '../shared/middleware';

router.get('/public', optionalAuthenticate, async (req, res, next) => {
  try {
    // req.user pode ser undefined se não houver token
    const isAuthenticated = !!req.user;
    return res.json({ isAuthenticated });
  } catch (error) {
    next(error);
  }
});
```

## Headers necessários

Para rotas protegidas, o cliente deve enviar o token no header:

```
Authorization: Bearer <seu-token-jwt>
```

## Exemplo completo de rota protegida

```typescript
import { Router } from 'express';
import { authenticate, authorize } from '../shared/middleware';

const router = Router();

// Rota protegida para administradores
router.get(
  '/admin/users',
  authenticate,                    // Verifica se está autenticado
  authorize('ADMIN'),              // Verifica se é administrador
  async (req, res, next) => {
    try {
      // req.user está disponível aqui
      const { userId, email, role } = req.user!;
      
      // Sua lógica aqui...
      return res.json({ message: 'Acesso permitido' });
    } catch (error) {
      next(error); // O errorHandler vai capturar
    }
  }
);
```

## Variáveis de Ambiente

Adicione ao seu arquivo `.env`:

```env
JWT_SECRET=sua-chave-secreta-super-segura-aqui
JWT_EXPIRES_IN=24h
```
