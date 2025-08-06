import React, { useState } from "react";
import { FaHome } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import MainPhotos from './mainPhotos.json';

const GalleryPage = () => {
	const navigate = useNavigate();
	const navToHome = () => navigate('/home');
	const [mainImages] = useState(MainPhotos);

	return (
		<section className="min-h-screen w-full bg-gradient-to-r from-purple-900 via-black to-purple-900 pt-10 px-4 sm:px-6 md:px-10 py-6 ">
			<div className="absolute top-6 left-6 flex items-center text-white text-lg font-semibold z-50">
				<FaHome onClick={navToHome} className="text-3xl hover:text-purple-300 cursor-pointer transition" />
				<BsArrowRight className="mx-2 text-xl" />
				<span className="text-xl">Sponsors</span>
			</div>
			<h2 className="text-4xl sm:text-5xl font-bold text-white text-center mt-7 mb-10" style={{ fontFamily: '"UnifrakturCook", cursive' }}>
				Discover the Sponsors
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{mainImages.map((image, index) => (
				<div key={index} className="relative cards-scroll group rounded-xl shadow-lg bg-[#0b0b14] transition-all hover:shadow-purple-500/30">
					<img src={image.src} alt={`Sponsor ${index + 1}`} loading="lazy" className="w-full h-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-105"/>
				</div>
			))}
			</div>
		</section>
	);
};

export default GalleryPage;
