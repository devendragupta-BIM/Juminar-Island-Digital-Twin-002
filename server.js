/**
 * JUMEIRAH ISLANDS DIGITAL TWIN — SECURE ENTERPRISE SERVER
 * Node.js & Express Architecture with Groq AI Building Assistant API
 * 
 * Features:
 * - RESTful AI Chat & Function Calling Endpoints (POST /api/chat)
 * - Grounded Building Information Services (GET /api/building/*)
 * - High-Performance Static Asset Delivery with proper MIME & Cache headers
 * - SPA Fallback Routing for Render.com deployment
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const buildingDataService = require('./services/buildingDataService');
const aiChatService = require('./services/aiChatService');

const app = express();
const PORT = process.env.PORT || 8085;
const PUBLIC_DIR = __dirname;

// Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// ----------------------------------------------------
// 1. HEALTH & TELEMETRY STATUS ENDPOINT
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Jumeirah Islands 003 Digital Twin API',
    timestamp: new Date().toISOString(),
    groqConfigured: !!process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b'
  });
});

// ----------------------------------------------------
// 2. AI BUILDING ASSISTANT CHAT ENDPOINT (POST /api/chat)
// ----------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'A non-empty "message" string is required in the request body.'
      });
    }

    const result = await aiChatService.handleChatMessage({
      message: message.trim(),
      history: Array.isArray(history) ? history : []
    });

    return res.json(result);
  } catch (err) {
    console.error('Unhandled /api/chat error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error processing AI Building Assistant request.',
      details: err.message
    });
  }
});

// ----------------------------------------------------
// 3. GROUNDED BUILDING INFORMATION QUERY ENDPOINTS
// ----------------------------------------------------
// Top-level project summary and verified progress
app.get('/api/building/summary', (req, res) => {
  const summary = buildingDataService.getBuildingSummary();
  res.json(summary);
});

// Search building elements
app.get('/api/building/elements', (req, res) => {
  const { query, category, floor } = req.query;
  const results = buildingDataService.searchElements({ query, category, floor });
  res.json(results);
});

// Get detailed properties for specific element ID
app.get('/api/building/elements/:id', (req, res) => {
  const details = buildingDataService.getElementDetails({ elementId: req.params.id });
  if (details.status === 'not_found') {
    return res.status(404).json(details);
  }
  res.json(details);
});

// ----------------------------------------------------
// 4. STATIC ASSET SERVING WITH ROBUST MIME & HEADERS
// ----------------------------------------------------
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json'
};

// Custom static middleware to handle URL decoding, exact MIME types, and cache-control
app.use((req, res, next) => {
  // Let API requests proceed to API routers
  if (req.path.startsWith('/api/')) {
    return next();
  }

  let safePath = req.path;
  try {
    safePath = decodeURIComponent(safePath);
  } catch (e) {
    // Keep raw path
  }

  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    return res.status(403).send('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA
      return res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// Start Express Server
const serverInstance = app.listen(PORT, '0.0.0.0', () => {
  console.log(`===================================================`);
  console.log(`🏝️ Jumeirah Islands 003 Digital Twin Server Active`);
  console.log(`Port: ${PORT}`);
  console.log(`Groq Model: ${process.env.GROQ_MODEL || 'openai/gpt-oss-20b'}`);
  console.log(`Groq Key Configured: ${!!process.env.GROQ_API_KEY}`);
  console.log(`Local URL: http://localhost:${PORT}`);
  console.log(`===================================================`);
});

module.exports = { app, serverInstance };
