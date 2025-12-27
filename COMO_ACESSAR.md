# Como Acessar a Interface Web

## 📋 Pré-requisitos

1. ✅ Banco de dados PostgreSQL rodando (via Docker ou local)
2. ✅ Usuário admin criado (já foi criado!)
3. ✅ Variáveis de ambiente configuradas

## 🚀 Passo a Passo

### 1. Configurar Variáveis de Ambiente

#### Backend (.env)
Crie um arquivo `.env` na pasta `backend/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/snoopydog?schema=public"
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
PORT=3000
```

#### Frontend (.env)
Crie um arquivo `.env` na pasta `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

### 2. Iniciar o Backend

Abra um terminal e execute:

```bash
cd backend
npm install  # Se ainda não instalou as dependências
npm run dev
```

O backend estará rodando em: **http://localhost:3000**

### 3. Iniciar o Frontend

Abra outro terminal e execute:

```bash
cd frontend
npm install  # Se ainda não instalou as dependências
npm run dev
```

O frontend estará rodando em: **http://localhost:5173**

### 4. Acessar a Interface

1. Abra seu navegador
2. Acesse: **http://localhost:5173**
3. Você será redirecionado para a página de login
4. Use as credenciais:
   - **Email:** `admin@snoopydog.com`
   - **Senha:** `admin123`

## 🎯 URLs Importantes

- **Frontend (Interface Web):** http://localhost:5173
- **Backend (API):** http://localhost:3000
- **Health Check:** http://localhost:3000/health
- **API Auth:** http://localhost:3000/api/auth/login

## 🔧 Comandos Úteis

### Backend
```bash
cd backend
npm run dev          # Inicia servidor de desenvolvimento
npm run create-admin # Cria usuário admin (se necessário)
```

### Frontend
```bash
cd frontend
npm run dev    # Inicia servidor de desenvolvimento
npm run build  # Gera build de produção
npm run preview # Preview do build de produção
```

## ⚠️ Troubleshooting

### Erro de conexão com a API
- Verifique se o backend está rodando na porta 3000
- Verifique se o arquivo `.env` do frontend tem `VITE_API_URL=http://localhost:3000`

### Erro de autenticação
- Verifique se o usuário admin existe: `npm run create-admin` no backend
- Verifique se o JWT_SECRET está configurado no backend

### Porta já em uso
- Backend: Altere `PORT` no `.env` do backend
- Frontend: O Vite permite especificar porta: `npm run dev -- --port 3001`

## 📱 Estrutura de Rotas

Após fazer login, você terá acesso a:

### Admin
- `/dashboard` - Dashboard principal
- `/estoque` - Gestão de estoque
- `/financeiro` - Gestão financeira

### Atendente
- `/pedidos` - Gestão de pedidos
- `/roteirizador` - Roteirizador de entregas

### Compartilhado
- `/logistica` - Logística
- `/arquivos` - Arquivos
- `/mensagens` - Mensagens
- `/chat` - Chat
- `/relatorios` - Relatórios

