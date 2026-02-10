'use client';

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMicrophone, FaYoutube, FaNewspaper, FaProjectDiagram, FaTimes, FaCrop, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";

// --- IMAGEKIT & CROP IMPORTI ---
import { ImageKitProvider } from "imagekitio-next";
import Cropper from "react-easy-crop";
import type { Point, Area } from "react-easy-crop";

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

// Konstante
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

// --- POMOĆNA FUNKCIJA ZA KREIRANJE IZREZANE SLIKE ---
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('No 2d context');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg', 0.95); // Ovdje možeš smanjiti na 0.80 ako hoćeš još manju sliku
  });
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); 
    image.src = url;
  });

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
  
  // Podcast
  const [videoDuration, setVideoDuration] = useState("");
  const [guestName, setGuestName] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  // Slike State
  const [coverUrl, setCoverUrl] = useState<string | null>(null); 
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]); 
  
  // Loading stanja
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  // --- STATE ZA CROP (IZREZIVANJE) ---
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  // --- AUTHENTICATOR (Uzima ključeve sa servera) ---
  const authenticator = async () => {
    try {
      const response = await fetch("/api/auth/imagekit");
      if (!response.ok) throw new Error(`Request failed: ${await response.text()}`);
      return await response.json(); // { signature, expire, token }
    } catch (error: any) {
      throw new Error(`Auth failed: ${error.message}`);
    }
  };

  // --- MANUAL UPLOAD FUNCTION ---
  const uploadToImageKit = async (file: File | Blob, fileName: string, tags: string[]) => {
    const auth = await authenticator();
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("publicKey", publicKey || "");
    formData.append("signature", auth.signature);
    formData.append("expire", auth.expire);
    formData.append("token", auth.token);
    formData.append("tags", tags.join(","));
    formData.append("useUniqueFileName", "true");

    const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    return await res.json();
  };

  // --- 1. COVER IMAGE LOGIKA SA CROPOM ---
  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setCropImageSrc(reader.result as string);
        setIsCropModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    if (!cropImageSrc || !croppedAreaPixels) return;

    try {
      setIsUploadingCover(true);
      setIsCropModalOpen(false);

      // 1. Napravi izrezanu sliku (Blob)
      const croppedBlob = await getCroppedImg(cropImageSrc, croppedAreaPixels);
      
      // 2. Uploaduj Blob na ImageKit
      const res = await uploadToImageKit(croppedBlob, "cover_cropped.jpg", ["cover", type]);
      
      setCoverUrl(res.url);
      console.log("Cover uploaded:", res);
    } catch (e) {
      console.error(e);
      alert("Greška pri uploadu slike.");
    } finally {
      setIsUploadingCover(false);
      setCropImageSrc(null);
    }
  };

  // --- 2. GALLERY LOGIKA ---
  const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsUploadingGallery(true);
    const files = Array.from(e.target.files);

    try {
      const uploadPromises = files.map(file => 
        uploadToImageKit(file, "gallery_img.jpg", ["gallery", type])
      );

      const results = await Promise.all(uploadPromises);
      const newUrls = results.map(res => res.url);
      setGalleryUrls(prev => [...prev, ...newUrls]);
      
    } catch (error) {
      console.error("Gallery upload error:", error);
      alert("Neke slike se nisu uspjele uploadovati.");
    } finally {
      setIsUploadingGallery(false);
      e.target.value = ""; 
    }
  };

  const removeGalleryImage = (urlToRemove: string) => {
    setGalleryUrls(prev => prev.filter(url => url !== urlToRemove));
  };

  // --- OSTALE FUNKCIJE ---
  async function fetchPosts() {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data as Post[]);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const cleanHtml = (html: string) => {
    if (!html) return "";
    let clean = html.replace(/&nbsp;/g, ' ').replace(/style="[^"]*"/g, "");
    return clean;
  };

  function handleEdit(post: Post) {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content); 
    setType(post.type || "news");
    setCoverUrl(post.image_url);
    setGalleryUrls(post.gallery_urls || []);
    setVideoDuration(post.video_duration || "");
    setGuestName(post.guest_name || "");
    setYoutubeLink(post.youtube_link || "");
    window.scrollTo(0, 0); 
  }

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

  async function handleDelete(id: number) {
    if (!confirm("Sigurno obrisati?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert("Greška: " + error.message);
    else { fetchPosts(); alert("Obrisano!"); }
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || content === '<p><br></p>') { alert("Unesite tekst."); return; }
    setLoading(true);
    try {
      const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      const cleanContentText = cleanHtml(content); 

      const postData = {
        title, content: cleanContentText, type, slug,
        image_url: coverUrl,
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
        alert("Objavljeno!");
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
      
      {/* --- CROP MODAL --- */}
      {isCropModalOpen && cropImageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl h-[80vh] flex flex-col relative">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FaCrop /> Izreži sliku</h3>
            
            <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Cropper
                image={cropImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9} // OVDJE MIJENJAŠ FORMAT SLIKE
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="flex items-center gap-4">
               <span className="text-sm font-bold">Zoom:</span>
               <input 
                 type="range" min={1} max={3} step={0.1} 
                 value={zoom} onChange={(e) => setZoom(Number(e.target.value))}
                 className="flex-1"
               />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setIsCropModalOpen(false); setCropImageSrc(null); }} className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300 font-bold">
                Odustani
              </button>
              <button onClick={handleCropSave} className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-bold">
                Sačuvaj i Uploaduj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLAVNI SADRŽAJ */}
      <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <div className="max-w-5xl mx-auto">
          
          <div className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
               <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded">Odjavi se</button>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg mb-10 border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-700">{editingId ? "Uredi Sadržaj" : "Kreiraj Novi Sadržaj"}</h2>
              {editingId && <button onClick={resetForm} className="text-red-500 font-bold">✕ Otkaži</button>}
            </div>

            <form onSubmit={handlePublish} className="space-y-8">
              
              {/* TIP OBJAVE */}
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Izaberite tip objave:</label>
                  <div className="flex flex-wrap gap-6">
                      <label className="flex items-center gap-2 cursor-pointer p-3 bg-white rounded border hover:border-blue-400">
                          <input type="radio" name="postType" value="news" checked={type === "news"} onChange={(e) => setType(e.target.value)} />
                          <FaNewspaper /> Novost
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer p-3 bg-white rounded border hover:border-green-400">
                          <input type="radio" name="postType" value="project" checked={type === "project"} onChange={(e) => setType(e.target.value)} />
                          <FaProjectDiagram /> Projekat
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer p-3 bg-white rounded border hover:border-purple-400">
                          <input type="radio" name="postType" value="podcast" checked={type === "podcast"} onChange={(e) => setType(e.target.value)} />
                          <FaMicrophone /> Podcast
                      </label>
                  </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{type === 'podcast' ? "Naziv Epizode" : "Naslov"}</label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg" required />
                  </div>

                  {/* --- COVER IMAGE (CUSTOM INPUT + CROP) --- */}
                  <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Naslovna Slika</label>
                        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 bg-blue-50 text-center relative">
                            {isUploadingCover ? (
                                <p className="text-blue-600 font-bold flex items-center justify-center gap-2">
                                  <FaSpinner className="animate-spin" /> Uploadovanje...
                                </p>
                            ) : (
                              <label className="cursor-pointer flex flex-col items-center justify-center gap-2 p-4 hover:bg-blue-100 rounded transition">
                                <FaCloudUploadAlt size={30} className="text-blue-500"/>
                                <span className="text-sm font-bold text-blue-600">Klikni za odabir i rezanje</span>
                                {/* SAKRIVENI INPUT */}
                                <input type="file" accept="image/*" onChange={handleCoverSelect} className="hidden" />
                              </label>
                            )}
                            
                            {coverUrl && (
                              <div className="mt-4 relative h-40 w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                                  {/* --- OVDJE JE DODAT UNOPTIMIZED ZA VERCEL --- */}
                                  <Image 
                                    src={coverUrl} 
                                    alt="Cover preview" 
                                    fill 
                                    className="object-cover" 
                                    unoptimized={true} 
                                  />
                                  <button type="button" onClick={() => setCoverUrl(null)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 shadow-md hover:bg-red-700">
                                    <FaTimes size={14}/>
                                  </button>
                              </div>
                            )}
                        </div>
                  </div>
              </div>

              {/* PODCAST POLJA */}
              {type === 'podcast' && (
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 grid md:grid-cols-3 gap-6">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Trajanje</label>
                          <input type="text" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Gost</label>
                          <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">YouTube Link</label>
                          <input type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} className="w-full p-3 border rounded-lg" />
                      </div>
                  </div>
              )}

              {/* --- GALERIJA (CUSTOM MULTIPLE UPLOAD) --- */}
              {type !== 'podcast' && (
                  <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-bold text-gray-700">Galerija slika (Više odjednom)</label>
                        {isUploadingGallery && <span className="text-green-600 font-bold flex items-center gap-2"><FaSpinner className="animate-spin"/> Upload...</span>}
                      </div>
                      
                      <label className="block w-full p-4 border-2 border-dashed border-green-200 bg-green-50 rounded-lg text-center cursor-pointer hover:bg-green-100 transition">
                         <span className="text-green-700 font-bold">Dodaj slike u galeriju</span>
                         <input 
                           type="file" 
                           multiple 
                           accept="image/*" 
                           onChange={handleGallerySelect} 
                           className="hidden" 
                           disabled={isUploadingGallery}
                         />
                      </label>
                      
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {galleryUrls.map((url, idx) => (
                              <div key={idx} className="relative h-24 w-full rounded-lg overflow-hidden group border border-gray-200 shadow-sm bg-white">
                                  {/* --- OVDJE JE DODAT UNOPTIMIZED ZA VERCEL --- */}
                                  <Image 
                                    src={url} 
                                    alt="Gallery item" 
                                    fill 
                                    className="object-cover" 
                                    unoptimized={true} 
                                  />
                                  <button type="button" onClick={() => removeGalleryImage(url)} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition hover:bg-red-700">
                                    <FaTimes />
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              <div className="mb-12">
                <label className="block text-sm font-bold text-gray-700 mb-2">Opis / Tekst</label>
                <div className="bg-white h-80 pb-12 rounded-lg border border-gray-200">
                  <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} className="h-full" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || isUploadingCover || isUploadingGallery}
                className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md transition ${
                  (loading || isUploadingCover || isUploadingGallery) ? "bg-gray-400 cursor-not-allowed" 
                  : editingId ? "bg-green-600 hover:bg-green-700" 
                  : type === 'podcast' ? "bg-purple-600 hover:bg-purple-700" 
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Obrađujem..." : editingId ? "Sačuvaj Izmjene" : "Objavi"}
              </button>
            </form>
          </div>

          {/* LISTA POSTOVA */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50"><h2 className="text-xl font-bold text-gray-800">Svi unosi</h2></div>
            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border">
                        {post.image_url ? (
                          /* --- OVDJE JE DODAT UNOPTIMIZED ZA VERCEL --- */
                          <Image 
                            src={post.image_url} 
                            alt="thumb" 
                            fill 
                            className="object-cover" 
                            unoptimized={true} 
                          />
                        ) : (
                          <div className="text-xs text-gray-400 flex items-center justify-center h-full">No Image</div>
                        )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{post.title}</h3>
                      <div className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString("bs-BA")}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(post)} className="px-4 py-2 border border-yellow-300 text-yellow-700 rounded hover:bg-yellow-50">Uredi</button>
                    <button onClick={() => handleDelete(post.id)} className="px-4 py-2 border border-red-200 text-red-600 rounded hover:bg-red-50">Obriši</button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <div className="p-8 text-center text-gray-500">Nema objava.</div>}
            </div>
          </div>

        </div>
      </ImageKitProvider>
    </div>
  );
}