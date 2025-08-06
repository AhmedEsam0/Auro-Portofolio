import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export const WhatsappIcon = ({ link, iconSize = 20 }) => {
	return (
		link && (
			<a href={link} target="_blank" rel="noopener noreferrer" className={`text-green-500 hover:text-green-400 transition-colors shadow-2xl shadow-amber-400 `}>
				<FaWhatsapp size={iconSize} />
			</a>
		)
	);
};

export const FacebookIcon = ({ link, iconSize = 20 }) => {
	return (
		link && (
			<a href={link} target="_blank" rel="noopener noreferrer" className={`text-blue-600 hover:text-blue-500 transition-colors shadow-2xl shadow-amber-400 `}>
				<FaFacebook size={iconSize} />
			</a>
		)
	);
};

export const InstagramIcon = ({ link, iconSize = 20 }) => {
	return (
		link && (
			<a href={link} target="_blank" rel="noopener noreferrer" className={`text-pink-500 hover:text-pink-400 transition-colors shadow-2xl shadow-amber-400 `}>
				<FaInstagram size={iconSize} />
			</a>
		)
	);
};

export const TiktokIcon = ({ link, iconSize = 20 }) => {
	return (
		link && (
			<a href={link} target="_blank" rel="noopener noreferrer" className={`text-black hover:text-gray-700 transition-colors shadow-2xl shadow-amber-400 `}>
				<FaTiktok size={iconSize} />
			</a>
		)
	);
};

export const EmailIcon = ({ link, iconSize = 20 }) => {
	return (
		link && (
			<a href={link} target="_blank" rel="noopener noreferrer" className={`text-blue-500 hover:text-blue-400 transition-colors shadow-2xl shadow-amber-400 `} >
				<FaEnvelope size={iconSize} />
			</a>
		)
	);
};