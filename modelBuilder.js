/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - LUXURY PROCEDURAL BIM MODEL BUILDER
 * Dual-State 3D Architectural Engine:
 * 1. 'render': Finished ONIX Target Architectural Luxury Villa
 * 2. 'site': October 2026 As-Built Construction Site (Matches 460+ Real Site Captures)
 * Features dynamic water animation, exploded BIM view, Khutoot calligraphy wall,
 * scaffolding towers, shoring piles, burlap-wrapped palms, and seamless state switching.
 */

class VillaModelBuilder {
  constructor(scene) {
    this.scene = scene;
    this.siteState = 'site'; // Default state: 'site' (Oct 2026 Construction) or 'render'
    
    // BIM Layer Groups
    this.layers = {
      arch: new THREE.Group(),
      pool: new THREE.Group(),
      landscape: new THREE.Group(),
      construction: new THREE.Group(),
      vehicles: new THREE.Group(),
      grid: new THREE.Group()
    };
    
    // Floor Level Groups for Level Isolation & Exploded Axonometric View
    this.floors = {
      basement: new THREE.Group(), // Lower Ground (LG)
      ground: new THREE.Group(),   // Ground Floor (GF)
      first: new THREE.Group(),    // First Floor (FF)
      roof: new THREE.Group()      // Roof Terrace (R)
    };
    
    // Add floors to architectural layer
    this.layers.arch.add(this.floors.basement);
    this.layers.arch.add(this.floors.ground);
    this.layers.arch.add(this.floors.first);
    this.layers.arch.add(this.floors.roof);

    // State Specific Groups
    this.renderModeGroup = new THREE.Group(); // Only visible in 'render' state
    this.siteModeGroup = new THREE.Group();   // Only visible in 'site' state
    this.scene.add(this.renderModeGroup);
    this.scene.add(this.siteModeGroup);

    // Add all layers to main scene
    Object.values(this.layers).forEach(layer => this.scene.add(layer));
    
    // Dynamic animated water meshes reference
    this.waterMeshes = [];
    this.waterTime = 0;
    this.isExploded = false;
    this.explodeFactor = 0;

    // Track dynamic facade meshes to swap materials on state toggle
    this.facadeMeshes = [];

    // Generate Procedural Textures & Materials
    this.initTexturesAndMaterials();
  }

