"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from 'next/image';
import { FaPlay, FaYoutube, FaMicrophone, FaHeadphones } from 'react-icons/fa';

export default function Podcast() {
  const [featured, setFeatured] = useState(null);
  const [pastEpisodes, setPastEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  async function fetchPodcasts() {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("type", "podcast")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setFeatured(data[0]);
        setPastEpisodes(data.slice(1));
      }
    } catch (error) {
      console.error("Greška pri učitavanju podcasta:", error);
    } finally {
      setLoading(false);
    }
  }

  // FIX: Ručno formatiranje datuma u oblik "DD.MM.YYYY"
  // Ovo rješava problem sa čudnim prikazom poput "2026 M02 6"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Rezultat: 06.02.2026
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. HERO SEKCIJA */}
      <div className="relative bg-slate-900 py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[80px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold uppercase tracking-wide mb-6 backdrop-blur-sm">
                <FaMicrophone className="mr-2" /> Glas Fondacije
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Razgovori koji <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">vrijede.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Iskrene priče, stvarni ljudi i razgovori o temama koje su važne za našu zajednicu i budućnost.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* 2. PLATFORME LINKOVI */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-16 border border-slate-100">
            <p className="text-slate-600 font-bold text-lg">Slušajte nas na:</p>
            <div className="flex flex-wrap justify-center gap-4">
                <a href="https://youtube.com/@pesterpanoramaretrospektiv5074?si=YX5wR7u0Uh9FxkEF" target="_blank" className="flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition shadow-lg shadow-red-600/20 hover:shadow-xl hover:-translate-y-1">
                    <FaYoutube className="text-white text-xl" /> YouTube
                </a>
            </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-20 text-slate-500">Učitavanje epizoda...</div>
        )}

     {/* 3. NOVA EPIZODA (FEATURED) */}
{!loading && featured && (
    <div className="mb-24 animate-fadeIn">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
            <span className="w-2 h-8 bg-blue-600 rounded-full mr-4"></span>
            Nova epizoda
        </h2>
        
        <div className="group relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:shadow-blue-900/20">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10"></div>
            
            {/* IZMJENA OVDJE: Dodan overflow-hidden da slika ne curi */}
            <div className="grid lg:grid-cols-2 gap-0 relative z-20">
                
                {/* LIJEVA STRANA: TEKST */}
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                    <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4">
                        {formatDate(featured.created_at)}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                        {featured.title}
                    </h3>
                    <p className="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-3">
                        {featured.content}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                        {featured.guest_name && (
                            <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                                <span className="text-slate-400 text-sm block">Gost:</span>
                                <span className="text-white font-semibold">{featured.guest_name}</span>
                            </div>
                        )}
                        {featured.video_duration && (
                             <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                                <span className="text-slate-400 text-sm block">Trajanje:</span>
                                <span className="text-white font-semibold">{featured.video_duration} min</span>
                             </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <a href={featured.youtube_link} target="_blank" className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all hover:scale-110 shadow-lg shadow-blue-600/30">
                            <FaPlay className="ml-1 text-2xl" />
                        </a>
                        <span className="text-white font-bold text-lg">Gledaj odmah</span>
                    </div>
                </div>

                {/* DESNA STRANA: SLIKA */}
                {/* IZMJENA OVDJE: Prilagođene visine za mobilni/tablet */}
                <div className="relative w-full h-64 sm:h-80 lg:h-auto lg:min-h-full order-1 lg:order-2">
                    {featured.image_url ? (
                        <Image 
                            src={featured.image_url} 
                            alt={featured.title}
                            fill
                            className="object-cover object-top lg:object-center"
                        />
                    ) : (
                        // Placeholder kad nema slike - ljepši dizajn
                        <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-500 border-b lg:border-b-0 lg:border-l border-slate-700">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2 opacity-50">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <span className="text-sm font-medium">Nema slike</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
)}

        {/* 4. PRETHODNE EPIZODE (GRID) */}
        {!loading && pastEpisodes.length > 0 && (
            <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center">
                    <span className="w-2 h-8 bg-slate-200 rounded-full mr-4"></span>
                    Prethodne epizode
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pastEpisodes.map((episode) => (
                        <div key={episode.id} className="bg-white rounded-[2rem] p-4 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            
                            {/* Slika kartice */}
                            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-5 bg-gray-100">
                                {episode.image_url ? (
                                    <Image 
                                        src={episode.image_url} 
                                        alt={episode.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">Nema slike</div>
                                )}
                                
                                {episode.video_duration && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-sm">
                                        {/* FIX: Dodano 'min' */}
                                        <FaHeadphones className="mr-2 text-blue-600" /> {episode.video_duration} min
                                    </div>
                                )}
                            </div>

                            {/* Tekst kartice */}
                            <div className="px-2 pb-4">
                                <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">
                                    {formatDate(episode.created_at)}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                                    {episode.title}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                                    {episode.content}
                                </p>
                                
                                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                    <div className="text-sm font-semibold text-slate-700">
                                        {episode.guest_name && (
                                            <>Gost: <span className="text-slate-900">{episode.guest_name}</span></>
                                        )}
                                    </div>
                                    <a href={episode.youtube_link} target="_blank" className="text-blue-600 hover:text-blue-800 text-2xl transition-transform hover:scale-110">
                                        <FaYoutube />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Ako nema podcasta uopšte */}
        {!loading && !featured && (
            <div className="text-center text-slate-500 py-20">Još uvijek nema objavljenih epizoda.</div>
        )}

      </div>
    </div>
  );
}