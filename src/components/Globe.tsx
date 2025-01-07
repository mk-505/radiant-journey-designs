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
    const geometry = new THREE.SphereGeometry(1, 128, 128);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#4338ca'),
      shininess: 25,
      opacity: 0.9,
      transparent: true,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Create atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#a78bfa'),
      shininess: 25,
      opacity: 0.1,
      transparent: true,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Create detailed landscape
    const landscapeGeometry = new THREE.SphereGeometry(1.01, 128, 128);
    const landscapeMaterial = new THREE.MeshPhongMaterial({
      vertexColors: true,
      shininess: 10,
    });

    // Generate terrain and colors
    const positions = landscapeGeometry.attributes.position.array;
    const colors = new Float32Array(positions.length);
    const color = new THREE.Color();

    for (let i = 0; i < positions.length; i += 3) {
      // Generate noise-based elevation
      const noise = Math.random();
      const elevation = noise > 0.6 ? (noise - 0.6) * 0.1 : 0;
      
      // Apply elevation to vertex
      const scale = 1.0 + elevation;
      positions[i] *= scale;
      positions[i + 1] *= scale;
      positions[i + 2] *= scale;

      // Set color based on elevation
      if (elevation > 0.02) {
        // Mountain peaks
        color.setHSL(0.75, 0.6, 0.4 + elevation * 2); // Purple mountains
      } else if (elevation > 0.01) {
        // Hills
        color.setHSL(0.7, 0.5, 0.4); // Darker purple hills
      } else if (elevation > 0) {
        // Lowlands
        color.setHSL(0.65, 0.4, 0.35); // Even darker purple lowlands
      } else {
        // Water/valleys
        color.setHSL(0.6, 0.7, 0.3); // Deep purple valleys
      }

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    landscapeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    landscapeGeometry.attributes.position.needsUpdate = true;

    const landscape = new THREE.Mesh(landscapeGeometry, landscapeMaterial);
    scene.add(landscape);

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
      landscape.rotation.y += 0.005;
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