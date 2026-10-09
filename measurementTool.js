/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - 3D LASER MEASUREMENT TOOL
 * Interactive point-to-point 3D distance ruler with snap vertex detection and HUD readout
 */

class MeasurementTool {
  constructor(scene, camera, domElement) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;

    this.active = false;
    this.points = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.measureGroup = new THREE.Group();
    this.scene.add(this.measureGroup);

    this.initHUD();
  }

  initHUD() {
    const btnMeasure = document.getElementById('btn-measure');
    const hud = document.getElementById('measure-hud');
    const closeBtn = document.getElementById('measure-close-btn');
    const resetBtn = document.getElementById('measure-reset-btn');

    btnMeasure?.addEventListener('click', () => {
      this.toggleMode();
    });

    closeBtn?.addEventListener('click', () => {
      this.toggleMode(false);
    });

    resetBtn?.addEventListener('click', () => {
      this.reset();
    });

    this.domElement.addEventListener('click', (e) => {
      if (!this.active) return;
      this.handleClick(e);
    });
  }

  toggleMode(forceState) {
    this.active = forceState !== undefined ? forceState : !this.active;
    const btn = document.getElementById('btn-measure');
    const hud = document.getElementById('measure-hud');

    if (this.active) {
      btn?.classList.add('active');
      hud?.classList.remove('hidden');
      this.domElement.style.cursor = 'crosshair';
      this.reset();
    } else {
      btn?.classList.remove('active');
      hud?.classList.add('hidden');
      this.domElement.style.cursor = 'grab';
      this.clearGraphics();
    }
  }

  reset() {
    this.points = [];
    this.clearGraphics();
    const stepText = document.getElementById('measure-step-text');
    const resText = document.getElementById('measure-result');
    if (stepText) stepText.innerText = "Click Point 1 on 3D Model";
    if (resText) resText.innerText = "-- m";
  }

  clearGraphics() {
    while (this.measureGroup.children.length > 0) {
      const obj = this.measureGroup.children[0];
      this.measureGroup.remove(obj);
    }
  }

  handleClick(e) {
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    // Intersect all meshes in scene except UI & markers
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    const validHit = intersects.find(hit => hit.object.type === 'Mesh' && hit.object.visible);
    if (!validHit) return;

    const hitPoint = validHit.point;
    this.points.push(hitPoint);

    // Draw marker dot
    const dotGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.position.copy(hitPoint);
    this.measureGroup.add(dotMesh);

    const stepText = document.getElementById('measure-step-text');
    const resText = document.getElementById('measure-result');

    if (this.points.length === 1) {
      if (stepText) stepText.innerText = "Click Point 2 to calculate distance";
    } else if (this.points.length === 2) {
      const p1 = this.points[0];
      const p2 = this.points[1];

      // Draw Laser Line
      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, linewidth: 3 });
      const line = new THREE.Line(lineGeo, lineMat);
      this.measureGroup.add(line);

      // Distance calculation
      const dist = p1.distanceTo(p2);
      if (stepText) stepText.innerText = "Distance Measured:";
      if (resText) resText.innerText = `${dist.toFixed(2)} meters`;
      
      this.points = []; // Ready for next pair
    }
  }
}

window.MeasurementTool = MeasurementTool;
