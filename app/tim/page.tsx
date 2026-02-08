import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Tim() {
  return (
    <div className="bg-gray-50">
      
      {/* 1. SEKCIJA: TEKST */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Ljudi iza misije
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Iza svakog uspjeha stoje ljudi. Tim koji djeluje na terenu, razmišlja strateški i reaguje konkretno. 
Okupljamo znanje, iskustvo i energiju kako bismo ideje pretvarali u vidljive rezultate. Ovo su ljudi koji ne pričaju o promjenama. Oni ih stvaraju.
        </p>
      </div>

      {/* 2. SEKCIJA: TIM */}
      <section className="w-full bg-slate-900 py-24 relative overflow-hidden">
        
        {/* Dekorativni pozadinski krugovi */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
            
            {/* Naslov sekcije */}
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white inline-block relative">
                    Naš Tim
                    <span className="block w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></span>
                </h2>
            </div>

            {/* --- STRUKTURA TIMA --- */}
            <div className="flex flex-col gap-12 items-center">

             {/* 1. KARTICA: DIREKTOR */}
                <div className="w-full max-w-sm">
                    <div className="group bg-white rounded-[2rem] p-5 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/20 relative">
                        {/* Okvir za sliku */}
                        <div className="relative mb-6 rounded-2xl overflow-hidden shadow-md border-[4px] border-gray-50 mx-auto">
                            <div className="relative w-full h-96">
                                <Image 
                                    src="/hero8.webp"
                                    alt="Hako Duljević" 
                                    fill 
                                    className="object-cover object-[37%_center] transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent z-10"></div>
                            </div>
                        </div>
                        {/* Podaci */}
                        <div className="px-4 pb-4 text-center">
                            <h3 className="font-extrabold text-2xl text-slate-900 mb-1">Hako Duljević</h3>
                            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-5">Direktor fondacije</p>
                            <div className="w-12 h-1 bg-gray-100 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
                            <div className="flex justify-center space-x-5">
                                <a href="https://www.facebook.com/share/1G9qWDbVdp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 hover:scale-110"><FaFacebook /></a>
                               <a href="https://www.instagram.com/hakoduljevic?igsh=dXNzdmhnejVzOW0y" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 text-2xl transition duration-300 hover:scale-110"><FaInstagram /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. KARTICA: PROJEKT MENADŽER */}
                <div className="w-full max-w-sm">
                    <div className="group bg-white rounded-[2rem] p-5 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/20 relative">
                        <div className="relative mb-6 rounded-2xl overflow-hidden shadow-md border-[4px] border-gray-50 mx-auto">
                            <div className="relative w-full h-96">
                                <Image 
                                    src="/hero6.webp" 
                                    alt="Damir Mahmutović" 
                                    fill 
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent z-10"></div>
                            </div>
                        </div>
                        <div className="px-4 pb-4 text-center">
                            <h3 className="font-extrabold text-2xl text-slate-900 mb-1">Damir Mahmutović</h3>
                            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-5">Projekt menadžer</p>
                            <div className="w-12 h-1 bg-gray-100 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
                            <div className="flex justify-center space-x-5">
                                <a href="https://www.facebook.com/share/1htWy5UMEH/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 hover:scale-110"><FaFacebook /></a>
                                <a href="https://www.linkedin.com/in/damir-mahmutovi%C4%87-23494628a" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 hover:scale-110"><FaLinkedin /></a>
                                <a href="https://www.instagram.com/damir.mahmutovic_?igsh=MXY2YWJ6NWYxZTMxMg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 text-2xl transition duration-300 hover:scale-110"><FaInstagram /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. KARTICA: VOLONTER (Sada centriran isto kao gornje dvije) */}
                <div className="w-full max-w-sm">
                    <div className="group bg-white rounded-[2rem] p-5 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/20 relative">
                        <div className="relative mb-6 rounded-2xl overflow-hidden shadow-md border-[4px] border-gray-50 mx-auto">
                            
                            {/* OKVIR I SLIKA */}
                            <div className="w-full h-96 bg-gray-200 relative">
                                <Image 
                                    src="/hero7.webp"
                                    alt="Emir Skalonjić" 
                                    fill 
                                    className="object-cover object-[90%_center] transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent z-10"></div>
                            </div>

                        </div>
                        <div className="px-4 pb-4 text-center">
                            <h3 className="font-extrabold text-2xl text-slate-900 mb-1">Emir Skalonjić</h3>
                            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-5">Tehnički asistent</p>
                            <div className="w-12 h-1 bg-gray-100 mx-auto mb-6 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
                            <div className="flex justify-center space-x-5">
                                <a href="https://www.facebook.com/share/1DpXeKebUN/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 text-2xl transition duration-300 hover:scale-110"><FaFacebook /></a>
                                <a href="https://www.linkedin.com/in/emir-skalonjic-a50093295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 text-2xl transition duration-300 hover:scale-110"><FaLinkedin /></a>
                                <a href="https://www.instagram.com/emir.skalonjic?utm_source=qr&igsh=NnV5dTQ2bTFuZmx1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 text-2xl transition duration-300 hover:scale-110"><FaInstagram /></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </div>
  );
}