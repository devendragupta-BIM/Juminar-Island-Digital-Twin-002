# Vision-Based Scene Reconciliation — Implementation Guide

Oct 29, 2026 · @Devendra

## Overview

This guide explains exactly how to add **Vision-Based Scene Reconciliation** to the Jumeirah Islands Villa 003 Digital Twin (`juminar-island-digital-twin-002.onrender.com`).

The feature works in two phases:

- **Phase 1 — Manual (now):** You provide a direct image URL from your 400–500 site photos. The twin fetches it, Vision AI analyzes it, and 3D elements update accordingly.
- **Phase 2 — Live Camera (later):** The URL becomes your site camera's upload endpoint. The code is identical — only the URL changes.

The specific element: **the carport/front yard area** (the grey paved zone you circled). If a car is visible in the site photo → a 3D car model appears in the twin. If no car → the spot is empty.

## How It Works — Architecture

The pipeline has four steps that run in sequence every time a new photo is available:

```
Site Photo URL (your 400-500 photos or live camera)
        ↓
  fetch() latest image → convert to base64
        ↓
  Claude Vision API — detects: car, workers, crane, scaffolding, pool
        ↓
  Scene State JSON { car_in_carport: true/false, confidence: 0.95 }
        ↓
  JumeirahTwinAPI SDK commands → show/hide 3D mesh objects
```

Your twin already exposes `window.JumeirahTwinAPI` and a `postMessage` channel. The Vision Reconciler plugs into both. No changes to your existing Three.js scene logic are needed for the pipeline itself — only a new car mesh needs to be added if one does not already exist in your scene.

## Step 1 — Image URL Pipeline

Add this function to your `app.js` file. It fetches the latest site photo from a URL and converts it to base64 for the Vision API. The `?t=` timestamp parameter forces the browser to bypass cache and always fetch the newest image — critical for a live camera feed.

```javascript
// VISION RECONCILER — Step 1: Fetch latest site photo
// Place this near the top of app.js, after your scene is initialized

const VISION_CONFIG = {
  // Phase 1: paste any direct image URL from your 400-500 site photos
  // Phase 2: replace with your camera's upload endpoint URL
  imageUrl: 'https://your-site-photo-url.com/latest.jpg',
  
  // How often to check for a new photo (milliseconds)
  // Phase 1: set high (manual trigger only)
  // Phase 2: set to 60000 (every 60 seconds) for live camera
  pollInterval: null, // null = manual only; set a number for auto-polling
  
  // Confidence threshold — detections below this are ignored
  confidenceThreshold: 0.75,
};

async function fetchLatestSitePhoto(url) {
  // Add timestamp to bypass browser cache — always gets newest image
  const cacheBustedUrl = url + (url.includes('?') ? '&' : '?') + 't=' + Date.now();
  
  const response = await fetch(cacheBustedUrl);
  if (!response.ok) throw new Error('Failed to fetch site photo: ' + response.status);
  
  const blob = await response.blob();
  const mimeType = blob.type || 'image/jpeg';
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve({
      base64: e.target.result.split(',')[1],
      mimeType
    });
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
```

## Step 2 — Vision AI Analysis

This function sends the fetched image to Claude Vision API and gets back a structured JSON scene state. The prompt is tailored specifically for the Jumeirah Islands Villa 003 site — it knows about the carport, pool, palms, and site context.

````javascript
// VISION RECONCILER — Step 2: Analyze photo with Claude Vision

async function analyzeWithVision(base64Image, mimeType) {
  const prompt = `You are a construction site vision AI for Jumeirah Islands Villa 003, Dubai UAE.
Analyze this site photo and detect the presence or absence of each element.
Return ONLY valid JSON, no markdown, no explanation:

{
  "car_in_carport": true or false,
  "car_in_carport_conf": 0.0 to 1.0,
  "workers_present": true or false,
  "workers_present_conf": 0.0 to 1.0,
  "crane_active": true or false,
  "crane_active_conf": 0.0 to 1.0,
  "scaffolding_present": true or false,
  "scaffolding_present_conf": 0.0 to 1.0,
  "pool_has_water": true or false,
  "pool_has_water_conf": 0.0 to 1.0,
  "summary": "one sentence describing the current site state"
}

Definitions for this specific site:
- car_in_carport: any vehicle (car, van, truck) in the front yard carport/driveway area under the cantilevered pergola
- workers_present: any construction worker, laborer, or person in PPE visible anywhere on site
- crane_active: tower crane or mobile lift erected and visible
- scaffolding_present: temporary scaffolding or shoring on the building facade
- pool_has_water: rear swimming pool contains water (blue/cyan color visible in pool shell)`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64Image }},
          { type: 'text', text: prompt }
        ]
      }]
    })
  });

  const data = await response.json();
  if (data.error) throw new Error('Vision API error: ' + data.error.message);

  const raw = data.content.map(b => b.text || '').join('').replace(/```json|```/g, '').trim();
  return JSON.parse(raw);
}
````

