import React, { useState } from 'react';
import MainPhotos from './mainPhotos.json';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';


const HomeCardHolder = () => {
  const [mainImages] = useState(MainPhotos);

  const navigate = useNavigate();

  const handleURL = (e, param) => {
    e.stopPropagation();
    e.preventDefault();
    const filterParam = param.toLowerCase();
    console.log(param);
    navigate(`/${filterParam}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  
  return (
    <section id="galleryId" className="w-full min-h-screen px-6 py-16 bg-transparent flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl text-white font-bold" style={{ fontFamily: '"UnifrakturCook", cursive' }}>
            Handpicked Wonders
          </h2>
          <p className="text-purple-400 mt-2 text-lg">
            A visual taste of something extraordinary
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 group/card">
  {mainImages.map((image, index) => (
    <div key={index} className="relative">
      <div
        onClick={(e) => handleURL(e, image.title)}
        className={`peer duration-500 transform transition-transform hover:scale-[1.06] rounded-2xl overflow-hidden shadow-xl shadow-[#3b82f655] border border-[#ffffff1a]
          bg-gradient-to-b from-[#9b2c6880] via-[#4c056380] to-[#3b82f650]
          backdrop-blur-md hover:shadow-[#3b82f6aa] hover:brightness-110
          ${index === 1 ? 'md:translate-y-[-20px]' : ''}`}
      >
        <div className="relative group bg-[#1a1a27] overflow-hidden">
          <img
            className="h-[400px] w-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
            src={image.src}
            alt={image.alt}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000aa] to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>
        <div className="bg-[#0f0f1b99] p-6 rounded-b-2xl flex flex-col justify-between group-hover:bg-[#1e1e2ecc] transition-colors duration-300">
          <h3 className="text-white text-2xl font-semibold mb-4 group-hover:text-[#b65df0] transition-colors duration-300">
            {image.title}
          </h3>
          <p className="text-white text-lg font-medium mb-4 max-w-[85%] group-hover:text-[#dba8ff] transition-colors duration-300">
            {image.desc}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-[#dba8ff] text-2xl font-semibold transform transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-4">
              <FaArrowRightLong />
            </span>
          </div>
        </div>
      </div>

      {/* Blur siblings when any peer is hovered */}
      <div className="absolute inset-0 transition-all duration-300 group-hover/card:blur-[10px] peer-hover:blur-0 pointer-events-none" />
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default HomeCardHolder;
