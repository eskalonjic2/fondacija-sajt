import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

// Ova linija kaže Next.js-u: "Ne pamti podatke zauvijek, osvježi ih svaki put kad neko otvori stranicu."
export const revalidate = 0;

export default async function Blog() {
  // 1. Ovdje šaljemo zahtjev bazi
  // "Daj mi sve (*) iz tabele 'posts'"
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*');

  // Ako se desi greška, ispiši je u terminalu (gdje ti se vrti server)
  if (error) {
    console.error("Greška pri učitavanju:", error);
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Naš Blog</h1>

      {/* 2. Provjera: Ako nema postova ili je lista prazna */}
      {!posts || posts.length === 0 ? (
        <p className="text-center text-gray-500">Trenutno nema novosti.</p>
      ) : (
        /* 3. Ako ima postova, prikazi ih u mrezu (grid) */
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg shadow-sm p-6 hover:shadow-md transition bg-white">
              <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
              
              {/* Prikazujemo samo prvih 100 slova teksta da ne bude predugo */}
              <p className="text-gray-600 mb-4">
                {post.content.length > 100 
                  ? post.content.substring(0, 100) + "..." 
                  : post.content}
              </p>
              
              <Link href={`/blog/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                Pročitaj više →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}