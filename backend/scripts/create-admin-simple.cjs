// Script alternativo usando pg diretamente (sem Prisma)
// Execute: node scripts/create-admin-simple.js

require('dotenv/config');
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

if (!process.env.DATABASE_URL) {
  console.error('❌ Erro: DATABASE_URL não está definida no arquivo .env');
  process.exit(1);
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await client.connect();
    console.log('🌱 Conectado ao banco de dados...');

    const adminEmail = 'admin@snoopydog.com';
    const adminPassword = 'admin123';

    // Verificar se já existe
    const checkResult = await client.query(
      'SELECT id, email FROM users WHERE email = $1',
      [adminEmail]
    );

    if (checkResult.rows.length > 0) {
      console.log('✅ Usuário admin já existe');
      console.log(`   Email: ${checkResult.rows[0].email}`);
      console.log(`   ID: ${checkResult.rows[0].id}`);
      return;
    }

    // Criar hash da senha
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Criar usuário
    const result = await client.query(
      `INSERT INTO users (id, name, email, password, role, "isActive", "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, email, name`,
      ['Administrador', adminEmail, hashedPassword, 'ADMIN', true]
    );

    const admin = result.rows[0];

    console.log('✅ Usuário admin criado com sucesso!');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Senha: ${adminPassword}`);
    console.log(`   ID: ${admin.id}`);
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();

