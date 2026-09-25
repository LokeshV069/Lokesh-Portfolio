import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ProjectsCelestialScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group for Mouse Parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Mouse Tracking for Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.8;
      mouse.targetY = y * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // -------------------------------------------------------------
    // 2. LEFT SIDE: GIGANTIC CURVED CELESTIAL ARC & ORBITAL RAILS
    // -------------------------------------------------------------
    const arcGroup = new THREE.Group();
    arcGroup.position.set(-6.8, -0.5, -1.0);
    arcGroup.rotation.z = Math.PI * 0.08;
    rootGroup.add(arcGroup);

    // Multiple nested concentric elliptical curved trajectory lines
    const arcRails = [];
    const arcRadii = [8.5, 9.2, 9.8, 10.5];

    arcRadii.forEach((radius, i) => {
      // Create partial ellipse curve from -Math.PI*0.35 to Math.PI*0.35
      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius * 1.35,
        -Math.PI * 0.38, Math.PI * 0.38,
        false, 0
      );
      const points = curve.getPoints(120);
      const railGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const railMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.18 + i * 0.08,
        blending: THREE.AdditiveBlending
      });
      const rail = new THREE.Line(railGeo, railMat);
      arcGroup.add(rail);
      arcRails.push({ rail, radius });
    });

    // Outer Glowing Volumetric Ribbon (Wide Glowing Arc Band)
    const arcRibbonCurve = new THREE.EllipseCurve(
      0, 0,
      9.5, 9.5 * 1.35,
      -Math.PI * 0.35, Math.PI * 0.35,
      false, 0
    );
    const ribbonPoints = arcRibbonCurve.getPoints(80);
    const ribbonGeo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(ribbonPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))),
      80,
      0.18,
      8,
      false
    );
    const ribbonMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const arcRibbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    arcGroup.add(arcRibbon);

    // Glowing Node Beads Sliding along the Left Arc
    const arcNodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let k = 0; k < 5; k++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      arcGroup.add(node);
      arcNodes.push({
        mesh: node,
        speed: 0.08 + k * 0.03,
        phase: k * 1.2,
        radius: arcRadii[k % arcRadii.length]
      });
    }

    // -------------------------------------------------------------
    // 3. UPPER RIGHT: CELESTIAL ECLIPSE CRESCENT & ORBIT SYSTEM
    // -------------------------------------------------------------
    const planetGroup = new THREE.Group();
    // Positioned in upper right quadrant matching reference image
    planetGroup.position.set(6.2, 3.1, -1.5);
    rootGroup.add(planetGroup);

    // Crescent Eclipse Planet Core
    const planetGeo = new THREE.SphereGeometry(1.6, 48, 48);
    // Custom Material for Dark Body with Luminous Edge Rim
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.6,
      metalness: 0.4
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Glowing Rim Halo (Atmospheric Crescent Ring)
    const rimCurve = new THREE.EllipseCurve(0, 0, 1.62, 1.62, 0, 2 * Math.PI, false, 0);
    const rimPoints = rimCurve.getPoints(90);
    const rimGeo = new THREE.BufferGeometry().setFromPoints(
      rimPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const rimMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const rimLine = new THREE.Line(rimGeo, rimMat);
    planetGroup.add(rimLine);

    // Orbital Rings Around the Planet
    const orbitRings = [];
    const createPlanetOrbit = (rx, ry, rotX, rotY, opacity) => {
      const c = new THREE.EllipseCurve(0, 0, rx, ry, 0, 2 * Math.PI, false, 0);
      const pts = c.getPoints(120);
      const g = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const m = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(g, m);
      line.rotation.x = rotX;
      line.rotation.y = rotY;
      planetGroup.add(line);
      return { line, rx, ry, rotX, rotY };
    };

    const ringA = createPlanetOrbit(3.2, 2.5, Math.PI / 3, Math.PI / 8, 0.4);
    const ringB = createPlanetOrbit(4.2, 3.4, -Math.PI / 4, Math.PI / 5, 0.25);
    const ringC = createPlanetOrbit(2.3, 2.3, 0, 0, 0.18); // Concentric radar circle
    orbitRings.push(ringA, ringB, ringC);

    // Small Satellite Moons Orbiting the Crescent
    const moonGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.3,
      metalness: 0.8
    });
    const moon1 = new THREE.Mesh(moonGeo, moonMat);
    const moon2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 20), moonMat);
    planetGroup.add(moon1);
    planetGroup.add(moon2);

    // Vertical Telemetry Data Lines with Nodes (Matching reference art)
    const telemetryGroup = new THREE.Group();
    rootGroup.add(telemetryGroup);

    const createTelemetryLine = (x, yTop, yBottom) => {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, yTop, 0),
        new THREE.Vector3(x, yBottom, 0)
      ]);
      const m = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
      const line = new THREE.Line(g, m);

      // Node dot at top
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), nodeMat);
      dot.position.set(x, yTop, 0);

      // Node circle at bottom
      const ringDotCurve = new THREE.EllipseCurve(0, 0, 0.08, 0.08, 0, 2 * Math.PI, false, 0);
      const ringDotGeo = new THREE.BufferGeometry().setFromPoints(
        ringDotCurve.getPoints(24).map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const ringDot = new THREE.Line(ringDotGeo, m);
      ringDot.position.set(x, yBottom, 0);

      telemetryGroup.add(line);
      telemetryGroup.add(dot);
      telemetryGroup.add(ringDot);
    };

    createTelemetryLine(7.8, 4.6, 2.0);
    createTelemetryLine(3.2, 4.2, 1.2);
    createTelemetryLine(-3.2, 0.2, -2.6);

    // -------------------------------------------------------------
    // 4. FLOATING 3D STARDUST & DATA NODES FIELD
    // -------------------------------------------------------------
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 32;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      particleSizes[i] = Math.random() * 0.08 + 0.03;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(particlesGeo, particlesMat);
    rootGroup.add(starField);

    // -------------------------------------------------------------
    // 5. FOREGROUND SPECULAR REFLECTIVE FLOOR LINES
    // -------------------------------------------------------------
    const floorGroup = new THREE.Group();
    floorGroup.position.set(0, -5.2, 2.0);
    floorGroup.rotation.x = -Math.PI * 0.44;
    rootGroup.add(floorGroup);

    // Floor geometric reflection seams
    for (let j = -4; j <= 4; j++) {
      const seamCurve = new THREE.EllipseCurve(
        0, 0,
        14 + j * 2.2, 10 + j * 1.5,
        -Math.PI * 0.25, Math.PI * 0.25,
        false, 0
      );
      const seamPts = seamCurve.getPoints(60);
      const seamGeo = new THREE.BufferGeometry().setFromPoints(
        seamPts.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const seamMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.12 - Math.abs(j) * 0.02,
        blending: THREE.AdditiveBlending
      });
      const seam = new THREE.Line(seamGeo, seamMat);
      floorGroup.add(seam);
    }

    // -------------------------------------------------------------
    // 6. LIGHTING
    // -------------------------------------------------------------
    // Bright white key rim light from upper right matching crescent
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(8, 6, 4);
    scene.add(keyLight);

    // Left fill light cast from giant white arc
    const arcLight = new THREE.PointLight(0xffffff, 3.5, 25);
    arcLight.position.set(-6, 0, 3);
    scene.add(arcLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    // -------------------------------------------------------------
    // 7. ANIMATION LOOP
    // -------------------------------------------------------------
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth Mouse Parallax Lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      rootGroup.position.x = mouse.x * 0.8;
      rootGroup.position.y = mouse.y * 0.5;
      rootGroup.rotation.y = mouse.x * 0.04;
      rootGroup.rotation.x = -mouse.y * 0.03;

      // Animate Left Arc Nodes
      arcNodes.forEach((node) => {
        const angle = Math.sin(t * node.speed + node.phase) * 0.36;
        const x = Math.cos(angle) * node.radius;
        const y = Math.sin(angle) * (node.radius * 1.35);
        node.mesh.position.set(x, y, 0);
      });

      // Gently pulse arc ribbon opacity
      arcRibbon.material.opacity = 0.24 + Math.sin(t * 1.5) * 0.06;

      // Animate Planet Orbit Rings Rotation
      ringA.line.rotation.z = t * 0.05;
      ringB.line.rotation.z = -t * 0.04;
      ringC.line.rotation.z = t * 0.02;

      // Animate Satellite Moons Orbit
      moon1.position.x = Math.cos(t * 0.35) * ringA.rx;
      moon1.position.y = Math.sin(t * 0.35) * ringA.ry * 0.8;
      moon1.position.z = Math.sin(t * 0.35) * 1.6;

      moon2.position.x = Math.cos(-t * 0.45 + 2) * ringB.rx;
      moon2.position.y = Math.sin(-t * 0.45 + 2) * ringB.ry * 0.7;
      moon2.position.z = Math.cos(-t * 0.45 + 2) * 1.4;

      // Subtle Stardust Drift
      starField.rotation.y = t * 0.01;
      starField.rotation.x = t * 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // -------------------------------------------------------------
    // 8. RESIZE OBSERVER
    // -------------------------------------------------------------
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // -------------------------------------------------------------
    // 9. CLEANUP
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      planetGeo.dispose();
      planetMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
