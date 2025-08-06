import React from "react";

const Footer = () => {
	return (
		<footer className="bg-[#0b0b14] text-white py-10 px-6 w-screen ">
			<div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
				<div className="h-px w-full bg-gradient-to-r from-transparent via-purple-700 to-transparent my-4" />
				<div className="text-center text-gray-400 text-sm">
					<p>
						Copyright © 2025{" "}
						<a href="https://auro-eg.com" className="text-purple-400 hover:text-purple-300 transition-colors font-medium" target="_blank" rel="noopener noreferrer">
							AURO<sup>eg</sup>
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
