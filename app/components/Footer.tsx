import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#050a14] text-white py-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GLAVNI GRID: 2 kolone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* --- LIJEVA STRANA (Logo + Kontakt) --- */}
          <div className="flex flex-col items-start space-y-10">
            
            {/* 1. LOGO I IME */}
            <div className="flex flex-row items-center gap-5">
                {/* SLIKA - malo povećana */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                  <Image 
                    src="/logo.png" 
                    alt="Logo Fondacije" 
                    fill 
                    className="object-contain"
                  />
                </div>

                {/* TEKST - Povećan */}
                <div className="flex flex-col items-start justify-center">
                    <span className="text-gray-400 font-light text-sm md:text-base tracking-[0.2em] uppercase leading-none mb-2">
                     Fondacija
                   </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-blue-600 tracking-wide uppercase leading-none">
                    Duljević
                  </h2>
                </div>
            </div>

            {/* 2. KONTAKT INFO - Sve povećano */}
            <div className="flex flex-col items-start space-y-5 w-full">
                {/* Adresa */}
                <div className="flex items-start gap-4 text-gray-300 group hover:text-blue-500 transition cursor-pointer">
                   <FaMapMarkerAlt className="text-xl md:text-2xl text-blue-600 mt-1 group-hover:scale-110 transition flex-shrink-0" />
                   <span className="text-base md:text-lg text-left leading-relaxed">
                     Vreoca 59, Ilidža 71210 <br className="hidden sm:block"/>Kanton Sarajevo
                   </span>
                </div>
                
                {/* Telefon */}
                <div className="flex items-center gap-4 text-gray-300 group hover:text-blue-500 transition cursor-pointer">
                   <FaPhone className="text-xl md:text-2xl text-blue-600 group-hover:scale-110 transition flex-shrink-0" />
                   <span className="text-base md:text-lg text-left">+387 61 123 456</span>
                </div>
                
                {/* Email */}
                <div className="flex items-center gap-4 text-gray-300 group hover:text-blue-500 transition cursor-pointer">
                   <FaEnvelope className="text-xl md:text-2xl text-blue-600 group-hover:scale-110 transition flex-shrink-0" />
                   <a href="mailto:fondacija@duljevic.com" className="text-base md:text-lg text-left">fondacija@duljevic.com</a>
                </div>
            </div>

          </div>

          {/* --- DESNA STRANA (Društvene mreže) --- */}
          <div className="flex flex-col items-start md:items-end justify-start md:justify-end pt-6 md:pt-0">
             <h3 className="text-gray-500 uppercase tracking-widest text-base md:text-lg mb-6 md:mb-8 font-semibold">
               Društvene mreže Fondacije Duljević
             </h3>
             
             {/* Ikonice drastično povećane (md:text-5xl je novo) */}
             <div className="flex space-x-8">
                <a href="https://www.facebook.com/share/1DTbok8b1s/" className="text-gray-400 hover:text-blue-600 text-3xl md:text-5xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaFacebook />
                </a>
                <a href="https://youtube.com/@pesterpanoramaretrospektiv5074?si=YX5wR7u0Uh9FxkEF" className="text-gray-400 hover:text-red-600 text-3xl md:text-5xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaYoutube />
                </a>
               
                <a href="https://www.linkedin.com/company/fondacija-duljevi%C4%87/" className="text-gray-400 hover:text-blue-700 text-3xl md:text-5xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaLinkedin />
                </a>
                
                
             </div>
          </div>

        </div>

        {/* COPYRIGHT LINIJA - Tekst malo povećan */}
        <div className="border-t border-gray-800 mt-14 pt-8 text-left md:text-center text-gray-500 text-base">
          <p>&copy; {new Date().getFullYear()} Fondacija Duljević. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;