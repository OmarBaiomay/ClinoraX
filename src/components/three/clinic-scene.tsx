"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

export function ClinicScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !mountRef.current) return;

    const mount = mountRef.current;
    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0d9488"),
      metalness: 0.35,
      roughness: 0.35,
      transparent: true,
      opacity: 0.85,
    });

    const geometries = [
      new THREE.IcosahedronGeometry(0.55, 0),
      new THREE.TorusGeometry(0.45, 0.12, 16, 48),
      new THREE.OctahedronGeometry(0.5),
    ];

    const meshes = geometries.map((geo, i) => {
      const mesh = new THREE.Mesh(geo, material.clone());
      const angle = (i / geometries.length) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 1.6, Math.sin(angle) * 0.9, 0);
      group.add(mesh);
      return mesh;
    });

    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(3, 4, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 0.008;
      group.rotation.y = frame * 0.35;
      group.rotation.x = Math.sin(frame * 0.4) * 0.15;
      meshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.004 + i * 0.001;
        mesh.rotation.y += 0.006;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geometries.forEach((g) => g.dispose());
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 40%, var(--hero-glow), transparent 60%)",
        }}
      />
    );
  }

  return <div ref={mountRef} className={className} aria-hidden />;
}
