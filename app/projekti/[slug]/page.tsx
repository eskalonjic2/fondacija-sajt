"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  gallery_urls?: string[];
  slug: string;
  type: string;
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = use(params);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const isId = !isNaN(Number(slug));

      let query = supabase.from("posts").select("*");

      if (isId) {
        query = query.eq("id", slug);
      } else {
        query = query.eq("slug", slug);
      }

      const { data, error } = await query.limit(1);

      if (error) {
          console.error("Error fetching project:", error);
      } else if (data && data.length > 0) {
          setPost(data[0] as Post);
      } else {
          setPost(null);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  // --- FUNKCIJE ZA LIGHTBOX ---
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto'; 
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post?.gallery_urls && lightboxIndex !== null) {
      setLightboxIndex((prev) => 
        prev === post.gallery_urls!.length - 1 ? 0 : prev! + 1
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post?.gallery_urls && lightboxIndex !== null) {
      setLightboxIndex((prev) => 
        prev === 0 ? post.gallery_urls!.length - 1 : prev! - 1
      );
    }
  };

  // Tastatura navigacija
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
         if (post?.gallery_urls) setLightboxIndex((prev) => (prev === post.gallery_urls!.length - 1 ? 0 : prev! + 1));
      }
      if (e.key === "ArrowLeft") {
         if (post?.gallery_urls) setLightboxIndex((prev) => (prev === 0 ? post.gallery_urls!.length - 1 : prev! - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, post]);


  if (loading) return <div className="min-h-screen flex justify-center items-center text-gray-500">Učitavanje...</div>;
  
  if (!post) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Projekat nije pronađen</h1>
        <p className="text-gray-500 mb-6">Moguće je da je stranica premještena ili obrisana.</p>
        <Link href="/projekti" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Nazad na sve projekte
        </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* HEADER SLIKA - DIZAJN KAO NA BLOGU */}
      {post.image_url ? (
        <div className="container mx-auto px-4 mt-6">
            <div className="relative w-full h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-lg">
            <Image 
                src={post.image_url} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                <Link href="/projekti" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm transition font-medium">
                    <FaArrowLeft className="mr-2" /> Nazad na projekte
                </Link>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm">
                        Projekat
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-200 font-medium">
                        <FaCalendar /> {new Date(post.created_at).toLocaleDateString("bs-BA")}
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-sm max-w-4xl">{post.title}</h1>
            </div>
            </div>
        </div>
      ) : (
        // Fallback ako nema slike (Zadržan čisti stil)
        <div className="container mx-auto px-6 max-w-4xl pt-16 pb-6">
             <Link href="/projekti" className="text-blue-600 hover:underline mb-6 inline-flex items-center font-medium">
                <FaArrowLeft className="mr-2" /> Nazad
             </Link>
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
             <div className="flex items-center gap-4 text-gray-500">
                <span className="flex items-center gap-2">
                    <FaCalendar /> {new Date(post.created_at).toLocaleDateString("bs-BA")}
                </span>
             </div>
             <div className="h-px bg-gray-200 w-full mt-8"></div>
        </div>
      )}

      {/* GLAVNI SADRŽAJ */}
      <div className="container mx-auto px-6 mt-12 max-w-4xl">
         
         {/* Tekst */}
         <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap mb-12 prose-a:text-blue-600 hover:prose-a:text-blue-800">
            {post.content}
         </div>

         {/* GALERIJA SEKCIJA */}
         {post.gallery_urls && post.gallery_urls.length > 0 && (
           <div className="border-t pt-12">
             <h3 className="text-2xl font-bold mb-8 text-gray-900">Galerija projekta</h3>
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {post.gallery_urls.map((url, index) => (
                 <div 
                   key={index} 
                   className="relative h-48 cursor-pointer group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100"
                   onClick={() => openLightbox(index)}
                 >
                   <Image 
                     src={url} 
                     alt={`Gallery ${index}`} 
                     fill 
                     className="object-cover group-hover:scale-110 transition duration-700" 
                   />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                     <span className="text-white opacity-0 group-hover:opacity-100 font-bold text-4xl drop-shadow-lg transform scale-50 group-hover:scale-100 transition duration-300">+</span>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxIndex !== null && post.gallery_urls && (
        <div 
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-200"
            onClick={closeLightbox} 
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50 bg-white/10 rounded-full hover:bg-white/20 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 text-white/70 hover:text-white p-3 z-50 hover:bg-white/10 rounded-full transition hidden md:block"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
             </svg>
          </button>

          <div className="relative w-full h-full p-4 md:p-10 flex items-center justify-center pointer-events-none">
            <div className="relative pointer-events-auto max-w-full max-h-full">
                <Image 
                    src={post.gallery_urls[lightboxIndex]} 
                    alt="Full screen" 
                    width={1920} 
                    height={1080}
                    className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
                    quality={100}
                    priority 
                />
            </div>
            
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/80 font-medium text-sm tracking-widest uppercase">
                {lightboxIndex + 1} / {post.gallery_urls.length}
            </div>
          </div>

          <button 
            onClick={nextImage}
            className="absolute right-4 text-white/70 hover:text-white p-3 z-50 hover:bg-white/10 rounded-full transition hidden md:block"
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