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
  scene.background = new THREE.Color(0x051F20);

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

  // Expose subsystem engines to window for global access, inline handlers & parent integrations
  window.cameraManager = cameraManager;
  window.modelBuilder = modelBuilder;
  window.lightingManager = lightingManager;
  window.measurementTool = measurementTool;
  window.minimap = minimap;

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
        ? 'phase-btn bg-gradient-to-r from-[#235347] to-[#163832] text-[#DAF1DE] border border-[#8EB69B] shadow-lg shadow-[#051F20]/50 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5'
        : 'phase-btn px-3 py-1.5 rounded-lg text-xs font-medium text-[#8EB69B] hover:text-[#DAF1DE] transition flex items-center gap-1.5';
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
    if (lightingManager && typeof lightingManager.setAtmosphere === 'function') {
      lightingManager.setAtmosphere(AppState.atmosphere);
    } else if (lightingManager && typeof lightingManager.setEnvironmentPreset === 'function') {
      lightingManager.setEnvironmentPreset(AppState.atmosphere);
    }
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
    } else if (actionUpper === 'EXPLODE_BIM' || actionLower === 'explodebim') {
      window.JumeirahTwinAPI.explodeBIM(payload);
    } else if (actionUpper === 'SELECT_CAMERA' || actionLower === 'selectcamera') {
      window.JumeirahTwinAPI.selectCamera(payload);
    } else if (actionUpper === 'TOGGLE_CAD' || actionLower === 'togglecad') {
      window.JumeirahTwinAPI.toggleCAD(payload);
    } else if (actionUpper === 'TOGGLE_PINS' || actionLower === 'togglepins') {
      window.JumeirahTwinAPI.togglePins(payload);
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
    'CAM-08': 'Exterior Rear Elevation - Jumeirah Islands 003 - 20261008130000.jpg.jpeg',
    'CAM-09': 'Exterior Front Main Entrance - Jumeirah Islands 003 - 20261008130000.jpg.jpeg',
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
