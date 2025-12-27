import { type User } from '@prisma/client';
import getPrismaClient from '../lib/prisma.js';

// Lazy initialization - só cria quando necessário
const getPrisma = () => getPrismaClient();

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const prisma = getPrisma();
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    const prisma = getPrisma();
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
    const prisma = getPrisma();
    return prisma.user.create({
      data,
    });
  }
}

