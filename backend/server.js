'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./config/database');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const { runSeed } = require('./seeders/seed');

// ─── App Setup ────────────────────────────────────────────────────────────────

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// ─── CORS ─────────────────────────────────────────────────────────────────────

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: Origin "${origin}" is not allowed.`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Body Parsers ─────────────────────────────────────────────────────────────

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Static Files (Uploads) ───────────────────────────────────────────────────

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────

// Public API routes: /api/services, /api/products, /api/testimonials, /api/company-settings, /api/contact
app.use('/api', publicRoutes);

// Admin API routes: /api/admin/login, /api/admin/services, /api/admin/products, etc.
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Aventrix Solutions API is running.', timestamp: new Date().toISOString() });
});

// 404 handler for unmatched API routes
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.',
  });
});

// ─── Database Sync + Seed + Start ─────────────────────────────────────────────

const startServer = async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('[DB] Connection established successfully.');

    // Sync all models (alter: true safely updates existing tables without dropping data)
    await sequelize.sync({ alter: true });
    console.log('[DB] All models synchronized.');

    // Run seed (idempotent — skips if data already exists)
    await runSeed(sequelize);

    // Start listening
    app.listen(PORT, () => {
      console.log(`\n🚀 Aventrix Solutions API running on http://localhost:${PORT}`);
      console.log(`   Public API : http://localhost:${PORT}/api`);
      console.log(`   Admin API  : http://localhost:${PORT}/api/admin`);
      console.log(`   Health     : http://localhost:${PORT}/api/health`);
      console.log(`   Uploads    : http://localhost:${PORT}/uploads\n`);
    });
  } catch (err) {
    console.error('[Startup Error]', err);
    process.exit(1);
  }
};

startServer();
