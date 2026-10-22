/**
 * JUMEIRAH ISLANDS VILLA 003 — BUILDING DATA SERVICE
 * Grounded Building Information Model (BIM) Data Service
 * 
 * Strict Grounding Rules:
 * - Only exposes verified dimensions and properties from the model & site telemetry.
 * - Missing properties are explicitly designated in `missingFields` instead of fabricated.
 * - Element coordinates match Three.js model builder coordinate space.
 */

const fs = require('fs');
const path = require('path');

// 1. MASTER PROJECT TELEMETRY & SPECIFICATIONS (Verified from dashboardData.js & engineering logs)
const PROJECT_METADATA = {
  project: {
    id: "JI-VILLA-003",
    name: "Jumeirah Islands Luxury Villa 003",
    plot: "Plot JI-003, Cluster 3",
    location: "Cluster 3, Jumeirah Islands, Dubai, United Arab Emirates",
    coordinates: {
      lat: 25.0617,
      lng: 55.1528
    },
    client: "Private Client",
    architecturalConsultant: "Architectural BIM Consultancy",
    contractor: "VH Contracting LLC",
    asBuiltDate: "October 2026",
    status: "Superstructure & Interior Fitout (84% Complete)",
    siteArea: {
      sqft: "12,450 sq.ft",
      sqm: "1,156.6 m²"
    },
    builtUpArea: {
      sqft: "9,800 sq.ft",
      sqm: "910.4 m²"
    },
    levels: [
      { id: "basement", name: "Lower Ground / Pool Deck", elevationY: "-3.4m to 0.0m", function: "Lakeside dining, lounge, wellness & pool terrace" },
      { id: "ground", name: "Ground Floor", elevationY: "0.0m to 3.7m", function: "Double-height grand entrance, formal living, dining & carport" },
      { id: "first", name: "First Floor", elevationY: "3.7m to 7.4m", function: "Master bedroom suite, secondary suites (Ayat, Dua, Nur, Jannah)" },
      { id: "roof", name: "Roof Level & Canopy", elevationY: "7.4m to 9.2m", function: "Architectural C-frame crown & solar canopy" }
    ],
    zones: [
      "Site Perimeter & Driveway",
      "Lower Ground Wellness Lobby",
      "Ground Floor Grand Foyer & Khutoot Wall",
      "Ground Floor Formal Living & Dining",
      "First Floor Master Suite & Terraces",
      "First Floor Secondary Suites (Ayat, Dua, Nur, Jannah)",
      "Roof Terrace & Solar Pergola",
      "Rear Infinity Pool & Waterfront Shoreline"
    ],
    verifiedProgress: {
      overallPct: 84,
      milestones: [
        { milestone: "Shoring, Piling & Dewatering", pct: 100, verifiedDate: "10 Oct 2026", status: "Completed" },
        { milestone: "Basement & Lower Ground RCC", pct: 100, verifiedDate: "10 Oct 2026", status: "Completed" },
        { milestone: "Superstructure (G+1+R Concrete)", pct: 96, verifiedDate: "12 Oct 2026", status: "In Progress" },
        { milestone: "Khutoot Wall Structural Framing", pct: 90, verifiedDate: "12 Oct 2026", status: "In Progress" },
        { milestone: "Facade Glazing & Louvers", pct: 86, verifiedDate: "14 Oct 2026", status: "In Progress" },
        { milestone: "Flooring Screed & Marble Works", pct: 75, verifiedDate: "14 Oct 2026", status: "In Progress" },
        { milestone: "Infinity Pool & Lake Shoreline", pct: 72, verifiedDate: "14 Oct 2026", status: "In Progress" },
        { milestone: "Landscape, Carport & Trellis", pct: 68, verifiedDate: "14 Oct 2026", status: "In Progress" }
      ]
    },
    liveWeatherTelemetry: {
      temperature: "34°C",
      condition: "Sunny / Clear Skies",
      humidity: "48%",
      wind: "14 km/h NW",
      uvIndex: "8.5 High",
      solarIrradiance: "840 W/m²",
      airQuality: "Good (AQI 32)"
    }
  }
};

