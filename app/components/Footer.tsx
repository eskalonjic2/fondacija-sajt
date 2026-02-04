// components/Footer.tsx
import Link from "next/link";
// 1. Dodali smo FaYoutube u uvoz
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] text-white py-8 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* LIJEVA STRANA - LOGO */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-blue-600 tracking-wide uppercase leading-none">
              DULJEVIĆ
            </h2>
            <p className="text-sm font-light text-gray-400 tracking-[0.2em] uppercase mt-1">
              FONDACIJA
            </p>
          </div>

          {/* DESNA STRANA - IKONICE */}
          <div className="flex space-x-6">
            {/* Facebook */}
            <Link 
              href="https://facebook.com" 
              target="_blank" 
              className="text-gray-400 hover:text-blue-600 transition duration-300 text-2xl"
            >
              <FaFacebook />
            </Link>

            {/* Instagram */}
            <Link 
              href="https://instagram.com" 
              target="_blank" 
              className="text-gray-400 hover:text-pink-500 transition duration-300 text-2xl"
            >
              <FaInstagram />
            </Link>

            {/* LinkedIn */}
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              className="text-gray-400 hover:text-blue-400 transition duration-300 text-2xl"
            >
              <FaLinkedin />
            </Link>

            {/* YouTube (NOVO) */}
            <Link 
              href="https://youtube.com" 
              target="_blank" 
              className="text-gray-400 hover:text-red-600 transition duration-300 text-2xl"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
        
        {/* DONJA LINIJA - COPYRIGHT */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Fondacija Duljević. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;