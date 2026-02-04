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

      {/* Drugi dio: Prikaz članova tima */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-12 border-b pb-4 inline-block">Naš Tim</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* KARTICA 1 */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 object-cover"></div> {/* Povećana slika */}
            <h3 className="font-bold text-2xl text-gray-900 mb-1">Ime Prezime</h3>
            <p className="text-blue-600 font-medium mb-6">Direktor fondacije</p>
            
            {/* Ikonice za društvene mreže */}
            <div className="flex justify-center space-x-5">
              <a 
                href="https://facebook.com/profil-ovog-clana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 text-2xl transition"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://linkedin.com/in/profil-ovog-clana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 text-2xl transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* KARTICA 2 */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <h3 className="font-bold text-2xl text-gray-900 mb-1">Ime Prezime</h3>
            <p className="text-blue-600 font-medium mb-6">Projekt menadžer</p>
            
             <div className="flex justify-center space-x-5">
              <a href="#" target="_blank" className="text-gray-400 hover:text-blue-600 text-2xl transition">
                <FaFacebook />
              </a>
              <a href="#" target="_blank" className="text-gray-400 hover:text-blue-700 text-2xl transition">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* KARTICA 3 */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <h3 className="font-bold text-2xl text-gray-900 mb-1">Ime Prezime</h3>
            <p className="text-blue-600 font-medium mb-6">Volonter</p>
            
             <div className="flex justify-center space-x-5">
              <a href="#" target="_blank" className="text-gray-400 hover:text-blue-600 text-2xl transition">
                <FaFacebook />
              </a>
              <a href="#" target="_blank" className="text-gray-400 hover:text-blue-700 text-2xl transition">
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}