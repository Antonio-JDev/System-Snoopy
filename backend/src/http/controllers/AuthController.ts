import { type Request, type Response, type NextFunction } from 'express';
import { AuthService } from '../../services/AuthService.js';
import { AppError } from '../../shared/errors/AppError.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    try {
      console.log('🔧 Criando AuthService...');
      this.authService = new AuthService();
      console.log('✅ AuthService criado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao criar AuthService:', error);
      throw error;
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('🔐 Método login chamado');
      console.log('📦 Request body:', JSON.stringify(req.body));
      
      const { email, password } = req.body;

      if (!email || !password) {
        console.log('❌ Email ou senha não fornecidos');
        throw new AppError('Email e senha são obrigatórios', 400);
      }

      console.log('🔐 Tentativa de login:', email);
      const result = await this.authService.login(email, password);
      console.log('✅ Login bem-sucedido para:', email);

      return res.status(200).json(result);
    } catch (error: any) {
      console.error('❌ Erro no login controller:');
      console.error('   Tipo:', error?.constructor?.name);
      console.error('   Mensagem:', error?.message);
      console.error('   Stack:', error?.stack);
      next(error);
    }
  };

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('Usuário não autenticado', 401);
      }

      const user = await this.authService.getCurrentUser(req.user.userId);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

