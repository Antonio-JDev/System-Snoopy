import { type Request, type Response, type NextFunction } from 'express';
import { AuthService } from '../../services/AuthService.js';
import { AppError } from '../../shared/errors/AppError.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError('Email e senha são obrigatórios', 400);
      }

      const result = await this.authService.login(email, password);

      return res.status(200).json(result);
    } catch (error) {
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

