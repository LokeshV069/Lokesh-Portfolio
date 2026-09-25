import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function XRSpatialVisual() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Monochromatic spatial HUD geometry
    // Central faceted crystal/faceted spatial anchor
    const mainGeo = new THREE.DodecahedronGeometry(2.2, 1);
    const mainMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.15,
      metalness: 0.95,
      wireframe: false
    });
    const mainMesh = new THREE.Mesh(mainGeo, mainMat);
    scene.add(mainMesh);

    // Outer wireframe shell
    const shellGeo = new THREE.IcosahedronGeometry(2.9, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    scene.add(shellMesh);

    // Orbital 3D tracking rings
    const ring1Geo = new THREE.TorusGeometry(3.6, 0.02, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 4;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(4.1, 0.02, 16, 80);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 1.2);
    dirLight2.position.set(-6, -6, 2);
    scene.add(dirLight2);

    // Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mainMesh.rotation.y += 0.005;
      mainMesh.rotation.x += 0.003;

      shellMesh.rotation.y -= 0.003;
      shellMesh.rotation.z += 0.004;

      ring1.rotation.z += 0.002;
      ring2.rotation.x += 0.0025;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      mainGeo.dispose();
      mainMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] md:h-[500px] pointer-events-none relative z-10"
      aria-hidden="true"
    />
  );
}
