"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMicrophone, FaYoutube, FaNewspaper, FaProjectDiagram, FaTimes } from "react-icons/fa";

// --- IMAGEKIT IMPORTI ---
import { ImageKitProvider, IKUpload } from "imagekitio-next";

// --- TEXT EDITOR IMPORTI ---
import 'react-quill-new/dist/quill.snow.css'; 
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }], 
    ['bold', 'italic', 'underline', 'strike'], 
    [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
    ['link'], 
    ['clean'] 
  ],
};

// Konstante za ImageKit (učitavaju se iz env fajla)
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

interface Post {
  id: number;
  title: string;
  content: string;
  type: string;
  image_url: string | null;
  gallery_urls: string[] | null;
  created_at: string;
  video_duration?: string | null;
  guest_name?: string | null;
  youtube_link?: string | null;
  slug: string;
}

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const router = useRouter();

  // Osnovni podaci
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [type, setType] = useState("news");
  
  // PODCAST SPECIFIČNI PODACI
  const [videoDuration, setVideoDuration] = useState("");
  const [guestName, setGuestName] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  // Slike State
  const [coverUrl, setCoverUrl] = useState<string | null>(null); 
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]); 
  
  // Loading stanja za upload slika
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  // --- IMAGEKIT AUTENTIFIKATOR ---
  const authenticator = async () => {
    try {
      const response = await fetch("/api/auth/imagekit");
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${errorText}`);
      }
  
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      throw new Error(`Auth failed: ${error.message}`);
    }
  };

  async function fetchPosts() {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (data) {
        setPosts(data as Post[]);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  // --- HANDLERS ZA SLIKE (ImageKit) ---

  const onCoverUploadSuccess = (res: any) => {
    console.log("Cover uploaded:", res);
    setCoverUrl(res.url); // Čuvamo ImageKit URL
    setIsUploadingCover(false);
  };

  const onCoverUploadError = (err: any) => {
    console.error("Cover upload error:", err);
    alert("Greška pri uploadu naslovne slike.");
    setIsUploadingCover(false);
  };

  const onGalleryUploadSuccess = (res: any) => {
    console.log("Gallery item uploaded:", res);
    setGalleryUrls((prev) => [...prev, res.url]); // Dodajemo novi URL u niz
    setIsUploadingGallery(false);
  };

  const removeGalleryImage = (urlToRemove: string) => {
    setGalleryUrls(prev => prev.filter(url => url !== urlToRemove));
  };

  const cleanHtml = (html: string) => {
    if (!html) return "";
    let clean = html;
    clean = clean.replace(/&nbsp;/g, ' ');
    clean = clean.replace(/style="[^"]*"/g, "");
    return clean;
  };

  // --- EDIT ---
  function handleEdit(post: Post) {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content); 
    setType(post.type || "news");
    
    // Postavljamo postojeće URL-ove
    setCoverUrl(post.image_url);
    setGalleryUrls(post.gallery_urls || []);
    
    setVideoDuration(post.video_duration || "");
    setGuestName(post.guest_name || "");
    setYoutubeLink(post.youtube_link || "");

    window.scrollTo(0, 0); 
  }

  // --- RESET ---
  function resetForm() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setType("news"); 
    setCoverUrl(null);
    setGalleryUrls([]);
    setVideoDuration("");
    setGuestName("");
    setYoutubeLink("");
  }

  // --- DELETE ---
  async function handleDelete(id: number) {
    if (!confirm("Da li ste sigurni da želite obrisati ovaj post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert("Greška: " + error.message);
    else {
      alert("Obrisano!");
      fetchPosts(); 
    }
  }

  // --- PUBLISH / UPDATE ---
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content || content === '<p><br></p>') {
        alert("Molimo unesite tekst objave.");
        return;
    }

    setLoading(true);

    try {
      const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      const cleanContentText = cleanHtml(content); 

      const postData = {
        title,
        content: cleanContentText,
        type: type, 
        slug,
        image_url: coverUrl, // Koristimo URL od ImageKit-a
        gallery_urls: type === 'podcast' ? [] : galleryUrls, 
        updated_at: new Date().toISOString(),
        video_duration: type === 'podcast' ? videoDuration : null,
        guest_name: type === 'podcast' ? guestName : null,
        youtube_link: type === 'podcast' ? youtubeLink : null,
      };

      if (editingId) {
        const { error } = await supabase.from("posts").update(postData).eq("id", editingId);
        if (error) throw error;
        alert("Izmjene sačuvane!");
      } else {
        const { error } = await supabase.from("posts").insert([postData]);
        if (error) throw error;
        alert(type === 'podcast' ? "Podcast uspješno objavljen!" : "Novost uspješno objavljena!");
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
      
      {/* IMAGEKIT PROVIDER */}
      <ImageKitProvider 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator}
      >
        <div className="max-w-5xl mx-auto">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
               <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition flex items-center gap-2">
                 <span>Odjavi se</span>
               </button>
          </div>
          
          {/* FORMA */}
          <div className="bg-white p-8 rounded-xl shadow-lg mb-10 border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {editingId ? "Uredi Sadržaj" : "Kreiraj Novi Sadržaj"}
              </h2>
              {editingId && (
                <button onClick={resetForm} className="text-sm text-red-500 hover:text-red-700 font-medium">✕ Otkaži</button>
              )}
            </div>

            <form onSubmit={handlePublish} className="space-y-8">
              
              {/* 1. TIP OBJAVE */}
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Izaberite tip objave:</label>
                  <div className="flex flex-wrap gap-6">
                      <label className="flex items-center cursor-pointer group p-3 bg-white rounded border hover:border-blue-400 transition">
                          <input type="radio" name="postType" value="news" checked={type === "news"} onChange={(e) => setType(e.target.value)} className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700 font-medium group-hover:text-blue-600 flex items-center gap-2">
                             <FaNewspaper /> Novost
                          </span>
                      </label>
                      <label className="flex items-center cursor-pointer group p-3 bg-white rounded border hover:border-green-400 transition">
                          <input type="radio" name="postType" value="project" checked={type === "project"} onChange={(e) => setType(e.target.value)} className="w-5 h-5 text-green-600 focus:ring-green-500" />
                          <span className="ml-2 text-gray-700 font-medium group-hover:text-green-600 flex items-center gap-2">
                             <FaProjectDiagram /> Projekat
                          </span>
                      </label>
                      <label className="flex items-center cursor-pointer group p-3 bg-white rounded border hover:border-purple-400 transition">
                          <input type="radio" name="postType" value="podcast" checked={type === "podcast"} onChange={(e) => setType(e.target.value)} className="w-5 h-5 text-purple-600 focus:ring-purple-500" />
                          <span className="ml-2 text-gray-700 font-medium group-hover:text-purple-600 flex items-center gap-2">
                               <FaMicrophone /> Podcast
                          </span>
                      </label>
                  </div>
              </div>

              {/* 2. OSNOVNI PODACI */}
              <div className="grid md:grid-cols-2 gap-8">
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                          {type === 'podcast' ? "Naziv Epizode" : "Naslov"}
                      </label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Unesite naslov..." required />
                  </div>

                  {/* Cover Slika - IMAGEKIT */}
                  <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          {type === 'podcast' ? "Thumbnail Epizode (Slika)" : "Naslovna Slika"}
                        </label>
                        
                        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 bg-blue-50 text-center relative">
                            {isUploadingCover && <p className="text-blue-600 font-bold animate-pulse">Upload u toku...</p>}
                            
                            <IKUpload
                              fileName="cover-image.jpg"
                              tags={["cover", type]}
                              useUniqueFileName={true}
                              validateFile={(file: any) => file.size < 5000000} // Max 5MB
                              onUploadStart={() => setIsUploadingCover(true)}
                              onSuccess={onCoverUploadSuccess}
                              onError={onCoverUploadError}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                            />
                        </div>
                        
                        {coverUrl && (
                          <div className="mt-2 relative h-40 w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                             <Image src={coverUrl} alt="Cover preview" fill className="object-cover" />
                             <button 
                               type="button" 
                               onClick={() => setCoverUrl(null)}
                               className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 z-10"
                             >
                               <FaTimes size={12}/>
                             </button>
                          </div>
                        )}
                  </div>
              </div>

              {/* 3. PODCAST POLJA */}
              {type === 'podcast' && (
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 grid md:grid-cols-3 gap-6 animate-fadeIn">
                      <div className="md:col-span-1">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Trajanje</label>
                          <input type="text" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="45" />
                      </div>
                      <div className="md:col-span-1">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Ime Gosta</label>
                          <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Ime Prezime" />
                      </div>
                      <div className="md:col-span-1">
                          <label className="block text-sm font-bold text-gray-700 mb-2">YouTube Link</label>
                          <div className="relative">
                              <FaYoutube className="absolute left-3 top-3.5 text-red-600 text-xl" />
                              <input type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="https://youtube.com/..." />
                          </div>
                      </div>
                  </div>
              )}

              {/* 4. GALERIJA - IMAGEKIT (MULTIPLE UPLOAD FIX) */}
              {type !== 'podcast' && (
                  <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-bold text-gray-700">Galerija slika</label>
                        {isUploadingGallery && <span className="text-green-600 font-bold animate-pulse text-sm">Upload slika...</span>}
                      </div>
                      
                      {/* Upload dugme za galeriju */}
                      <IKUpload
                          fileName="gallery-image.jpg"
                          tags={["gallery", type]}
                          useUniqueFileName={true}
                          multiple={true} // OVO OMOGUĆAVA VIŠE SLIKA ODJEDNOM
                          validateFile={(file: any) => file.size < 5000000} // Max 5MB
                          onUploadStart={() => setIsUploadingGallery(true)}
                          onSuccess={onGalleryUploadSuccess}
                          onError={(err: any) => {
                            console.error("Gallery upload error:", err);
                            setIsUploadingGallery(false);
                            alert("Greška pri uploadu slike u galeriju.");
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
                      />
                      
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {galleryUrls.map((url, idx) => (
                              <div key={idx} className="relative h-24 w-full rounded-lg overflow-hidden group border border-gray-200 shadow-sm bg-white">
                                  <Image src={url} alt="Gallery item" fill className="object-cover" />
                                  <button type="button" onClick={() => removeGalleryImage(url)} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition hover:bg-red-700">
                                    <FaTimes />
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* 5. OPIS */}
              <div className="mb-12">
                <label className="block text-sm font-bold text-gray-700 mb-2">Opis / Tekst</label>
                <div className="bg-white h-80 pb-12 rounded-lg overflow-hidden border border-gray-200">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    modules={modules}
                    className="h-full"
                    placeholder={type === 'podcast' ? "Kratak opis o čemu se radi..." : "Pišite ovdje, uredite tekst kao u Wordu..."}
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading || isUploadingCover || isUploadingGallery}
                className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-0.5 flex justify-center items-center gap-2 ${
                  (loading || isUploadingCover || isUploadingGallery) ? "bg-gray-400 cursor-not-allowed" 
                  : editingId ? "bg-green-600 hover:bg-green-700" 
                  : type === 'podcast' ? "bg-purple-600 hover:bg-purple-700" 
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Obrađujem..." : editingId ? "Sačuvaj Izmjene" : (type === 'podcast' ? "Objavi Podcast" : type === 'project' ? "Objavi Projekat" : "Objavi Novost")}
              </button>
            </form>
          </div>

          {/* LISTA POSTOVA */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
                 <h2 className="text-xl font-bold text-gray-800">Svi unosi (Baza podataka)</h2>
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
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                              ${post.type === 'project' ? 'bg-green-100 text-green-800' 
                              : post.type === 'podcast' ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'}`}>
                              {post.type === 'podcast' ? 'Podcast' : post.type === 'project' ? 'Projekat' : 'Novost'}
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
      </ImageKitProvider>
    </div>
  );
}