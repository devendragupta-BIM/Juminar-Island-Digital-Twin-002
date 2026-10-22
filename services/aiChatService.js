/**
 * JUMEIRAH ISLANDS VILLA 003 — AI CHAT & TOOL EXECUTION SERVICE
 * Powered by Groq Cloud (model: openai/gpt-oss-20b)
 * 
 * Safety & Security:
 * - Server-side GROQ_API_KEY resolution (never leaked to browser)
 * - Strict backend validation for every tool argument
 * - Structured tool execution loop (up to 4 tool calling hops)
 * - Safe client action extraction (no arbitrary JS execution)
 * - Grounded responses: prevents hallucination of missing engineering data
 */

const { Groq } = require('groq-sdk');
const buildingDataService = require('./buildingDataService');

// System prompt enforcing strict grounding, safety, and architectural precision
const SYSTEM_PROMPT = `You are the official AI Building Assistant for the Jumeirah Islands Luxury Villa Plot 003 3D Digital Twin in Dubai, UAE.
Your role is to assist architects, engineers, contractors (VH Contracting LLC), and clients with verified building information and 3D viewer interaction.

CORE OPERATIONAL RULES:
1. STRICT GROUNDING: Answer building-specific questions ONLY using data retrieved via the available tools or documented project metadata. Never invent or hallucinate dimensions, equipment specs, manufacturers, or test results.
2. MISSING DATA HANDLING: If the user asks for information that is not returned by the tools, or is explicitly listed in 'missingFields', you must state clearly: "This specification is not currently available in the documented Jumeirah Islands 003 BIM records." Do not fabricate estimates as verified facts.
3. CLEAR DISTINCTION: Always distinguish documented as-built site conditions (October 2026 site state, 84% complete) from target architectural handover renders and future fitout plans.
4. 3D VIEWER ACTIONS: When the user asks to see, show, locate, fly to, or inspect an element or floor, ALWAYS call the corresponding tool ('locate_element' or 'isolate_floor').
5. SAFETY DISCLAIMER: Never provide structural engineering certification, code-compliance approval, or life-safety sign-offs based solely on AI output. Remind users when relevant that critical engineering decisions require certified structural consultancy reviews.
6. FORMATTING: Use clean markdown, tables, bullet points, and concise executive phrasing.`;

