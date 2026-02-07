"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import RevealSection from "../components/RevealSection"; 
import { FaMicrophone, FaNewspaper } from "react-icons/fa"; 

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string | null;
  slug?: string | null;
  type?: string; // 'news', 'podcast', 'project'
}

// ---------------------------------------------------------
// POMOĆNA FUNKCIJA: Čisti HTML tagove za ljepši prikaz uvoda
// ---------------------------------------------------------
function stripHtml(html: string) {
  if (!html) return "";
  // 1. Ukloni sve HTML tagove
  let text = html.replace(/<[^>]*>?/gm, ' ');
  // 2. Zamijeni &nbsp; sa običnim razmakom
  text = text.replace(/&nbsp;/g, ' ');
  // 3. Sredi višak razmaka
  return text.replace(/\s+/g, ' ').trim();
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .neq("type", "project") // Daj sve osim projekata
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data as Post[]);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="animate-pulse text-blue-600 font-semibold text-xl">Učitavanje novosti...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Naslov sekcija */}
        <RevealSection>
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    Naš Blog
                </h1>
                <div className="h-1 w-24 bg-blue-600 mx-auto rounded my-4"></div>
                <p className="mt-4 text-xl text-gray-600">
                    Aktuelnosti, podcast epizode i vijesti iz Fondacije
                </p>
            </div>
        </RevealSection>

        {/* Grid sistem za kartice */}
        <RevealSection>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
                // Određujemo stil na osnovu tipa posta
                const isPodcast = post.type === 'podcast';
                const badgeColor = isPodcast ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700';
                const badgeIcon = isPodcast ? <FaMicrophone className="mr-1 text-xs" /> : <FaNewspaper className="mr-1 text-xs" />;
                const label = isPodcast ? 'PODCAST' : 'NOVOST';
                
                // PRIPREMA ČISTOG TEKSTA
                const cleanContent = stripHtml(post.content || "");

                return (
                    <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border border-gray-100 h-full group">
                    
                    {/* SLIKA */}
                    <Link href={`/blog/${post.slug || post.id}`} className="block overflow-hidden relative h-52 w-full bg-gray-200">
                        {post.image_url ? (
                        <img 
                            src={post.image_url} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <span className="text-sm font-medium">Nema slike</span>
                            </div>
                        )}
                        
                        {/* Overlay na hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </Link>

                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide flex items-center mt-1">
                                {new Date(post.created_at).toLocaleDateString("bs-BA")}
                            </div>
                            
                            {/* Oznaka tipa (Podcast ili Novost) */}
                            <span className={`${badgeColor} text-[10px] px-3 py-1 rounded-full font-bold flex items-center shadow-sm`}>
                                {badgeIcon} {label}
                            </span>
                        </div>
                        
                        <Link href={`/blog/${post.slug || post.id}`} className="block group-hover:text-blue-600 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                                {post.title}
                            </h3>
                        </Link>
                        
                        {/* OVDJE JE IZMJENA: Prikazujemo očišćen tekst */}
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
                            {cleanContent}
                        </p>

                        {/* Link Dugme */}
                        <Link 
                            href={`/blog/${post.slug || post.id}`} 
                            className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center mt-auto w-max py-2"
                        >
                            Pročitaj više 
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                    </div>
                );
            })}
            </div>
        </RevealSection>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg shadow mt-10">
             <p className="text-gray-500 text-lg">Trenutno nema novosti.</p>
          </div>
        )}
      </div>
    </div>
  );
}