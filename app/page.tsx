import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* 1. GLAVNI DIO (HERO) - Čisto bijelo */}
      <section className="relative bg-white pt-20 pb-32 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          
          {/* NASLOV */}
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-black tracking-tight text-slate-900 sm:text-7xl">
            Humanitarna Fondacija
            <span className="relative whitespace-nowrap text-blue-900 block mt-2">
              <span className="relative">DULJEVIĆ</span>
            </span>
          </h1>

          {/* TEKST ISPOD */}
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Mi smo most između onih koji imaju srce da daju i onih kojima je pomoć najpotrebnija. Transparentno, direktno i od srca.
          </p>

          {/* DUGMADI */}
          <div className="mt-10 flex justify-center gap-x-6">
            <Link
              href="/donacije"
              className="rounded-md bg-[#be1e2d] px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all"
            >
              DONIRAJ SADA ❤️
            </Link>
            <Link
              href="/onama"
              className="text-sm font-bold leading-6 text-blue-900 hover:text-blue-700 py-3.5"
            >
              Saznaj više o nama <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATISTIKA (Svijetlo siva traka) */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 text-center md:grid-cols-3">
            
            <div className="flex flex-col gap-y-2">
              <dt className="text-base leading-7 text-slate-600">Porodica Pomoćeno</dt>
              <dd className="order-first text-5xl font-black tracking-tight text-blue-900">500+</dd>
            </div>

            <div className="flex flex-col gap-y-2">
              <dt className="text-base leading-7 text-slate-600">Obroka Podijeljeno</dt>
              <dd className="order-first text-5xl font-black tracking-tight text-blue-900">10k+</dd>
            </div>

            <div className="flex flex-col gap-y-2">
              <dt className="text-base leading-7 text-slate-600">Transparentnost</dt>
              <dd className="order-first text-5xl font-black tracking-tight text-blue-900">100%</dd>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}