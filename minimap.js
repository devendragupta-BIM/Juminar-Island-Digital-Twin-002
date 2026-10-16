/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - 2D INTERACTIVE SITE MINIMAP & RADAR
 * Top-down tactical architectural site radar with live camera FOV cone,
 * color-coded station pins, and click-to-teleport navigation.
 */

class SiteMinimap {
  constructor(canvasId, camera, controls, cameraManager) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.camera = camera;
    this.controls = controls;
    this.cameraManager = cameraManager;

    this.width = this.canvas.width = 220;
    this.height = this.canvas.height = 220;

    // World coordinate bounds (in meters)
    this.worldBounds = {
      minX: -45,
      maxX: 45,
      minZ: -55,
      maxZ: 45
    };

    this.initEvents();
  }

  // Convert 3D world (X, Z) to Minimap Canvas 2D (px, py)
  worldToMinimap(x, z) {
    const rangeX = this.worldBounds.maxX - this.worldBounds.minX;
    const rangeZ = this.worldBounds.maxZ - this.worldBounds.minZ;

    const px = ((x - this.worldBounds.minX) / rangeX) * this.width;
    const py = ((z - this.worldBounds.minZ) / rangeZ) * this.height;
    return { x: px, y: py };
  }

  // Convert Minimap Canvas 2D (px, py) to 3D world (X, Z)
  minimapToWorld(px, py) {
    const rangeX = this.worldBounds.maxX - this.worldBounds.minX;
    const rangeZ = this.worldBounds.maxZ - this.worldBounds.minZ;

    const x = (px / this.width) * rangeX + this.worldBounds.minX;
    const z = (py / this.height) * rangeZ + this.worldBounds.minZ;
    return { x, z };
  }

  initEvents() {
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * this.width;
      const py = ((e.clientY - rect.top) / rect.height) * this.height;

      // Check if clicked close to a camera marker
      const cameras = window.SITE_DATA.cameras || [];
      for (let cam of cameras) {
        const mPos = this.worldToMinimap(cam.position.x, cam.position.z);
        const dist = Math.hypot(px - mPos.x, py - mPos.y);
        if (dist < 10) {
          this.cameraManager.selectCamera(cam.id, true);
          return;
        }
      }

      // Otherwise teleport 3D camera to world position
      const worldPos = this.minimapToWorld(px, py);
      if (typeof TWEEN !== 'undefined') {
        const currentY = Math.max(12, this.camera.position.y);
        this.cameraManager.flyTo(
          { x: worldPos.x, y: currentY, z: worldPos.z + 15 },
          { x: worldPos.x, y: 3, z: worldPos.z },
          65,
          1000
        );
      }
    });
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Radar Background & Circular Grid Rings
    ctx.fillStyle = 'rgba(5, 7, 12, 0.85)';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 1;

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Radar Concentric Circles
    for (let r = 30; r < w; r += 40) {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 2. Lake Waterfront Edge
    const lakeTop = this.worldToMinimap(-40, -38);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.fillRect(0, 0, w, lakeTop.y);

    // Lake Shoreline Divider
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, lakeTop.y);
    ctx.lineTo(w, lakeTop.y);
    ctx.stroke();

    // 3. Villa Site Perimeter Boundary Walls
    const wallTL = this.worldToMinimap(-25, -35);
    const wallBR = this.worldToMinimap(25, 38);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(wallTL.x, wallTL.y, wallBR.x - wallTL.x, wallBR.y - wallTL.y);

    // 4. Infinity Swimming Pool
    const poolTL = this.worldToMinimap(0, -31);
    const poolBR = this.worldToMinimap(12, -15);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
    ctx.strokeStyle = 'rgba(103, 232, 249, 0.8)';
    ctx.fillRect(poolTL.x, poolTL.y, poolBR.x - poolTL.x, poolBR.y - poolTL.y);
    ctx.strokeRect(poolTL.x, poolTL.y, poolBR.x - poolTL.x, poolBR.y - poolTL.y);

    // 5. Villa Building Footprint
    const villaTL = this.worldToMinimap(-12, -8);
    const villaBR = this.worldToMinimap(8, 8);
    ctx.fillStyle = 'rgba(244, 246, 248, 0.25)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(villaTL.x, villaTL.y, villaBR.x - villaTL.x, villaBR.y - villaTL.y);
    ctx.strokeRect(villaTL.x, villaTL.y, villaBR.x - villaTL.x, villaBR.y - villaTL.y);

    // Carport Footprint
    const cpTL = this.worldToMinimap(8, -1);
    const cpBR = this.worldToMinimap(20, 13);
    ctx.fillStyle = 'rgba(100, 116, 139, 0.2)';
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.fillRect(cpTL.x, cpTL.y, cpBR.x - cpTL.x, cpBR.y - cpTL.y);
    ctx.strokeRect(cpTL.x, cpTL.y, cpBR.x - cpTL.x, cpBR.y - cpTL.y);

    // 6. Draw All Camera Markers
    const cameras = window.SITE_DATA.cameras || [];
    cameras.forEach(cam => {
      const pos = this.worldToMinimap(cam.position.x, cam.position.z);
      const isSelected = this.cameraManager.activeCameraId === cam.id;

      // Color mapping
      let color = '#38bdf8';
      if (cam.category === 'bim-render') color = '#e2ba52';
      else if (cam.category === 'exterior-rear') color = '#34d399';
      else if (cam.category === 'interior-gf') color = '#a855f7';
      else if (cam.category === 'interior-ff') color = '#f43f5e';
      else if (cam.category === 'interior-lg') color = '#14b8a6';

      // Pin Dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, isSelected ? 5.5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      if (isSelected) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pulsing Ring
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // 7. Draw Live User Camera Position & Viewing Cone
    const userPos = this.worldToMinimap(this.camera.position.x, this.camera.position.z);
    const targetPos = this.worldToMinimap(this.controls.target.x, this.controls.target.z);

    const angle = Math.atan2(targetPos.y - userPos.y, targetPos.x - userPos.x);
    const fovHalf = ((this.camera.fov * 0.5) * Math.PI) / 180;
    const coneLen = 32;

    // View Frustum Cone
    ctx.beginPath();
    ctx.moveTo(userPos.x, userPos.y);
    ctx.lineTo(userPos.x + Math.cos(angle - fovHalf) * coneLen, userPos.y + Math.sin(angle - fovHalf) * coneLen);
    ctx.arc(userPos.x, userPos.y, coneLen, angle - fovHalf, angle + fovHalf);
    ctx.closePath();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // User Eye Position
    ctx.beginPath();
    ctx.arc(userPos.x, userPos.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

window.SiteMinimap = SiteMinimap;
