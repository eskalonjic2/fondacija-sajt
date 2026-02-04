"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string; // Opcionalno polje za sliku
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      // Ovdje se dešava magija sortiranja 👇
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false }); // Najnoviji na vrh

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-20">Učitavanje novosti...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Naš Blog
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Najnovije vijesti i aktivnosti Fondacije Duljević
          </p>
        </div>

        {/* Grid sistem za kartice */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              
              {/* SLIKA (Prikazuje se samo ako postoji link) */}
              {post.image_url && (
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-blue-600 font-semibold mb-2">
                  {new Date(post.created_at).toLocaleDateString("bs-BA")}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {post.content}
                </p>

                <Link 
                  href={`/blog/${post.id}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-auto"
                >
                  Pročitaj više &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Trenutno nema novosti.</p>
        )}
      </div>
    </div>
  );
}