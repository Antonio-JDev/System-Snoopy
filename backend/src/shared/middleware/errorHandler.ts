import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Se o erro foi instanciado pela nossa classe AppError
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Log detalhado para o desenvolvedor ver o que quebrou de verdade
  console.error('❌ Erro Interno:', err);

  // Resposta genérica para o cliente (segurança: não expõe detalhes do servidor)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}