// 2. ACTUAL BUILDING ELEMENTS CATALOG (Derived 1:1 from 3D ModelBuilder & Spatial Telemetry)
const BUILDING_ELEMENTS = [
  // --- CARPORT & SHADING ---
  {
    id: "PERGOLA-CARPORT-01",
    name: "Cantilevered Carport Pergola & Coffer Beams",
    category: "Shading & Pergola",
    floor: "ground",
    zone: "Site Perimeter & Driveway",
    dimensions: {
      width_m: 13.2,
      height_m: 0.72,
      depth_m: 6.8,
      span_m: 13.2,
      clearance_m: 3.28
    },
    position: { x: 7.7, y: 3.65, z: 6.4 },
    cameraView: {
      pos: { x: 16.8, y: 2.9, z: 15.8 },
      target: { x: 6.5, y: 2.2, z: 4.5 },
      fov: 65
    },
    properties: {
      structuralSystem: "Post-tensioned white micro-cement architectural concrete cantilever",
      cofferBeams: "6 longitudinal structural coffer ribs spaced at 1.45m intervals",
      lighting: "Recessed 3000K warm linear LED channel border (IP67)",
      capacity: "Accommodates 3 luxury executive vehicles (EV tri-charger 22 kW ready)"
    },
    missingFields: [
      "EV Charger Serial Numbers",
      "Steel Rebar Mill Test Certificates",
      "Coating Manufacturer Warranty Period"
    ],
    status: "86% Complete on Site (October 2026)"
  },
  {
    id: "COL-GREENWALL-01",
    name: "Living Vertical Green-Wall Columns (3 Units)",
    category: "Site & Landscape",
    floor: "ground",
    zone: "Site Perimeter & Driveway",
    dimensions: {
      width_m: 0.68,
      height_m: 3.65,
      depth_m: 0.78,
      count: 3,
      spacing_z: "z = 4.2m, 6.5m, 8.8m"
    },
    position: { x: 14.0, y: 1.85, z: 6.5 },
    cameraView: {
      pos: { x: 18.5, y: 3.0, z: 17.5 },
      target: { x: 6.5, y: 2.2, z: 4.5 },
      fov: 65
    },
    properties: {
      core: "Dark bronze architectural steel posts (0.55m x 0.65m)",
      cladding: "Automated hydroponic living foliage panels with sub-surface drip irrigation (2.4 L/hr)",
      accentLighting: "Recessed pinhole uplights at column bases (3000K)"
    },
    missingFields: [
      "Specific Botanical Species Names",
      "Soil Substrate Nitrogen Test"
    ],
    status: "Pillars installed; living wall in Render phase"
  },
  {
    id: "WALL-GARAGE-01",
    name: "Dark Metallic Garage Enclosure Wall",
    category: "Enclosure & Facade",
    floor: "ground",
    zone: "Ground Floor Grand Foyer & Khutoot Wall",
    dimensions: {
      width_m: 9.6,
      height_m: 3.4,
      depth_m: 0.35,
      area_sqm: 32.64
    },
    position: { x: 9.2, y: 1.7, z: 2.8 },
    cameraView: {
      pos: { x: 15.0, y: 2.5, z: 10.0 },
      target: { x: 9.2, y: 1.7, z: 2.8 },
      fov: 65
    },
    properties: {
      material: "Anodized brushed dark metallic architectural panels",
      linearLighting: "9.2m integrated LED reveal line at ceiling junction (Y=3.25m)"
    },
    missingFields: [
      "Thermal Insulation R-Value",
      "Panel Manufacturer Code"
    ],
    status: "Framing completed; panel installation in progress"
  },

  // --- ENTRANCE ATRIUM & CIRCULATION ---
  {
    id: "WALL-ATRIUM-01",
    name: "Double-Height Grand Entrance Portal & Curtain Glass",
    category: "Curtain Wall & Glazing",
    floor: "ground",
    zone: "Ground Floor Grand Foyer & Khutoot Wall",
    dimensions: {
      width_m: 3.6,
      height_m: 7.1,
      depth_m: 0.12,
      atriumClearHeight_m: 7.1
    },
    position: { x: -0.2, y: 3.6, z: 2.6 },
    cameraView: {
      pos: { x: -4.5, y: 2.5, z: 12.2 },
      target: { x: -0.2, y: 3.2, z: 2.0 },
      fov: 72
    },
    properties: {
      glazing: "Double-glazed Low-E insulated glass units (U-value = 1.2 W/m²K, SHGC = 0.28)",
      mullions: "Slimline thermal-break dark bronze anodized architectural profiles at x = -1.4m, -0.2m, 1.0m",
      cladding: "Fluted thermo-treated American walnut vertical wall panels (acoustic STC 44 dB)"
    },
    missingFields: [
      "Glass Manufacturer Warranty Certificate",
      "Structural Wind-Load Test Report"
    ],
    status: "Structure complete; glazing 86% installed"
  },
  {
    id: "STAIR-ATRIUM-01",
    name: "Floating Travertine Staircase & Cascading Ring Chandelier",
    category: "Circulation & Stairs",
    floor: "ground",
    zone: "Ground Floor Grand Foyer & Khutoot Wall",
    dimensions: {
      treadWidth_m: 1.3,
      riserHeight_m: 0.35,
      treadDepth_m: 0.35,
      stepCount: 10,
      chandelierElevations_m: "Y = 4.6m, 5.2m, 5.8m"
    },
    position: { x: -0.8, y: 1.9, z: 0.4 },
    cameraView: {
      pos: { x: -3.8, y: 3.0, z: 7.5 },
      target: { x: -0.8, y: 2.5, z: 1.0 },
      fov: 68
    },
    properties: {
      treads: "Cantilevered solid honed Navona travertine stone blocks embedded in concrete core",
      chandelier: "3-tier circular cascading halo chandelier in brushed brass with 3000K diffused LED rings (radii: 0.55m, 0.43m, 0.31m)"
    },
    missingFields: [
      "Chandelier Dimming Driver Model",
      "Stair Structural Anchor Pull-Test Cert"
    ],
    status: "RCC cantilevers poured; travertine stone cladding in progress"
  },

  // --- SWIMMING POOL & WATER FEATURES ---
  {
    id: "POOL-INFINITY-01",
    name: "Rear Infinity Swimming Pool with Cyan River-Vein Mosaic",
    category: "MEP & Water Systems",
    floor: "basement",
    zone: "Rear Infinity Pool & Waterfront Shoreline",
    dimensions: {
      basinWidth_m: 7.6,
      basinLength_m: 10.0,
      depth_m: 0.73,
      copingWidth_m: 8.4,
      copingLength_m: 10.8,
      waterVolume_m3: "~55 m³"
    },
    position: { x: -5.5, y: -3.78, z: -10.2 },
    cameraView: {
      pos: { x: -0.6, y: 2.2, z: -20.5 },
      target: { x: -5.5, y: -2.0, z: -10.2 },
      fov: 62
    },
    properties: {
      finish: "Custom artisan cyan glass river-vein mosaic inlay tiles (matched to Photos #001 & #010)",
      coping: "Honed anti-slip travertine stone perimeter edge (0.45m width)",
      telemetry: "Water Temp 27.8°C, pH 7.4, automated chlorine/saline dosing",
      underwaterLighting: "High-output LED underwater pool lights (16W cyan glow at x=-5.5, y=-2.6, z=-10.2)"
    },
    missingFields: [
      "Circulation Pump Manufacturer Model",
      "Filter Sand Replacement Schedule",
      "Underwater Light Transformer Serial Numbers"
    ],
    status: "Pool concrete shell poured & waterproofed; tiling 72% complete"
  },
  {
    id: "WATERFALL-WEIR-01",
    name: "Sheer Descent Cantilever Waterfall Weir",
    category: "MEP & Water Systems",
    floor: "ground",
    zone: "Rear Infinity Pool & Waterfront Shoreline",
    dimensions: {
      weirWidth_m: 2.7,
      waterDropHeight_m: 3.45,
      cantileverProjection_m: 3.4
    },
    position: { x: -5.6, y: -1.68, z: -5.35 },
    cameraView: {
      pos: { x: -0.6, y: 2.2, z: -23.5 },
      target: { x: -5.6, y: 0.1, z: -5.3 },
      fov: 62
    },
    properties: {
      structuralProjection: "C50 white architectural concrete cantilever projecting over pool (measured deflection: -1.4mm safe)",
      waterFlowRate: "145 Liters/min sheer descent weir",
      mistSystem: "120-point micro-droplet mist aeration system",
      weirSlot: "Recessed dark bronze weir lip (3.6m x 0.06m)"
    },
    missingFields: [
      "Booster Pump Electrical Breaker Rating",
      "Water Flow Sensor Calibration Date"
    ],
    status: "Weir slot cast into slab; pump commissioning pending"
  },

  // --- STRUCTURAL SLABS & ROOF ---
  {
    id: "SLAB-GF-01",
    name: "Main Ground Floor Post-Tensioned Concrete Slab",
    category: "Structure / Slabs",
    floor: "ground",
    zone: "Ground Floor Formal Living & Dining",
    dimensions: {
      width_m: 16.4,
      thickness_m: 0.55,
      depth_m: 11.2,
      elevationY_m: 0.0,
      area_sqm: 183.68
    },
    position: { x: 0.6, y: 0.0, z: 0.2 },
    cameraView: {
      pos: { x: -11.8, y: 3.8, z: 18.8 },
      target: { x: 1.2, y: 2.9, z: 1.2 },
      fov: 65
    },
    properties: {
      concreteGrade: "C40/50 Post-tensioned reinforced architectural concrete",
      finish: "Micro-cement troweled white plaster with seamless expansion joints"
    },
    missingFields: [
      "Cube Crush Test 28-Day Strength Lab Reports",
      "Post-Tension Tendon Stressing Records"
    ],
    status: "100% Cast and Cured (Verified)"
  },
  {
    id: "SLAB-FF-01",
    name: "First Floor Front-Left Cantilevered Bedroom Slab",
    category: "Structure / Slabs",
    floor: "first",
    zone: "First Floor Master Suite & Terraces",
    dimensions: {
      width_m: 5.6,
      thickness_m: 0.72,
      depth_m: 7.2,
      elevationY_m: 3.65,
      area_sqm: 40.32
    },
    position: { x: -4.6, y: 3.65, z: 2.8 },
    cameraView: {
      pos: { x: -10.5, y: 5.0, z: 12.0 },
      target: { x: -4.6, y: 4.5, z: 2.8 },
      fov: 65
    },
    properties: {
      cantileverProjection: "2.8m projection beyond Ground Floor exterior column line",
      lighting: "5.2m recessed LED channel along underside soffit (Y=3.28m)",
      balustrade: "Frameless 1.05m tempered laminated glass balustrade"
    },
    missingFields: [
      "Dynamic Wind Vibration Sensor Log",
      "Waterproofing Membrane Type Certificate"
    ],
    status: "Concrete cast; glazing in progress"
  },
  {
    id: "SLAB-FF-02",
    name: "First Floor Rear 3-Bay Cantilevered Slab",
    category: "Structure / Slabs",
    floor: "first",
    zone: "First Floor Secondary Suites (Ayat, Dua, Nur, Jannah)",
    dimensions: {
      width_m: 16.6,
      thickness_m: 0.68,
      depth_m: 5.5,
      elevationY_m: 3.65,
      area_sqm: 91.3
    },
    position: { x: 0.6, y: 3.65, z: -1.6 },
    cameraView: {
      pos: { x: 0.6, y: 5.5, z: -18.0 },
      target: { x: 0.6, y: 4.5, z: -1.6 },
      fov: 62
    },
    properties: {
      facade: "15.2m floor-to-ceiling curtain glass with signature etched wave decals",
      balustrade: "15.8m continuous frameless glass balustrade overlooking infinity pool and lake",
      soffitLighting: "16.0m continuous warm linear LED channel"
    },
    missingFields: [
      "Balustrade Impact Resistance Test Record",
      "Curtain Wall Deflection Log"
    ],
    status: "Slab cast; glazing 86% complete"
  },
  {
    id: "ROOF-CANOPY-01",
    name: "Architectural C-Frame Overhanging Roof Canopy",
    category: "Structure / Slabs",
    floor: "roof",
    zone: "Roof Terrace & Solar Pergola",
    dimensions: {
      width_m: 16.8,
      thickness_m: 0.78,
      depth_m: 11.4,
      elevationY_m: 7.45,
      area_sqm: 191.52
    },
    position: { x: 0.6, y: 7.45, z: 1.1 },
    cameraView: {
      pos: { x: 0.6, y: 12.0, z: 18.0 },
      target: { x: 0.6, y: 7.45, z: 1.1 },
      fov: 60
    },
    properties: {
      form: "Signature wrap-around overhanging C-frame crown",
      lighting: "Perimeter recessed 3000K LED channels (16m front, 15.8m rear, 4.2m sides) + 10 pinhole downlights",
      roofCrown: "Upper fluted walnut feature crown block (12.0m x 1.35m x 6.5m at Y=8.4m)"
    },
    missingFields: [
      "Roof Solar Photovoltaic Layout Drawings",
      "Stormwater Downspout Hydraulic Calculations"
    ],
    status: "Concrete structure cast; electrical conduit installed"
  },
  {
    id: "SLAB-LG-01",
    name: "Lower Ground Lakeside Terrace & Sunken Seating Slab",
    category: "Structure / Slabs",
    floor: "basement",
    zone: "Rear Infinity Pool & Waterfront Shoreline",
    dimensions: {
      width_m: 26.0,
      thickness_m: 0.4,
      depth_m: 15.5,
      elevationY_m: -3.6,
      area_sqm: 403.0
    },
    position: { x: 1.0, y: -3.6, z: -9.5 },
    cameraView: {
      pos: { x: -11.5, y: 3.2, z: -20.5 },
      target: { x: 2.2, y: 1.5, z: -3.5 },
      fov: 68
    },
    properties: {
      finish: "Honed anti-slip Navona travertine stone pavers",
      features: "Direct walk-out access from Lower Ground wellness lounge, sunken lawn seating pit (4.8m x 3.2m), and lake shoreline transition"
    },
    missingFields: [
      "Subsoil Dewatering Flow Rate Log",
      "Perimeter Waterproofing Warranty"
    ],
    status: "100% Complete; paving in progress"
  },

  // --- LOWER GROUND FF&E & AMENITIES ---
  {
    id: "FURN-DINING-LG",
    name: "Lower Ground Travertine Alfresco Dining Table & Suite",
    category: "Interior Architecture",
    floor: "basement",
    zone: "Lower Ground Wellness Lobby",
    dimensions: {
      tableWidth_m: 2.6,
      tableThickness_m: 0.08,
      tableDepth_m: 1.1,
      chairCount: 6
    },
    position: { x: 0.3, y: -2.6, z: -0.4 },
    cameraView: {
      pos: { x: 0.6, y: -1.5, z: -5.0 },
      target: { x: 0.3, y: -2.6, z: -0.4 },
      fov: 65
    },
    properties: {
      tabletop: "Solid honed Italian Navona travertine slab with chamfered edge",
      trestles: "Dual architectural dark bronze structural legs (0.2m x 0.72m x 0.6m)",
      chairs: "Custom fluted American walnut dining chairs with bronze trim"
    },
    missingFields: [
      "Upholstery Fabric Fire Test Certificate",
      "Furniture Purchase Order Number"
    ],
    status: "Specified for Handover Fitout Phase"
  },
  {
    id: "FURN-LOUNGE-LG",
    name: "Poolside Travertine & Fabric Lounge Daybed",
    category: "Interior Architecture",
    floor: "basement",
    zone: "Rear Infinity Pool & Waterfront Shoreline",
    dimensions: {
      width_m: 2.8,
      height_m: 0.45,
      depth_m: 0.95
    },
    position: { x: 5.6, y: -3.05, z: -0.6 },
    cameraView: {
      pos: { x: 6.0, y: -2.0, z: -4.5 },
      target: { x: 5.6, y: -3.05, z: -0.6 },
      fov: 65
    },
    properties: {
      base: "Honed travertine plinth with integrated marine-grade outdoor cushioning"
    },
    missingFields: [
      "Cushion Foam Density Rating",
      "Outdoor Fabric UV Resistance Hours"
    ],
    status: "Handover fitout specification"
  },

  // --- SITE, LAKE & LANDSCAPING ---
  {
    id: "LAKE-SHORELINE-01",
    name: "Jumeirah Islands Lake Water Body & Reed Bank",
    category: "Site & Landscape",
    floor: "site",
    zone: "Rear Infinity Pool & Waterfront Shoreline",
    dimensions: {
      waterWidth_m: 72.0,
      waterLength_m: 22.0,
      elevationY_m: -4.3,
      reedBankClusters: 45
    },
    position: { x: 0.0, y: -4.3, z: -26.5 },
    cameraView: {
      pos: { x: -26.0, y: 7.5, z: -34.0 },
      target: { x: 0.6, y: 2.0, z: -8.0 },
      fov: 68
    },
    properties: {
      waterSystem: "Treated marine lake environment in Jumeirah Islands Cluster 3",
      retainingWall: "C50 marine-grade reinforced concrete bulkhead wall"
    },
    missingFields: [
      "Lake Water Salinity & TDS Chemical Analysis",
      "Submerged Riprap Stone Volume"
    ],
    status: "Natural water body; shoreline wall completed"
  },
  {
    id: "BONSAI-PLANTER-01",
    name: "Sculpted Multi-Tier Bonsai Tree & Feature Planter",
    category: "Site & Landscape",
    floor: "ground",
    zone: "Site Perimeter & Driveway",
    dimensions: {
      planterDiameter_m: 2.9,
      treeHeight_m: 2.4,
      canopyPadsCount: 3
    },
    position: { x: 1.2, y: 0.06, z: 12.2 },
    cameraView: {
      pos: { x: 3.5, y: 2.0, z: 15.5 },
      target: { x: 1.2, y: 1.0, z: 12.2 },
      fov: 65
    },
    properties: {
      planter: "Circular honed travertine torus stone ring (outer radius 1.45m)",
      sculpture: "Multi-tiered Japanese Niwaki style cloud-pruned specimen tree",
      accentLighting: "3 illuminated frosted garden orbs (Y=0.2m) with warm diffused glow"
    },
    missingFields: [
      "Tree Nursery Origin Certificate",
      "Tree Microchip Tag ID"
    ],
    status: "Planter foundation poured on site (Photo #008); tree scheduled for final landscaping"
  },

  // --- IOT SENSOR NODES & MONITORING STATIONS ---
  {
    id: "NODE-MEP-004",
    name: "IoT Station MEP-004: Waterfall Cantilever & Pool Telemetry",
    category: "IoT Telemetry Station",
    floor: "basement",
    zone: "Rear Infinity Pool & Waterfront Shoreline",
    dimensions: { sensorRadius_m: 0.32 },
    position: { x: 5.6, y: 0.1, z: -5.3 },
    cameraView: {
      pos: { x: 0.6, y: 2.2, z: -23.5 },
      target: { x: 0.6, y: 2.0, z: -1.0 },
      fov: 62
    },
    properties: {
      liveMetrics: {
        slabDeflection: "-1.4 mm (Structural limit is -6.0 mm: Safe)",
        waterfallFlow: "145 L/min (Operational)",
        poolMosaic: "Cyan River-Vein Inlay verified against Photos #001 & #010",
        waterTemp: "27.8 °C (pH 7.4 calibrated)"
      },
      verifiedPhotoRef: "Photos #001, #005, #010"
    },
    missingFields: [
      "Telemetry Battery Discharge Curve",
      "Optical Refractometer Serial Number"
    ],
    status: "VERIFIED & ONLINE"
  },
  {
    id: "NODE-EXT-001",
    name: "IoT Station EXT-001: Lakeside Shoring Piezometer & Ramp",
    category: "IoT Telemetry Station",
    floor: "basement",
    zone: "Rear Infinity Pool & Waterfront Shoreline",
    dimensions: { sensorRadius_m: 0.32 },
    position: { x: -5.2, y: -1.8, z: -3.5 },
    cameraView: {
      pos: { x: -11.5, y: 3.2, z: -20.5 },
      target: { x: 2.2, y: 1.5, z: -3.5 },
      fov: 68
    },
    properties: {
      liveMetrics: {
        piezometerLevel: "-3.85m Water Table (Dry & Controlled)",
        shoringPileDrift: "0.01 mm/month (Allowable: 2.0 mm/mo)",
        sunkenPit: "Turf sub-base installed",
        retainingWall: "C50 Marine Grade concrete verified"
      },
      verifiedPhotoRef: "Photos #001, #010"
    },
    missingFields: [
      "Piezometer Sensor Calibration Certificate"
    ],
    status: "STABLE & VERIFIED"
  },
  {
    id: "NODE-STR-002",
    name: "IoT Station STR-002: Carport Pergola & Green Columns",
    category: "IoT Telemetry Station",
    floor: "ground",
    zone: "Site Perimeter & Driveway",
    dimensions: { sensorRadius_m: 0.32 },
    position: { x: 11.5, y: 3.6, z: 6.4 },
    cameraView: {
      pos: { x: 18.5, y: 3.0, z: 17.5 },
      target: { x: 6.5, y: 2.2, z: 4.5 },
      fov: 65
    },
    properties: {
      liveMetrics: {
        cantileverSpan: "13.2 Meters clear",
        evTriCharger: "22.0 kW 3-Phase Ready",
        hydroponicDrip: "2.4 L/hr automated cycle",
        ledChannel: "3000K warm IP67 channel"
      },
      verifiedPhotoRef: "Photos #002, #006, #009"
    },
    missingFields: [
      "Electric Meter Serial Number",
      "Irrigation Solenoid Valve Manufacturer"
    ],
    status: "ACTIVE & VERIFIED"
  },
  {
    id: "NODE-ARC-003",
    name: "IoT Station ARC-003: Double-Height Atrium HVAC & Acoustics",
    category: "IoT Telemetry Station",
    floor: "ground",
    zone: "Ground Floor Grand Foyer & Khutoot Wall",
    dimensions: { sensorRadius_m: 0.32 },
    position: { x: -0.2, y: 3.8, z: 3.0 },
    cameraView: {
      pos: { x: -5.2, y: 2.6, z: 13.5 },
      target: { x: -0.2, y: 3.4, z: 2.0 },
      fov: 70
    },
    properties: {
      liveMetrics: {
        curtainGlazing: "Double Low-E (U=1.2 W/m²K, SHGC=0.28)",
        claddingSpec: "Thermo-treated walnut vertical slats",
        atriumHVAC: "22.4 °C variable refrigerant loop",
        acousticSTC: "44 dB Certified acoustic reduction"
      },
      verifiedPhotoRef: "Photos #003, #004, #006"
    },
    missingFields: [
      "HVAC Variable Speed Compressor Model",
      "Acoustic Test Chamber Test Number"
    ],
    status: "OPTIMAL & VERIFIED"
  },
  {
    id: "NODE-CIV-005",
    name: "IoT Station CIV-005: Front Yard Staging & Planter Pits",
    category: "IoT Telemetry Station",
    floor: "ground",
    zone: "Site Perimeter & Driveway",
    dimensions: { sensorRadius_m: 0.32 },
    position: { x: -2.8, y: 0.3, z: 8.2 },
    cameraView: {
      pos: { x: -1.5, y: 16.5, z: 15.8 },
      target: { x: -0.5, y: 0.0, z: 9.2 },
      fov: 65
    },
    properties: {
      liveMetrics: {
        oct2026State: "Terracotta sand staging base (matched to Photo #008)",
        planterBoxes: "6 concrete pit foundations cast on site",
        irrigation: "4-zone sub-surface drip manifold",
        sitePower: "Temporary solar contractor lamp post operational"
      },
      verifiedPhotoRef: "Photos #006, #007, #008"
    },
    missingFields: [
      "Concrete Pit Waterproofing Slurry Brand",
      "Solar Lamp Battery Chemistry"
    ],
    status: "86% SITE STATE VERIFIED"
  }
];

