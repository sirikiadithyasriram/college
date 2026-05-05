import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import { initDB } from './src/db';
import { seedDB } from './src/db/seed';
import path from 'path';

// API Routers
import apiRouter from './src/server/api';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Init SQLite Database
  try {
    initDB();
    await seedDB();
  } catch (err) {
    console.error('Failed to initialize or seed DB:', err);
  }

  // API Routes
  app.use('/api', apiRouter);

  // Vite Integration for dev & prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
