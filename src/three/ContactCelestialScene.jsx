import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Creates an ultra-smooth contact shadow texture for floating and grounded 3D objects
 */
function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(15, 15, 20, 0.45)');
  gradient.addColorStop(0.2, 'rgba(15, 15, 20, 0.28)');
  gradient.addColorStop(0.5, 'rgba(15, 15, 20, 0.10)');
  gradient.addColorStop(0.8, 'rgba(15, 15, 20, 0.02)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function ContactCelestialScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 900;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 15.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
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
      mouse.targetX = x * 0.6;
      mouse.targetY = y * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 2. Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(-5, 9, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdde5ff, 2.5);
    rimLight.position.set(8, 6, 4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(0, -8, 5);
    scene.add(fillLight);

    // Contact Shadow Material
    const shadowTexture = createContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    // -------------------------------------------------------------
    // 3. LEFT FOREGROUND: FACETED ROCK POLYHEDRON & FLOATING ORBS
    // -------------------------------------------------------------
    const leftGroup = new THREE.Group();
    leftGroup.position.set(-6.5, -1.0, 0);
    rootGroup.add(leftGroup);

    // 3A. Grounded Faceted Polyhedron in Lower-Left Corner
    const rockGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x1f2025,
      roughness: 0.38,
      metalness: 0.25,
      flatShading: true
    });
    const rockMesh = new THREE.Mesh(rockGeo, rockMat);
    rockMesh.position.set(-1.8, -3.2, 0.5);
    rockMesh.rotation.set(0.3, 0.5, 0.2);
    leftGroup.add(rockMesh);

    // Ground Contact Shadow under Rock
    const rockShadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const rockShadow = new THREE.Mesh(rockShadowGeo, shadowMat.clone());
    rockShadow.rotation.x = -Math.PI / 2.2;
    rockShadow.position.set(-1.6, -4.5, 0.3);
    leftGroup.add(rockShadow);

    // 3B. Floating Spheres / Orbs on Left Margin
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x1b1c20,
      roughness: 0.3,
      metalness: 0.4
    });

    const orb1 = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), orbMat);
    orb1.position.set(-3.2, 2.2, 1.2);
    leftGroup.add(orb1);

    const orb2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20), orbMat);
    orb2.position.set(-0.5, -0.8, 0.8);
    leftGroup.add(orb2);

    const orb3 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 24), orbMat);
    orb3.position.set(-3.6, -1.2, -0.5);
    leftGroup.add(orb3);

    // 3C. Constellation Orbital Track Lines on Left
    const linePoints = [
      new THREE.Vector3(-3.2, 2.2, 1.2),
      new THREE.Vector3(-0.5, -0.8, 0.8),
      new THREE.Vector3(-1.8, -3.2, 0.5),
      new THREE.Vector3(-3.6, -1.2, -0.5),
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x444450,
      transparent: true,
      opacity: 0.25
    });
    const constellationLine = new THREE.Line(lineGeo, lineMat);
    leftGroup.add(constellationLine);

    // -------------------------------------------------------------
    // 4. RIGHT AREA: CELESTIAL PLANET GLOBE & ORBITAL RINGS
    // -------------------------------------------------------------
    const planetGroup = new THREE.Group();
    planetGroup.position.set(5.8, 2.2, -2.0);
    rootGroup.add(planetGroup);

    // Main Planet Globe
    const planetGeo = new THREE.SphereGeometry(4.0, 64, 64);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d10,
      roughness: 0.45,
      metalness: 0.75
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Continental Wireframe Lattice Shell
    const latticeGeo = new THREE.IcosahedronGeometry(4.04, 4);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    planetGroup.add(latticeMesh);

    // Glowing Topological Dots on Planet
    const dotsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const latticeDots = new THREE.Points(latticeGeo, dotsMat);
    planetGroup.add(latticeDots);

    // Upper Corona Flare Rim
    const coronaGeo = new THREE.RingGeometry(4.02, 4.45, 64);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.position.set(0, 0, -0.05);
    planetGroup.add(coronaMesh);

    // Multi-axis Elliptical Orbital Rings
    const ringsGroup = new THREE.Group();
    planetGroup.add(ringsGroup);

    const createOrbitRing = (radiusX, radiusY, rotX, rotY, opacity = 0.45) => {
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

    const ring1 = createOrbitRing(6.0, 5.0, Math.PI / 2.7, Math.PI / 5, 0.55);
    const ring2 = createOrbitRing(6.8, 5.6, -Math.PI / 3.4, Math.PI / 4, 0.38);

    // Orbiting Satellite Moon
    const satelliteGeo = new THREE.SphereGeometry(0.25, 20, 20);
    const satelliteMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.25,
      metalness: 0.9
    });
    const satelliteMesh = new THREE.Mesh(satelliteGeo, satelliteMat);
    planetGroup.add(satelliteMesh);

    // 5. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Slow rock rotation & micro float
      rockMesh.rotation.y = 0.5 + elapsedTime * 0.08 + mouse.x * 0.2;
      rockMesh.rotation.x = 0.3 + Math.sin(elapsedTime * 0.6) * 0.05;

      // Floating Orbs
      orb1.position.y = 2.2 + Math.sin(elapsedTime * 1.5) * 0.12;
      orb2.position.y = -0.8 + Math.cos(elapsedTime * 1.3) * 0.1;
      orb3.position.y = -1.2 + Math.sin(elapsedTime * 1.6 + 1.0) * 0.11;

      // Planet Rotations
      planetMesh.rotation.y = elapsedTime * 0.04;
      latticeMesh.rotation.y = -elapsedTime * 0.05;
      latticeDots.rotation.y = -elapsedTime * 0.05;

      ringsGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.06;
      ringsGroup.rotation.y = mouse.x * 0.18;

      // Satellite orbit trajectory
      const satAngle = elapsedTime * 0.65;
      const satX = Math.cos(satAngle) * 6.0;
      const satY = Math.sin(satAngle) * 5.0;
      const cosRotX = Math.cos(ring1.rotX);
      const sinRotX = Math.sin(ring1.rotX);
      const cosRotY = Math.cos(ring1.rotY);
      const sinRotY = Math.sin(ring1.rotY);

      satelliteMesh.position.x = satX * cosRotY;
      satelliteMesh.position.y = satY * cosRotX - satX * sinRotY * sinRotX;
      satelliteMesh.position.z = satY * sinRotX + satX * sinRotY * cosRotX;

      // Global Parallax
      rootGroup.position.x = mouse.x * 0.25;
      rootGroup.position.y = mouse.y * 0.18;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Responsive Resizing
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 900;
      camera.aspect = newWidth / newHeight;

      if (newWidth < 768) {
        leftGroup.position.set(-3.5, 0.0, -2.0);
        leftGroup.scale.set(0.7, 0.7, 0.7);
        planetGroup.position.set(3.5, 2.5, -4.0);
        planetGroup.scale.set(0.65, 0.65, 0.65);
      } else if (newWidth < 1200) {
        leftGroup.position.set(-5.0, -0.5, -1.0);
        leftGroup.scale.set(0.85, 0.85, 0.85);
        planetGroup.position.set(5.0, 2.2, -2.5);
        planetGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        leftGroup.position.set(-6.5, -1.0, 0);
        leftGroup.scale.set(1, 1, 1);
        planetGroup.position.set(5.8, 2.2, -2.0);
        planetGroup.scale.set(1, 1, 1);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 7. Disposal & Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      rockGeo.dispose();
      rockMat.dispose();
      rockShadowGeo.dispose();
      orbMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();

      planetGeo.dispose();
      planetMat.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      dotsMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      satelliteGeo.dispose();
      satelliteMat.dispose();

      shadowTexture.dispose();
      shadowMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
