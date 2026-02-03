import { supabase } from "../../../lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 0;

// 1. Ovako se definiše tip za Next.js 15 (params je sada Promise)
interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  // 2. OVDJE JE PROMJENA: Moramo staviti 'await' ispred params
  const { slug } = await params;

  console.log("🔍 TRAŽIM ČLANAK SA SLUGOM:", slug);

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    console.log("❌ Nije nađeno:", error?.message);
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/blog" className="text-gray-500 hover:text-blue-600 mb-6 inline-block">
        ← Nazad na sve članke
      </Link>

      <article>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="text-gray-400 text-sm mb-8 border-b pb-4">
          Objavljeno: {new Date(post.created_at).toLocaleDateString('bs-BA')}
        </div>

        <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
}