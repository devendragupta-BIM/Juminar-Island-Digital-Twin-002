/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - MAIN APPLICATION CONTROLLER
 * Integrates 3D Viewport, Camera Raycaster, Solar Simulator, BIM Layers, and UI Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Three.js Scene, Camera & WebGL Renderer
  const canvas = document.getElementById('twin-canvas');
  const container = document.getElementById('viewport-3d-wrapper');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070c);
  scene.fog = new THREE.FogExp2(0x05070c, 0.006);

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.5,
    1000
  );
  // Initial starting vantage point (Elevated Front Isometric View)
  camera.position.set(-24, 18, 38);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // 2. Setup OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going below ground
  controls.minDistance = 3.0;
  controls.maxDistance = 180.0;
  controls.target.set(0, 5, 0);
  controls.update();

  // 3. Initialize Model, Lighting, Camera, and Measurement Managers
  const modelBuilder = new VillaModelBuilder(scene);
  modelBuilder.buildAll();

  const lightingManager = new LightingManager(scene, renderer);
  const cameraManager = new CameraManager(scene, camera, controls, renderer.domElement);
  const measurementTool = new MeasurementTool(scene, camera, renderer.domElement);

  // 4. Populate Sidebar and Bottom Carousel UI from SITE_DATA
  populateCameraUI(cameraManager);

  // 5. Setup UI Event Listeners
  setupDashboardControls(lightingManager, modelBuilder, cameraManager);

  // 6. Handle Window Resize
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // 7. Render Animation Loop
  const compassNeedle = document.getElementById('compass-needle');

  function animate(time) {
    requestAnimationFrame(animate);

    // Update Tween animations
    if (typeof TWEEN !== 'undefined') {
      TWEEN.update();
    }

    // Update camera controls
    controls.update();

    // Update pulsing camera markers
    cameraManager.update(time);

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
// UI POPULATION: CAMERA LIST & BOTTOM CAROUSEL
// ----------------------------------------------------
function populateCameraUI(cameraManager) {
  const cameras = window.SITE_DATA.cameras;
  const listContainer = document.getElementById('camera-list-container');
  const carouselTrack = document.getElementById('cam-carousel-track');

  if (!listContainer || !carouselTrack) return;

  listContainer.innerHTML = '';
  carouselTrack.innerHTML = '';

  cameras.forEach((cam, idx) => {
    const isBim = cam.category === 'bim-render';
    const tagText = isBim ? 'BIM Render' : cam.category === 'exterior-front' ? 'Front Facade' : 'Rear / Pool';
    const imgSrc = encodeURI(cam.filename);

    // 1. Sidebar Card Item
    const card = document.createElement('div');
    card.className = `camera-card-item ${idx === 0 ? 'active' : ''}`;
    card.setAttribute('data-cam-id', cam.id);
    card.setAttribute('data-category', cam.category);

    card.innerHTML = `
      <div class="cam-thumb-wrapper">
        <img class="cam-thumb-img" src="${imgSrc}" alt="${cam.title}" loading="lazy" />
        <span class="cam-pill-tag">${cam.id}</span>
      </div>
      <div class="cam-card-info">
        <div class="cam-card-title">${cam.title}</div>
        <div class="cam-card-meta">
          <span><i class="fa-solid fa-compass"></i> ${cam.azimuth.split(' ')[0]}</span>
          <span><i class="fa-solid fa-arrows-up-down"></i> ${cam.height.split(' ')[0]}</span>
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
      <span class="carousel-cam-tag">${cam.id}</span>
      <img src="${imgSrc}" alt="${cam.title}" loading="lazy" />
      <div class="carousel-thumb-label">${cam.title}</div>
    `;

    thumb.addEventListener('click', () => {
      cameraManager.selectCamera(cam.id, true);
    });

    carouselTrack.appendChild(thumb);
  });

  // Carousel Arrow buttons
  document.getElementById('btn-prev-cam')?.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: -260, behavior: 'smooth' });
  });

  document.getElementById('btn-next-cam')?.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: 260, behavior: 'smooth' });
  });
}

// ----------------------------------------------------
// UI DASHBOARD CONTROLS & EVENT BINDINGS
// ----------------------------------------------------
function setupDashboardControls(lightingManager, modelBuilder, cameraManager) {
  // 1. Environment Mode Buttons (Day / Sunset / Night / Wireframe)
  document.querySelectorAll('.env-btn[data-env]').forEach(btn => {
    btn.addEventListener('click', () => {
      const env = btn.getAttribute('data-env');
      document.querySelectorAll('.env-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (env === 'wireframe') {
        modelBuilder.setWireframeMode(true);
        lightingManager.setEnvironmentPreset('wireframe');
      } else {
        modelBuilder.setWireframeMode(false);
        lightingManager.setEnvironmentPreset(env);
      }
    });
  });

  // 2. Solar Study Slider
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

  // 3. BIM Layer Toggles
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

  // 4. Floor Level Isolation Buttons
  document.querySelectorAll('button[data-floor]').forEach(btn => {
    btn.addEventListener('click', () => {
      const floor = btn.getAttribute('data-floor');
      document.querySelectorAll('button[data-floor]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      modelBuilder.isolateFloor(floor);
    });
  });

  // 5. Camera Category Filter Chips
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

  // 6. Right Sidebar Collapse Toggle
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

  // 7. Clean HUD Toggle (Fullscreen)
  const toggleUiBtn = document.getElementById('btn-toggle-ui');
  toggleUiBtn?.addEventListener('click', () => {
    const sidebars = document.querySelectorAll('.sidebar, #bottom-camera-bar, #viewcube-widget');
    sidebars.forEach(s => s.classList.toggle('hidden'));
  });

  // 8. Welcome Toast Dismiss
  const toastClose = document.getElementById('toast-close-btn');
  const toast = document.getElementById('welcome-toast');
  toastClose?.addEventListener('click', () => {
    toast?.classList.add('hidden');
  });

  setTimeout(() => {
    toast?.classList.add('hidden');
  }, 10000);
}
