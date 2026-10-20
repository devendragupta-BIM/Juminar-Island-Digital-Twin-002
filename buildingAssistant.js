/**
 * JUMEIRAH ISLANDS DIGITAL TWIN — AI BUILDING ASSISTANT CLIENT CONTROLLER
 * Integrates Groq Building Intelligence, Safe Tool Execution & 3D Highlighting
 * 
 * Features:
 * - Real-time conversational UI with streaming-style rendering & Markdown support
 * - Visual 3D element highlighting (pulsing bounding box & locator beacon)
 * - Safe dispatch of viewer actions (LOCATE_ELEMENT, ISOLATE_FLOOR)
 * - Zero client-side arbitrary script execution
 */

class BuildingAssistant {
  constructor() {
    this.isOpen = false;
    this.history = [];
    this.isThinking = false;
    this.activeHighlight = null;
    this.highlightGroup = new THREE.Group();
    this.highlightGroup.name = "AI_Highlight_Group";

    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.cameraManager = null;
    this.modelBuilder = null;

    this.dom = {
      dock: null,
      toggleBtn: null,
      closeBtn: null,
      clearBtn: null,
      messages: null,
      input: null,
      sendBtn: null,
      suggestions: null,
      statusIndicator: null,
      activeElementBanner: null,
      activeElementName: null,
      activeElementId: null,
      btnFocusActive: null,
      btnClearActive: null
    };
  }

  init(scene, camera, controls, cameraManager, modelBuilder) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.cameraManager = cameraManager;
    this.modelBuilder = modelBuilder;

    if (this.scene) {
      this.scene.add(this.highlightGroup);
    }

