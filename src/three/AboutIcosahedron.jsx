import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AboutIcosahedron() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 180;
    let height = container.clientHeight || 180;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.0);

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

    // Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
    keyLight.position.set(-5, 9, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbe3ee, 1.2);
    fillLight.position.set(5, -4, 4);
    scene.add(fillLight);

    // Soft Contact Shadow Plane underneath
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(15, 15, 20, 0.40)');
    grad.addColorStop(0.2, 'rgba(15, 15, 20, 0.25)');
    grad.addColorStop(0.5, 'rgba(15, 15, 20, 0.08)');
    grad.addColorStop(0.8, 'rgba(15, 15, 20, 0.01)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(canvas);

    const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2.2;
    shadowMesh.position.set(0.15, -1.3, -0.3);
    scene.add(shadowMesh);

    // Faceted Icosahedron (Geodesic low-poly sphere with crisp triangular facets)
    const geo = new THREE.IcosahedronGeometry(1.2, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x27282d,
      roughness: 0.35,
      metalness: 0.22,
      flatShading: true // Gives crisp triangular facets matching mockup
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, 0.08, 0);
    scene.add(mesh);

    // Mouse Tracking for smooth parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Gentle continuous rotation + parallax
      mesh.rotation.x = elapsedTime * 0.22 + mouse.y * 0.35;
      mesh.rotation.y = elapsedTime * 0.32 + mouse.x * 0.45;
      mesh.rotation.z = Math.sin(elapsedTime * 0.4) * 0.08;

      // Smooth floating harmonic bob
      const floatY = Math.sin(elapsedTime * 1.4) * 0.09;
      mesh.position.y = 0.08 + floatY;

      // Shadow reacts to elevation
      const shadowScale = 1.0 - floatY * 0.25;
      shadowMesh.scale.set(shadowScale, shadowScale, 1);
      shadowMesh.material.opacity = 0.8 - floatY * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 180;
      const newHeight = container.clientHeight || 180;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      geo.dispose();
      mat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full select-none pointer-events-none"
      title="Faceted Polyhedron"
    />
  );
}
