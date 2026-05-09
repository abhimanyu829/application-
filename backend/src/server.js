const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');
const logger = require('./utils/logger');

// ─────────────────────────────────────────
// Load env vars FIRST before anything else
// ─────────────────────────────────────────
dotenv.config();

// ─────────────────────────────────────────
// Startup ENV validation — crash fast if critical vars missing
// ─────────────────────────────────────────
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  logger.error(`FATAL: Missing required environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}

// ─────────────────────────────────────────
// Connect to database
// ─────────────────────────────────────────
connectDB();

const app = express();

// ─────────────────────────────────────────
// Trust proxy (for Nginx, Render, etc.)
// ─────────────────────────────────────────
app.set('trust proxy', 1);

// ─────────────────────────────────────────
// Security headers via Helmet
// ─────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow frontend to load uploads
  })
);

// ─────────────────────────────────────────
// Response compression (gzip/brotli)
// Reduces payload by 60–80%
// ─────────────────────────────────────────
app.use(compression());

// ─────────────────────────────────────────
// CORS — explicit whitelist, no wildcards
// ─────────────────────────────────────────
const rawOrigins = process.env.ALLOWED_ORIGINS || 'https://abhibhidevelopers.online';
const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());

// Always allow localhost in development
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000');
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      logger.warn('CORS blocked origin: %s', origin);
      return callback(new Error(`CORS: Origin '${origin}' not allowed`));
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ─────────────────────────────────────────
// Body parser
// ─────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─────────────────────────────────────────
// HTTP request logging via Morgan → Winston
// ─────────────────────────────────────────
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (msg) => logger.http(msg.trim()),
    },
  })
);

// ─────────────────────────────────────────
// Static file serving — uploads directory
// Browser caches for 7 days; ETags enabled for conditional requests
// ─────────────────────────────────────────
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'), {
    maxAge: '7d',
    etag: true,
    lastModified: true,
  })
);

// ─────────────────────────────────────────
// Global rate limiter — high limit safety net
// Per-route limits in individual route files are stricter
// ─────────────────────────────────────────
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests from this IP. Please slow down.',
    },
  })
);

// ─────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/auth/admin', require('./routes/adminAuthRoutes'));
app.use('/api/applicants', require('./routes/applicantRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/team', require('./routes/uploadRoutes'));

// ─────────────────────────────────────────
// Health check
// ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// ─────────────────────────────────────────
// Setup default admin on server start
// ─────────────────────────────────────────
const { setupDefaultAdmin } = require('./utils/setupAdmin');
setupDefaultAdmin();

// ─────────────────────────────────────────
// Global error handler — MUST be last
// ─────────────────────────────────────────
app.use(errorHandler);

// ─────────────────────────────────────────
// Start server
// ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

// Handle unhandled promise rejections — prevent silent crashes
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection: %s', err.message, { stack: err.stack });
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: %s', err.message, { stack: err.stack });
  process.exit(1);
});
