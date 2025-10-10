const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const sessionsRoutes = require('./routes/sessions.routes');
const safeRoutes = require('./routes/safe.routes');
const paymentLinksRoutes = require('./routes/payment-links.routes');
const transactionsRoutes = require('./routes/transactions.routes');
const pricesRoutes = require('./routes/prices.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Safe Management API' });
});

// API Routes
app.use('/api/sessions', sessionsRoutes);
app.use('/api/safe', safeRoutes);
app.use('/api/payment-links', paymentLinksRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/prices', pricesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   - Health: GET http://localhost:${PORT}/health`);
  console.log(`   - Sessions: http://localhost:${PORT}/api/sessions`);
  console.log(`   - Safe: http://localhost:${PORT}/api/safe/:sessionId/*`);
  console.log(`   - Payment Links: http://localhost:${PORT}/api/payment-links`);
  console.log(`   - Transactions: http://localhost:${PORT}/api/transactions/:sessionId`);
  console.log(`   - Prices: http://localhost:${PORT}/api/prices/*`);
});

module.exports = app;
