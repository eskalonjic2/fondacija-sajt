import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", slug)
    .single();

  if (error || !post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Naslovna Slika */}
        {post.image_url && (
          <div className="relative h-64 sm:h-96 w-full">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block text-sm">
            ← Nazad na sve novosti
          </Link>

          <p className="text-gray-500 text-sm mb-2">
            {new Date(post.created_at).toLocaleDateString("hr-HR")}
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
            {post.content}
          </div>

          {/* --- GALERIJA SLIKA --- */}
          {post.gallery_urls && post.gallery_urls.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Galerija</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.gallery_urls.map((url: string, index: number) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                    <Image 
                      src={url} 
                      alt={`Galerija slika ${index + 1}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </article>
    </div>
  );
}