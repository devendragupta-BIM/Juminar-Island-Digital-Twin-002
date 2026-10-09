/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - LUXURY PROCEDURAL BIM MODEL BUILDER
 * Generates custom PBR architectural textures, realistic materials, dynamic pool water,
 * and high-fidelity villa elements matching ONIX Engineering drawings & site captures.
 */

class VillaModelBuilder {
  constructor(scene) {
    this.scene = scene;
    
    // BIM Layer Groups
    this.layers = {
      arch: new THREE.Group(),
      pool: new THREE.Group(),
      landscape: new THREE.Group(),
      construction: new THREE.Group(),
      vehicles: new THREE.Group(),
      grid: new THREE.Group()
    };
    
    // Floor Level Groups for Level Isolation (Ground, First, Roof)
    this.floors = {
      ground: new THREE.Group(),
      first: new THREE.Group(),
      roof: new THREE.Group()
    };
    
    // Add floors to architectural layer
    this.layers.arch.add(this.floors.ground);
    this.layers.arch.add(this.floors.first);
    this.layers.arch.add(this.floors.roof);

    // Add all layers to main scene
    Object.values(this.layers).forEach(layer => this.scene.add(layer));
    
    // Generate Procedural Textures & Materials
    this.initTexturesAndMaterials();
  }

