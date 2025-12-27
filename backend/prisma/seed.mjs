import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida no arquivo .env');
}

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Criar usuário admin
  const adminEmail = 'admin@snoopydog.com';
  const adminPassword = 'admin123';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Usuário admin já existe');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Usuário admin criado:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Senha: ${adminPassword}`);
  console.log(`   ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

