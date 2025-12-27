import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { JWTService } from '../services/jwt.service';
import { JWTPayload } from '../types/jwt.types';

// Estende o tipo Request para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

/**
 * Middleware de autenticação JWT
 * Verifica se o token é válido e adiciona o usuário ao request
 */
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    const token = JWTService.extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AppError('Token não fornecido', 401);
    }

    const decoded = JWTService.verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Token inválido ou expirado', 401);
  }
}

/**
 * Middleware de autorização por role
 * Verifica se o usuário tem a role necessária para acessar a rota
 */
export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Usuário não autenticado', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError('Acesso negado. Permissão insuficiente', 403);
    }

    next();
  };
}

/**
 * Middleware opcional de autenticação
 * Tenta autenticar, mas não falha se não houver token
 * Útil para rotas que podem ser acessadas com ou sem autenticação
 */
export function optionalAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    const token = JWTService.extractTokenFromHeader(authHeader);

    if (token) {
      const decoded = JWTService.verifyToken(token);
      req.user = decoded;
    }
  } catch (error) {
    // Ignora erros de autenticação opcional
  }

  next();
}
