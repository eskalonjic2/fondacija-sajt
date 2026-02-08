"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Kontakt() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const posaljiEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.current) return;

    emailjs.sendForm(
      'fondacija_mail',   // Tvoj Service ID
      'template_or2qfhr',          // Tvoj Template ID
      form.current, 
      '52mZvX-gGt13YjCAX'   // <--- OVDJE ZALIJEPI SVOJ PUBLIC KEY
    )
    .then(() => {
        alert("Hvala vam! Vaša poruka je uspješno poslana.");
        form.current?.reset();
    })
    .catch((error) => {
        // Ovo će ispisati tačan tekst greške u konzolu
        console.log("DETALJNA GREŠKA:", error);
        if (error.text) {
             alert("Greška servera: " + error.text);
        } else {
             alert("Došlo je do greške. Provjeri konzolu (F12).");
        }
    })
    .finally(() => {
        setLoading(false);
    });
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Glavni kontejner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Grid: Koristimo flex-col-reverse na mobitelu da forma bude iznad karte */}
        <div className="flex flex-col-reverse lg:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white border border-gray-100">
          
          {/* LIJEVA STRANA - MAPA */}
          <div className="relative h-96 lg:h-auto w-full lg:w-1/2 min-h-[500px]">
         <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d719.5330993704255!2d18.28896866966851!3d43.8323526656252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758ca674aec28f9%3A0xb6ee928490b073ef!2sVreoca%2059%2C%20Sarajevo%2071210!5e0!3m2!1sen!2sba!4v1770245242822!5m2!1sen!2sba"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen={true}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="w-full h-full grayscale hover:grayscale-0 transition duration-500"
></iframe>
          </div>

          {/* DESNA STRANA - FORMA I PODACI */}
          <div className="p-8 lg:p-12 w-full lg:w-1/2 flex flex-col justify-center">
            
            <div className="mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Kontakt</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontaktiraj nas</h1>
              <p className="text-gray-500 leading-relaxed">
                Ukoliko ste zainteresovani da volontirate u našim aktivnostima, ili se prijavljujete da budete gost na sledećem događaju, slobodno nam pišite.
              </p>
            </div>

            <form ref={form} onSubmit={posaljiEmail} className="space-y-6 mb-12">
              {/* Ime i Prezime */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Ime i Prezime
                </label>
                <input 
                  name="from_name" // OBAVEZNO ZA EMAILJS
                  type="text" 
                  required
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
                  name="user_email" // OBAVEZNO ZA EMAILJS
                  type="email" 
                  required
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
                  name="message" // OBAVEZNO ZA EMAILJS
                  rows={4} 
                  required
                  placeholder="Kako vam možemo pomoći?" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 transition"
                ></textarea>
              </div>

              {/* Dugme */}
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0b1120] hover:bg-blue-700'} text-white font-bold py-4 rounded-lg transition duration-300 uppercase tracking-widest text-sm shadow-lg`}
              >
                {loading ? "Slanje..." : "Pošalji Poruku"}
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
                     Vreoca 59,<br />
                    Ilidža 71210 Kanton Sarajevo,<br />
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
                    <a href="mailto:fondacija@duljevic.com" className="text-sm hover:text-blue-600 transition">
                      fondacija@duljevic.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaPhone className="text-blue-600" />
                    <span className="text-sm">+387 66 492 044</span>
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