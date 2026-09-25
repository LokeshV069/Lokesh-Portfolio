import React, { useState, useCallback, useRef } from 'react';
import SectionLabel from '../components/SectionLabel';
import GeometryLabScene from '../three/GeometryLabScene';
import { audioEngine } from '../utils/audioEngine';
import {
  Box,
  Sliders,
  Sun,
  Moon,
  Camera,
  RotateCcw,
  Power,
  Maximize2,
  Minimize2,
  Search,
  Activity,
  ChevronUp,
  Layers,
  Sparkles,
  Compass,
  CircleDot,
  Gauge,
  MousePointer
} from 'lucide-react';

export default function SpatialLab() {
  const [topology, setTopology] = useState('Torus Knot');
  const [color, setColor] = useState('#FFFFFF');
  const [renderMode, setRenderMode] = useState('Wireframe'); // 'Wireframe' | 'Solid' | 'Points'
  const [rotationSpeed, setRotationSpeed] = useState('Normal'); // 'Slow' | 'Normal' | 'Fast'
  const [scale, setScale] = useState(1.0);
  const [lightIntensity, setLightIntensity] = useState(1.6);
  const [showGrid, setShowGrid] = useState(true);
  const [bgTheme, setBgTheme] = useState('dark'); // 'dark' | 'studio'
  const [isPaused, setIsPaused] = useState(false);
  const [liveFps, setLiveFps] = useState(60);
  const [activeTab, setActiveTab] = useState('Runtime');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sceneRef = useRef(null);
  const viewportContainerRef = useRef(null);

  // Topologies with matching geometric representation
  const topologies = [
    { name: 'Torus Knot', icon: 'knot' },
    { name: 'Icosahedron', icon: 'triangle' },
    { name: 'Octahedron', icon: 'diamond' },
    { name: 'Dodecahedron', icon: 'pentagon' },
    { name: 'Torus', icon: 'ring' },
    { name: 'Sphere', icon: 'globe' }
  ];

  // Chromatic Accents matching screenshot
  const colors = [
    { name: 'Black', hex: '#111111' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Silver', hex: '#94A3B8' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Violet', hex: '#8B5CF6' },
    { name: 'Pink', hex: '#EC4899' }
  ];

  // Dynamic parameters matching screenshot HUD
  const getParamsForTopology = (top) => {
    switch (top) {
      case 'Icosahedron':
        return [
          { label: 'RADIUS', val: (1.2 * scale).toFixed(1) },
          { label: 'DETAIL', val: '2' },
          { label: 'FACES', val: '80' },
          { label: 'VERTICES', val: '42' }
        ];
      case 'Octahedron':
        return [
          { label: 'RADIUS', val: (1.2 * scale).toFixed(1) },
          { label: 'DETAIL', val: '1' },
          { label: 'FACES', val: '32' },
          { label: 'VERTICES', val: '18' }
        ];
      case 'Dodecahedron':
        return [
          { label: 'RADIUS', val: (1.2 * scale).toFixed(1) },
          { label: 'FACES', val: '12' },
          { label: 'VERTICES', val: '20' },
          { label: 'EDGES', val: '30' }
        ];
      case 'Torus':
        return [
          { label: 'RADIUS', val: (1.2 * scale).toFixed(1) },
          { label: 'TUBE', val: '0.4' },
          { label: 'RADIAL', val: '32' },
          { label: 'TUBULAR', val: '64' }
        ];
      case 'Sphere':
        return [
          { label: 'RADIUS', val: (1.2 * scale).toFixed(1) },
          { label: 'WIDTH', val: '64' },
          { label: 'HEIGHT', val: '64' },
          { label: 'POINTS', val: '4096' }
        ];
      case 'Torus Knot':
      default:
        return [
          { label: 'RADIUS', val: (1.0 * scale).toFixed(1) },
          { label: 'TUBE', val: '0.3' },
          { label: 'SEGMENTS', val: '256' },
          { label: 'TWISTS', val: '3' }
        ];
    }
  };

  const handleFpsUpdate = useCallback((fps) => {
    setLiveFps(fps);
  }, []);

  const toggleFullscreen = () => {
    if (!viewportContainerRef.current) return;
    if (!document.fullscreenElement) {
      viewportContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const filteredTopologies = topologies.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="lab"
      className="py-20 sm:py-28 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="3D Primitives Runtime Lab"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-6">
        
        {/* TOP BAR OF 3D PRIMITIVES MODULE (Matching Screenshot) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
          
          {/* Module Logo & Title */}
          <div className="flex items-center gap-3.5 self-start md:self-auto">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-md">
              <Box className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col text-left">
              <h2 className="font-mono text-sm sm:text-base font-black tracking-wider text-white uppercase">
                3D PRIMITIVES
              </h2>
              <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
                RUNTIME LAB
              </span>
            </div>
          </div>

          {/* Center Tabs Pill (Runtime, Materials, Lighting, Shaders, Controls) */}
          <div className="flex items-center gap-1 p-1 bg-black/60 rounded-full border border-white/15 overflow-x-auto max-w-full">
            {[
              { id: 'Runtime', icon: Box },
              { id: 'Materials', icon: Sparkles },
              { id: 'Lighting', icon: Sun },
              { id: 'Shaders', icon: Layers },
              { id: 'Controls', icon: Sliders }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    audioEngine.playHoverTone();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.id}</span>
                </button>
              );
            })}
          </div>

          {/* Right Search Input & User Mark */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search primitives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-white placeholder-neutral-500 font-mono text-xs focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            {/* Profile Monogram */}
            <div className="w-8 h-8 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
              L
            </div>
          </div>
        </div>

        {/* MAIN LAB WORKSPACE: Two-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL: RUNTIME CONTROLS (White / Light High-Contrast Studio Chassis) */}
          <div className="lg:col-span-4 xl:col-span-3 bg-[#F8F9FA] text-black rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200/90 space-y-6">
            
            {/* Header: Runtime Controls + SYS Active */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-neutral-800" />
                <h3 className="font-mono text-xs font-bold tracking-wider text-black uppercase">
                  RUNTIME CONTROLS
                </h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SYS • ACTIVE</span>
              </div>
            </div>

            {/* 1. Topology Primitives 2-Column Grid */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-neutral-600 font-mono text-[10px] font-bold uppercase tracking-wider">
                <span>TOPOLOGY PRIMITIVE</span>
                <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {filteredTopologies.map((item) => {
                  const isSelected = topology === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        audioEngine.playHoverTone();
                        setTopology(item.name);
                      }}
                      className={`p-2.5 rounded-xl font-mono text-xs font-medium flex items-center gap-2.5 transition-all text-left ${
                        isSelected
                          ? 'bg-[#111111] text-white shadow-md'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80 border border-neutral-200/60'
                      }`}
                    >
                      {/* Geometric Icon preview */}
                      <span className="shrink-0 text-current">
                        {item.icon === 'knot' && <CircleDot className="w-4 h-4" />}
                        {item.icon === 'triangle' && <span className="font-bold text-xs">▲</span>}
                        {item.icon === 'diamond' && <span className="font-bold text-xs">◆</span>}
                        {item.icon === 'pentagon' && <span className="font-bold text-xs">⬟</span>}
                        {item.icon === 'ring' && <span className="font-bold text-xs">◎</span>}
                        {item.icon === 'globe' && <span className="font-bold text-xs">●</span>}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Chromatic Accent Swatches */}
            <div className="space-y-2.5">
              <label className="text-neutral-600 font-mono text-[10px] font-bold uppercase tracking-wider block">
                CHROMATIC ACCENT
              </label>
              <div className="flex items-center gap-2.5">
                {colors.map((c) => {
                  const isSelected = color === c.hex;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        audioEngine.playHoverTone();
                        setColor(c.hex);
                      }}
                      title={c.name}
                      aria-label={`Select ${c.name} accent`}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        isSelected
                          ? 'ring-2 ring-black ring-offset-2 ring-offset-[#F8F9FA] scale-110'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      } ${c.hex === '#FFFFFF' ? 'border border-neutral-300' : ''}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* 3. Render Mode (Wireframe, Solid, Points) */}
            <div className="space-y-2.5">
              <label className="text-neutral-600 font-mono text-[10px] font-bold uppercase tracking-wider block">
                RENDER MODE
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Wireframe', icon: Box },
                  { id: 'Solid', icon: Layers },
                  { id: 'Points', icon: Sparkles }
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = renderMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        audioEngine.playClickChime();
                        setRenderMode(mode.id);
                      }}
                      className={`py-2 px-2 rounded-xl font-mono text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#111111] text-white shadow-md'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200/60'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{mode.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Angular Velocity (Slow, Normal, Fast) */}
            <div className="space-y-2.5">
              <label className="text-neutral-600 font-mono text-[10px] font-bold uppercase tracking-wider block">
                ANGULAR VELOCITY
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Slow', 'Normal', 'Fast'].map((spd) => {
                  const isSelected = rotationSpeed === spd && !isPaused;
                  return (
                    <button
                      key={spd}
                      onClick={() => {
                        audioEngine.playHoverTone();
                        setIsPaused(false);
                        setRotationSpeed(spd);
                      }}
                      className={`py-2 px-2 rounded-xl font-mono text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#111111] text-white shadow-md'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200/60'
                      }`}
                    >
                      <Gauge className="w-3 h-3" />
                      <span>{spd}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Scale Factor & Light Intensity Sliders */}
            <div className="space-y-4 pt-2 border-t border-neutral-200">
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[10px] font-bold text-neutral-600">
                  <span>SCALE FACTOR</span>
                  <span className="text-black font-mono">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-300 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[10px] font-bold text-neutral-600">
                  <span>LIGHT INTENSITY</span>
                  <span className="text-black font-mono">{lightIntensity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-300 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>
            </div>

            {/* Bottom Progress Bar Indicator */}
            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between font-mono text-[9px] text-neutral-500">
              <span>// GEOMETRY LAB</span>
              <div className="w-24 h-1 bg-neutral-300 rounded-full overflow-hidden">
                <div className="h-full bg-black w-2/3" />
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: 3D VIEWPORT WITH TOP & BOTTOM HUDS (Matching Screenshot) */}
          <div
            ref={viewportContainerRef}
            className="lg:col-span-8 xl:col-span-9 bg-[#0B0D10] rounded-3xl border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* 1. TOP HUD STATUS BAR */}
            <div className="px-5 py-3.5 bg-black/60 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between font-mono text-[10px] text-neutral-400 gap-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STATUS: ACTIVE</span>
                </span>
                <span className="text-white/20">|</span>
                <span>RENDER ENGINE: 'WEBGL</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>FPS: {liveFps}</span>
                </span>
                <span className="text-white/20">|</span>
                <span>GPU: ACTIVE</span>
                <span className="text-white/20 hidden sm:inline">|</span>
                <span className="hidden sm:inline">RES: 1920 × 1080</span>
                
                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  title="Toggle Fullscreen"
                  aria-label="Toggle Fullscreen"
                  className="p-1 rounded bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* 2. THE 3D CANVAS VIEWPORT WITH FLOATING HUD ELEMENTS */}
            <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
              
              {/* Three.js Canvas Scene */}
              <GeometryLabScene
                ref={sceneRef}
                topology={topology}
                color={color}
                renderMode={renderMode}
                rotationSpeed={rotationSpeed}
                scale={scale}
                lightIntensity={lightIntensity}
                showGrid={showGrid}
                bgTheme={bgTheme}
                isPaused={isPaused}
                onFpsUpdate={handleFpsUpdate}
              />

              {/* TOP-LEFT OVERLAY: Topology Parameters HUD */}
              <div className="absolute top-6 left-6 z-20 pointer-events-none space-y-3 font-mono text-left select-none">
                <div>
                  <h4 className="text-lg sm:text-xl font-black tracking-wider text-white uppercase drop-shadow-md">
                    {topology}
                  </h4>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest block pt-0.5">
                    PARAMETERS
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  {getParamsForTopology(topology).map((p) => (
                    <div key={p.label} className="flex items-center gap-4">
                      <span className="text-neutral-500 text-[10px] w-16">{p.label}</span>
                      <span className="text-neutral-200 font-bold">{p.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT-SIDE FLOATING ACTION BAR (Vertical Pill) */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 p-1.5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl">
                {/* Power / Pause Toggle */}
                <button
                  onClick={() => {
                    audioEngine.playHoverTone();
                    setIsPaused(!isPaused);
                  }}
                  title={isPaused ? 'Resume Rotation' : 'Pause Rotation'}
                  aria-label="Pause or Resume Rotation"
                  className={`p-2.5 rounded-xl transition-all ${
                    isPaused
                      ? 'bg-accent-cyan text-black'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Power className="w-4 h-4" />
                </button>

                {/* Wireframe / Solid Mode Toggle */}
                <button
                  onClick={() => {
                    audioEngine.playClickChime();
                    setRenderMode(renderMode === 'Wireframe' ? 'Solid' : 'Wireframe');
                  }}
                  title="Toggle Wireframe / Solid"
                  aria-label="Toggle Wireframe Mode"
                  className="p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Box className="w-4 h-4" />
                </button>

                {/* Re-center Camera */}
                <button
                  onClick={() => {
                    audioEngine.playClickChime();
                    if (sceneRef.current) sceneRef.current.resetView();
                  }}
                  title="Center View"
                  aria-label="Reset Camera"
                  className="p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Camera Snapshot / Screenshot */}
                <button
                  onClick={() => {
                    audioEngine.playClickChime();
                    if (sceneRef.current) sceneRef.current.captureSnapshot();
                  }}
                  title="Capture PNG Snapshot"
                  aria-label="Take Snapshot"
                  className="p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* BOTTOM-RIGHT 3D AXIS GIMBAL */}
              <div className="absolute right-6 bottom-16 z-20 pointer-events-none hidden sm:flex flex-col items-center font-mono text-[9px] text-neutral-500 select-none">
                <div className="relative w-12 h-12">
                  {/* Y Axis (Up) */}
                  <div className="absolute left-6 bottom-6 w-[1.5px] h-6 bg-white/70 origin-bottom" />
                  <span className="absolute left-7 top-0 text-[10px] text-white font-bold">Y</span>

                  {/* X Axis (Right) */}
                  <div className="absolute left-6 bottom-6 h-[1.5px] w-6 bg-accent-cyan/80 origin-left -rotate-12" />
                  <span className="absolute right-0 bottom-3 text-[10px] text-accent-cyan font-bold">X</span>

                  {/* Z Axis (Down-Left) */}
                  <div className="absolute left-6 bottom-6 h-[1.5px] w-6 bg-accent-lime/80 origin-left -rotate-135" />
                  <span className="absolute left-0 bottom-0 text-[10px] text-accent-lime font-bold">Z</span>
                </div>
              </div>

              {/* BOTTOM BAR INSIDE VIEWPORT: Topology Pill + Grid / Theme Toggles */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto gap-4">
                
                {/* Left Topology Pill */}
                <div className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-mono text-xs text-white font-bold flex items-center gap-2 shadow-lg">
                  <span className="text-neutral-400 text-[10px] font-normal">TOPOLOGY:</span>
                  <span>{topology.toUpperCase()}</span>
                  <span className="text-neutral-500">›</span>
                </div>

                {/* Right Toggles: Grid & Background Theme */}
                <div className="flex items-center gap-3">
                  {/* Grid Toggle */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-mono text-[10px] text-neutral-300">
                    <span>GRID</span>
                    <button
                      onClick={() => setShowGrid(!showGrid)}
                      className={`w-7 h-4 rounded-full transition-colors relative ${
                        showGrid ? 'bg-white' : 'bg-neutral-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-3 h-3 rounded-full transition-transform ${
                          showGrid
                            ? 'right-0.5 bg-black'
                            : 'left-0.5 bg-neutral-300'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Studio / Dark BG Toggle */}
                  <div className="flex items-center gap-1 p-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-mono text-[10px] text-neutral-300">
                    <span className="px-2 text-[9px] text-neutral-400">BG</span>
                    <button
                      onClick={() => setBgTheme('studio')}
                      className={`p-1.5 rounded-full transition-colors ${
                        bgTheme === 'studio' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Sun className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setBgTheme('dark')}
                      className={`p-1.5 rounded-full transition-colors ${
                        bgTheme === 'dark' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Moon className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* 3. BOTTOM INFO BAR BELOW VIEWPORT */}
            <div className="px-5 py-3 bg-black/80 border-t border-white/10 flex flex-wrap items-center justify-between font-mono text-[10px] text-neutral-500 gap-3">
              <div className="flex items-center gap-2 text-neutral-400">
                <MousePointer className="w-3 h-3 text-neutral-500" />
                <span>Drag to rotate</span>
                <span className="text-white/20">|</span>
                <span>Scroll to zoom</span>
                <span className="text-white/20">|</span>
                <span>Right-click to pan</span>
              </div>

              <div className="flex items-center gap-2 tracking-wider text-neutral-400 uppercase">
                <span>BUILT WITH WEBGL</span>
                <span>•</span>
                <span>THREE.JS</span>
                <span>•</span>
                <span>REAL-TIME SHADERS</span>
                <span className="text-neutral-600">//////</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
