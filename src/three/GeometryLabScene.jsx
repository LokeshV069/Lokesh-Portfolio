import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const GeometryLabScene = forwardRef(function GeometryLabScene(
  {
    topology = 'Torus Knot',
    color = '#FFFFFF',
    renderMode = 'Wireframe',
    rotationSpeed = 'Normal',
    scale = 1.0,
    wireDensity = 1.0,
    lightIntensity = 1.6,
    showGrid = true,
    bgTheme = 'dark',
    isPaused = false,
    onFpsUpdate
  },
  ref
) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const pointsMeshRef = useRef(null);
  const glowMeshRef = useRef(null);
  const gridHelperRef = useRef(null);
  const lightsRef = useRef({ dir: null, point: null, ambient: null });
  const speedRef = useRef(0.01);
  const isDraggingRef = useRef(false);
  const previousPointerPos = useRef({ x: 0, y: 0 });
  const meshRotationOffset = useRef({ x: 0, y: 0 });

  // Map speed label to numeric angular velocity
  useEffect(() => {
    if (isPaused) {
      speedRef.current = 0;
      return;
    }
    switch (rotationSpeed) {
      case 'Slow':
        speedRef.current = 0.003;
        break;
      case 'Fast':
        speedRef.current = 0.024;
        break;
      case 'Normal':
      default:
        speedRef.current = 0.01;
        break;
    }
  }, [rotationSpeed, isPaused]);

  // Helper to build geometry dynamically
  const buildGeometry = (type, density = 1) => {
    switch (type) {
      case 'Icosahedron':
        return new THREE.IcosahedronGeometry(2.7 * scale, Math.round(2 * density));
      case 'Octahedron':
        return new THREE.OctahedronGeometry(2.9 * scale, Math.round(1 * density));
      case 'Dodecahedron':
        return new THREE.DodecahedronGeometry(2.6 * scale, 1);
      case 'Torus':
        return new THREE.TorusGeometry(2.3 * scale, 0.75 * scale, 32, Math.round(64 * density));
      case 'Sphere':
        return new THREE.SphereGeometry(2.5 * scale, Math.round(48 * density), Math.round(48 * density));
      case 'Torus Knot':
      default:
        return new THREE.TorusKnotGeometry(2.0 * scale, 0.65 * scale, Math.round(140 * density), 32, 2, 3);
    }
  };

  // Expose methods to parent (screenshot, reset)
  useImperativeHandle(ref, () => ({
    captureSnapshot: () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      const dataURL = rendererRef.current.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `3d-primitive-${topology.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataURL;
      link.click();
    },
    resetView: () => {
      if (cameraRef.current) {
        cameraRef.current.position.set(0, 0, 11);
      }
      meshRotationOffset.current = { x: 0, y: 0 };
      if (meshRef.current) {
        meshRef.current.rotation.set(0, 0, 0);
      }
    }
  }));

  // ONE-TIME initialization of Three.js Scene, Camera, Renderer
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(bgTheme === 'studio' ? 0x141619 : 0x080808);
    scene.fog = new THREE.FogExp2(bgTheme === 'studio' ? 0x141619 : 0x080808, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 11);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Subtle 3D background grid plane
    const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x1a1a1a);
    gridHelper.position.y = -3.8;
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // Lighting setup
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, lightIntensity);
    dirLight.position.set(8, 12, 10);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(new THREE.Color(color), lightIntensity * 1.8, 25);
    rimLight.position.set(-8, -4, 6);
    scene.add(rimLight);

    lightsRef.current = { dir: dirLight, point: rimLight, ambient };

    // Initial Mesh Creation
    const initialGeo = buildGeometry(topology, wireDensity);
    const threeColor = new THREE.Color(color);

    // Standard Solid / Wire Mesh
    const material = new THREE.MeshBasicMaterial({
      color: threeColor,
      wireframe: true,
      wireframeLinewidth: 1.5
    });

    const mesh = new THREE.Mesh(initialGeo, material);
    mesh.position.y = 0.2;
    scene.add(mesh);
    meshRef.current = mesh;

    // Points Mesh (for Points render mode)
    const pointsMat = new THREE.PointsMaterial({
      color: threeColor,
      size: 0.05,
      transparent: true,
      opacity: 0.9
    });
    const pointsMesh = new THREE.Points(initialGeo.clone(), pointsMat);
    pointsMesh.position.y = 0.2;
    pointsMesh.visible = false;
    scene.add(pointsMesh);
    pointsMeshRef.current = pointsMesh;

    // Subtle bloom / ambient wireframe glow
    const glowGeo = initialGeo.clone();
    const glowMat = new THREE.MeshBasicMaterial({
      color: threeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.y = 0.2;
    glowMesh.scale.set(1.03, 1.03, 1.03);
    scene.add(glowMesh);
    glowMeshRef.current = glowMesh;

    // Direct Mouse Drag to Rotate & Wheel to Zoom
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      previousPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerPos.current.x;
      const deltaY = e.clientY - previousPointerPos.current.y;

      meshRotationOffset.current.y += deltaX * 0.008;
      meshRotationOffset.current.x += deltaY * 0.008;

      previousPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const newZ = cameraRef.current.position.z + e.deltaY * 0.008;
      cameraRef.current.position.z = Math.max(6, Math.min(18, newZ));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // FPS Counter & Animation loop
    let animationId;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;

    const animate = (time) => {
      animationId = requestAnimationFrame(animate);

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      frameCount++;
      fpsTimer += delta;
      if (fpsTimer >= 0.5) {
        const measuredFps = Math.round(frameCount / fpsTimer);
        if (onFpsUpdate) onFpsUpdate(measuredFps);
        frameCount = 0;
        fpsTimer = 0;
      }

      // Continuous rotation + manual drag offset
      if (meshRef.current) {
        meshRef.current.rotation.x = meshRotationOffset.current.x;
        meshRef.current.rotation.y += speedRef.current;
        meshRotationOffset.current.y = meshRef.current.rotation.y;
        meshRef.current.rotation.z += speedRef.current * 0.4;
      }

      if (pointsMeshRef.current && pointsMeshRef.current.visible) {
        pointsMeshRef.current.rotation.copy(meshRef.current.rotation);
      }

      if (glowMeshRef.current) {
        glowMeshRef.current.rotation.copy(meshRef.current.rotation);
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      resizeObserver.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      initialGeo.dispose();
      glowGeo.dispose();
      material.dispose();
      pointsMat.dispose();
      glowMat.dispose();
    };
  }, []);

  // Update Geometry dynamically
  useEffect(() => {
    if (!meshRef.current || !glowMeshRef.current || !pointsMeshRef.current) return;
    const oldGeo = meshRef.current.geometry;
    const newGeo = buildGeometry(topology, wireDensity);

    meshRef.current.geometry = newGeo;
    glowMeshRef.current.geometry = newGeo.clone();
    pointsMeshRef.current.geometry = newGeo.clone();

    if (oldGeo) oldGeo.dispose();
  }, [topology, scale, wireDensity]);

  // Update Material, Mode and Color
  useEffect(() => {
    if (!meshRef.current || !glowMeshRef.current || !pointsMeshRef.current) return;
    const threeColor = new THREE.Color(color);

    if (renderMode === 'Points') {
      meshRef.current.visible = false;
      glowMeshRef.current.visible = false;
      pointsMeshRef.current.visible = true;
      pointsMeshRef.current.material.color = threeColor;
    } else {
      pointsMeshRef.current.visible = false;
      meshRef.current.visible = true;

      const oldMat = meshRef.current.material;
      const isWire = renderMode === 'Wireframe';

      const newMat = isWire
        ? new THREE.MeshBasicMaterial({
            color: threeColor,
            wireframe: true,
            wireframeLinewidth: 1.5
          })
        : new THREE.MeshStandardMaterial({
            color: threeColor,
            metalness: 0.85,
            roughness: 0.15
          });

      meshRef.current.material = newMat;
      if (oldMat) oldMat.dispose();

      glowMeshRef.current.visible = isWire;
      glowMeshRef.current.material.color = threeColor;
    }

    if (lightsRef.current.point) {
      lightsRef.current.point.color = threeColor;
    }
  }, [color, renderMode]);

  // Update Grid Visibility
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [showGrid]);

  // Update Background Theme
  useEffect(() => {
    if (sceneRef.current) {
      const bgCol = bgTheme === 'studio' ? 0x141619 : 0x080808;
      sceneRef.current.background = new THREE.Color(bgCol);
      sceneRef.current.fog = new THREE.FogExp2(bgCol, 0.04);
    }
  }, [bgTheme]);

  // Update Light Intensity
  useEffect(() => {
    if (lightsRef.current.dir && lightsRef.current.point) {
      lightsRef.current.dir.intensity = lightIntensity;
      lightsRef.current.point.intensity = lightIntensity * 1.8;
    }
  }, [lightIntensity]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[520px] lg:h-[620px] overflow-hidden bg-[#080808] cursor-grab active:cursor-grabbing select-none"
      aria-label="Interactive 3D Geometry Lab Viewport"
      role="region"
    />
  );
});

export default GeometryLabScene;
