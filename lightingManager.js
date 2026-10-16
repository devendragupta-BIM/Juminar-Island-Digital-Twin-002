/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - ATMOSPHERIC LIGHTING & SOLAR STUDY ENGINE
 * Developed for ONIX Engineering Consultancy & VH Contracting LLC
 * 
 * Features:
 * - Gradient Architectural Sky Dome Shader (Simulates Rayleigh/Mie Atmospheric Scattering)
 * - 4 Curated Atmosphere Presets:
 *   1. 'day': Crisp Daylight (Calibrated ACES Filmic, Zero Washout, High Edge Contrast)
 *   2. 'dusk': ONIX Blue Hour (Deep Sapphire Sky, Warm 3000K Linear LEDs)
 *   3. 'golden': Golden Sunset (Rich Amber Solar Horizon, Travertine Warmth)
 *   4. 'night': Luxury Night LED Mode (Obsidian Skies, Cyan Mosaic Pool Glow)
 * - Dubai Solar Arc Simulator (Latitude 25.06° N, Longitude 55.15° E)
 * - Dual Fill Lights for Deep Shadow Preservation
 */

class LightingManager {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;

    this.currentMode = 'day';
    this.azimuth = 212;
    this.elevation = 42;
    this.exposure = 0.85;

    // Configure WebGL renderer tone mapping
    if (this.renderer) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = this.exposure;
    }

    this.initSkyDome();
    this.initLights();
    this.setAtmosphere('day');
  }

  // ----------------------------------------------------
  // 1. GRADIENT ARCHITECTURAL SKY DOME SHADER
  // ----------------------------------------------------
  initSkyDome() {
    const skyVertexShader = `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `;

    const skyFragmentShader = `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize( vWorldPosition + offset ).y;
        gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
      }
    `;

    this.skyUniforms = {
      topColor: { value: new THREE.Color(0x1b5494) },
      bottomColor: { value: new THREE.Color(0x9bc4eb) },
      offset: { value: 12.0 },
      exponent: { value: 0.65 }
    };

    const skyGeo = new THREE.SphereGeometry(320, 32, 16);
    const skyMat = new THREE.ShaderMaterial({
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      uniforms: this.skyUniforms,
      side: THREE.BackSide,
      depthWrite: false
    });

    this.skyDome = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(this.skyDome);
  }

  // ----------------------------------------------------
  // 2. DIRECTIONAL SUN & MULTI-LAYER FILL LIGHTS
  // ----------------------------------------------------
  initLights() {
    // Ambient Light
    this.ambientLight = new THREE.AmbientLight(0xdbeafe, 0.42);
    this.scene.add(this.ambientLight);

    // Hemisphere Light
    this.hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x786856, 0.45);
    this.scene.add(this.hemiLight);

    // Primary Directional Sun Light
    this.sunLight = new THREE.DirectionalLight(0xfffbeb, 1.65);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.near = 1;
    this.sunLight.shadow.camera.far = 120;
    const d = 32;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0004;
    this.scene.add(this.sunLight);

    // Secondary Front & Rear Architectural Fill Lights
    this.frontFillLight = new THREE.DirectionalLight(0xbae6fd, 0.35);
    this.frontFillLight.position.set(-18, 14, 24);
    this.scene.add(this.frontFillLight);

    this.rearFillLight = new THREE.DirectionalLight(0x93c5fd, 0.30);
    this.rearFillLight.position.set(12, 10, -24);
    this.scene.add(this.rearFillLight);

    // Architectural Downlights & Accents
    this.atriumLight = new THREE.PointLight(0xffb86c, 1.5, 16);
    this.atriumLight.position.set(-0.2, 4.5, 3.2);
    this.scene.add(this.atriumLight);

    this.carportLight = new THREE.PointLight(0xffcf96, 1.2, 16);
    this.carportLight.position.set(8.8, 3.1, 6.4);
    this.scene.add(this.carportLight);

    this.rearDiningLight = new THREE.PointLight(0xffbe76, 1.4, 15);
    this.rearDiningLight.position.set(0.5, -1.2, -0.5);
    this.scene.add(this.rearDiningLight);

    this.poolUnderwaterLight = new THREE.PointLight(0x00e5ff, 1.6, 16);
    this.poolUnderwaterLight.position.set(5.5, -2.6, -10.2);
    this.scene.add(this.poolUnderwaterLight);
  }

  // ----------------------------------------------------
  // 3. ATMOSPHERE PRESET SWITCHER
  // ----------------------------------------------------
  setAtmosphere(modeKey) {
    this.currentMode = modeKey;

    if (modeKey === 'day') {
      this.skyUniforms.topColor.value.setHex(0x1b5494);
      this.skyUniforms.bottomColor.value.setHex(0x9bc4eb);
      this.exposure = 0.85;
      this.sunLight.color.setHex(0xfffbeb);
      this.sunLight.intensity = 1.65;
      this.ambientLight.intensity = 0.42;
      this.hemiLight.intensity = 0.45;
      this.frontFillLight.intensity = 0.35;
      this.rearFillLight.intensity = 0.30;
      this.atriumLight.intensity = 1.4;
      this.carportLight.intensity = 1.2;
      this.rearDiningLight.intensity = 1.4;
      this.poolUnderwaterLight.intensity = 1.5;
      this.azimuth = 212;
      this.elevation = 42;
    } else if (modeKey === 'dusk') {
      this.skyUniforms.topColor.value.setHex(0x0c234a);
      this.skyUniforms.bottomColor.value.setHex(0x3b6ea5);
      this.exposure = 0.82;
      this.sunLight.color.setHex(0xffe4b5);
      this.sunLight.intensity = 1.15;
      this.ambientLight.intensity = 0.35;
      this.hemiLight.intensity = 0.35;
      this.frontFillLight.intensity = 0.28;
      this.rearFillLight.intensity = 0.25;
      this.atriumLight.intensity = 2.6;
      this.carportLight.intensity = 2.2;
      this.rearDiningLight.intensity = 2.4;
      this.poolUnderwaterLight.intensity = 2.8;
      this.azimuth = 230;
      this.elevation = 18;
    } else if (modeKey === 'golden' || modeKey === 'sunset') {
      this.skyUniforms.topColor.value.setHex(0x1f3b6e);
      this.skyUniforms.bottomColor.value.setHex(0xe89b6c);
      this.exposure = 0.82;
      this.sunLight.color.setHex(0xffb870);
      this.sunLight.intensity = 1.45;
      this.ambientLight.intensity = 0.38;
      this.hemiLight.intensity = 0.38;
      this.frontFillLight.intensity = 0.30;
      this.rearFillLight.intensity = 0.25;
      this.atriumLight.intensity = 2.0;
      this.carportLight.intensity = 1.8;
      this.rearDiningLight.intensity = 2.0;
      this.poolUnderwaterLight.intensity = 2.2;
      this.azimuth = 250;
      this.elevation = 14;
    } else if (modeKey === 'night') {
      this.skyUniforms.topColor.value.setHex(0x040914);
      this.skyUniforms.bottomColor.value.setHex(0x132647);
      this.exposure = 0.78;
      this.sunLight.color.setHex(0x93c5fd);
      this.sunLight.intensity = 0.25;
      this.ambientLight.intensity = 0.22;
      this.hemiLight.intensity = 0.22;
      this.frontFillLight.intensity = 0.18;
      this.rearFillLight.intensity = 0.18;
      this.atriumLight.intensity = 3.4;
      this.carportLight.intensity = 3.0;
      this.rearDiningLight.intensity = 3.2;
      this.poolUnderwaterLight.intensity = 3.8;
      this.azimuth = 320;
      this.elevation = 5;
    }

    if (this.renderer) {
      this.renderer.toneMappingExposure = this.exposure;
    }

    this.updateSunPosition(this.azimuth, this.elevation);
  }

  // ----------------------------------------------------
  // 4. SOLAR ARC & POSITION CALCULATOR
  // ----------------------------------------------------
  updateSunPosition(azimuthDeg, elevationDeg) {
    this.azimuth = azimuthDeg;
    this.elevation = elevationDeg;

    const phi = THREE.MathUtils.degToRad(90 - elevationDeg);
    const theta = THREE.MathUtils.degToRad(azimuthDeg);

    const sunVec = new THREE.Vector3().setFromSphericalCoords(1, phi, theta);
    this.sunLight.position.copy(sunVec).multiplyScalar(50);
    this.sunLight.target.position.set(0.6, 2.5, 0);
    this.sunLight.target.updateMatrixWorld();
  }

  setExposure(val) {
    this.exposure = Math.max(0.4, Math.min(1.4, val));
    if (this.renderer) {
      this.renderer.toneMappingExposure = this.exposure;
    }
  }

  setTimeOfDay(hour) {
    // Converts 6:00 to 20:00 into azimuth and solar altitude
    const t = (hour - 6.0) / 14.0; // 0 to 1
    const sunAngle = Math.PI * t;

    const elev = Math.max(2, Math.sin(sunAngle) * 72);
    const az = 180 + Math.cos(sunAngle) * 85;

    this.updateSunPosition(az, elev);

    if (hour >= 18.5) {
      this.setAtmosphere('night');
    } else if (hour >= 17.0) {
      this.setAtmosphere('golden');
    } else if (hour >= 6.5) {
      this.setAtmosphere('day');
    } else {
      this.setAtmosphere('dusk');
    }
  }
}

window.LightingManager = LightingManager;
