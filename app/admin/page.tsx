'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter(); // Ovo mora biti na vrhu!
  
  // Stanja za formu
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🛡️ ZAŠTITA: Provjera da li je korisnik ulogovan
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Ako nema korisnika, šutni ga na login
        router.push('/login');
      }
    };
    checkUser();
  }, [router]);

  // Funkcija koja automatski pravi slug dok kucaš naslov
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Pretvori u mala slova i zamijeni razmake crticama
    setSlug(newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // 1. Šaljemo podatke u bazu
    const { error } = await supabase
      .from('posts')
      .insert([
        { title, content, slug }
      ]);

    if (error) {
      setMessage('❌ Greška: ' + error.message);
      setLoading(false);
    } else {
      setMessage('✅ Članak uspješno objavljen!');
      // Resetuj formu
      setTitle('');
      setContent('');
      setSlug('');
      setLoading(false);
      // Osvježi podatke da vidimo promjenu
      router.refresh(); 
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard ✍️</h1>
        <button 
          onClick={async () => { 
            await supabase.auth.signOut(); 
            router.push('/login'); 
          }}
          className="text-red-600 hover:text-red-800 text-sm font-semibold border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition"
        >
          Odjavi se
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Dodaj novu vijest</h2>

        {message && (
          <div className={`p-4 mb-4 rounded ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleCreatePost} className="space-y-4">
          
          {/* Naslov */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Naslov</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Npr. Humanitarna akcija u Sarajevu"
              required
            />
          </div>

          {/* Slug (Link) - Automatski se popunjava, ali možeš i ručno */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link (Slug)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50 text-gray-500"
              placeholder="humanitarna-akcija-sarajevo"
              required
            />
          </div>

          {/* Sadržaj */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tekst članka</label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Piši ovdje..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-medium disabled:opacity-50"
          >
            {loading ? 'Objavljujem...' : 'Objavi članak 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
}