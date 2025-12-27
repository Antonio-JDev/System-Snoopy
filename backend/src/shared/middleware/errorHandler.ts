import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Log detalhado do erro
  console.error('\n🚨 ========== ERRO CAPTURADO ==========');
  console.error('📋 Tipo:', err.constructor.name);
  console.error('💬 Mensagem:', err.message);
  console.error('📍 Stack:', err.stack);
  console.error('🌐 URL:', request.url);
  console.error('📦 Method:', request.method);
  console.error('📥 Body:', JSON.stringify(request.body, null, 2));
  console.error('📥 Headers:', JSON.stringify(request.headers, null, 2));
  console.error('=====================================\n');

  // Se o erro foi instanciado pela nossa classe AppError
  if (err instanceof AppError) {
    console.log('✅ Erro tratado como AppError, status:', err.statusCode);
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Log detalhado para o desenvolvedor ver o que quebrou de verdade
  console.error('❌ Erro Interno não tratado:', err);

  // Resposta genérica para o cliente (segurança: não expõe detalhes do servidor)
  return response.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal server error',
  });
}