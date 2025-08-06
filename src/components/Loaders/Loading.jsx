import React, { useEffect, useState } from "react";

const LoadingAnimation = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + (prev < 80 ? 4 : 1); // Slow down near completion
			});
		}, 50);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center z-[1000]">
			{/* Main orb animation */}
			<div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center mb-8">
				{/* Pulsing golden aura */}
				<div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-20 animate-pulse"></div>

				{/* Rotating rings */}
				<div className="absolute inset-0 border-4 border-t-transparent border-amber-400 rounded-full animate-spin-slow"></div>
				<div className="absolute inset-3 border-4 border-b-transparent border-amber-600 rounded-full animate-spin-slow-reverse"></div>

				{/* Central orb */}
				<div className="absolute inset-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg shadow-amber-500/20">
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-2xl md:text-3xl font-bold text-white opacity-90">
							AURO
						</span>
					</div>
				</div>

				{/* Floating particles */}
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="absolute w-2 h-2 bg-amber-300 rounded-full animate-float opacity-0"
						style={{
							animationDelay: `${i * 0.3}s`,
							left: `${50 + 36 * Math.cos(i * (Math.PI / 4))}%`,
							top: `${50 + 36 * Math.sin(i * (Math.PI / 4))}%`,
						}}
					></div>
				))}
			</div>

			{/* Progress bar */}
			<div className="w-48 md:w-56 lg:w-64 h-1.5 bg-gray-700 rounded-full overflow-hidden mt-4">
				<div
					className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-100 ease-out"
					style={{ width: `${progress}%` }}
				></div>
			</div>

			{/* Progress percentage */}
			<div className="mt-3 text-sm font-medium text-amber-100">{progress}%</div>

			{/* Subtle tagline */}
			<div className="mt-6 text-xs text-amber-100/60 tracking-widest animate-pulse-slow">
				AURO Market Agency
			</div>
		</div>
	);
};

export default LoadingAnimation;