// Tool definitions for Groq function calling
const TOOLS = [
  {
    type: "function",
    function: {
      name: "get_building_summary",
      description: "Returns top-level project overview, site area, built-up area (BUA), levels, verified progress milestones, and weather telemetry for Jumeirah Islands Villa 003.",
      parameters: {
        type: "object",
        properties: {
          include_milestones: {
            type: "boolean",
            description: "Whether to include detailed construction milestone percentages (e.g. shoring, superstructure, glazing)."
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "search_elements",
      description: "Searches documented building elements, rooms, structural slabs, water features, and telemetry stations by free-text keywords, category, or floor level.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search keywords (e.g., 'pool', 'pergola', 'cantilever', 'stairs', 'atrium', 'slab', 'dining')."
          },
          category: {
            type: "string",
            description: "Optional category filter: 'Structure / Slabs', 'Curtain Wall & Glazing', 'MEP & Water Systems', 'Circulation & Stairs', 'Shading & Pergola', 'Site & Landscape', 'Interior Architecture', 'IoT Telemetry Station'."
          },
          floor: {
            type: "string",
            enum: ["all", "basement", "ground", "first", "roof", "site"],
            description: "Optional floor level filter: 'basement', 'ground', 'first', 'roof', 'site', or 'all'."
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_element_details",
      description: "Retrieves exhaustive architectural, geometric, material, and telemetry details for a specific building element using its stable ID.",
      parameters: {
        type: "object",
        required: ["element_id"],
        properties: {
          element_id: {
            type: "string",
            description: "The stable ID of the element (e.g., 'PERGOLA-CARPORT-01', 'POOL-INFINITY-01', 'WALL-ATRIUM-01', 'STAIR-ATRIUM-01', 'SLAB-GF-01', 'SLAB-FF-01', 'WATERFALL-WEIR-01', 'NODE-MEP-004')."
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "locate_element",
      description: "Navigates the 3D camera to focus on a specific element and triggers visual highlighting in the digital twin viewport.",
      parameters: {
        type: "object",
        required: ["element_id"],
        properties: {
          element_id: {
            type: "string",
            description: "The stable ID of the building element to locate and highlight in the 3D scene."
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "isolate_floor",
      description: "Isolates a specific architectural floor level in the 3D BIM model or resets to all floors.",
      parameters: {
        type: "object",
        required: ["floor"],
        properties: {
          floor: {
            type: "string",
            enum: ["all", "basement", "ground", "first", "roof"],
            description: "The floor to isolate: 'basement' (Lower Pool Deck), 'ground' (Grand Foyer & Living), 'first' (Bedrooms), 'roof' (Crown Canopy), or 'all' (Full Villa)."
          }
        }
      }
    }
  }
];

class AIChatService {
  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || null;
    this.model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
    this.groqClient = null;

    if (this.apiKey) {
      try {
        this.groqClient = new Groq({ apiKey: this.apiKey });
      } catch (e) {
        console.error('Failed to initialize Groq client:', e.message);
      }
    }
  }

  /**
   * Refreshes client if environment variable was loaded dynamically
   */
  ensureClient() {
    const currentKey = process.env.GROQ_API_KEY;
    if (currentKey && (!this.groqClient || this.apiKey !== currentKey)) {
      this.apiKey = currentKey;
      this.groqClient = new Groq({ apiKey: this.apiKey });
    }
    return this.groqClient;
  }

  /**
   * Validates tool call arguments and safely executes backend building data methods
   */
  executeTool(name, rawArgs) {
    let args = {};
    try {
      if (typeof rawArgs === 'string') {
        // Clean potential empty string key artifacts
        args = rawArgs.trim() ? JSON.parse(rawArgs) : {};
      } else if (typeof rawArgs === 'object' && rawArgs !== null) {
        args = rawArgs;
      }
    } catch (err) {
      console.warn(`JSON parse error on tool arguments for ${name}:`, rawArgs);
      args = {};
    }

    switch (name) {
      case 'get_building_summary': {
        return buildingDataService.getBuildingSummary();
      }

      case 'search_elements': {
        return buildingDataService.searchElements({
          query: typeof args.query === 'string' ? args.query : '',
          category: typeof args.category === 'string' ? args.category : '',
          floor: typeof args.floor === 'string' ? args.floor : ''
        });
      }

      case 'get_element_details': {
        const id = args.element_id || args.id || '';
        return buildingDataService.getElementDetails({ elementId: id });
      }

      case 'locate_element': {
        const id = args.element_id || args.id || '';
        return buildingDataService.locateElement({ elementId: id });
      }

      case 'isolate_floor': {
        const floor = args.floor || 'all';
        return buildingDataService.isolateFloor({ floor });
      }

      default:
        return {
          status: "error",
          message: `Unrecognized tool '${name}'.`
        };
    }
  }

  /**
   * Handles user chat message with multi-turn tool execution loop
   */
  async handleChatMessage({ message, history = [] }) {
    const client = this.ensureClient();

    if (!client) {
      return {
        status: "error",
        errorType: "MISSING_API_KEY",
        message: "GROQ_API_KEY is not configured on the server. Please add your GROQ_API_KEY to the .env file or server environment variables to enable the AI Building Assistant.",
        actions: []
      };
    }

    // Format conversation history
    const messages = [
      { role: "system", content: SYSTEM_PROMPT }
    ];

    if (Array.isArray(history)) {
      for (const h of history.slice(-8)) { // Retain recent context
        if (h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string') {
          messages.push({ role: h.role, content: h.content });
        }
      }
    }

    messages.push({ role: "user", content: String(message || "") });

    const collectedActions = [];
    let turns = 0;
    const maxTurns = 5;

    try {
      while (turns < maxTurns) {
        turns++;

        const response = await client.chat.completions.create({
          model: this.model,
          messages,
          tools: TOOLS,
          tool_choice: "auto",
          temperature: 0.2
        });

        const choice = response.choices?.[0];
        if (!choice) {
          throw new Error("Empty response from Groq API");
        }

        const msg = choice.message;
        messages.push(msg);

        // If no tool calls requested, we reached the final answer
        if (!msg.tool_calls || msg.tool_calls.length === 0) {
          let finalContent = msg.content || "I have inspected the building records for your request.";
          
          // If no actions collected via native tool calls, extract fallback actions
          if (collectedActions.length === 0) {
            const fallbackActions = this.extractFallbackActions(finalContent, message);
            if (fallbackActions.length > 0) {
              collectedActions.push(...fallbackActions);
            }
          }

          // Clean up any raw pseudo-tool JSON code blocks from user-visible response
          finalContent = finalContent.replace(/```(?:json)?\s*\{[\s\S]*?"(?:action|tool)"\s*:\s*"(?:locate_element|isolate_floor)"[\s\S]*?\}\s*```/gi, '').trim();

          return {
            status: "success",
            message: finalContent,
            actions: collectedActions
          };
        }

        // Execute all requested tool calls safely
        for (const toolCall of msg.tool_calls) {
          const fnName = toolCall.function.name;
          const fnArgs = toolCall.function.arguments;

          const toolResult = this.executeTool(fnName, fnArgs);

          // If tool returns a client viewer action (e.g. LOCATE_ELEMENT or ISOLATE_FLOOR), capture it
          if (toolResult && toolResult.action) {
            collectedActions.push(toolResult.action);
          }

          // Return tool result to conversation history
          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            name: fnName,
            content: JSON.stringify(toolResult)
          });
        }
      }

      // If loop completed max turns, return current response
      const lastMsg = messages[messages.length - 1];
      return {
        status: "success",
        message: typeof lastMsg.content === 'string' ? lastMsg.content : "Completed building analysis.",
        actions: collectedActions
      };

    } catch (err) {
      console.error("AI Chat Service Error:", err);
      return {
        status: "error",
        errorType: "API_ERROR",
        message: `Groq Assistant Error: ${err.message || 'An unexpected error occurred during building analysis.'}`,
        actions: collectedActions
      };
    }
  }

  /**
   * Safely extracts viewer actions (locate_element, isolate_floor) from assistant markdown or user queries
   * as a robust fallback when the LLM outputs JSON actions inline.
   */
  extractFallbackActions(text, userQuery = '') {
    const actions = [];
    if (!text && !userQuery) return actions;
    const combined = `${userQuery} ${text || ''}`;

    // 1. Check for JSON action blocks like {"action": "locate_element", "element_id": "..."}
    const jsonMatches = combined.match(/\{[\s\S]*?"(?:action|tool)"\s*:\s*"(?:locate_element|isolate_floor)"[\s\S]*?\}/gi);
    if (jsonMatches) {
      for (const raw of jsonMatches) {
        try {
          const parsed = JSON.parse(raw);
          const act = parsed.action || parsed.tool;
          if (act === 'locate_element' && (parsed.element_id || parsed.elementId)) {
            const res = buildingDataService.locateElement({ element_id: parsed.element_id || parsed.elementId });
            if (res && res.action) actions.push(res.action);
          } else if (act === 'isolate_floor' && parsed.floor) {
            const res = buildingDataService.isolateFloor({ floor: parsed.floor });
            if (res && res.action) actions.push(res.action);
          }
        } catch (e) {}
      }
    }

    // 2. Check for explicit element ID references in text if no action found yet
    if (actions.length === 0) {
      const elementIdMatch = combined.match(/\b(POOL-INFINITY-01|PERGOLA-CARPORT-01|COL-GREENWALL-01|WALL-GARAGE-01|WALL-ATRIUM-01|STAIR-ATRIUM-01|WATERFALL-WEIR-01|SLAB-GF-01|SLAB-FF-01|SLAB-FF-02|ROOF-CANOPY-01|SLAB-LG-01|FURN-DINING-LG|FURN-LOUNGE-LG|LAKE-SHORELINE-01|BONSAI-PLANTER-01|NODE-MEP-004|NODE-STR-001|NODE-ENV-002|NODE-ENV-003|NODE-CIV-005)\b/i);
      if (elementIdMatch) {
        const id = elementIdMatch[1].toUpperCase();
        const res = buildingDataService.locateElement({ element_id: id });
        if (res && res.action) actions.push(res.action);
      }
    }

    // 3. Check for floor isolation requests in user query
    if (actions.length === 0 && userQuery) {
      const q = userQuery.toLowerCase();
      if (q.includes('isolate') || q.includes('only show') || q.includes('floor level')) {
        let fl = null;
        if (q.includes('first floor') || q.includes('bedroom') || q.includes('suite')) fl = 'first';
        else if (q.includes('ground floor') || q.includes('atrium') || q.includes('foyer')) fl = 'ground';
        else if (q.includes('roof') || q.includes('canopy')) fl = 'roof';
        else if (q.includes('basement') || q.includes('pool deck') || q.includes('lower ground')) fl = 'basement';
        else if (q.includes('all') || q.includes('reset floor')) fl = 'all';

        if (fl) {
          const res = buildingDataService.isolateFloor({ floor: fl });
          if (res && res.action) actions.push(res.action);
        }
      }
    }

    return actions;
  }
}

module.exports = new AIChatService();
