import bcrypt from 'bcryptjs';
import { AppError } from '../shared/errors/AppError.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { JWTService } from '../shared/services/jwt.service.js';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    try {
      console.log('🔧 Criando UserRepository...');
      this.userRepository = new UserRepository();
      console.log('✅ UserRepository criado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao criar UserRepository:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      console.log('🔍 Buscando usuário:', email);
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        console.log('❌ Usuário não encontrado:', email);
        throw new AppError('Email ou senha inválidos', 401);
      }

      console.log('✅ Usuário encontrado:', user.email, 'Ativo:', user.isActive);

      if (!user.isActive) {
        throw new AppError('Usuário inativo', 403);
      }

      console.log('🔐 Verificando senha...');
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.log('❌ Senha inválida para:', email);
        throw new AppError('Email ou senha inválidos', 401);
      }

      console.log('✅ Senha válida, gerando token...');
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
    } catch (error) {
      console.error('❌ Erro no AuthService.login:', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Erro ao processar login', 500);
    }
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

