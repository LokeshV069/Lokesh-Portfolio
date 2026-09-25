import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Creates a high-fidelity soft radial contact shadow texture
 */
function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.42)');
  gradient.addColorStop(0.25, 'rgba(0, 0, 0, 0.28)');
  gradient.addColorStop(0.55, 'rgba(0, 0, 0, 0.10)');
  gradient.addColorStop(0.85, 'rgba(0, 0, 0, 0.02)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function AboutObjectsScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 260;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    
    // Perspective camera with isometric-like FOV
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 9.5);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (tuned for architectural matte black shapes on white background)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key directional light from upper-left
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(-6, 10, 7);
    scene.add(keyLight);

    // Rim / fill light from right
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(7, -2, 5);
    scene.add(fillLight);

    // Soft top fill
    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 8, 2);
    scene.add(topLight);

    // 3. Materials
    const matteBlackCubeMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f22,
      roughness: 0.28,
      metalness: 0.15,
      flatShading: false,
    });

    const matteBlackTorusMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c1f,
      roughness: 0.32,
      metalness: 0.2,
      flatShading: true, // gives subtle faceted rings matching the reference image!
    });

    // Shadow plane material
    const shadowTexture = createContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    // 4. Object Groups
    const group = new THREE.Group();
    scene.add(group);

    // --- CUBE SETUP ---
    const cubeGroup = new THREE.Group();
    cubeGroup.position.set(-1.75, 0.05, 0);
    group.add(cubeGroup);

    // Isometric Cube Geometry
    const cubeGeo = new THREE.BoxGeometry(1.65, 1.65, 1.65);
    const cubeMesh = new THREE.Mesh(cubeGeo, matteBlackCubeMat);
    // Classic isometric angle
    cubeMesh.rotation.set(0.61, 0.78, -0.3);
    cubeGroup.add(cubeMesh);

    // Cube contact shadow
    const cubeShadowGeo = new THREE.PlaneGeometry(3.0, 3.0);
    const cubeShadow = new THREE.Mesh(cubeShadowGeo, shadowMat.clone());
    cubeShadow.rotation.x = -Math.PI / 2;
    cubeShadow.position.y = -1.35;
    cubeGroup.add(cubeShadow);

    // --- TORUS SETUP ---
    const torusGroup = new THREE.Group();
    torusGroup.position.set(1.75, 0.0, 0);
    group.add(torusGroup);

    // Torus Geometry with subtle polygon steps
    const torusGeo = new THREE.TorusGeometry(1.15, 0.44, 22, 44);
    const torusMesh = new THREE.Mesh(torusGeo, matteBlackTorusMat);
    torusMesh.rotation.set(1.15, 0.35, 0.25);
    torusGroup.add(torusMesh);

    // Torus contact shadow
    const torusShadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const torusShadow = new THREE.Mesh(torusShadowGeo, shadowMat.clone());
    torusShadow.rotation.x = -Math.PI / 2;
    torusShadow.position.y = -1.35;
    torusGroup.add(torusShadow);

    // 5. Interactive Mouse Tracking & Raycasting
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

    // 6. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Raycasting for interactive hover effects
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

      // Cube gentle harmonic floating + mouse response
      const cubeHoverY = isHoveringCube ? 0.22 : 0;
      const cubeFloat = Math.sin(elapsedTime * 1.4) * 0.08 + cubeHoverY;
      cubeMesh.position.y += (cubeFloat - cubeMesh.position.y) * 0.08;
      
      // Cube rotation with mouse influence
      cubeMesh.rotation.y = 0.78 + Math.sin(elapsedTime * 0.5) * 0.12 + mouse.x * 0.45;
      cubeMesh.rotation.x = 0.61 + Math.cos(elapsedTime * 0.4) * 0.08 - mouse.y * 0.35;

      // Dynamic shadow reacting to cube height
      const cubeShadowScale = 1.0 - cubeMesh.position.y * 0.2;
      cubeShadow.scale.set(cubeShadowScale, cubeShadowScale, 1);
      cubeShadow.material.opacity = 0.85 - cubeMesh.position.y * 0.3;

      // Torus gentle harmonic floating + mouse response
      const torusHoverY = isHoveringTorus ? 0.22 : 0;
      const torusFloat = Math.cos(elapsedTime * 1.3) * 0.09 + torusHoverY;
      torusMesh.position.y += (torusFloat - torusMesh.position.y) * 0.08;

      // Torus slow continuous rotation + mouse tilt
      torusMesh.rotation.z += 0.003;
      torusMesh.rotation.x = 1.15 + Math.sin(elapsedTime * 0.6) * 0.1 - mouse.y * 0.4;
      torusMesh.rotation.y = 0.35 + Math.cos(elapsedTime * 0.5) * 0.12 + mouse.x * 0.45;

      // Dynamic shadow reacting to torus height
      const torusShadowScale = 1.0 - torusMesh.position.y * 0.2;
      torusShadow.scale.set(torusShadowScale, torusShadowScale, 1);
      torusShadow.material.opacity = 0.85 - torusMesh.position.y * 0.3;

      // Group subtle global parallax sway
      group.position.x = mouse.x * 0.25;
      group.position.y = mouse.y * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resizing
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 400;
      const newHeight = container.clientHeight || 260;
      camera.aspect = newWidth / newHeight;

      // Responsive object spacing for narrower screens (mobile / tablet)
      if (newWidth < 460) {
        camera.position.z = 11.5;
        cubeGroup.position.x = -1.4;
        torusGroup.position.x = 1.4;
      } else {
        camera.position.z = 9.5;
        cubeGroup.position.x = -1.75;
        torusGroup.position.x = 1.75;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing check

    // 8. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);

      cubeGeo.dispose();
      matteBlackCubeMat.dispose();
      cubeShadowGeo.dispose();

      torusGeo.dispose();
      matteBlackTorusMat.dispose();
      torusShadowGeo.dispose();

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
      ref={containerRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      title="Interactive 3D Objects — Hover or move cursor to interact"
    />
  );
}
