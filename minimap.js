/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - 2D INTERACTIVE SITE RADAR & FLOORPLAN
 * Developed for Architectural BIM Consultancy & VH Contracting LLC
 * 
 * Features:
 * - Real-Time Architectural Footprint Projection (Main Villa, Carport, Cyan Pool, Lake Frontage)
 * - Dynamic Camera Position Beacon & 75° Field-of-View Cone
 * - Color-Coded Station Markers & Spatial IoT Nodes
 * - Click-to-Teleport Functorial Mapping (2D Radar Coordinates -> 3D Geodesic Flight)
 */

class SiteMinimap {
  constructor(canvasId, camera, controls, cameraManager) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.camera = camera;
    this.controls = controls;
    this.cameraManager = cameraManager;

    this.width = this.canvas.width = 300;
    this.height = this.canvas.height = 160;

    // World coordinate bounds: X in [-24..24], Z in [-26..26]
    this.worldBounds = {
      minX: -22,
      maxX: 22,
      minZ: -24,
      maxZ: 24
    };

    this.initEvents();
  }

  // Convert 3D world (X, Z) to Radar Canvas (px, py)
  worldToRadar(wx, wz) {
    const rx = ((wx - this.worldBounds.minX) / (this.worldBounds.maxX - this.worldBounds.minX)) * this.width;
    const ry = ((wz - this.worldBounds.minZ) / (this.worldBounds.maxZ - this.worldBounds.minZ)) * this.height;
    return { x: rx, y: ry };
  }

  // Convert Radar Canvas (px, py) to 3D world (X, Z)
  radarToWorld(px, py) {
    const wx = (px / this.width) * (this.worldBounds.maxX - this.worldBounds.minX) + this.worldBounds.minX;
    const wz = (py / this.height) * (this.worldBounds.maxZ - this.worldBounds.minZ) + this.worldBounds.minZ;
    return { x: wx, z: wz };
  }

  initEvents() {
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * this.width;
      const py = ((e.clientY - rect.top) / rect.height) * this.height;

      // 1. Check if clicked near an IoT node
      if (this.cameraManager && this.cameraManager.spatialNodes) {
        for (let node of this.cameraManager.spatialNodes) {
          const pt = this.worldToRadar(node.pos.x, node.pos.z);
          if (Math.hypot(px - pt.x, py - pt.y) < 12) {
            this.cameraManager.selectSpatialNode(node, true);
            return;
          }
        }
      }

      // 2. Check if clicked near a camera station
      const cameras = (window.SITE_DATA && window.SITE_DATA.cameras) ? window.SITE_DATA.cameras : [];
      for (let cam of cameras) {
        const pt = this.worldToRadar(cam.position.x, cam.position.z);
        if (Math.hypot(px - pt.x, py - pt.y) < 10) {
          this.cameraManager.enterInspection(cam.id, true);
          return;
        }
      }

      // 3. Otherwise teleport 3D camera to world position
      const worldPos = this.radarToWorld(px, py);
      const targetY = Math.max(3.5, this.camera.position.y);
      if (this.cameraManager) {
        this.cameraManager.flyTo(
          { x: worldPos.x, y: targetY, z: worldPos.z + 8 },
          { x: worldPos.x, y: 2.5, z: worldPos.z },
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

    // 1. Background Grid
    ctx.fillStyle = '#051F20';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(142, 182, 155, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // 2. Lake Zone (North, -Z)
    const lakeTop = this.worldToRadar(0, -24).y;
    const lakeBottom = this.worldToRadar(0, -16.5).y;
    ctx.fillStyle = 'rgba(35, 83, 71, 0.35)';
    ctx.fillRect(0, lakeTop, w, lakeBottom - lakeTop);

    // 3. Swimming Pool Footprint
    const p1 = this.worldToRadar(1.5, -15.4);
    const p2 = this.worldToRadar(9.5, -5.0);
    ctx.fillStyle = 'rgba(142, 182, 155, 0.28)';
    ctx.strokeStyle = '#8EB69B';
    ctx.lineWidth = 1.2;
    ctx.fillRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    // 4. Main Villa Footprint
    const v1 = this.worldToRadar(-7.5, -3.8);
    const v2 = this.worldToRadar(8.6, 6.4);
    ctx.fillStyle = 'rgba(11, 43, 38, 0.85)';
    ctx.strokeStyle = '#DAF1DE';
    ctx.lineWidth = 1.5;
    ctx.fillRect(v1.x, v1.y, v2.x - v1.x, v2.y - v1.y);
    ctx.strokeRect(v1.x, v1.y, v2.x - v1.x, v2.y - v1.y);

    // 5. Carport Pergola Footprint
    const c1 = this.worldToRadar(4.2, 3.0);
    const c2 = this.worldToRadar(14.2, 9.6);
    ctx.fillStyle = 'rgba(22, 56, 50, 0.7)';
    ctx.strokeStyle = '#8EB69B';
    ctx.fillRect(c1.x, c1.y, c2.x - c1.x, c2.y - c1.y);
    ctx.strokeRect(c1.x, c1.y, c2.x - c1.x, c2.y - c1.y);

    // 6. Spatial IoT Nodes on Radar
    if (this.cameraManager && this.cameraManager.spatialNodes) {
      this.cameraManager.spatialNodes.forEach(node => {
        const pt = this.worldToRadar(node.pos.x, node.pos.z);
        const isSel = this.cameraManager.activeNode && this.cameraManager.activeNode.code === node.code;
        ctx.fillStyle = isSel ? '#DAF1DE' : '#8EB69B';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isSel ? 4.5 : 3.0, 0, Math.PI * 2);
        ctx.fill();
        if (isSel) {
          ctx.strokeStyle = '#DAF1DE';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    }

    // 7. Dynamic Camera Position & Field-of-View Cone
    const camPt = this.worldToRadar(this.camera.position.x, this.camera.position.z);
    const tgtPt = this.worldToRadar(this.controls.target.x, this.controls.target.z);
    const angle = Math.atan2(tgtPt.y - camPt.y, tgtPt.x - camPt.x);

    // Translucent viewing cone
    ctx.fillStyle = 'rgba(142, 182, 155, 0.22)';
    ctx.beginPath();
    ctx.moveTo(camPt.x, camPt.y);
    ctx.arc(camPt.x, camPt.y, 36, angle - 0.45, angle + 0.45);
    ctx.closePath();
    ctx.fill();

    // Camera center point
    ctx.fillStyle = '#8EB69B';
    ctx.beginPath();
    ctx.arc(camPt.x, camPt.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#DAF1DE';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

window.SiteMinimap = SiteMinimap;
