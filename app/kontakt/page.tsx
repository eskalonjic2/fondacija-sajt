import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Kontakt() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Glavni kontejner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Grid: Lijevo Mapa, Desno Forma i Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-2xl rounded-3xl overflow-hidden bg-white border border-gray-100">
          
          {/* LIJEVA STRANA - MAPA */}
          <div className="relative h-96 lg:h-auto w-full min-h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.840243452096!2d18.39414261234567!3d43.85625867911111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c91f63c63197%3A0x6a0c0e0b4c0c0b0!2sSarajevo!5e0!3m2!1sen!2sba!4v1700000000000!5m2!1sen!2sba"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition duration-500" // Mapa je crno-bijela dok ne pređeš mišem (opcionalno)
            ></iframe>
          </div>

          {/* DESNA STRANA - FORMA I PODACI */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            
            <div className="mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Kontakt</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontaktiraj nas</h1>
              <p className="text-gray-500 leading-relaxed">
                Ukoliko ste zainteresovani da volontirate u našim aktivnostima, ili se prijavljujete da budete gost na sledećem događaju, slobodno nam pišite.
              </p>
            </div>

            <form className="space-y-6 mb-12">
              {/* Ime i Prezime */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Ime i Prezime
                </label>
                <input 
                  type="text" 
                  placeholder="Unesite svoje ime" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Email Adresa
                </label>
                <input 
                  type="email" 
                  placeholder="Unesite svoj email" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 transition"
                />
              </div>

              {/* Poruka */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Poruka
                </label>
                <textarea 
                  rows={4} 
                  placeholder="Kako vam možemo pomoći?" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 transition"
                ></textarea>
              </div>

              {/* Dugme */}
              <button className="w-full bg-[#0b1120] hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition duration-300 uppercase tracking-widest text-sm shadow-lg">
                Pošalji Poruku
              </button>
            </form>

            {/* KONTAKT INFORMACIJE ISPOD FORME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
              
              {/* Adresa */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Naša Kancelarija
                </h3>
                <div className="flex items-start space-x-3 text-gray-600">
                  <FaMapMarkerAlt className="mt-1 text-blue-600" />
                  <p className="text-sm leading-relaxed">
                    Ulica Neka bb,<br />
                    71000 Sarajevo,<br />
                    Bosna i Hercegovina
                  </p>
                </div>
              </div>

              {/* Kontakt Podaci */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Direktan Kontakt
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaEnvelope className="text-blue-600" />
                    <a href="mailto:info@fondacija.ba" className="text-sm hover:text-blue-600 transition">
                      info@fondacija.ba
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaPhone className="text-blue-600" />
                    <span className="text-sm">+387 61 123 456</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}