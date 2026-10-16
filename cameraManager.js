/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - CAMERA SYSTEM & 3D MARKER MANAGER
 * Places sleek color-coded 3D camera pins, handles smooth transitions, raycasting,
 * interactive curtain wipe comparison, and 16-station timelapse player with 460+ site captures.
 */

class CameraManager {
  constructor(scene, mainCamera, controls, domElement, lightingManager, modelBuilder) {
    this.scene = scene;
    this.mainCamera = mainCamera;
    this.controls = controls;
    this.domElement = domElement;
    this.lightingManager = lightingManager;
    this.modelBuilder = modelBuilder;

    this.camerasData = window.SITE_DATA.cameras;
    this.cameraMarkers = [];
    this.cameraGroup = new THREE.Group();
    this.scene.add(this.cameraGroup);

    this.activeCameraId = null;
    this.activeCamData = null;
    this.currentFrameIndex = 0;
    this.isPlayingTimelapse = false;
    this.timelapseTimer = null;
    this.timelapseSpeed = 1; // 1x = 400ms, 2x = 200ms, 4x = 100ms

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.initCameraMarkers();
    this.initEventListeners();
    this.initModalControls();
  }

  // Color scheme by category
  getCategoryColor(category) {
    switch (category) {
      case 'bim-render':
        return { color: 0xe2ba52, emissive: 0x78350f, led: 0xfef08a, label: 'BIM Design' };
      case 'exterior-front':
        return { color: 0x38bdf8, emissive: 0x0284c7, led: 0xbae6fd, label: 'Front Facade' };
      case 'exterior-rear':
        return { color: 0x34d399, emissive: 0x059669, led: 0xa7f3d0, label: 'Rear & Pool' };
      case 'interior-gf':
        return { color: 0xa855f7, emissive: 0x7e22ce, led: 0xe9d5ff, label: 'Ground Floor' };
      case 'interior-ff':
        return { color: 0xf43f5e, emissive: 0xbe123c, led: 0xfecdd3, label: 'First Floor' };
      case 'interior-lg':
        return { color: 0x14b8a6, emissive: 0x0f766e, led: 0x99f6e4, label: 'Lower Ground' };
      default:
        return { color: 0x38bdf8, emissive: 0x0284c7, led: 0xbae6fd, label: 'Site View' };
    }
  }

