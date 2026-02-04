"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // Ako je null, kreiramo novi. Ako ima ID, editujemo.
  const router = useRouter();

  // Form podaci
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    // Slike ne resetujemo ovdje jer su fajlovi, ali korisnik može dodati nove
    window.scrollTo(0, 0); // Vrati na vrh stranice
  }

  // Funkcija za brisanje
  async function handleDelete(id: string) {
    if (!confirm("Da li ste sigurni da želite obrisati ovaj post?")) return;
    
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert("Greška pri brisanju: " + error.message);
    else {
      alert("Post obrisan!");
      fetchPosts(); // Osvježi listu
    }
  }

  // Reset forme
  function resetForm() {
    setEditingId(null);
    setTitle("");
    setContent("");
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

      // 3. Upisivanje u bazu (INSERT ili UPDATE)
      if (editingId) {
        // --- EDIT MODE ---
        const updates: any = {
          title,
          content,
          updated_at: new Date().toISOString(),
        };
        // Ako je nova slika uploadovana, ažuriraj i nju
        if (coverUrl) updates.image_url = coverUrl;
        // Ako su nove slike galerije dodane, dodaj ih u niz (ili zamijeni, ovdje dodajemo na postojeće)
        // Napomena: Za naprednije brisanje pojedinačnih slika iz galerije trebao bi nam kompleksniji UI.
        // Ovdje ćemo samo PREGAZITI galeriju ako su dodane nove slike, ili ostaviti staru ako nisu.
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
            image_url: coverUrl,
            gallery_urls: galleryUrls, // Ovo je nova kolona
          },
        ]);
        if (error) throw error;
        alert("Novi post objavljen!");
      }

      resetForm();
      fetchPosts(); // Osvježi listu dole
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
              {editingId ? "Uredi Post" : "Admin Panel - Dodaj Novosti"}
            </h1>
            {editingId && (
              <button onClick={resetForm} className="text-sm text-gray-500 hover:text-red-500">
                Otkaži uređenje
              </button>
            )}
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
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
                  multiple // Ovo dozvoljava više slika odjednom
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
              {loading ? "Radim..." : editingId ? "Sačuvaj Izmjene" : "Objavi Novost"}
            </button>
          </form>
        </div>

        {/* LISTA POSTOJEĆIH POSTOVA */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Postojeće Novosti</h2>
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
                    <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString("hr-HR")}</p>
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
            
            {posts.length === 0 && <p className="text-center text-gray-500">Nema objavljenih novosti.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}