import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function ArgonModel({ zPosition }) {
  // تصحيح المسار لاستخدام اسم الملف الصحيح
  const gltf = useLoader(GLTFLoader, "/assets/argon/Argon1.glb");
  const modelRef = useRef();
  const mixerRef = useRef();
  
  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
  });
  
  useEffect(() => {
    if (!gltf.scene) return;
    
    modelRef.current = gltf.scene;
    
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          child.material.metalness = 1.0;
          child.material.roughness = 0.1;
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0;
        }
      }
    });
    
    if (gltf.animations?.length) {
      mixerRef.current = new THREE.AnimationMixer(gltf.scene);
      const action = mixerRef.current.clipAction(gltf.animations[0]);
      action.play();
    }
    
    // تنظيف الذاكرة عند إلغاء التحميل
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current.uncacheRoot(gltf.scene);
      }
    };
  }, [gltf]);
  
  return (
    <Float 
      speed={2} 
      rotationIntensity={0} 
      floatIntensity={0.5} 
      position={[0, -14.74, zPosition]}
    >
      <primitive ref={modelRef} object={gltf.scene} scale={0.05} />
    </Float>
  );
}