# Guia de Teste e Debug da Autenticação

## 🔍 Logs Adicionados

Adicionei logs detalhados em todos os pontos críticos:

1. **Server.ts** - Logs de inicialização
2. **AuthRoutes** - Logs quando a rota é chamada
3. **AuthController** - Logs no método login
4. **AuthService** - Logs em cada etapa do processo
5. **UserRepository** - Logs na busca do usuário
6. **PrismaClient** - Logs na inicialização
7. **ErrorHandler** - Logs detalhados de erros

## 📋 Como Testar

### 1. Reinicie o Backend
```bash
cd backend
# Pare o servidor atual (Ctrl+C)
npm run dev
```

Você deve ver logs como:
```
🔧 Inicializando servidor...
📦 DATABASE_URL: ✅ Configurada
🔧 Criando AuthController...
🔧 Criando AuthService...
✅ AuthService criado com sucesso
✅ AuthController criado
✅ Rotas de autenticação configuradas
🚀 Server started on http://localhost:3000
```

### 2. Tente Fazer Login

No navegador, tente fazer login. No terminal do backend você deve ver:

```
📥 POST /api/auth/login
📥 Rota /login recebida
📦 Body: { email: 'admin@snoopydog.com', password: '***' }
🔐 Método login chamado
📦 Request body: {"email":"admin@snoopydog.com","password":"admin123"}
🔐 Tentativa de login: admin@snoopydog.com
🔍 Buscando usuário: admin@snoopydog.com
📦 Obtendo PrismaClient...
🔧 Inicializando PrismaClient...
✅ PrismaClient inicializado com sucesso
✅ PrismaClient obtido, buscando usuário: admin@snoopydog.com
```

## 🐛 Se Ainda Der Erro 500

### Verifique:

1. **O servidor está rodando?**
   - Veja se aparece "🚀 Server started"

2. **Os logs aparecem?**
   - Se não aparecer nenhum log, o servidor pode não estar rodando corretamente

3. **Erro na inicialização do PrismaClient?**
   - Procure por "❌ Erro ao inicializar PrismaClient"
   - Verifique se o banco está rodando

4. **Erro na busca do usuário?**
   - Procure por "❌ Erro no UserRepository.findByEmail"
   - Verifique se a tabela users existe no banco

### Comandos Úteis

```bash
# Verificar se o banco está acessível
cd backend
node -e "const {Client}=require('pg');const c=new Client({connectionString:process.env.DATABASE_URL});c.connect().then(()=>{console.log('✅ Banco conectado');c.end();}).catch(e=>{console.error('❌ Erro:',e.message);});"
```

## 📝 Próximos Passos

Se os logs aparecerem, você verá exatamente onde está o problema. Compartilhe os logs do terminal do backend para eu poder ajudar a identificar o erro específico.

