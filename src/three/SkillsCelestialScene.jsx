import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Creates a soft contact shadow texture for floating objects
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

export default function SkillsCelestialScene() {
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

    // Root Group for Parallax
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

    // Key Light from upper-center/left
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(-5, 9, 8);
    scene.add(keyLight);

    // Celestial Rim Light for the planet
    const rimLight = new THREE.DirectionalLight(0xdde5ff, 2.5);
    rimLight.position.set(8, 6, 4);
    scene.add(rimLight);

    // Bottom soft fill
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(0, -8, 5);
    scene.add(fillLight);

    // Shared Shadow Material
    const shadowTexture = createContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    });

    // -------------------------------------------------------------
    // 3. LEFT AREA: FLOATING GEOMETRIC SHAPES & CONSTELLATION NODES
    // -------------------------------------------------------------
    const leftGroup = new THREE.Group();
    leftGroup.position.set(-6.2, 0.5, 0);
    rootGroup.add(leftGroup);

    // 3A. Faceted Icosahedron (Upper-Left)
    const icoGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x222328,
      roughness: 0.35,
      metalness: 0.22,
      flatShading: true
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-1.2, 3.2, 0);
    leftGroup.add(icoMesh);

    // 3B. Isometric Matte Cube (Mid-Left)
    const cubeGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x28292e,
      roughness: 0.32,
      metalness: 0.18,
      flatShading: false
    });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.rotation.set(0.58, 0.76, -0.28);
    cubeMesh.position.set(-2.2, -0.5, 0.5);
    leftGroup.add(cubeMesh);

    // Cube contact shadow
    const cubeShadowGeo = new THREE.PlaneGeometry(3.0, 3.0);
    const cubeShadow = new THREE.Mesh(cubeShadowGeo, shadowMat.clone());
    cubeShadow.rotation.x = -Math.PI / 2.2;
    cubeShadow.position.set(-2.0, -1.8, 0.2);
    leftGroup.add(cubeShadow);

    // 3C. Floating Orbs / Spheres
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x1b1c20,
      roughness: 0.3,
      metalness: 0.4
    });

    const orb1 = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), orbMat);
    orb1.position.set(0.5, 1.5, 1.2);
    leftGroup.add(orb1);

    const orb2 = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 20), orbMat);
    orb2.position.set(-2.8, -3.2, 0.8);
    leftGroup.add(orb2);

    const orb3 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), orbMat);
    orb3.position.set(1.4, -2.5, -0.5);
    leftGroup.add(orb3);

    // 3D. Constellation Lines on Left Side
    const linePoints = [
      new THREE.Vector3(-1.2, 3.2, 0),
      new THREE.Vector3(0.5, 1.5, 1.2),
      new THREE.Vector3(-2.2, -0.5, 0.5),
      new THREE.Vector3(1.4, -2.5, -0.5),
      new THREE.Vector3(-2.8, -3.2, 0.8),
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
    planetGroup.position.set(5.8, 2.4, -2.0);
    rootGroup.add(planetGroup);

    // Main Planet Globe
    const planetGeo = new THREE.SphereGeometry(3.8, 64, 64);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d10,
      roughness: 0.45,
      metalness: 0.75
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Continental Wireframe Lattice Shell
    const latticeGeo = new THREE.IcosahedronGeometry(3.84, 4);
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
    const coronaGeo = new THREE.RingGeometry(3.82, 4.25, 64);
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

    // Concentric Gyroscopic Orbital Rings
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

    const ring1 = createOrbitRing(5.8, 4.8, Math.PI / 2.7, Math.PI / 5, 0.55);
    const ring2 = createOrbitRing(6.6, 5.4, -Math.PI / 3.4, Math.PI / 4, 0.38);
    const ring3 = createOrbitRing(4.8, 4.8, 0, 0, 0.25);

    // Orbiting Satellite Moon
    const satelliteGeo = new THREE.SphereGeometry(0.24, 20, 20);
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

      // --- Left Group Animations ---
      // Icosahedron rotation & float
      icoMesh.rotation.x = elapsedTime * 0.2 + mouse.y * 0.3;
      icoMesh.rotation.y = elapsedTime * 0.28 + mouse.x * 0.4;
      icoMesh.position.y = 3.2 + Math.sin(elapsedTime * 1.4) * 0.12;

      // Cube rotation & float
      cubeMesh.rotation.y = 0.76 + Math.sin(elapsedTime * 0.5) * 0.08 + mouse.x * 0.35;
      cubeMesh.rotation.x = 0.58 + Math.cos(elapsedTime * 0.4) * 0.06 - mouse.y * 0.25;
      const cubeFloatY = Math.cos(elapsedTime * 1.5) * 0.09;
      cubeMesh.position.y = -0.5 + cubeFloatY;

      // Dynamic shadow scale
      const shadowScale = 1.0 - cubeFloatY * 0.2;
      cubeShadow.scale.set(shadowScale, shadowScale, 1);
      cubeShadow.material.opacity = 0.8 - cubeFloatY * 0.25;

      // Floating Orbs
      orb1.position.y = 1.5 + Math.sin(elapsedTime * 1.6 + 1.0) * 0.15;
      orb2.position.y = -3.2 + Math.cos(elapsedTime * 1.4 + 2.0) * 0.12;
      orb3.position.y = -2.5 + Math.sin(elapsedTime * 1.8 + 3.0) * 0.14;

      // --- Right Planet Animations ---
      planetMesh.rotation.y = elapsedTime * 0.04;
      latticeMesh.rotation.y = -elapsedTime * 0.05;
      latticeDots.rotation.y = -elapsedTime * 0.05;

      ringsGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.06;
      ringsGroup.rotation.y = mouse.x * 0.18;

      // Satellite orbital translation along ring1
      const satAngle = elapsedTime * 0.65;
      const satX = Math.cos(satAngle) * 5.8;
      const satY = Math.sin(satAngle) * 4.8;
      const cosRotX = Math.cos(ring1.rotX);
      const sinRotX = Math.sin(ring1.rotX);
      const cosRotY = Math.cos(ring1.rotY);
      const sinRotY = Math.sin(ring1.rotY);

      satelliteMesh.position.x = satX * cosRotY;
      satelliteMesh.position.y = satY * cosRotX - satX * sinRotY * sinRotX;
      satelliteMesh.position.z = satY * sinRotX + satX * sinRotY * cosRotX;

      // Global Root Parallax
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

      // Responsive positioning of groups
      if (newWidth < 768) {
        leftGroup.position.set(-3.5, 1.0, -2.0);
        leftGroup.scale.set(0.7, 0.7, 0.7);
        planetGroup.position.set(3.5, 2.5, -4.0);
        planetGroup.scale.set(0.65, 0.65, 0.65);
      } else if (newWidth < 1200) {
        leftGroup.position.set(-5.0, 0.8, -1.0);
        leftGroup.scale.set(0.85, 0.85, 0.85);
        planetGroup.position.set(5.0, 2.4, -2.5);
        planetGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        leftGroup.position.set(-6.2, 0.5, 0);
        leftGroup.scale.set(1, 1, 1);
        planetGroup.position.set(5.8, 2.4, -2.0);
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

      icoGeo.dispose();
      icoMat.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      cubeShadowGeo.dispose();
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
