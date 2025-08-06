import React from "react";
import Gallery from "./Gallery.jsx";

import { FaHome } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';



const GalleryPage = () => {
	const navigate = useNavigate();
	const navToHome = () => navigate('/home');

	return (
		<section className="relative min-h-screen w-screen bg-gradient-to-r from-purple-900 via-[#000] to-purple-900 pt-10">
			<div className="absolute top-26 left-6 flex items-center text-white text-lg font-semibold z-50">
				<FaHome onClick={navToHome} className="text-3xl hover:text-purple-300 cursor-pointer transition" />
				<BsArrowRight className="mx-2 text-xl" />
				<span className="text-xl">Design</span>
			</div>
			<h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-10" style={{ fontFamily: '"UnifrakturCook", cursive' }}>
				Discover the Design
			</h2>
			<Gallery />
		</section>
	);
};

export default GalleryPage;