class BuildingDataService {
  constructor() {
    this.projectMetadata = PROJECT_METADATA;
    this.elements = BUILDING_ELEMENTS;
  }

  /**
   * Returns top-level project metadata, site area, BUA, levels, and construction progress.
   */
  getBuildingSummary() {
    return {
      status: "success",
      project: this.projectMetadata.project
    };
  }

  /**
   * Searches elements by free-text query, category, or floor.
   * Does not hallucinate non-existent elements.
   */
  searchElements({ query = "", category = "", floor = "" } = {}) {
    const q = query.trim().toLowerCase();
    const cat = category.trim().toLowerCase();
    const fl = floor.trim().toLowerCase();

    const matches = this.elements.filter(el => {
      const matchQuery = !q || (
        el.id.toLowerCase().includes(q) ||
        el.name.toLowerCase().includes(q) ||
        el.category.toLowerCase().includes(q) ||
        el.zone.toLowerCase().includes(q) ||
        JSON.stringify(el.properties).toLowerCase().includes(q)
      );

      const matchCategory = !cat || el.category.toLowerCase().includes(cat);
      const matchFloor = !fl || fl === 'all' || el.floor.toLowerCase() === fl;

      return matchQuery && matchCategory && matchFloor;
    });

    return {
      status: "success",
      totalMatches: matches.length,
      elements: matches.map(el => ({
        id: el.id,
        name: el.name,
        category: el.category,
        floor: el.floor,
        zone: el.zone,
        status: el.status,
        dimensions: el.dimensions
      }))
    };
  }

