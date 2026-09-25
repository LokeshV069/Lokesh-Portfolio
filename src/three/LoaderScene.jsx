import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LoaderScene({ progress = 0 }) {
  const mountRef = useRef(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 12.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Root Group for Parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Mouse Tracking for Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.7;
      mouse.targetY = y * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // -------------------------------------------------------------
    // 2. CENTRAL CELESTIAL GLOBE / PLANET ORB
    // -------------------------------------------------------------
    const orbGroup = new THREE.Group();
    orbGroup.position.set(0, 1.2, 0);
    rootGroup.add(orbGroup);

    // Core Sphere
    const sphereGeo = new THREE.SphereGeometry(2.1, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      roughness: 0.35,
      metalness: 0.85
    });
    const mainOrb = new THREE.Mesh(sphereGeo, sphereMat);
    orbGroup.add(mainOrb);

    // Continental Node Lattice / Wireframe Shell
    const latticeGeo = new THREE.IcosahedronGeometry(2.13, 4);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    orbGroup.add(latticeMesh);

    // Topological Glowing Vertex Points on Globe
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const latticePoints = new THREE.Points(latticeGeo, pointsMat);
    orbGroup.add(latticePoints);

    // Luminous Corona Flare Rim (Top Solar Burst Flare)
    const coronaGeo = new THREE.RingGeometry(2.12, 2.38, 64);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.position.set(0, 0, -0.05);
    orbGroup.add(coronaMesh);

    // -------------------------------------------------------------
    // 3. MULTI-AXIS GYROSCOPIC ORBITAL RINGS & MOONS
    // -------------------------------------------------------------
    const ringsGroup = new THREE.Group();
    orbGroup.add(ringsGroup);

    const createOrbitRing = (radiusX, radiusY, rotX, rotY, opacity = 0.4) => {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(120);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      ringsGroup.add(ring);
      return { ring, radiusX, radiusY, rotX, rotY };
    };

    const ring1 = createOrbitRing(3.2, 2.7, Math.PI / 3.2, Math.PI / 6, 0.65);
    const ring2 = createOrbitRing(3.8, 3.2, -Math.PI / 4, Math.PI / 4, 0.45);
    const ring3 = createOrbitRing(2.6, 2.6, 0, 0, 0.35); // Concentric radar ring
    const ring4 = createOrbitRing(4.5, 4.0, Math.PI / 2.3, -Math.PI / 8, 0.25);

    // Small Satellite Moons Travelling on Rings
    const moonGeo = new THREE.SphereGeometry(0.18, 20, 20);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.2,
      metalness: 0.9
    });

    const moonA = new THREE.Mesh(moonGeo, moonMat);
    const moonB = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), moonMat);
    const moonC = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), moonMat);
    ringsGroup.add(moonA);
    ringsGroup.add(moonB);
    ringsGroup.add(moonC);

    // -------------------------------------------------------------
    // 4. VERTICAL ENERGY TETHER BEAM (From Orb down to Pedestal)
    // -------------------------------------------------------------
    const beamGeo = new THREE.CylinderGeometry(0.045, 0.08, 3.2, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.set(0, -0.9, 0);
    rootGroup.add(beamMesh);

    // Outer Glow Cylinder for the Beam
    const beamGlowGeo = new THREE.CylinderGeometry(0.14, 0.28, 3.2, 16);
    const beamGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const beamGlow = new THREE.Mesh(beamGlowGeo, beamGlowMat);
    beamGlow.position.set(0, -0.9, 0);
    rootGroup.add(beamGlow);

    // -------------------------------------------------------------
    // 5. CIRCULAR PEDESTAL PLATFORM & ENERGY CONCENTRIC RINGS
    // -------------------------------------------------------------
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -2.5, 0);
    rootGroup.add(pedestalGroup);

    // Base Multi-Tiered Pedestal Cylinder
    const pedestalGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.25, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x08080a,
      roughness: 0.3,
      metalness: 0.95
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalGroup.add(pedestal);

    // Glowing Concentric Rings on Pedestal Surface
    const createPedestalRing = (radius, opacity = 0.5) => {
      const c = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const pts = c.getPoints(90);
      const g = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(p.x, 0.13, p.y))
      );
      const m = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending
      });
      const r = new THREE.Line(g, m);
      pedestalGroup.add(r);
      return r;
    };

    const pedRing1 = createPedestalRing(0.8, 0.85);
    const pedRing2 = createPedestalRing(1.5, 0.6);
    const pedRing3 = createPedestalRing(2.2, 0.4);
    const pedRing4 = createPedestalRing(3.2, 0.2); // Outer ground ripple ring

    // -------------------------------------------------------------
    // 6. SWEEPING COSMIC ARCHES (Left and Right Sky Arcs)
    // -------------------------------------------------------------
    const skyArcsGroup = new THREE.Group();
    rootGroup.add(skyArcsGroup);

    const createSkyArc = (radiusX, radiusY, angleStart, angleEnd, posX, rotZ, opacity) => {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, angleStart, angleEnd, false, 0);
      const pts = curve.getPoints(100);
      const g = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(p.x, p.y, -3))
      );
      const m = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending
      });
      const arc = new THREE.Line(g, m);
      arc.position.x = posX;
      arc.rotation.z = rotZ;
      skyArcsGroup.add(arc);
      return arc;
    };

    // Giant left sweeping arc
    createSkyArc(9.5, 12.0, -Math.PI * 0.4, Math.PI * 0.4, -6.5, Math.PI * 0.1, 0.28);
    createSkyArc(10.2, 13.0, -Math.PI * 0.4, Math.PI * 0.4, -7.0, Math.PI * 0.1, 0.18);

    // Giant right sweeping arc
    createSkyArc(9.5, 12.0, Math.PI * 0.6, Math.PI * 1.4, 6.5, -Math.PI * 0.1, 0.28);
    createSkyArc(10.2, 13.0, Math.PI * 0.6, Math.PI * 1.4, 7.0, -Math.PI * 0.1, 0.18);

    // -------------------------------------------------------------
    // 7. RISING ENERGY PARTICLES / SPARKS
    // -------------------------------------------------------------
    const sparkCount = 180;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVelocities = [];

    for (let s = 0; s < sparkCount; s++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 2.2;
      sparkPositions[s * 3] = Math.cos(angle) * dist;
      sparkPositions[s * 3 + 1] = -2.4 + Math.random() * 4.5;
      sparkPositions[s * 3 + 2] = Math.sin(angle) * dist;

      sparkVelocities.push({
        y: 0.015 + Math.random() * 0.035,
        angle: angle,
        orbitSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    rootGroup.add(sparks);

    // -------------------------------------------------------------
    // 8. LIGHTING
    // -------------------------------------------------------------
    // Top-back solar corona light
    const solarLight = new THREE.DirectionalLight(0xffffff, 5.0);
    solarLight.position.set(0, 5, -2);
    scene.add(solarLight);

    // Upward pedestal core light
    const coreLight = new THREE.PointLight(0xffffff, 3.5, 12);
    coreLight.position.set(0, -2.2, 0.5);
    scene.add(coreLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    // -------------------------------------------------------------
    // 9. ANIMATION LOOP
    // -------------------------------------------------------------
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const currentProgress = progressRef.current / 100;

      // Smooth Mouse Parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      rootGroup.position.x = mouse.x * 0.7;
      rootGroup.position.y = mouse.y * 0.4;
      rootGroup.rotation.y = mouse.x * 0.04;
      rootGroup.rotation.x = -mouse.y * 0.03;

      // Orb Rotation
      const orbSpeed = 0.15 + currentProgress * 0.25;
      mainOrb.rotation.y = t * orbSpeed;
      latticeMesh.rotation.y = t * (orbSpeed * 1.1);
      latticePoints.rotation.y = t * (orbSpeed * 1.1);

      // Levitating float bobbing
      orbGroup.position.y = 1.2 + Math.sin(t * 1.8) * 0.12;

      // Corona Pulse
      coronaMesh.scale.setScalar(1.0 + Math.sin(t * 3.0) * 0.03 + currentProgress * 0.08);

      // Orbital Rings Rotation
      ring1.ring.rotation.z = t * (0.12 + currentProgress * 0.2);
      ring2.ring.rotation.z = -t * (0.09 + currentProgress * 0.15);
      ring3.ring.rotation.z = t * 0.05;
      ring4.ring.rotation.z = -t * 0.04;

      // Satellite Moons Orbit
      moonA.position.x = Math.cos(t * (0.4 + currentProgress * 0.3)) * ring1.radiusX;
      moonA.position.y = Math.sin(t * (0.4 + currentProgress * 0.3)) * ring1.radiusY;
      moonA.position.z = Math.sin(t * (0.4 + currentProgress * 0.3)) * 0.8;

      moonB.position.x = Math.cos(-t * (0.55 + currentProgress * 0.2) + 2) * ring2.radiusX;
      moonB.position.y = Math.sin(-t * (0.55 + currentProgress * 0.2) + 2) * ring2.radiusY;
      moonB.position.z = Math.cos(-t * (0.55 + currentProgress * 0.2) + 2) * 1.1;

      moonC.position.x = Math.cos(t * 0.3 + 4) * ring4.radiusX;
      moonC.position.y = Math.sin(t * 0.3 + 4) * ring4.radiusY;
      moonC.position.z = Math.sin(t * 0.3 + 4) * 0.5;

      // Beam Energy Pulse
      const beamScale = 1.0 + Math.sin(t * 10.0) * 0.12 * (0.5 + currentProgress * 0.5);
      beamMesh.scale.set(beamScale, 1.0, beamScale);
      beamGlow.scale.set(beamScale * 1.2, 1.0, beamScale * 1.2);
      beamMat.opacity = 0.75 + Math.sin(t * 8.0) * 0.25;

      // Pedestal Rings Energy Pulse
      pedRing1.material.opacity = 0.6 + Math.sin(t * 4.0) * 0.3;
      pedRing2.material.opacity = 0.4 + Math.cos(t * 3.5) * 0.25;
      pedRing4.scale.setScalar(1.0 + (t * 0.2) % 0.35);

      // Energy Sparks Rising Physics
      const pos = sparkGeo.attributes.position.array;
      for (let k = 0; k < sparkCount; k++) {
        pos[k * 3 + 1] += sparkVelocities[k].y * (1.0 + currentProgress * 0.8);
        if (pos[k * 3 + 1] > 3.8) {
          pos[k * 3 + 1] = -2.4;
          const a = Math.random() * Math.PI * 2;
          const d = Math.random() * 2.2;
          pos[k * 3] = Math.cos(a) * d;
          pos[k * 3 + 2] = Math.sin(a) * d;
        }
      }
      sparkGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // -------------------------------------------------------------
    // 10. RESIZE OBSERVER
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
    // 11. CLEANUP
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      beamGlowGeo.dispose();
      beamGlowMat.dispose();
      pedestalGeo.dispose();
      pedestalMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      sparkMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
