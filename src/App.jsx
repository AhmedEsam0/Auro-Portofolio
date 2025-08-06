import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Viewer from "./components/Home/Viewer.jsx";
import Loading from "./components/Loaders/Loading.jsx";
import GalleryPage from "./components/Gallery/GalleryPage.jsx";
import ThreeDVideos from "./components/Videos/VideosSection.jsx";
import SponsorPage from "./components/Sponsors/SponsorPage.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-1000 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: isLoading ? "100" : "-1" }}
      >
        <Loading />
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        {/* جميع الصفحات تستخدم نفس التصميم */}
        {["/home", "/design", "/videos", "/sponsors"].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <main className="overflow-x-hidden">
                {path === "/home" && <Viewer />}
                {path === "/design" && <GalleryPage />}
                {path === "/videos" && <ThreeDVideos />}
                {path === "/sponsors" && <SponsorPage />}
                <Footer />
              </main>
            }
          />
        ))}

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;
