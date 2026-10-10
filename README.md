# 🏝️ Jumeirah Islands Villa 003 — 3D Interactive Digital Twin & Site Telemetry

[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Dubai UAE](https://img.shields.io/badge/Location-Dubai%2C%20UAE-00732f?style=for-the-badge)](https://en.wikipedia.org/wiki/Jumeirah_Islands)
[![Status](https://img.shields.io/badge/Construction%20Status-82%25%20Superstructure-blue?style=for-the-badge)](#project-telemetry)

An interactive, browser-based **3D BIM Digital Twin** and site inspection platform for **Jumeirah Islands Luxury Villa Plot 003** in Dubai, UAE. This application pairs real-time WebGL rendering with actual high-resolution site photography, spatial camera frustum cones, solar shadow simulations, 3D laser measurement tools, and BIM layer inspection.

---

## 🌟 Live Demo & Quick Preview

You can host this project directly on **GitHub Pages** with zero build configuration!

1. Go to repository **Settings** > **Pages**.
2. Select **Branch: `main`** and **Folder: `/ (root)`**.
3. Click **Save** — your live 3D Digital Twin URL will be published immediately!

---

## 🚀 Key Features

### 🏛️ 1. Interactive 3D Architectural Model
- High-fidelity parametric model of the luxury G+1+Roof villa with cantilevered master suites, infinity swimming pool, wooden facade louvers, glazed curtain walls, landscape pergolas, and shoreline water boundaries.
- Smooth orbit, pan, rotate, and pinch-zoom camera controls with physical bounding limits.
- Architectural preset camera angles: **Front Elevation**, **Rear Pool**, **Aerial Drone**, **Main Portal**, **Waterfront Lake**, and **Auto-Orbit Tour**.

### 📸 2. Synchronized 3D Site Camera Frustum Mapping
- Spatial 3D camera pins and projection frustum cones mapped to real-world coordinates and azimuth orientations on the construction site.
- Interactive click-to-inspect modal comparing the 3D model vantage point with the corresponding high-resolution on-site progress photograph.
- Telemetry data for each camera station: Azimuth angle, height (eye level vs elevated), field of view (FOV), and exact timestamp.

### ☀️ 3. Dubai Solar & Lighting Simulation
- **Daylight Mode**: Architectural Dubai midday sun with accurate soft shadows and ambient illumination.
- **Sunset Mode**: Warm golden hour lighting highlighting facade stone textures and water reflections.
- **Night Mode**: Luxury landscape & architectural uplighting with ambient pool luminescence.
- **BIM Wireframe Mode**: X-Ray structural inspection highlighting wireframe mesh geometries.
- **Solar Simulator Slider**: Scrub between 06:00 AM and 07:00 PM to observe real-time shadow projection across the villa and adjacent pool deck.

### 📏 4. Interactive 3D Laser Measurement Tool
- Point-to-point 3D measurement in real-time.
- Click any two structural points in the 3D scene to calculate architectural distances (in meters) with visual laser guide markers.

### 🧩 5. BIM Layer Inspection Controls
- Granular visibility toggles for building layers:
  - 🏗️ **Concrete Superstructure & Slabs**
  - 🧱 **Exterior Stone & Stucco Facades**
  - 🪟 **Glazing & Window Systems**
  - 🪵 **Timber Louvers & Interior Accents**
  - 🌿 **Landscape, Pool & Boundary Walls**
  - 🚜 **Site Excavation, Ramp & Shoring Works**

---

## 🏗️ Project Telemetry & Specifications

| Property | Details |
| :--- | :--- |
| **Project Code** | `JI-VILLA-003` |
| **Location** | Cluster 3, Jumeirah Islands, Dubai, United Arab Emirates |
| **Coordinates** | `25.0617° N, 55.1528° E` |
| **Plot Area** | 12,450 sq.ft |
| **Built-Up Area (BUA)** | 9,800 sq.ft (G + 1 + Roof Terrace) |
| **Engineering Consultant** | ONIX Engineering Consultancy |
| **Main Contractor** | VH Contracting LLC |
| **As-Built Milestone** | October 2026 (82% Superstructure Complete) |

---

## 💻 Tech Stack

- **3D Graphics Engine**: [Three.js](https://threejs.org/) (r128) WebGL with `OrbitControls`
- **Animation**: [Tween.js](https://github.com/tweenjs/tween.js) for camera transitions
- **Typography & Icons**: Google Fonts ([Outfit](https://fonts.google.com/specimen/Outfit), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)) and [FontAwesome 6](https://fontawesome.com/)
- **Styling**: Vanilla CSS3 with glassmorphism, responsive CSS grid/flexbox, and dark mode tokens
- **Architecture**: Modular vanilla JavaScript ES6 (Zero build step or bundler needed)

---

## 📂 Project Structure

```text
├── index.html            # Main HTML document & responsive application shell
├── style.css             # Glassmorphic UI styling, overlays, controls, & responsive layout
├── app.js                # Core controller: Three.js renderer, render loop, event orchestration
├── modelBuilder.js        # Procedural 3D BIM villa architecture, materials, and layers
├── cameraManager.js       # 3D spatial camera pins, frustums, raycasting & inspector modal
├── lightingManager.js     # Solar positioning, shadows, day/sunset/night lighting rigs
├── measurementTool.js     # 3D laser point-to-point distance measurement system
├── dashboardData.js       # Telemetry data, project metadata, and camera database
└── *.jpg / *.jpeg         # High-resolution site inspection photographs (Dubai site captures)
```

---

## 🛠️ How to Run Locally

Because the project loads local images and Three.js modules via standard web protocols, running with a local HTTP server is recommended:

### Option 1: VS Code Live Server (Easiest)
1. Open this repository in [Visual Studio Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension (`ritwickdey.LiveServer`).
3. Right-click [`index.html`](index.html) and select **Open with Live Server**.

### Option 2: Python HTTP Server (Built-in)
Run in your terminal or command prompt:

```bash
# Python 3
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

### Option 3: Node.js / npx
```bash
npx serve .
```

### Option 4: Direct Browser Open
Double-click [`index.html`](index.html) to open directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

---

## 🎮 Navigation & Controls Guide

| Action | Control |
| :--- | :--- |
| **Rotate / Orbit** | Left Click + Drag (or Single-finger swipe on mobile) |
| **Pan / Translate** | Right Click + Drag / Two-finger swipe |
| **Zoom In / Out** | Mouse Scroll Wheel / Pinch-to-zoom |
| **Inspect Camera Station** | Click any pulsing camera beacon in 3D space or select from sidebar |
| **Measure 3D Distance** | Click **"Measure"** tool in header, then click 2 points in the 3D scene |
| **Time of Day** | Drag the solar slider or click daylight/sunset/night preset buttons |
| **Toggle BIM Layers** | Use the sidebar layer checkboxes to isolate structural elements |

---

## 🤝 Contributing & Customization

Contributions and extensions are welcome! Potential improvements:
- Adding IFC / glTF model loaders for Revit or Rhino BIM exports.
- Integrating live IoT temperature and concrete curing sensors.
- Adding VR / WebXR walkthrough support.

To customize camera markers or project metadata, simply update [`dashboardData.js`](dashboardData.js).

---

## 📄 License & Attribution

- **Project Design & BIM Engineering**: Devendra Kumar Gupta & ONIX Engineering Consultancy.
- **Site Location**: Jumeirah Islands, Dubai, United Arab Emirates.
- Released for educational, BIM digital twin portfolio, and construction telemetry demonstration purposes.
