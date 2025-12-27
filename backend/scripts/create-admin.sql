-- Script SQL para criar usuário admin
-- Execute: psql -U seu_usuario -d snoopydog -f scripts/create-admin.sql
-- Ou copie e cole no Prisma Studio > SQL Editor

-- Primeiro, gere o hash bcrypt de 'admin123' online ou use este (pode variar):
-- Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

INSERT INTO "users" (
  "id",
  "name",
  "email",
  "password",
  "role",
  "isActive",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Administrador',
  'admin@snoopydog.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- hash de 'admin123'
  'ADMIN',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