  // ----------------------------------------------------
  // PROCEDURAL TEXTURE GENERATION (Crisp, High-End Details)
  // ----------------------------------------------------
  initTexturesAndMaterials() {
    // 1. Procedural Concrete / Stucco Texture with micro-grain
    const stuccoCanvas = document.createElement('canvas');
    stuccoCanvas.width = 512;
    stuccoCanvas.height = 512;
    const sCtx = stuccoCanvas.getContext('2d');
    sCtx.fillStyle = '#f8fafc';
    sCtx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 40000; i++) {
      const v = Math.floor(Math.random() * 25);
      sCtx.fillStyle = `rgba(0,0,0,${v / 500})`;
      sCtx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
    const stuccoTex = new THREE.CanvasTexture(stuccoCanvas);
    stuccoTex.wrapS = THREE.RepeatWrapping;
    stuccoTex.wrapT = THREE.RepeatWrapping;
    stuccoTex.repeat.set(4, 4);

    // 2. Procedural Vertical Wood Slat Texture (Walnut / Teak)
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 512;
    woodCanvas.height = 512;
    const wCtx = woodCanvas.getContext('2d');
    wCtx.fillStyle = '#3a2318';
    wCtx.fillRect(0, 0, 512, 512);
    // Draw wood grain stripes
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

    // 3. Procedural Modern Driveway Paver Joint Texture
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
      pCtx.moveTo(x, 0);
      pCtx.lineTo(x, 512);
      pCtx.stroke();
    }
    for (let y = 0; y <= 512; y += 64) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(512, y);
      pCtx.stroke();
    }
    const paverTex = new THREE.CanvasTexture(paverCanvas);
    paverTex.wrapS = THREE.RepeatWrapping;
    paverTex.wrapT = THREE.RepeatWrapping;
    paverTex.repeat.set(12, 12);

    // Materials Definition
    this.matWhiteConcrete = new THREE.MeshStandardMaterial({
      color: 0xf4f6f8,
      map: stuccoTex,
      roughness: 0.38,
      metalness: 0.04
    });

    this.matWallConcrete = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      roughness: 0.55,
      metalness: 0.02
    });

    this.matWoodCladding = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      map: woodTex,
      roughness: 0.6,
      metalness: 0.08
    });

    this.matDarkMetal = new THREE.MeshStandardMaterial({
      color: 0x14161b,
      roughness: 0.25,
      metalness: 0.88
    });

    this.matBronzeGlass = new THREE.MeshPhysicalMaterial({
      color: 0x18202c,
      transparent: true,
      opacity: 0.68,
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
      transparent: true,
      opacity: 0.84,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.45,
      ior: 1.333,
      reflectivity: 0.98
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
      emissiveIntensity: 0.3
    });

    this.matDriveway = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      map: paverTex,
      roughness: 0.75,
      metalness: 0.05
    });

    this.matSand = new THREE.MeshStandardMaterial({
      color: 0xdd7a39,
      roughness: 0.98,
      metalness: 0.0
    });

    this.matGrass = new THREE.MeshStandardMaterial({
      color: 0x3a5a14,
      roughness: 0.9,
      metalness: 0.0
    });

    this.matLedNeon = new THREE.MeshBasicMaterial({
      color: 0xfff7ed
    });

    this.matLakeWater = new THREE.MeshPhysicalMaterial({
      color: 0x0c2f38,
      transparent: true,
      opacity: 0.88,
      roughness: 0.12,
      metalness: 0.2,
      transmission: 0.35
    });

    this.matScaffoldSteel = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.35,
      metalness: 0.85
    });
  }

  buildAll() {
    this.buildTerrainAndWater();
    this.buildVillaArchitecture();
    this.buildCarportWing();
    this.buildSwimmingPool();
    this.buildPerimeterAndLandscaping();
    this.buildConstructionSiteAssets();
    this.buildVehicles();
    this.buildBIMGrid();
  }

  // ----------------------------------------------------
  // 1. TERRAIN, LAKE & SITE FOUNDATION
  // ----------------------------------------------------
  buildTerrainAndWater() {
    const grp = this.layers.landscape;

    // Site Sand Ground
    const siteGeo = new THREE.PlaneGeometry(80, 100);
    const siteMesh = new THREE.Mesh(siteGeo, this.matSand);
    siteMesh.rotation.x = -Math.PI / 2;
    siteMesh.position.set(0, 0, 0);
    siteMesh.receiveShadow = true;
    grp.add(siteMesh);

    // Lake Water along rear boundary
    const lakeGeo = new THREE.PlaneGeometry(160, 70);
    const lakeMesh = new THREE.Mesh(lakeGeo, this.matLakeWater);
    lakeMesh.rotation.x = -Math.PI / 2;
    lakeMesh.position.set(-20, -0.3, -62);
    grp.add(lakeMesh);

    // Lake Reeds & Embankment
    const reedGeo = new THREE.BoxGeometry(80, 0.8, 5);
    const matReed = new THREE.MeshStandardMaterial({ color: 0x244211, roughness: 0.9 });
    const reedMesh = new THREE.Mesh(reedGeo, matReed);
    reedMesh.position.set(-15, 0.2, -38);
    grp.add(reedMesh);

    // Front Driveway Pavers
    const driveGeo = new THREE.PlaneGeometry(14, 40);
    const driveMesh = new THREE.Mesh(driveGeo, this.matDriveway);
    driveMesh.rotation.x = -Math.PI / 2;
    driveMesh.position.set(11, 0.05, 20);
    driveMesh.receiveShadow = true;
    grp.add(driveMesh);

    // Front Entry Stepping Stones
    for (let i = 0; i < 6; i++) {
      const stepGeo = new THREE.BoxGeometry(2.4, 0.12, 1.8);
      const stepMesh = new THREE.Mesh(stepGeo, this.matDriveway);
      stepMesh.position.set(-6, 0.06, 11 + i * 2.8);
      stepMesh.receiveShadow = true;
      grp.add(stepMesh);
    }

    // Rear Patio Deck Slab
    const rearPatioGeo = new THREE.BoxGeometry(34, 0.25, 28);
    const rearPatio = new THREE.Mesh(rearPatioGeo, this.matDriveway);
    rearPatio.position.set(0, 0.12, -23);
    rearPatio.receiveShadow = true;
    grp.add(rearPatio);

    // Rear Green Lawn Area
    const turfGeo = new THREE.PlaneGeometry(14, 22);
    const turfMesh = new THREE.Mesh(turfGeo, this.matGrass);
    turfMesh.rotation.x = -Math.PI / 2;
    turfMesh.position.set(-9.5, 0.26, -23);
    turfMesh.receiveShadow = true;
    grp.add(turfMesh);
  }

  // ----------------------------------------------------
  // 2. VILLA ARCHITECTURE (GROUND, FIRST, ROOF LEVELS)
  // ----------------------------------------------------
  buildVillaArchitecture() {
    const villaBase = new THREE.Group();
    villaBase.position.set(-2, 0, 0);

    // ====== GROUND FLOOR LEVEL ======
    const gfGroup = this.floors.ground;
    
    // Ground Floor Core
    const gfCoreGeo = new THREE.BoxGeometry(18, 4.2, 16);
    const gfCore = new THREE.Mesh(gfCoreGeo, this.matWoodCladding);
    gfCore.position.set(0, 2.1, 0);
    gfCore.castShadow = true;
    gfCore.receiveShadow = true;
    gfGroup.add(gfCore);

    // Ground Floor Front Recessed Glass Entrance (Double-height portal)
    const entryGlassGeo = new THREE.PlaneGeometry(6.5, 4.0);
    const entryGlass = new THREE.Mesh(entryGlassGeo, this.matBronzeGlass);
    entryGlass.position.set(1.5, 2.1, 8.05);
    gfGroup.add(entryGlass);

    const frameGeo = new THREE.BoxGeometry(6.6, 4.1, 0.2);
    const frameMesh = new THREE.Mesh(frameGeo, this.matDarkMetal);
    frameMesh.position.set(1.5, 2.1, 8.0);
    gfGroup.add(frameMesh);

    // Ground Floor Front Left Living Room Glass
    const gfFrontGlassGeo = new THREE.PlaneGeometry(7.5, 3.8);
    const gfFrontGlass = new THREE.Mesh(gfFrontGlassGeo, this.matBronzeGlass);
    gfFrontGlass.position.set(-5.0, 2.1, 8.05);
    gfGroup.add(gfFrontGlass);

    // Ground Floor Rear Patio Glass
    const gfRearGlassGeo = new THREE.PlaneGeometry(17, 3.8);
    const gfRearGlass = new THREE.Mesh(gfRearGlassGeo, this.matBronzeGlass);
    gfRearGlass.rotation.y = Math.PI;
    gfRearGlass.position.set(0, 2.1, -8.05);
    gfGroup.add(gfRearGlass);

    // ====== FIRST FLOOR LEVEL ======
    const f1Group = this.floors.first;

    // Cantilevered First Floor Slab
    const slab1Geo = new THREE.BoxGeometry(20.4, 0.8, 19.2);
    const slab1 = new THREE.Mesh(slab1Geo, this.matWhiteConcrete);
    slab1.position.set(0, 4.6, 0.5);
    slab1.castShadow = true;
    slab1.receiveShadow = true;
    f1Group.add(slab1);

    // First Floor Outer Enclosure
    const f1WallGeo = new THREE.BoxGeometry(19.8, 4.2, 17.6);
    const f1Wall = new THREE.Mesh(f1WallGeo, this.matWhiteConcrete);
    f1Wall.position.set(0, 7.1, 0.2);
    f1Wall.castShadow = true;
    f1Group.add(f1Wall);

    // First Floor Front Glazing Suites
    const f1FrontGlassGeo = new THREE.BoxGeometry(18.4, 3.4, 0.1);
    const f1FrontGlass = new THREE.Mesh(f1FrontGlassGeo, this.matBronzeGlass);
    f1FrontGlass.position.set(0, 7.0, 9.0);
    f1Group.add(f1FrontGlass);

    // First Floor Front Glass Balustrade
    const bal1FrontGeo = new THREE.BoxGeometry(19.0, 1.1, 0.08);
    const bal1Front = new THREE.Mesh(bal1FrontGeo, this.matBalustradeGlass);
    bal1Front.position.set(0, 5.55, 9.9);
    f1Group.add(bal1Front);

    // First Floor Rear Glass Facade
    const f1RearGlassGeo = new THREE.BoxGeometry(18.4, 3.4, 0.1);
    const f1RearGlass = new THREE.Mesh(f1RearGlassGeo, this.matBronzeGlass);
    f1RearGlass.position.set(0, 7.0, -8.6);
    f1Group.add(f1RearGlass);

    const bal1RearGeo = new THREE.BoxGeometry(19.0, 1.1, 0.08);
    const bal1Rear = new THREE.Mesh(bal1RearGeo, this.matBalustradeGlass);
    bal1Rear.position.set(0, 5.55, -9.6);
    f1Group.add(bal1Rear);

    // LED Cove Lighting Strip under Slab 1
    const ledSlab1 = new THREE.Mesh(new THREE.BoxGeometry(20.0, 0.06, 0.06), this.matLedNeon);
    ledSlab1.position.set(0, 4.18, 9.8);
    f1Group.add(ledSlab1);

    // ====== SECOND FLOOR / ROOF LEVEL SUITE ======
    const roofGroup = this.floors.roof;

    const slab2Geo = new THREE.BoxGeometry(20.4, 0.8, 18.6);
    const slab2 = new THREE.Mesh(slab2Geo, this.matWhiteConcrete);
    slab2.position.set(0, 9.6, 0.2);
    slab2.castShadow = true;
    roofGroup.add(slab2);

    // Second Floor Master Suite Glass
    const f2GlassGeo = new THREE.BoxGeometry(18.4, 3.2, 16.6);
    const f2Glass = new THREE.Mesh(f2GlassGeo, this.matBronzeGlass);
    f2Glass.position.set(0, 11.6, 0.2);
    roofGroup.add(f2Glass);

    // Roof Slab Overhang
    const roofSlabGeo = new THREE.BoxGeometry(21.4, 0.9, 20.0);
    const roofSlab = new THREE.Mesh(roofSlabGeo, this.matWhiteConcrete);
    roofSlab.position.set(0, 13.65, 0.2);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    roofGroup.add(roofSlab);

    // LED Lighting Coves on Roof Slabs
    const ledRoofFront = new THREE.Mesh(new THREE.BoxGeometry(21.0, 0.08, 0.08), this.matLedNeon);
    ledRoofFront.position.set(0, 13.18, 10.05);
    roofGroup.add(ledRoofFront);

    const ledRoofRear = new THREE.Mesh(new THREE.BoxGeometry(21.0, 0.08, 0.08), this.matLedNeon);
    ledRoofRear.position.set(0, 13.18, -9.65);
    roofGroup.add(ledRoofRear);

    // Side Facade Architectural Louvers
    for (let i = 0; i < 8; i++) {
      const louverGeo = new THREE.BoxGeometry(0.12, 5.5, 0.35);
      const louver = new THREE.Mesh(louverGeo, this.matDarkMetal);
      louver.position.set(9.9, 7.5, -4 + i * 1.1);
      f1Group.add(louver);
    }

    villaBase.add(gfGroup);
    villaBase.add(f1Group);
    villaBase.add(roofGroup);
    this.layers.arch.add(villaBase);
  }

  // ----------------------------------------------------
  // 3. CARPORT WING, PERGOLA CANOPY & LIVING GREEN WALL
  // ----------------------------------------------------
  buildCarportWing() {
    const grp = this.layers.arch;
    const carportGrp = new THREE.Group();
    carportGrp.position.set(13.5, 0, 6.0);

    // Cantilevered Carport Canopy
    const canopyGeo = new THREE.BoxGeometry(13.2, 0.8, 15.2);
    const canopyMesh = new THREE.Mesh(canopyGeo, this.matWhiteConcrete);
    canopyMesh.position.set(0, 4.6, 0);
    canopyMesh.castShadow = true;
    canopyMesh.receiveShadow = true;
    carportGrp.add(canopyMesh);

    // Pergola Louver Slots
    for (let i = 0; i < 6; i++) {
      const slotGeo = new THREE.BoxGeometry(7.5, 0.25, 0.45);
      const slotMesh = new THREE.Mesh(slotGeo, this.matDarkMetal);
      slotMesh.position.set(-1.5, 4.4, -4.5 + i * 1.8);
      carportGrp.add(slotMesh);
    }

    // Carport Back Wall
    const backWallGeo = new THREE.BoxGeometry(13.0, 4.2, 0.4);
    const backWall = new THREE.Mesh(backWallGeo, this.matDarkMetal);
    backWall.position.set(0, 2.1, -7.3);
    backWall.castShadow = true;
    carportGrp.add(backWall);

    // Right Trellis Columns
    const matGreenWall = new THREE.MeshStandardMaterial({ color: 0x182c16, roughness: 0.85 });
    for (let i = 0; i < 3; i++) {
      const colGeo = new THREE.BoxGeometry(0.6, 4.2, 1.8);
      const colMesh = new THREE.Mesh(colGeo, matGreenWall);
      colMesh.position.set(6.3, 2.1, -4.0 + i * 4.0);
      colMesh.castShadow = true;
      carportGrp.add(colMesh);
    }

    // Carport LED Strip
    const carportLed = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.06, 0.06), this.matLedNeon);
    carportLed.position.set(0, 4.18, 7.4);
    carportGrp.add(carportLed);

    grp.add(carportGrp);
  }

  // ----------------------------------------------------
  // 4. LUXURY SWIMMING POOL & WATERFALL WATER FEATURE
  // ----------------------------------------------------
  buildSwimmingPool() {
    const grp = this.layers.pool;
    const poolGrp = new THREE.Group();
    poolGrp.position.set(6.0, 0, -23.0);

    // Basin
    const basinGeo = new THREE.BoxGeometry(11.6, 2.0, 16.6);
    const basin = new THREE.Mesh(basinGeo, this.matPoolTile);
    basin.position.set(0, -0.9, 0);
    poolGrp.add(basin);

    // Water Surface
    const waterGeo = new THREE.PlaneGeometry(11.0, 16.0);
    const waterMesh = new THREE.Mesh(waterGeo, this.matPoolWater);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, 0.05, 0);
    poolGrp.add(waterMesh);

    // Custom S-Curve Ribbon Mosaic
    const ribbonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, -1.75, -6.5),
      new THREE.Vector3(-1.0, -1.75, -3.0),
      new THREE.Vector3(2.5, -1.75, 0.0),
      new THREE.Vector3(-1.5, -1.75, 4.0),
      new THREE.Vector3(3.0, -1.75, 6.5)
    ]);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 40, 0.45, 8, false);
    const ribbonMesh = new THREE.Mesh(ribbonGeo, this.matPoolRibbon);
    poolGrp.add(ribbonMesh);

    // Waterfall Feature
    const waterfallBladeGeo = new THREE.BoxGeometry(3.6, 0.08, 0.4);
    const waterfallBlade = new THREE.Mesh(waterfallBladeGeo, this.matDarkMetal);
    waterfallBlade.position.set(-1.0, 3.2, 7.8);
    poolGrp.add(waterfallBlade);

    const waterSheetGeo = new THREE.PlaneGeometry(3.4, 3.1);
    const matWaterSheet = new THREE.MeshPhysicalMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      transmission: 0.8
    });
    const waterSheet = new THREE.Mesh(waterSheetGeo, matWaterSheet);
    waterSheet.position.set(-1.0, 1.6, 7.8);
    poolGrp.add(waterSheet);

    grp.add(poolGrp);
  }

  // ----------------------------------------------------
  // 5. PERIMETER BOUNDARY WALLS & LUXURY PALM TREES
  // ----------------------------------------------------
  buildPerimeterAndLandscaping() {
    const grp = this.layers.landscape;

    // Boundary Walls
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.4, 76), this.matWallConcrete);
    leftWall.position.set(-25, 1.7, 0);
    leftWall.castShadow = true;
    grp.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.4, 76), this.matWallConcrete);
    rightWall.position.set(25, 1.7, 0);
    rightWall.castShadow = true;
    grp.add(rightWall);

    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(22, 2.8, 0.5), this.matWallConcrete);
    frontWallLeft.position.set(-14, 1.4, 38);
    grp.add(frontWallLeft);

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(16, 2.8, 0.5), this.matWallConcrete);
    frontWallRight.position.set(17, 1.4, 38);
    grp.add(frontWallRight);

    // Front Gate
    const gateMesh = new THREE.Mesh(new THREE.BoxGeometry(10, 2.6, 0.15), this.matDarkMetal);
    gateMesh.position.set(2.0, 1.3, 38);
    grp.add(gateMesh);

    // Neighboring Villas
    const neighborLeft = new THREE.Mesh(new THREE.BoxGeometry(22, 11, 26), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 }));
    neighborLeft.position.set(-42, 5.5, -4);
    grp.add(neighborLeft);

    const neighborRight = new THREE.Mesh(new THREE.BoxGeometry(24, 10, 28), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 }));
    neighborRight.position.set(44, 5.0, -8);
    grp.add(neighborRight);

    // Palm Trees
    const palmPositions = [
      { x: -18, z: 32, scale: 1.1, wrap: true },
      { x: -10, z: 34, scale: 1.2, wrap: true },
      { x: -3, z: 35, scale: 1.15, wrap: true },
      { x: 18, z: 33, scale: 1.0, wrap: true },
      { x: 22, z: 27, scale: 1.05, wrap: true },
      { x: -20, z: -30, scale: 1.25, wrap: false },
      { x: -12, z: -34, scale: 1.2, wrap: false },
      { x: 18, z: -32, scale: 1.1, wrap: false }
    ];

    palmPositions.forEach(p => {
      this.createPalmTree(p.x, p.z, p.scale, p.wrap, grp);
    });
  }

  createPalmTree(x, z, scale, wrappedBurlap, parent) {
    const palmGrp = new THREE.Group();
    palmGrp.position.set(x, 0, z);
    palmGrp.scale.set(scale, scale, scale);

    // Realistic Palm Trunk with Tapered Rings
    const trunkSegments = 9;
    const trunkHeight = 7.5;
    const matTrunk = new THREE.MeshStandardMaterial({
      color: wrappedBurlap ? 0xa87d4a : 0x3d291e,
      roughness: 0.9,
      metalness: 0.05
    });
    const matRing = new THREE.MeshStandardMaterial({
      color: wrappedBurlap ? 0x8a6335 : 0x271912,
      roughness: 0.95
    });

    for (let i = 0; i < trunkSegments; i++) {
      const segH = trunkHeight / trunkSegments;
      const rBottom = 0.45 - (i * 0.02);
      const rTop = 0.43 - (i * 0.02);
      const segGeo = new THREE.CylinderGeometry(rTop, rBottom, segH, 12);
      const seg = new THREE.Mesh(segGeo, i % 2 === 0 ? matTrunk : matRing);
      // Slight natural organic curve to the trunk
      seg.position.set(Math.sin(i * 0.2) * 0.2, (i + 0.5) * segH, Math.cos(i * 0.2) * 0.1);
      seg.castShadow = true;
      palmGrp.add(seg);
    }

    // Top Palm Crown Collar
    const collarGeo = new THREE.CylinderGeometry(0.5, 0.35, 0.8, 12);
    const matCollar = new THREE.MeshStandardMaterial({ color: 0x2d4a1d, roughness: 0.7 });
    const collar = new THREE.Mesh(collarGeo, matCollar);
    collar.position.set(0.2, trunkHeight + 0.3, 0.1);
    palmGrp.add(collar);

    // Realistic Arching Palm Fronds (Curved Multi-Segment Leaf Blades)
    const matFrond = new THREE.MeshStandardMaterial({
      color: 0x1e4620,
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    const matFrondUnder = new THREE.MeshStandardMaterial({
      color: 0x2f602e,
      roughness: 0.7,
      side: THREE.DoubleSide
    });

    const frondTiers = [
      { count: 7, radius: 4.8, yAngle: 0.6, droop: 0.75, length: 5.5, yOffset: 0.4 },
      { count: 6, radius: 4.2, yAngle: 0.4, droop: 0.55, length: 4.8, yOffset: 0.65 },
      { count: 5, radius: 3.2, yAngle: 0.2, droop: 0.35, length: 3.8, yOffset: 0.85 }
    ];

    frondTiers.forEach((tier, tierIdx) => {
      for (let i = 0; i < tier.count; i++) {
        const baseAngle = (i / tier.count) * Math.PI * 2 + (tierIdx * 0.5);
        const frondCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.cos(baseAngle) * (tier.length * 0.4), tier.yAngle * 1.5, Math.sin(baseAngle) * (tier.length * 0.4)),
          new THREE.Vector3(Math.cos(baseAngle) * (tier.length * 0.75), tier.yAngle * 1.2 - tier.droop * 0.8, Math.sin(baseAngle) * (tier.length * 0.75)),
          new THREE.Vector3(Math.cos(baseAngle) * tier.length, -tier.droop * 2.2, Math.sin(baseAngle) * tier.length)
        ]);

        // Main Leaf Spine
        const spineGeo = new THREE.TubeGeometry(frondCurve, 12, 0.06, 6, false);
        const spineMesh = new THREE.Mesh(spineGeo, matCollar);
        spineMesh.position.set(0.2, trunkHeight + tier.yOffset, 0.1);
        spineMesh.castShadow = true;
        palmGrp.add(spineMesh);

        // Leaf Blade Ribbon Surface
        const bladeGeo = new THREE.PlaneGeometry(0.65, tier.length * 0.85, 3, 8);
        const bladeMesh = new THREE.Mesh(bladeGeo, tierIdx % 2 === 0 ? matFrond : matFrondUnder);
        bladeMesh.position.set(
          0.2 + Math.cos(baseAngle) * (tier.length * 0.45),
          trunkHeight + tier.yOffset + (tier.yAngle * 0.8 - tier.droop * 0.4),
          0.1 + Math.sin(baseAngle) * (tier.length * 0.45)
        );
        bladeMesh.rotation.y = -baseAngle + Math.PI / 2;
        bladeMesh.rotation.x = Math.PI / 3;
        bladeMesh.rotation.z = Math.sin(baseAngle) * 0.3;
        bladeMesh.castShadow = true;
        palmGrp.add(bladeMesh);
      }
    });

    parent.add(palmGrp);
  }

  // ----------------------------------------------------
  // 6. CONSTRUCTION SITE ASSETS (SCAFFOLDING & VEHICLES)
  // ----------------------------------------------------
  buildConstructionSiteAssets() {
    const grp = this.layers.construction;

    this.createScaffoldTower(-23, 0, -8, 6, 11, grp);
    this.createScaffoldTower(-23, 0, 8, 4, 9, grp);

    const pileGeo = new THREE.CylinderGeometry(0.04, 0.04, 5.5, 6);
    for (let i = 0; i < 18; i++) {
      const pole = new THREE.Mesh(pileGeo, this.matScaffoldSteel);
      pole.position.set(2 + (Math.random() - 0.5) * 4, 0.1 + i * 0.04, 18 + (Math.random() - 0.5) * 3);
      pole.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      pole.rotation.z = (Math.random() - 0.5) * 0.4;
      grp.add(pole);
    }
  }

  createScaffoldTower(x, y, z, width, height, parent) {
    const tower = new THREE.Group();
    tower.position.set(x, y, z);

    const pipeGeo = new THREE.CylinderGeometry(0.04, 0.04, height, 6);
    const offsets = [
      [-width / 2, -1.2],
      [width / 2, -1.2],
      [-width / 2, 1.2],
      [width / 2, 1.2]
    ];

    offsets.forEach(off => {
      const p = new THREE.Mesh(pipeGeo, this.matScaffoldSteel);
      p.position.set(off[0], height / 2, off[1]);
      tower.add(p);
    });

    for (let h = 2; h < height; h += 2) {
      const plankGeo = new THREE.BoxGeometry(width, 0.08, 2.2);
      const matPlank = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.9 });
      const plank = new THREE.Mesh(plankGeo, matPlank);
      plank.position.set(0, h, 0);
      tower.add(plank);
    }

    parent.add(tower);
  }

  // ----------------------------------------------------
  // 7. VEHICLES
  // ----------------------------------------------------
  buildVehicles() {
    const grp = this.layers.vehicles;

    // Contracting Flatbed Truck
    const truckGrp = new THREE.Group();
    truckGrp.position.set(11, 0, 18);
    truckGrp.rotation.y = -Math.PI * 0.05;

    const cabGeo = new THREE.BoxGeometry(2.4, 2.2, 2.4);
    const matCab = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.35 });
    const cab = new THREE.Mesh(cabGeo, matCab);
    cab.position.set(0, 1.4, 2.0);
    truckGrp.add(cab);

    const wsGeo = new THREE.PlaneGeometry(2.0, 1.1);
    const ws = new THREE.Mesh(wsGeo, this.matBronzeGlass);
    ws.position.set(0, 1.7, 3.22);
    truckGrp.add(ws);

    const bedGeo = new THREE.BoxGeometry(2.4, 0.4, 3.8);
    const matBed = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    const bed = new THREE.Mesh(bedGeo, matBed);
    bed.position.set(0, 1.0, -1.0);
    truckGrp.add(bed);

    const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 12);
    const matWheel = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const wPositions = [[-1.2, 1.5], [1.2, 1.5], [-1.2, -1.8], [1.2, -1.8]];
    wPositions.forEach(wp => {
      const w = new THREE.Mesh(wheelGeo, matWheel);
      w.rotation.z = Math.PI / 2;
      w.position.set(wp[0], 0.45, wp[1]);
      truckGrp.add(w);
    });

    grp.add(truckGrp);

    // Luxury Sedan
    const carGrp = new THREE.Group();
    carGrp.position.set(14.5, 0, 5.0);
    carGrp.rotation.y = Math.PI * 0.95;

    const carBodyGeo = new THREE.BoxGeometry(2.1, 0.9, 4.8);
    const matCarBody = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.15, metalness: 0.85 });
    const carBody = new THREE.Mesh(carBodyGeo, matCarBody);
    carBody.position.set(0, 0.65, 0);
    carGrp.add(carBody);

    const carTopGeo = new THREE.BoxGeometry(1.8, 0.6, 2.4);
    const carTop = new THREE.Mesh(carTopGeo, this.matBronzeGlass);
    carTop.position.set(0, 1.25, -0.2);
    carGrp.add(carTop);

    grp.add(carGrp);
  }

  // ----------------------------------------------------
  // 8. BIM GRID
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

  // Floor Isolation (Ground, First, Roof, All)
  isolateFloor(floorName) {
    if (floorName === 'all') {
      this.floors.ground.visible = true;
      this.floors.first.visible = true;
      this.floors.roof.visible = true;
    } else {
      this.floors.ground.visible = floorName === 'ground';
      this.floors.first.visible = floorName === 'first';
      this.floors.roof.visible = floorName === 'roof';
    }
  }
}

window.VillaModelBuilder = VillaModelBuilder;
