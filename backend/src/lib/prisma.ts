import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Função para manter compatibilidade com código existente
export function getPrismaClient(): PrismaClient {
  return prisma;
}

// Função para testar a conexão com o banco de dados
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    console.log('✅ Conexão com o banco de dados estabelecida');
    return true;
  } catch (error: any) {
    console.error('❌ Erro ao conectar com o banco de dados:');
    console.error('   Mensagem:', error?.message);
    console.error('   Stack:', error?.stack);
    return false;
  }
}

export default prisma;
