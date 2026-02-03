import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Lijevo: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Fondacija
            </Link>
          </div>

          {/* Sredina: Linkovi (SADA UVIJEK VIDLJIVI) */}
          <div className="flex space-x-4 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
              Početna
            </Link>
            
            <Link href="/onama" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
              O nama
            </Link>
            
            <Link href="/tim" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
              Tim
            </Link>
            
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
              Blog
            </Link>
            
            <Link href="/kontakt" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
              Kontakt
            </Link>
          </div>

          {/* Desno: Doniraj */}
          <div>
            <Link href="/donacije" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
              Doniraj ❤️
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}