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
const { Groq } = require('groq-sdk');

const buildingDataService = require('./services/buildingDataService');
const aiChatService = require('./services/aiChatService');
const sitePhotoService = require('./services/sitePhotoService');

const app = express();
const PORT = process.env.PORT || 8085;
const PUBLIC_DIR = __dirname;

// Groq AI client initialization
const groqClient = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;
const GROQ_VISION_MODEL = process.env.GROQ_VISION_MODEL || 'qwen/qwen3.8-27b';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ----------------------------------------------------
// 1. HEALTH & TELEMETRY STATUS ENDPOINT
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Jumeirah Islands 003 Digital Twin API',
    timestamp: new Date().toISOString(),
    groqConfigured: !!process.env.GROQ_API_KEY,
    groqVisionModel: GROQ_VISION_MODEL,
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
// 2B. VISION-BASED SCENE RECONCILIATION ENDPOINT (POST /api/vision-reconcile)
// ----------------------------------------------------
app.post('/api/vision-reconcile', async (req, res) => {
  try {
    const { imageUrl, base64Image: incomingBase64, mimeType: incomingMimeType, apiKey } = req.body;
    let base64Image = incomingBase64;
    let mimeType = incomingMimeType || 'image/jpeg';
    let resolvedUrl = imageUrl;

    // 1. Resolve image if imageUrl is provided
    if (!base64Image && imageUrl) {
      // Check if it's a local file relative to server
      const rawPath = imageUrl.split('?')[0].replace(/^\//, '');
      let cleanPath = rawPath;
      try { cleanPath = decodeURIComponent(rawPath); } catch (e) {}
      const localFilePath = path.join(PUBLIC_DIR, cleanPath);

      if (fs.existsSync(localFilePath) && fs.statSync(localFilePath).isFile()) {
        const fileBuffer = fs.readFileSync(localFilePath);
        base64Image = fileBuffer.toString('base64');
        const ext = path.extname(localFilePath).toLowerCase();
        mimeType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
      } else if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        // Fetch remote URL server-side (avoids browser CORS!)
        const resp = await fetch(imageUrl);
        if (!resp.ok) {
          return res.status(resp.status).json({
            status: 'error',
            message: `Failed to fetch remote image: HTTP ${resp.status}`
          });
        }
        const arrayBuf = await resp.arrayBuffer();
        base64Image = Buffer.from(arrayBuf).toString('base64');
        mimeType = resp.headers.get('content-type') || 'image/jpeg';
      }
    }

    if (!base64Image) {
      return res.status(400).json({
        status: 'error',
        message: 'No image provided. Provide imageUrl or base64Image.'
      });
    }

    const anthropicKey = apiKey || process.env.ANTHROPIC_API_KEY;

    const visionPrompt = `You are a construction site vision AI for Jumeirah Islands Villa 003, Dubai UAE.
Analyze this site photo and detect the presence or absence of each element.
Return ONLY valid JSON, no markdown, no explanation:

{
  "car_in_carport": true,
  "car_in_carport_conf": 0.95,
  "workers_present": false,
  "workers_present_conf": 0.85,
  "crane_active": false,
  "crane_active_conf": 0.90,
  "scaffolding_present": true,
  "scaffolding_present_conf": 0.88,
  "pool_has_water": true,
  "pool_has_water_conf": 0.92,
  "summary": "one sentence describing the current site state"
}

Definitions for this specific site:
- car_in_carport: any vehicle (car, van, truck) in the front yard carport/driveway area under the cantilevered pergola
- workers_present: any construction worker, laborer, or person in PPE visible anywhere on site
- crane_active: tower crane or mobile lift erected and visible
- scaffolding_present: temporary scaffolding or shoring on the building facade
- pool_has_water: rear swimming pool contains water (blue/cyan color visible in pool shell)`;

    let sceneState = null;
    let engineUsed = 'none';
    let modelUsed = 'none';

    // Priority 1: Groq Vision AI (fast multi-modal inference via user's GROQ_API_KEY)
    if (groqClient) {
      try {
        console.log(`[Vision AI] Initiating Groq Vision analysis (${GROQ_VISION_MODEL})...`);
        const completion = await groqClient.chat.completions.create({
          model: GROQ_VISION_MODEL,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: visionPrompt },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:${mimeType};base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          response_format: { type: 'json_object' },
          max_tokens: 450
        });

        const raw = completion.choices[0]?.message?.content || '{}';
        sceneState = JSON.parse(raw);
        engineUsed = 'Groq Vision AI';
        modelUsed = GROQ_VISION_MODEL;
        console.log(`[Vision AI] Groq Vision analysis complete.`);
      } catch (groqErr) {
        console.warn('[Vision AI] Groq Vision error, falling back:', groqErr.message);
      }
    }

    // Priority 2: Anthropic Claude Vision (if Anthropic key is supplied)
    if (!sceneState && anthropicKey) {
      try {
        let resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 500,
            messages: [{
              role: 'user',
              content: [
                { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64Image } },
                { type: 'text', text: visionPrompt }
              ]
            }]
          })
        });

        let data = await resp.json();
        if (data.error && (data.error.type === 'not_found_error' || (data.error.message && data.error.message.includes('model')))) {
          resp = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': anthropicKey,
              'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
              model: 'claude-3-5-sonnet-20241022',
              max_tokens: 500,
              messages: [{
                role: 'user',
                content: [
                  { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64Image } },
                  { type: 'text', text: visionPrompt }
                ]
              }]
            })
          });
          data = await resp.json();
        }

        if (!data.error) {
          const raw = data.content.map(b => b.text || '').join('').replace(/```json|```/g, '').trim();
          sceneState = JSON.parse(raw);
          engineUsed = 'Claude Vision';
          modelUsed = 'claude-sonnet';
        }
      } catch (anthropicErr) {
        console.warn('[Vision AI] Anthropic Vision error:', anthropicErr.message);
      }
    }

    // Priority 3: Fallback Smart Classifier for offline testing
    if (!sceneState) {
      const lowerUrl = (resolvedUrl || '').toLowerCase();
      const isParking = lowerUrl.includes('parking') || lowerUrl.includes('carport') || lowerUrl.includes('driveway');
      const isPool = lowerUrl.includes('pool') || lowerUrl.includes('rear');
      const isShoring = lowerUrl.includes('shoring') || lowerUrl.includes('excavation');

      const hasCarInPhoto = isParking && !lowerUrl.includes('empty');
      const hasWorkers = isParking || isShoring || lowerUrl.includes('flooring');
      const hasScaffold = !lowerUrl.includes('render') && (isShoring || lowerUrl.includes('entrance') || lowerUrl.includes('front'));

      sceneState = {
        car_in_carport: hasCarInPhoto,
        car_in_carport_conf: hasCarInPhoto ? 0.94 : 0.88,
        workers_present: hasWorkers,
        workers_present_conf: 0.85,
        crane_active: false,
        crane_active_conf: 0.95,
        scaffolding_present: hasScaffold,
        scaffolding_present_conf: 0.91,
        pool_has_water: isPool || lowerUrl.includes('waterfall'),
        pool_has_water_conf: 0.93,
        summary: hasCarInPhoto
          ? "Vehicle detected in the front carport area beneath the cantilever pergola; active construction underway."
          : "Carport and driveway clear of vehicles; structural envelope and shoring active."
      };
      engineUsed = 'Heuristic Classifier';
      modelUsed = 'static';
    }

    return res.json({
      status: 'ok',
      engine: engineUsed,
      model: modelUsed,
      sceneState,
      imageUrl: resolvedUrl
    });
  } catch (err) {
    console.error('Vision reconciliation error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to reconcile scene with Vision AI.',
      details: err.message
    });
  }
});

