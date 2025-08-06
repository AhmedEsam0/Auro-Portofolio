import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RotatingStars({ count = 1000 }) {
  const pointsRef = useRef();
  
  // إنشاء نسيج دائري مرة واحدة فقط
  const texture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const center = size / 2;

    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  // إعداد النجوم
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;

      velocities[i] = (Math.random() - 0.5) * 0.05;
      velocities[i + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i + 2] = (Math.random() - 0.5) * 0.05;
    }
    
    return { positions, velocities };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.attributes.position;
    const positionArray = positionAttribute.array;

    for (let i = 0; i < count * 3; i++) {
      positionArray[i] += velocities[i];
      
      // إعادة تعيين المواقع عند تجاوز الحدود
      if (positionArray[i] > 100) positionArray[i] = -100;
      if (positionArray[i] < -100) positionArray[i] = 100;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="white"
        size={0.7}
        sizeAttenuation
        transparent
        alphaTest={0.5}
      />
    </points>
  );
}