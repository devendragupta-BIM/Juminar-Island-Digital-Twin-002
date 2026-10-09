/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - DYNAMIC LIGHTING & SOLAR STUDY SIMULATOR
 * Real-time Dubai Sun position, shadows, golden hour sunset, luxury night mode, and ambient environment
 */

class LightingManager {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;

    // Enable shadows on renderer
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.currentEnv = 'day';
    this.currentTime = 13.0; // 1:00 PM default

    this.initLights();
  }

  initLights() {
    // 1. Hemisphere Light (Sky & Ground Ambient)
    this.hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x334155, 0.7);
    this.hemiLight.position.set(0, 50, 0);
    this.scene.add(this.hemiLight);

    // 2. Main Directional Sun Light (Casts soft architectural shadows)
    this.sunLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 150;
    
    // Shadow frustum bounding box
    const d = 45;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0004;

    this.scene.add(this.sunLight);

    // 3. Night & Golden Hour Accent Lights Group
    this.nightLightsGroup = new THREE.Group();
    
    // Pool Underglow Lights (Cyan / Aqua glow)
    const poolLight1 = new THREE.PointLight(0x00e5ff, 0, 15);
    poolLight1.position.set(6, 0.2, -23);
    this.nightLightsGroup.add(poolLight1);
    this.poolLight1 = poolLight1;

    // Villa Interior Warm Downlights
    const intLight1 = new THREE.PointLight(0xffeedd, 0, 20);
    intLight1.position.set(-2, 3.5, 0);
    this.nightLightsGroup.add(intLight1);
    this.intLight1 = intLight1;

    const intLight2 = new THREE.PointLight(0xffeedd, 0, 20);
    intLight2.position.set(-2, 7.5, 0);
    this.nightLightsGroup.add(intLight2);
    this.intLight2 = intLight2;

    // Carport Warm Downlight
    const carportLight = new THREE.PointLight(0xffedd5, 0, 18);
    carportLight.position.set(13.5, 3.8, 6.0);
    this.nightLightsGroup.add(carportLight);
    this.carportLight = carportLight;

    this.scene.add(this.nightLightsGroup);

    // Set initial sun position for 13:00 (1:00 PM)
    this.setTimeOfDay(13.0);
  }

  // Update Sun coordinates according to Dubai solar arc (Lat 25.06° N)
  setTimeOfDay(hour) {
    this.currentTime = hour;
    
    // Convert 6:00 to 20:00 into sun angle
    // Sunrise at 6.0 -> 0 rad (East), Solar Noon at 13.0 -> PI/2 (South Zenith), Sunset at 19.0 -> PI (West)
    const t = (hour - 6.0) / 13.0; // 0 to 1
    const sunAngle = t * Math.PI;

    const sunDist = 70;
    const sunY = Math.max(0.5, Math.sin(sunAngle) * 55);
    const sunX = -Math.cos(sunAngle) * sunDist;
    const sunZ = Math.cos(sunAngle * 0.5) * 20;

    this.sunLight.position.set(sunX, sunY, sunZ);
    this.sunLight.target.position.set(0, 4, 0);
    this.sunLight.target.updateMatrixWorld();

    // Calculate Azimuth & Altitude for UI Telemetry
    const altitudeDeg = Math.round(Math.asin(Math.max(0, Math.sin(sunAngle))) * (180 / Math.PI));
    const azimuthDeg = Math.round(180 + Math.cos(sunAngle) * 75);

    const azEl = document.getElementById('solar-azimuth');
    if (azEl) {
      azEl.innerText = `Azimuth: ${azimuthDeg}° • Altitude: ${altitudeDeg}°`;
    }

    // Dynamic Color & Atmosphere Adjustment based on Time
    if (hour < 7.0 || hour > 18.0) {
      // Twilight / Dusk / Dawn
      const factor = hour < 7.0 ? (hour - 6.0) : (19.0 - hour);
      this.sunLight.color.setHex(0xff7733);
      this.sunLight.intensity = Math.max(0.1, factor * 1.0);
      this.hemiLight.color.setHex(0x3b82f6);
      this.hemiLight.groundColor.setHex(0x1e1b4b);
      this.renderer.setClearColor(0x090d16, 1);
      
      // Turn on architectural lights at dusk
      this.setNightLightsIntensity(1.5);
    } else if (hour >= 16.5 && hour <= 18.0) {
      // Golden Hour (Dubai Sunset)
      this.sunLight.color.setHex(0xffaa44);
      this.sunLight.intensity = 1.6;
      this.hemiLight.color.setHex(0xfde047);
      this.hemiLight.groundColor.setHex(0x78350f);
      this.renderer.setClearColor(0x1a1528, 1);
      this.setNightLightsIntensity(0.8);
    } else {
      // Crisp Daylight
      this.sunLight.color.setHex(0xfffaed);
      this.sunLight.intensity = 1.4;
      this.hemiLight.color.setHex(0xdbeafe);
      this.hemiLight.groundColor.setHex(0x334155);
      this.renderer.setClearColor(0x07090e, 1);
      this.setNightLightsIntensity(0.0);
    }
  }

  setNightLightsIntensity(intensity) {
    if (this.poolLight1) this.poolLight1.intensity = intensity * 2.5;
    if (this.intLight1) this.intLight1.intensity = intensity * 1.8;
    if (this.intLight2) this.intLight2.intensity = intensity * 1.8;
    if (this.carportLight) this.carportLight.intensity = intensity * 2.0;
  }

  setEnvironmentPreset(env) {
    this.currentEnv = env;
    const slider = document.getElementById('solar-slider');
    const timeDisp = document.getElementById('sun-time-display');

    if (env === 'day') {
      if (slider) slider.value = 13.0;
      if (timeDisp) timeDisp.innerText = "13:00 (1:00 PM)";
      this.setTimeOfDay(13.0);
    } else if (env === 'sunset') {
      if (slider) slider.value = 17.5;
      if (timeDisp) timeDisp.innerText = "17:30 (5:30 PM)";
      this.setTimeOfDay(17.5);
    } else if (env === 'night') {
      if (slider) slider.value = 20.0;
      if (timeDisp) timeDisp.innerText = "20:00 (8:00 PM)";
      this.setTimeOfDay(20.0);
      this.renderer.setClearColor(0x04060a, 1);
      this.setNightLightsIntensity(3.0);
    } else if (env === 'wireframe') {
      this.setTimeOfDay(13.0);
      this.renderer.setClearColor(0x020408, 1);
    }
  }
}

window.LightingManager = LightingManager;
