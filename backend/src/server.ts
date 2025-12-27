import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './http/routes/auth.routes.js';
import { errorHandler } from './shared/middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares básicos
app.use(helmet());
app.use(cors());
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

// Rotas

app.use('/api/auth', authRoutes);
// app.use('/api/orders', orderRoutes);

// O Error Handler sempre por último!
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});