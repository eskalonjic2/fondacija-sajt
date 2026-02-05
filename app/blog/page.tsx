"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import RevealSection from "../components/RevealSection"; // Ubacujemo animaciju

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  slug?: string; // Dodali smo slug
  type?: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      // Ovdje se dešava filtriranje 👇
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .neq("type", "project") // <--- BITNO: Daj sve što NIJE projekat (znači novosti + stari postovi)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-500">Učitavanje novosti...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Naslov sekcija */}
        <RevealSection>
            <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Naš Blog
            </h1>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded my-4"></div>
            <p className="mt-4 text-xl text-gray-600">
                Najnovije vijesti i aktivnosti Fondacije Duljević
            </p>
            </div>
        </RevealSection>

        {/* Grid sistem za kartice */}
        <RevealSection>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col border border-gray-100">
                
                {/* SLIKA */}
                <div className="h-52 w-full overflow-hidden bg-gray-100 relative">
                    {post.image_url ? (
                    <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    ) : (
                        // Placeholder ako nema slike
                        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200">
                            <span className="text-sm font-medium">Novost</span>
                        </div>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-xs text-blue-600 font-bold uppercase tracking-wide">
                        {new Date(post.created_at).toLocaleDateString("bs-BA")}
                        </div>
                        <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded-full font-bold">
                            NOVOST
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
                    {post.content}
                    </p>

                    {/* Link koristi slug ako postoji, inače ID */}
                    <Link 
                    href={`/blog/${post.slug || post.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center mt-auto group"
                    >
                    Pročitaj više 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </RevealSection>

        {posts.length === 0 && (
          <div className="text-center py-20">
             <p className="text-gray-500 text-lg">Trenutno nema novosti.</p>
          </div>
        )}
      </div>
    </div>
  );
}