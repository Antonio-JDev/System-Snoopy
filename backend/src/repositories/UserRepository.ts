import { type User } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      console.log('📦 Obtendo PrismaClient...');
      console.log('✅ PrismaClient obtido, buscando usuário:', email);
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log('📊 Resultado da busca:', user ? 'Usuário encontrado' : 'Usuário não encontrado');
      return user;
    } catch (error: any) {
      console.error('❌ Erro no UserRepository.findByEmail:', error);
      console.error('❌ Stack:', error.stack);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'ATTENDANT' | 'DRIVER';
  }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }
}

