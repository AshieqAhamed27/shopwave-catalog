import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, isDBConnected } from './config/db.js';
import productRoutes, { seedProductsIfNeeded } from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ShopWave Backend API',
    database: isDBConnected() ? 'mongodb-atlas' : 'json-fallback',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);

// Serve built frontend assets if dist exists (unified production mode)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), err => {
    if (err) next();
  });
});

// Connect to MongoDB Atlas (if configured) and start Express server
connectDB().then(async connected => {
  if (connected) {
    await seedProductsIfNeeded();
  }
  app.listen(PORT, () => {
    console.log(`\n===========================================`);
    console.log(`🚀 ShopWave Backend API running on port ${PORT}`);
    console.log(`🗄️  Storage Mode: ${connected ? 'MongoDB Atlas' : 'Local JSON Fallback'}`);
    console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
    console.log(`👉 Products API: http://localhost:${PORT}/api/products`);
    console.log(`👉 Orders API:   http://localhost:${PORT}/api/orders`);
    console.log(`👉 Auth API:     http://localhost:${PORT}/api/auth/login`);
    console.log(`===========================================\n`);
  });
});

export default app;
