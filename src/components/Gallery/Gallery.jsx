import React, { useEffect, useState } from 'react';
import GalleryItems from './imagesHTML/GalleryItems.jsx';
import MainPhotos from './mainPhotos.json';
import SecondPhotos from './secondPhotos.json';
import PreviewItems from './imagesHTML/PreviewItems.jsx';

const Gallery = () => {
  const [mainImages, setMainImages] = useState(MainPhotos);
  const [previewImages, setPreviewImages] = useState([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [isOpenPreview, setIsOpenPreview] = useState(true);
  
  // handle images
  const handleOpenPreview = (id) => {
    const mainImage = MainPhotos.find(photo => photo.id === id);
    const newSecondImages = SecondPhotos.filter(photo => photo.foreignId === id);
    const combinedPreviewImages = [mainImage, ...newSecondImages];
    
    setPreviewImages(combinedPreviewImages);
    setCurrentPreviewIndex(0);
    setIsOpenPreview(false);
  };
  
  // return to normal
  const handleClosePreview = () => {
    setPreviewImages([]);
    setIsOpenPreview(true);
  };

  const handlePrevImage = () => {
    setCurrentPreviewIndex((prev) => prev > 0 ? prev - 1 : previewImages.length - 1);
  };
  
  const handleNextImage = () => {
    setCurrentPreviewIndex((prev) => prev < previewImages.length - 1 ? prev + 1 : 0);
  };

  return (
    <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 md:p-10 sm:p-7 p-5 pt-12">
      {isOpenPreview && mainImages.map((image, index) => (
        <GalleryItems
          key={index}
          imageSrc={image.src}
          imageAlt={image.alt}
          imageDesc={image.desc}
          handleOpenPreview={() => handleOpenPreview(image.id)}
        />
      ))}

      {!isOpenPreview && previewImages.length > 0 && (
        <PreviewItems
          imageSrc={previewImages[currentPreviewIndex]?.src}
          handleClosePreview={handleClosePreview}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          currentIndex={currentPreviewIndex + 1}
          totalImages={previewImages.length}
        />
      )}
    </div>
  );
};

export default Gallery;