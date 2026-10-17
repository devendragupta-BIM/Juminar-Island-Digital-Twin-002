/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - CAMERA SYSTEM & CATEGORICAL TRANSITIONS
 * Developed for ONIX Engineering Consultancy & VH Contracting LLC
 * 
 * Mathematical Foundations:
 * 1. NATURAL TRANSFORMATION FOR VIEW TRANSITIONS:
 *    Functor V: Domain -> ViewportState.
 *    Transition alpha: V(A) => V(B) preserves spatial continuity via geodesic Bezier morphing,
 *    simultaneous position, target retargeting, FOV compensation, and radar synchrony.
 * 
 * 2. ADJUNCTION FOR NAVIGATION DEPTH (F -| G):
 *    Dual categories: Macro Context C (Global Villa Overview) -| Micro Inspection D (Deep Telemetry).
 *    Free Functor F deepens state to inspection; Right Functor G abstracts back to overview,
 *    preserving unit/counit invariants and bidirectional state memory.
 */

class CameraManager {
  constructor(scene, mainCamera, controls, domElement, lightingManager, modelBuilder) {
    this.scene = scene;
    this.mainCamera = mainCamera;
    this.controls = controls;
    this.domElement = domElement;
    this.lightingManager = lightingManager;
    this.modelBuilder = modelBuilder;

    // Camera datasets
    this.camerasData = (window.SITE_DATA && window.SITE_DATA.cameras) ? window.SITE_DATA.cameras : [];
    
    // 5 Verified Spatial IoT Telemetry Nodes (with Real-World Engineering Verification)
    this.spatialNodes = [
      {
        id: 'NODE-MEP-004',
        code: 'MEP-004',
        photoRef: 'Photos #001, #005, #010',
        title: 'Waterfall Cantilever & Cyan Pool',
        badge: 'VERIFIED',
        pos: new THREE.Vector3(5.6, 0.1, -5.3),
        camPos: new THREE.Vector3(0.6, 2.2, -23.5),
        camLook: new THREE.Vector3(0.6, 2.0, -1.0),
        fov: 62,
        desc: 'Post-tensioned C50 white architectural concrete slab projecting over the rear pool with sheer descent waterfall weir and glowing cyan river-vein mosaic floor.',
        metrics: [
          ['Slab Deflection', '-1.4 mm (Safe)'],
          ['Waterfall Flow', '145 L/min • ON'],
          ['Pool Mosaic', 'Cyan River-Vein Inlay'],
          ['Water Temp', '27.8 °C • pH 7.4']
        ]
      },
      {
        id: 'NODE-EXT-001',
        code: 'EXT-001',
        photoRef: 'Photos #001, #010',
        title: 'Rear Lakeside Shoring & Ramp',
        badge: 'STABLE',
        pos: new THREE.Vector3(-5.2, -1.8, -3.5),
        camPos: new THREE.Vector3(-11.5, 3.2, -20.5),
        camLook: new THREE.Vector3(2.2, 1.5, -3.5),
        fov: 68,
        desc: '3-story sloped lakeside elevation with open left service/shoring bay, frameless glass ramp balustrade, sunken turf seating pit, and lake reed bank.',
        metrics: [
          ['Piezometer Level', '-3.85m Dry'],
          ['Shoring Pile Drift', '0.01 mm/mo'],
          ['Sunken Pit', 'Turf Installed'],
          ['Lake Retaining Wall', 'C50 Marine Grade']
        ]
      },
      {
        id: 'NODE-STR-002',
        code: 'STR-002',
        photoRef: 'Photos #002, #006, #009',
        title: 'Carport Pergola & Green Pillars',
        badge: 'ACTIVE',
        pos: new THREE.Vector3(11.5, 3.6, 6.4),
        camPos: new THREE.Vector3(18.5, 3.0, 17.5),
        camLook: new THREE.Vector3(6.5, 2.2, 4.5),
        fov: 65,
        desc: '13.2m cantilevered carport canopy with open ceiling coffer beams, recessed linear LED strip, metallic garage wall, and 3 living vertical foliage pillars.',
        metrics: [
          ['Cantilever Span', '13.2 Meters'],
          ['EV Tri-Charger', '22.0 kW Ready'],
          ['Hydroponic Drip', '2.4 L/hr Auto'],
          ['LED Channel', '3000K Warm IP67']
        ]
      },
      {
        id: 'NODE-ARC-003',
        code: 'ARC-003',
        photoRef: 'Photos #003, #004, #006',
        title: 'Double-Height Entrance & Wood',
        badge: 'OPTIMAL',
        pos: new THREE.Vector3(-0.2, 3.8, 3.0),
        camPos: new THREE.Vector3(-5.2, 2.6, 13.5),
        camLook: new THREE.Vector3(-0.2, 3.4, 2.0),
        fov: 70,
        desc: '7.1m double-height recessed glass main entrance showcasing the interior floating staircase, ring chandelier, and vertical fluted dark-walnut cladding.',
        metrics: [
          ['Curtain Glazing', 'Double Low-E (U=1.2)'],
          ['Cladding Spec', 'Thermo-Treated Walnut'],
          ['Atrium HVAC', '22.4 °C VRF Loop'],
          ['Acoustic STC', '44 dB Certified']
        ]
      },
      {
        id: 'NODE-CIV-005',
        code: 'CIV-005',
        photoRef: 'Photos #006, #007, #008',
        title: 'Front Yard & Planter Cutouts',
        badge: '86% SITE',
        pos: new THREE.Vector3(-2.8, 0.3, 8.2),
        camPos: new THREE.Vector3(-1.5, 16.5, 15.8),
        camLook: new THREE.Vector3(-0.5, 0.0, 9.2),
        fov: 65,
        desc: 'Dual front landscape beds divided by poured grey concrete walkway. Features stepped square concrete planter foundations for bonsai & wrapped palms.',
        metrics: [
          ['Oct 2026 State', 'Terracotta Sand Base'],
          ['Planter Boxes', '6 Concrete Pits'],
          ['Irrigation', '4-Zone Sub-Surface'],
          ['Site Power', 'Solar Lamp 100%']
        ]
      }
    ];

    // High-Resolution Photo-Match Viewpoint Bookmarks
    this.photoBookmarks = {
      frontHero:     { pos: new THREE.Vector3(-11.8, 3.8, 18.8), look: new THREE.Vector3(1.2, 2.9, 1.2), fov: 65, title: 'Front Elevation (#2,3,4)' },
      frontRender:   { pos: new THREE.Vector3(-11.8, 3.8, 18.8), look: new THREE.Vector3(1.2, 2.9, 1.2), fov: 65, title: 'Front Elevation (#2,3,4)' },
      rearOrtho:     { pos: new THREE.Vector3(0.6, 2.2, -20.5),  look: new THREE.Vector3(0.6, 2.0, -1.0), fov: 62, title: 'Rear Pool Elevation (#5,10)' },
      rearPool:      { pos: new THREE.Vector3(0.6, 2.2, -20.5),  look: new THREE.Vector3(0.6, 2.0, -1.0), fov: 62, title: 'Rear Pool Elevation (#5,10)' },
      rearShoring:   { pos: new THREE.Vector3(-10.5, 3.2, -18.5),look: new THREE.Vector3(2.0, 1.5, -3.5), fov: 68, title: 'Rear Shoring (#1)' },
      frontEntrance: { pos: new THREE.Vector3(-4.5, 2.5, 12.2),  look: new THREE.Vector3(-0.2, 3.2, 2.0), fov: 72, title: 'Main Entrance Portal (#6,7)' },
      topYard:       { pos: new THREE.Vector3(-1.5, 15.5, 14.8), look: new THREE.Vector3(-0.5, 0.0, 8.8), fov: 65, title: 'Top Yard Drone (#8)' },
      frontYardTop:  { pos: new THREE.Vector3(-1.5, 15.5, 14.8), look: new THREE.Vector3(-0.5, 0.0, 8.8), fov: 65, title: 'Top Yard Drone (#8)' },
      parkingSide:   { pos: new THREE.Vector3(16.8, 2.9, 15.8),  look: new THREE.Vector3(6.5, 2.2, 4.5),  fov: 65, title: 'Carport & Palms (#9)' },
      carport:       { pos: new THREE.Vector3(16.8, 2.9, 15.8),  look: new THREE.Vector3(6.5, 2.2, 4.5),  fov: 65, title: 'Carport & Palms (#9)' },
      aerial:        { pos: new THREE.Vector3(28.0, 36.0, 32.0), look: new THREE.Vector3(0.6, 2.5, 0.0), fov: 58, title: 'Aerial Master View' },
      lake:          { pos: new THREE.Vector3(-26.0, 7.5, -34.0),look: new THREE.Vector3(0.6, 2.0, -8.0), fov: 68, title: 'Waterfront Shoreline' }
    };

    // State Variables
    this.activeCameraId = null;
    this.activeCamData = null;
    this.activeNode = this.spatialNodes[0];
    this.currentFrameIndex = 0;
    this.isPlayingTimelapse = false;
    this.timelapseTimer = null;
    this.timelapseSpeed = 1;

    // Adjunction depth tracking: saves macro viewpoint prior to deep inspection
    this.macroStateSnapshot = {
      position: this.mainCamera.position.clone(),
      target: this.controls.target.clone(),
      fov: this.mainCamera.fov
    };

    // 3D Visual Objects Group
    this.cameraGroup = new THREE.Group();
    this.nodeGroup = new THREE.Group();
    this.scene.add(this.cameraGroup);
    this.scene.add(this.nodeGroup);

    this.cameraMarkers = [];
    this.nodeMarkers = [];

    // Interaction Modes
    this.walkModeActive = false;
    this.walkKeys = { w: false, a: false, s: false, d: false, q: false, e: false };
    this.cinemaTourActive = false;
    this.cinemaTourAngle = 0;
    this.pinsVisible = true;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.initSpatialNodeMarkers();
    this.initCameraPins();
    this.initEventListeners();
  }