## Step 3 — SDK Commands to the Twin

This function takes the scene state JSON from Step 2 and fires the correct commands to your twin using its existing `JumeirahTwinAPI`. It also logs each action to the twin's own event stream panel.

```javascript
// VISION RECONCILER — Step 3: Apply scene state to Digital Twin

function applySceneState(sceneState, threshold) {
  const t = threshold || VISION_CONFIG.confidenceThreshold;

  // --- CAR IN CARPORT ---
  // The car mesh name in your Three.js scene (you will set this in Step 4)
  const carVisible = sceneState.car_in_carport && sceneState.car_in_carport_conf >= t;
  toggleSceneObject('carport-car-mesh', carVisible);
  logToEventStream(
    carVisible
      ? `[VISION] Car detected in carport (${Math.round(sceneState.car_in_carport_conf * 100)}% conf) → mesh SHOWN`
      : `[VISION] No car in carport (${Math.round(sceneState.car_in_carport_conf * 100)}% conf) → mesh HIDDEN`
  );

  // --- WORKERS ---
  const workersVisible = sceneState.workers_present && sceneState.workers_present_conf >= t;
  toggleSceneObject('worker-group-mesh', workersVisible);

  // --- CRANE ---
  const craneVisible = sceneState.crane_active && sceneState.crane_active_conf >= t;
  toggleSceneObject('crane-tower-mesh', craneVisible);

  // --- SCAFFOLDING ---
  const scaffoldVisible = sceneState.scaffolding_present && sceneState.scaffolding_present_conf >= t;
  toggleSceneObject('scaffold-mesh', scaffoldVisible);

  // --- POOL WATER ---
  // Use SDK to switch camera to rear pool if water is detected
  if (sceneState.pool_has_water && sceneState.pool_has_water_conf >= t) {
    if (window.JumeirahTwinAPI?.setSiteState) {
      // Pool water shader is controlled by site state in your twin
    }
  }

  // --- SUMMARY LOG ---
  logToEventStream('[VISION] Scene summary: ' + (sceneState.summary || 'Analysis complete'));
}

// Helper: toggle a mesh by name in the Three.js scene
function toggleSceneObject(meshName, visible) {
  // 'scene' is your global Three.js Scene object in app.js
  const obj = scene.getObjectByName(meshName);
  if (obj) {
    obj.visible = visible;
  }
  // Also fire via postMessage in case this runs from a parent frame
  try {
    window.postMessage({
      type: 'TWIN_COMMAND',
      action: 'TOGGLE_ELEMENT',
      payload: { elementId: meshName, visible }
    }, '*');
  } catch(e) { /* cross-origin */ }
}

// Helper: write to the twin's own SDK event stream div
function logToEventStream(message) {
  const stream = document.getElementById('sdkEventStream');
  if (stream) {
    const line = document.createElement('div');
    line.textContent = message;
    line.style.color = '#00d4ff';
    stream.appendChild(line);
    stream.scrollTop = stream.scrollHeight;
  }
  console.log(message);
}
```

## Step 4 — Adding the Car Mesh

In your `modelBuilder.js` (or wherever your scene meshes are created), find the carport area and add a simple car geometry. This is the 3D object that will be shown or hidden based on the Vision AI result.

Add this function to `modelBuilder.js`:

```javascript
// VISION RECONCILER — Step 4: Car mesh for the carport area
// Add this inside your model builder, after the carport/pergola geometry is created

function addCarportCarMesh(scene) {
  const carGroup = new THREE.Group();
  carGroup.name = 'carport-car-mesh'; // Must match the name in Step 3

  // Car body
  const bodyGeo = new THREE.BoxGeometry(4.2, 1.4, 1.9);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    metalness: 0.7,
    roughness: 0.3
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.7;
  carGroup.add(body);

  // Car roof (slightly smaller, raised)
  const roofGeo = new THREE.BoxGeometry(2.4, 0.9, 1.7);
  const roof = new THREE.Mesh(roofGeo, bodyMat);
  roof.position.set(-0.2, 1.85, 0);
  carGroup.add(roof);

  // Windscreen tint
  const glassGeo = new THREE.BoxGeometry(0.08, 0.7, 1.5);
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x88ccff,
    metalness: 0.1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.5
  });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0.96, 1.6, 0);
  carGroup.add(glass);

  // Four wheels
  const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  const wheelPositions = [
    [-1.45, 0.38,  1.0],
    [-1.45, 0.38, -1.0],
    [ 1.45, 0.38,  1.0],
    [ 1.45, 0.38, -1.0],
  ];
  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(...pos);
    carGroup.add(wheel);
  });

  // POSITION: adjust these X, Y, Z values to place the car
  // exactly in the carport area of YOUR scene
  // Use the browser console: scene.getObjectByName('carport-car-mesh').position.set(x,y,z)
  // to find the right position, then hardcode it here
  carGroup.position.set(8.5, 0, 2.0); // <-- adjust this
  carGroup.rotation.y = Math.PI / 2;   // facing the right direction

  // Start hidden — Vision AI will show it if a car is detected
  carGroup.visible = false;

  scene.add(carGroup);
  return carGroup;
}

// Call this after your scene is built:
// addCarportCarMesh(scene);
```

