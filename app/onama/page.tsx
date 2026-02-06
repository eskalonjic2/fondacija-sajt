import React from 'react';
import RevealSection from "../components/RevealSection"; 
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Link from 'next/link'; // Ako koristiš Link komponentu negdje, ako ne možeš obrisati
import Image from "next/image";

export default function Onama() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* GLAVNI SADRŽAJ (Misija, Vizija, Aktivnosti) */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* NASLOV */}
        <RevealSection>
            <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                O Fondaciji Duljević
            </h1>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded"></div>
            </div>
        </RevealSection>

        {/* SEKCIJA: MISIJA I VIZIJA */}
        <RevealSection>
            <div className="grid md:grid-cols-2 gap-8 mb-20">
            
            {/* MISIJA */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border-l-4 border-blue-600">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">Misija Fondacije</h2>
                <p className="text-gray-600 leading-relaxed">
                Fondacija Duljević posvećena je pružanju podrške mladima, ženama i preduzetnicima 
                u Bosni i Hercegovini i regiji, kroz obrazovne programe, društvenu odgovornost i 
                inicijative koje stvaraju nove mogućnosti za lični i profesionalni razvoj. 
                Naša misija je doprinijeti izgradnji ravnopravnih i održivih zajednica koje 
                omogućavaju prosperitet i samostalnost svim građanima.
                </p>
            </div>

            {/* VIZIJA */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border-l-4 border-green-600">
                <h2 className="text-2xl font-bold mb-4 text-green-900">Vizija Fondacije</h2>
                <p className="text-gray-600 leading-relaxed">
                Vizija Fondacije Duljević je da doprinosimo stvaranju dinamičnih zajednica koje su 
                osnažene obrazovanjem, preduzetništvom i aktivizmom. Naša dugoročna težnja je da 
                postanemo katalizatori pozitivnih promjena, stvarajući održiv razvoj i međusobno 
                povezane zajednice koje teže socijalnoj pravdi i jednakim šansama za sve.
                </p>
            </div>
            </div>
        </RevealSection>

        {/* SEKCIJA: AKTIVNOSTI */}
        <RevealSection>
            <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Aktivnosti Fondacije</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
                {/* Kartica 1 */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300">
                <div className="text-xl font-bold mb-3 text-gray-800">Obrazovni programi</div>
                <p className="text-gray-600 text-sm">
                    Pružamo mentorsku i finansijsku podršku mladim ljudima i ženama, omogućavajući im 
                    da nastave svoje obrazovanje i razviju profesionalne vještine.
                </p>
                </div>

                {/* Kartica 2 */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300">
                <div className="text-xl font-bold mb-3 text-gray-800">Radionice i obuke</div>
                <p className="text-gray-600 text-sm">
                    Organizujemo obuke i praktične radionice koje osnažuju mlade ljude i žene, 
                    kao i preduzetnike, kroz sticanje ključnih poslovnih i ličnih vještina.
                </p>
                </div>

                {/* Kartica 3 */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300">
                <div className="text-xl font-bold mb-3 text-gray-800">Podrška preduzetnicima</div>
                <p className="text-gray-600 text-sm">
                    Razvijamo inicijative koje podržavaju preduzetnički duh, inovacije 
                    i ekonomski razvoj, stvarajući prilike za rast i prosperitet.
                </p>
                </div>
            </div>
            </div>
        </RevealSection>

        {/* SEKCIJA: CILJNA GRUPA */}
        <RevealSection>
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Ciljna grupa Fondacije</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                Ciljna grupa Fondacije Duljević obuhvata mlade ljude, žene i preduzetnike u Bosni i Hercegovini 
                i regiji, sa posebnim naglaskom na pružanje podrške onima koji žele unaprijediti svoje obrazovanje.
            </p>
            </div>
        </RevealSection>
      </div>

      {/* --- OVDJE POČINJE NOVA SEKCIJA ZA TIM (Full Width) --- */}
      {/* Koristimo tamnu pozadinu (slate-900) za moćan kontrast */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        
        {/* Dekorativni pozadinski krugovi (glow effect) */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Naslov sekcije */}
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white inline-block relative">
                Naš Tim
                {/* Dekorativna linija ispod naslova */}
                <span className="block w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Ljudi koji stoje iza naše vizije i svakodnevno rade na stvaranju boljih prilika za zajednicu.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">

            {/* KARTICA 1: Hako Duljević */}
            <div className="group bg-white rounded-[2rem] p-5 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/20 relative">
                
                {/* OKVIR ZA SLIKU */}
                <div className="relative mb-6 rounded-2xl overflow-hidden shadow-md border-[4px] border-gray-50 mx-auto">
                {/* Ovdje ubaci pravi src="" kad budeš imao slike */}
                <div className="w-full h-80 bg-gray-200 object-cover bg-center transition-transform duration-700 group-hover:scale-105">
                    {/* Placeholder gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                </div> 
                </div>

                <div className="px-4 pb-4 text-center">
                <h3 className="font-extrabold text-2xl text-slate-900 mb-1">Hako Duljević</h3>
                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-5">Direktor fondacije</p>
                
                {/* Divider */}
                <div className="w-12 h-1 bg-gray-100 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
                
                {/* Socials */}
                <div className="flex justify-center space-x-5">
                    <a href="https://www.facebook.com/share/1G9qWDbVdp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 hover:scale-110">
                    <FaFacebook />
                    </a>
                    <a href="https://linkedin.com/in/profil-ovog-clana" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 hover:scale-110">
                    <FaLinkedin />
                    </a>
                </div>
                </div>
            </div>

           {/* KARTICA 2: Damir Mahmutović */}
            <div className="group bg-white rounded-[2rem] p-5 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/20 relative">
                
                {/* OKVIR ZA SLIKU */}
                <div className="relative mb-6 rounded-2xl overflow-hidden shadow-md border-[4px] border-gray-50 mx-auto">
                   
                   {/* OVDJE SMO UBACILI SLIKU */}
                   <div className="relative w-full h-80">
                      <Image 
                        src="/hero6.jpeg"       // Ovdje stavi tačno ime slike iz public foldera
                        alt="Damir Mahmutović" 
                        fill                   // Ovo rasteže sliku da popuni okvir
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient preko slike (da bude ljepše) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent z-10"></div>
                   </div>

                </div>

                <div className="px-4 pb-4 text-center">
                    <h3 className="font-extrabold text-2xl text-slate-900 mb-1">Damir Mahmutović</h3>
                    <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-5">Projekt menadžer</p>
                    
                    <div className="w-12 h-1 bg-gray-100 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
                    
                    <div className="flex justify-center space-x-5">
                        <a href="https://www.facebook.com/share/1htWy5UMEH/" target="_blank" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 hover:scale-110">
                        <FaFacebook />
                        </a>
                        <a href="https://www.linkedin.com/in/damir-mahmutovi%C4%87-23494628a" target="_blank" className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 hover:scale-110">
                        <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* KARTICA 3: Volonter */}
            <div className="group bg-white rounded-[2rem] p-5 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/20 relative">
                
                <div className="relative mb-6 rounded-2xl overflow-hidden shadow-md border-[4px] border-gray-50 mx-auto">
                <div className="w-full h-80 bg-gray-200 object-cover bg-center transition-transform duration-700 group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                </div>
                </div>

                <div className="px-4 pb-4 text-center">
                <h3 className="font-extrabold text-2xl text-slate-900 mb-1">Ime Prezime</h3>
                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-5">Volonter</p>
                
                <div className="w-12 h-1 bg-gray-100 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
                
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