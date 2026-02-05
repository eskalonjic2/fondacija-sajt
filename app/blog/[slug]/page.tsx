"use client";

import { useEffect, useState, use } from "react"; // <--- 1. Dodan 'use'
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
// import RevealSection from "../../components/RevealSection"; 

// Definicija tipa
interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  gallery_urls?: string[]; // Niz slika za galeriju
  slug: string;
  type: string;
}

// 2. params je sada Promise
export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  
  // 3. Otpakujemo slug iz Promise-a
  const { slug } = use(params);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  // --- NOVO: STATE ZA LIGHTBOX (UVEĆAVANJE SLIKA) ---
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      // Dohvati post na osnovu slug-a
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug) // <--- 4. Koristimo 'slug' varijablu
        .single();

      if (data) setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [slug]); // <--- 5. Dependency je sada 'slug'

  // --- NOVO: FUNKCIJE ZA LISTANJE SLIKA ---
  
  // Otvori galeriju na određenoj slici
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    // Onemogući skrolanje pozadine dok je galerija otvorena
    document.body.style.overflow = 'hidden'; 
  };

  // Zatvori galeriju
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto'; // Vrati skrolanje
  };

  // Sljedeća slika
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Spriječi zatvaranje na klik
    if (post?.gallery_urls && lightboxIndex !== null) {
      setLightboxIndex((prev) => 
        prev === post.gallery_urls!.length - 1 ? 0 : prev! + 1
      );
    }
  };

  // Prethodna slika
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post?.gallery_urls && lightboxIndex !== null) {
      setLightboxIndex((prev) => 
        prev === 0 ? post.gallery_urls!.length - 1 : prev! - 1
      );
    }
  };

  // Upravljanje tastaturom (Esc, Lijevo, Desno)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
          if (post?.gallery_urls) {
             setLightboxIndex((prev) => (prev === post.gallery_urls!.length - 1 ? 0 : prev! + 1));
          }
      }
      if (e.key === "ArrowLeft") {
          if (post?.gallery_urls) {
             setLightboxIndex((prev) => (prev === 0 ? post.gallery_urls!.length - 1 : prev! - 1));
          }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, post]);


  if (loading) return <div className="text-center py-20">Učitavanje...</div>;
  if (!post) return <div className="text-center py-20">Post nije pronađen.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* GLAVNA SLIKA I NASLOV (Tvoj postojeći kod) */}
      <div className="max-w-4xl mx-auto py-10 px-4">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Nazad na sve novosti</Link>
        
        <p className="text-gray-500 text-sm mb-2">
            {new Date(post.created_at).toLocaleDateString("hr-HR")}
        </p>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

        {post.image_url && (
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image src={post.image_url} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-lg text-gray-700 max-w-none mb-12 whitespace-pre-wrap">
          {post.content}
        </div>

        {/* --- GALERIJA SEKCIJA --- */}
        {post.gallery_urls && post.gallery_urls.length > 0 && (
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Galerija</h3>
            
            {/* Grid malih slika (Thumbnails) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {post.gallery_urls.map((url, index) => (
                <div 
                  key={index} 
                  className="relative h-40 cursor-pointer group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition"
                  onClick={() => openLightbox(index)}
                >
                  <Image 
                    src={url} 
                    alt={`Gallery ${index}`} 
                    fill 
                    className="object-cover group-hover:scale-110 transition duration-500" 
                  />
                  {/* Ikona lupa na hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-bold text-2xl">+</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL (ISKACE PREKO SVEGA) --- */}
      {lightboxIndex !== null && post.gallery_urls && (
        <div 
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox} // Klik bilo gdje zatvara
        >
          {/* Dugme za zatvaranje (X) */}
          <button 
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2 z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Dugme Lijevo (<) */}
          <button 
            onClick={prevImage}
            className="absolute left-2 md:left-8 text-white/70 hover:text-white p-4 z-50 hover:bg-white/10 rounded-full transition"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
             </svg>
          </button>

          {/* Glavna uvećana slika */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4">
            <Image 
                src={post.gallery_urls[lightboxIndex]} 
                alt="Full screen" 
                width={1920} 
                height={1080}
                className="max-w-full max-h-full object-contain select-none"
                quality={100}
                priority // Učitaj odmah jer je velika
            />
            
            {/* Brojač slika (npr. 1 / 5) */}
            <div className="absolute bottom-5 left-0 right-0 text-center text-white/80 font-medium">
                Slika {lightboxIndex + 1} od {post.gallery_urls.length}
            </div>
          </div>

          {/* Dugme Desno (>) */}
          <button 
            onClick={nextImage}
            className="absolute right-2 md:right-8 text-white/70 hover:text-white p-4 z-50 hover:bg-white/10 rounded-full transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

        </div>
      )}

    </div>
  );
}