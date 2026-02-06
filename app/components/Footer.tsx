import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#050a14] text-white py-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GLAVNI GRID: 2 kolone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* --- LIJEVA STRANA (Logo + Kontakt) --- */}
          {/* IZMJENA: items-start osigurava lijevo poravnanje */}
          <div className="flex flex-col items-start space-y-8">
            
            {/* 1. LOGO I IME */}
            {/* IZMJENA: flex-row da budu jedno pored drugog i na mobitelu */}
            <div className="flex flex-row items-center gap-4">
                {/* SLIKA */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <Image 
                    src="/logo.png" 
                    alt="Logo Fondacije" 
                    fill 
                    className="object-contain"
                  />
                </div>

                {/* TEKST */}
                {/* IZMJENA: items-start za lijevo poravnanje */}
                <div className="flex flex-col items-start">
                   <span className="text-gray-400 font-light text-xs md:text-sm tracking-[0.2em] uppercase leading-none mb-1 md:mb-2">
                    Fondacija
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600 tracking-wide uppercase leading-none">
                    Duljević
                  </h2>
                </div>
            </div>

            {/* 2. KONTAKT INFO */}
            {/* IZMJENA: items-start za lijevo poravnanje */}
            <div className="flex flex-col items-start space-y-4 w-full">
                <div className="flex items-start gap-3 text-gray-400 group hover:text-blue-500 transition cursor-pointer">
                   <FaMapMarkerAlt className="text-blue-600 mt-1 group-hover:scale-110 transition flex-shrink-0" />
                   <span className="text-sm text-left leading-relaxed">Vreoca 59, Ilidža 71210 <br className="hidden sm:block"/>Kanton Sarajevo</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 group hover:text-blue-500 transition cursor-pointer">
                   <FaPhone className="text-blue-600 group-hover:scale-110 transition flex-shrink-0" />
                   <span className="text-sm text-left">+387 61 123 456</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 group hover:text-blue-500 transition cursor-pointer">
                   <FaEnvelope className="text-blue-600 group-hover:scale-110 transition flex-shrink-0" />
                   <a href="mailto:fondacija@duljevic.com" className="text-sm text-left">fondacija@duljevic.com</a>
                </div>
            </div>

          </div>

          {/* --- DESNA STRANA (Društvene mreže) --- */}
          {/* IZMJENA: items-start (lijevo na mob) -> md:items-end (desno na desktopu) */}
          <div className="flex flex-col items-start md:items-end justify-start md:justify-end pt-4 md:pt-0">
             <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4 md:mb-6">Društvene mreže</h3>
             
             <div className="flex space-x-6">
                <a href="https://www.facebook.com/share/1DTbok8b1s/" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaFacebook />
                </a>
                
                <a href="https://www.linkedin.com/company/fondacija-duljevi%C4%87/" className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaLinkedin />
                </a>
                <a href="https://youtube.com/@pesterpanoramaretrospektiv5074?si=YX5wR7u0Uh9FxkEF" className="text-gray-400 hover:text-red-600 text-2xl transition duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaYoutube />
                </a>
             </div>
          </div>

        </div>

        {/* COPYRIGHT LINIJA */}
        {/* IZMJENA: text-left na mob, text-center na desktopu (ili ostavi text-left ako želiš sve lijevo) */}
        <div className="border-t border-gray-900 mt-12 pt-8 text-left md:text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Fondacija Duljević. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;