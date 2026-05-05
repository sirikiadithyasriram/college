import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import { initDB } from './src/db';
import { seedDB } from './src/db/seed';
import path from 'path';

// API Routers
import apiRouter from './src/server/api';

async function startServer() {
  // 1️⃣ Initialize DB BEFORE anything else
  try {
    console.log("Initializing SQLite database...");
    initDB();          // run migrations
    await seedDB();    // insert initial data
    console.log("Database ready.");
  } catch (err) {
    console.error("Failed to initialize or seed DB:", err);
  }

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use('/api', apiRouter);

  // 2️⃣ Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    console.log("Running in development mode…");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log("Running in production mode…");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 3️⃣ Start server AFTER DB initialized
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:3000`);
  });
}

startServer();