  /**
   * Retrieves full details for a specific element by stable ID.
   * Clearly presents available vs missing fields.
   */
  getElementDetails({ elementId }) {
    if (!elementId) {
      return { status: "error", message: "elementId parameter is required" };
    }

    const cleanId = elementId.trim().toUpperCase();
    const element = this.elements.find(el => el.id.toUpperCase() === cleanId);

    if (!element) {
      return {
        status: "not_found",
        elementId: cleanId,
        message: `No building element with ID '${cleanId}' was found in the official Jumeirah Islands 003 BIM registry.`,
        availableElementIds: this.elements.map(e => e.id)
      };
    }

    return {
      status: "success",
      element: {
        id: element.id,
        name: element.name,
        category: element.category,
        floor: element.floor,
        zone: element.zone,
        dimensions: element.dimensions,
        position: element.position,
        cameraView: element.cameraView,
        properties: element.properties,
        status: element.status,
        missingFields: element.missingFields,
        documentedDataSource: "Jumeirah Islands 003 BIM Model & Site Telemetry Registry"
      }
    };
  }

  /**
   * Prepares 3D location telemetry and viewer actions for the frontend.
   */
  locateElement({ elementId }) {
    if (!elementId) {
      return { status: "error", message: "elementId parameter is required" };
    }

    const cleanId = elementId.trim().toUpperCase();
    const element = this.elements.find(el => el.id.toUpperCase() === cleanId);

    if (!element) {
      return {
        status: "not_found",
        elementId: cleanId,
        message: `Cannot locate '${cleanId}' — element is not present in the BIM database.`
      };
    }

    return {
      status: "success",
      elementId: element.id,
      name: element.name,
      floor: element.floor,
      position: element.position,
      cameraView: element.cameraView,
      dimensions: element.dimensions,
      action: {
        type: "LOCATE_ELEMENT",
        elementId: element.id,
        name: element.name,
        floor: element.floor,
        cameraPos: element.cameraView.pos,
        cameraTarget: element.cameraView.target,
        fov: element.cameraView.fov,
        highlightPosition: element.position,
        dimensions: element.dimensions
      }
    };
  }

