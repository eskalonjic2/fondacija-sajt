import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { FaArrowRight, FaHandHoldingHeart, FaRegNewspaper, FaUsers, FaHandshake, FaPlay } from "react-icons/fa";
import StatsSection from "./components/StatsSection"; 
import RevealSection from "./components/RevealSection"; 
import Image from "next/image"; 

export const revalidate = 0;

// --- POMOĆNA FUNKCIJA ZA ČIŠĆENJE TEKSTA ---
function stripHtml(html: string | null | undefined) {
  if (!html) return "";
  let text = html.replace(/<[^>]*>?/gm, ' '); // Ukloni tagove
  text = text.replace(/&nbsp;/g, ' '); // Ukloni non-breaking space
  return text.replace(/\s+/g, ' ').trim(); // Ukloni višak razmaka
}

// --- 1. FETCH NOVOSTI ---
async function getLatestNews() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "news") 
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) return [];
  return posts || [];
}

// --- 2. FETCH PODCAST ---
async function getLatestPodcast() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "podcast")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return null; 
  return data;
}

// --- 3. FETCH ZADNJEG PROJEKTA ---
async function getLatestProject() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "project") // Dohvata samo tip 'project'
    .order("created_at", { ascending: false }) // Najnoviji
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export default async function Home() {
  const novosti = await getLatestNews();
  const podcast = await getLatestPodcast();
  const latestProject = await getLatestProject();

  // Priprema čistog teksta
  const cleanPodcastDesc = podcast ? stripHtml(podcast.content) : "";
  const cleanProjectDesc = latestProject ? stripHtml(latestProject.content) : "";

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
   {/* 1. HERO SEKCIJA */}
      <section className="relative h-[650px] md:h-[700px] lg:h-[850px] flex items-center overflow-hidden">
        
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
            /* background-position se sada kontroliše kroz Tailwind klase dole */
            opacity: 0;
            animation: fadeZoom 15s infinite;
          }
          .delay-1 { animation-delay: 0s; }
          .delay-2 { animation-delay: 5s; }
          .delay-3 { animation-delay: 10s; }
        `}} />

        <div className="absolute inset-0 z-0 bg-slate-900">
          {/* PRVA SLIKA: bg-[75%_center] pomjera sliku UDESNO na mobilnom. 
              Ako treba još desno, stavi 85% ili 90%. md:bg-center vraća na centar za PC. */}
          <div className="slide-bg delay-1 bg-[55%_center] md:bg-center" style={{ backgroundImage: "url('/hero/hero4.webp')" }}></div>
          
          {/* DRUGA SLIKA: Isto pomjeranje udesno */}
          <div className="slide-bg delay-2 bg-[60%_center] md:bg-center" style={{ backgroundImage: "url('/hero/hero2.webp')" }}></div>
          
          {/* TREĆA SLIKA: Nju sam ostavio centriranu, ali ako i nju trebaš desno, dodaj istu klasu */}
          <div className="slide-bg delay-3 bg-center" style={{ backgroundImage: "url('/hero/hero1.webp')" }}></div>
        </div>
        
        {/* Overlay - gradijent odozdo prema gore da se tekst bolje vidi */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>

        {/* KONTEJNER: justify-end spušta sve na dno. pb-16/32 pravi razmak od donje ivice */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-end h-full pb-16 md:pb-32">
            <div className="max-w-3xl mt-0"> 
             <h1 className="flex flex-col text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
                <span className="text-white">FONDACIJA</span>
                <span className="text-blue-500">DULJEVIĆ</span>
             </h1>
             
             <div className="mb-8 max-w-xl">
                 <p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed font-light drop-shadow-md">
                   Pružamo ruku onima kojima je najpotrebnija.
                   Kroz stipendije, humanitarnu pomoć i edukaciju gradimo društvo jednakih šansi.
                </p> 
             </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/onama"
                  className="inline-flex justify-center items-center px-6 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-bold text-white border-2 border-white rounded-full hover:bg-white hover:text-slate-900 transition duration-300"
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
        <section className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              
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
                <Link 
                  href="/tim" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-blue-900 rounded-lg shadow-md hover:bg-blue-800 transition duration-300 group"
                >
                  Upoznaj naš tim <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative">
                  {/* Pozadinski blur */}
                  <div className="absolute -top-4 -right-4 w-72 h-72 md:w-96 md:h-96 bg-[#be1e2d]/10 rounded-full blur-3xl -z-10"></div>
                  
                  {/* GRID SLIKA TIMA */}
                  <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 relative z-10">
                      
                     <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-[500px] bg-slate-200 rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
  <Image 
      src="/hero8.webp" 
      alt="Hako Duljević" 
      fill 
      // Ovdje je izmjena: object-[40%_top]
      // Smanjuj broj (npr. 30%) da ide još lijevo, povećavaj (npr. 60%) da ide desno.
      className="object-cover object-[40%_top] transition-transform duration-700 group-hover:scale-105"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
      priority={true}
  />
</div>
                      <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-[500px] bg-slate-200 rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
                          <Image 
                              src="/hero6.webp" 
                              alt="Damir Mahmutović" 
                              fill 
                              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                              priority={true}
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
        <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
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
                </p>
                <Link href="/kontakt" className="inline-block bg-white text-slate-900 font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg hover:bg-blue-50 transition transform hover:-translate-y-1 shadow-lg">
                  Pridruži se timu
                </Link>
              </div>

              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center shadow-2xl">
                  <FaUsers className="text-6xl text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Zajedno smo jači</h3>
                  <p className="text-gray-400">Pridružite se mreži od preko 20 kompanija i organizacija.</p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

    {/* --- NOVA EPIZODA SEKCIJA --- */}
      {podcast && (
        <RevealSection>
          <section className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 md:mb-12 gap-4">
                <div className="flex items-center gap-4">
                   <div className="w-1.5 h-10 md:w-2 md:h-10 bg-blue-600 rounded-full"></div>
                   <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Nova epizoda</h2>
                </div>
                
                <Link 
                  href="/podcast" 
                  className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 transition-colors text-sm md:text-base"
                >
                  Sve epizode <FaArrowRight />
                </Link>
              </div>

              {/* PODCAST KARTICA */}
              <div className="group relative bg-slate-900 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:shadow-blue-900/20">
                 
                 <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10 pointer-events-none"></div>
                 
                 <div className="grid lg:grid-cols-2 gap-0 relative z-20">
                   
                   {/* LIJEVA STRANA: TEKST */}
                   <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                       
                       <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 md:mb-4">
                         {new Date(podcast.created_at).toLocaleDateString('hr-BA')}
                       </span>
                       
                       <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                         {podcast.title}
                       </h3>
                       
                       <p className="text-slate-300 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed line-clamp-3">
                         {cleanPodcastDesc || "Pogledajte najnoviju epizodu našeg podcasta..."}
                       </p>
                       
                       <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
                          {podcast.guest_name && (
                              <div className="bg-[#111827] px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-gray-800">
                                  <span className="text-blue-500 text-[9px] md:text-[10px] font-bold block uppercase tracking-wider mb-1">
                                    Gost
                                  </span>
                                  <span className="text-white font-bold text-sm md:text-lg whitespace-nowrap">
                                    {podcast.guest_name}
                                  </span>
                              </div>
                          )}
                          
                          {podcast.video_duration && (
                               <div className="bg-[#111827] px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-gray-800">
                                  <span className="text-blue-500 text-[9px] md:text-[10px] font-bold block uppercase tracking-wider mb-1">
                                    Trajanje
                                  </span>
                                  <span className="text-white font-bold text-sm md:text-lg whitespace-nowrap">
                                    {podcast.video_duration} min
                                  </span>
                               </div>
                          )}
                       </div>

                       <div className="flex items-center gap-4">
                           <a 
                             href={podcast.youtube_link || "#"} 
                             target="_blank" 
                             className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all hover:scale-110 shadow-lg shadow-blue-600/30"
                           >
                               <FaPlay className="ml-1 text-lg md:text-2xl" />
                           </a>
                           <span className="text-white font-bold text-base md:text-lg">Gledaj odmah</span>
                       </div>
                   </div>

                   {/* DESNA STRANA: SLIKA */}
                   <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-auto lg:min-h-full order-1 lg:order-2 bg-slate-800">
                       {podcast.image_url ? (
                           <Image 
                             src={podcast.image_url} 
                             alt={podcast.title}
                             fill
                             className="object-cover object-top lg:object-center transition-transform duration-700 group-hover:scale-105"
                           />
                       ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                               <span className="text-sm font-medium">Nema slike</span>
                           </div>
                       )}
                   </div>

                 </div>
              </div>

            </div>
          </section>
        </RevealSection>
      )}

    {/* 5. POSLEDNJE 3 NOVOSTI IZ BAZE */}
      <RevealSection>
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="flex justify-between items-end mb-10 md:mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-10 md:h-12 bg-blue-600 rounded-full mt-1"></div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Poslednje Novosti</h2>
                    <p className="text-gray-500 text-sm md:text-base mt-1 md:mt-2">Pratite naše aktivnosti i budite u toku.</p>
                  </div>
                </div>
                
                <Link href="/blog" className="hidden md:flex text-blue-600 font-bold hover:text-blue-800 items-center gap-2">
                  Sve novosti <FaArrowRight />
                </Link>
            </div>

            {novosti.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {novosti.map((post: any) => {
                  const cleanNewsContent = stripHtml(post.content);
                  return (
                    <div key={post.id} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100 group flex flex-col h-full">
                      <div className="h-48 bg-gray-200 relative overflow-hidden">
                          {post.image_url ? (
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
                      </div>
                      
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <div className="text-xs text-gray-400 mb-2">
                          {new Date(post.created_at).toLocaleDateString('hr-BA')}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition line-clamp-2">
                          {post.title}
                        </h3>
                        {/* ČISTI TEKST */}
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                          {cleanNewsContent}
                        </p>
                        
                        <Link href={`/blog/${post.slug || post.id}`} className="text-sm font-bold text-[#be1e2d] hover:underline mt-auto">
                          Pročitaj više
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                  Trenutno nema novosti.
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

      {/* --- SEKCIJA PROJEKAT --- */}
      {latestProject && (
        <RevealSection>
            <section className="py-16 md:py-20 bg-white border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex justify-between items-center mb-8 md:mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-8 md:h-10 bg-green-500 rounded-full"></div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Projekat</h2>
                        </div>
                        <Link href="/blog" className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 text-sm md:text-base">
                             Svi projekti <FaArrowRight />
                        </Link>
                    </div>

                    <div className="group relative bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <div className="grid md:grid-cols-2 h-full">
                            {/* Slika Projekta */}
                            <div className="relative h-56 sm:h-72 md:h-auto overflow-hidden min-h-[300px]">
                                {latestProject.image_url ? (
                                    <Image 
                                        src={latestProject.image_url} 
                                        alt={latestProject.title} 
                                        fill 
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <FaHandshake className="text-6xl text-gray-300"/>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-green-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Aktuelno
                                </div>
                            </div>

                            {/* Detalji Projekta */}
                            <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-white">
                                <div className="text-xs md:text-sm text-gray-500 mb-2 font-medium">
                                    {new Date(latestProject.created_at).toLocaleDateString('hr-BA')}
                                </div>
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition">
                                    {latestProject.title}
                                </h3>
                                {/* ČISTI TEKST */}
                                <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed line-clamp-3 md:line-clamp-4">
                                    {cleanProjectDesc || "Pogledajte detalje o našem najnovijem humanitarnom projektu..."}
                                </p>
                                
                                {/* OVDJE JE PROMJENA LINKA */}
                                <Link 
                                    href={`/blog/${latestProject.id}`} 
                                    className="inline-flex items-center text-white bg-[#be1e2d] hover:bg-red-700 font-bold py-3 px-5 md:py-3 md:px-6 rounded-lg transition-colors w-fit shadow-md text-sm md:text-base"
                                >
                                    Saznaj više o akciji <FaArrowRight className="ml-2"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </RevealSection>
      )}

     {/* 6. DVA NAČINA ZA POMOĆ */}
      <RevealSection>
        <section className="relative w-full py-12 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl">
              
              {/* LIJEVA STRANA */}
              <div className="relative bg-slate-900 text-white p-8 md:p-12 lg:p-20 flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-xs font-bold uppercase tracking-wide mb-6">
                    <FaUsers className="mr-2" /> Uključi se
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 leading-tight">
                    Želite dati doprinos radu Fondacije?
                  </h2>
                  
                  <div className="space-y-6 text-gray-300 text-base md:text-lg mb-10">
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
                    className="inline-flex items-center justify-center bg-white text-slate-900 text-base font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl md:rounded-2xl shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1"
                  >
                    Postani Volonter <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>

              {/* DESNA STRANA */}
              <div className="relative bg-[#be1e2d] text-white p-8 md:p-12 lg:p-20 flex flex-col justify-center overflow-hidden">
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-800/50 border border-red-400 text-white text-xs font-bold uppercase tracking-wide mb-6">
                    <FaHandHoldingHeart className="mr-2" /> Podrži nas
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 leading-tight">
                    Vaša donacija mijenja živote.
                  </h2>

                  <p className="text-red-100 text-base md:text-lg mb-10 leading-relaxed">
                    Vaša donacija omogućava Fondaciji da unaprijedi realizaciju svojih misija. Svaka marka ide direktno onima kojima je najpotrebnija.
                  </p>

                  <Link
                    href="/donacije"
                    className="inline-flex items-center justify-center bg-slate-900 text-white text-base font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl md:rounded-2xl shadow-xl hover:bg-slate-800 transition transform hover:-translate-y-1 border border-slate-800"
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