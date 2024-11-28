import { FaFacebookSquare, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-200 font-bold backdrop-blur-md bg-opacity-40 py-8">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row lg:justify-between items-center gap-8 text-center lg:text-left">

                {/* Left Column: Copyright */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <p className="text-sm lg:text-base">
                        &copy; {currentYear} All rights reserved.
                    </p>
                </div>

                {/* Center Column: Quick Links */}
                <div className="flex flex-col lg:flex-row gap-6 text-sm lg:text-base">
                    <div className="flex flex-col gap-2">
                        <h4 className="font-bold text-lg">Quick Links</h4>
                        <Link to="/" className="hover:text-primary-200 transition-colors duration-300">Home</Link>
                        <Link to="/about" className="hover:text-primary-200 transition-colors duration-300">About Us</Link>
                        <Link to="/contact" className="hover:text-primary-200 transition-colors duration-300">Contact</Link>
                        <Link to="/faq" className="hover:text-primary-200 transition-colors duration-300">FAQ</Link>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-2">
                        <h4 className="font-bold text-lg">Contact Info</h4>
                        <p className="text-sm">Email: info@example.com</p>
                        <p className="text-sm">Phone: +1 234 567 890</p>
                    </div>
                </div>

                {/* Right Column: Social Media Links */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        aria-label="Visit us on Facebook"
                        className="text-3xl hover:text-primary-200 transition-colors duration-300"
                    >
                        <FaFacebookSquare />
                    </Link>
                    <Link
                        to="/"
                        aria-label="Visit us on Instagram"
                        className="text-3xl hover:text-primary-200 transition-colors duration-300"
                    >
                        <FaInstagramSquare />
                    </Link>
                    <Link
                        to="/"
                        aria-label="Visit us on LinkedIn"
                        className="text-3xl hover:text-primary-200 transition-colors duration-300"
                    >
                        <FaLinkedinIn />
                    </Link>
                </div>
            </div>

            {/* Bottom Divider */}
            <div className="mt-8 border-t border-gray-600 py-4 text-center text-sm">
                <p>Made with ❤️ by Your Company</p>
            </div>
        </footer>
    );
};

export default Footer;
