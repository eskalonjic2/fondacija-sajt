import React from 'react';

export default function DonationsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans pt-12 pb-24">
      
      {/* 1. HERO SEKCIJA */}
      <section className="mx-auto max-w-4xl px-4 text-center">
        
        {/* Naslov */}
        <h1 className="text-5xl md:text-7xl font-black text-[#0f2346] mb-3 tracking-tighter">
          Doniraj
        </h1>
        
        <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 uppercase mb-12">
          POMOZITE PROMENI!
        </p>

        {/* Krug za sliku */}
        <div className="flex justify-center mb-12">
          <div className="w-56 h-56 bg-gray-50 rounded-full flex items-center justify-center shadow-inner">
             {/* Ovdje će ići tvoja slika kasnije */}
             <span className="text-gray-300 text-sm font-medium">Slika</span>
          </div>
        </div>

        {/* Podnaslov */}
        <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-16">
          Podržite Nas i Pomozite Promeni!
        </h2>
      </section>

      {/* 2. TEKST (Centriran) */}
      <section className="mx-auto max-w-2xl px-6 text-center text-gray-500 space-y-12 leading-loose text-sm md:text-base">
        
        <p>
          Vaša pomoć može napraviti ogromnu razliku! Kroz vaš doprinos, fondacija Duljević može da nastavi sa realizacijom ključnih projekata koji unapređuju živote onih kojima je najpotrebnije. Svaka donacija, bez obzira na iznos, omogućava nam da pružimo podršku zajednicama.
        </p>

        <div className="space-y-2">
          <h3 className="text-gray-900 font-bold text-lg">Postanite naš partner</h3>
          <p>
            Ako ste preduzetnik ili organizacija, pozivamo vas da postanete naš partner u ostvarivanju zajedničkih ciljeva. Kroz partnerske inicijative možemo ostvariti veći uticaj na društvo.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-gray-900 font-bold text-lg">Društvena odgovornost</h3>
          <p>
            Podrškom našim projektima ne samo da unapređujete život pojedinaca, već aktivno doprinosite opšteg društvenom i ekonomskom napretku.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-gray-900 font-bold text-lg">Želite dati doprinos?</h3>
          <p className="italic">
            Pridružite se! Postanite volonter i aktivno učestvujte u našim projektima.
          </p>
        </div>

      </section>

      {/* 3. INSTRUKCIJE ZA UPLATU */}
      <section className="mx-auto max-w-6xl px-4 mt-32">
        
        <h2 className="text-3xl md:text-4xl font-medium text-center text-gray-900 mb-20">
          Instrukcije za donaciju.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          
          {/* BiH - Lijeva strana */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right px-4 md:px-12">
             <h3 className="text-lg font-bold text-gray-800 mb-8 max-w-xs">
               Instrukcije za donacije iz Bosne i Hercegovine
             </h3>
             
             <div className="space-y-6">
               <div>
                 <p className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-1">Broj računa (TRN)</p>
                 <p className="text-2xl md:text-3xl text-[#0f2346] font-light tracking-wide">3380000000000000</p>
               </div>

               <div>
                 <p className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-1">Primalac</p>
                 <p className="text-gray-800 font-medium">FONDACIJA DULJEVIĆ</p>
                 <p className="text-gray-500 text-sm">Vreoca 59, Ilidža</p>
               </div>
             </div>
          </div>

          {/* Linija razdvajanja (samo na desktopu) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -ml-px"></div>

          {/* Inostranstvo - Desna strana */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-12">
             <h3 className="text-lg font-bold text-gray-800 mb-8 max-w-xs">
               Instrukcije za donacije iz inostranstva (EUR)
             </h3>

             <div className="space-y-6 w-full max-w-xs">
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-1">SWIFT / BIC</p>
                  <p className="text-xl text-[#0f2346] font-light">CITIUS33</p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-1">IBAN</p>
                  <p className="text-lg md:text-xl text-[#0f2346] font-light break-all">
                    BA393060003226014427
                  </p>
                </div>
             </div>
          </div>

        </div>
      </section>

    </main>
  );
}