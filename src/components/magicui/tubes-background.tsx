"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "../../lib/utils";

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export const TubesBackground: React.FC<TubesBackgroundProps> = ({
  children,
  className,
  enableClickInteraction = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const tubesRef = useRef<any[]>([]);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef(new THREE.Vector2(0, 0));
  const [isInitialized, setIsInitialized] = useState(false);

  const colors = [0x7000ff, 0x9d00ff, 0x4a00e0, 0x8e2de2, 0xff00ff];

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x7000ff, 2, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create Tubes
    const createTube = (index: number) => {
      const points = [];
      const segments = 8;
      const radius = 4 + Math.random() * 2;

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
            Math.sin(angle) * radius + (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 10
          )
        );
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 128, 0.04, 12, false);

      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 4,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.8,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(mesh);

      return {
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatOffset: Math.random() * Math.PI * 2,
      };
    };

    const count = 12;
    const tubes = Array.from({ length: count }, (_, i) => createTube(i));
    tubesRef.current = tubes;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleClick = () => {
      if (!enableClickInteraction) return;
      tubes.forEach((tube) => {
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        tube.mesh.material.color.setHex(newColor);
        tube.mesh.material.emissive.setHex(newColor);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      const time = performance.now() * 0.001;

      tubes.forEach((tube, i) => {
        tube.mesh.rotation.x += tube.rotSpeed.x;
        tube.mesh.rotation.y += tube.rotSpeed.y;
        tube.mesh.rotation.z += tube.rotSpeed.z;

        const influence = 1.5 + i * 0.2;
        tube.mesh.position.x = Math.cos(time * 0.8 + tube.floatOffset) * 0.5 + mouseRef.current.x * influence;
        tube.mesh.position.y = Math.sin(time + tube.floatOffset) * 0.5 + mouseRef.current.y * influence;
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsInitialized(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      tubes.forEach((tube) => {
        tube.mesh.geometry.dispose();
        tube.mesh.material.dispose();
      });
    };
  }, [enableClickInteraction]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden bg-[#050505]", className)}>
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
