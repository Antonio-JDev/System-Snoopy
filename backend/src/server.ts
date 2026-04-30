import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './http/routes/auth.routes.js';
import ingredientRoutes from './http/routes/ingredient.routes.js';
import { errorHandler } from './shared/middleware/errorHandler.js';
import { testDatabaseConnection } from './lib/prisma.js';

console.log('🔧 Inicializando servidor...');
console.log('📦 DATABASE_URL:', process.env.DATABASE_URL ? '✅ Configurada' : '❌ Não configurada');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares básicos
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Middleware de debug para capturar requisições
app.use((req, res, next) => {
  console.log(`\n📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (Object.keys(req.body || {}).length > 0) {
    const bodyCopy = { ...req.body };
    if (bodyCopy.password) bodyCopy.password = '***';
    console.log(`📦 Body:`, JSON.stringify(bodyCopy, null, 2));
  }
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/ingredients', ingredientRoutes);

// Middleware para capturar erros de rotas não encontradas
app.use((req, res, next) => {
  console.log('⚠️ Rota não encontrada:', req.method, req.path);
  return res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada',
  });
});

// O Error Handler sempre por último!
app.use(errorHandler);

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('\n🚨 UNHANDLED REJECTION:');
  console.error('Reason:', reason);
  console.error('Promise:', promise);
  console.error('Stack:', reason?.stack);
});

process.on('uncaughtException', (error: Error) => {
  console.error('\n🚨 UNCAUGHT EXCEPTION:');
  console.error('Error:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
});

app.listen(port, async () => {
  console.log(`\n🚀 Server started on http://localhost:${port}`);
  console.log(`📡 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
  console.log(`📦 DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Configurada' : '❌ Não configurada'}`);
  
  // Testar conexão com o banco de dados
  await testDatabaseConnection();
  console.log('');
});