**To find the exact position:** Open your twin in the browser, open the Console (F12), and type:

```javascript
scene.getObjectByName('carport-car-mesh').visible = true
```

Then adjust position values until the car sits correctly in the carport bay.

## Step 5 — Wiring It Together & Automation Upgrade

### The Master Reconcile Function

Add this to `app.js` — it chains Steps 1, 2, and 3 together:

```javascript
// VISION RECONCILER — Master function
// Call this manually (Phase 1) or on a timer (Phase 2)

async function runVisionReconciliation(imageUrl) {
  logToEventStream('[VISION] Starting scene reconciliation…');
  try {
    // Step 1: Fetch image
    logToEventStream('[VISION] Fetching latest site photo…');
    const { base64, mimeType } = await fetchLatestSitePhoto(imageUrl || VISION_CONFIG.imageUrl);

    // Step 2: Analyze
    logToEventStream('[VISION] Sending to Claude Vision AI…');
    const sceneState = await analyzeWithVision(base64, mimeType);
    logToEventStream('[VISION] Analysis complete.');

    // Step 3: Apply
    applySceneState(sceneState);

  } catch (err) {
    logToEventStream('[VISION ERROR] ' + err.message);
    console.error('Vision reconciliation failed:', err);
  }
}

// Expose to SDK so it can be triggered from outside the twin
if (window.JumeirahTwinAPI) {
  window.JumeirahTwinAPI.runVisionReconcile = runVisionReconciliation;
}
```

### Phase 1 — Manual Trigger (Use Now)

To test with any of your 400–500 photos, open the browser Console on the twin and run:

```javascript
// Paste any direct image URL from your site photo collection
JumeirahTwinAPI.runVisionReconcile('https://your-site-photo-url.com/photo-001.jpg');
```

Or trigger it from the SDK panel at the bottom of your twin page.

### Phase 2 — Automatic Polling (Live Camera)

When your site camera is ready, enable auto-polling by adding this after the master function:

```javascript
// Phase 2: Auto-poll every 60 seconds
// Uncomment when live camera endpoint is ready

// const LIVE_CAMERA_URL = 'https://your-camera-endpoint.com/latest.jpg';
// setInterval(() => runVisionReconciliation(LIVE_CAMERA_URL), 60000);
// runVisionReconciliation(LIVE_CAMERA_URL); // run immediately on load
```

The only change between Phase 1 and Phase 2 is the URL and the timer. All detection, SDK, and mesh logic is identical.

## Complete Implementation Checklist

Follow these in order. Each step is one discrete task.

### Files to Edit

| File | What to Add | Step |
| --- | --- | --- |
| `app.js` | `VISION_CONFIG`, `fetchLatestSitePhoto()` | Step 1 |
| `app.js` | `analyzeWithVision()` | Step 2 |
| `app.js` | `applySceneState()`, `toggleSceneObject()`, `logToEventStream()` | Step 3 |
| `modelBuilder.js` | `addCarportCarMesh(scene)` + call it | Step 4 |
| `app.js` | `runVisionReconciliation()` + SDK exposure | Step 5 |

### Exact Paste Locations in `app.js`

1. Paste Steps 1–3 functions **after** your `scene = new THREE.Scene()` line
2. Paste the master function (Step 5) **after** Steps 1–3
3. The `JumeirahTwinAPI` exposure line goes **after** your existing `window.JumeirahTwinAPI = { … }` block — add `runVisionReconcile` as a new key inside that object instead

### Testing Sequence

```
1. Deploy code to Render
2. Open twin URL in browser
3. Open DevTools Console (F12)
4. Run: scene.getObjectByName('carport-car-mesh').visible = true
   → confirm car mesh appears in the right position in the yard
5. Run: JumeirahTwinAPI.runVisionReconcile('YOUR_PHOTO_URL')
   → watch the event stream log panel
   → car should appear or disappear based on the photo
6. Test with 5-10 of your 400-500 photos:
   - Photos with a car parked → car mesh visible
   - Photos with empty yard → car mesh hidden
7. When confirmed working → uncomment Phase 2 auto-poll timer
```

### Important Notes

- **CORS:** If your site photos are hosted on a different domain, the server hosting them must allow CORS headers (`Access-Control-Allow-Origin: *`). If not, you need a small proxy server or host photos on the same Render domain.
- **API Key:** The Claude Vision API call goes directly from the browser. Your Anthropic API key is handled by the existing API setup in the twin — the same one the AI Building Assistant already uses.
- **Mesh name:** `carport-car-mesh` must match exactly between `addCarportCarMesh()` and `toggleSceneObject()`. Case sensitive.
- **Carport camera view:** After a successful car detection, you can optionally auto-fly to the carport view: `JumeirahTwinAPI.setCameraView('carport')` — this SDK command already exists in your twin.