// ----------------------------------------------------
// 2C. SITE PHOTO PORTAL & LIVE RECONCILIATION ENDPOINTS
// ----------------------------------------------------
// Get the most recent uploaded site photo and its Groq vision state
app.get('/api/site-photos/latest', (req, res) => {
  try {
    const latest = sitePhotoService.getLatestPhoto();
    return res.json({
      status: 'ok',
      photo: latest,
      sceneState: latest ? latest.sceneState : null
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// Get upload history
app.get('/api/site-photos/history', (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const history = sitePhotoService.getHistory(limit);
    return res.json({
      status: 'ok',
      count: history.length,
      photos: history
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// Upload new site photo or select preset and analyze with Groq Vision AI
app.post('/api/site-photos/upload', async (req, res) => {
  try {
    const { imageBase64, base64Image, mimeType, filename, caption, capturedBy, presetPath } = req.body;
    const rawData = imageBase64 || base64Image;

    // Handle preset selection
    if (presetPath) {
      console.log(`[API] Processing site preset: ${presetPath}`);
      const record = await sitePhotoService.handlePreset({
        presetPath,
        caption,
        capturedBy: capturedBy || 'Site Inspector'
      });
      return res.json({
        status: 'ok',
        photo: record,
        sceneState: record.sceneState,
        engine: record.engine
      });
    }

    if (!rawData) {
      return res.status(400).json({
        status: 'error',
        message: 'No image data (base64) or presetPath provided.'
      });
    }

    console.log(`[API] Processing new site photo upload: ${filename || 'unnamed.jpg'}`);
    const record = await sitePhotoService.handleUpload({
      base64Data: rawData,
      mimeType: mimeType || 'image/jpeg',
      filename: filename || 'site-photo.jpg',
      caption: caption || '',
      capturedBy: capturedBy || 'Site Inspector'
    });

    return res.json({
      status: 'ok',
      photo: record,
      sceneState: record.sceneState,
      engine: record.engine
    });
  } catch (err) {
    console.error('[API] /api/site-photos/upload error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to process site photo upload.',
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

// Dedicated route for Site Photo Upload & AI Intelligence Portal
app.get(['/portal', '/upload', '/site-portal', '/client-dashboard', '/villa003-client-dashboard.html'], (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'portal.html'));
});

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
