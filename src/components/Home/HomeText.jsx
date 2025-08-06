import React, { useEffect, useState } from "react";
import { WhatsappIcon, FacebookIcon, InstagramIcon, TiktokIcon, EmailIcon } from "../DataJsons/Icons.jsx";
import { Contacts } from "../DataJsons/DataReturn.jsx";

const HomeHero = () => {
	const [contactDetails, setContactDetails] = useState(Contacts());

	const socialLinks = [
		{
			href: contactDetails[0].facebook,
			icon: <FacebookIcon link={contactDetails[0].facebook} iconSize={28} />,
			label: "Facebook",
		},
		{
			href: contactDetails[0].whatsapp,
			icon: <WhatsappIcon link={contactDetails[0].whatsapp} iconSize={28} />,
			label: "WhatsApp",
		},
		{
			href: contactDetails[0].instagram,
			icon: <InstagramIcon link={contactDetails[0].instagram} iconSize={28} />,
			label: "Instagram",
		},
		{
			href: contactDetails[0].tiktok,
			icon: <TiktokIcon link={contactDetails[0].tiktok} iconSize={28} />,
			label: "TikTok",
		},
		{
			href: `mailto:${contactDetails[0].email}`,
			icon: <EmailIcon link={contactDetails[0].email} iconSize={28} />,
			label: "Email",
		},
	];
	

	return (
		<section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen w-full max-w-[1400px] mx-auto px-5 sm:px-8 py-20 overflow-hidden">
			<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden z-0">
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
			</div>
			<article className="text-content md:w-1/2 text-center md:text-left z-10 transition-transform duration-200 ease-out">
				<header>
					<div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20">
						<span className="text-sm font-medium text-blue-400">
							Everything Available
						</span>
					</div>
					<h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
						Hello, We're <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 bg-clip-text text-transparent">AURO</span>
					</h1>
					<p className="text-white text-base sm:text-lg md:text-xl mt-4 font-light leading-snug">
						<span className="text-[var(--lighter-main-color)] font-medium">
							Marketing Agency
						</span>
					</p>
				</header>
				<p className="text-gray-300 text-sm sm:text-base mt-6 mb-8 max-w-[600px] mx-auto md:mx-0 leading-relaxed">
					At AURO, we turn likes into leads and stories into sales. From eye-catching content to smart strategies, we help brands grow fast and shine online. Your success is just a click away.
				</p>
				<nav>
					<ul className="flex justify-center md:justify-start space-x-6 mb-10">
						{socialLinks.map(({ href, icon, label }) => (
							<li key={label} className="relative group">
								{icon}
								<div className="relative">
									<div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden group-hover:block text-sm text-white bg-blue-500 p-3 rounded-lg shadow-lg
										after:content-[''] after:absolute after:top-9 after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-3 after:bg-blue-500 after:rotate-45 after:shadow-md">
										
										<p className="font-semibold whitespace-nowrap">{label}</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</nav>
			</article>
		</section>
	);
};

export default HomeHero;
