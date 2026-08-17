// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ===== Security Middleware =====
// Helmet for security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
}));

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => req.method === 'OPTIONS',
});
app.use('/api', limiter);

// ===== Body Parsers =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== Data Sanitization =====
app.use(mongoSanitize({
  replaceWith: '_',
}));

// Compression
app.use(compression());

// ===== Request Logging (Development) =====
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
  });
}

// ===== API Routes =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Sangwa Polyclinic API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
  });
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// ===== Error Handler =====
app.use(errorHandler);

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = app;