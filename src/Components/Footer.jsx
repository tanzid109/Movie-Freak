import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedin,
    FaFilm,
    FaHeart
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
    const socialLinks = {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com"
    };

    const openLink = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg">
                                <FaFilm className="text-2xl text-white" />
                            </div>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-400">
                                Movie Freak
                            </h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Your ultimate destination for discovering, rating, and organizing your favorite movies.
                            Explore thousands of films from all genres and eras.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-amber-500/30">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {['Home', 'Movies', 'Favorites', 'Add Movie', 'Feedback'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-amber-500/30">
                            Contact Us
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <MdLocationOn className="text-amber-400 text-xl" />
                                <span className="text-gray-400">123 Cinema Street, Movie City</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MdPhone className="text-amber-400 text-xl" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MdEmail className="text-amber-400 text-xl" />
                                <span className="text-gray-400">info@movieportal.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links & Newsletter */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-amber-500/30">
                                Follow Us
                            </h3>
                            <div className="flex gap-4">
                                {Object.entries(socialLinks).map(([platform, url]) => {
                                    const Icon = {
                                        facebook: FaFacebook,
                                        instagram: FaInstagram,
                                        youtube: FaYoutube,
                                        twitter: FaTwitter,
                                        linkedin: FaLinkedin
                                    }[platform];

                                    return (
                                        <button
                                            key={platform}
                                            onClick={() => openLink(url)}
                                            className="p-3 bg-gray-800 hover:bg-gradient-to-r hover:from-amber-600 hover:to-yellow-600 rounded-full transition-all duration-300 transform hover:scale-110 group"
                                            aria-label={`Follow us on ${platform}`}
                                        >
                                            <Icon className="text-xl text-gray-300 group-hover:text-white transition-colors" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Stay Updated
                            </h3>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent flex-1 text-white"
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-r-lg hover:from-amber-600 hover:to-yellow-600 transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-gray-800"></div>

                {/* Copyright Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-gray-500">
                            © {new Date().getFullYear()} Movie Freak. All rights reserved.
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-amber-500/30 hover:scale-110 transition-all duration-300"
                aria-label="Back to top"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
};

export default Footer;