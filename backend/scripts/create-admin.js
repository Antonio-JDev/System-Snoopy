// Script simples para criar usuário admin
// Execute: node scripts/create-admin.js

require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

if (!process.env.DATABASE_URL) {
  console.error('❌ Erro: DATABASE_URL não está definida no arquivo .env');
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Criando usuário admin...');

  const adminEmail = 'admin@snoopydog.com';
  const adminPassword = 'admin123';

  // Verificar se já existe
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Usuário admin já existe');
    console.log(`   Email: ${existingAdmin.email}`);
    console.log(`   ID: ${existingAdmin.id}`);
    return;
  }

  // Criar hash da senha
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Criar usuário
  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Usuário admin criado com sucesso!');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Senha: ${adminPassword}`);
  console.log(`   ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar usuário:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

