import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#050a14] text-white py-12 md:py-16 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GLAVNI GRID: 
            - 1 kolona za mobitele i tablete (do lg breakpointa)
            - 2 kolone za laptope i desktop (od lg pa nadalje) 
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* --- LIJEVA STRANA (Logo + Kontakt) --- */}
          <div className="flex flex-col items-start space-y-8 md:space-y-10">
            
            {/* 1. LOGO I IME */}
            <Link href="/" className="group block">
                <div className="flex flex-row items-center gap-4 md:gap-6">
                    {/* SLIKA */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <Image 
                        src="/logo.webp" 
                        alt="Logo Fondacije" 
                        fill 
                        className="object-contain"
                      />
                    </div>

                    {/* TEKST */}
                    <div className="flex flex-col items-start justify-center">
                        <span className="text-gray-400 font-light text-xs md:text-sm tracking-[0.25em] uppercase leading-none mb-1 md:mb-2">
                          Fondacija
                        </span>
                        {/* Font size: 3xl mobitel, 4xl tablet, 5xl desktop */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-600 tracking-wide uppercase leading-none">
                          Duljević
                        </h2>
                    </div>
                </div>
            </Link>

            {/* 2. KONTAKT INFO */}
            <div className="flex flex-col items-start space-y-5 md:space-y-6 w-full">
                {/* Adresa */}
                <div className="flex items-start gap-4 text-gray-300 group hover:text-blue-500 transition cursor-pointer">
                    <FaMapMarkerAlt className="text-xl md:text-2xl text-blue-600 mt-1 flex-shrink-0 group-hover:scale-110 transition" />
                    <span className="text-base md:text-lg leading-relaxed max-w-xs md:max-w-none">
                      Vreoca 59, Ilidža 71210 <br className="hidden sm:block"/>Kanton Sarajevo
                    </span>
                </div>
                
                {/* Telefon */}
                <a href="tel:+38761123456" className="flex items-center gap-4 text-gray-300 group hover:text-blue-500 transition">
                    <FaPhone className="text-xl md:text-2xl text-blue-600 flex-shrink-0 group-hover:scale-110 transition" />
                    <span className="text-base md:text-lg font-medium">+387 66 492 044</span>
                </a>
                
                {/* Email */}
                <a href="mailto:fondacija@duljevic.com" className="flex items-center gap-4 text-gray-300 group hover:text-blue-500 transition">
                    <FaEnvelope className="text-xl md:text-2xl text-blue-600 flex-shrink-0 group-hover:scale-110 transition" />
                    <span className="text-base md:text-lg font-medium break-all sm:break-normal">fondacija@duljevic.com</span>
                </a>
            </div>

          </div>

          {/* --- DESNA STRANA (Društvene mreže) --- */}
          {/* Na mobitelu i tabletu (ispod lg): poravnato lijevo (items-start).
              Na desktopu (lg i više): poravnato desno (items-end).
          */}
          <div className="flex flex-col items-start lg:items-end justify-start lg:justify-center pt-4 lg:pt-0">
             <h3 className="text-gray-500 uppercase tracking-widest text-sm md:text-base lg:text-lg mb-6 md:mb-8 font-bold">
               Pratite nas na mrežama
             </h3>
             
             <div className="flex space-x-6 md:space-x-8">
                <a 
                  href="https://www.facebook.com/share/1DTbok8b1s/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1877F2] text-4xl md:text-4xl lg:text-5xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                
                <a 
                  href="https://youtube.com/@pesterpanoramaretrospektiv5074?si=YX5wR7u0Uh9FxkEF" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF0000] text-4xl md:text-4xl lg:text-5xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                
                <a 
                  href="https://www.linkedin.com/company/fondacija-duljevi%C4%87/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0A66C2] text-4xl md:text-4xl lg:text-5xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
             </div>
          </div>

        </div>

        {/* COPYRIGHT LINIJA */}
        <div className="border-t border-gray-800 mt-12 lg:mt-16 pt-8 text-left lg:text-center">
          <p className="text-gray-500 text-sm md:text-base">
            &copy; {new Date().getFullYear()} Fondacija Duljević. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;