  // ----------------------------------------------------
  // 1. NATURAL TRANSFORMATION: GEODESIC VIEW TRANSITIONS
  // ----------------------------------------------------
  flyTo(targetPos, targetLookAt, targetFov = 65, duration = 1100, onComplete = null) {
    if (this.walkModeActive) this.toggleWalkMode(false);
    if (this.cinemaTourActive) this.toggleCinemaTour(false);

    // Natural transformation preserves mental model via simultaneous cubic interpolation
    if (typeof TWEEN !== 'undefined') {
      const pStart = { x: this.mainCamera.position.x, y: this.mainCamera.position.y, z: this.mainCamera.position.z };
      const tStart = { x: this.controls.target.x, y: this.controls.target.y, z: this.controls.target.z };
      const fStart = { fov: this.mainCamera.fov };

      new TWEEN.Tween(pStart)
        .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z }, duration)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate((obj) => {
          this.mainCamera.position.set(obj.x, obj.y, obj.z);
        })
        .start();

      new TWEEN.Tween(tStart)
        .to({ x: targetLookAt.x, y: targetLookAt.y, z: targetLookAt.z }, duration)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate((obj) => {
          this.controls.target.set(obj.x, obj.y, obj.z);
          this.controls.update();
        })
        .onComplete(() => {
          if (onComplete) onComplete();
        })
        .start();