    this.bindDOM();
    this.initSuggestedQuestions();
    this.addWelcomeMessage();
  }

  bindDOM() {
    this.dom.dock = document.getElementById('ai-chat-dock');
    this.dom.toggleBtn = document.getElementById('btn-toggle-ai');
    this.dom.closeBtn = document.getElementById('btn-close-ai');
    this.dom.clearBtn = document.getElementById('btn-clear-chat');
    this.dom.messages = document.getElementById('ai-messages-container');
    this.dom.input = document.getElementById('ai-chat-input');
    this.dom.sendBtn = document.getElementById('btn-ai-send');
    this.dom.suggestions = document.getElementById('ai-suggestions-track');
    this.dom.statusIndicator = document.getElementById('ai-online-status');
    this.dom.activeElementBanner = document.getElementById('ai-active-element-banner');
    this.dom.activeElementName = document.getElementById('ai-active-element-name');
    this.dom.activeElementId = document.getElementById('ai-active-element-id');
    this.dom.btnFocusActive = document.getElementById('btn-ai-focus-element');
    this.dom.btnClearActive = document.getElementById('btn-ai-clear-highlight');

    // Toggle button in header
    this.dom.toggleBtn?.addEventListener('click', () => {
      this.toggle(!this.isOpen);
    });

    // Close button in sidebar
    this.dom.closeBtn?.addEventListener('click', () => {
      this.toggle(false);
    });

    // Reset conversation button
    this.dom.clearBtn?.addEventListener('click', () => {
      this.clearConversation();
    });

    // Send on button click
    this.dom.sendBtn?.addEventListener('click', () => {
      this.handleSend();
    });

    // Send on Enter (Shift+Enter for newline)
    this.dom.input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSend();
      }
    });

    // Focus active element in 3D
    this.dom.btnFocusActive?.addEventListener('click', () => {
      if (this.activeHighlight && this.activeHighlight.cameraView) {
        const v = this.activeHighlight.cameraView;
        this.cameraManager?.flyTo(v.pos, v.target, v.fov || 65, 1100);
      }
    });

    // Clear active 3D highlight
    this.dom.btnClearActive?.addEventListener('click', () => {
      this.clearHighlight();
    });
  }

  toggle(forceState) {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;

    if (this.dom.dock) {
      if (this.isOpen) {
        this.dom.dock.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
        this.dom.dock.classList.add('translate-x-0', 'opacity-100');
        this.dom.toggleBtn?.classList.add('active', 'ring-2', 'ring-[#8EB69B]');
        setTimeout(() => this.dom.input?.focus(), 150);
      } else {
        this.dom.dock.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
        this.dom.dock.classList.remove('translate-x-0', 'opacity-100');
        this.dom.toggleBtn?.classList.remove('active', 'ring-2', 'ring-[#8EB69B]');
      }
    }
  }

  initSuggestedQuestions() {
    const questions = [
      "Summarize building specs",
      "Where is the infinity pool?",
      "Inspect cantilever carport",
      "Isolate first floor suites",
      "Check construction progress",
      "Double-height entrance details"
    ];

    if (!this.dom.suggestions) return;
    this.dom.suggestions.innerHTML = '';

    questions.forEach(q => {
      const btn = document.createElement('button');
      btn.className = "px-2.5 py-1 rounded-lg text-[10px] font-sans text-[#8EB69B] hover:text-[#DAF1DE] bg-[#051F20]/70 hover:bg-[#235347]/40 border border-[#8EB69B]/25 hover:border-[#8EB69B]/50 transition whitespace-nowrap flex items-center gap-1.5 flex-shrink-0";
      btn.innerHTML = `<i class="fa-solid fa-sparkles text-[9px] text-[#8EB69B]"></i> <span>${q}</span>`;
      btn.addEventListener('click', () => {
        if (this.isThinking) return;
        this.sendMessage(q);
      });
      this.dom.suggestions.appendChild(btn);
    });
  }

  addWelcomeMessage() {
    const welcomeText = `**Welcome to Jumeirah Islands Villa 003 AI Building Assistant.**

I am connected to the official **BIM Geometry Database**, **October 2026 Site Telemetry**, and **Groq (openai/gpt-oss-20b)**.

You can ask me to:
- 🏛️ **Retrieve verified specs** (plot area, BUA, concrete grades, floor heights)
- 📍 **Locate & highlight elements in 3D** (e.g. *"Show me the cantilevered carport pergola"* or *"Where is the infinity pool?"*)
- 🏢 **Isolate floor levels** (e.g. *"Isolate the first floor suites"*)
- 📊 **Check construction milestone progress** (current site completion: **84%**)

*All responses are strictly grounded in retrieved project records. Missing or undocumented parameters are explicitly identified.*`;

    this.appendMessage('assistant', welcomeText);
  }

  async handleSend() {
    if (!this.dom.input) return;
    const text = this.dom.input.value.trim();
    if (!text || this.isThinking) return;

    this.dom.input.value = '';
    await this.sendMessage(text);
  }

  async sendMessage(userText) {
    if (this.isThinking) return;

    this.isThinking = true;
    this.appendMessage('user', userText);
    this.history.push({ role: 'user', content: userText });

    const thinkingBubble = this.appendThinkingIndicator();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: this.history
        })
      });

      thinkingBubble?.remove();

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        const assistantText = data.message || "I have processed your request.";
        this.appendMessage('assistant', assistantText, data.actions);
        this.history.push({ role: 'assistant', content: assistantText });

        // Execute safe client viewer actions
        if (Array.isArray(data.actions)) {
          this.executeViewerActions(data.actions);
        }
      } else {
        const errMsg = data.message || "An unexpected error occurred.";
        this.appendMessage('assistant', `⚠️ **Assistant Notice**: ${errMsg}`);
      }

    } catch (err) {
      thinkingBubble?.remove();
      console.error("Chat communication error:", err);
      this.appendMessage('assistant', `⚠️ **Connection Error**: Unable to reach AI Building Assistant endpoint (\`/api/chat\`). Please ensure the server is running with a valid \`GROQ_API_KEY\`.`);
    } finally {
      this.isThinking = false;
      this.scrollToBottom();
    }
  }

  executeViewerActions(actions) {
    actions.forEach(action => {
      if (action.type === 'LOCATE_ELEMENT') {
        // 1. Isolate floor if appropriate, or ensure floor is visible
        if (action.floor && action.floor !== 'all' && this.modelBuilder?.floors?.[action.floor]) {
          // If element belongs to a specific floor, ensure it's visible
          this.modelBuilder.floors[action.floor].visible = true;
        }

        // 2. Geodesic camera transition
        if (action.cameraPos && action.cameraTarget && this.cameraManager) {
          this.cameraManager.flyTo(
            action.cameraPos,
            action.cameraTarget,
            action.fov || 65,
            1200
          );
        }

        // 3. Highlight element in 3D
        this.highlightElement(action);
      }

      if (action.type === 'ISOLATE_FLOOR') {
        if (window.JumeirahTwinAPI && typeof window.JumeirahTwinAPI.isolateFloor === 'function') {
          window.JumeirahTwinAPI.isolateFloor(action.floor);
        }
      }
    });
  }

  highlightElement(action) {
    this.clearHighlight();

    const pos = action.highlightPosition || action.position;
    const dims = action.dimensions || {};
    const w = dims.width_m || dims.basinWidth_m || dims.weirWidth_m || dims.tableWidth_m || dims.waterWidth_m || 3.0;
    const h = dims.height_m || dims.thickness_m || dims.waterDropHeight_m || 1.5;
    const d = dims.depth_m || dims.basinLength_m || dims.waterLength_m || dims.tableDepth_m || 3.0;

    // Create glowing emerald wireframe highlight box
    const boxGeo = new THREE.BoxGeometry(w + 0.4, h + 0.4, d + 0.4);
    const wireGeo = new THREE.EdgesGeometry(boxGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xDAF1DE,
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    wireMesh.position.set(pos.x, pos.y, pos.z);

    // Translucent glowing fill volume
    const fillMat = new THREE.MeshBasicMaterial({
      color: 0x8EB69B,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const fillMesh = new THREE.Mesh(boxGeo, fillMat);
    fillMesh.position.set(pos.x, pos.y, pos.z);

    // Floating pulsing beacon ring
    const ringGeo = new THREE.RingGeometry(0.8, 1.15, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8EB69B,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.set(pos.x, pos.y + h / 2 + 0.6, pos.z);

    this.highlightGroup.add(wireMesh);
    this.highlightGroup.add(fillMesh);
    this.highlightGroup.add(ringMesh);

    this.activeHighlight = {
      action,
      cameraView: {
        pos: action.cameraPos,
        target: action.cameraTarget,
        fov: action.fov
      },
      wireMesh,
      fillMesh,
      ringMesh,
      startTime: performance.now()
    };

    // Update active element banner in chat
    if (this.dom.activeElementBanner) {
      this.dom.activeElementBanner.classList.remove('hidden');
      if (this.dom.activeElementName) this.dom.activeElementName.textContent = action.name || "Building Element";
      if (this.dom.activeElementId) this.dom.activeElementId.textContent = action.elementId || "";
    }
  }

  clearHighlight() {
    while (this.highlightGroup.children.length > 0) {
      const obj = this.highlightGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
      this.highlightGroup.remove(obj);
    }
    this.activeHighlight = null;

    if (this.dom.activeElementBanner) {
      this.dom.activeElementBanner.classList.add('hidden');
    }
  }

  update(time) {
    // Pulse animation for active 3D highlight
    if (this.activeHighlight && this.activeHighlight.ringMesh) {
      const elapsed = (time - this.activeHighlight.startTime) * 0.003;
      const scale = 1.0 + Math.sin(elapsed) * 0.18;
      this.activeHighlight.ringMesh.scale.set(scale, scale, 1);
      if (this.activeHighlight.fillMesh) {
        this.activeHighlight.fillMesh.material.opacity = 0.12 + Math.sin(elapsed * 2) * 0.06;
      }
    }
  }

  appendMessage(role, text, actions = []) {
    if (!this.dom.messages) return;

    const row = document.createElement('div');
    row.className = `flex gap-2.5 ${role === 'user' ? 'justify-end' : 'justify-start'}`;

    if (role === 'user') {
      row.innerHTML = `
        <div class="max-w-[85%] bg-gradient-to-r from-[#235347] to-[#163832] text-[#DAF1DE] rounded-2xl rounded-tr-sm px-3.5 py-2.5 border border-[#8EB69B]/35 shadow-lg text-xs leading-relaxed font-sans">
          ${this.escapeHTML(text)}
        </div>
        <div class="w-6 h-6 rounded-full bg-[#235347] border border-[#8EB69B]/40 flex items-center justify-center text-[10px] text-[#DAF1DE] flex-shrink-0 mt-0.5 shadow">
          <i class="fa-solid fa-user"></i>
        </div>
      `;
    } else {
      let actionsHTML = '';
      if (actions && actions.length > 0) {
        actions.forEach(a => {
          if (a.type === 'LOCATE_ELEMENT') {
            actionsHTML += `
              <div class="mt-2.5 pt-2 border-t border-[#8EB69B]/20 flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-[#235347]/40 text-[#DAF1DE] border border-[#8EB69B]/35">
                  <i class="fa-solid fa-location-crosshairs text-[#8EB69B]"></i> <span>${a.elementId}</span>
                </span>
                <span class="text-[10px] text-[#8EB69B] font-sans truncate">Located in 3D Viewport</span>
              </div>
            `;
          }
          if (a.type === 'ISOLATE_FLOOR') {
            actionsHTML += `
              <div class="mt-2.5 pt-2 border-t border-[#8EB69B]/20 flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-[#235347]/40 text-[#DAF1DE] border border-[#8EB69B]/35">
                  <i class="fa-solid fa-layer-group text-[#8EB69B]"></i> <span>Floor: ${a.floor.toUpperCase()}</span>
                </span>
                <span class="text-[10px] text-[#8EB69B] font-sans">Level Isolated</span>
              </div>
            `;
          }
        });
      }

      row.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-[#051F20] border border-[#8EB69B]/40 flex items-center justify-center text-[10px] text-[#8EB69B] flex-shrink-0 mt-0.5 shadow">
          <i class="fa-solid fa-robot"></i>
        </div>
        <div class="max-w-[88%] bg-[#0B2B26]/90 text-[#DAF1DE] rounded-2xl rounded-tl-sm px-3.5 py-3 border border-[#8EB69B]/25 shadow-xl text-xs leading-relaxed font-sans prose-invert">
          <div class="ai-markdown-body">${this.renderMarkdown(text)}</div>
          ${actionsHTML}
        </div>
      `;
    }

    this.dom.messages.appendChild(row);
    this.scrollToBottom();
  }

  appendThinkingIndicator() {
    if (!this.dom.messages) return null;

    const row = document.createElement('div');
    row.className = "flex gap-2.5 justify-start";
    row.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-[#051F20] border border-[#8EB69B]/40 flex items-center justify-center text-[10px] text-[#8EB69B] flex-shrink-0 mt-0.5">
        <i class="fa-solid fa-robot animate-spin" style="animation-duration: 4s;"></i>
      </div>
      <div class="bg-[#0B2B26]/80 text-[#8EB69B] rounded-2xl rounded-tl-sm px-3 py-2 border border-[#8EB69B]/20 text-xs flex items-center gap-2">
        <div class="flex gap-1 items-center">
          <div class="w-1.5 h-1.5 rounded-full bg-[#8EB69B] animate-bounce" style="animation-delay: 0s"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-[#8EB69B] animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-[#8EB69B] animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
        <span class="text-[11px] font-sans">Consulting BIM Database & Groq...</span>
      </div>
    `;

    this.dom.messages.appendChild(row);
    this.scrollToBottom();
    return row;
  }

  clearConversation() {
    this.history = [];
    if (this.dom.messages) this.dom.messages.innerHTML = '';
    this.clearHighlight();
    this.addWelcomeMessage();
  }

  scrollToBottom() {
    if (this.dom.messages) {
      this.dom.messages.scrollTop = this.dom.messages.scrollHeight;
    }
  }

  escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Lightweight, robust Markdown formatter for building tables, lists, bold, blockquotes, and code
   */
  renderMarkdown(text) {
    if (!text) return "";

    let lines = text.split("\n");
    let html = "";
    let inTable = false;
    let tableHeaders = [];
    let tableRows = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Markdown Table parsing
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        const cells = line.split("|").slice(1, -1).map(c => c.trim());

        // Check if delimiter row (e.g. |---|---|)
        if (cells.every(c => /^:?-+:?$/.test(c))) {
          continue;
        }

        if (!inTable) {
          inTable = true;
          tableHeaders = cells;
          tableRows = [];
        } else {
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        // Close table
        html += this.buildTableHTML(tableHeaders, tableRows);
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }

      // Headers (###, ##, #)
      if (line.startsWith("### ")) {
        html += `<h4 class="text-xs font-bold text-white mt-2.5 mb-1 font-display uppercase tracking-wider">${this.inlineFormat(line.slice(4))}</h4>`;
        continue;
      }
      if (line.startsWith("## ")) {
        html += `<h3 class="text-sm font-bold text-white mt-3 mb-1 font-display tracking-tight">${this.inlineFormat(line.slice(3))}</h3>`;
        continue;
      }
      if (line.startsWith("# ")) {
        html += `<h2 class="text-base font-extrabold text-white mt-3 mb-1 font-display tracking-tight">${this.inlineFormat(line.slice(2))}</h2>`;
        continue;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        html += `<blockquote class="border-l-2 border-[#8EB69B] pl-2.5 py-0.5 my-1.5 text-[11px] text-[#DAF1DE]/90 italic bg-[#051F20]/40 rounded-r">${this.inlineFormat(line.slice(2))}</blockquote>`;
        continue;
      }

      // Bullet lists
      if (/^[-*]\s+/.test(line)) {
        html += `<div class="flex gap-2 items-start my-0.5 pl-1"><span class="text-[#8EB69B] mt-0.5">•</span><span class="flex-1">${this.inlineFormat(line.replace(/^[-*]\s+/, ""))}</span></div>`;
        continue;
      }

      // Horizontal separator
      if (/^---+$/.test(line.trim())) {
        html += `<hr class="border-[#8EB69B]/20 my-2" />`;
        continue;
      }

      // Empty line
      if (!line.trim()) {
        html += `<div class="h-1.5"></div>`;
        continue;
      }

      // Standard paragraph
      html += `<p class="my-1">${this.inlineFormat(line)}</p>`;
    }

    if (inTable) {
      html += this.buildTableHTML(tableHeaders, tableRows);
    }

    return html;
  }

  inlineFormat(str) {
    return str
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, `<strong class="text-white font-semibold">$1</strong>`)
      // Italic *text*
      .replace(/\*(.*?)\*/g, `<em class="text-[#DAF1DE]/90">$1</em>`)
      // Inline code `code`
      .replace(/`([^`]+)`/g, `<code class="font-mono text-[10px] bg-[#051F20] text-[#DAF1DE] px-1 py-0.5 rounded border border-[#8EB69B]/20">$1</code>`);
  }

  buildTableHTML(headers, rows) {
    let t = `<div class="overflow-x-auto my-2 rounded-lg border border-[#8EB69B]/20 bg-[#051F20]/60"><table class="w-full text-left text-[11px] border-collapse">`;
    t += `<thead class="bg-[#0B2B26] border-b border-[#8EB69B]/25 text-[#DAF1DE] font-medium font-sans"><tr>`;
    headers.forEach(h => {
      t += `<th class="px-2.5 py-1.5 whitespace-nowrap">${this.inlineFormat(h)}</th>`;
    });
    t += `</tr></thead><tbody class="divide-y divide-[#8EB69B]/15 text-[#8EB69B]">`;
    rows.forEach(r => {
      t += `<tr class="hover:bg-[#235347]/20 transition">`;
      r.forEach(c => {
        t += `<td class="px-2.5 py-1.5 leading-snug">${this.inlineFormat(c)}</td>`;
      });
      t += `</tr>`;
    });
    t += `</tbody></table></div>`;
    return t;
  }
}

window.BuildingAssistant = BuildingAssistant;
