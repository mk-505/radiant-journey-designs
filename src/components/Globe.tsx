import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);

    // Create base sphere (ocean)
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#4338ca'), // Deep blue
      shininess: 25,
      opacity: 0.9,
      transparent: true,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Create atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#a78bfa'), // Purple
      shininess: 25,
      opacity: 0.1,
      transparent: true,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Create random continents
    const continentsGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const continentsMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#7c3aed'), // Brighter purple
      shininess: 10,
      opacity: 0.8,
      transparent: true,
    });
    const continents = new THREE.Mesh(continentsGeometry, continentsMaterial);
    
    // Create random "continent" patches
    for (let i = 0; i < continentsGeometry.attributes.position.count; i++) {
      if (Math.random() > 0.85) {
        const positions = continentsGeometry.attributes.position.array;
        positions[i * 3] *= 1.02;
        positions[i * 3 + 1] *= 1.02;
        positions[i * 3 + 2] *= 1.02;
      }
    }
    continentsGeometry.attributes.position.needsUpdate = true;
    scene.add(continents);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Add point lights for glow effect
    const pointLight1 = new THREE.PointLight(0xa78bfa, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4338ca, 1, 10);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);

    camera.position.z = 2.5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      atmosphere.rotation.y += 0.005;
      continents.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-[300px] h-[300px] mx-auto mt-12" />;
}