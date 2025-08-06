import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import ArgonModel from "./ArgonModel.jsx"; // استيراد المكون بدلاً من ملف GLB
import Road from "./InversedRoad.jsx";
import RotatingStars from "./RotatingStars.jsx";
import InversedRoad from "./Road.jsx"; // تصحيح اسم المكون
import HomeText from "./HomeText.jsx";
import TopIcons from "./TopIcons.jsx";
import HomeCardHolder from '../HomeNavigation/HomeCardHolder.jsx';

export default function Viewer() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // إعدادات الكاميرا
  const camProps = { 
    position: [isSmallScreen ? -60 : -120, 40, -240], 
    fov: 30 
  };

  return (
    <section className="h-[200vh] relative w-screen overflow-auto bg-radial-gradient-dark">
      {/* القسم العلوي */}
      <div className="h-screen relative">
        <Canvas 
          shadows 
          camera={camProps} 
          gl={{ antialias: true }} 
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <Suspense fallback={null}>
            <RotatingStars count={2500} />
            <Float 
              speed={2} 
              rotationIntensity={0} 
              floatIntensity={0.5} 
              position={isSmallScreen ? [0, 0, 0] : [-20, 0, 0]}
            >
              <ArgonModel zPosition={-20} />
              <Road />
              <InversedRoad />
            </Float>
            <OrbitControls 
              enableZoom={isFullscreen} 
              enablePan={isFullscreen}
              enableRotate={isFullscreen}
              minDistance={5} 
              maxDistance={200} 
            />
            <Environment preset="forest" />
          </Suspense>
        </Canvas>
        
        <div className={`absolute ${!isFullscreen ? "opacity-100 z-10" : "opacity-0 z-[-1]"} duration-200 top-0 left-0 w-full h-full`}>
          <HomeText />
        </div>
      </div>
      
      {/* الأيقونات العلوية */}
      <TopIcons isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />
      
      {/* القسم السفلي */}
      <div className="h-screen relative">
        <Canvas 
          shadows 
          camera={camProps} 
          gl={{ antialias: true }} 
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <Suspense fallback={null}>
            <RotatingStars count={2500} />
          </Suspense>
        </Canvas>
        
        <div className={`${!isFullscreen ? "opacity-100 z-20" : "opacity-0 z-[-1]"} duration-200 top-0 left-0 w-full h-full absolute`}>
          <HomeCardHolder />
        </div>
      </div>
    </section>
  );
}