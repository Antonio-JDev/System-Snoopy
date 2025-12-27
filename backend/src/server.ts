import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './shared/middleware/errorHandler';

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

// Suas rotas virão aqui...
// app.use('/api/auth', authRoutes);
// app.use('/api/orders', orderRoutes);

// O Error Handler sempre por último!
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});