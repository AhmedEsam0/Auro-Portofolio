import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

function Road() {
  const lineRef = useRef();
  const [roadLength, setRoadLength] = useState(0);
  const linePositionsRef = useRef([]); // استخدام useRef بدلاً من useState

  useEffect(() => {
    const updateRoad = () => {
      const len = window.innerHeight * 1.5;
      setRoadLength(len);

      const count = Math.ceil(len / 10);
      const positions = Array.from(
        { length: count },
        (_, i) => i * 12 - len / 2
      );
      linePositionsRef.current = positions;
    };

    updateRoad();
    window.addEventListener("resize", updateRoad);

    return () => window.removeEventListener("resize", updateRoad);
  }, []);

  useFrame(() => {
    if (!lineRef.current || linePositionsRef.current.length === 0) return;

    const updatedPositions = linePositionsRef.current.map((pos) => {
      let newPos = pos - 0.2;
      if (newPos < -roadLength / 2) {
        newPos += roadLength;
      }
      return newPos;
    });

    linePositionsRef.current = updatedPositions;

    // تحديث مواقع الخطوط مباشرة
    lineRef.current.children.forEach((child, index) => {
      child.position.z = updatedPositions[index];
    });
  });

  return (
    <>
      {/* Center reflective road */}
      <mesh
        position={[0, -15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[15, roadLength]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.15}
          emissive="#111111"
          emissiveIntensity={0.1}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Right neon side strip */}
      <mesh
        position={[-7.8, -14.9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[0.8, roadLength]} />
        <meshStandardMaterial
          color="#861043"
          emissive="#861043"
          emissiveIntensity={0.8}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Left neon side strip */}
      <mesh
        position={[7.8, -14.9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[0.8, roadLength]} />
        <meshStandardMaterial
          color="#861043"
          emissive="#861043"
          emissiveIntensity={0.8}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Realistic dashed middle lines */}
      <group ref={lineRef}>
        {linePositionsRef.current.map((position, index) => (
          <mesh
            key={index}
            position={[0, -14.96, position]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.15, 0.02, 1.5]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default Road;
