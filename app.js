/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - MAIN APPLICATION CONTROLLER
 * Integrates 3D Viewport, Camera Raycaster, Solar Simulator, BIM Layers,
 * Tactical 2D Site Minimap Radar, Exploded BIM Views, and Screenshot Capture.
 * Exposes window.JumeirahTwinAPI and handles iframe postMessage communication.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Three.js Scene, Camera & WebGL Renderer
  const canvas = document.getElementById('twin-canvas');
  const container = document.getElementById('viewport-3d-wrapper');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070c);
  scene.fog = new THREE.FogExp2(0x05070c, 0.0055);

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.5,
    1000
  );
  // Initial starting vantage point (Elevated Front Isometric View)
  camera.position.set(-26, 20, 42);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    preserveDrawingBuffer: true, // Needed for high-res screenshot capture
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  // 2. Setup OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going below ground
  controls.minDistance = 3.0;
  controls.maxDistance = 190.0;
  controls.target.set(0, 5, 0);
  controls.update();

  // 3. Initialize Model, Lighting, Camera, Minimap and Measurement Managers
  const modelBuilder = new VillaModelBuilder(scene);
  modelBuilder.buildAll();

  const lightingManager = new LightingManager(scene, renderer);
  const cameraManager = new CameraManager(scene, camera, controls, renderer.domElement, lightingManager, modelBuilder);
  const measurementTool = new MeasurementTool(scene, camera, renderer.domElement);
  const minimap = new SiteMinimap('minimap-canvas', camera, controls, cameraManager);

  // 4. Expose window.JumeirahTwinAPI for External Control & iframe PostMessage
  initJumeirahTwinAPI(modelBuilder, cameraManager, lightingManager);

  // 5. Populate Sidebar and Bottom Carousel UI from SITE_DATA
  populateCameraUI(cameraManager);

  // 6. Setup UI Event Listeners
  setupDashboardControls(lightingManager, modelBuilder, cameraManager, measurementTool, renderer, scene, camera);

  // 7. Handle Window Resize
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // 8. Render Animation Loop
  const compassNeedle = document.getElementById('compass-needle');

  function animate(time) {
    requestAnimationFrame(animate);

    // Update Tween animations
    if (typeof TWEEN !== 'undefined') {
      TWEEN.update();
    }

    // Update camera controls
    controls.update();

    // Update pulsing camera markers & water ripple offsets
    cameraManager.update(time);
    modelBuilder.update(time);

    // Draw real-time 2D Minimap Radar
    if (minimap) {
      minimap.draw();
    }

    // Update Compass needle based on camera azimuth
    if (compassNeedle) {
      const angle = controls.getAzimuthalAngle();
      compassNeedle.style.transform = `rotate(${-angle * (180 / Math.PI)}deg)`;
    }

    renderer.render(scene, camera);
  }

  animate(0);
});