  /**
   * Validates and prepares floor isolation action for the viewer.
   */
  isolateFloor({ floor }) {
    const validFloors = ["all", "basement", "ground", "first", "roof"];
    const fl = (floor || "").trim().toLowerCase();

    if (!validFloors.includes(fl)) {
      return {
        status: "invalid_argument",
        providedFloor: floor,
        message: `Invalid floor '${floor}'. Valid floor levels are: 'all', 'basement' (Lower Pool Deck), 'ground' (Grand Foyer & Atrium), 'first' (Bedrooms), 'roof' (Crown Canopy).`
      };
    }

    const floorNames = {
      all: "All Levels (Global Overview)",
      basement: "Lower Ground / Pool Deck (Y = -3.4m to 0.0m)",
      ground: "Ground Floor / Grand Atrium & Living (Y = 0.0m to 3.7m)",
      first: "First Floor / Bedroom Suites (Y = 3.7m to 7.4m)",
      roof: "Roof Canopy & Crown (Y = 7.4m to 9.2m)"
    };

    return {
      status: "success",
      floor: fl,
      floorName: floorNames[fl],
      action: {
        type: "ISOLATE_FLOOR",
        floor: fl,
        floorName: floorNames[fl]
      }
    };
  }

  /**
   * Returns list of all element IDs for validation.
   */
  getAllElementIds() {
    return this.elements.map(e => e.id);
  }
}

module.exports = new BuildingDataService();
