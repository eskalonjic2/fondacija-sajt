import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. HERO SEKCIJA (Veliki plavi dio na vrhu) */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Zajedno gradimo bolju budućnost
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Dobrodošli na stranicu naše Fondacije. Vaša podrška mijenja živote i vraća osmijeh na lica onima kojima je to najpotrebnije.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link href="/donacije" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              Doniraj odmah ❤️
            </Link>
            <Link href="/onama" className="bg-blue-700 text-white border border-blue-400 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-800 transition">
              Saznaj više
            </Link>
          </div>

        </div>
      </section>

      {/* 2. KARTICE (Šta mi radimo) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Naši Ciljevi</h2>
            <p className="mt-4 text-gray-600">Fokusirani smo na transparentnost i direktnu pomoć.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kartica 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Humanitarni Rad</h3>
              <p className="text-gray-600">Direktna pomoć ugroženim porodicama hranom, lijekovima i osnovnim potrepštinama.</p>
            </div>

            {/* Kartica 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Edukacija</h3>
              <p className="text-gray-600">Stipendiranje mladih talenata i nabavka školskog pribora za djecu.</p>
            </div>

            {/* Kartica 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Transparentnost</h3>
              <p className="text-gray-600">Svaka marka se računa. Garantujemo potpunu transparentnost svih donacija.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}