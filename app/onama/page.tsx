import React from 'react';

export default function Onama() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* GLAVNI KONTEJNER */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* NASLOV */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            O Fondaciji Duljević
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* SEKCIJA: MISIJA I VIZIJA (Jedno pored drugog na velikim ekranima) */}
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

        {/* SEKCIJA: AKTIVNOSTI (3 Kartice) */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Aktivnosti Fondacije</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Kartica 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300">
              <div className="text-xl font-bold mb-3 text-gray-800">Obrazovni programi</div>
              <p className="text-gray-600 text-sm">
                Pružamo mentorsku i finansijsku podršku mladim ljudima i ženama, omogućavajući im 
                da nastave svoje obrazovanje i razviju profesionalne vještine koje će im pomoći 
                da postignu uspjeh u savremenom društvu.
              </p>
            </div>

            {/* Kartica 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300">
              <div className="text-xl font-bold mb-3 text-gray-800">Radionice i obuke</div>
              <p className="text-gray-600 text-sm">
                Organizujemo obuke i praktične radionice koje osnažuju mlade ljude i žene, 
                kao i preduzetnike, kroz sticanje ključnih poslovnih i ličnih vještina potrebnih 
                za napredak u karijeri i preduzetništvu.
              </p>
            </div>

            {/* Kartica 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300">
              <div className="text-xl font-bold mb-3 text-gray-800">Podrška preduzetnicima</div>
              <p className="text-gray-600 text-sm">
                Razvijamo i implementiramo inicijative koje podržavaju preduzetnički duh, inovacije 
                i ekonomski razvoj, stvarajući prilike za rast i prosperitet lokalnih zajednica 
                i mladih preduzetnika.
              </p>
            </div>
          </div>
        </div>

        {/* SEKCIJA: CILJNA GRUPA (Istaknuto tamnom pozadinom) */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white">Ciljna grupa Fondacije</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
            Ciljna grupa Fondacije Duljević obuhvata mlade ljude, žene i preduzetnike u Bosni i Hercegovini 
            i regiji, sa posebnim naglaskom na pružanje podrške onima koji žele unaprijediti svoje obrazovanje, 
            razviti profesionalne vještine i unaprijediti svoje preduzetničke sposobnosti. Naša ciljna grupa 
            uključuje ambiciozne pojedince koji teže ličnom i profesionalnom napretku, kao i one koji žele 
            doprinositi ekonomskom i društvenom razvoju zajednice.
          </p>
        </div>

      </div>
    </div>
  );
}