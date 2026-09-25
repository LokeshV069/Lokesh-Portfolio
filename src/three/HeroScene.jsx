import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene({ reducedMotion = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    const cyanRim = new THREE.PointLight(0x00f0ff, 2.0, 30);
    cyanRim.position.set(-8, 5, 5);
    scene.add(cyanRim);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central floating wireframe ring & icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(4, 0, -2);
    group.add(icoMesh);

    const torusGeo = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25
    });
    const ringMesh = new THREE.Mesh(torusGeo, torusMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.position.set(4, 0, -2);
    group.add(ringMesh);

    // 2. High-contrast floating black and white spheres
    const sphereMatWhite = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sphereMatDark = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.3,
      metalness: 0.9,
    });

    const spheres = [];
    const spherePositions = [
      { pos: [5.5, 3.2, 2], r: 0.7, mat: sphereMatWhite },
      { pos: [7.2, -2.5, 1], r: 1.1, mat: sphereMatDark },
      { pos: [2.5, -3.8, 3], r: 0.45, mat: sphereMatWhite },
      { pos: [-4.5, 4.0, -3], r: 0.6, mat: sphereMatDark },
      { pos: [8.5, 1.8, -1], r: 0.5, mat: sphereMatWhite }
    ];

    spherePositions.forEach((item, index) => {
      const geo = new THREE.SphereGeometry(item.r, 32, 32);
      const mesh = new THREE.Mesh(geo, item.mat);
      mesh.position.set(...item.pos);
      mesh.userData = {
        baseY: item.pos[1],
        speed: 0.8 + index * 0.25,
        offset: index * 1.5
      };
      spheres.push(mesh);
      group.add(mesh);
    });

    // 3. Coordinate Dust / Spatial Particle Field
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 35;
      particlePos[i + 1] = (Math.random() - 0.5) * 25;
      particlePos[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x888888,
      size: 0.08,
      transparent: true,
      opacity: 0.4
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e) => {
      if (reducedMotion) return;
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Mouse damping
      if (!reducedMotion) {
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        group.rotation.y = mouseX * 0.18;
        group.rotation.x = -mouseY * 0.12;

        camera.position.x = mouseX * 0.8;
        camera.position.y = mouseY * 0.5;
      }

      // Gentle continuous rotation
      icoMesh.rotation.x += 0.003;
      icoMesh.rotation.y += 0.004;

      ringMesh.rotation.z += 0.002;
      ringMesh.rotation.x += 0.001;

      // Spheres hovering
      spheres.forEach((s) => {
        s.position.y = s.userData.baseY + Math.sin(elapsedTime * s.userData.speed + s.userData.offset) * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Clean up Three.js resources
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      sphereMatWhite.dispose();
      sphereMatDark.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
}
