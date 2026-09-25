import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ProjectsCelestialScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all celestial objects
    const celestialGroup = new THREE.Group();
    scene.add(celestialGroup);

    // 1. Central Geodesic Wireframe Sphere
    const geo = new THREE.IcosahedronGeometry(2.8, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const mainSphere = new THREE.Mesh(geo, wireframeMat);
    celestialGroup.add(mainSphere);

    // Points at vertices
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.7
    });
    const spherePoints = new THREE.Points(geo, pointsMat);
    celestialGroup.add(spherePoints);

    // 2. Orbital Rings
    const createOrbitRing = (radiusX, radiusY, rotX, rotY) => {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(120);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.22
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = createOrbitRing(4.3, 3.8, Math.PI / 3, Math.PI / 6);
    const ring2 = createOrbitRing(4.8, 4.2, -Math.PI / 4, Math.PI / 4);
    celestialGroup.add(ring1);
    celestialGroup.add(ring2);

    // 3. Orbiting Moons / Spheres
    const moonGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      roughness: 0.3,
      metalness: 0.8
    });

    const moon1 = new THREE.Mesh(moonGeo, moonMat);
    const moon2 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 20), moonMat);
    const moon3 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), moonMat);
    celestialGroup.add(moon1);
    celestialGroup.add(moon2);
    celestialGroup.add(moon3);

    // Light for moons
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 8);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate sphere slowly
      mainSphere.rotation.y = elapsedTime * 0.12;
      mainSphere.rotation.x = elapsedTime * 0.05;
      spherePoints.rotation.y = mainSphere.rotation.y;
      spherePoints.rotation.x = mainSphere.rotation.x;

      // Orbit moons
      moon1.position.x = Math.cos(elapsedTime * 0.4) * 4.3;
      moon1.position.y = Math.sin(elapsedTime * 0.4) * 2.2;
      moon1.position.z = Math.sin(elapsedTime * 0.4) * 3.5;

      moon2.position.x = Math.cos(elapsedTime * -0.3 + 2) * 4.6;
      moon2.position.y = Math.sin(elapsedTime * -0.3 + 2) * 2.8;
      moon2.position.z = Math.cos(elapsedTime * -0.3 + 2) * 3.0;

      moon3.position.x = Math.cos(elapsedTime * 0.5 + 4) * 3.6;
      moon3.position.y = Math.sin(elapsedTime * 0.5 + 4) * 3.2;
      moon3.position.z = Math.sin(elapsedTime * 0.5 + 4) * 2.0;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
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

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      wireframeMat.dispose();
      pointsMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full pointer-events-none" aria-hidden="true" />;
}
