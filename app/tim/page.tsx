// components/Tim.tsx
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Tim() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Prvi dio: O našoj kulturi i organizaciji */}
      <section className="mb-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Ljudi iza misije</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Naša snaga nije samo u donacijama, već u ljudima koji svakodnevno rade na terenu. 
          Spojili smo stručnjake iz različitih oblasti sa jednim ciljem – napraviti stvarnu promjenu. 
          Ovo je ekipa koja pretvara viziju u djela.
        </p>
      </section>

    <section className="py-16 bg-gray-50/50"> {/* Dodao sam blagu pozadinu sekciji za bolji kontrast */}
  <div className="container mx-auto px-4">
    {/* Naslov sekcije */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 inline-block relative after:content-[''] after:block after:w-1/2 after:h-1 after:bg-blue-500 after:mx-auto after:mt-4 after:rounded-full">
        Naš Tim
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">

      {/* KARTICA 1 */}
      <div className="group bg-white rounded-[2rem] p-5 border border-gray-200/60 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
        
        {/* OKVIR ZA SLIKU - Kockasti/Portret */}
        <div className="relative mb-6 rounded-xl overflow-hidden shadow-sm border-[3px] border-white ring-1 ring-gray-100 mx-auto">
          {/* Placeholder za sliku - zamijenjen sa većim, portretnim div-om */}
          <div className="w-full h-80 bg-gray-200 object-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]">
              {/* Opcionalno: Blagi gradient preko placeholdera da izgleda 'punije' */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
          </div> 
        </div>

        <div className="px-4 pb-4">
          <h3 className="font-extrabold text-2xl text-gray-900 mb-2 leading-tight">Hako Duljević</h3>
          {/* Uloga - moderniji stil (uppercase, manji font, jača boja) */}
          <p className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-4">Direktor fondacije</p>
          
          {/* Dekorativna linija */}
          <div className="w-10 h-0.5 bg-blue-200 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors"></div>
          
          {/* Ikonice za društvene mreže (LINKOVI NISU DIRANI) */}
          <div className="flex justify-center space-x-5">
            <a 
              href="https://www.facebook.com/share/1G9qWDbVdp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://linkedin.com/in/profil-ovog-clana" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* KARTICA 2 */}
      <div className="group bg-white rounded-[2rem] p-5 border border-gray-200/60 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
        
        <div className="relative mb-6 rounded-xl overflow-hidden shadow-sm border-[3px] border-white ring-1 ring-gray-100 mx-auto">
          <div className="w-full h-80 bg-gray-200 object-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]">
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <h3 className="font-extrabold text-2xl text-gray-900 mb-2 leading-tight">Damir Mahmutović</h3>
          <p className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-4">Projekt menadžer</p>
          
          <div className="w-10 h-0.5 bg-blue-200 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors"></div>
          
          <div className="flex justify-center space-x-5">
            <a href="https://www.facebook.com/share/1htWy5UMEH/" target="_blank" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 hover:scale-110">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/damir-mahmutovi%C4%87-23494628a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 hover:scale-110">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* KARTICA 3 */}
      <div className="group bg-white rounded-[2rem] p-5 border border-gray-200/60 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
        
        <div className="relative mb-6 rounded-xl overflow-hidden shadow-sm border-[3px] border-white ring-1 ring-gray-100 mx-auto">
          <div className="w-full h-80 bg-gray-200 object-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]">
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <h3 className="font-extrabold text-2xl text-gray-900 mb-2 leading-tight">Ime Prezime</h3>
          <p className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-4">Volonter</p>
          
          <div className="w-10 h-0.5 bg-blue-200 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors"></div>
          
          <div className="flex justify-center space-x-5">
            <a href="#" target="_blank" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 hover:scale-110">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 hover:scale-110">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
    </div>
  );
}