// ----------------------------------------------------
// PUBLIC API: window.JumeirahTwinAPI & POSTMESSAGE
// ----------------------------------------------------
function initJumeirahTwinAPI(modelBuilder, cameraManager, lightingManager) {
  window.JumeirahTwinAPI = {
    // 1. Switch between 'render' (Finished ONIX) and 'site' (Oct 2026 Construction)
    setSiteState: (state) => {
      const s = state === 'render' ? 'render' : 'site';
      modelBuilder.setSiteState(s);

      // Sync Header Toggle Buttons
      document.getElementById('btn-state-site')?.classList.toggle('active', s === 'site');
      document.getElementById('btn-state-render')?.classList.toggle('active', s === 'render');

      // Sync Sidebar Widget Buttons
      document.getElementById('widget-state-site')?.classList.toggle('active', s === 'site');
      document.getElementById('widget-state-render')?.classList.toggle('active', s === 'render');

      // Sync Sidebar Text Badge
      const badge = document.getElementById('current-state-badge');
      if (badge) {
        badge.innerText = s === 'render' ? 'Finished Design' : 'Oct 2026 Site';
      }

      // Notify parent frame if embedded
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'TWIN_STATE_CHANGED',
          state: s
        }, '*');
      }
    },

    // 2. Smoothly fly camera: 'frontRender' | 'rearPool' | 'rearShoring' | 'frontYardTop' | 'carport'
    setCameraView: (view) => {
      switch (view) {
        case 'frontRender':
          cameraManager.flyTo({ x: -22.0, y: 5.5, z: 25.0 }, { x: 2.0, y: 6.5, z: 0.0 }, 70, 1200);
          break;
        case 'rearPool':
          cameraManager.flyTo({ x: 0.0, y: 4.0, z: -34.0 }, { x: 0.0, y: 7.5, z: 0.0 }, 75, 1200);
          break;
        case 'rearShoring':
          cameraManager.flyTo({ x: -28.0, y: 8.5, z: -34.0 }, { x: 4.0, y: 6.5, z: -2.0 }, 80, 1200);
          break;
        case 'frontYardTop':
          cameraManager.flyTo({ x: 0.0, y: 15.0, z: 14.0 }, { x: 0.0, y: 0.5, z: 26.0 }, 85, 1200);
          break;
        case 'carport':
          cameraManager.flyTo({ x: 22.0, y: 6.0, z: 26.0 }, { x: -4.0, y: 5.5, z: 0.0 }, 78, 1200);
          break;
        case 'front':
        case 'rear':
        case 'aerial':
        case 'entry':
        case 'lake':
        case 'orbit':
          cameraManager.setPresetView(view);
          break;
        default:
          console.warn(`[JumeirahTwinAPI] Unknown camera view preset: '${view}'`);
          break;
      }

      // Sync active state on preset buttons if matching
      document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-view') === view);
      });
    },

    // 3. Set Lighting Mode: 'day' | 'dusk' | 'night' | 'wireframe'
    setEnvironment: (env) => {
      const envKey = env === 'dusk' ? 'sunset' : env;
      if (envKey === 'wireframe') {
        modelBuilder.setWireframeMode(true);
        lightingManager.setEnvironmentPreset('wireframe');
      } else {
        modelBuilder.setWireframeMode(false);
        lightingManager.setEnvironmentPreset(envKey);
      }

      // Sync active UI buttons
      document.querySelectorAll('.env-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-env') === envKey);
      });
    },

    // 4. Exploded Axonometric BIM Toggle
    explodeBIM: (enable) => {
      modelBuilder.setExplodeBIM(enable);
      document.getElementById('btn-explode-bim')?.classList.toggle('active', enable);
    },

    // 5. Select Camera Station by ID
    selectCamera: (camId) => {
      cameraManager.selectCamera(camId, true);
    },

    // 6. Query Current State
    getState: () => ({
      siteState: modelBuilder.siteState,
      environment: lightingManager.currentEnv,
      activeCamera: cameraManager.activeCameraId,
      isExploded: modelBuilder.isExploded
    })
  };

  // Listen for iframe postMessage from parent dashboard (React / Next.js / Vue)
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TWIN_COMMAND') {
      const { action, payload } = event.data;
      if (action === 'SET_STATE') {
        window.JumeirahTwinAPI.setSiteState(payload);
      } else if (action === 'SET_VIEW' || action === 'SET_CAMERA') {
        window.JumeirahTwinAPI.setCameraView(payload);
      } else if (action === 'SET_ENVIRONMENT') {
        window.JumeirahTwinAPI.setEnvironment(payload);
      } else if (action === 'EXPLODE_BIM') {
        window.JumeirahTwinAPI.explodeBIM(payload);
      } else if (action === 'SELECT_CAMERA') {
        window.JumeirahTwinAPI.selectCamera(payload);
      }
    }
  });

  console.log('[JumeirahTwinAPI] Loaded and ready for programmatic & iframe postMessage commands.');
}