  // ----------------------------------------------------
  // 1. CREATE COLOR-CODED 3D CAMERA PINS & FRUSTUMS
  // ----------------------------------------------------
  initCameraMarkers() {
    this.camerasData.forEach((cam, idx) => {
      const markerRoot = new THREE.Group();
      markerRoot.position.set(cam.position.x, cam.position.y, cam.position.z);
      markerRoot.userData = { cameraData: cam, index: idx };

      const cTheme = this.getCategoryColor(cam.category);

      // 1. Sleek Frosted Glass Camera Housing
      const baseGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.28, 20);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: cTheme.color,
        metalness: 0.85,
        roughness: 0.12,
        emissive: cTheme.emissive,
        emissiveIntensity: 0.4,
        transmission: 0.35,
        reflectivity: 0.95
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.rotation.x = Math.PI / 2;
      markerRoot.add(baseMesh);

      // Lens Ring & Optic Glass
      const lensGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.32, 16);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x03060f, metalness: 0.98, roughness: 0.05 });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.position.z = 0.2;
      lensMesh.rotation.x = Math.PI / 2;
      markerRoot.add(lensMesh);

      // Glowing Center LED Point
      const ledGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: cTheme.led });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.z = 0.36;
      markerRoot.add(ledMesh);

      // 2. Translucent Field-of-View Cone (Viewing Frustum)
      const fovRad = (cam.fov || 75) * (Math.PI / 180);
      const coneLength = 5.2;
      const coneRadius = Math.tan(fovRad / 2) * coneLength;

      const coneGeo = new THREE.ConeGeometry(coneRadius, coneLength, 16, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: cTheme.color,
        transparent: true,
        opacity: 0.14,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const coneMesh = new THREE.Mesh(coneGeo, coneMat);
      coneMesh.rotation.x = -Math.PI / 2;
      coneMesh.position.z = coneLength / 2 + 0.3;
      markerRoot.add(coneMesh);

      // 3. Ground Radar Beacon Ring
      const ringGeo = new THREE.RingGeometry(0.55, 0.8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cTheme.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = -0.48;
      markerRoot.add(ringMesh);
      markerRoot.userData.beaconRing = ringMesh;

      // 4. Look towards Target Point
      markerRoot.lookAt(cam.target.x, cam.target.y, cam.target.z);

      // 5. Hit Sphere for Click Detection
      const hitGeo = new THREE.SphereGeometry(2.2, 10, 10);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitSphere = new THREE.Mesh(hitGeo, hitMat);
      hitSphere.userData = { parentMarker: markerRoot };
      markerRoot.add(hitSphere);

      this.cameraGroup.add(markerRoot);
      this.cameraMarkers.push(markerRoot);
    });
  }

  // ----------------------------------------------------
  // 2. RAYCASTING & MOUSE INTERACTION
  // ----------------------------------------------------
  initEventListeners() {
    this.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.domElement.addEventListener('click', (e) => this.onClick(e));

    // Preset Views
    document.querySelectorAll('.preset-btn[data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        this.setPresetView(view);
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  onMouseMove(e) {
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.mainCamera);
    const intersects = this.raycaster.intersectObjects(this.cameraMarkers, true);

    const tooltip = document.getElementById('cam-hover-tooltip');

    if (intersects.length > 0) {
      let obj = intersects[0].object;
      while (obj && !obj.userData.cameraData && obj.parent) {
        obj = obj.parent;
      }

      if (obj && obj.userData.cameraData) {
        this.domElement.style.cursor = 'pointer';
        const cam = obj.userData.cameraData;

        if (tooltip) {
          document.getElementById('tooltip-cam-id').innerText = cam.id;
          document.getElementById('tooltip-cam-title').innerText = cam.title;
          const frameCount = cam.timelapseFrames ? `${cam.timelapseFrames.length} frames` : '1 capture';
          document.getElementById('tooltip-cam-time').innerText = `${cam.date} • ${frameCount}`;
          tooltip.style.left = `${e.clientX}px`;
          tooltip.style.top = `${e.clientY}px`;
          tooltip.classList.remove('hidden');
        }
        return;
      }
    }

    this.domElement.style.cursor = 'grab';
    if (tooltip) tooltip.classList.add('hidden');
  }

  onClick(e) {
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.mainCamera);
    const intersects = this.raycaster.intersectObjects(this.cameraMarkers, true);

    if (intersects.length > 0) {
      let obj = intersects[0].object;
      while (obj && !obj.userData.cameraData && obj.parent) {
        obj = obj.parent;
      }

      if (obj && obj.userData.cameraData) {
        const cam = obj.userData.cameraData;
        this.selectCamera(cam.id, true);
      }
    }
  }

  // ----------------------------------------------------
  // 3. SELECT CAMERA, ISOLATE FLOOR IF INTERIOR & FLY
  // ----------------------------------------------------
  selectCamera(camId, openModal = true) {
    const cam = this.camerasData.find(c => c.id === camId);
    if (!cam) return;

    this.activeCameraId = camId;
    this.activeCamData = cam;
    this.currentFrameIndex = Math.floor((cam.timelapseFrames?.length || 1) / 2);

    // If interior camera, ensure the floor is properly visible
    if (this.modelBuilder) {
      if (cam.category === 'interior-gf') {
        this.modelBuilder.isolateFloor('ground');
      } else if (cam.category === 'interior-ff') {
        this.modelBuilder.isolateFloor('first');
      } else if (cam.category === 'interior-lg') {
        this.modelBuilder.isolateFloor('basement');
      } else {
        this.modelBuilder.isolateFloor('all');
      }
    }

    // Scale selected marker ring
    this.cameraMarkers.forEach(m => {
      const isSelected = m.userData.cameraData.id === camId;
      if (m.userData.beaconRing) {
        m.userData.beaconRing.scale.set(isSelected ? 2.5 : 1.0, isSelected ? 2.5 : 1.0, 1.0);
      }
    });

    // Sync sidebar & bottom carousel active state
    document.querySelectorAll('.camera-card-item, .carousel-thumb-item').forEach(el => {
      if (el.getAttribute('data-cam-id') === camId) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        el.classList.remove('active');
      }
    });

    // Smoothly fly camera to vantage point
    this.flyTo(cam.position, cam.target, cam.fov || 75, 1200);

    if (openModal) {
      this.openPhotoModal(cam);
    }
  }

  flyTo(targetPos, targetLookAt, targetFov = 75, duration = 1200) {
    if (typeof TWEEN === 'undefined') return;

    new TWEEN.Tween(this.mainCamera.position)
      .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z }, duration)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(this.controls.target)
      .to({ x: targetLookAt.x, y: targetLookAt.y, z: targetLookAt.z }, duration)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => this.controls.update())
      .start();

    new TWEEN.Tween(this.mainCamera)
      .to({ fov: targetFov }, duration)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => this.mainCamera.updateProjectionMatrix())
      .start();
  }

  setPresetView(preset) {
    if (this.modelBuilder) this.modelBuilder.isolateFloor('all');

    switch (preset) {
      case 'front':
        this.flyTo({ x: 0, y: 7, z: 35 }, { x: 0, y: 5, z: 0 }, 65, 1000);
        break;
      case 'rear':
        this.flyTo({ x: 0, y: 6, z: -38 }, { x: 0, y: 6, z: 0 }, 65, 1000);
        break;
      case 'aerial':
        this.flyTo({ x: 35, y: 45, z: 35 }, { x: 0, y: 2, z: 0 }, 60, 1200);
        break;
      case 'entry':
        this.flyTo({ x: -2, y: 3.5, z: 22 }, { x: -1, y: 4, z: 6 }, 75, 1000);
        break;
      case 'lake':
        this.flyTo({ x: -38, y: 8, z: -40 }, { x: 0, y: 4, z: -10 }, 70, 1000);
        break;
      case 'orbit':
        this.controls.autoRotate = !this.controls.autoRotate;
        const btn = document.getElementById('auto-orbit-toggle');
        if (btn) btn.classList.toggle('active', this.controls.autoRotate);
        break;
    }
  }

  // ----------------------------------------------------
  // 4. PHOTO INSPECTION MODAL & TIMELAPSE PLAYER
  // ----------------------------------------------------
  initModalControls() {
    const modal = document.getElementById('camera-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        this.stopTimelapse();
        modal.classList.add('hidden');
      });
    }

    const btnPhoto = document.getElementById('btn-mode-photo');
    const btnSplit = document.getElementById('btn-mode-split');
    const btnOverlay = document.getElementById('btn-mode-overlay');

    const viewPhoto = document.getElementById('single-photo-view');
    const viewSplit = document.getElementById('split-photo-view');
    const viewOverlay = document.getElementById('overlay-photo-view');

    const setMode = (mode) => {
      [btnPhoto, btnSplit, btnOverlay].forEach(b => b?.classList.remove('active'));
      [viewPhoto, viewSplit, viewOverlay].forEach(v => v?.classList.add('hidden'));

      if (mode === 'photo') {
        btnPhoto?.classList.add('active');
        viewPhoto?.classList.remove('hidden');
      } else if (mode === 'split') {
        btnSplit?.classList.add('active');
        viewSplit?.classList.remove('hidden');
      } else if (mode === 'overlay') {
        btnOverlay?.classList.add('active');
        viewOverlay?.classList.remove('hidden');
      }
    };

    btnPhoto?.addEventListener('click', () => setMode('photo'));
    btnSplit?.addEventListener('click', () => setMode('split'));
    btnOverlay?.addEventListener('click', () => setMode('overlay'));

    // Zoom & Pan controls for Single Photo View
    let currentZoom = 1.0;
    const photoImg = document.getElementById('modal-site-image');
    
    document.getElementById('zoom-in-btn')?.addEventListener('click', () => {
      currentZoom = Math.min(3.5, currentZoom + 0.3);
      if (photoImg) photoImg.style.transform = `scale(${currentZoom})`;
    });

    document.getElementById('zoom-out-btn')?.addEventListener('click', () => {
      currentZoom = Math.max(0.6, currentZoom - 0.3);
      if (photoImg) photoImg.style.transform = `scale(${currentZoom})`;
    });

    document.getElementById('zoom-reset-btn')?.addEventListener('click', () => {
      currentZoom = 1.0;
      if (photoImg) photoImg.style.transform = `scale(1.0)`;
    });

    // Fly in Twin button
    document.getElementById('btn-fly-in-twin')?.addEventListener('click', () => {
      this.stopTimelapse();
      modal?.classList.add('hidden');
      if (this.activeCameraId) {
        const cam = this.camerasData.find(c => c.id === this.activeCameraId);
        if (cam) this.flyTo(cam.position, cam.target, cam.fov || 75, 1000);
      }
    });

    // Transparency Slider
    const opSlider = document.getElementById('overlay-opacity-slider');
    const overLayer = document.getElementById('overlay-img-layer');
    if (opSlider && overLayer) {
      opSlider.addEventListener('input', (e) => {
        overLayer.style.opacity = e.target.value / 100;
      });
    }

    // Timelapse Scrubber & Playback Controls
    this.initTimelapseEvents();
  }

  initTimelapseEvents() {
    const scrubber = document.getElementById('timelapse-scrubber');
    const btnPlay = document.getElementById('btn-timelapse-play');
    const btnSpeed = document.getElementById('btn-timelapse-speed');
    const btnSyncSun = document.getElementById('btn-sync-sun');

    scrubber?.addEventListener('input', (e) => {
      this.setTimelapseFrame(parseInt(e.target.value, 10));
    });

    btnPlay?.addEventListener('click', () => {
      if (this.isPlayingTimelapse) {
        this.stopTimelapse();
      } else {
        this.startTimelapse();
      }
    });

    btnSpeed?.addEventListener('click', () => {
      if (this.timelapseSpeed === 1) this.timelapseSpeed = 2;
      else if (this.timelapseSpeed === 2) this.timelapseSpeed = 4;
      else this.timelapseSpeed = 1;

      btnSpeed.innerText = `${this.timelapseSpeed}x Speed`;
      if (this.isPlayingTimelapse) {
        this.stopTimelapse();
        this.startTimelapse();
      }
    });

    btnSyncSun?.addEventListener('click', () => {
      if (!this.activeCamData || !this.lightingManager) return;
      const frames = this.activeCamData.timelapseFrames || [];
      const frame = frames[this.currentFrameIndex];
      if (!frame) return;

      const timeShort = frame.timeShort; // e.g. "14:30"
      if (timeShort && timeShort.includes(':')) {
        const parts = timeShort.split(':');
        const hr = parseInt(parts[0], 10);
        const mn = parseInt(parts[1], 10);
        const solarHour = hr + mn / 60;
        this.lightingManager.setTimeOfDay(solarHour);
        const slider = document.getElementById('solar-slider');
        if (slider) slider.value = solarHour;
        const timeDisplay = document.getElementById('sun-time-display');
        if (timeDisplay) timeDisplay.innerText = `${timeShort} GST (Synced with Photo)`;
      }
    });
  }

  startTimelapse() {
    this.isPlayingTimelapse = true;
    const btnPlay = document.getElementById('btn-timelapse-play');
    if (btnPlay) {
      btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i> <span>Pause</span>';
      btnPlay.classList.add('playing');
    }

    const interval = Math.round(400 / this.timelapseSpeed);
    this.timelapseTimer = setInterval(() => {
      const frames = this.activeCamData?.timelapseFrames || [];
      if (frames.length === 0) return;
      let nextIdx = this.currentFrameIndex + 1;
      if (nextIdx >= frames.length) nextIdx = 0;
      this.setTimelapseFrame(nextIdx);
    }, interval);
  }

  stopTimelapse() {
    this.isPlayingTimelapse = false;
    if (this.timelapseTimer) {
      clearInterval(this.timelapseTimer);
      this.timelapseTimer = null;
    }
    const btnPlay = document.getElementById('btn-timelapse-play');
    if (btnPlay) {
      btnPlay.innerHTML = '<i class="fa-solid fa-play"></i> <span>Play Timelapse</span>';
      btnPlay.classList.remove('playing');
    }
  }

  setTimelapseFrame(frameIdx) {
    if (!this.activeCamData) return;
    const frames = this.activeCamData.timelapseFrames || [];
    if (frameIdx < 0 || frameIdx >= frames.length) return;

    this.currentFrameIndex = frameIdx;
    const frame = frames[frameIdx];

    const scrubber = document.getElementById('timelapse-scrubber');
    if (scrubber) scrubber.value = frameIdx;

    const timeLabel = document.getElementById('timelapse-time-label');
    if (timeLabel) {
      timeLabel.innerText = `${frame.date} • ${frame.time}`;
    }

    const countLabel = document.getElementById('timelapse-counter');
    if (countLabel) {
      countLabel.innerText = `Capture ${frameIdx + 1} of ${frames.length}`;
    }

    // Update images in modal
    const imgSrc = encodeURI(frame.filename);
    const mainImg = document.getElementById('modal-site-image');
    const splitImg = document.getElementById('modal-split-image');
    const overlayImg = document.getElementById('modal-overlay-image');

    if (mainImg) mainImg.src = imgSrc;
    if (splitImg) splitImg.src = imgSrc;
    if (overlayImg) overlayImg.src = imgSrc;

    document.getElementById('cam-meta-filename').innerText = frame.filename.split('/').pop();
    document.getElementById('cam-meta-date').innerText = `${frame.date} ${frame.timeShort}`;

    // Highlight active thumbnail in strip
    document.querySelectorAll('.tl-thumb-cell').forEach((th, i) => {
      th.classList.toggle('active', i === frameIdx);
    });
  }

  openPhotoModal(cam) {
    this.activeCamData = cam;
    const modal = document.getElementById('camera-modal');
    if (!modal) return;

    document.getElementById('modal-cam-badge').innerText = cam.id;
    document.getElementById('modal-cam-title').innerText = cam.title;
    document.getElementById('modal-cam-subtitle').innerText = `${cam.code} • ${cam.description}`;

    const frames = cam.timelapseFrames || [];
    this.currentFrameIndex = Math.floor(frames.length / 2) || 0;

    // Setup scrubber range
    const scrubber = document.getElementById('timelapse-scrubber');
    if (scrubber) {
      scrubber.min = 0;
      scrubber.max = Math.max(0, frames.length - 1);
      scrubber.value = this.currentFrameIndex;
    }

    // Populate Frame Thumbnails Strip
    const strip = document.getElementById('timelapse-thumbs-strip');
    if (strip) {
      strip.innerHTML = '';
      frames.forEach((f, fIdx) => {
        const thumb = document.createElement('div');
        thumb.className = `tl-thumb-cell ${fIdx === this.currentFrameIndex ? 'active' : ''}`;
        thumb.innerHTML = `
          <img src="${encodeURI(f.filename)}" alt="${f.timeShort}" loading="lazy" />
          <span>${f.timeShort}</span>
        `;
        thumb.addEventListener('click', () => {
          this.setTimelapseFrame(fIdx);
        });
        strip.appendChild(thumb);
      });
    }

    // Apply initial frame
    this.setTimelapseFrame(this.currentFrameIndex);

    document.getElementById('cam-meta-height').innerText = cam.height;
    document.getElementById('cam-meta-azimuth').innerText = cam.azimuth;
    document.getElementById('cam-meta-fov').innerText = `${cam.fov}° FOV`;

    modal.classList.remove('hidden');
  }

  update(time) {
    this.cameraMarkers.forEach((m, idx) => {
      if (m.userData.beaconRing) {
        const s = 1.0 + Math.sin(time * 0.003 + idx) * 0.15;
        m.userData.beaconRing.scale.set(s, s, 1.0);
      }
    });
  }
}

window.CameraManager = CameraManager;
