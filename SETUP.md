# Setup do Projeto Snoopydog

## Configuração do Backend

1. Instale as dependências:
```bash
cd backend
npm install
```

2. Configure as variáveis de ambiente criando um arquivo `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/snoopydog?schema=public"
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
PORT=3000
```

3. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

4. Execute o seed para criar o usuário admin:
```bash
npm run seed
```

O usuário admin será criado com:
- Email: `admin@snoopydog.com`
- Senha: `admin123`

5. Inicie o servidor:
```bash
npm run dev
```

## Configuração do Frontend

1. Instale as dependências:
```bash
cd frontend
npm install
```

2. Configure as variáveis de ambiente criando um arquivo `.env`:
```env
VITE_API_URL=http://localhost:3000
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Login

Use as credenciais do seed:
- Email: `admin@snoopydog.com`
- Senha: `admin123`

