import React, { useState, useEffect } from "react";

export default function InversedRoad() {
  const [roadLength, setRoadLength] = useState(100);

  useEffect(() => {
    const updateSize = () => {
      setRoadLength(window.innerHeight * 1.5);
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      {/* Center reflective road */}
      <mesh position={[0, -15.1, 0]} rotation={[-Math.PI / 2, Math.PI, 0]} receiveShadow>
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

      {/* Right side road strip */}
      <mesh position={[-7.8, -15.14, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.8, roadLength]} />
        <meshStandardMaterial color="#7a3c91" roughness={0.5} />
      </mesh>

      {/* Left side road strip */}
      <mesh position={[7.8, -15.14, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.8, roadLength]} />
        <meshStandardMaterial color="#7a3c91" roughness={0.5} />
      </mesh>
    </>
  );
}