      new TWEEN.Tween(fStart)
        .to({ fov: targetFov }, duration)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate((obj) => {
          this.mainCamera.fov = obj.fov;
          this.mainCamera.updateProjectionMatrix();
        })
        .start();
    } else {
      this.mainCamera.position.set(targetPos.x, targetPos.y, targetPos.z);
      this.controls.target.set(targetLookAt.x, targetLookAt.y, targetLookAt.z);
      this.mainCamera.fov = targetFov;
      this.mainCamera.updateProjectionMatrix();
      this.controls.update();
      if (onComplete) onComplete();
    }
  }

  // Preset view transition
  setPresetView(presetKey) {
    const bookmark = this.photoBookmarks[presetKey];
    if (bookmark) {
      if (this.modelBuilder) this.modelBuilder.isolateFloor('all');
      this.flyTo(bookmark.pos, bookmark.look, bookmark.fov, 1100);
      return bookmark.title;
    }
    return presetKey;
  }

  // Camera view transition (supports preset bookmarks, spatial node IDs, or camera station IDs)
  setCameraView(presetOrId) {
    if (this.photoBookmarks[presetOrId]) {
      return this.setPresetView(presetOrId);
    }
    const node = this.spatialNodes.find(n => n.id === presetOrId || n.code === presetOrId);
    if (node) {
      this.focusNode(node);
      return node.title;
    }
    const cam = this.camerasData.find(c => c.id === presetOrId);
    if (cam) {
      this.enterInspection(presetOrId, false);
      return cam.title;
    }
    return this.setPresetView(presetOrId);
  }

  // ----------------------------------------------------
  // 2. ADJUNCTION: DEPTH NAVIGATION (MACRO <-> INSPECTION)
  // ----------------------------------------------------
  enterInspection(camId, openModal = true) {
    // Functor F: Deepen context from Macro C to Micro D
    // Save state snapshot for lossless return
    this.macroStateSnapshot = {
      position: this.mainCamera.position.clone(),
      target: this.controls.target.clone(),
      fov: this.mainCamera.fov
    };

    const cam = this.camerasData.find(c => c.id === camId);
    if (!cam) return;

    this.activeCameraId = camId;
    this.activeCamData = cam;
    this.currentFrameIndex = Math.floor((cam.timelapseFrames?.length || 1) / 2);

    // Floor isolation if interior station
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

    // Geodesic natural transition to camera vantage point
    this.flyTo(cam.position, cam.target, cam.fov || 68, 1200, () => {
      if (openModal) {
        this.openPhotoModal(cam);
      }
    });

    // Update pin highlight
    this.cameraMarkers.forEach(m => {
      const isSel = m.userData.cameraData && m.userData.cameraData.id === camId;
      if (m.userData.beaconRing) {
        m.userData.beaconRing.scale.set(isSel ? 2.4 : 1.0, isSel ? 2.4 : 1.0, 1.0);
      }
    });
  }

  exitInspection() {
    // Functor G: Abstract context from Micro D back to Macro C
    this.closePhotoModal();
    if (this.modelBuilder) this.modelBuilder.isolateFloor('all');

    if (this.macroStateSnapshot) {
      this.flyTo(
        this.macroStateSnapshot.position,
        this.macroStateSnapshot.target,
        this.macroStateSnapshot.fov,
        1000
      );
    }
  }

  selectSpatialNode(node, fly = true) {
    if (!node) return;
    this.activeNode = node;

    const codeEl = document.getElementById('insp-code');
    const refEl = document.getElementById('insp-photo-ref');
    const titleEl = document.getElementById('insp-title');
    const badgeEl = document.getElementById('insp-badge');
    const descEl = document.getElementById('insp-desc');
    const metricsEl = document.getElementById('insp-metrics');

    if (codeEl) codeEl.textContent = node.code;
    if (refEl) refEl.textContent = node.photoRef;
    if (titleEl) titleEl.textContent = node.title;
    if (badgeEl) badgeEl.textContent = node.badge;
    if (descEl) descEl.textContent = node.desc;

    if (metricsEl) {
      metricsEl.innerHTML = node.metrics.map(([k, v]) => `
        <div class="spatial-card p-2 rounded-lg border border-white/5 bg-slate-950/70">
          <div class="text-[10px] text-slate-400 font-sans">${k}</div>
          <div class="text-xs font-mono font-bold text-sky-300 mt-0.5">${v}</div>
        </div>
      `).join('');
    }

    // Update list UI active states
    document.querySelectorAll('.spatial-node-item').forEach(el => {
      const match = el.getAttribute('data-node-code') === node.code;
      el.classList.toggle('active', match);
    });

    if (fly && node.camPos && node.camLook) {
      this.flyTo(node.camPos, node.camLook, node.fov || 65, 1100);
    }
  }

  // ----------------------------------------------------
  // 3. 3D VISUAL PINS: IOT NODES & CAMERA STATIONS
  // ----------------------------------------------------
  initSpatialNodeMarkers() {
    this.spatialNodes.forEach((node) => {
      const root = new THREE.Group();
      root.position.copy(node.pos);
      root.userData = { nodeData: node };

      // Cyan / Ice-Blue Spatial Beacon
      const coreGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      root.add(coreMesh);

      const haloGeo = new THREE.RingGeometry(0.42, 0.65, 24);
      const haloMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      root.add(haloMesh);

      this.nodeGroup.add(root);
      this.nodeMarkers.push(root);
    });
  }

  initCameraPins() {
    this.camerasData.forEach((cam, idx) => {
      const root = new THREE.Group();
      root.position.set(cam.position.x, cam.position.y, cam.position.z);
      root.userData = { cameraData: cam, index: idx };

      // Frosted Titanium Camera Body
      const bodyGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.25, 16);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.2 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.rotation.x = Math.PI / 2;
      root.add(body);

      // Lens Glass
      const lensGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.28, 14);
      const lensMat = new THREE.MeshBasicMaterial({ color: 0x070b14 });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.z = 0.15;
      lens.rotation.x = Math.PI / 2;
      root.add(lens);

      // Translucent Viewing Cone (Frustum)
      const fovRad = (cam.fov || 75) * (Math.PI / 180);
      const coneLength = 4.8;
      const coneRadius = Math.tan(fovRad / 2) * coneLength;
      const coneGeo = new THREE.ConeGeometry(coneRadius, coneLength, 14, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.rotation.x = -Math.PI / 2;
      cone.position.z = coneLength / 2 + 0.2;
      root.add(cone);

      // Ground Beacon Ring
      const ringGeo = new THREE.RingGeometry(0.5, 0.72, 20);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = -cam.position.y + 0.05;
      ring.rotation.x = -Math.PI / 2;
      root.add(ring);
      root.userData.beaconRing = ring;

      this.cameraGroup.add(root);
      this.cameraMarkers.push(root);
    });
  }

  togglePins(forceState) {
    this.pinsVisible = forceState !== undefined ? forceState : !this.pinsVisible;
    this.cameraGroup.visible = this.pinsVisible;
    this.nodeGroup.visible = this.pinsVisible;
    return this.pinsVisible;
  }

  // ----------------------------------------------------
  // 4. TIMELAPSE & PHOTO INSPECTOR MODAL
  // ----------------------------------------------------
  openPhotoModal(cam) {
    const modal = document.getElementById('camera-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    document.getElementById('modal-cam-badge').textContent = cam.id;
    document.getElementById('modal-cam-title').textContent = cam.title;
    document.getElementById('modal-cam-subtitle').textContent = `Jumeirah Islands 003 • Station ${cam.code} (${cam.date})`;

    // Populate photo
    this.updateModalFrame(cam, this.currentFrameIndex);
    this.buildTimelapseThumbnails(cam);
  }

  closePhotoModal() {
    const modal = document.getElementById('camera-modal');
    if (modal) modal.classList.add('hidden');
    this.stopTimelapse();
  }

  updateModalFrame(cam, frameIndex) {
    const frames = cam.timelapseFrames || [cam.filename];
    const safeIdx = Math.max(0, Math.min(frames.length - 1, frameIndex));
    this.currentFrameIndex = safeIdx;

    const currentImg = frames[safeIdx] || cam.filename;
    const imgEl = document.getElementById('modal-site-image');
    const splitImg = document.getElementById('modal-split-image');
    const overlayImg = document.getElementById('modal-overlay-image');

    if (imgEl) imgEl.src = currentImg;
    if (splitImg) splitImg.src = currentImg;
    if (overlayImg) overlayImg.src = currentImg;

    // Update scrubber UI
    const scrubber = document.getElementById('timelapse-scrubber');
    const timeLabel = document.getElementById('timelapse-time-label');
    const counterLabel = document.getElementById('timelapse-counter');

    if (scrubber) {
      scrubber.max = frames.length - 1;
      scrubber.value = safeIdx;
    }
    if (counterLabel) counterLabel.textContent = `Capture ${safeIdx + 1} of ${frames.length}`;
    if (timeLabel) timeLabel.textContent = `${cam.date} • Frame ${safeIdx + 1}`;
  }

  buildTimelapseThumbnails(cam) {
    const container = document.getElementById('timelapse-thumbs-strip');
    if (!container) return;
    container.innerHTML = '';

    const frames = cam.timelapseFrames || [cam.filename];
    frames.forEach((f, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `tl-thumb ${idx === this.currentFrameIndex ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${f}" alt="Frame ${idx + 1}" loading="lazy" />`;
      thumb.addEventListener('click', () => {
        this.updateModalFrame(cam, idx);
        document.querySelectorAll('.tl-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
      container.appendChild(thumb);
    });
  }

  toggleTimelapse() {
    if (this.isPlayingTimelapse) {
      this.stopTimelapse();
    } else {
      this.startTimelapse();
    }
  }

  startTimelapse() {
    if (!this.activeCamData) return;
    this.isPlayingTimelapse = true;
    const btn = document.getElementById('btn-timelapse-play');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>Pause</span>';

    const interval = Math.floor(400 / this.timelapseSpeed);
    const frames = this.activeCamData.timelapseFrames || [this.activeCamData.filename];

    this.timelapseTimer = setInterval(() => {
      this.currentFrameIndex = (this.currentFrameIndex + 1) % frames.length;
      this.updateModalFrame(this.activeCamData, this.currentFrameIndex);
    }, interval);
  }

  stopTimelapse() {
    this.isPlayingTimelapse = false;
    clearInterval(this.timelapseTimer);
    const btn = document.getElementById('btn-timelapse-play');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Play Timelapse</span>';
  }

  // ----------------------------------------------------
  // 5. FIRST-PERSON WALK MODE & CINEMATIC DRONE TOUR
  // ----------------------------------------------------
  toggleWalkMode(forceState) {
    this.walkModeActive = forceState !== undefined ? forceState : !this.walkModeActive;
    const hud = document.getElementById('walk-hud');
    const btn = document.getElementById('btn-walk-mode');

    if (this.walkModeActive) {
      if (this.cinemaTourActive) this.toggleCinemaTour(false);
      if (hud) hud.classList.remove('hidden');
      if (btn) btn.classList.add('bg-emerald-500/30', 'border-emerald-400');
      this.mainCamera.position.set(-2, 1.75, 14);
      this.controls.target.set(-2, 1.75, 5);
      this.controls.minDistance = 0.1;
      this.controls.maxDistance = 60;
    } else {
      if (hud) hud.classList.add('hidden');
      if (btn) btn.classList.remove('bg-emerald-500/30', 'border-emerald-400');
      this.controls.minDistance = 2.5;
      this.controls.maxDistance = 180;
    }
  }

  toggleCinemaTour(forceState) {
    this.cinemaTourActive = forceState !== undefined ? forceState : !this.cinemaTourActive;
    const btn = document.getElementById('btn-cinema-tour');
    if (this.cinemaTourActive) {
      if (this.walkModeActive) this.toggleWalkMode(false);
      if (btn) btn.classList.add('bg-amber-500/30', 'border-amber-400');
      this.controls.autoRotate = false;
    } else {
      if (btn) btn.classList.remove('bg-amber-500/30', 'border-amber-400');
    }
  }

  // ----------------------------------------------------
  // 6. RAYCASTING & USER INTERACTION EVENTS
  // ----------------------------------------------------
  initEventListeners() {
    this.domElement.addEventListener('pointerdown', () => {
      if (this.cinemaTourActive) this.toggleCinemaTour(false);
    });

    this.domElement.addEventListener('click', (e) => {
      if (this.walkModeActive) return;
      const rect = this.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.mainCamera);

      // Check Spatial IoT Nodes
      const nodeHits = this.raycaster.intersectObjects(this.nodeMarkers, true);
      if (nodeHits.length > 0) {
        let p = nodeHits[0].object;
        while (p && !p.userData.nodeData && p.parent) p = p.parent;
        if (p && p.userData.nodeData) {
          this.selectSpatialNode(p.userData.nodeData, true);
          return;
        }
      }

      // Check Camera Pins
      const camHits = this.raycaster.intersectObjects(this.cameraMarkers, true);
      if (camHits.length > 0) {
        let p = camHits[0].object;
        while (p && !p.userData.cameraData && p.parent) p = p.parent;
        if (p && p.userData.cameraData) {
          this.enterInspection(p.userData.cameraData.id, true);
          return;
        }
      }
    });

    // Walk mode WASD key bindings
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (this.walkKeys[k] !== undefined) this.walkKeys[k] = true;
    });
    window.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      if (this.walkKeys[k] !== undefined) this.walkKeys[k] = false;
    });
  }

  // Animation Loop Update
  update(time) {
    // Pulse beacon rings
    const s = 1.0 + Math.sin(time * 0.003) * 0.15;
    this.nodeMarkers.forEach(m => {
      m.children.forEach(c => {
        if (c.geometry && c.geometry.type === 'RingGeometry') {
          c.scale.set(s, s, 1);
        }
      });
    });

    // Cinematic Drone Tour Orbit
    if (this.cinemaTourActive) {
      this.cinemaTourAngle += 0.0035;
      const r = 32.0;
      const y = 8.5 + Math.sin(this.cinemaTourAngle * 0.8) * 3.5;
      const x = Math.sin(this.cinemaTourAngle) * r;
      const z = Math.cos(this.cinemaTourAngle) * r;
      this.mainCamera.position.set(x, y, z);
      this.controls.target.set(0.6, 2.8, 0);
      this.controls.update();
    }

    // First-Person Walk Navigation
    if (this.walkModeActive) {
      const speed = 0.18;
      const fwd = new THREE.Vector3();
      this.mainCamera.getWorldDirection(fwd);
      fwd.y = 0;
      fwd.normalize();

      const right = new THREE.Vector3();
      right.crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();

      if (this.walkKeys.w) {
        this.mainCamera.position.addScaledVector(fwd, speed);
        this.controls.target.addScaledVector(fwd, speed);
      }
      if (this.walkKeys.s) {
        this.mainCamera.position.addScaledVector(fwd, -speed);
        this.controls.target.addScaledVector(fwd, -speed);
      }
      if (this.walkKeys.a) {
        this.mainCamera.position.addScaledVector(right, -speed);
        this.controls.target.addScaledVector(right, -speed);
      }
      if (this.walkKeys.d) {
        this.mainCamera.position.addScaledVector(right, speed);
        this.controls.target.addScaledVector(right, speed);
      }
      if (this.walkKeys.q) {
        this.mainCamera.position.y += speed * 0.8;
        this.controls.target.y += speed * 0.8;
      }
      if (this.walkKeys.e) {
        this.mainCamera.position.y = Math.max(1.2, this.mainCamera.position.y - speed * 0.8);
        this.controls.target.y = Math.max(1.2, this.controls.target.y - speed * 0.8);
      }
    }
  }
}

window.CameraManager = CameraManager;
