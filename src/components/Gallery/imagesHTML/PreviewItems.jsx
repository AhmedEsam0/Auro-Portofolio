import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaLink, FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PreviewItems = ({ imageSrc, handleClosePreview, onPrev, onNext,currentIndex,totalImages}) => {
    return (
        <>
        <div className="fixed inset-0 bg-radial-gradient z-50 flex items-center justify-center animate-fadeIn">
            <div className="relative z-20 max-w-[90%] max-h-[90%]">
                <img src={imageSrc} alt={"image"} className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl animate-scaleIn" />
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-30">
                <button onClick={onPrev} className="p-3 rounded-full bg-white/20 text-white transition-all duration-200 hover:bg-white/40 active:scale-90 shadow-md hover:shadow-lg">
                    <FaChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={onNext} className="p-3 rounded-full bg-white/20 text-white transition-all duration-200 hover:bg-white/40 active:scale-90 shadow-md hover:shadow-lg">
                    <FaChevronRight className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-8 left-8 flex space-x-3 z-30">
                {/* <a href={imageSrc} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white" onClick={(e) => e.stopPropagation()}>
                    <FaLink className="w-5 h-5" />
                </a> */}
                <button onClick={handleClosePreview} className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white flex items-center gap-1">
                    <IoMdClose className="w-5 h-5" />
                    <span className="text-sm font-medium">{currentIndex}/{totalImages}</span>
                </button>
            </div>
        </div>
        </>
    );
};

export default PreviewItems;