import Link from "next/link";
import Image from "next/image"; // Obavezno za sliku
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#050a14] text-white py-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glavni Grid: 3 kolone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          
          {/* 1. LOGO I IME (Lijeva strana) */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-5">
             
             {/* SLIKA - Povećana na w-20 h-20 (80px) */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Logo Fondacije" 
                fill 
                className="object-contain"
              />
            </div>

            {/* TEKST PORED SLIKE */}
            <div className="flex flex-col items-center md:items-start">
               <span className="text-gray-400 font-light text-sm tracking-[0.3em] uppercase leading-none mb-2">
                Fondacija
              </span>
              <h2 className="text-3xl font-extrabold text-blue-600 tracking-wide uppercase leading-none">
                Duljević
              </h2>
            </div>
          </div>

          {/* 2. KONTAKT INFO (Sredina) */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-3 text-gray-400 group hover:text-blue-500 transition cursor-pointer">
               <FaMapMarkerAlt className="text-blue-600 group-hover:scale-110 transition" />
               <span className="text-sm">Ulica Neka bb, 71000 Sarajevo</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 group hover:text-blue-500 transition cursor-pointer">
               <FaPhone className="text-blue-600 group-hover:scale-110 transition" />
               <span className="text-sm">+387 61 123 456</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 group hover:text-blue-500 transition cursor-pointer">
               <FaEnvelope className="text-blue-600 group-hover:scale-110 transition" />
               <a href="mailto:info@fondacija.ba" className="text-sm">info@fondacija.ba</a>
            </div>
          </div>

          {/* 3. DRUŠTVENE MREŽE (Desna strana) */}
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-600 text-2xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600 text-2xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
              <FaYoutube />
            </a>
          </div>

        </div>

        {/* COPYRIGHT LINJIA */}
        <div className="border-t border-gray-900 mt-12 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Fondacija Duljević. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;