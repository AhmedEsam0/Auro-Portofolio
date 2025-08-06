import React from "react";
import { FaLink, FaDownload } from "react-icons/fa";

function GalleryItem ({ imageSrc, imageDesc, imageAlt, handleOpenPreview }) {
	return (
		<div className="cards-scroll relative group overflow-hidden sm:ml-[-1rem] rounded-xl shadow-md bg-[#0b0b14] cursor-pointer" onClick={handleOpenPreview}>
			<img className="h-auto w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105" src={imageSrc} alt={imageAlt} loading="lazy"/>
			<div className="absolute inset-0 bg-gradient-to-t from-[#602677] to-transparent group-hover:opacity-100 opacity-100 sm:opacity-0 transition-opacity duration-300 flex flex-col justify-between p-4">
				<div className="flex justify-end space-x-3">
					<a href={imageSrc} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full shadow hover:bg-purple-500 hover:text-white transition duration-300">
						<FaLink size={18} />
					</a>
				</div>
				<div className="mt-4 text-white font-medium leading-snug">
					<p className="text-sm sm:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-500 delay-100">
						{imageDesc}
					</p>
				</div>
			</div>
		</div>
	);
};
export default GalleryItem;