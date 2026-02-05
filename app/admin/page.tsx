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
  const [type, setType] = useState("news");
  
  // Slike State
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null); // Za prikaz prije upload-a

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]); // Novi fajlovi za upload
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]); // Stare slike iz baze

  // Učitaj sve postove kad se stranica otvori
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
  }

  // --- LOGOUT FUNKCIJA ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  // --- HANDLERS ZA SLIKE ---
  
  // 1. Naslovna slika
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file)); // Prikaži odmah
    }
  };

  // 2. Galerija (Multiple)
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...newFiles]); // Dodaj nove na postojeće odabrane
    }
  };

  // Brisanje slike iz PREGLEDA (prije nego se sačuva)
  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Brisanje POSTOJEĆE slike iz galerije (dok uređujemo)
  const removeExistingImage = (urlToRemove: string) => {
    setExistingGalleryUrls(prev => prev.filter(url => url !== urlToRemove));
  };

  // Funkcija za popunjavanje forme kad klikneš "Uredi"
  function handleEdit(post: any) {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setType(post.type || "news");
    
    // Postavi postojeće slike
    setCoverPreview(post.image_url); // Prikazi staru naslovnu
    setExistingGalleryUrls(post.gallery_urls || []); // Učitaj stare slike galerije
    
    // Resetuj nove fajlove
    setCoverImage(null);
    setGalleryFiles([]);
    
    window.scrollTo(0, 0); 
  }

  // Reset forme
  function resetForm() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setType("news");
    setCoverImage(null);
    setCoverPreview(null);
    setGalleryFiles([]);
    setExistingGalleryUrls([]);
  }

  // Funkcija za brisanje posta
  async function handleDelete(id: string) {
    if (!confirm("Da li ste sigurni da želite obrisati ovaj post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert("Greška: " + error.message);
    else {
      alert("Obrisano!");
      fetchPosts(); 
    }
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalCoverUrl = coverPreview; // Ako ne mijenjamo, ostaje stara (ili null)
      let finalGalleryUrls = [...existingGalleryUrls]; // Počinjemo sa onim što već imamo

      // 1. Upload Naslovne slike (SAMO ako je odabrana nova)
      if (coverImage) {
        const fileName = `cover-${Date.now()}-${coverImage.name}`;
        const { error } = await supabase.storage.from("images").upload(fileName, coverImage);
        if (error) throw error;
        
        const { data: publicData } = supabase.storage.from("images").getPublicUrl(fileName);
        finalCoverUrl = publicData.publicUrl;
      }

      // 2. Upload Novih slika za Galeriju
      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const fileName = `gallery-${Date.now()}-${file.name}`;
          const { error } = await supabase.storage.from("images").upload(fileName, file);
          if (!error) {
            const { data: publicData } = supabase.storage.from("images").getPublicUrl(fileName);
            finalGalleryUrls.push(publicData.publicUrl);
          }
        }
      }

      const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

      // 3. Upisivanje u bazu
      const postData = {
        title,
        content,
        type,
        slug,
        image_url: finalCoverUrl,
        gallery_urls: finalGalleryUrls, // Ovo sada sadrži i stare i nove slike
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        // UPDATE
        const { error } = await supabase.from("posts").update(postData).eq("id", editingId);
        if (error) throw error;
        alert("Izmjene sačuvane!");
      } else {
        // INSERT
        const { error } = await supabase.from("posts").insert([postData]);
        if (error) throw error;
        alert("Uspješno objavljeno!");
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
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SA LOGOUT DUGMETOM */}
        <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
             <button 
                onClick={handleLogout}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition flex items-center gap-2"
             >
                <span>Odjavi se</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
             </button>
        </div>
        
        {/* FORMA ZA UNOS / EDIT */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10 border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {editingId ? "Uredi Post" : "Kreiraj Novi Sadržaj"}
            </h2>
            {editingId && (
              <button onClick={resetForm} className="text-sm text-red-500 hover:text-red-700 font-medium">
                ✕ Otkaži uređenje
              </button>
            )}
          </div>

          <form onSubmit={handlePublish} className="space-y-8">
            
            {/* TIP OBJAVE */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <label className="block text-sm font-bold text-gray-700 mb-3">Tip Objave:</label>
                <div className="flex gap-8">
                    <label className="flex items-center cursor-pointer group">
                        <input type="radio" name="postType" value="news" checked={type === "news"} onChange={(e) => setType(e.target.value)} className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700 font-medium group-hover:text-blue-600">Novost</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                        <input type="radio" name="postType" value="project" checked={type === "project"} onChange={(e) => setType(e.target.value)} className="w-5 h-5 text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-gray-700 font-medium group-hover:text-green-600">Projekat</span>
                    </label>
                </div>
            </div>

            {/* NASLOV */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Naslov</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Unesite naslov..." required />
            </div>

            {/* SEKCIJA ZA SLIKE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* 1. NASLOVNA SLIKA */}
              <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                <label className="block text-sm font-bold text-gray-700 mb-2">Naslovna Slika (Jedna)</label>
                <input type="file" onChange={handleCoverChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
                
                {/* Preview Naslovne */}
                {coverPreview && (
                    <div className="mt-4 relative h-48 w-full rounded-lg overflow-hidden border border-gray-200">
                        <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                    </div>
                )}
              </div>
              
              {/* 2. GALERIJA */}
              <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                <label className="block text-sm font-bold text-gray-700 mb-2">Galerija (Više slika)</label>
                <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleGalleryChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer" 
                />

                {/* Preview Galerije (Mreža) */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {/* Postojeće slike (iz baze) */}
                    {existingGalleryUrls.map((url, idx) => (
                        <div key={`old-${idx}`} className="relative h-20 w-full rounded overflow-hidden group border border-gray-200">
                            <Image src={url} alt="Gallery item" fill className="object-cover" />
                            <button type="button" onClick={() => removeExistingImage(url)} className="absolute top-0 right-0 bg-red-600 text-white w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition">✕</button>
                        </div>
                    ))}
                    
                    {/* Nove slike (spremne za upload) */}
                    {galleryFiles.map((file, idx) => (
                        <div key={`new-${idx}`} className="relative h-20 w-full rounded overflow-hidden group border-2 border-green-500">
                            <Image src={URL.createObjectURL(file)} alt="New upload" fill className="object-cover" />
                            <button type="button" onClick={() => removeGalleryFile(idx)} className="absolute top-0 right-0 bg-red-600 text-white w-6 h-6 flex items-center justify-center text-xs">✕</button>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Zeleni okvir označava nove slike spremne za upload.</p>
              </div>
            </div>

            {/* SADRŽAJ */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Sadržaj Teksta</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg h-48 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Pišite ovdje..." required />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-0.5 ${
                loading ? "bg-gray-400 cursor-not-allowed" : editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                  <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Obrađujem...
                  </span>
              ) : editingId ? "Sačuvaj Izmjene" : (type === 'project' ? "Objavi Projekat" : "Objavi Novost")}
            </button>
          </form>
        </div>

        {/* LISTA POSTOVA */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
             <h2 className="text-xl font-bold text-gray-800">Svi unosi (Novosti i Projekti)</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-200">
                     {post.image_url ? (
                        <Image src={post.image_url} alt="thumb" fill className="object-cover" />
                     ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                     )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{post.title}</h3>
                    <div className="flex items-center gap-3 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${post.type === 'project' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {post.type === 'project' ? 'Projekat' : 'Novost'}
                        </span>
                        <span className="text-gray-500">{new Date(post.created_at).toLocaleDateString("bs-BA")}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(post)} className="px-4 py-2 bg-white border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 font-medium transition shadow-sm">
                    Uredi
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition shadow-sm">
                    Obriši
                  </button>
                </div>
              </div>
            ))}
            
            {posts.length === 0 && <div className="p-8 text-center text-gray-500">Još uvijek nema objava.</div>}
          </div>
        </div>

      </div>
    </div>
  );
}