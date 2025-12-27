import bcrypt from 'bcryptjs';
import { AppError } from '../shared/errors/AppError.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { JWTService } from '../shared/services/jwt.service.js';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    if (!user.isActive) {
      throw new AppError('Usuário inativo', 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    const token = JWTService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

