'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 1. GLAVNI KONTEJNER (Sticky + Glassmorphism)
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 2. LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight hover:opacity-80 transition">
              FONDACIJA
            </Link>
          </div>

          {/* 3. DESKTOP MENI (Sakriven na mobitelu) */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink href="/">Početna</NavLink>
            <NavLink href="/onama">O nama</NavLink>
            <NavLink href="/tim">Naš Tim</NavLink>
            <NavLink href="/blog">Novosti</NavLink>
            <NavLink href="/kontakt">Kontakt</NavLink>
            
            {/* Doniraj dugme */}
            <Link 
              href="/donacije" 
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Doniraj ❤️
            </Link>
          </div>

          {/* 4. MOBILNO DUGME (Hamburger) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <span className="sr-only">Otvori meni</span>
              {/* Ikonica se mijenja ako je meni otvoren (X) ili zatvoren (3 crtice) */}
              {!isOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 5. MOBILNI MENI (Ono što iskoči kad klikneš dugme) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Početna</MobileNavLink>
            <MobileNavLink href="/onama" onClick={() => setIsOpen(false)}>O nama</MobileNavLink>
            <MobileNavLink href="/tim" onClick={() => setIsOpen(false)}>Naš Tim</MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>Novosti</MobileNavLink>
            <MobileNavLink href="/kontakt" onClick={() => setIsOpen(false)}>Kontakt</MobileNavLink>
            
            <Link 
              href="/donacije" 
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-md active:bg-blue-800"
            >
              Doniraj ❤️
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// Pomoćna komponenta za ljepše linkove na Desktopu
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
      {children}
    </Link>
  );
}

// Pomoćna komponenta za mobilne linkove
function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="block w-full text-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
    >
      {children}
    </Link>
  );
}