  // ----------------------------------------------------
  // PROCEDURAL TEXTURE GENERATION
  // ----------------------------------------------------
  initTexturesAndMaterials() {
    // 1. Procedural Finished Stucco / White Concrete (Render Mode)
    const stuccoCanvas = document.createElement('canvas');
    stuccoCanvas.width = 512;
    stuccoCanvas.height = 512;
    const sCtx = stuccoCanvas.getContext('2d');
    sCtx.fillStyle = '#f8fafc';
    sCtx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 35000; i++) {
      const v = Math.floor(Math.random() * 20);
      sCtx.fillStyle = `rgba(0,0,0,${v / 500})`;
      sCtx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
    const stuccoTex = new THREE.CanvasTexture(stuccoCanvas);
    stuccoTex.wrapS = THREE.RepeatWrapping;
    stuccoTex.wrapT = THREE.RepeatWrapping;
    stuccoTex.repeat.set(4, 4);

    // 2. Procedural Raw Cured Concrete with Formwork Lines & Tie Holes (Site Mode)
    const rawCanvas = document.createElement('canvas');
    rawCanvas.width = 512;
    rawCanvas.height = 512;
    const rCtx = rawCanvas.getContext('2d');
    rCtx.fillStyle = '#94a3b8';
    rCtx.fillRect(0, 0, 512, 512);
    // Formwork board lines
    for (let y = 0; y < 512; y += 64) {
      rCtx.fillStyle = '#64748b';
      rCtx.fillRect(0, y, 512, 2);
      // Tie rod holes
      for (let x = 32; x < 512; x += 128) {
        rCtx.beginPath();
        rCtx.arc(x, y + 32, 4, 0, Math.PI * 2);
        rCtx.fillStyle = '#334155';
        rCtx.fill();
        rCtx.beginPath();
        rCtx.arc(x, y + 32, 2, 0, Math.PI * 2);
        rCtx.fillStyle = '#1e293b';
        rCtx.fill();
      }
    }
    // Concrete mottling
    for (let i = 0; i < 30000; i++) {
      const v = Math.floor(Math.random() * 45);
      rCtx.fillStyle = `rgba(${v},${v},${v},0.07)`;
      rCtx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
    const rawConcreteTex = new THREE.CanvasTexture(rawCanvas);
    rawConcreteTex.wrapS = THREE.RepeatWrapping;
    rawConcreteTex.wrapT = THREE.RepeatWrapping;
    rawConcreteTex.repeat.set(4, 4);

    // 3. Procedural Vertical Wood Slat Texture (Walnut / Teak)
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 512;
    woodCanvas.height = 512;
    const wCtx = woodCanvas.getContext('2d');
    wCtx.fillStyle = '#3a2318';
    wCtx.fillRect(0, 0, 512, 512);
    for (let x = 0; x < 512; x += 16) {
      wCtx.fillStyle = '#26160e';
      wCtx.fillRect(x, 0, 2, 512);
      wCtx.fillStyle = '#4c2e1f';
      wCtx.fillRect(x + 2, 0, 14, 512);
    }
    const woodTex = new THREE.CanvasTexture(woodCanvas);
    woodTex.wrapS = THREE.RepeatWrapping;
    woodTex.wrapT = THREE.RepeatWrapping;
    woodTex.repeat.set(6, 1);

    // 4. Procedural Driveway Paver Texture
    const paverCanvas = document.createElement('canvas');
    paverCanvas.width = 512;
    paverCanvas.height = 512;
    const pCtx = paverCanvas.getContext('2d');
    pCtx.fillStyle = '#c7cbd1';
    pCtx.fillRect(0, 0, 512, 512);
    pCtx.strokeStyle = '#8f959e';
    pCtx.lineWidth = 3;
    for (let x = 0; x <= 512; x += 64) {
      pCtx.beginPath();
      pCtx.moveTo(x, 0); pCtx.lineTo(x, 512); pCtx.stroke();
    }
    for (let y = 0; y <= 512; y += 64) {
      pCtx.beginPath();
      pCtx.moveTo(0, y); pCtx.lineTo(512, y); pCtx.stroke();
    }
    const paverTex = new THREE.CanvasTexture(paverCanvas);
    paverTex.wrapS = THREE.RepeatWrapping;
    paverTex.wrapT = THREE.RepeatWrapping;
    paverTex.repeat.set(12, 12);

    // 5. Water Texture
    const waterCanvas = document.createElement('canvas');
    waterCanvas.width = 256;
    waterCanvas.height = 256;
    const wtCtx = waterCanvas.getContext('2d');
    const grad = wtCtx.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, '#06b6d4');
    grad.addColorStop(0.5, '#0891b2');
    grad.addColorStop(1, '#0e7490');
    wtCtx.fillStyle = grad;
    wtCtx.fillRect(0, 0, 256, 256);
    this.waterTexture = new THREE.CanvasTexture(waterCanvas);
    this.waterTexture.wrapS = THREE.RepeatWrapping;
    this.waterTexture.wrapT = THREE.RepeatWrapping;
    this.waterTexture.repeat.set(8, 8);

    // MATERIALS DEFINITION
    // Finished Architectural Materials (Render Mode)
    this.matWhiteConcrete = new THREE.MeshStandardMaterial({
      color: 0xf4f6f8,
      map: stuccoTex,
      roughness: 0.38,
      metalness: 0.04
    });

    this.matWoodCladding = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      map: woodTex,
      roughness: 0.6,
      metalness: 0.08
    });

    this.matBronzeGlass = new THREE.MeshPhysicalMaterial({
      color: 0x18202c,
      transparent: true,
      opacity: 0.65,
      roughness: 0.04,
      metalness: 0.15,
      transmission: 0.65,
      ior: 1.54,
      reflectivity: 0.95
    });

    this.matBalustradeGlass = new THREE.MeshPhysicalMaterial({
      color: 0xcffafe,
      transparent: true,
      opacity: 0.4,
      roughness: 0.02,
      transmission: 0.85,
      ior: 1.5
    });

    this.matPoolWater = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      map: this.waterTexture,
      transparent: true,
      opacity: 0.85,
      roughness: 0.06,
      metalness: 0.15,
      transmission: 0.55,
      ior: 1.333,
      reflectivity: 0.98
    });

    // Construction Site Materials (Site Mode)
    this.matRawConcrete = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      map: rawConcreteTex,
      roughness: 0.82,
      metalness: 0.1
    });

    this.matScaffoldSteel = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.35,
      metalness: 0.88
    });

    this.matShoringPiles = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.75,
      metalness: 0.65
    });

    this.matBurlap = new THREE.MeshStandardMaterial({
      color: 0xa87d4a,
      roughness: 0.95,
      metalness: 0.02
    });

    this.matDarkMetal = new THREE.MeshStandardMaterial({
      color: 0x14161b,
      roughness: 0.25,
      metalness: 0.88
    });

    this.matBrassGold = new THREE.MeshStandardMaterial({
      color: 0xe2ba52,
      roughness: 0.2,
      metalness: 0.92
    });

    this.matPoolTile = new THREE.MeshStandardMaterial({
      color: 0xa5f3fc,
      roughness: 0.15,
      metalness: 0.05
    });

    this.matPoolRibbon = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.1,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35
    });

    this.matDriveway = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      map: paverTex,
      roughness: 0.75,
      metalness: 0.05
    });

    this.matSand = new THREE.MeshStandardMaterial({
      color: 0xd97736,
      roughness: 0.98,
      metalness: 0.0
    });

    this.matGrass = new THREE.MeshStandardMaterial({
      color: 0x2e5016,
      roughness: 0.9,
      metalness: 0.0
    });

    this.matLedNeon = new THREE.MeshBasicMaterial({ color: 0xfff7ed });
    this.matLedGold = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    this.matLakeWater = new THREE.MeshPhysicalMaterial({
      color: 0x0c2f38,
      map: this.waterTexture,
      transparent: true,
      opacity: 0.88,
      roughness: 0.12,
      metalness: 0.25,
      transmission: 0.35
    });
  }

  buildAll() {
    this.buildTerrainAndWater();
    this.buildLowerGroundFloor();
    this.buildGroundFloor();
    this.buildFirstFloor();
    this.buildRoofFloor();
    this.buildCarportWing();
    this.buildSwimmingPool();
    this.buildPerimeterAndLandscaping();
    this.buildConstructionSiteAssets();
    this.buildVehicles();
    this.buildBIMGrid();

    // Set initial site state (defaults to 'site')
    this.setSiteState(this.siteState);
  }

  // ----------------------------------------------------
  // DUAL-STATE CONTROLLER: 'render' vs 'site'
  // ----------------------------------------------------
  setSiteState(state) {
    this.siteState = state === 'render' ? 'render' : 'site';
    const isRender = this.siteState === 'render';

    // 1. Toggle visibility of dedicated state groups
    this.renderModeGroup.visible = isRender;
    this.siteModeGroup.visible = !isRender;
    this.layers.construction.visible = !isRender;

    // 2. Swap materials on core facade meshes (White Stucco vs Raw Cured Concrete)
    const targetMat = isRender ? this.matWhiteConcrete : this.matRawConcrete;
    this.facadeMeshes.forEach(mesh => {
      mesh.material = targetMat;
    });

    // 3. Update active UI button states if present
    document.getElementById('btn-state-render')?.classList.toggle('active', isRender);
    document.getElementById('btn-state-site')?.classList.toggle('active', !isRender);

    console.log(`[JumeirahTwinAPI] Site State switched to: '${this.siteState}'`);
  }

  // ----------------------------------------------------
  // 1. TERRAIN, LAKE & FOUNDATION
  // ----------------------------------------------------
  buildTerrainAndWater() {
    const grp = this.layers.landscape;

    // Sand Ground Base (Exposed in Site Mode, partially covered in Render Mode)
    const siteGeo = new THREE.PlaneGeometry(84, 104);
    const siteMesh = new THREE.Mesh(siteGeo, this.matSand);
    siteMesh.rotation.x = -Math.PI / 2;
    siteMesh.receiveShadow = true;
    grp.add(siteMesh);

    // Lake Water along rear boundary
    const lakeGeo = new THREE.PlaneGeometry(160, 70, 32, 32);
    const lakeMesh = new THREE.Mesh(lakeGeo, this.matLakeWater);
    lakeMesh.rotation.x = -Math.PI / 2;
    lakeMesh.position.set(-20, -0.3, -62);
    lakeMesh.receiveShadow = true;
    grp.add(lakeMesh);
    this.waterMeshes.push(lakeMesh);

    // Lake Rip-Rap Rocks & Embankment
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85 });
    for (let i = 0; i < 24; i++) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8 + Math.random() * 0.9, 1), rockMat);
      rock.position.set(-45 + i * 3.5 + (Math.random() - 0.5) * 1.5, -0.1, -38 + (Math.random() - 0.5) * 2.0);
      rock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      rock.castShadow = true;
      grp.add(rock);
    }

    // Front Driveway Pavers
    const driveGeo = new THREE.PlaneGeometry(14, 40);
    const driveMesh = new THREE.Mesh(driveGeo, this.matDriveway);
    driveMesh.rotation.x = -Math.PI / 2;
    driveMesh.position.set(11, 0.05, 20);
    driveMesh.receiveShadow = true;
    grp.add(driveMesh);

    // Render Mode: Manicured Lawn Turf
    const turfGeo = new THREE.PlaneGeometry(14, 22);
    const turfMesh = new THREE.Mesh(turfGeo, this.matGrass);
    turfMesh.rotation.x = -Math.PI / 2;
    turfMesh.position.set(-9.5, 0.26, -23);
    turfMesh.receiveShadow = true;
    this.renderModeGroup.add(turfMesh);

    // Render Mode: Travertine Patio Deck Slab
    const rearPatioGeo = new THREE.BoxGeometry(34, 0.25, 28);
    const rearPatio = new THREE.Mesh(rearPatioGeo, this.matDriveway);
    rearPatio.position.set(0, 0.12, -23);
    rearPatio.receiveShadow = true;
    this.renderModeGroup.add(rearPatio);

    // Site Mode: Raw Excavated Sand Staging Area with Wheel Tracks
    const siteDeckGeo = new THREE.BoxGeometry(34, 0.25, 28);
    const siteDeck = new THREE.Mesh(siteDeckGeo, this.matSand);
    siteDeck.position.set(0, 0.12, -23);
    siteDeck.receiveShadow = true;
    this.siteModeGroup.add(siteDeck);
  }

  // ----------------------------------------------------
  // 2. LOWER GROUND (LG) & LIGHTWELL
  // ----------------------------------------------------
  buildLowerGroundFloor() {
    const lgGroup = this.floors.basement;
    lgGroup.position.set(-2, 0, 0);

    const basementGeo = new THREE.BoxGeometry(20, 3.8, 18);
    const basementBox = new THREE.Mesh(basementGeo, this.matRawConcrete);
    basementBox.position.set(0, -1.9, 0);
    basementBox.receiveShadow = true;
    lgGroup.add(basementBox);

    // Sunken Courtyard Lightwell Portal
    const lwGlass = new THREE.Mesh(new THREE.BoxGeometry(5.8, 3.4, 0.1), this.matBronzeGlass);
    lwGlass.position.set(-2, -2.0, 7.0);
    lgGroup.add(lwGlass);

    // Uplighting in Lightwell
    const lgLed = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.06, 0.06), this.matLedGold);
    lgLed.position.set(-2, -3.6, 6.9);
    lgGroup.add(lgLed);
  }

  // ----------------------------------------------------
  // 3. GROUND FLOOR (GF) - FOYER, KHUTOOT WALL & LIVING
  // ----------------------------------------------------
  buildGroundFloor() {
    const gfGroup = this.floors.ground;
    gfGroup.position.set(-2, 0, 0);

    // Ground Floor Foundation Slab
    const slabGeo = new THREE.BoxGeometry(20, 0.4, 18);
    const slab = new THREE.Mesh(slabGeo, this.matRawConcrete);
    slab.position.set(0, 0.2, 0);
    slab.receiveShadow = true;
    gfGroup.add(slab);

    // Ground Floor Core (Dynamic Facade Material)
    const gfCoreGeo = new THREE.BoxGeometry(18.2, 4.2, 16.2);
    const gfCore = new THREE.Mesh(gfCoreGeo, this.matRawConcrete);
    gfCore.position.set(0, 2.3, 0);
    gfCore.castShadow = true;
    gfCore.receiveShadow = true;
    gfGroup.add(gfCore);
    this.facadeMeshes.push(gfCore);

    // Double-Height Portal Entrance Glass
    const entryGlass = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 4.0), this.matBronzeGlass);
    entryGlass.position.set(1.5, 2.3, 8.15);
    gfGroup.add(entryGlass);

    const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(6.7, 4.1, 0.2), this.matDarkMetal);
    frameMesh.position.set(1.5, 2.3, 8.1);
    gfGroup.add(frameMesh);

    // KHUTOOT ARABIC CALLIGRAPHY WALL (CAM-09)
    const khutootGroup = new THREE.Group();
    khutootGroup.position.set(-1.0, 2.4, 3.5);

    const khBack = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.6, 0.2), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 }));
    khutootGroup.add(khBack);

    for (let i = 0; i < 9; i++) {
      const h = 0.8 + (i % 4) * 0.6;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, h, 0.08), this.matBrassGold);
      bar.position.set(-2.0 + i * 0.5, (i % 2 === 0 ? 0.3 : -0.4), 0.15);
      bar.castShadow = true;
      khutootGroup.add(bar);
    }
    const crossBar = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.1, 0.08), this.matBrassGold);
    crossBar.position.set(0, 0.1, 0.16);
    khutootGroup.add(crossBar);

    const khLed = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.06, 0.06), this.matLedGold);
    khLed.position.set(0, -1.75, 0.2);
    khutootGroup.add(khLed);
    gfGroup.add(khutootGroup);

    // Render Mode Only: Chandelier & Luxury Furniture
    const chandelierGrp = new THREE.Group();
    chandelierGrp.position.set(1.5, 3.8, 4.5);
    [1.2, 0.8, 0.4].forEach((r, idx) => {
      const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(r, 0.025, 8, 32), this.matLedGold);
      ringMesh.rotation.x = Math.PI / 2 + idx * 0.1;
      ringMesh.position.y = -idx * 0.3;
      chandelierGrp.add(ringMesh);
    });
    this.renderModeGroup.add(chandelierGrp);

    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.5, 2.4), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 }));
    sofaBase.position.set(3.0, 0.65, -3.0);
    this.renderModeGroup.add(sofaBase);

    // Ground Floor Rear Glass
    const gfRearGlass = new THREE.Mesh(new THREE.PlaneGeometry(17.4, 3.8), this.matBronzeGlass);
    gfRearGlass.rotation.y = Math.PI;
    gfRearGlass.position.set(0, 2.3, -8.15);
    gfGroup.add(gfRearGlass);
  }

  // ----------------------------------------------------
  // 4. FIRST FLOOR (FF) - MASTER SUITE & BEDROOMS
  // ----------------------------------------------------
  buildFirstFloor() {
    const f1Group = this.floors.first;
    f1Group.position.set(-2, 0, 0);

    // Cantilevered First Floor Concrete Slab
    const slab1 = new THREE.Mesh(new THREE.BoxGeometry(20.8, 0.8, 19.6), this.matRawConcrete);
    slab1.position.set(0, 4.8, 0.5);
    slab1.castShadow = true;
    slab1.receiveShadow = true;
    f1Group.add(slab1);
    this.facadeMeshes.push(slab1);

    // First Floor Outer Enclosure (Dynamic Facade Mesh)
    const f1Wall = new THREE.Mesh(new THREE.BoxGeometry(20.0, 4.2, 17.8), this.matRawConcrete);
    f1Wall.position.set(0, 7.3, 0.2);
    f1Wall.castShadow = true;
    f1Group.add(f1Wall);
    this.facadeMeshes.push(f1Wall);

    // Glazing Suites
    const f1FrontGlass = new THREE.Mesh(new THREE.BoxGeometry(18.6, 3.4, 0.1), this.matBronzeGlass);
    f1FrontGlass.position.set(0, 7.2, 9.15);
    f1Group.add(f1FrontGlass);

    const f1RearGlass = new THREE.Mesh(new THREE.BoxGeometry(18.6, 3.4, 0.1), this.matBronzeGlass);
    f1RearGlass.position.set(0, 7.2, -8.75);
    f1Group.add(f1RearGlass);

    // Render Mode: Glass Balustrades
    const bal1Front = new THREE.Mesh(new THREE.BoxGeometry(19.2, 1.1, 0.08), this.matBalustradeGlass);
    bal1Front.position.set(-2, 5.75, 10.1);
    this.renderModeGroup.add(bal1Front);

    const bal1Rear = new THREE.Mesh(new THREE.BoxGeometry(19.2, 1.1, 0.08), this.matBalustradeGlass);
    bal1Rear.position.set(-2, 5.75, -9.75);
    this.renderModeGroup.add(bal1Rear);

    // Site Mode: Construction Timber Edge Protection & Guardrails
    const railMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.5 }); // Safety yellow
    const siteRailFront = new THREE.Mesh(new THREE.BoxGeometry(19.2, 1.0, 0.06), railMat);
    siteRailFront.position.set(-2, 5.75, 10.1);
    this.siteModeGroup.add(siteRailFront);

    const siteRailRear = new THREE.Mesh(new THREE.BoxGeometry(19.2, 1.0, 0.06), railMat);
    siteRailRear.position.set(-2, 5.75, -9.75);
    this.siteModeGroup.add(siteRailRear);

    // Side Facade Louvers
    for (let i = 0; i < 10; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.12, 5.8, 0.38), this.matDarkMetal);
      louver.position.set(10.1, 7.7, -4.5 + i * 1.05);
      louver.castShadow = true;
      f1Group.add(louver);
    }
  }

  // ----------------------------------------------------
  // 5. ROOF LEVEL (R)
  // ----------------------------------------------------
  buildRoofFloor() {
    const roofGroup = this.floors.roof;
    roofGroup.position.set(-2, 0, 0);

    const slab2 = new THREE.Mesh(new THREE.BoxGeometry(20.6, 0.8, 18.8), this.matRawConcrete);
    slab2.position.set(0, 9.8, 0.2);
    slab2.castShadow = true;
    roofGroup.add(slab2);
    this.facadeMeshes.push(slab2);

    const f2Glass = new THREE.Mesh(new THREE.BoxGeometry(18.6, 3.2, 16.8), this.matBronzeGlass);
    f2Glass.position.set(0, 11.8, 0.2);
    roofGroup.add(f2Glass);

    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(21.8, 0.9, 20.4), this.matRawConcrete);
    roofSlab.position.set(0, 13.85, 0.2);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    roofGroup.add(roofSlab);
    this.facadeMeshes.push(roofSlab);

    // Rooftop Louvered Pergola
    const pergolaGrp = new THREE.Group();
    pergolaGrp.position.set(-3.0, 14.4, 0);
    for (let i = 0; i < 8; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.15, 0.35), this.matDarkMetal);
      louver.position.set(0, 0.8, -4 + i * 1.15);
      pergolaGrp.add(louver);
    }
    roofGroup.add(pergolaGrp);
  }

  // ----------------------------------------------------
  // 6. CARPORT WING
  // ----------------------------------------------------
  buildCarportWing() {
    const grp = this.layers.arch;
    const carportGrp = new THREE.Group();
    carportGrp.position.set(13.5, 0, 6.0);

    const canopyMesh = new THREE.Mesh(new THREE.BoxGeometry(13.6, 0.8, 15.6), this.matRawConcrete);
    canopyMesh.position.set(0, 4.8, 0);
    canopyMesh.castShadow = true;
    canopyMesh.receiveShadow = true;
    carportGrp.add(canopyMesh);
    this.facadeMeshes.push(canopyMesh);

    for (let i = 0; i < 7; i++) {
      const slotMesh = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.25, 0.45), this.matDarkMetal);
      slotMesh.position.set(-1.5, 4.6, -4.8 + i * 1.6);
      carportGrp.add(slotMesh);
    }

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(13.4, 4.4, 0.4), this.matDarkMetal);
    backWall.position.set(0, 2.2, -7.5);
    carportGrp.add(backWall);

    grp.add(carportGrp);
  }

  // ----------------------------------------------------
  // 7. SWIMMING POOL & WATERFALL
  // ----------------------------------------------------
  buildSwimmingPool() {
    const grp = this.layers.pool;
    const poolGrp = new THREE.Group();
    poolGrp.position.set(6.0, 0, -23.0);

    // Concrete Basin Shell
    const basin = new THREE.Mesh(new THREE.BoxGeometry(12.0, 2.2, 17.0), this.matPoolTile);
    basin.position.set(0, -1.0, 0);
    poolGrp.add(basin);

    // RENDER MODE: Finished Water, Waterfall & Sunken Fire Pit Lounge
    const renderPoolElements = new THREE.Group();

    // Pool Water Surface
    const waterMesh = new THREE.Mesh(new THREE.PlaneGeometry(11.4, 16.4, 32, 32), this.matPoolWater);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, 0.06, 0);
    renderPoolElements.add(waterMesh);
    this.waterMeshes.push(waterMesh);

    // Waterfall Feature
    const waterfallBlade = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 0.4), this.matDarkMetal);
    waterfallBlade.position.set(-1.0, 3.4, 8.0);
    renderPoolElements.add(waterfallBlade);

    const waterSheet = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.3), new THREE.MeshPhysicalMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.72,
      transmission: 0.85
    }));
    waterSheet.position.set(-1.0, 1.7, 8.0);
    renderPoolElements.add(waterSheet);

    // Sunken Fire Pit Lounge
    const firePitGrp = new THREE.Group();
    firePitGrp.position.set(-8.5, 0, 0);
    const loungeBasin = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.2, 1.2, 24), this.matWhiteConcrete);
    loungeBasin.position.y = -0.55;
    firePitGrp.add(loungeBasin);

    const benchMesh = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.35, 8, 24), new THREE.MeshStandardMaterial({ color: 0x334155 }));
    benchMesh.rotation.x = Math.PI / 2;
    benchMesh.position.y = -0.3;
    firePitGrp.add(benchMesh);

    const flameGlow = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
    flameGlow.position.y = -0.05;
    firePitGrp.add(flameGlow);
    renderPoolElements.add(firePitGrp);

    this.renderModeGroup.add(renderPoolElements);

    // SITE MODE: Dewatering Pipes & Excavation Shell
    const sitePoolElements = new THREE.Group();
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 }); // Blue dewatering pipes
    for (let p = 0; p < 4; p++) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 14, 8), pipeMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(-3 + p * 2.2, -0.6, 0);
      sitePoolElements.add(pipe);
    }
    this.siteModeGroup.add(sitePoolElements);

    grp.add(poolGrp);
  }

  // ----------------------------------------------------
  // 8. PERIMETER BOUNDARY WALLS & PALM TREES
  // ----------------------------------------------------
  buildPerimeterAndLandscaping() {
    const grp = this.layers.landscape;

    // Boundary Walls
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.4, 78), this.matRawConcrete);
    leftWall.position.set(-25, 1.7, 0);
    leftWall.castShadow = true;
    grp.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.4, 78), this.matRawConcrete);
    rightWall.position.set(25, 1.7, 0);
    rightWall.castShadow = true;
    grp.add(rightWall);

    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(22, 2.8, 0.5), this.matRawConcrete);
    frontWallLeft.position.set(-14, 1.4, 38);
    grp.add(frontWallLeft);

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(16, 2.8, 0.5), this.matRawConcrete);
    frontWallRight.position.set(17, 1.4, 38);
    grp.add(frontWallRight);

    // Neighboring Villas (Typology massing)
    const neighborLeft = new THREE.Mesh(new THREE.BoxGeometry(22, 11, 26), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 }));
    neighborLeft.position.set(-42, 5.5, -4);
    grp.add(neighborLeft);

    const neighborRight = new THREE.Mesh(new THREE.BoxGeometry(24, 10, 28), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 }));
    neighborRight.position.set(44, 5.0, -8);
    grp.add(neighborRight);

    // Palm Tree Coordinates
    const palmPositions = [
      { x: -18, z: 32, scale: 1.15 },
      { x: -10, z: 34, scale: 1.25 },
      { x: -3, z: 35, scale: 1.18 },
      { x: 18, z: 33, scale: 1.05 },
      { x: 22, z: 27, scale: 1.12 },
      { x: -20, z: -30, scale: 1.3 },
      { x: -12, z: -34, scale: 1.25 },
      { x: 18, z: -32, scale: 1.15 }
    ];

    palmPositions.forEach(p => {
      this.createPalmTree(p.x, p.z, p.scale, grp);
    });
  }

  createPalmTree(x, z, scale, parent) {
    const palmGrp = new THREE.Group();
    palmGrp.position.set(x, 0, z);
    palmGrp.scale.set(scale, scale, scale);

    const trunkSegments = 10;
    const trunkHeight = 7.8;
    const matTrunk = new THREE.MeshStandardMaterial({ color: 0x3d291e, roughness: 0.9 });
    const matRing = new THREE.MeshStandardMaterial({ color: 0x271912, roughness: 0.95 });

    for (let i = 0; i < trunkSegments; i++) {
      const segH = trunkHeight / trunkSegments;
      const segGeo = new THREE.CylinderGeometry(0.44 - (i * 0.02), 0.46 - (i * 0.02), segH, 12);
      const seg = new THREE.Mesh(segGeo, i % 2 === 0 ? matTrunk : matRing);
      seg.position.set(Math.sin(i * 0.22) * 0.22, (i + 0.5) * segH, Math.cos(i * 0.22) * 0.12);
      seg.castShadow = true;
      palmGrp.add(seg);
    }

    // Top Collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 0.8, 12), new THREE.MeshStandardMaterial({ color: 0x2d4a1d, roughness: 0.7 }));
    collar.position.set(0.2, trunkHeight + 0.3, 0.1);
    palmGrp.add(collar);

    // RENDER MODE: Fully Open Lush Palm Fronds
    const renderFronds = new THREE.Group();
    const matFrond = new THREE.MeshStandardMaterial({ color: 0x1e4620, roughness: 0.65, side: THREE.DoubleSide });

    const frondTiers = [
      { count: 7, radius: 4.8, yAngle: 0.6, droop: 0.75, length: 5.6, yOffset: 0.4 },
      { count: 6, radius: 4.2, yAngle: 0.4, droop: 0.55, length: 4.9, yOffset: 0.65 }
    ];

    frondTiers.forEach((tier) => {
      for (let i = 0; i < tier.count; i++) {
        const baseAngle = (i / tier.count) * Math.PI * 2;
        const frondCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.cos(baseAngle) * (tier.length * 0.4), tier.yAngle * 1.5, Math.sin(baseAngle) * (tier.length * 0.4)),
          new THREE.Vector3(Math.cos(baseAngle) * (tier.length * 0.75), tier.yAngle * 1.2 - tier.droop * 0.8, Math.sin(baseAngle) * (tier.length * 0.75)),
          new THREE.Vector3(Math.cos(baseAngle) * tier.length, -tier.droop * 2.2, Math.sin(baseAngle) * tier.length)
        ]);

        const spineMesh = new THREE.Mesh(new THREE.TubeGeometry(frondCurve, 10, 0.06, 6, false), matFrond);
        spineMesh.position.set(0.2, trunkHeight + tier.yOffset, 0.1);
        spineMesh.castShadow = true;
        renderFronds.add(spineMesh);

        const bladeMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.68, tier.length * 0.85, 3, 6), matFrond);
        bladeMesh.position.set(0.2 + Math.cos(baseAngle) * (tier.length * 0.45), trunkHeight + tier.yOffset, 0.1 + Math.sin(baseAngle) * (tier.length * 0.45));
        bladeMesh.rotation.y = -baseAngle + Math.PI / 2;
        bladeMesh.rotation.x = Math.PI / 3;
        bladeMesh.castShadow = true;
        renderFronds.add(bladeMesh);
      }
    });
    this.renderModeGroup.add(renderFronds);
    renderFronds.position.set(x, 0, z);
    renderFronds.scale.set(scale, scale, scale);

    // SITE MODE: Burlap Wrapped Palm Frond Bundle (Matches Oct 2026 Site Photos)
    const siteFrondBundle = new THREE.Group();
    const burlapWrap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 3.8, 12), this.matBurlap);
    burlapWrap.position.set(0.2, trunkHeight + 1.8, 0.1);
    burlapWrap.castShadow = true;
    siteFrondBundle.add(burlapWrap);

    // Tie Ropes
    for (let r = 0; r < 3; r++) {
      const rope = new THREE.Mesh(new THREE.TorusGeometry(0.65 - r * 0.05, 0.03, 6, 16), new THREE.MeshStandardMaterial({ color: 0x332211 }));
      rope.rotation.x = Math.PI / 2;
      rope.position.set(0.2, trunkHeight + 0.8 + r * 1.0, 0.1);
      siteFrondBundle.add(rope);
    }
    this.siteModeGroup.add(siteFrondBundle);
    siteFrondBundle.position.set(x, 0, z);
    siteFrondBundle.scale.set(scale, scale, scale);

    parent.add(palmGrp);
  }

  // ----------------------------------------------------
  // 9. CONSTRUCTION SITE ASSETS (SITE MODE ONLY)
  // ----------------------------------------------------
  buildConstructionSiteAssets() {
    const grp = this.layers.construction;

    // West Side Full Scaffolding Towers (CAM-01 / CAM-02)
    this.createScaffoldTower(-23, 0, -8, 6, 11, grp);
    this.createScaffoldTower(-23, 0, 8, 4, 9, grp);

    // Rear Lake Edge Sheet Piling & Shoring Walls (CAM-06: Exterior Rear Elevation Shoring)
    const shoringGrp = new THREE.Group();
    for (let i = 0; i < 35; i++) {
      const pile = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.5, 0.2), this.matShoringPiles);
      pile.position.set(-35 + i * 1.2, 0.8, -36);
      pile.castShadow = true;
      shoringGrp.add(pile);
    }
    grp.add(shoringGrp);

    // Side Ramp Shoring Pathway (CAM-07: Exterior Rear Elevation Ramp)
    const rampMesh = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.2, 18), this.matSand);
    rampMesh.position.set(-23, 0.6, -24);
    rampMesh.rotation.x = 0.06;
    grp.add(rampMesh);

    // Staged Scaffolding Steel Pipes
    const pileGeo = new THREE.CylinderGeometry(0.04, 0.04, 5.5, 6);
    for (let i = 0; i < 22; i++) {
      const pole = new THREE.Mesh(pileGeo, this.matScaffoldSteel);
      pole.position.set(2 + (Math.random() - 0.5) * 4, 0.1 + i * 0.04, 18 + (Math.random() - 0.5) * 3);
      pole.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      pole.rotation.z = (Math.random() - 0.5) * 0.4;
      grp.add(pole);
    }

    // Survey Theodolite Total Station with Red Alignment Laser
    const tripodGrp = new THREE.Group();
    tripodGrp.position.set(-7, 0, 24);
    const legGeo = new THREE.CylinderGeometry(0.02, 0.03, 1.6, 6);
    const matTripod = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4, metalness: 0.8 });
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const leg = new THREE.Mesh(legGeo, matTripod);
      leg.position.set(Math.cos(angle) * 0.35, 0.8, Math.sin(angle) * 0.35);
      leg.rotation.z = Math.cos(angle) * 0.25;
      leg.rotation.x = Math.sin(angle) * 0.25;
      tripodGrp.add(leg);
    }
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.3, 0.2), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 }));
    head.position.y = 1.65;
    tripodGrp.add(head);

    const laser = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 16, 6), new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.8 }));
    laser.rotation.x = Math.PI / 2;
    laser.position.set(0.8, 1.7, -8);
    tripodGrp.add(laser);
    grp.add(tripodGrp);

    // Safety Warning Cones along Driveway
    const coneGeo = new THREE.ConeGeometry(0.22, 0.75, 12);
    const matCone = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.3 });
    [[4, 25], [4, 28], [4, 31], [4, 34]].forEach(cp => {
      const c = new THREE.Mesh(coneGeo, matCone);
      c.position.set(cp[0], 0.375, cp[1]);
      c.castShadow = true;
      grp.add(c);
    });
  }

  createScaffoldTower(x, y, z, width, height, parent) {
    const tower = new THREE.Group();
    tower.position.set(x, y, z);

    const pipeGeo = new THREE.CylinderGeometry(0.04, 0.04, height, 6);
    [[-width / 2, -1.2], [width / 2, -1.2], [-width / 2, 1.2], [width / 2, 1.2]].forEach(off => {
      const p = new THREE.Mesh(pipeGeo, this.matScaffoldSteel);
      p.position.set(off[0], height / 2, off[1]);
      tower.add(p);
    });

    for (let h = 2; h < height; h += 2) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, 2.2), new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.9 }));
      plank.position.set(0, h, 0);
      tower.add(plank);
    }

    parent.add(tower);
  }

  // ----------------------------------------------------
  // 10. VEHICLES
  // ----------------------------------------------------
  buildVehicles() {
    const grp = this.layers.vehicles;

    // Site Mode: Contractor Supply Flatbed Truck (CAM-04)
    const truckGrp = new THREE.Group();
    truckGrp.position.set(11, 0, 18);
    truckGrp.rotation.y = -Math.PI * 0.05;

    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 2.4), new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.35 }));
    cab.position.set(0, 1.4, 2.0);
    truckGrp.add(cab);

    const bed = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 3.8), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 }));
    bed.position.set(0, 1.0, -1.0);
    truckGrp.add(bed);

    const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 12);
    const matWheel = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    [[-1.2, 1.5], [1.2, 1.5], [-1.2, -1.8], [1.2, -1.8]].forEach(wp => {
      const w = new THREE.Mesh(wheelGeo, matWheel);
      w.rotation.z = Math.PI / 2;
      w.position.set(wp[0], 0.45, wp[1]);
      truckGrp.add(w);
    });
    this.siteModeGroup.add(truckGrp);

    // Render Mode: Luxury Modern SUV in Carport
    const carGrp = new THREE.Group();
    carGrp.position.set(14.5, 0, 5.0);
    carGrp.rotation.y = Math.PI * 0.95;

    const carBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.95, 4.9), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.15, metalness: 0.85 }));
    carBody.position.set(0, 0.75, 0);
    carGrp.add(carBody);

    const carTop = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.65, 2.6), this.matBronzeGlass);
    carTop.position.set(0, 1.38, -0.2);
    carGrp.add(carTop);
    this.renderModeGroup.add(carGrp);
  }

  // ----------------------------------------------------
  // 11. BIM GRID & AXES
  // ----------------------------------------------------
  buildBIMGrid() {
    const grp = this.layers.grid;
    const gridHelper = new THREE.GridHelper(100, 50, 0x0284c7, 0x1e293b);
    gridHelper.position.y = 0.02;
    if (gridHelper.material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.25;
    }
    grp.add(gridHelper);

    const axes = new THREE.AxesHelper(4);
    axes.position.set(0, 0.08, 0);
    grp.add(axes);
  }

  // ----------------------------------------------------
  // ANIMATION LOOP UPDATES (DYNAMIC WATER RIPPLE)
  // ----------------------------------------------------
  update(time) {
    this.waterTime = time * 0.0015;
    if (this.waterTexture) {
      this.waterTexture.offset.x = (this.waterTime * 0.05) % 1;
      this.waterTexture.offset.y = (this.waterTime * 0.08) % 1;
    }
  }

  // ----------------------------------------------------
  // BIM EXPLODED AXONOMETRIC & FLOOR ISOLATION
  // ----------------------------------------------------
  setLayerVisibility(layerName, visible) {
    if (this.layers[layerName]) {
      this.layers[layerName].visible = visible;
    }
  }

  setWireframeMode(enabled) {
    const applyWireframe = (obj) => {
      if (obj.isMesh && obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.wireframe = enabled);
        } else {
          obj.material.wireframe = enabled;
        }
      }
      if (obj.children) {
        obj.children.forEach(applyWireframe);
      }
    };

    applyWireframe(this.layers.arch);
    applyWireframe(this.layers.pool);
    applyWireframe(this.layers.landscape);
  }

  isolateFloor(floorName) {
    if (floorName === 'all') {
      this.floors.basement.visible = true;
      this.floors.ground.visible = true;
      this.floors.first.visible = true;
      this.floors.roof.visible = true;
    } else {
      this.floors.basement.visible = floorName === 'basement';
      this.floors.ground.visible = floorName === 'ground';
      this.floors.first.visible = floorName === 'first';
      this.floors.roof.visible = floorName === 'roof';
    }
  }

  setExplodeBIM(enable) {
    this.isExploded = enable;
    const targetFactor = enable ? 1.0 : 0.0;
    
    if (typeof TWEEN !== 'undefined') {
      new TWEEN.Tween({ f: this.explodeFactor })
        .to({ f: targetFactor }, 1200)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate((obj) => {
          this.explodeFactor = obj.f;
          this.floors.roof.position.y = this.explodeFactor * 10.0;
          this.floors.first.position.y = this.explodeFactor * 5.0;
          this.floors.ground.position.y = 0;
          this.floors.basement.position.y = -this.explodeFactor * 3.5;
        })
        .start();
    } else {
      this.explodeFactor = targetFactor;
      this.floors.roof.position.y = this.explodeFactor * 10.0;
      this.floors.first.position.y = this.explodeFactor * 5.0;
      this.floors.ground.position.y = 0;
      this.floors.basement.position.y = -this.explodeFactor * 3.5;
    }
  }
}

window.VillaModelBuilder = VillaModelBuilder;
