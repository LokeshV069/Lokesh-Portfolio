export const SKILL_CATEGORIES = [
  'ALL',
  'PROGRAMMING',
  'XR / AR / VR',
  'AI & AUTOMATION',
  'WEB',
  'DESIGN'
];

export const SKILLS_DATA = [
  {
    id: '01',
    name: 'Python',
    category: 'PROGRAMMING',
    theme: 'light',
    shortDescription: 'Core language for AI applications, RAG pipelines, data processing, and automation scripts.',
    capabilities: ['LangChain RAG', 'Ollama Local LLMs', 'Data Processing', 'API Automation'],
    logoKey: 'python'
  },
  {
    id: '02',
    name: 'Java',
    category: 'PROGRAMMING',
    theme: 'dark',
    shortDescription: 'Fundamental object-oriented programming, data structures, algorithms, and core backend logic.',
    capabilities: ['Data Structures', 'Algorithms', 'OOP Design', 'Modular Systems'],
    logoKey: 'java'
  },
  {
    id: '03',
    name: 'Unity',
    category: 'XR / AR / VR',
    theme: 'light',
    shortDescription: 'Engine of choice for building interactive spatial computing apps, AR prototypes, and 3D scenes.',
    capabilities: ['OpenXR', 'URP Pipeline', 'Physics Simulation', 'Asset Optimization'],
    logoKey: 'unity'
  },
  {
    id: '04',
    name: 'Vuforia',
    category: 'XR / AR / VR',
    theme: 'dark',
    shortDescription: 'Augmented reality SDK for ground-plane tracking, image targets, and interactive spatial overlays.',
    capabilities: ['Ground Plane Tracking', 'Image Target Recognition', 'Real-world Anchoring', 'Camera Calibration'],
    logoKey: 'vuforia'
  },
  {
    id: '05',
    name: 'XR / Hand Tracking',
    category: 'XR / AR / VR',
    theme: 'light',
    shortDescription: 'Design and implementation of natural 6DoF spatial gestures, direct manipulation, and spatial UI.',
    capabilities: ['6DoF Spatial Interaction', 'Hand Gesture Classification', 'Skeletal Landmark Tracking', 'Spatial Affordances'],
    logoKey: 'handTracking'
  },
  {
    id: '06',
    name: 'LLM / RAG',
    category: 'AI & AUTOMATION',
    theme: 'dark',
    shortDescription: 'Engineering retrieval-augmented generation pipelines, local embeddings, vector stores, and prompt grounding.',
    capabilities: ['ChromaDB Vector Stores', 'Document Chunking', 'Local Ollama Inference', 'Context Retrieval'],
    logoKey: 'llmRag'
  },
  {
    id: '07',
    name: 'n8n Automation',
    category: 'AI & AUTOMATION',
    theme: 'light',
    shortDescription: 'Constructing robust event-driven workflow automations connecting webhooks, LLMs, and external APIs.',
    capabilities: ['Webhook Integration', 'Multi-step Agent Routing', 'API Telemetry Parsing', 'Automated Trigger Pipelines'],
    logoKey: 'n8n'
  },
  {
    id: '08',
    name: 'React',
    category: 'WEB',
    theme: 'dark',
    shortDescription: 'Modern frontend development utilizing reactive state architectures, hooks, and clean component hierarchies.',
    capabilities: ['Custom Hooks', 'Component Architecture', 'Tailwind CSS Integration', 'Web API Integration'],
    logoKey: 'react'
  },
  {
    id: '09',
    name: 'UI/UX & Figma',
    category: 'DESIGN',
    theme: 'light',
    shortDescription: 'Designing wireframes, design systems, interactive prototypes, and typography-driven editorial interfaces.',
    capabilities: ['Design Systems', 'Auto Layout & Grids', 'High-Fidelity Prototyping', 'Spatial UI Guidelines'],
    logoKey: 'figma'
  }
];
