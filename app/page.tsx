import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { FaArrowRight, FaHandHoldingHeart, FaRegNewspaper, FaUsers, FaHandshake } from "react-icons/fa";
import StatsSection from "./components/StatsSection"; 
import RevealSection from "./components/RevealSection"; 
import Image from "next/image"; // Preporučujem korištenje Next Image komponente umjesto img taga

// --- IZMJENA: FILTRIRANJE SAMO NOVOSTI ---
async function getLatestNews() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "news") // <--- OVO JE KLJUČNO: Filtriramo da uzme samo novosti, ne projekte
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Greška pri učitavanju novosti:", error);
    return [];
  }
  
  return posts || [];
}

export default async function Home() {
  const novosti = await getLatestNews();

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
    {/* 1. HERO SEKCIJA - SLIDESHOW */}
      <section className="relative h-[600px] lg:h-[800px] flex items-center overflow-hidden">
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeZoom {
            0% { opacity: 0; transform: scale(1.1); }
            5% { opacity: 1; transform: scale(1); }
            33% { opacity: 1; transform: scale(1); }
            38% { opacity: 0; transform: scale(1.1); }
            100% { opacity: 0; }
          }
          .slide-bg {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            animation: fadeZoom 15s infinite;
          }
          .delay-1 { animation-delay: 0s; }
          .delay-2 { animation-delay: 5s; }
          .delay-3 { animation-delay: 10s; }
        `}} />

        <div className="absolute inset-0 z-0">
          {/* OVDJE SU TVOJE SLIKE IZ PUBLIC/HERO FOLDERA */}
          <div className="slide-bg delay-1" style={{ backgroundImage: "url('/hero/hero1.webp')" }}></div>
          <div className="slide-bg delay-2" style={{ backgroundImage: "url('/hero/hero2.webp')" }}></div>
          <div className="slide-bg delay-3" style={{ backgroundImage: "url('/hero/hero4.webp')" }}></div>
        </div>
<div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            
            {/* IZMJENA: mt-48 gura sadržaj skroz dole na telefonu. md:mt-0 ga vraća u sredinu na PC-u. */}
            <div className="max-w-2xl mt-48 md:mt-0"> 
              
             <h1 className="flex flex-col text-3xl md:text-6xl font-black tracking-tight leading-tight md:leading-none mb-4 md:mb-6 drop-shadow-lg">
    <span className="text-white">FONDACIJA</span>
    <span className="text-blue-500">DULJEVIĆ</span>
</h1>
              
              <p className="text-sm md:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed font-light border-l-4 border-blue-500 pl-4 md:pl-6 bg-black/20 backdrop-blur-sm py-2 pr-4 rounded-r-lg w-fit max-w-lg">
                Pružamo ruku onima kojima je najpotrebnija.<br />
                Kroz stipendije, humanitarnu pomoć i edukaciju gradimo društvo jednakih šansi.<br />
                Vaša podrška je temelj nečije bolje budućnosti.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/onama"
                  className="inline-flex justify-center items-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white border-2 border-white rounded-full hover:bg-white hover:text-slate-900 transition duration-300"
                >
                  Upoznaj nas <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
        </div>
      </section>

    {/* 2. STATISTIKA */}
      <RevealSection>
        <StatsSection />
      </RevealSection>
{/* 3. NAŠ TIM */}
      <RevealSection>
        <section className="py-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              
              {/* LIJEVA STRANA: TEKST */}
              <div className="mb-12 lg:mb-0">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wide mb-6">
                  <FaUsers className="mr-2" /> Naša snaga
                </div>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6 leading-tight">
                  Ljudi koji pokreću promjene.
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Naš tim čine posvećeni profesionalci, stručnjaci iz raznih oblasti i neumorni volonteri ujedinjeni istom vizijom.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Vjerujemo da samo transparentnim radom i ličnim primjerom možemo inspirisati druge da nam se pridruže u stvaranju boljeg društva.
                </p>
                
                <Link 
                  href="/tim" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-blue-900 rounded-lg shadow-md hover:bg-blue-800 transition duration-300 group"
                >
                  Upoznaj naš tim <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* DESNA STRANA: SLIKE (Hero 8 i Hero 6) */}
              <div className="relative">
                {/* Dekorativni krug u pozadini */}
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#be1e2d]/10 rounded-full blur-3xl"></div>
                
                <div className="grid grid-cols-2 gap-6 relative z-10 items-start">
                  
                {/* PRVA SLIKA - hero8.jpeg (Spuštena dolje sa mt-12) */}
                  <div className="relative bg-slate-100 rounded-2xl h-64 lg:h-80 w-full overflow-hidden shadow-lg border border-slate-200 mt-12 transform transition-transform duration-500 hover:scale-[1.02]">
                      <Image 
                        src="/hero8.jpg" 
                        alt="Hako Duljević" 
                        fill 
                        // IZMJENA: Dodato object-[35%_center] da povuče sliku u lijevo
                        // Ako treba još lijevo, stavi 25% ili 15%
                        className="object-cover object-[35%_center]" 
                      />
                  </div>

                  {/* DRUGA SLIKA - hero6.jpeg (Standardna pozicija gore) */}
                  <div className="relative bg-slate-100 rounded-2xl h-64 lg:h-80 w-full overflow-hidden shadow-lg border border-slate-200 transform transition-transform duration-500 hover:scale-[1.02]">
                      <Image 
                        src="/hero6.jpeg" 
                        alt="Damir Mahmutović" 
                        fill 
                        className="object-cover" 
                      />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </RevealSection>

      {/* 4. PARTNERI */}
      <RevealSection>
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div className="mb-10 lg:mb-0">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-200 text-xs font-bold uppercase tracking-wide mb-4">
                  <FaHandshake className="mr-2" /> Saradnja
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Postanite naš partner</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Ako ste preduzetnik ili organizacija, pozivamo vas da postanete naš partner u ostvarivanju zajedničkih ciljeva. 
                  Kroz partnerske inicijative možemo ostvariti veći uticaj na društvo.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Vaša saradnja omogućava zajednički rad na projektima koji ne samo da obogaćuju zajednicu, već podstiču 
                  ekonomski rast i stvaranje novih prilika.
                </p>
                
                <Link href="/kontakt" className="inline-block bg-white text-slate-900 font-bold py-4 px-8 rounded-lg hover:bg-blue-50 transition transform hover:-translate-y-1 shadow-lg">
                  Pridruži se timu
                </Link>
              </div>

              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center shadow-2xl">
                 <FaUsers className="text-6xl text-blue-500 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-white mb-2">Zajedno smo jači</h3>
                 <p className="text-gray-400">Pridružite se mreži od preko 20 kompanija i organizacija koje već podržavaju naš rad.</p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* 5. POSLEDNJE 3 NOVOSTI IZ BAZE */}
      <RevealSection>
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Poslednje Novosti</h2>
                  <p className="text-gray-500 mt-2">Pratite naše aktivnosti i budite u toku.</p>
                </div>
                <Link href="/blog" className="hidden md:flex text-blue-600 font-bold hover:text-blue-800 items-center gap-2">
                  Sve novosti <FaArrowRight />
                </Link>
            </div>

            {novosti.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {novosti.map((post: any) => (
                  <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 group flex flex-col h-full">
                    {/* Slika Novosti */}
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                        {post.image_url ? (
                            // Koristimo Next Image za bolju optimizaciju, ali može i img ako želiš
                           <Image 
                            src={post.image_url} 
                            alt={post.title} 
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <FaRegNewspaper className="text-4xl opacity-50" />
                          </div>
                        )}
                        
                        {post.category && (
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-gray-800 uppercase z-10">
                            {post.category}
                          </div>
                        )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-xs text-gray-400 mb-2">
                        {new Date(post.created_at).toLocaleDateString('hr-BA')}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                        {/* Ako nema content, prikaži prazan string, da ne pukne */}
                        {post.content ? post.content.substring(0, 100) + "..." : ""}
                      </p>
                      
                      {/* LINK SADA VODI NA /blog/[slug] KAO ŠTO SMO PODESILI */}
                      <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-[#be1e2d] hover:underline mt-auto">
                        Pročitaj više
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                  Trenutno nema novosti. Posjetite našu blog sekciju.
                </div>
            )}

            <div className="mt-8 text-center md:hidden">
                <Link href="/blog" className="text-blue-600 font-bold hover:text-blue-800 inline-flex items-center gap-2">
                  Sve novosti <FaArrowRight />
                </Link>
            </div>
          </div>
        </section>
      </RevealSection>

     {/* 6. DVA NAČINA ZA POMOĆ */}
      <RevealSection>
        <section className="relative w-full py-12 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden shadow-2xl">
              
              {/* LIJEVA STRANA */}
              <div className="relative bg-slate-900 text-white p-10 lg:p-20 flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-xs font-bold uppercase tracking-wide mb-6">
                    <FaUsers className="mr-2" /> Uključi se
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                    Želite dati doprinos radu Fondacije?
                  </h2>
                  
                  <div className="space-y-6 text-gray-300 text-lg mb-10">
                    <p>
                      <strong className="text-white block mb-1">Pridružite se:</strong> 
                      Postanite volonter i aktivno učestvujte u našim projektima.
                    </p>
                    <p>
                      <strong className="text-white block mb-1">Podržite nas:</strong> 
                      Učestvujte u radionicama i događajima koji omogućavaju povezivanje.
                    </p>
                  </div>

                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center bg-white text-slate-900 text-base font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1"
                  >
                    Postani Volonter <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>

              {/* DESNA STRANA */}
              <div className="relative bg-[#be1e2d] text-white p-10 lg:p-20 flex flex-col justify-center overflow-hidden">
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-800/50 border border-red-400 text-white text-xs font-bold uppercase tracking-wide mb-6">
                    <FaHandHoldingHeart className="mr-2" /> Podrži nas
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                    Vaša donacija mijenja živote.
                  </h2>

                  <p className="text-red-100 text-lg mb-10 leading-relaxed">
                    Vaša donacija omogućava Fondaciji da unaprijedi realizaciju svojih misija. Svaka marka ide direktno onima kojima je najpotrebnija.
                  </p>

                  <Link
                    href="/donacije"
                    className="inline-flex items-center justify-center bg-slate-900 text-white text-base font-bold py-4 px-8 rounded-2xl shadow-xl hover:bg-slate-800 transition transform hover:-translate-y-1 border border-slate-800"
                  >
                    DONIRAJ SADA 
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </RevealSection>

    </main>
  );
}