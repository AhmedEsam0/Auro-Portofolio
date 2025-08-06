import React, { useState, useRef, useEffect } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import { TbMaximize, TbMaximizeOff } from "react-icons/tb";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

const TopIcons = ({ isFullscreen, setIsFullscreen }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // إعداد الصوت
    audio.volume = 0.3;
    
    // محاولة تشغيل الصوت عند التفاعل مع المستخدم
    const handleUserInteraction = () => {
      if (isMuted) return;
      
      audio.play().catch(error => {
        console.warn("Audio play failed:", error);
      });
      
      // إزالة المستمع بعد التفاعل الأول
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isMuted]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (audioRef.current) {
      if (newMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.warn("Audio play blocked:", error);
        });
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="absolute top-4 right-7 flex gap-4 z-50 text-white">
      <audio ref={audioRef} loop src="/assets/audio/relax.wav" />
      
      <button 
        onClick={toggleMute}
        className={`p-2 ${!isFullscreen ? "opacity-100 z-2" : "opacity-0 z-[-1]"} rounded-full bg-black/40 hover:bg-[var(--main-color)] duration-300 transition`}
      >
        {isMuted ? <MdMusicOff size={20} /> : <MdMusicNote size={20} />}
      </button>

      <button 
        onClick={handleRefresh} 
        className={`p-2 ${!isFullscreen ? "opacity-100 z-2" : "opacity-0 z-[-1]"} rounded-full bg-black/40 hover:bg-[var(--main-color)] hover:rotate-180 duration-300 transition`}
      >
        <FaSyncAlt size={20} />
      </button>

      <button 
        onClick={toggleFullscreen} 
        className="p-2 rounded-full bg-black/40 hover:bg-[var(--main-color)] transition"
      >
        {isFullscreen ? <TbMaximizeOff size={20} /> : <TbMaximize size={20} />}
      </button>
    </div>
  );
};

export default TopIcons;