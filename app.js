/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - MASTER APPLICATION CONTROLLER
 * Developed for Architectural BIM Consultancy & VH Contracting LLC
 * 
 * Mathematical Architecture:
 * 1. NATURAL TRANSFORMATION: View transitions operate functorially along structure-preserving geodesics.
 * 2. ADJUNCTION (F -| G): Macro overview context is adjoint to micro telemetry inspection.
 * 3. ENDOMORPHISM (End(S)): All user interactions compose monoidally over an immutable state space.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. THREE.JS VIEWPORT, CAMERA & RENDERER SETUP
  // ----------------------------------------------------
  const canvas = document.getElementById('twin-canvas');
  const container = document.getElementById('viewport-3d-wrapper');

  const scene = new THREE.Scene();
  // Clear scene background to allow the sky dome shader to render with calibrated daylight
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.4,
    1000
  );
  // Default executive starting vantage point
  camera.position.set(-11.8, 3.8, 18.8);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x3B62A4, 1.0);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));

  // OrbitControls setup with smooth damping
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 + 0.08;
  controls.minDistance = 2.0;
  controls.maxDistance = 180.0;
  controls.target.set(1.2, 2.9, 1.2);
  controls.update();

  // ----------------------------------------------------
  // 2. SUBSYSTEM ENGINES INITIALIZATION
  // ----------------------------------------------------
  const modelBuilder = new VillaModelBuilder(scene, renderer);
  modelBuilder.buildAll();

  const lightingManager = new LightingManager(scene, renderer);
  const cameraManager = new CameraManager(scene, camera, controls, renderer.domElement, lightingManager, modelBuilder);
  const measurementTool = new MeasurementTool(scene, camera, renderer.domElement);
  const minimap = new SiteMinimap('radar-canvas', camera, controls, cameraManager);
  const buildingAssistant = new BuildingAssistant();
  buildingAssistant.init(scene, camera, controls, cameraManager, modelBuilder);

  // Expose subsystem engines to window for global access, inline handlers & parent integrations
  window.scene = scene;
  window.camera = camera;
  window.cameraManager = cameraManager;
  window.modelBuilder = modelBuilder;
  window.lightingManager = lightingManager;
  window.measurementTool = measurementTool;
  window.minimap = minimap;
  window.buildingAssistant = buildingAssistant;

  // ----------------------------------------------------
  // VISION RECONCILER — ARCHITECTURAL SCENE RECONCILIATION
  // Steps 1 to 5 from Vision-Based Scene Reconciliation Guide
  // ----------------------------------------------------
  const VISION_CONFIG = {
    // Phase 1: Default to site photo with vehicle in front yard / carport
    imageUrl: '20840-1748865490206.jpeg',
    pollInterval: null, // null = manual only; set number (e.g. 60000) for auto-polling
    confidenceThreshold: 0.75
  };

  // Step 1: Fetch latest site photo and convert to optimized base64
  async function fetchLatestSitePhoto(url) {
    const targetUrl = url || VISION_CONFIG.imageUrl;
    const cacheBustedUrl = targetUrl + (targetUrl.includes('?') ? '&' : '?') + 't=' + Date.now();
    
    const response = await fetch(cacheBustedUrl);
    if (!response.ok) throw new Error('Failed to fetch site photo: ' + response.status);
    
    const blob = await response.blob();
    const mimeType = blob.type || 'image/jpeg';
    
    return new Promise((resolve, reject) => {
      // Use Image + Canvas to optimize resolution for Vision AI (prevents 429 token limits & latency)
      const img = new Image();
      const objectUrl = URL.createObjectURL(blob);
      img.onload = () => {
        try {
          const maxDim = 1024;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          URL.revokeObjectURL(objectUrl);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve({
            base64: dataUrl.split(',')[1],
            mimeType: 'image/jpeg'
          });
        } catch (e) {
          // Fallback if canvas cross-origin prevents export
          const reader = new FileReader();
          reader.onload = (ev) => resolve({
            base64: ev.target.result.split(',')[1],
            mimeType
          });
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }
      };
      img.onerror = () => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve({
          base64: ev.target.result.split(',')[1],
          mimeType
        });
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      };
      img.src = objectUrl;
    });
  }

  // Step 2: Analyze photo with Claude Vision AI
  async function analyzeWithVision(base64Image, mimeType, imageUrl) {
    // Primary path: Use secure server-side endpoint (handles CORS and API security)
    try {
      const serverResp = await fetch('/api/vision-reconcile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, base64Image, mimeType })
      });
      if (serverResp.ok) {
        const data = await serverResp.json();
        if (data.status === 'ok' && data.sceneState) {
          if (data.engine) {
            logToEventStream(`[VISION AI] Powered by ${data.engine}${data.model ? ' (' + data.model + ')' : ''}`);
          }
          return data.sceneState;
        }
      }
    } catch (serverErr) {
      console.warn('Server vision proxy unavailable, attempting direct API:', serverErr);
    }

    // Direct Claude Vision call as specified in guide
    const prompt = `You are a construction site vision AI for Jumeirah Islands Villa 003, Dubai UAE.
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

  // State tracking to prevent fluctuation, infinite echo loops, or redundant re-renders
  let currentCarportState = null;

  // Step 3: Apply scene state to Digital Twin
  function applySceneState(sceneState, threshold) {
    if (!sceneState) return;
    const t = threshold || VISION_CONFIG.confidenceThreshold;

    // --- CAR IN CARPORT ---
    const carVisible = !!(sceneState.car_in_carport && (sceneState.car_in_carport_conf === undefined || sceneState.car_in_carport_conf >= t));
    
    // Strict de-duplication: only trigger scene mesh toggles and logs if state actually changed
    if (currentCarportState !== carVisible) {
      currentCarportState = carVisible;
      toggleSceneObject('carport-car-mesh', carVisible);
      logToEventStream(
        carVisible
          ? `[VISION] Car detected in carport (${Math.round((sceneState.car_in_carport_conf || 0.95) * 100)}% conf) → vehicles SHOWN`
          : `[VISION] No car in carport (${Math.round((sceneState.car_in_carport_conf || 0.95) * 100)}% conf) → carport EMPTY`
      );
    }

    // --- WORKERS ---
    const workersVisible = !!(sceneState.workers_present && sceneState.workers_present_conf >= t);
    toggleSceneObject('worker-group-mesh', workersVisible);

    // --- CRANE ---
    const craneVisible = !!(sceneState.crane_active && sceneState.crane_active_conf >= t);
    toggleSceneObject('crane-tower-mesh', craneVisible);

    // --- SCAFFOLDING ---
    const scaffoldVisible = !!(sceneState.scaffolding_present && sceneState.scaffolding_present_conf >= t);
    toggleSceneObject('scaffold-mesh', scaffoldVisible);

    // --- POOL WATER ---
    if (sceneState.pool_has_water && sceneState.pool_has_water_conf >= t) {
      if (window.JumeirahTwinAPI?.setSiteState) {
        // Pool water is active in twin
      }
    }

    // --- SUMMARY LOG ---
    if (sceneState.summary) {
      logToEventStream('[VISION] Scene summary: ' + sceneState.summary);
    }
  }

  // Helper: toggle a mesh by name in the Three.js scene
  function toggleSceneObject(meshName, visible) {
    const obj = scene.getObjectByName(meshName);
    if (obj) {
      obj.visible = visible;
    }

    if (meshName === 'carport-car-mesh' || meshName === 'carport-luxury-cars') {
      currentCarportState = visible;
      // Synchronize all carport vehicle representations across all phases so the carport is genuinely empty when visible = false!
      const luxuryCars = scene.getObjectByName('carport-luxury-cars') || scene.getObjectByName('carport-car-mesh');
      if (luxuryCars) {
        luxuryCars.visible = visible;
      }
      const siteTruck = scene.getObjectByName('site-truck-mesh');
      if (siteTruck) {
        siteTruck.visible = visible;
      }
      if (window.modelBuilder && typeof window.modelBuilder.setCarportVehiclesVisible === 'function') {
        window.modelBuilder.setCarportVehiclesVisible(visible);
      }
      const valVis = document.getElementById('val-car-mesh-vis');
      if (valVis) {
        valVis.textContent = visible ? 'SHOWN' : 'HIDDEN';
        valVis.className = visible ? 'text-emerald-300 font-bold' : 'text-rose-300';
      }
    }

    // Forward ACK only to parent frame if running inside an iframe.
    // NEVER invoke window.postMessage directly on the current window to prevent infinite message echo loops!
    if (window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({
          type: 'TWIN_COMMAND_ACK',
          action: 'TOGGLE_ELEMENT',
          payload: { elementId: meshName, visible }
        }, '*');
      } catch(e) { /* cross-origin */ }
    }
  }

  // Helper: write to the twin's own SDK event stream div
  function logToEventStream(message) {
    const stream = document.getElementById('sdkEventStream') || document.getElementById('sdk-console');
    if (stream) {
      const line = document.createElement('div');
      line.textContent = message;
      line.style.color = '#00d4ff';
      stream.appendChild(line);
      stream.scrollTop = stream.scrollHeight;
    }
    console.log(message);
  }

  // Step 5: Master Vision Reconciliation Function
  async function runVisionReconciliation(imageUrl) {
    logToEventStream('[VISION] Starting scene reconciliation…');
    try {
      const targetUrl = imageUrl || VISION_CONFIG.imageUrl;
      logToEventStream('[VISION] Fetching latest site photo: ' + targetUrl);
      let base64 = null;
      let mimeType = 'image/jpeg';
      try {
        const photoData = await fetchLatestSitePhoto(targetUrl);
        base64 = photoData.base64;
        mimeType = photoData.mimeType;
      } catch (fetchErr) {
        logToEventStream('[VISION] Note: Direct browser fetch bypassed (CORS/remote); delegating to proxy…');
      }

      logToEventStream('[VISION] Sending to Groq Vision AI…');
      const sceneState = await analyzeWithVision(base64, mimeType, targetUrl);
      logToEventStream('[VISION] Analysis complete.');

      applySceneState(sceneState);
      return sceneState;
    } catch (err) {
      logToEventStream('[VISION ERROR] ' + err.message);
      console.error('Vision reconciliation failed:', err);
    }
  }

  // Expose Vision Reconciler helpers to window for console/external testing
  window.VISION_CONFIG = VISION_CONFIG;
  window.fetchLatestSitePhoto = fetchLatestSitePhoto;
  window.analyzeWithVision = analyzeWithVision;
  window.applySceneState = applySceneState;
  window.toggleSceneObject = toggleSceneObject;
  window.logToEventStream = logToEventStream;
  window.runVisionReconciliation = runVisionReconciliation;

  // Phase 2: Auto-poll if pollInterval is configured
  if (VISION_CONFIG.pollInterval && typeof VISION_CONFIG.pollInterval === 'number') {
    setInterval(() => runVisionReconciliation(), VISION_CONFIG.pollInterval);
  }

  // ----------------------------------------------------
  // 2D. MULTI-CHANNEL LIVE SITE PHOTO SYNCHRONIZATION ENGINE
  // Connects with the Site Photo Upload Portal (/portal)
  // ----------------------------------------------------
  let lastSyncedPhotoId = null;
  const twinSyncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('jumeirah_twin_sync') : null;

  function handleRemoteSitePhoto(photo, sceneState, source = 'PORTAL') {
    if (!sceneState) return;
    const isCar = !!sceneState.car_in_carport;
    const stateChanged = currentCarportState !== isCar;

    applySceneState(sceneState);

    if (stateChanged) {
      // Provide clear user-facing feedback without forcefully hijacking camera navigation
      showToast(`📸 Site Photo Synced: Carport is ${isCar ? 'OCCUPIED' : 'EMPTY'}`);
      logToEventStream(`[${source} SYNC] Photo received: "${photo?.filename || photo?.caption || 'Site Photo'}" → Carport: ${isCar ? 'OCCUPIED (Cars Shown)' : 'EMPTY (Cars Hidden)'}`);
    }
    
    // Update car mesh badge in Vision AI modal if present
    const valVis = document.getElementById('val-car-mesh-vis');
    if (valVis) {
      valVis.textContent = isCar ? 'SHOWN' : 'HIDDEN';
      valVis.className = isCar ? 'text-emerald-300 font-bold' : 'text-rose-300';
    }
  }

  // Channel 1: Listen via BroadcastChannel (instant inter-tab communication in same browser)
  if (twinSyncChannel) {
    twinSyncChannel.onmessage = (event) => {
      if (event.data?.type === 'NEW_SITE_PHOTO') {
        lastSyncedPhotoId = event.data.photo?.id || event.data.timestamp;
        handleRemoteSitePhoto(event.data.photo, event.data.sceneState, 'BROADCAST');
      }
    };
  }

  // Channel 2: Listen via window postMessage (for iframe preview inside /portal)
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'NEW_SITE_PHOTO') {
      lastSyncedPhotoId = event.data.photo?.id;
      handleRemoteSitePhoto(event.data.photo, event.data.sceneState, 'POSTMESSAGE');
    }
  });

  // Channel 3: Background Polling of /api/site-photos/latest (cross-device/remote sync)
  async function pollLatestSitePhoto() {
    try {
      const resp = await fetch('/api/site-photos/latest?t=' + Date.now());
      if (!resp.ok) return;
      const data = await resp.json();
      if (data.status === 'ok' && data.photo && data.sceneState) {
        if (!lastSyncedPhotoId) {
          // Initial baseline sync
          lastSyncedPhotoId = data.photo.id;
          applySceneState(data.sceneState);
        } else if (lastSyncedPhotoId !== data.photo.id) {
          // New photo uploaded remotely!
          lastSyncedPhotoId = data.photo.id;
          handleRemoteSitePhoto(data.photo, data.sceneState, 'REMOTE CLOUD');
        }
      }
    } catch (e) {
      // Offline or network hiccup, silently retry
    }
  }

  // Start polling every 4 seconds
  setInterval(pollLatestSitePhoto, 4000);
  // Initial check shortly after initialization
  setTimeout(pollLatestSitePhoto, 1200);

  // ----------------------------------------------------
  // 3. ENDOMORPHISM STATE MACHINE (End(S), o, id)
  // ----------------------------------------------------
  let AppState = {
    phase: 'render',           // 'shoring' | 'site' | 'render'
    atmosphere: 'day',         // 'day' | 'dusk' | 'golden' | 'night'
    cadEdges: true,            // boolean
    sectionCut: { y: 12.0, x: 16.0 },
    activeFloor: 'all',        // 'all' | 'roof' | 'first' | 'ground' | 'basement'
    pinsVisible: true,
    cleanUI: false,
    docks: {
      left: true,
      right: true,
      bottom: true
    }
  };

  // Monoidal action dispatcher
  function mutateState(endomorphism, logMessage = null) {
    AppState = endomorphism(AppState);
    renderAppState();
    if (logMessage) logSDK(logMessage);
  }

  function renderAppState() {
    // 1. Sync Phase
    modelBuilder.setSiteState(AppState.phase);
    document.querySelectorAll('.phase-btn').forEach(btn => {
      const match = btn.getAttribute('data-phase') === AppState.phase;
      if (btn.closest('#inspector-panel')) {
        btn.className = match
          ? 'phase-btn active py-1.5 px-2 rounded-xl border border-stone-900 bg-stone-900 text-white text-[10px] font-medium text-center transition shadow-sm'
          : 'phase-btn py-1.5 px-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 text-[10px] font-medium text-center transition';
      } else if (btn.closest('#model-drawer')) {
        btn.className = match
          ? 'phase-btn active w-full p-2.5 rounded-xl border border-[#C87D55] bg-stone-900 text-white text-left transition flex items-center justify-between text-xs shadow-md'
          : 'phase-btn w-full p-2.5 rounded-xl border border-stone-200 hover:border-stone-400 text-left transition flex items-center justify-between text-xs text-stone-700 bg-stone-50';
      } else {
        btn.className = match
          ? 'phase-btn bg-gradient-to-r from-[#235347] to-[#163832] text-[#DAF1DE] border border-[#8EB69B] shadow-lg shadow-[#051F20]/50 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5'
          : 'phase-btn px-3 py-1.5 rounded-lg text-xs font-medium text-[#8EB69B] hover:text-[#DAF1DE] transition flex items-center gap-1.5';
      }
    });

    const topBar = document.getElementById('top-progress-bar');
    const topTxt = document.getElementById('top-progress-text');
    const landTxt = document.getElementById('log-landscape-pct');
    const landBar = document.getElementById('log-landscape-bar');
    const overviewBar = document.getElementById('overview-progress-bar');
    const overviewTxt = document.getElementById('overview-progress-text');
    const overviewTitle = document.getElementById('proj-overview-title');
    const overviewDate = document.getElementById('overview-handover-date');

    if (AppState.phase === 'shoring') {
      if (topBar) topBar.style.width = '62%';
      if (topTxt) topTxt.textContent = '62% (Shoring)';
      if (landTxt) landTxt.textContent = '10% (Excavation)';
      if (landBar) landBar.style.width = '10%';
      if (overviewBar) overviewBar.style.width = '62%';
      if (overviewTxt) overviewTxt.textContent = '62%';
      if (overviewTitle) overviewTitle.textContent = 'Superstructure & Shoring';
      if (overviewDate) overviewDate.textContent = 'Civil Works • Q1 2026';
    } else if (AppState.phase === 'site') {
      if (topBar) topBar.style.width = '86.4%';
      if (topTxt) topTxt.textContent = '86.4% (Oct 2026)';
      if (landTxt) landTxt.textContent = '35% (Sand Staging)';
      if (landBar) landBar.style.width = '35%';
      if (overviewBar) overviewBar.style.width = '86.4%';
      if (overviewTxt) overviewTxt.textContent = '86.4%';
      if (overviewTitle) overviewTitle.textContent = '08 Oct 2026 Site State';
      if (overviewDate) overviewDate.textContent = 'Superstructure • 08 Oct';
    } else {
      if (topBar) topBar.style.width = '100%';
      if (topTxt) topTxt.textContent = '100% (Render)';
      if (landTxt) landTxt.textContent = '100% (Render)';
      if (landBar) landBar.style.width = '100%';
      if (overviewBar) overviewBar.style.width = '74%';
      if (overviewTxt) overviewTxt.textContent = '74%';
      if (overviewTitle) overviewTitle.textContent = 'Design handover';
      if (overviewDate) overviewDate.textContent = 'Handover • 08 Oct';
    }

    // 2. Sync Atmosphere
    if (lightingManager && typeof lightingManager.setAtmosphere === 'function') {
      lightingManager.setAtmosphere(AppState.atmosphere);
    } else if (lightingManager && typeof lightingManager.setEnvironmentPreset === 'function') {
      lightingManager.setEnvironmentPreset(AppState.atmosphere);
    }
    document.querySelectorAll('.env-btn, .env-pill').forEach(btn => {
      const match = btn.getAttribute('data-env') === AppState.atmosphere;
      btn.classList.toggle('active', match);
    });
    const envBadge = document.getElementById('env-mode-badge');
    if (envBadge) {
      envBadge.textContent = AppState.atmosphere.toUpperCase();
    }

    // 3. Sync CAD Edges
    modelBuilder.toggleCADEdges(AppState.cadEdges);
    const edgeBtn = document.getElementById('btn-toggle-edges');
    if (edgeBtn) {
      edgeBtn.innerHTML = `<i class="fa-solid fa-vector-square text-[#8EB69B]"></i> <span class="hidden md:inline">CAD Edges: ${AppState.cadEdges ? 'ON' : 'OFF'}</span>`;
      edgeBtn.classList.toggle('active', AppState.cadEdges);
    }

    // 4. Sync Section Cut
    modelBuilder.setSectionCut(AppState.sectionCut);
    const yVal = document.getElementById('val-clip-y');
    const xVal = document.getElementById('val-clip-x');
    if (yVal) yVal.textContent = AppState.sectionCut.y >= 11.8 ? 'Full (12.0m)' : `${AppState.sectionCut.y.toFixed(1)}m`;
    if (xVal) xVal.textContent = AppState.sectionCut.x >= 15.8 ? 'Full (16.0m)' : `${AppState.sectionCut.x.toFixed(1)}m`;

    // 5. Sync Floor Level Isolation Buttons
    document.querySelectorAll('.floor-btn').forEach(btn => {
      const f = btn.getAttribute('data-floor');
      const match = f === AppState.activeFloor;
      if (match) {
        btn.className = 'floor-btn active py-1.5 px-2 rounded-lg bg-[#235347]/60 border border-[#8EB69B] text-[#DAF1DE] font-medium' + (f === 'basement' ? ' col-span-2' : '');
      } else {
        btn.className = 'floor-btn py-1.5 px-2 rounded-lg bg-white/5 border border-white/10 text-[#8EB69B] hover:text-[#DAF1DE]' + (f === 'basement' ? ' col-span-2' : '');
      }
    });

    // 6. Sync Clean HUD UI
    const leftDock = document.getElementById('left-dock');
    const rightDock = document.getElementById('right-dock');
    const bottomDock = document.getElementById('bottom-dock');
    if (leftDock) leftDock.classList.toggle('dock-left-collapsed', !AppState.docks.left || AppState.cleanUI);
    if (rightDock) rightDock.classList.toggle('dock-right-collapsed', !AppState.docks.right || AppState.cleanUI);
    if (bottomDock) bottomDock.classList.toggle('dock-bottom-collapsed', !AppState.docks.bottom || AppState.cleanUI);
  }

  // ----------------------------------------------------
  // 4. PUBLIC API: window.JumeirahTwinAPI & POSTMESSAGE
  // ----------------------------------------------------
  window.JumeirahTwinAPI = {
    // Switch between 'render' (Finished Master) and 'site' (Oct 2026 Construction) or 'shoring'
    setSiteState: (stateKey) => {
      mutateState(s => ({ ...s, phase: stateKey }), `Site State updated -> ${stateKey.toUpperCase()}`);
    },
    setPhase: (phaseKey) => {
      mutateState(s => ({ ...s, phase: phaseKey }), `Phase updated -> ${phaseKey.toUpperCase()}`);
    },

    // Smoothly fly camera: 'frontRender' | 'rearPool' | 'rearShoring' | 'frontYardTop' | 'carport' | station IDs
    setCameraView: (viewKey) => {
      const title = cameraManager.setCameraView(viewKey);
      logSDK(`Camera View -> ${title || viewKey}`);
    },
    setCamera: (bookmarkOrId) => {
      const title = cameraManager.setCameraView(bookmarkOrId);
      logSDK(`Camera View -> ${title || bookmarkOrId}`);
    },

    // Set Lighting Mode: 'day' | 'dusk' | 'night' | 'wireframe'
    setEnvironment: (modeKey) => {
      mutateState(s => ({ ...s, atmosphere: modeKey }), `Environment -> ${modeKey.toUpperCase()}`);
    },
    setAtmosphere: (modeKey) => {
      mutateState(s => ({ ...s, atmosphere: modeKey }), `Atmosphere -> ${modeKey.toUpperCase()}`);
    },

    // BIM Section Cut Clipping Planes
    setSectionCut: (cutConfig) => {
      mutateState(s => ({
        ...s,
        sectionCut: {
          y: cutConfig.y !== undefined ? cutConfig.y : s.sectionCut.y,
          x: cutConfig.x !== undefined ? cutConfig.x : s.sectionCut.x
        }
      }), `BIM Section Cut: Y=${cutConfig.y ?? 'same'}m, X=${cutConfig.x ?? 'same'}m`);
    },
    resetSectionCut: () => {
      mutateState(s => ({ ...s, sectionCut: { y: 12.0, x: 16.0 } }), 'BIM Section Cut Reset');
    },

    // BIM Exploded Axonometric View
    explodeBIM: (enable) => {
      modelBuilder.setExplodeBIM(enable);
      mutateState(s => ({ ...s, exploded: !!enable }), `Explode BIM -> ${enable ? 'ON' : 'OFF'}`);
    },

    // Select Camera Station & Inspect Timelapse Frames
    selectCamera: (camId) => {
      cameraManager.enterInspection(camId, true);
      logSDK(`Selected Camera -> ${camId}`);
    },

    // Toggles & Floor Isolation
    toggleCAD: (force) => {
      mutateState(s => ({ ...s, cadEdges: force !== undefined ? force : !s.cadEdges }), 'Toggled CAD Edges');
    },
    togglePins: (force) => {
      const v = cameraManager.togglePins(force);
      mutateState(s => ({ ...s, pinsVisible: v }), `Toggled Pins -> ${v ? 'ON' : 'OFF'}`);
    },
    isolateFloor: (floorName) => {
      modelBuilder.isolateFloor(floorName);
      mutateState(s => ({ ...s, activeFloor: floorName }), `Floor Isolation -> ${floorName.toUpperCase()}`);
    },
    toggleAssistant: (force) => {
      buildingAssistant.toggle(force);
    },
    askAssistant: (question) => {
      buildingAssistant.toggle(true);
      if (question) buildingAssistant.sendMessage(question);
    },
    // Vision-Based Scene Reconciliation (Step 5)
    runVisionReconcile: (imageUrl) => {
      return runVisionReconciliation(imageUrl);
    },
    runVisionReconciliation: (imageUrl) => {
      return runVisionReconciliation(imageUrl);
    },
    toggleElement: (elementId, visible) => {
      toggleSceneObject(elementId, visible);
    },
    getState: () => ({ ...AppState })
  };

  // Parent iframe message bridge & TWIN_COMMAND dispatcher
  window.addEventListener('message', (event) => {
    if (!event.data || typeof event.data !== 'object') return;
    const data = event.data;

    let action = data.action;
    let payload = data.payload;

    if (data.type === 'TWIN_COMMAND') {
      action = data.action;
      payload = data.payload;
    }

    if (!action) return;

    const actionUpper = String(action).toUpperCase();
    const actionLower = String(action).toLowerCase().replace(/_/g, '');

    if (actionUpper === 'SET_STATE' || actionLower === 'setstate' || actionLower === 'setsitestate' || actionLower === 'setphase') {
      window.JumeirahTwinAPI.setSiteState(payload);
    } else if (actionUpper === 'SET_CAMERA' || actionUpper === 'SET_VIEW' || actionUpper === 'SET_CAMERA_VIEW' || actionLower === 'setcameraview' || actionLower === 'setcamera') {
      window.JumeirahTwinAPI.setCameraView(payload);
    } else if (actionUpper === 'SET_ENVIRONMENT' || actionUpper === 'SET_LIGHTING' || actionUpper === 'SET_ATMOSPHERE' || actionLower === 'setenvironment' || actionLower === 'setatmosphere') {
      window.JumeirahTwinAPI.setEnvironment(payload);
    } else if (actionUpper === 'SET_SECTION' || actionUpper === 'SET_SECTION_CUT' || actionLower === 'setsectioncut') {
      window.JumeirahTwinAPI.setSectionCut(payload);
    } else if (actionUpper === 'RESET_SECTION' || actionLower === 'resetsectioncut') {
      window.JumeirahTwinAPI.resetSectionCut();
    } else if (actionUpper === 'ISOLATE_FLOOR' || actionLower === 'isolatefloor') {
      window.JumeirahTwinAPI.isolateFloor(payload);
    } else if (actionUpper === 'TOGGLE_ASSISTANT' || actionLower === 'toggleassistant') {
      window.JumeirahTwinAPI.toggleAssistant(payload);
    } else if (actionUpper === 'ASK_ASSISTANT' || actionLower === 'askassistant') {
      window.JumeirahTwinAPI.askAssistant(payload);
    } else if (actionUpper === 'EXPLODE_BIM' || actionLower === 'explodebim') {
      window.JumeirahTwinAPI.explodeBIM(payload);
    } else if (actionUpper === 'SELECT_CAMERA' || actionLower === 'selectcamera') {
      window.JumeirahTwinAPI.selectCamera(payload);
    } else if (actionUpper === 'TOGGLE_CAD' || actionLower === 'togglecad') {
      window.JumeirahTwinAPI.toggleCAD(payload);
    } else if (actionUpper === 'TOGGLE_PINS' || actionLower === 'togglepins') {
      window.JumeirahTwinAPI.togglePins(payload);
    } else if (actionUpper === 'TOGGLE_ELEMENT' || actionLower === 'toggleelement') {
      const meshName = payload?.elementId || payload?.meshName || payload;
      const visible = !!payload?.visible;
      toggleSceneObject(meshName, visible);
    } else if (actionUpper === 'RUN_VISION_RECONCILE' || actionLower === 'runvisionreconcile') {
      runVisionReconciliation(payload?.imageUrl || payload);
    } else if (actionUpper === 'GET_STATE' || actionLower === 'getstate') {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'TWIN_STATE',
          payload: window.JumeirahTwinAPI.getState()
        }, '*');
      }
    } else if (typeof window.JumeirahTwinAPI[action] === 'function') {
      window.JumeirahTwinAPI[action](payload);
    }

    // Post acknowledge state event back to parent
    if (window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({
          type: 'TWIN_COMMAND_ACK',
          action: action,
          payload: payload,
          state: window.JumeirahTwinAPI.getState()
        }, '*');
      } catch (e) {
        // Cross-origin safe
      }
    }
  });

  // ----------------------------------------------------
  // 5. UI EVENT LISTENERS & BINDINGS
  // ----------------------------------------------------
  // Phase scrubber buttons
  document.querySelectorAll('.phase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.getAttribute('data-phase');
      window.JumeirahTwinAPI.setPhase(p);
      showToast(`Phase: ${p === 'render' ? 'Master Design Handover' : p === 'site' ? '08 Oct 2026 Site State' : 'Superstructure & Shoring'}`);
    });
  });

  // Camera Bookmark buttons
  document.querySelectorAll('.cam-pill, .preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const camKey = btn.getAttribute('data-cam') || btn.getAttribute('data-view');
      if (camKey) {
        if (camKey.startsWith('CAM-')) {
          cameraManager.enterInspection(camKey, true);
        } else {
          window.JumeirahTwinAPI.setCamera(camKey);
        }
        showToast(`Camera: ${camKey}`);
      }
    });
  });

  // Atmosphere Buttons
  document.querySelectorAll('.env-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const env = btn.getAttribute('data-env');
      if (env) {
        window.JumeirahTwinAPI.setAtmosphere(env);
        showToast(`Atmosphere: ${env.toUpperCase()}`);
      }
    });
  });

  // BIM Section Cut Sliders
  const sliderClipY = document.getElementById('slider-clip-y');
  const sliderClipX = document.getElementById('slider-clip-x');
  const btnResetClip = document.getElementById('btn-reset-clip');

  if (sliderClipY) {
    sliderClipY.addEventListener('input', (e) => {
      const y = parseFloat(e.target.value);
      window.JumeirahTwinAPI.setSectionCut({ y });
    });
  }
  if (sliderClipX) {
    sliderClipX.addEventListener('input', (e) => {
      const x = parseFloat(e.target.value);
      window.JumeirahTwinAPI.setSectionCut({ x });
    });
  }
  if (btnResetClip) {
    btnResetClip.addEventListener('click', () => {
      window.JumeirahTwinAPI.resetSectionCut();
      if (sliderClipY) sliderClipY.value = 12.0;
      if (sliderClipX) sliderClipX.value = 16.0;
      showToast('BIM Section Cut Reset');
    });
  }

  // CAD Edges Toggle
  const btnToggleEdges = document.getElementById('btn-toggle-edges');
  if (btnToggleEdges) {
    btnToggleEdges.addEventListener('click', () => {
      window.JumeirahTwinAPI.toggleCAD();
      showToast(`CAD Edge Lines: ${AppState.cadEdges ? 'ON' : 'OFF'}`);
    });
  }

  // 3D Pins Toggle
  const btnTogglePins = document.getElementById('btn-toggle-pins');
  if (btnTogglePins) {
    btnTogglePins.addEventListener('click', () => {
      window.JumeirahTwinAPI.togglePins();
      showToast(`Spatial Pins: ${AppState.pinsVisible ? 'ON' : 'OFF'}`);
    });
  }

  // Walk Mode Toggle
  const btnWalkMode = document.getElementById('btn-walk-mode');
  if (btnWalkMode) {
    btnWalkMode.addEventListener('click', () => {
      cameraManager.toggleWalkMode();
      showToast(`Walk Mode: ${cameraManager.walkModeActive ? 'Active (WASD to walk)' : 'Disabled'}`);
    });
  }

  // Crystal Clear Building Preset (Resets section cuts and maximizes building contrast)
  const btnCrystalClear = document.getElementById('btn-crystal-clear');
  if (btnCrystalClear) {
    btnCrystalClear.addEventListener('click', () => {
      window.JumeirahTwinAPI.resetSectionCut();
      window.JumeirahTwinAPI.setPhase('render');
      window.JumeirahTwinAPI.setAtmosphere('day');
      window.JumeirahTwinAPI.setCamera('frontHero');
      showToast('Crystal Clear Building Handover View');
    });
  }

  // Dock Collapse Toggles
  const btnToggleLeft = document.getElementById('btn-toggle-left');
  const btnToggleRight = document.getElementById('btn-toggle-right');
  const btnCleanUI = document.getElementById('btn-clean-ui');

  if (btnToggleLeft) {
    btnToggleLeft.addEventListener('click', () => {
      mutateState(s => ({ ...s, docks: { ...s.docks, left: !s.docks.left } }));
    });
  }
  if (btnToggleRight) {
    btnToggleRight.addEventListener('click', () => {
      mutateState(s => ({ ...s, docks: { ...s.docks, right: !s.docks.right } }));
    });
  }
  if (btnCleanUI) {
    btnCleanUI.addEventListener('click', () => {
      mutateState(s => ({ ...s, cleanUI: !s.cleanUI }));
      showToast(`Clean HUD Mode: ${AppState.cleanUI ? 'ON' : 'OFF'}`);
    });
  }

  // Antigravity IDE SDK Modal
  const btnIdeSdk = document.getElementById('btn-ide-sdk');
  const ideModal = document.getElementById('ide-modal');
  const btnCloseIde = document.getElementById('btn-close-ide');
  const btnTestSdk = document.getElementById('btn-test-sdk');
  const btnCopySdk = document.getElementById('btn-copy-sdk');

  if (btnIdeSdk && ideModal) {
    btnIdeSdk.addEventListener('click', () => ideModal.classList.remove('hidden'));
  }
  if (btnCloseIde && ideModal) {
    btnCloseIde.addEventListener('click', () => ideModal.classList.add('hidden'));
  }
  if (btnTestSdk) {
    btnTestSdk.addEventListener('click', () => {
      window.JumeirahTwinAPI.setCamera('rearOrtho');
      window.JumeirahTwinAPI.setAtmosphere('dusk');
      showToast('SDK Test Triggered: Rear View + Blue Hour');
    });
  }
  if (btnCopySdk) {
    btnCopySdk.addEventListener('click', () => {
      const code = document.getElementById('sdk-code-block')?.textContent || '';
      navigator.clipboard.writeText(code);
      showToast('SDK code copied to clipboard');
    });
  }

  // Vision AI Header Button & Controller Panel
  const btnVisionAi = document.getElementById('btn-vision-ai');
  const btnRunVision = document.getElementById('btn-run-vision');
  const inputVisionUrl = document.getElementById('vision-image-url');
  const btnToggleCarportMesh = document.getElementById('btn-toggle-carport-mesh');
  const valCarMeshVis = document.getElementById('val-car-mesh-vis');

  if (btnVisionAi && ideModal) {
    btnVisionAi.addEventListener('click', () => {
      ideModal.classList.remove('hidden');
      if (inputVisionUrl) inputVisionUrl.focus();
    });
  }

  if (btnRunVision) {
    btnRunVision.addEventListener('click', async () => {
      const url = inputVisionUrl ? inputVisionUrl.value.trim() : null;
      btnRunVision.disabled = true;
      btnRunVision.innerHTML = '<i class="fa-solid fa-spinner animate-spin text-[#8EB69B]"></i> Analyzing…';
      try {
        const state = await runVisionReconciliation(url);
        if (state && valCarMeshVis) {
          const isCar = !!state.car_in_carport;
          valCarMeshVis.textContent = isCar ? 'SHOWN' : 'HIDDEN';
          valCarMeshVis.className = isCar ? 'text-emerald-300 font-bold' : 'text-rose-300';
        }
      } finally {
        btnRunVision.disabled = false;
        btnRunVision.innerHTML = '<i class="fa-solid fa-bolt text-[#8EB69B]"></i> <span>Reconcile Scene</span>';
      }
    });
  }

  document.querySelectorAll('.vision-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = btn.getAttribute('data-url');
      if (inputVisionUrl && u) {
        inputVisionUrl.value = u;
      }
      if (btnRunVision) btnRunVision.click();
    });
  });

  if (btnToggleCarportMesh) {
    btnToggleCarportMesh.addEventListener('click', () => {
      const isCurrentlyVisible = currentCarportState !== null
        ? currentCarportState
        : (window.modelBuilder?.carportVehiclesReconciled ?? true);
      const newVisible = !isCurrentlyVisible;
      toggleSceneObject('carport-car-mesh', newVisible);
      showToast(`Carport Vehicles: ${newVisible ? 'SHOWN' : 'HIDDEN'}`);
    });
  }

  // Populate Cameras Drawer List & Spatial Telemetry
  populateCamerasDrawerList(cameraManager);
  populateSpatialNodesList(cameraManager);

  // Populate Bottom Camera Carousel
  populateCameraCarousel(cameraManager);

  // Modal Close & Adjunction return
  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      cameraManager.exitInspection();
    });
  }

  // Modal Fly-in button (functorial return to 3D)
  const btnFlyInTwin = document.getElementById('btn-fly-in-twin');
  if (btnFlyInTwin) {
    btnFlyInTwin.addEventListener('click', () => {
      cameraManager.closePhotoModal();
      showToast('Aligned 3D Viewport with Physical Camera Station');
    });
  }

  // Timelapse playback and scrubber bindings
  const btnTimelapsePlay = document.getElementById('btn-timelapse-play');
  if (btnTimelapsePlay) {
    btnTimelapsePlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      cameraManager.toggleTimelapse();
    });
  }

  const timelapseScrubber = document.getElementById('timelapse-scrubber');
  if (timelapseScrubber) {
    timelapseScrubber.addEventListener('input', (e) => {
      const idx = parseInt(e.target.value, 10);
      cameraManager.updateModalFrame(idx);
    });
  }

  // Solar Study Sliders in Left Dock
  const sliderAzimuth = document.getElementById('slider-azimuth');
  const sliderElevation = document.getElementById('slider-elevation');
  const sliderExposure = document.getElementById('slider-bloom');

  if (sliderAzimuth) {
    sliderAzimuth.addEventListener('input', (e) => {
      const az = parseFloat(e.target.value);
      lightingManager.updateSunPosition(az, lightingManager.elevation);
      document.getElementById('val-azimuth').textContent = `${Math.round(az)}°`;
    });
  }
  if (sliderElevation) {
    sliderElevation.addEventListener('input', (e) => {
      const el = parseFloat(e.target.value);
      lightingManager.updateSunPosition(lightingManager.azimuth, el);
      document.getElementById('val-elevation').textContent = `${Math.round(el)}°`;
    });
  }
  if (sliderExposure) {
    sliderExposure.addEventListener('input', (e) => {
      const ex = parseFloat(e.target.value);
      lightingManager.setExposure(ex);
      document.getElementById('val-bloom').textContent = ex.toFixed(2);
    });
  }

  // Keyboard Shortcuts (1-5 views, WASD walk, C pins, M measure, E explode, L light, H hud)
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const k = e.key.toLowerCase();
    if (k === '1') window.JumeirahTwinAPI.setCamera('frontHero');
    if (k === '2') window.JumeirahTwinAPI.setCamera('rearOrtho');
    if (k === '3') window.JumeirahTwinAPI.setCamera('frontEntrance');
    if (k === '4') window.JumeirahTwinAPI.setCamera('topYard');
    if (k === '5') window.JumeirahTwinAPI.setCamera('parkingSide');
    if (k === 'c') window.JumeirahTwinAPI.togglePins();
    if (k === 'a') window.JumeirahTwinAPI.toggleAssistant();
    if (k === 'm') measurementTool.toggleMode();
    if (k === 'h') window.JumeirahTwinAPI.toggleCleanUI?.();
    if (k === 'l') {
      const modes = ['day', 'dusk', 'golden', 'night'];
      const next = modes[(modes.indexOf(AppState.atmosphere) + 1) % modes.length];
      window.JumeirahTwinAPI.setAtmosphere(next);
      showToast(`Atmosphere: ${next.toUpperCase()}`);
    }
    if (k === 'escape') {
      cameraManager.exitInspection();
      ideModal?.classList.add('hidden');
      buildingAssistant?.toggle(false);
    }
  });

  // Handle Window Resize & Viewport Layout Resizing
  function syncViewportSize() {
    if (!container || !camera || !renderer) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w > 0 && h > 0) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
  }

  window.addEventListener('resize', syncViewportSize);

  // ResizeObserver guarantees the 3D canvas is immediately synchronized whenever DOM elements settle
  if (typeof ResizeObserver !== 'undefined' && container) {
    const ro = new ResizeObserver(() => syncViewportSize());
    ro.observe(container);
  }

  setTimeout(syncViewportSize, 50);
  setTimeout(syncViewportSize, 250);
  setTimeout(syncViewportSize, 800);

  // Initial State Rendering
  renderAppState();
  cameraManager.selectSpatialNode(cameraManager.spatialNodes[0], false);

  // ----------------------------------------------------
  // VILLA 003 — CLIENT INTELLIGENCE DASHBOARD UI HOOKS
  // ----------------------------------------------------

  // 1. Camera Carousel Navigation (< and > buttons)
  const carouselViews = [
    { index: '01 / 04', title: 'Courtyard', camKey: 'frontHero', element: 'living' },
    { index: '02 / 04', title: 'Living & Poolside Lounge', camKey: 'frontEntrance', element: 'living' },
    { index: '03 / 04', title: 'Cyan River-Vein Pool', camKey: 'rearPool', element: 'pool' },
    { index: '04 / 04', title: 'Cantilever Carport', camKey: 'carport', element: 'pergola' }
  ];
  let currentCarouselIndex = 0;

  function setCarouselView(index) {
    if (index < 0) index = carouselViews.length - 1;
    if (index >= carouselViews.length) index = 0;
    currentCarouselIndex = index;
    const v = carouselViews[currentCarouselIndex];
    const counterEl = document.getElementById('current-view-counter');
    const titleEl = document.getElementById('current-view-title');
    if (counterEl) counterEl.textContent = `${v.index} • CURRENT VIEW`;
    if (titleEl) titleEl.textContent = v.title;

    window.JumeirahTwinAPI.setCamera(v.camKey);
  }

  const btnPrevView = document.getElementById('btn-prev-view');
  const btnNextView = document.getElementById('btn-next-view');
  if (btnPrevView) btnPrevView.addEventListener('click', () => setCarouselView(currentCarouselIndex - 1));
  if (btnNextView) btnNextView.addEventListener('click', () => setCarouselView(currentCarouselIndex + 1));

  // 2. Selected Element Inspector
  let currentSelection = {
    title: 'Pool finish',
    desc: 'Hand-laid cyan mosaic with a low-reflection finish, matched to approved site sample M-14.',
    code: 'FN-14',
    rev: 'R12 • 2 days ago',
    owner: 'Mira Studio',
    cam: 'rearPool'
  };

  function selectElementInfo(title, desc, code, rev, owner, cam = 'rearPool') {
    currentSelection = { title, desc, code, rev, owner, cam };
    const titleEl = document.getElementById('insp-title');
    const descEl = document.getElementById('insp-desc');
    const codeEl = document.getElementById('insp-code');
    const refEl = document.getElementById('insp-photo-ref');
    const ownerEl = document.getElementById('insp-owner');
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (codeEl) codeEl.textContent = code;
    if (refEl) refEl.textContent = rev;
    if (ownerEl) ownerEl.textContent = owner;
    showToast(`Inspecting: ${title}`);
  }

  // Action Buttons in Card 2 & Card 3
  const btnFlySelected = document.getElementById('btn-fly-selected');
  const btnHighlightSelected = document.getElementById('btn-highlight-selected');
  const btnCinemaTour = document.getElementById('btn-cinema-tour');
  const btnQuickTour = document.getElementById('btn-quick-tour');
  const btnQuickExplode = document.getElementById('btn-quick-explode');

  if (btnFlySelected) {
    btnFlySelected.addEventListener('click', () => {
      if (currentSelection && currentSelection.cam) {
        window.JumeirahTwinAPI.setCamera(currentSelection.cam);
        showToast(`Flying camera to ${currentSelection.title}`);
      }
    });
  }

  if (btnHighlightSelected) {
    btnHighlightSelected.addEventListener('click', () => {
      if (currentSelection) {
        showToast(`Focusing: ${currentSelection.title}`);
        if (currentSelection.cam) window.JumeirahTwinAPI.setCamera(currentSelection.cam);
      }
    });
  }

  function toggleCinemaTourMode() {
    const nextState = !cameraManager.cinemaTourActive;
    cameraManager.toggleCinemaTour(nextState);
    if (nextState) {
      showToast('360° Architectural Drone Tour Started');
    } else {
      showToast('Drone Tour Paused');
    }
  }

  if (btnCinemaTour) btnCinemaTour.addEventListener('click', toggleCinemaTourMode);
  if (btnQuickTour) btnQuickTour.addEventListener('click', toggleCinemaTourMode);

  if (btnQuickExplode) {
    btnQuickExplode.addEventListener('click', () => {
      const willExplode = !modelBuilder.isExploded;
      window.JumeirahTwinAPI.explodeBIM(willExplode);
      const span = btnQuickExplode.querySelector('span');
      if (willExplode) {
        btnQuickExplode.classList.add('bg-stone-900', 'text-white');
        btnQuickExplode.classList.remove('bg-white', 'text-stone-800');
        if (span) span.textContent = 'Collapse BIM';
        showToast('BIM Subsystems Exploded (+6.0m Elevation)');
      } else {
        btnQuickExplode.classList.remove('bg-stone-900', 'text-white');
        btnQuickExplode.classList.add('bg-white', 'text-stone-800');
        if (span) span.textContent = 'Explode BIM';
        showToast('BIM Subsystems Collapsed to Normal');
      }
    });
  }

  // Interactive 3D Villa Raycasting
  cameraManager.onSceneClick = (raycaster, e) => {
    const candidateGroups = [
      modelBuilder.groups.structural,
      modelBuilder.groups.wood,
      modelBuilder.groups.glazing,
      modelBuilder.groups.water,
      modelBuilder.groups.renderOnly,
      modelBuilder.groups.siteOnly
    ].filter(Boolean);

    const hits = raycaster.intersectObjects(candidateGroups, true);
    if (hits.length > 0) {
      const hit = hits[0];
      const pt = hit.point;

      if (pt.z < -3.5 && pt.x < 4.0) {
        // Pool Zone
        selectElementInfo(
          'Pool finish',
          'Hand-laid cyan mosaic with a low-reflection finish, matched to approved site sample M-14.',
          'FN-14',
          'R12 • 2 days ago',
          'Mira Studio',
          'rearPool',
          'callout-pin-3'
        );
      } else if (pt.x > 3.2 && pt.z > 0.0) {
        // Cantilever Pergola & Carport
        selectElementInfo(
          'Cantilever Overhang & Pergola',
          '13.2m post-tensioned cantilever pergola with coffer beams and 3 vertical living green-wall columns.',
          'ST-02',
          'R08 • 1 day ago',
          'Al Futtaim Engineering',
          'carport',
          'callout-pin-1'
        );
      } else if (pt.y >= 3.4) {
        // Upper Master Suite & Cantilever Roof
        selectElementInfo(
          'Upper Master Pavilion & Terrace',
          'Floating upper level cantilevered master bedroom suite with expansive glass balcony and bronze solar louvers.',
          'AR-03',
          'R09 • 4 days ago',
          'Killa Design',
          'frontHero',
          null
        );
      } else if (pt.z > 5.0 && pt.x <= 3.0) {
        // Front Entry & Courtyard Lawn
        selectElementInfo(
          'Courtyard Entry Garden',
          'Architectural water fountain, manicured lawn with sunken perimeter LED uplights, and date palm grove.',
          'LS-01',
          'R04 • 5 days ago',
          'Desert Landscape LLC',
          'frontHero',
          null
        );
      } else {
        // Living & Poolside Lounge
        selectElementInfo(
          'Living & Poolside Lounge',
          '6.4m double-height living room pavilion with floor-to-ceiling Schuco slimline structural glazing.',
          'GL-01',
          'R15 • 3 days ago',
          'Mira Studio',
          'frontEntrance'
        );
      }
    }
  };

  // 3. Left Icon Rail Tabs & Feature Drawers
  function closeAllDrawers() {
    document.querySelectorAll('.drawer-panel').forEach(d => d.classList.add('closed'));
    document.querySelectorAll('.left-rail-item').forEach(b => b.classList.remove('active'));
  }

  const railExplore = document.getElementById('rail-btn-explore');
  const railModel = document.getElementById('rail-btn-model');
  const railLayers = document.getElementById('rail-btn-layers');
  const railCameras = document.getElementById('rail-btn-cameras');
  const railSolar = document.getElementById('rail-btn-solar');
  const modelDrawer = document.getElementById('model-drawer');
  const layersDrawer = document.getElementById('layers-drawer');
  const camerasDrawer = document.getElementById('cameras-drawer');
  const solarDrawer = document.getElementById('solar-drawer');

  if (railExplore) {
    railExplore.addEventListener('click', () => {
      closeAllDrawers();
      railExplore.classList.add('active');
    });
  }

  if (railModel && modelDrawer) {
    railModel.addEventListener('click', () => {
      const isClosed = modelDrawer.classList.contains('closed');
      closeAllDrawers();
      if (isClosed) {
        modelDrawer.classList.remove('closed');
        railModel.classList.add('active');
      } else {
        railExplore?.classList.add('active');
      }
    });
  }

  if (railLayers && layersDrawer) {
    railLayers.addEventListener('click', () => {
      const isClosed = layersDrawer.classList.contains('closed');
      closeAllDrawers();
      if (isClosed) {
        layersDrawer.classList.remove('closed');
        railLayers.classList.add('active');
      } else {
        railExplore?.classList.add('active');
      }
    });
  }

  if (railCameras && camerasDrawer) {
    railCameras.addEventListener('click', () => {
      const isClosed = camerasDrawer.classList.contains('closed');
      closeAllDrawers();
      if (isClosed) {
        camerasDrawer.classList.remove('closed');
        railCameras.classList.add('active');
      } else {
        railExplore?.classList.add('active');
      }
    });
  }

  if (railSolar && solarDrawer) {
    railSolar.addEventListener('click', () => {
      const isClosed = solarDrawer.classList.contains('closed');
      closeAllDrawers();
      if (isClosed) {
        solarDrawer.classList.remove('closed');
        railSolar.classList.add('active');
      } else {
        railExplore?.classList.add('active');
      }
    });
  }

  // CAD Edges Toggle Button in Solar Drawer
  const btnToggleCad = document.getElementById('btn-toggle-cad-edges');
  if (btnToggleCad) {
    btnToggleCad.addEventListener('click', () => {
      const state = modelBuilder.toggleCADEdges();
      showToast(`CAD Architecture Outlines: ${state ? 'ENABLED' : 'DISABLED'}`);
    });
  }

  document.querySelectorAll('.drawer-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllDrawers();
      railExplore?.classList.add('active');
    });
  });

  // 4. Viewport Lighting Pills
  document.querySelectorAll('.env-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const env = btn.getAttribute('data-env');
      if (env) {
        window.JumeirahTwinAPI.setAtmosphere(env);
        document.querySelectorAll('.env-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`Atmosphere: ${env.toUpperCase()}`);
      }
    });
  });

  // 5. Exploded BIM Toggle in Model Drawer
  const btnExplodeOn = document.getElementById('btn-explode-on');
  const btnExplodeOff = document.getElementById('btn-explode-off');
  if (btnExplodeOn) {
    btnExplodeOn.addEventListener('click', () => {
      window.JumeirahTwinAPI.explodeBIM(true);
      btnExplodeOn.className = 'flex-1 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-medium shadow';
      if (btnExplodeOff) btnExplodeOff.className = 'flex-1 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium';
    });
  }
  if (btnExplodeOff) {
    btnExplodeOff.addEventListener('click', () => {
      window.JumeirahTwinAPI.explodeBIM(false);
      btnExplodeOff.className = 'flex-1 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-medium shadow';
      if (btnExplodeOn) btnExplodeOn.className = 'flex-1 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium';
    });
  }

  // 6. Presentation Mode & Fullscreen Card
  const btnPresent = document.getElementById('btn-present');
  const btnExitPresent = document.getElementById('btn-exit-presentation');
  const btnMaximizeCard = document.getElementById('btn-maximize-card');
  const btnFullscreenTop = document.getElementById('btn-fullscreen-top');

  function togglePresentationMode(force) {
    const isPres = force !== undefined ? force : !document.body.classList.contains('presentation-mode');
    document.body.classList.toggle('presentation-mode', isPres);
    setTimeout(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }, 60);
    if (isPres) showToast('Executive Presentation Mode: Active');
  }

  if (btnPresent) btnPresent.addEventListener('click', () => togglePresentationMode(true));
  if (btnExitPresent) btnExitPresent.addEventListener('click', () => togglePresentationMode(false));
  if (btnMaximizeCard) btnMaximizeCard.addEventListener('click', () => togglePresentationMode());
  if (btnFullscreenTop) btnFullscreenTop.addEventListener('click', () => togglePresentationMode());

  // 7. Share Action
  const btnShare = document.getElementById('btn-share');
  const btnShareTop = document.getElementById('btn-share-top');
  function handleShareLink() {
    try {
      navigator.clipboard.writeText(window.location.href);
      showToast('Dashboard URL copied to clipboard!');
    } catch (e) {
      showToast('URL: ' + window.location.href);
    }
  }
  if (btnShare) btnShare.addEventListener('click', handleShareLink);
  if (btnShareTop) btnShareTop.addEventListener('click', handleShareLink);

  // ----------------------------------------------------
  // 6. ANIMATION & TELEMETRY DIAGNOSTICS LOOP
  // ----------------------------------------------------
  let lastTime = performance.now();
  let frameCount = 0;
  const fpsEl = document.getElementById('stat-fps');

  function animate(time) {
    requestAnimationFrame(animate);

    // Update Tween interpolations
    if (typeof TWEEN !== 'undefined') {
      TWEEN.update();
    }

    controls.update();
    cameraManager.update(time);
    modelBuilder.update(time);
    buildingAssistant.update(time);

    // Redraw 2D Radar Minimap
    if (minimap) {
      minimap.draw();
    }

    // Diagnostics FPS computation
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      if (fpsEl) fpsEl.textContent = Math.round((frameCount * 1000) / (now - lastTime));
      frameCount = 0;
      lastTime = now;
    }

    renderer.render(scene, camera);
  }

  animate(0);
});

// ----------------------------------------------------
// UI POPULATION & UTILITY HELPERS
// ----------------------------------------------------
function populateCamerasDrawerList(cameraManager) {
  const container = document.getElementById('cameras-list-container');
  if (!container) return;
  container.innerHTML = '';

  const cameras = cameraManager.camerasData || (window.SITE_DATA && window.SITE_DATA.cameras) || [];
  cameras.forEach((cam) => {
    const item = document.createElement('div');
    item.className = 'p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 transition flex items-center justify-between gap-3 group cursor-pointer shadow-xs';
    item.innerHTML = `
      <div class="flex items-center gap-2.5 truncate">
        <div class="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 shadow-sm">
          ${cam.id.replace('CAM-', '')}
        </div>
        <div class="truncate">
          <div class="text-xs font-semibold text-stone-900 truncate group-hover:text-[#C87D55] transition">${cam.title}</div>
          <div class="text-[10px] text-stone-500 font-mono flex items-center gap-1.5 mt-0.5">
            <span class="capitalize">${cam.floor || 'Exterior'}</span>
            <span>•</span>
            <span class="text-emerald-700 font-medium">Verified Capture</span>
          </div>
        </div>
      </div>
      <button class="px-2.5 py-1.5 rounded-lg bg-white group-hover:bg-stone-900 group-hover:text-white border border-stone-200 text-stone-800 text-[11px] font-medium transition shrink-0 shadow-xs flex items-center gap-1">
        <i class="fa-solid fa-plane-up text-[10px] text-[#C87D55]"></i>
        <span>Fly</span>
      </button>
    `;
    item.addEventListener('click', () => {
      cameraManager.enterInspection(cam.id, true);
    });
    container.appendChild(item);
  });
}
function populateSpatialNodesList(cameraManager) {
  const container = document.getElementById('pins-list-container');
  if (!container) return;
  container.innerHTML = '';

  cameraManager.spatialNodes.forEach((node, idx) => {
    const btn = document.createElement('button');
    btn.className = `spatial-node-item w-full text-left px-3 py-2 rounded-xl text-xs border transition flex items-center justify-between ${
      idx === 0 ? 'active bg-[#235347]/60 border-[#8EB69B] text-[#DAF1DE]' : 'bg-[#0B2B26]/60 hover:bg-[#163832]/60 border-[#8EB69B]/20 text-[#8EB69B] hover:text-[#DAF1DE]'
    }`;
    btn.setAttribute('data-node-code', node.code);
    btn.innerHTML = `
      <div class="flex items-center gap-2 truncate">
        <span class="px-1.5 py-0.5 rounded bg-[#235347]/40 border border-[#8EB69B]/40 text-[#DAF1DE] font-mono text-[10px] font-medium">${node.code}</span>
        <span class="truncate font-medium">${node.title}</span>
      </div>
      <span class="text-[10px] font-mono text-[#DAF1DE] ml-2 font-medium">${node.badge}</span>
    `;
    btn.addEventListener('click', () => {
      cameraManager.selectSpatialNode(node, true);
    });
    container.appendChild(btn);
  });
}

function populateCameraCarousel(cameraManager) {
  const container = document.getElementById('cam-carousel-track');
  if (!container) return;
  container.innerHTML = '';

  const stationFallbacks = {
    'CAM-01': 'Exterior Front Main Entrance - Jumeirah Islands 003 - 20261008130000.jpg.jpeg',
    'CAM-02': 'Exterior Front Side - Jumeirah Islands 003 - 20261008130000.jpg.jpeg',
    'CAM-03': 'Exterior Front Yard - Jumeirah Islands 003 - 20261008130000.jpg.jpeg',
    'CAM-04': 'Exterior Parking - Jumeirah Islands 003 - 20261007180000.jpg.jpeg',
    'CAM-05': 'Exterior Rear Elevation - Jumeirah Islands 003 - 20261008130000.jpg.jpeg',
    'CAM-06': 'Exterior Rear Elevation Shoring - Jumeirah Islands 003 - 20261008130000.jpg.jpeg',
    'CAM-07': 'Exterior Rear Elevation Ramp - Jumeirah Islands 003 - 20261004083000.jpg.jpeg',
    'CAM-08': 'site-pictures/Exterior rear/20261014143000.jpg',
    'CAM-09': 'site-pictures/GF Main Entrance Khutoot Wall/20260925080000.jpg',
    'CAM-17': '20840-1711956940472.jpg',
    'CAM-18': '20840-1748865490206.jpeg',
    'CAM-19': '20840-1748865493553.jpeg'
  };

  const cameras = cameraManager.camerasData || [];
  cameras.forEach((cam) => {
    const defaultFallback = stationFallbacks[cam.id] || (cam.filename ? encodeURI(cam.filename) : '20840-1748865490206.jpeg');
    const card = document.createElement('div');
    card.className = 'carousel-card spatial-card p-2 rounded-xl border border-[#8EB69B]/20 hover:border-[#8EB69B]/60 bg-[#0B2B26]/70 transition cursor-pointer flex-shrink-0';
    card.style.width = '165px';
    card.setAttribute('data-cam-id', cam.id);
    const rawSrc = (typeof cam.filename === 'string') ? cam.filename : defaultFallback;
    const encodedSrc = encodeURI(rawSrc);
    card.innerHTML = `
      <div class="relative w-full h-20 rounded-lg overflow-hidden bg-[#051F20] mb-1.5 border border-[#8EB69B]/20">
        <img src="${encodedSrc}" alt="${cam.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='${defaultFallback}'" />
        <span class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#051F20]/90 font-mono text-[9px] text-[#DAF1DE] font-medium border border-[#8EB69B]/30">${cam.id}</span>
      </div>
      <div class="text-[11px] font-semibold text-white truncate font-display">${cam.title}</div>
      <div class="text-[10px] text-[#8EB69B] font-mono truncate">${cam.date || 'Oct 2026 Site'}</div>
    `;
    card.addEventListener('click', () => {
      cameraManager.enterInspection(cam.id, true);
    });
    container.appendChild(card);
  });
}

function logSDK(msg) {
  const box = document.getElementById('sdkEventStream') || document.getElementById('sdk-console');
  if (!box) return;
  const line = document.createElement('div');
  const time = new Date().toLocaleTimeString();
  line.textContent = `[${time}] ${msg}`;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

function showToast(msg) {
  const banner = document.getElementById('toast-banner');
  const txt = document.getElementById('toast-text');
  if (!banner || !txt) return;
  txt.textContent = msg;
  banner.classList.remove('opacity-0', '-translate-y-3');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    banner.classList.add('opacity-0', '-translate-y-3');
  }, 2600);
}
