/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - MASTER APPLICATION CONTROLLER
 * Developed for ONIX Engineering Consultancy & VH Contracting LLC
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
  scene.background = new THREE.Color(0x060912);

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
      btn.className = match
        ? 'phase-btn bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5'
        : 'phase-btn px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition flex items-center gap-1.5';
    });

    const topBar = document.getElementById('top-progress-bar');
    const topTxt = document.getElementById('top-progress-text');
    const landTxt = document.getElementById('log-landscape-pct');
    const landBar = document.getElementById('log-landscape-bar');

    if (AppState.phase === 'shoring') {
      if (topBar) topBar.style.width = '62%';
      if (topTxt) topTxt.textContent = '62% (Shoring)';
      if (landTxt) landTxt.textContent = '10% (Excavation)';
      if (landBar) landBar.style.width = '10%';
    } else if (AppState.phase === 'site') {
      if (topBar) topBar.style.width = '86.4%';
      if (topTxt) topTxt.textContent = '86.4% (Oct 2026)';
      if (landTxt) landTxt.textContent = '35% (Sand Staging)';
      if (landBar) landBar.style.width = '35%';
    } else {
      if (topBar) topBar.style.width = '100%';
      if (topTxt) topTxt.textContent = '100% (Render)';
      if (landTxt) landTxt.textContent = '100% (Render)';
      if (landBar) landBar.style.width = '100%';
    }

    // 2. Sync Atmosphere
    lightingManager.setAtmosphere(AppState.atmosphere);
    document.querySelectorAll('.env-btn').forEach(btn => {
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
      edgeBtn.innerHTML = `<i class="fa-solid fa-vector-square text-sky-300"></i> <span class="hidden md:inline">CAD Edges: ${AppState.cadEdges ? 'ON' : 'OFF'}</span>`;
      edgeBtn.classList.toggle('active', AppState.cadEdges);
    }

    // 4. Sync Section Cut
    modelBuilder.setSectionCut(AppState.sectionCut);
    const yVal = document.getElementById('val-clip-y');
    const xVal = document.getElementById('val-clip-x');
    if (yVal) yVal.textContent = AppState.sectionCut.y >= 11.8 ? 'Full (12.0m)' : `${AppState.sectionCut.y.toFixed(1)}m`;
    if (xVal) xVal.textContent = AppState.sectionCut.x >= 15.8 ? 'Full (16.0m)' : `${AppState.sectionCut.x.toFixed(1)}m`;

    // 5. Sync Clean HUD UI
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
    setPhase: (phaseKey) => {
      mutateState(s => ({ ...s, phase: phaseKey }), `Phase updated -> ${phaseKey.toUpperCase()}`);
    },
    setCamera: (bookmarkOrId) => {
      if (cameraManager.photoBookmarks[bookmarkOrId]) {
        cameraManager.setPresetView(bookmarkOrId);
        logSDK(`Camera View -> ${bookmarkOrId}`);
      } else {
        cameraManager.enterInspection(bookmarkOrId, false);
      }
    },
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
    setAtmosphere: (modeKey) => {
      mutateState(s => ({ ...s, atmosphere: modeKey }), `Atmosphere -> ${modeKey.toUpperCase()}`);
    },
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
    getState: () => ({ ...AppState })
  };

  window.addEventListener('message', (event) => {
    if (!event.data || typeof event.data !== 'object') return;
    const { action, payload } = event.data;
    if (window.JumeirahTwinAPI[action]) {
      window.JumeirahTwinAPI[action](payload);
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
      showToast(`Phase: ${p === 'render' ? 'ONIX Final Render' : p === 'site' ? '08 Oct 2026 Site State' : 'Superstructure & Shoring'}`);
    });
  });

  // Camera Bookmark buttons
  document.querySelectorAll('.cam-pill, .preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const camKey = btn.getAttribute('data-cam') || btn.getAttribute('data-view');
      if (camKey) {
        window.JumeirahTwinAPI.setCamera(camKey);
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

  // Cinema Drone Tour
  const btnCinemaTour = document.getElementById('btn-cinema-tour');
  if (btnCinemaTour) {
    btnCinemaTour.addEventListener('click', () => {
      cameraManager.toggleCinemaTour();
      showToast(`Cinematic Tour: ${cameraManager.cinemaTourActive ? 'Active' : 'Stopped'}`);
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

  // Populate Spatial IoT Node List in Right Dock
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
    }
  });

  // Handle Window Resize
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Initial State Rendering
  renderAppState();
  cameraManager.selectSpatialNode(cameraManager.spatialNodes[0], false);

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
function populateSpatialNodesList(cameraManager) {
  const container = document.getElementById('pins-list-container');
  if (!container) return;
  container.innerHTML = '';

  cameraManager.spatialNodes.forEach((node, idx) => {
    const btn = document.createElement('button');
    btn.className = `spatial-node-item w-full text-left px-3 py-2 rounded-xl text-xs border transition flex items-center justify-between ${
      idx === 0 ? 'active bg-sky-500/20 border-sky-400 text-white' : 'bg-slate-950/50 hover:bg-slate-900 border-white/5 text-slate-300'
    }`;
    btn.setAttribute('data-node-code', node.code);
    btn.innerHTML = `
      <div class="flex items-center gap-2 truncate">
        <span class="px-1.5 py-0.5 rounded bg-sky-500/20 border border-sky-400/30 text-sky-300 font-mono text-[10px] font-bold">${node.code}</span>
        <span class="truncate font-medium">${node.title}</span>
      </div>
      <span class="text-[10px] font-mono text-emerald-400 ml-2 font-semibold">${node.badge}</span>
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

  const cameras = cameraManager.camerasData || [];
  cameras.forEach((cam) => {
    const card = document.createElement('div');
    card.className = 'carousel-card spatial-card p-2 rounded-xl border border-white/10 hover:border-sky-400/50 transition cursor-pointer flex-shrink-0';
    card.style.width = '165px';
    card.setAttribute('data-cam-id', cam.id);
    card.innerHTML = `
      <div class="relative w-full h-20 rounded-lg overflow-hidden bg-slate-950 mb-1.5">
        <img src="${cam.filename}" alt="${cam.title}" class="w-full h-full object-cover" loading="lazy" />
        <span class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-slate-950/80 font-mono text-[9px] text-sky-300 font-bold border border-white/10">${cam.id}</span>
      </div>
      <div class="text-[11px] font-bold text-white truncate">${cam.title}</div>
      <div class="text-[10px] text-slate-400 font-mono truncate">${cam.date || 'Oct 2026 Site'}</div>
    `;
    card.addEventListener('click', () => {
      cameraManager.enterInspection(cam.id, true);
    });
    container.appendChild(card);
  });
}

function logSDK(msg) {
  const box = document.getElementById('sdk-console');
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
