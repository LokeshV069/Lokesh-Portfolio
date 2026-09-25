import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Creates an ultra-smooth, high-resolution radial contact shadow texture
 * that blends into the off-white architectural background without banding.
 */
function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, 'rgba(15, 15, 20, 0.45)');
  gradient.addColorStop(0.18, 'rgba(15, 15, 20, 0.32)');
  gradient.addColorStop(0.42, 'rgba(15, 15, 20, 0.14)');
  gradient.addColorStop(0.72, 'rgba(15, 15, 20, 0.03)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function AboutObjectsScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 280;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 9.8);
    camera.lookAt(0, -0.2, 0);

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

    // 2. High-Fidelity Architectural Lighting
    // Ambient light prevents pitch-black silhouettes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    // Key directional light from upper-left (creates crisp top highlight & side contrast)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(-6, 11, 8);
    scene.add(keyLight);

    // Subtle sky light from directly above
    const topLight = new THREE.DirectionalLight(0xffffff, 1.4);
    topLight.position.set(0, 10, 2);
    scene.add(topLight);

    // Fill light from bottom-right to soften shadows
    const fillLight = new THREE.DirectionalLight(0xdbe3ee, 1.3);
    fillLight.position.set(7, -3, 6);
    scene.add(fillLight);

    // 3. Materials
    // Matte dark graphite cube material with physical specular highlight on top face
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b2c31,
      roughness: 0.32,
      metalness: 0.18,
      flatShading: false,
    });

    // Matte faceted torus material matching the reference image's polygon wireframe look
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x27282d,
      roughness: 0.34,
      metalness: 0.20,
      flatShading: true, // Clean polygon facets
    });

    // Shadow plane material
    const shadowTexture = createContactShadowTexture();
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    // 4. Object Groups
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- CUBE SETUP ---
    const cubeGroup = new THREE.Group();
    cubeGroup.position.set(-1.8, 0.05, 0);
    rootGroup.add(cubeGroup);

    const cubeGeo = new THREE.BoxGeometry(1.7, 1.7, 1.7);
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
    cubeMesh.rotation.set(0.58, 0.76, -0.28); // Pure isometric angle
    cubeGroup.add(cubeMesh);

    // Cube contact shadow
    const cubeShadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const cubeShadow = new THREE.Mesh(cubeShadowGeo, shadowMaterial.clone());
    cubeShadow.rotation.x = -Math.PI / 2;
    cubeShadow.position.y = -1.4;
    cubeGroup.add(cubeShadow);

    // --- TORUS SETUP ---
    const torusGroup = new THREE.Group();
    torusGroup.position.set(1.8, 0.0, 0);
    rootGroup.add(torusGroup);

    // Balanced 18x36 segments for uniform, beautiful faceted geometry
    const torusGeo = new THREE.TorusGeometry(1.15, 0.44, 18, 36);
    const torusMesh = new THREE.Mesh(torusGeo, torusMaterial);
    torusMesh.rotation.set(1.12, 0.35, 0.25);
    torusGroup.add(torusMesh);

    // Torus contact shadow
    const torusShadowGeo = new THREE.PlaneGeometry(3.4, 3.4);
    const torusShadow = new THREE.Mesh(torusShadowGeo, shadowMaterial.clone());
    torusShadow.rotation.x = -Math.PI / 2;
    torusShadow.position.y = -1.4;
    torusGroup.add(torusShadow);

    // 5. Interactive Raycaster & Mouse Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const raycaster = new THREE.Raycaster();
    const mouseCoords = new THREE.Vector2(-999, -999);
    let isHoveringCube = false;
    let isHoveringTorus = false;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
      mouseCoords.x = x;
      mouseCoords.y = y;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouseCoords.x = -999;
      mouseCoords.y = -999;
      isHoveringCube = false;
      isHoveringTorus = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // 6. 60 FPS Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Raycasting for interactive hover
      raycaster.setFromCamera(mouseCoords, camera);
      const intersects = raycaster.intersectObjects([cubeMesh, torusMesh]);
      if (intersects.length > 0) {
        if (intersects[0].object === cubeMesh) {
          isHoveringCube = true;
          isHoveringTorus = false;
        } else if (intersects[0].object === torusMesh) {
          isHoveringTorus = true;
          isHoveringCube = false;
        }
      } else {
        isHoveringCube = false;
        isHoveringTorus = false;
      }

      // --- CUBE ANIMATION ---
      const cubeHoverY = isHoveringCube ? 0.25 : 0;
      const cubeFloat = Math.sin(elapsedTime * 1.5) * 0.07 + cubeHoverY;
      cubeMesh.position.y += (cubeFloat - cubeMesh.position.y) * 0.08;
      
      // Dynamic tilt responding to cursor
      cubeMesh.rotation.y = 0.76 + Math.sin(elapsedTime * 0.4) * 0.1 + mouse.x * 0.42;
      cubeMesh.rotation.x = 0.58 + Math.cos(elapsedTime * 0.3) * 0.06 - mouse.y * 0.32;

      // Contact shadow dynamics
      const cubeShadowScale = 1.0 - cubeMesh.position.y * 0.18;
      cubeShadow.scale.set(cubeShadowScale, cubeShadowScale, 1);
      cubeShadow.material.opacity = 0.85 - cubeMesh.position.y * 0.25;

      // --- TORUS ANIMATION ---
      const torusHoverY = isHoveringTorus ? 0.25 : 0;
      const torusFloat = Math.cos(elapsedTime * 1.4) * 0.08 + torusHoverY;
      torusMesh.position.y += (torusFloat - torusMesh.position.y) * 0.08;

      // Gentle continuous rotation & mouse tilt
      torusMesh.rotation.z += 0.003;
      torusMesh.rotation.x = 1.12 + Math.sin(elapsedTime * 0.5) * 0.08 - mouse.y * 0.35;
      torusMesh.rotation.y = 0.35 + Math.cos(elapsedTime * 0.4) * 0.1 + mouse.x * 0.42;

      // Contact shadow dynamics
      const torusShadowScale = 1.0 - torusMesh.position.y * 0.18;
      torusShadow.scale.set(torusShadowScale, torusShadowScale, 1);
      torusShadow.material.opacity = 0.85 - torusMesh.position.y * 0.25;

      // Global subtle parallax
      rootGroup.position.x = mouse.x * 0.22;
      rootGroup.position.y = mouse.y * 0.14;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resizing
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 450;
      const newHeight = container.clientHeight || 280;
      camera.aspect = newWidth / newHeight;

      if (newWidth < 460) {
        camera.position.z = 11.2;
        cubeGroup.position.x = -1.35;
        torusGroup.position.x = 1.35;
      } else {
        camera.position.z = 9.8;
        cubeGroup.position.x = -1.8;
        torusGroup.position.x = 1.8;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 8. Disposal & Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);

      cubeGeo.dispose();
      cubeMaterial.dispose();
      cubeShadowGeo.dispose();

      torusGeo.dispose();
      torusMaterial.dispose();
      torusShadowGeo.dispose();

      shadowTexture.dispose();
      shadowMaterial.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      title="Interactive 3D Objects — Hover or move cursor to interact"
    />
  );
}
