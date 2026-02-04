import Link from "next/link";
import { supabase } from "@/lib/supabaseClient"; // Koristimo tvoj postojeći klijent
import { FaArrowRight, FaHandHoldingHeart, FaRegNewspaper, FaUsers, FaHandshake } from "react-icons/fa";

// Funkcija za dobijanje 3 poslednje novosti
async function getLatestNews() {
  const { data: posts, error } = await supabase
    .from("posts") // <--- OVDJE SMO PROMIJENILI IZ "blog" U "posts"
    .select("*")
    .order("created_at", { ascending: false }) // Najnovije prve
    .limit(3); // Samo 3 komada

  if (error) {
    console.error("Greška pri učitavanju novosti:", error);
    return [];
  }
  
  return posts || [];
}

export default async function Home() {
  // Povlačimo podatke
  const novosti = await getLatestNews();

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
     {/* 1. HERO SEKCIJA */}
      <section className="relative bg-white pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Tekst */}
            <div className="text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wide mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Vizija Budućnosti
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                Stvaramo prilike <br/>
                <span className="text-blue-900">za vaš uspjeh.</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Posvećeni smo osnaživanju mladih, žena i preduzetnika kroz obrazovanje i podršku. 
                Naša misija je izgradnja zajednice jednakih šansi u kojoj svako može ostvariti svoj puni potencijal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/onama"
                  className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-slate-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition duration-300"
                >
                  Upoznajte našu misiju <FaArrowRight className="ml-2 text-sm" />
                </Link>
              </div>
            </div>

            {/* Slika */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative group">
                 {/* Ovdje možeš staviti pravi <img> tag */}
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
                    <span className="text-xl font-bold">SLIKA FONDACIJE</span>
                 </div>
                 <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#be1e2d] rounded-full flex items-center justify-center text-white font-bold z-10 shadow-xl">
                    <div className="text-center text-xs leading-tight">
                        Od<br/><span className="text-lg">2020.</span><br/>godine
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATISTIKA */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Porodica Pomoćeno</dt>
              <dd className="mt-2 text-4xl font-black text-blue-900">500+</dd>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Obroka Podijeljeno</dt>
              <dd className="mt-2 text-4xl font-black text-blue-900">10k+</dd>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Transparentnost</dt>
              <dd className="mt-2 text-4xl font-black text-blue-900">100%</dd>
            </div>
          </div>
        </div>
      </section>

   {/* 3. NAŠ TIM (Ljudi iza misije) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* TEKSTUALNI DIO */}
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

            {/* VIZUELNI DIO (Kolaž slika) */}
            <div className="relative">
              {/* Dekorativna pozadina */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#be1e2d]/10 rounded-full blur-3xl"></div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {/* Slika 1 (Placeholder) */}
                <div className="bg-slate-100 rounded-2xl h-48 lg:h-56 w-full flex items-center justify-center overflow-hidden shadow-sm border border-slate-200 mt-8">
                   {/* <img src="/tim1.jpg" alt="Član tima" className="w-full h-full object-cover" /> */}
                   <FaUsers className="text-slate-300 text-4xl" />
                </div>
                
                {/* Slika 2 (Placeholder) */}
                <div className="bg-slate-100 rounded-2xl h-48 lg:h-56 w-full flex items-center justify-center overflow-hidden shadow-sm border border-slate-200">
                   {/* <img src="/tim2.jpg" alt="Član tima" className="w-full h-full object-cover" /> */}
                   <FaUsers className="text-slate-300 text-4xl" />
                </div>

                {/* Slika 3 (Placeholder) */}
                <div className="bg-slate-100 rounded-2xl h-48 lg:h-56 w-full flex items-center justify-center overflow-hidden shadow-sm border border-slate-200 mt-4 lg:mt-0">
                   {/* <img src="/tim3.jpg" alt="Član tima" className="w-full h-full object-cover" /> */}
                   <FaUsers className="text-slate-300 text-4xl" />
                </div>

                {/* Slika 4 (Placeholder) */}
                <div className="bg-slate-100 rounded-2xl h-48 lg:h-56 w-full flex items-center justify-center overflow-hidden shadow-sm border border-slate-200 -mt-8">
                   {/* <img src="/tim4.jpg" alt="Član tima" className="w-full h-full object-cover" /> */}
                   <FaUsers className="text-slate-300 text-4xl" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PARTNERI */}
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
                Kroz partnerske inicijative možemo ostvariti veći uticaj na društvo, proširujući mogućnosti za obrazovanje, 
                preduzetništvo i inovacije.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Vaša saradnja omogućava zajednički rad na projektima koji ne samo da obogaćuju zajednicu, već podstiču 
                ekonomski rast, stvaranje novih prilika i jačanje međusobnih veza unutar društva.
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

      {/* 5. POSLEDNJE 3 NOVOSTI IZ BAZE */}
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
                        <img 
                          src={post.image_url} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                     ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <FaRegNewspaper className="text-4xl opacity-50" />
                        </div>
                     )}
                     
                     {post.category && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-gray-800 uppercase">
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
                      {/* Prikazujemo samo kratki isječak teksta */}
                      {post.content ? post.content.substring(0, 100) + "..." : post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug || post.id}`} className="text-sm font-bold text-[#be1e2d] hover:underline mt-auto">
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
             <Link href="/novosti" className="text-blue-600 font-bold hover:text-blue-800 inline-flex items-center gap-2">
                Sve novosti <FaArrowRight />
             </Link>
          </div>
        </div>
      </section>

     {/* 6. DVA NAČINA ZA POMOĆ (2 u 1 Sekcija) */}
      <section className="relative w-full">
        <div className="grid md:grid-cols-2">
          
          {/* LIJEVA STRANA: VOLONTIRANJE I DOGAĐAJI (Plava) */}
          <div className="relative bg-slate-900 text-white p-12 lg:p-24 flex flex-col justify-center overflow-hidden">
            {/* Dekorativni krug u pozadini */}
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
                  Postanite volonter i aktivno učestvujte u našim projektima, pružajući neprocenjiv doprinos ostvarivanju naših ciljeva.
                </p>
                <p>
                  <strong className="text-white block mb-1">Podržite naše događaje:</strong> 
                  Učestvujte u radionicama, seminarima i događajima koji omogućavaju povezivanje i sticanje novih vještina.
                </p>
              </div>

              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center bg-white text-slate-900 text-base font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1"
              >
                Postani Volonter <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          {/* DESNA STRANA: DONACIJE (Crvena) */}
          <div className="relative bg-[#be1e2d] text-white p-12 lg:p-24 flex flex-col justify-center overflow-hidden">
            {/* Dekorativni uzorak */}
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-800/50 border border-red-400 text-white text-xs font-bold uppercase tracking-wide mb-6">
                <FaHandHoldingHeart className="mr-2" /> Podrži nas
              </div>

              <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                Vaša donacija mijenja živote.
              </h2>

              <p className="text-red-100 text-lg mb-10 leading-relaxed">
                Vaša donacija omogućava Fondaciji da unaprijedi realizaciju svojih misija, 
                stvarajući dugoročne promjene u zajednici i podržavajući razvoj mladih, 
                žena i preduzetnika. Svaka marka ide direktno onima kojima je najpotrebnija.
              </p>

              <Link
                href="/donacije"
                className="inline-flex items-center justify-center bg-slate-900 text-white text-base font-bold py-4 px-8 rounded-lg shadow-xl hover:bg-slate-800 transition transform hover:-translate-y-1 border border-slate-800"
              >
                DONIRAJ SADA 
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}