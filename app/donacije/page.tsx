import React from 'react';
import { FaBuilding, FaGlobeEurope, FaLandmark, FaMapMarkerAlt } from 'react-icons/fa'; // Ako koristiš react-icons, ako ne, obriši ovo i ikone iz koda

export default function DonationsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans pt-12 pb-24">
      
      {/* 1. HERO SEKCIJA I UVOD */}
      <section className="mx-auto max-w-4xl px-4 text-center">
        
        {/* Naslov */}
        <h1 className="text-5xl md:text-7xl font-black text-[#0f2346] mb-3 tracking-tighter">
          Doniraj
        </h1>
        
        <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 uppercase mb-12">
          PODRŽITE NAŠU MISIJU
        </p>

      

        {/* GLAVNI TEKST */}
        <div className="max-w-2xl mx-auto mb-16">
            <p className="text-base md:text-xl text-gray-600 leading-relaxed font-light">
                Vaša donacija omogućava Fondaciji da unaprijedi realizaciju svojih misija, 
                stvarajući dugoročne promjene u zajednici i podržavajući razvoj mladih, 
                žena i preduzetnika.
            </p>
        </div>

      </section>

      {/* 2. KARTICE SA INSTRUKCIJAMA */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* KARTICA 1: BOSNA I HERCEGOVINA */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
                {/* Zaglavlje kartice */}
                <div className="bg-[#0f2346] p-6 text-center">
                    <h3 className="text-white text-xl font-bold uppercase tracking-wider">Bosna i Hercegovina</h3>
                    <p className="text-blue-200 text-sm mt-1">Instrukcije za uplate u KM</p>
                </div>
                
                {/* Sadržaj kartice */}
                <div className="p-8 space-y-8 flex-grow flex flex-col justify-center">
                    
                    {/* Broj računa */}
                    <div className="text-center">
                        <p className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-2">Broj računa (TRN)</p>
                        <p className="text-3xl md:text-4xl text-[#0f2346] font-light tracking-wide break-all">
                            32260101
                        </p>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Podaci o primaocu */}
                    <div className="flex flex-col gap-4 text-center md:text-left md:flex-row md:justify-between items-center">
                        <div>
                            <p className="text-xs uppercase text-gray-400 font-bold mb-1">Naziv korisnika</p>
                            <p className="font-semibold text-gray-800 text-lg">FONDACIJA DULJEVIĆ</p>
                        </div>
                        <div className="text-center md:text-right">
                             <p className="text-xs uppercase text-gray-400 font-bold mb-1">Adresa</p>
                             <p className="font-medium text-gray-600">VREOCA 59, ILIDŽA</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KARTICA 2: INOSTRANSTVO */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
                {/* Zaglavlje kartice */}
                <div className="bg-[#1a3a6e] p-6 text-center">
                    <h3 className="text-white text-xl font-bold uppercase tracking-wider">Inostranstvo</h3>
                    <p className="text-blue-200 text-sm mt-1">Instrukcije za uplate u EUR</p>
                </div>

                {/* Sadržaj kartice */}
                <div className="p-8 space-y-6 flex-grow">
                    
                    {/* SWIFT Kodovi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-200">
                            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">Intermediary Institution (SWIFT)</p>
                            <p className="text-lg font-semibold text-[#0f2346]">CITIIE2X</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-200">
                            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">Account with Institution (SWIFT)</p>
                            <p className="text-lg font-semibold text-[#0f2346]">HAABBA22</p>
                        </div>
                    </div>

                    {/* IBAN */}
                    <div className="text-center pt-2">
                        <p className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-2">IBAN</p>
                        <p className="text-xl md:text-2xl text-[#0f2346] font-light break-all font-mono bg-blue-50 py-3 px-2 rounded-lg">
                            BA393060003226014427
                        </p>
                    </div>

                    {/* Adresa (ponovljena za inostranstvo radi jasnoće) */}
                     <div className="text-center pt-2">
                        <p className="text-xs uppercase text-gray-400 font-bold mb-1">Primalac</p>
                        <p className="text-sm text-gray-600">FONDACIJA DULJEVIĆ, VREOCA 59, ILIDŽA</p>
                    </div>
                </div>
            </div>

        </div>
      </section>

    </main>
  );
}