/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - CAMERA SYSTEM & 3D MARKER MANAGER
 * Places sleek frosted glass 3D camera pins, handles smooth transitions, raycasting,
 * interactive wipe comparison slider, and high-fidelity photo inspector synchronization.
 */

class CameraManager {
  constructor(scene, mainCamera, controls, domElement) {
    this.scene = scene;
    this.mainCamera = mainCamera;
    this.controls = controls;
    this.domElement = domElement;

    this.camerasData = window.SITE_DATA.cameras;
    this.cameraMarkers = [];
    this.cameraGroup = new THREE.Group();
    this.scene.add(this.cameraGroup);

    this.activeCameraId = null;
    this.hoveredMarker = null;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.initCameraMarkers();
    this.initEventListeners();
    this.initModalControls();
  }

  // ----------------------------------------------------
  // 1. CREATE SLEEK FROSTED 3D CAMERA PINS
  // ----------------------------------------------------
  initCameraMarkers() {
    this.camerasData.forEach((cam, idx) => {
      const markerRoot = new THREE.Group();
      markerRoot.position.set(cam.position.x, cam.position.y, cam.position.z);
      markerRoot.userData = { cameraData: cam, index: idx };

      const isBim = cam.category === 'bim-render';

      // 1. Sleek Frosted Glass Camera Housing (Compact, Elegant)
      const baseGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.25, 20);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: isBim ? 0xe2ba52 : 0x38bdf8,
        metalness: 0.9,
        roughness: 0.1,
        emissive: isBim ? 0x78350f : 0x0284c7,
        emissiveIntensity: 0.35,
        transmission: 0.4,
        reflectivity: 0.9
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.rotation.x = Math.PI / 2;
      markerRoot.add(baseMesh);

      // Lens Ring & Optic Glass
      const lensGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.3, 16);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x03060f, metalness: 0.98, roughness: 0.05 });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.position.z = 0.2;
      lensMesh.rotation.x = Math.PI / 2;
      markerRoot.add(lensMesh);

      // Glowing Center LED Point
      const ledGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: isBim ? 0xfef08a : 0xbae6fd });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.z = 0.35;
      markerRoot.add(ledMesh);

      // 2. Translucent Field-of-View Cone (Viewing Frustum - Subtle & Clean)
      const fovRad = (cam.fov || 75) * (Math.PI / 180);
      const coneLength = 5.2;
      const coneRadius = Math.tan(fovRad / 2) * coneLength;

      const coneGeo = new THREE.ConeGeometry(coneRadius, coneLength, 16, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: isBim ? 0xe2ba52 : 0x38bdf8,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const coneMesh = new THREE.Mesh(coneGeo, coneMat);
      coneMesh.rotation.x = -Math.PI / 2;
      coneMesh.position.z = coneLength / 2 + 0.3;
      markerRoot.add(coneMesh);

      // 3. Ground Radar Beacon Ring
      const ringGeo = new THREE.RingGeometry(0.55, 0.75, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isBim ? 0xfde047 : 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = -0.45;
      markerRoot.add(ringMesh);
      markerRoot.userData.beaconRing = ringMesh;

      // 4. Look towards Target Point
      markerRoot.lookAt(cam.target.x, cam.target.y, cam.target.z);

      // 5. Hit Sphere for Click Detection
      const hitGeo = new THREE.SphereGeometry(2.0, 10, 10);
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
          document.getElementById('tooltip-cam-time').innerText = `${cam.date} • ${cam.azimuth}`;
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
  // 3. SELECT CAMERA & FLY 3D VIEWPORT
  // ----------------------------------------------------
  selectCamera(camId, openModal = true) {
    const cam = this.camerasData.find(c => c.id === camId);
    if (!cam) return;

    this.activeCameraId = camId;

    this.cameraMarkers.forEach(m => {
      const isSelected = m.userData.cameraData.id === camId;
      if (m.userData.beaconRing) {
        m.userData.beaconRing.scale.set(isSelected ? 2.2 : 1.0, isSelected ? 2.2 : 1.0, 1.0);
      }
    });

    document.querySelectorAll('.camera-card-item, .carousel-thumb-item').forEach(el => {
      if (el.getAttribute('data-cam-id') === camId) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        el.classList.remove('active');
      }
    });

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
  // 4. PHOTO INSPECTION MODAL CONTROLS
  // ----------------------------------------------------
  initModalControls() {
    const modal = document.getElementById('camera-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
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

    let currentZoom = 1.0;
    const photoImg = document.getElementById('modal-site-image');
    
    document.getElementById('zoom-in-btn')?.addEventListener('click', () => {
      currentZoom = Math.min(3.0, currentZoom + 0.3);
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

    document.getElementById('btn-fly-in-twin')?.addEventListener('click', () => {
      modal?.classList.add('hidden');
      if (this.activeCameraId) {
        const cam = this.camerasData.find(c => c.id === this.activeCameraId);
        if (cam) this.flyTo(cam.position, cam.target, cam.fov || 75, 1000);
      }
    });

    const opSlider = document.getElementById('overlay-opacity-slider');
    const overLayer = document.getElementById('overlay-img-layer');
    if (opSlider && overLayer) {
      opSlider.addEventListener('input', (e) => {
        overLayer.style.opacity = e.target.value / 100;
      });
    }
  }

  openPhotoModal(cam) {
    const modal = document.getElementById('camera-modal');
    if (!modal) return;

    document.getElementById('modal-cam-badge').innerText = cam.id;
    document.getElementById('modal-cam-title').innerText = cam.title;
    document.getElementById('modal-cam-subtitle').innerText = `${cam.code} • ${cam.description}`;

    const imgSrc = encodeURI(cam.filename);
    const mainImg = document.getElementById('modal-site-image');
    const splitImg = document.getElementById('modal-split-image');
    const overlayImg = document.getElementById('modal-overlay-image');

    if (mainImg) mainImg.src = imgSrc;
    if (splitImg) splitImg.src = imgSrc;
    if (overlayImg) overlayImg.src = imgSrc;

    if (mainImg) mainImg.style.transform = 'scale(1.0)';

    document.getElementById('cam-meta-height').innerText = cam.height;
    document.getElementById('cam-meta-azimuth').innerText = cam.azimuth;
    document.getElementById('cam-meta-fov').innerText = `${cam.fov}° FOV`;
    document.getElementById('cam-meta-filename').innerText = cam.filename;
    document.getElementById('cam-meta-date').innerText = cam.date;

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
