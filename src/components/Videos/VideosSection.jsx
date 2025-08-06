import React, { useEffect, useState } from "react";
import { FaHome, FaTimes } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion"; // Fixed: Using alias
import { useInView } from "react-intersection-observer";
import ThreeDVideosJSON from "./AllVideos.json";

const LazyThumbnailCard = ({ video, index, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="relative group overflow-hidden rounded-2xl shadow-2xl bg-[#0b0b14] border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300"
    >
      {inView ? (
        <img
          src={video.poster}
          alt={`Video thumbnail ${index}`}
          className="w-full aspect-video object-cover cursor-pointer"
          onClick={() => onClick(index)}
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-video bg-gray-800 animate-pulse rounded-2xl" />
      )}
    </div>
  );
};

const ThreeDVideos = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("3D");
  const [videos, setVideos] = useState([]);
  const [expandedVideo, setExpandedVideo] = useState(null);

  useEffect(() => {
    const filteredVideos = ThreeDVideosJSON.filter(
      (vid) => vid.type === selectedType
    );
    setVideos(filteredVideos);
    setExpandedVideo(null);
  }, [selectedType]);

  const closeExpanded = () => setExpandedVideo(null);

  const currentVideo = expandedVideo !== null ? videos[expandedVideo] : null;

  return (
    <section className="relative min-h-screen w-screen bg-gradient-to-br from-purple-900/90 via-black to-purple-900/90 pt-16 pb-20">
      {/* Breadcrumb */}
      <div className="absolute top-6 left-6 flex items-center text-white text-lg font-semibold z-50">
        <FaHome
          onClick={() => navigate("/home")}
          className="text-3xl hover:text-purple-300 cursor-pointer transition transform hover:scale-110"
        />
        <BsArrowRight className="mx-3 text-xl text-purple-300" />
        <span className="text-xl hover:text-purple-300 cursor-pointer">
          Videos
        </span>
        <BsArrowRight className="mx-3 text-xl text-purple-300" />
        <span className="text-xl text-purple-300 capitalize">
          {selectedType} Videos
        </span>
      </div>

      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 mt-16 mb-12">
        <h2
          className="text-4xl sm:text-5xl font-bold text-white text-center mb-6 sm:mb-0"
          style={{ fontFamily: '"UnifrakturCook", cursive' }}
        >
          Discover the {selectedType === "3D" ? "3D Videos" : "Reels"}
        </h2>

        <div className="relative bg-[#1a1a2e] border border-purple-800 rounded-full p-1 flex text-white font-semibold shadow-lg transition-all">
          <div
            className={`absolute top-0 left-0 transition-all duration-300 ease-in-out rounded-full w-1/2 h-full ${
              selectedType === "3D"
                ? "bg-purple-600"
                : "translate-x-full bg-purple-600"
            }`}
          />
          <button
            onClick={() => setSelectedType("3D")}
            className={`relative z-10 px-4 py-2 rounded-full text-lg ${
              selectedType === "3D" ? "text-white" : "text-gray-400"
            }`}
          >
            3D
          </button>
          <button
            onClick={() => setSelectedType("reel")}
            className={`relative z-10 px-4 py-2 rounded-full text-lg ${
              selectedType === "reel" ? "text-white" : "text-gray-400"
            }`}
          >
            Reels
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="container mx-auto px-4">
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <LazyThumbnailCard
                key={i}
                video={video}
                index={i}
                onClick={setExpandedVideo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-white text-xl py-20">
            No videos found
          </div>
        )}
      </div>

      {/* Expanded Video Overlay */}
      <AnimatePresence>
        {currentVideo && (
          <Motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeExpanded}
          >
            <Motion.button
              className="absolute top-4 right-4 text-white text-2xl z-50 bg-black/50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                closeExpanded();
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close"
            >
              <FaTimes />
            </Motion.button>

            <Motion.div
              className="relative w-full sm:h-[90vh] max-w-[40%] max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 3 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={currentVideo.src}
                poster={currentVideo.poster}
                controls
                autoPlay
                className="h-full w-full object-contain rounded-xl"
              />
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ThreeDVideos;