// ----------------------------------------------------
// UI POPULATION: CAMERA LIST & BOTTOM CAROUSEL
// ----------------------------------------------------
function populateCameraUI(cameraManager) {
  const cameras = window.SITE_DATA.cameras;
  const listContainer = document.getElementById('camera-list-container');
  const carouselTrack = document.getElementById('cam-carousel-track');
  const badgeCount = document.getElementById('camera-count-badge');

  if (!listContainer || !carouselTrack) return;

  listContainer.innerHTML = '';
  carouselTrack.innerHTML = '';
  if (badgeCount) badgeCount.innerText = `${cameras.length} Stations`;

  cameras.forEach((cam, idx) => {
    let pillClass = 'cat-pill-front';

    if (cam.category === 'bim-render') {
      pillClass = 'cat-pill-bim';
    } else if (cam.category === 'exterior-front') {
      pillClass = 'cat-pill-front';
    } else if (cam.category === 'exterior-rear') {
      pillClass = 'cat-pill-rear';
    } else if (cam.category === 'interior-gf') {
      pillClass = 'cat-pill-gf';
    } else if (cam.category === 'interior-ff') {
      pillClass = 'cat-pill-ff';
    } else if (cam.category === 'interior-lg') {
      pillClass = 'cat-pill-lg';
    }

    const frameCount = cam.timelapseFrames?.length || 1;
    const imgSrc = encodeURI(cam.filename);

    // 1. Sidebar Card Item
    const card = document.createElement('div');
    card.className = `camera-card-item ${idx === 0 ? 'active' : ''}`;
    card.setAttribute('data-cam-id', cam.id);
    card.setAttribute('data-category', cam.category);

    card.innerHTML = `
      <div class="cam-thumb-wrapper">
        <img class="cam-thumb-img" src="${imgSrc}" alt="${cam.title}" loading="lazy" />
        <span class="cam-pill-tag ${pillClass}">${cam.id}</span>
      </div>
      <div class="cam-card-info">
        <div class="cam-card-title">${cam.title}</div>
        <div class="cam-card-meta">
          <span><i class="fa-solid fa-compass"></i> ${cam.azimuth.split(' ')[0]}</span>
          <span><i class="fa-solid fa-arrows-up-down"></i> ${cam.height.split(' ')[0]}</span>
          <span><i class="fa-solid fa-images"></i> ${frameCount} frames</span>
        </div>
        <div class="cam-card-date">${cam.date.split('•')[0]}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      cameraManager.selectCamera(cam.id, true);
    });

    listContainer.appendChild(card);

    // 2. Bottom Carousel Thumbnail Item
    const thumb = document.createElement('div');
    thumb.className = `carousel-thumb-item ${idx === 0 ? 'active' : ''}`;
    thumb.setAttribute('data-cam-id', cam.id);
    thumb.setAttribute('data-category', cam.category);

    thumb.innerHTML = `
      <span class="carousel-cam-tag ${pillClass}">${cam.id}</span>
      <img src="${imgSrc}" alt="${cam.title}" loading="lazy" />
      <div class="carousel-thumb-label">${cam.title}</div>
      <div class="carousel-thumb-badge">${frameCount} frames</div>
    `;

    thumb.addEventListener('click', () => {
      cameraManager.selectCamera(cam.id, true);
    });

    carouselTrack.appendChild(thumb);
  });

  // Carousel Arrow buttons
  document.getElementById('btn-prev-cam')?.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: -280, behavior: 'smooth' });
  });

  document.getElementById('btn-next-cam')?.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: 280, behavior: 'smooth' });
  });
}

// ----------------------------------------------------
// UI DASHBOARD CONTROLS & EVENT BINDINGS
// ----------------------------------------------------
function setupDashboardControls(lightingManager, modelBuilder, cameraManager, measurementTool, renderer, scene, camera) {
  // 1. Dual-State Switcher Buttons (Top Header & Sidebar Widget)
  const btnSiteHeader = document.getElementById('btn-state-site');
  const btnRenderHeader = document.getElementById('btn-state-render');
  const widgetSite = document.getElementById('widget-state-site');
  const widgetRender = document.getElementById('widget-state-render');

  btnSiteHeader?.addEventListener('click', () => window.JumeirahTwinAPI.setSiteState('site'));
  btnRenderHeader?.addEventListener('click', () => window.JumeirahTwinAPI.setSiteState('render'));
  widgetSite?.addEventListener('click', () => window.JumeirahTwinAPI.setSiteState('site'));
  widgetRender?.addEventListener('click', () => window.JumeirahTwinAPI.setSiteState('render'));

  // 2. Environment Mode Buttons (Day / Sunset / Night / Wireframe)
  const envButtons = document.querySelectorAll('.env-btn[data-env]');
  envButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const env = btn.getAttribute('data-env');
      window.JumeirahTwinAPI.setEnvironment(env);
    });
  });

  // 3. Solar Study Slider
  const solarSlider = document.getElementById('solar-slider');
  const sunTimeDisplay = document.getElementById('sun-time-display');

  solarSlider?.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    const hour = Math.floor(val);
    const min = Math.round((val - hour) * 60);
    const minStr = min < 10 ? `0${min}` : min;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);

    if (sunTimeDisplay) {
      sunTimeDisplay.innerText = `${hour < 10 ? '0' : ''}${hour}:${minStr} (${displayHour}:${minStr} ${ampm})`;
    }

    lightingManager.setTimeOfDay(val);
  });

  // 4. BIM Layer Toggles
  const layers = [
    { id: 'layer-arch', name: 'arch' },
    { id: 'layer-pool', name: 'pool' },
    { id: 'layer-landscape', name: 'landscape' },
    { id: 'layer-cameras', name: 'cameras' },
    { id: 'layer-construction', name: 'construction' },
    { id: 'layer-vehicles', name: 'vehicles' },
    { id: 'layer-grid', name: 'grid' }
  ];

  layers.forEach(l => {
    const chk = document.getElementById(l.id);
    chk?.addEventListener('change', (e) => {
      if (l.name === 'cameras') {
        cameraManager.cameraGroup.visible = e.target.checked;
      } else {
        modelBuilder.setLayerVisibility(l.name, e.target.checked);
      }
    });
  });

  // 5. Floor Level Isolation Buttons
  document.querySelectorAll('button[data-floor]').forEach(btn => {
    btn.addEventListener('click', () => {
      const floor = btn.getAttribute('data-floor');
      document.querySelectorAll('button[data-floor]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      modelBuilder.isolateFloor(floor);
    });
  });

  // 6. Exploded BIM Toggle Button
  const btnExplode = document.getElementById('btn-explode-bim');
  btnExplode?.addEventListener('click', () => {
    const nextState = !modelBuilder.isExploded;
    window.JumeirahTwinAPI.explodeBIM(nextState);
    if (nextState) {
      btnExplode.innerHTML = '<i class="fa-solid fa-compress"></i> <span>Collapse BIM</span>';
    } else {
      btnExplode.innerHTML = '<i class="fa-solid fa-layer-group"></i> <span>Explode BIM</span>';
    }
  });

  // 7. Camera Category Filter Chips
  document.querySelectorAll('.filter-chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter');
      document.querySelectorAll('.filter-chip[data-filter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      document.querySelectorAll('.camera-card-item, .carousel-thumb-item').forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 8. Viewport High-Res Screenshot Capture
  const btnScreenshot = document.getElementById('btn-screenshot');
  btnScreenshot?.addEventListener('click', () => {
    renderer.render(scene, camera);
    const dataURL = renderer.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `Jumeirah-Islands-Villa-003-Digital-Twin-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // 9. Keyboard Shortcuts Modal Toggle
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const btnShortcuts = document.getElementById('btn-shortcuts');
  const btnCloseShortcuts = document.getElementById('shortcuts-close-btn');

  btnShortcuts?.addEventListener('click', () => {
    shortcutsModal?.classList.remove('hidden');
  });

  btnCloseShortcuts?.addEventListener('click', () => {
    shortcutsModal?.classList.add('hidden');
  });

  // 10. Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case '1':
        cameraManager.setPresetView('front');
        break;
      case '2':
        cameraManager.setPresetView('rear');
        break;
      case '3':
        cameraManager.setPresetView('aerial');
        break;
      case '4':
        cameraManager.setPresetView('entry');
        break;
      case '5':
        cameraManager.setPresetView('lake');
        break;
      case ' ':
        e.preventDefault();
        cameraManager.setPresetView('orbit');
        break;
      case 'c':
      case 'C':
        const chkCam = document.getElementById('layer-cameras');
        if (chkCam) {
          chkCam.checked = !chkCam.checked;
          cameraManager.cameraGroup.visible = chkCam.checked;
        }
        break;
      case 'm':
      case 'M':
        measurementTool.toggleMode();
        break;
      case 'e':
      case 'E':
        btnExplode?.click();
        break;
      case 'h':
      case 'H':
        document.getElementById('btn-toggle-ui')?.click();
        break;
      case 'p':
      case 'P':
        btnScreenshot?.click();
        break;
      case '?':
        shortcutsModal?.classList.toggle('hidden');
        break;
      case 'Escape':
        document.getElementById('camera-modal')?.classList.add('hidden');
        shortcutsModal?.classList.add('hidden');
        measurementTool.toggleMode(false);
        break;
    }
  });

  // 11. Right Sidebar Collapse Toggle
  const rightSidebar = document.getElementById('sidebar-right');
  const collapseBtn = document.getElementById('collapse-right-btn');
  collapseBtn?.addEventListener('click', () => {
    rightSidebar.classList.toggle('collapsed');
    const icon = collapseBtn.querySelector('i');
    if (rightSidebar.classList.contains('collapsed')) {
      icon.className = 'fa-solid fa-chevron-left';
    } else {
      icon.className = 'fa-solid fa-chevron-right';
    }
  });

  // 12. Clean HUD Toggle (Fullscreen)
  const toggleUiBtn = document.getElementById('btn-toggle-ui');
  toggleUiBtn?.addEventListener('click', () => {
    const sidebars = document.querySelectorAll('.sidebar, #bottom-camera-bar, #viewcube-widget, #minimap-widget');
    sidebars.forEach(s => s.classList.toggle('hidden'));
  });

  // 13. Welcome Toast Dismiss
  const toastClose = document.getElementById('toast-close-btn');
  const toast = document.getElementById('welcome-toast');
  toastClose?.addEventListener('click', () => {
    toast?.classList.add('hidden');
  });

  setTimeout(() => {
    toast?.classList.add('hidden');
  }, 10000);
}
