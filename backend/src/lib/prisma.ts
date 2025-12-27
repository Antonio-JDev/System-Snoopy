import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Singleton do PrismaClient para evitar múltiplas instâncias
let prisma: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    // Garantir que DATABASE_URL está definida
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL não está definida no arquivo .env');
    }
    
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }
  return prisma;
}

// Exporta a função para obter a instância (lazy initialization)
// Não inicializa no nível do módulo para evitar problemas com ESM
export default getPrismaClient;

