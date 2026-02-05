"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  // Form podaci
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("news"); // <--- NOVO: Default je 'news'
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  // Učitaj sve postove kad se stranica otvori
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
  }

  // Funkcija za popunjavanje forme kad klikneš "Uredi"
  function handleEdit(post: any) {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setType(post.type || "news"); // <--- NOVO: Učitaj tip posta
    window.scrollTo(0, 0); 
  }

  // Funkcija za brisanje
  async function handleDelete(id: string) {
    if (!confirm("Da li ste sigurni da želite obrisati ovaj post?")) return;
    
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert("Greška pri brisanju: " + error.message);
    else {
      alert("Post obrisan!");
      fetchPosts(); 
    }
  }

  // Reset forme
  function resetForm() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setType("news"); // <--- NOVO: Resetuj na news
    setCoverImage(null);
    setGalleryImages(null);
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverUrl = null;
      let galleryUrls: string[] = [];

      // 1. Upload Naslovne slike (ako je izabrana nova)
      if (coverImage) {
        const fileName = `${Date.now()}-${coverImage.name}`;
        const { data, error } = await supabase.storage.from("images").upload(fileName, coverImage);
        if (error) throw error;
        
        const { data: publicData } = supabase.storage.from("images").getPublicUrl(fileName);
        coverUrl = publicData.publicUrl;
      }

      // 2. Upload Galerije (ako ima slika)
      if (galleryImages) {
        for (let i = 0; i < galleryImages.length; i++) {
          const file = galleryImages[i];
          const fileName = `gallery-${Date.now()}-${file.name}`;
          const { error } = await supabase.storage.from("images").upload(fileName, file);
          if (!error) {
            const { data: publicData } = supabase.storage.from("images").getPublicUrl(fileName);
            galleryUrls.push(publicData.publicUrl);
          }
        }
      }

      // NOVO: Generisanje slug-a (URL-a) od naslova
      const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

      // 3. Upisivanje u bazu (INSERT ili UPDATE)
      if (editingId) {
        // --- EDIT MODE ---
        const updates: any = {
          title,
          content,
          type, // <--- NOVO: Ažuriraj tip
          updated_at: new Date().toISOString(),
        };
        // Ako je nova slika uploadovana, ažuriraj i nju
        if (coverUrl) updates.image_url = coverUrl;
        // Ako su nove slike galerije dodane, dodaj ih
        if (galleryUrls.length > 0) updates.gallery_urls = galleryUrls;

        const { error } = await supabase.from("posts").update(updates).eq("id", editingId);
        if (error) throw error;
        alert("Post uspješno izmijenjen!");

      } else {
        // --- CREATE MODE ---
        const { error } = await supabase.from("posts").insert([
          {
            title,
            content,
            type, // <--- NOVO: Spremi tip
            slug, // <--- NOVO: Spremi slug
            image_url: coverUrl,
            gallery_urls: galleryUrls, 
          },
        ]);
        if (error) throw error;
        alert(type === 'project' ? "Projekat uspješno objavljen!" : "Novost uspješno objavljena!");
      }

      resetForm();
      fetchPosts(); 
    } catch (error: any) {
      alert("Greška: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* FORMA ZA UNOS / EDIT */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {editingId ? "Uredi Post" : "Admin Panel - Dodaj Sadržaj"}
            </h1>
            {editingId && (
              <button onClick={resetForm} className="text-sm text-gray-500 hover:text-red-500">
                Otkaži uređenje
              </button>
            )}
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            
            {/* NOVO: ODABIR TIPA (NOVOST ILI PROJEKAT) */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">Tip Objave:</label>
                <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="radio" 
                            name="postType" 
                            value="news" 
                            checked={type === "news"} 
                            onChange={(e) => setType(e.target.value)}
                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700 font-medium">Novost (Blog)</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="radio" 
                            name="postType" 
                            value="project" 
                            checked={type === "project"} 
                            onChange={(e) => setType(e.target.value)}
                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-gray-700 font-medium">Projekat</span>
                    </label>
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Naslov</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Naslovna Slika</label>
                <input
                  type="file"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Galerija (Dodatne slike)</label>
                <input
                  type="file"
                  multiple 
                  onChange={(e) => setGalleryImages(e.target.files)}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sadržaj</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md h-40"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-bold transition ${
                loading ? "bg-gray-400" : editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Radim..." : editingId ? "Sačuvaj Izmjene" : (type === 'project' ? "Objavi Projekat" : "Objavi Novost")}
            </button>
          </form>
        </div>

        {/* LISTA POSTOJEĆIH POSTOVA */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Svi unosi (Novosti i Projekti)</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  {post.image_url && (
                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                       <Image src={post.image_url} alt="tumb" fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">{post.title}</h3>
                    <div className="flex gap-2 text-xs mt-1">
                        <span className="text-gray-500">{new Date(post.created_at).toLocaleDateString("hr-HR")}</span>
                        {/* NOVO: PRIKAZ TIPA */}
                        <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${post.type === 'project' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {post.type === 'project' ? 'PROJEKAT' : 'NOVOST'}
                        </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm font-medium"
                  >
                    Uredi
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                  >
                    Obriši
                  </button>
                </div>
              </div>
            ))}
            
            {posts.length === 0 && <p className="text-center text-gray-500">Nema objavljenih stavki.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}