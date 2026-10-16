# 🏝️ Jumeirah Islands Villa 003 — 3D Interactive Digital Twin & Site Telemetry

[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Architecture](https://img.shields.io/badge/Architecture-Category%20Theory%20UI-indigo?style=for-the-badge)](#mathematical-categorical-architecture)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Dubai UAE](https://img.shields.io/badge/Location-Dubai%2C%20UAE-00732f?style=for-the-badge)](https://en.wikipedia.org/wiki/Jumeirah_Islands)
[![Status](https://img.shields.io/badge/Construction%20Status-86.4%25%20Site%20State-blue?style=for-the-badge)](#project-telemetry)

An enterprise-grade, browser-based **3D BIM Digital Twin** and site telemetry platform for **Jumeirah Islands Luxury Villa Plot 003** in Dubai, UAE, engineered for **ONIX Engineering Consultancy** and **VH Contracting LLC**.

Built on rigorous **Category Theory UI/UX Principles**:
1. **Natural Transformation for View Transitions**: View state functors $V: \mathbf{Domain} \to \mathbf{ViewportState}$ with structure-preserving geodesic cubic Bezier morphs between representation systems (3D viewport $\leftrightarrow$ 2D tactical radar $\leftrightarrow$ camera stations $\leftrightarrow$ BIM cuts).
2. **Adjunction for Navigation Depth ($F \dashv G$)**: Dual-category depth pairing between **Macro Overview Context $\mathcal{C}$** and **Deep Telemetry Inspection $\mathcal{D}$**, guaranteeing lossless state recall, persistent breadcrumb anchors, and bijective return ($G \circ F \cong \text{id}$).
3. **Endomorphism Monoid for Interaction ($\operatorname{End}(S), \circ, \operatorname{id}$)**: Every user interaction (phase scrubbing, BIM section clipping, atmosphere switching, CAD edges, floor isolation, laser measurement) is a pure, composable endomorphic state transformation.

---

## 🌟 Live Demo & Quick Deployment

Host this digital twin directly on **GitHub Pages** with zero build configuration:

1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3. Select **Branch: `main`** and **Folder: `/ (root)`**.
4. Click **Save** — your live 3D Digital Twin URL will be published immediately!

---

## 🚀 Key Features

### 🏛️ 1. Ultra-Photorealistic Procedural BIM Architecture
- **Procedural PBR Textures**:
  - Micro-cement troweled stucco with calibrated bump maps and zero washout under ACES Filmic tone mapping.
  - Fluted American walnut panels with 3D bump shadow grooves.
  - Signature ONIX etched wave decals across double-glazed curtain walls.
  - Custom cyan river-vein mosaic pool texture matching real site captures (Photos #001 & #010).
  - Refractive animated pool water with normal maps and sheer descent waterfall weir with mist particle system.
- **Architectural Elements across 3 Levels + Roof**:
  - Lower pool deck with travertine dining table, bronze framing, fluted wood chairs, and poolside lounge sofa.
  - Double-height entrance atrium (Y=0 to 7.2) with floating travertine staircase and 3-ring cascading chandelier.
  - 13.2m cantilevered carport pergola with coffer beams, recessed linear LEDs, metallic garage wall, and 3 living vertical green-wall columns.
  - First-floor master bedroom suite with ceiling LED cove, wrap-around curtain glass, and frameless glass balustrades.
  - Overhanging C-frame roof canopy with continuous perimeter linear LEDs and pinhole downlights.
- **Three Chronological Construction Phases**:
  - **Phase 1: Structure & Shoring (62%)**: Raw concrete superstructure, rear lakeside shoring piles, and excavation ramp.
  - **Phase 2: 08 Oct 2026 Site State (86.4%)**: Terracotta sand staging beds, 6 concrete planter foundation pits, stacked scaffolding steel pipes, timber boards, portable solar site lamp post, contractor supply pickup truck, burlap-wrapped palms, and neighboring villa scaffolding.
  - **Phase 3: ONIX Final Handover Render (100%)**: Manicured lawns, sculpted multi-tier bonsai tree, circular stone feature planter, glowing garden orbs, luxury vehicles (G-Wagon, Audi, Porsche), and mature tropical date palms.

### 📐 2. Real-Time BIM Section Cut Clipping Planes
- Interactive Y-Axis horizontal level cut slider (-3.2m to 12.0m) to slice through floor slabs and inspect interior structural framing.
- Interactive X-Axis longitudinal cross-cut slider (-9.5m to 16.0m) to inspect structural core columns and lightwells.
- Crisp Architectural CAD edge definition outlines (`cadEdgeLight` and `cadEdgeDark`) with one-click vector toggle.

### 🎥 3. 16 Site Camera Stations with 460+ Frame Timelapse Player
- Mapped to exact 3D spatial coordinates, azimuth angles, eye-level heights, and FOVs across the site.
- Interactive timelapse scrubber with Play/Pause animation and speed toggling.
- Side-by-side split screen and opacity overlay comparison with physical site captures.

### 🧭 3. Tactical 2D Site Minimap Radar
- Top-down tactical radar in the viewport displaying the villa footprint, swimming pool, boundary fence, and lake shore.
- Real-time rotating user camera viewing cone (FOV triangle) that synchronizes with orbital navigation.
- Color-coded camera pins with one-click teleportation.

### ☀️ 4. Dubai Solar & Lighting Simulation
- Physically accurate solar trajectory calibrated for Dubai coordinates (Lat 25.06° N, Long 55.15° E).
- Presets for **Daylight**, **Golden Hour Sunset**, **Luxury Night Mode**, and **X-Ray BIM Wireframe**.
- Interactive solar slider (06:00 to 20:00) with dynamic shadow projection and azimuth/altitude readouts.

### 🧩 5. Exploded BIM Axonometric & Floor Isolation
- Smoothly explode the villa along the Y-axis to inspect floor plans and interior rooms simultaneously.
- Isolate individual levels: **All Floors**, **Roof Suite**, **First Floor (FF)**, **Ground Floor (GF)**, **Lower Ground (LG)**.

### 📏 6. 3D Laser Dimension / Measurement Tool
- Point-to-point 3D measurement in real-time. Click any two structural points in the model to calculate distances in meters with guide lasers.

---

## 🔌 Developer Integration API (`window.JumeirahTwinAPI`)

Embed the Digital Twin into React, Next.js, Vue, or an external dashboard via direct JavaScript calls or `iframe` `postMessage`:

### Direct JavaScript API
```javascript
// Switch between 'render' (Finished ONIX) and 'site' (Oct 2026 Construction)
window.JumeirahTwinAPI.setSiteState('site'); // or 'render'

// Smoothly fly camera to architectural vantage points
window.JumeirahTwinAPI.setCameraView('rearPool');
// Options: 'frontRender' | 'rearPool' | 'rearShoring' | 'frontYardTop' | 'carport' | 'aerial' | 'entry' | 'lake' | 'orbit'

// Set Lighting Mode
window.JumeirahTwinAPI.setEnvironment('dusk'); // 'day' | 'dusk' | 'night' | 'wireframe'

// Toggle Exploded BIM View
window.JumeirahTwinAPI.explodeBIM(true); // true or false

// Select Camera Station by ID
window.JumeirahTwinAPI.selectCamera('CAM-09');

// Query Current Twin State
const state = window.JumeirahTwinAPI.getState();
console.log(state); // { siteState: 'site', environment: 'day', activeCamera: 'CAM-01', ... }
```

### Iframe Embed & PostMessage (React / Next.js / Vue)
```jsx
// React / Next.js Example
import { useRef } from 'react';

export default function TwinEmbed() {
  const iframeRef = useRef(null);

  const switchState = (state) => {
    iframeRef.current?.contentWindow.postMessage({
      type: 'TWIN_COMMAND',
      action: 'SET_STATE',
      payload: state // 'site' or 'render'
    }, '*');
  };

  const changeView = (view) => {
    iframeRef.current?.contentWindow.postMessage({
      type: 'TWIN_COMMAND',
      action: 'SET_VIEW',
      payload: view // 'rearPool', 'frontRender', etc.
    }, '*');
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <iframe
        ref={iframeRef}
        src="http://localhost:8080"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Jumeirah Islands Villa 003 Digital Twin"
      />
    </div>
  );
}
```

---

## 🏗️ Project Telemetry & Specifications

| Property | Details |
| :--- | :--- |
| **Project Code** | `JI-VILLA-003` |
| **Location** | Cluster 3, Jumeirah Islands, Dubai, United Arab Emirates |
| **Coordinates** | `25.0617° N, 55.1528° E` |
| **Plot Area** | 12,450 sq.ft |
| **Built-Up Area (BUA)** | 9,800 sq.ft (LG + G + 1 + Roof Terrace) |
| **Engineering Consultant** | ONIX Engineering Consultancy |
| **Main Contractor** | VH Contracting LLC |
| **As-Built Milestone** | October 2026 (84% Superstructure & Finishing Complete) |
| **Site Stations** | 16 Active Multi-Angle Timelapse Stations (460+ captures) |

---

## 📂 Project Structure

```text
├── index.html                 # Main application shell with glassmorphism HUD & Minimap
├── style.css                  # Enterprise design system, glass cards, responsive layout
├── app.js                     # Core controller: Three.js renderer, JumeirahTwinAPI, postMessage
├── modelBuilder.js             # Dual-State 3D Engine ('render' vs 'site'), Exploded BIM, Materials
├── cameraManager.js            # 3D spatial camera pins, frustums, and 16-station timelapse player
├── lightingManager.js          # Dubai solar calculator, day/dusk/night lighting rigs, shadows
├── measurementTool.js          # Interactive 3D laser dimensioning & distance measurement
├── minimap.js                  # Tactical 2D canvas site radar with live viewing cone
├── dashboardData.js            # Telemetry metadata, project specs, and 460+ frame camera registry
├── site-pictures/              # 16 on-site photo capture timelapse folders (460+ frames)
└── README.md                   # Comprehensive developer documentation & API specification
```

---

## 🛠️ How to Run Locally

### Option 1: VS Code Live Server (Fastest)
1. Open this repository in [Visual Studio Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension (`ritwickdey.LiveServer`).
3. Right-click [`index.html`](index.html) and select **Open with Live Server**.

### Option 2: Python HTTP Server (Built-in)
```bash
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

### Option 3: Node.js / npx
```bash
npx serve .
```

---

## 🎮 Pro Keyboard Shortcuts Guide

| Key | Action |
| :--- | :--- |
| <kbd>1</kbd> - <kbd>5</kbd> | Preset Views (*Front*, *Rear Pool*, *Aerial*, *Entrance*, *Lake*) |
| <kbd>Space</kbd> | Toggle 360° Cinematic Orbital Tour |
| <kbd>C</kbd> | Toggle 3D Camera Pins & Frustum Cones |
| <kbd>M</kbd> | Toggle 3D Laser Dimension / Measurement Tool |
| <kbd>E</kbd> | Toggle Exploded BIM Axonometric Mode |
| <kbd>L</kbd> | Cycle Lighting (*Daylight*, *Sunset/Dusk*, *Night Mode*, *Wireframe*) |
| <kbd>H</kbd> | Toggle Minimalist Clean HUD Mode |
| <kbd>P</kbd> | Capture High-Resolution Viewport Screenshot PNG |
| <kbd>?</kbd> | Open Keyboard Shortcuts Reference HUD |
| <kbd>Esc</kbd> | Close Modal / Return to 3D Viewport |

---

## 📄 License & Attribution

- **Project Design & BIM Engineering**: Devendra Kumar Gupta & ONIX Engineering Consultancy.
- **Site Location**: Jumeirah Islands, Dubai, United Arab Emirates.
- Released for BIM digital twin visualization, engineering portfolio, and construction site telemetry demonstration.
