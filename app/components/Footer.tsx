// components/Footer.tsx
import Link from "next/link";
// Dodali smo nove ikonice za Adresu, Telefon i Email (FaMapMarkerAlt, FaPhone, FaEnvelope)
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope 
} from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] text-white py-12 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GLAVNI DIO FOOTERA - GRID SISTEM (3 KOLONE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* 1. KOLONA - LOGO */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-extrabold text-blue-600 tracking-wide uppercase leading-none">
              DULJEVIĆ
            </h2>
            <p className="text-sm font-light text-gray-400 tracking-[0.2em] uppercase mt-1">
              FONDACIJA
            </p>
          </div>

          {/* 2. KOLONA - KONTAKT INFORMACIJE (NOVO) */}
          <div className="flex flex-col items-center justify-center space-y-3 text-gray-400 text-sm">
            
            {/* Adresa */}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600 text-lg" />
              <span>Ulica Neka bb, 71000 Sarajevo</span>
            </div>

            {/* Telefon */}
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-600 text-lg" />
              <span>+387 61 123 456</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600 text-lg" />
              <a href="mailto:info@fondacija.ba" className="hover:text-white transition">
                info@fondacija.ba
              </a>
            </div>

          </div>

          {/* 3. KOLONA - DRUŠTVENE MREŽE */}
          <div className="flex justify-center md:justify-end space-x-6">
            <Link 
              href="https://facebook.com" 
              target="_blank" 
              className="text-gray-400 hover:text-blue-600 transition duration-300 text-2xl"
            >
              <FaFacebook />
            </Link>

            <Link 
              href="https://instagram.com" 
              target="_blank" 
              className="text-gray-400 hover:text-pink-500 transition duration-300 text-2xl"
            >
              <FaInstagram />
            </Link>

            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              className="text-gray-400 hover:text-blue-400 transition duration-300 text-2xl"
            >
              <FaLinkedin />
            </Link>

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
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Fondacija Duljević. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;