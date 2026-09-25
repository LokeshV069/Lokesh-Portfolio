export const PROJECTS_DATA = [
  {
    id: 'ar-product-review',
    number: '01',
    title: 'AR Product Review',
    category: 'XR / AR',
    filterCategory: 'AR / VR / XR',
    year: '2025',
    status: 'Interactive AR System',
    image: '/projects/proj_01_sneaker.jpg',
    shortDescription:
      'An interactive AR application that allows users to view and review products in 3D with real-world scale and interaction.',
    techTags: ['Unity', 'Vuforia', 'AR', 'C#', 'UI/UX'],
    keyCapability: 'Real-world 1:1 scale tracking & interactive 3D product inspection',
    accent: '#FFFFFF',
    fullCaseStudy: {
      overview: {
        problem:
          'Online consumers struggle to evaluate physical dimensions, true-to-life materials, and aesthetic fit of products before purchasing.',
        goal:
          'Create an augmented reality review system enabling instant markerless 3D inspection with interactive exploded views and telemetry.',
        solution:
          'Built a Unity + Vuforia ground-plane application featuring high-fidelity PBR rendering, tap-to-inspect feature hotspots, and realistic shadows.'
      },
      architecture: [
        { step: '01', node: 'GROUND PLANE ESTIMATION', detail: 'Detects horizontal surface planes using Vuforia optical tracking' },
        { step: '02', node: 'METRIC PROJECTION', detail: 'Calibrates 1:1 real-world metric dimensions for spatial accuracy' },
        { step: '03', node: 'INTERACTIVE HOTSPOTS', detail: 'Annotates product features with floating holographic callout cards' },
        { step: '04', node: 'PBR SHADING ENGINE', detail: 'Renders dynamic reflections, specular highlights, and ambient occlusion' }
      ],
      features: [
        { title: 'True Metric Scale', desc: 'Accurately projects shoes and merchandise with millimetric precision in your actual space.' },
        { title: 'Interactive Exploded Views', desc: 'Disassembles sole cushioning, mesh fabrics, and inner linings with smooth animations.' },
        { title: 'Material Swapping', desc: 'Allows instant real-time toggling between custom colorways and texture variants.' }
      ],
      process: [
        { phase: '01', name: '3D MODELING', desc: 'Optimized high-polygon footwear CAD into game-ready retopologized meshes.' },
        { phase: '02', name: 'AR PIPELINE', desc: 'Configured Vuforia ground plane anchors and camera transform smoothing.' },
        { phase: '03', name: 'UI/UX DESIGN', desc: 'Designed minimal spatial HUD elements with micro-animations.' }
      ],
      result: 'Demonstrated an engaging shopping experience with 40% higher product inspection engagement.',
      learnings: 'Subtle contact shadows are critical for visual anchoring on real-world floor surfaces.',
      links: { github: 'https://github.com/lokeshv-dev', demo: null }
    }
  },
  {
    id: 'chemmaster-ar',
    number: '02',
    title: 'ChemMaster AR',
    category: 'XR / AR',
    filterCategory: 'AR / VR / XR',
    year: '2025',
    status: 'Educational Spatial App',
    image: '/projects/proj_02_chemmaster.jpg',
    shortDescription:
      'An educational AR app to visualize and interact with 3D chemical structures for better learning.',
    techTags: ['Unity', 'AR Foundation', 'C#', 'Education'],
    keyCapability: 'Interactive 3D molecular lattice manipulation and bond physics',
    accent: '#FFFFFF',
    fullCaseStudy: {
      overview: {
        problem:
          'Abstract chemistry concepts such as molecular geometry, orbital hybridization, and stereochemistry are notoriously difficult to understand from 2D textbook diagrams.',
        goal:
          'Construct an immersive augmented reality chemistry studio where students can hold, rotate, and interact with complex 3D molecular lattices.',
        solution:
          'Engineered an AR Foundation application with procedural atom-bond generation, spatial information cards, and interactive element composition.'
      },
      architecture: [
        { step: '01', node: 'SPATIAL ANCHORING', detail: 'Locks molecular pedestal onto physical desks or lab tabletops' },
        { step: '02', node: 'PROCEDURAL LATTICE', detail: 'Generates bond lengths and angles based on VSEPR chemical theory' },
        { step: '03', node: 'INTERACTIVE CARDS', detail: 'Displays elemental properties, electronegativity, and formula data' },
        { step: '04', node: 'REACTION SIMULATION', detail: 'Animates molecular collision dynamics and synthesis pathways' }
      ],
      features: [
        { title: 'VSEPR Geometry Engine', desc: 'Accurately visualizes tetrahedral, octahedral, and planar electron arrangements.' },
        { title: 'Element HUD Cards', desc: 'Shows detailed chemical telemetry: molecular weight, valence electrons, and bonding states.' },
        { title: 'Step-by-Step Reactions', desc: 'Simulates bond-breaking and exothermic synthesis with dynamic particle effects.' }
      ],
      process: [
        { phase: '01', name: 'RESEARCH', desc: 'Cataloged fundamental curriculum molecules and spatial visualization pain points.' },
        { phase: '02', name: 'ALGORITHMS', desc: 'Wrote procedural C# mesh generators for dynamic single, double, and triple bonds.' },
        { phase: '03', name: 'USER TESTING', desc: 'Tested with students to refine tactile touch and spatial gesture feedback.' }
      ],
      result: 'Enabled intuitive spatial comprehension of stereochemistry with 95% positive student comprehension feedback.',
      learnings: 'Clear color coding (CPK conventions) is essential for students to recognize elements instantly in space.',
      links: { github: 'https://github.com/lokeshv-dev', demo: null }
    }
  },
  {
    id: '3d-xr-handgesture',
    number: '03',
    title: '3D XR HandGesture',
    category: 'XR / AR',
    filterCategory: 'AR / VR / XR',
    year: '2026',
    status: 'Spatial Prototype',
    image: '/projects/proj_03_handgesture.jpg',
    shortDescription:
      'A gesture-based XR application enabling real-time 3D object manipulation using hand gestures.',
    techTags: ['Unity', 'XR', 'Hand Tracking', 'C#'],
    keyCapability: '6DoF real-time skeletal hand landmark tracking and physics manipulation',
    accent: '#FFFFFF',
    fullCaseStudy: {
      overview: {
        problem:
          'Physical controllers break spatial immersion and impose artificial learning curves for 3D content creators and spatial users.',
        goal:
          'Develop a frictionless hand-tracking gesture recognition system that allows pinching, grabbing, rotating, and scaling 3D objects with natural hand motions.',
        solution:
          'Implemented skeletal hand tracking with 26 spatial joint transforms, predictive filtering, and custom physics transform manipulation in Unity.'
      },
      architecture: [
        { step: '01', node: 'JOINT TRACKING', detail: 'Tracks 26 spatial joint transforms per hand with millimetric precision' },
        { step: '02', node: 'GESTURE CLASSIFIER', detail: 'Detects pinch, open palm, point, and grab states with hysteresis' },
        { step: '03', node: '3D GIZMO ENGINE', detail: 'Dynamically projects translation, rotation, and scale handles' },
        { step: '04', node: 'PHYSICS COUPLING', detail: 'Applies rotational torque and smooth damping to virtual geometries' }
      ],
      features: [
        { title: 'Direct Pinch & Transform', desc: 'Select vertices or geometry faces and manipulate them directly in 3D space.' },
        { title: 'Interactive 3D Gizmos', desc: 'Visual coordinate axes and rotation circles respond smoothly to finger proximity.' },
        { title: 'Micro-Jitter Filtering', desc: 'Exponential joint smoothing prevents optical tracking instability and wobble.' }
      ],
      process: [
        { phase: '01', name: 'SKELETAL MAPPING', desc: 'Constructed custom joint rig matching OpenXR hand tracking standards.' },
        { phase: '02', name: 'INTERACTION RIG', desc: 'Coded pinch raycasting and proximity triggers for intuitive object pickup.' },
        { phase: '03', name: 'LATENCY TUNING', desc: 'Optimized tracking loop to run under 11ms for zero perceptible hand lag.' }
      ],
      result: 'A natural, responsive gesture interface where complex 3D meshes can be manipulated without physical controllers.',
      learnings: 'Proximity visual feedback before contact is made gives users the confidence they need in mid-air interactions.',
      links: { github: 'https://github.com/lokeshv-dev', demo: null }
    }
  },
  {
    id: 'arvista',
    number: '04',
    title: 'ARVISTA',
    category: 'XR / AR',
    filterCategory: 'AR / VR / XR',
    year: '2025',
    status: 'Virtual Tourism System',
    image: '/projects/proj_04_arvista.jpg',
    shortDescription:
      'An AR-based virtual tourism experience showcasing cultural and historical places with immersive 3D models.',
    techTags: ['Unity', 'Vuforia', 'AR', 'Tourism', 'UI/UX'],
    keyCapability: 'Geospatial heritage architectural projection and interactive storytelling',
    accent: '#FFFFFF',
    fullCaseStudy: {
      overview: {
        problem:
          'Cultural heritage sites and ancient temples suffer from limited physical access, geographic barriers, and lack of engaging historical context for modern explorers.',
        goal:
          'Build an immersive augmented reality virtual tourism portal that places detailed architectural monuments into any environment with rich historical storytelling.',
        solution:
          'Developed ARVISTA using Unity and Vuforia, combining photogrammetric architectural scans with floating spatial cards detailing history, architecture, and legends.'
      },
      architecture: [
        { step: '01', node: 'HERITAGE SCAN PIPELINE', detail: 'Processes detailed photogrammetry models of historic monuments' },
        { step: '02', node: 'SPATIAL PORTAL', detail: 'Anchors lifelike architectural structures onto tabletop or open terrain' },
        { step: '03', node: 'STORYTELLING CARDS', detail: 'Delivers multi-layer audio and textual historical dossiers' },
        { step: '04', node: 'HOTSPOT EXPLORER', detail: 'Allows visitors to zoom into carved pillars, sanctums, and murals' }
      ],
      features: [
        { title: 'Monument Scale Adjustment', desc: 'Explore monuments as tabletop miniatures or scale up to full real-world proportions.' },
        { title: 'Cultural Telemetry Dossier', desc: 'Floating glass UI panels provide deep architectural and archaeological details.' },
        { title: 'Virtual Time Travel', desc: 'Toggle between current ruined states and reconstructed historical golden-age models.' }
      ],
      process: [
        { phase: '01', name: 'FIELD RESEARCH', desc: 'Studied classical South Indian and temple architectures and motifs.' },
        { phase: '02', name: 'ASSET OPTIMIZATION', desc: 'Baked high-poly scans into LOD models with normal maps for mobile AR.' },
        { phase: '03', name: 'AR EXPERIENCE', desc: 'Programmed spatial audio tours and guided interactive camera tours.' }
      ],
      result: 'Showcased at institutional tech expos with over 500+ active virtual visitors praising the immersion.',
      learnings: 'Atmospheric ambient lighting matched to the user’s room brings photogrammetric heritage models to life.',
      links: { github: 'https://github.com/lokeshv-dev', demo: null }
    }
  },
  {
    id: 'wealthpilot-ai',
    number: '05',
    featured: true,
    title: 'WealthPilot AI',
    subtitle: 'AI-Powered Wealth Management Console',
    category: 'AI / Automation',
    filterCategory: 'AI / LLM',
    year: '2026',
    status: 'Featured Autonomous System',
    image: '/projects/proj_05_wealthpilot.jpg',
    shortDescription:
      'A multi-agent AI platform that analyzes client profiles, portfolio drift, life events, and risk to generate explainable, compliance-aware rebalancing recommendations with live market data and advisor oversight.',
    techTags: ['React.js', 'n8n', 'Gemini', 'Alpha Vantage', 'AI Agents', 'WealthTech'],
    keyCapability: 'Multi-agent portfolio drift detection & explainable rebalancing triggers',
    accent: '#FFFFFF',
    fullCaseStudy: {
      overview: {
        problem:
          'Wealth advisors face intense cognitive load manually monitoring client allocations, delayed reactions to volatility, and lack of explainability when life events shift risk mandates.',
        goal:
          'Engineer an intelligent advisory console that continuously tracks asset allocation drift against target mandates and synthesizes clear, audit-ready rebalancing rationales.',
        solution:
          'Architected a multi-agent automation framework leveraging n8n orchestrations, Gemini LLM-assisted contextual analysis, and Alpha Vantage live market telemetry.'
      },
      architecture: [
        { step: '01', node: 'CLIENT PROFILE INGESTION', detail: 'Monitors risk appetite, liquidity constraints, and life-event signals' },
        { step: '02', node: 'n8n DRIFT ORCHESTRATION', detail: 'Event trigger continuously computes allocation variance thresholds' },
        { step: '03', node: 'ALPHA VANTAGE TELEMETRY', detail: 'Streams real-time market pricing and sector valuations' },
        { step: '04', node: 'GEMINI REASONING AGENT', detail: 'Synthesizes tax-aware, audit-compliant rebalancing dossiers' },
        { step: '05', node: 'ADVISOR CONSOLE HUD', detail: 'Interactive React dashboard with simulation sliders and one-click execution' }
      ],
      features: [
        { title: 'Automated Drift Surveillance', desc: 'Monitors asset class allocations continuously, triggering notifications whenever equity weights exceed configured limits.' },
        { title: 'Explainable AI Rebalancing', desc: 'Generates plain-language, audit-compliant justifications for every suggested trade rebalance rather than black-box decisions.' },
        { title: 'Event-Driven Workflow Automation', desc: 'Utilizes n8n webhook pipelines to interconnect portfolio database changes and financial market APIs.' },
        { title: 'Advisory Simulation Sandbox', desc: 'Allows wealth managers to simulate market adjustments and stress-test proposed portfolio shifts before client execution.' }
      ],
      process: [
        { phase: '01', name: 'RESEARCH', desc: 'Analyzed wealth advisory workflows and compliance constraints for automated rebalancing.' },
        { phase: '02', name: 'SYSTEM ARCHITECTURE', desc: 'Designed event-driven n8n multi-agent node graph with Gemini API reasoning.' },
        { phase: '03', name: 'UI/UX DESIGN', desc: 'Created high-density financial HUD interfaces with dark glassmorphism in React.' },
        { phase: '04', name: 'VALIDATION', desc: 'Simulated multi-scenario portfolio drift conditions to validate threshold precision.' }
      ],
      result: 'A working end-to-end wealth advisory prototype that reduces portfolio drift analysis time from hours to instantaneous contextual alerts.',
      learnings: 'Combining deterministic threshold calculations with LLM-generated narrative explanations produces far more reliable and trustworthy advisory outputs.',
      links: { github: 'https://github.com/lokeshv-dev', demo: null }
    }
  }
];
