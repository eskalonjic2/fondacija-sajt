'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0b1220]/90 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-wide text-white">
              DULJEVIĆ
            </span>
            <span className="text-xs tracking-widest text-teal-400 uppercase">
              Humanitarna fondacija
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link href="/onama" className="text-gray-300 hover:text-white transition">
              O nama
            </Link>
            <Link href="/tim" className="text-gray-300 hover:text-white transition">
              Naš tim
            </Link>
            <Link href="/projekti" className="text-gray-300 hover:text-white transition">
              Projekti
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition">
              Novosti
            </Link>
            <Link href="/kontakt" className="text-gray-300 hover:text-white transition">
              Kontakt
            </Link>
          </nav>

          {/* CTA + MOBILE */}
          <div className="flex items-center gap-4">
            <Link
              href="/donacije"
              className="hidden sm:inline-flex rounded-full bg-teal-500 px-6 py-2.5
                         text-sm font-semibold text-black
                         hover:bg-teal-400 transition shadow-lg"
            >
              Doniraj
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden rounded-lg p-2 text-gray-300 hover:bg-white/10"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#0b1220] border-t border-white/10">
          <nav className="px-6 py-6 space-y-4 text-sm">
            {[
              ['O nama', '/onama'],
              ['Naš tim', '/tim'],
              ['Projekti', '/projekti'],
              ['Novosti', '/blog'],
              ['Kontakt', '/kontakt'],
            ].map(([name, href]) => (
              <Link
                key={name}
                href={href}
                onClick={() => setOpen(false)}
                className="block text-gray-300 hover:text-white transition"
              >
                {name}
              </Link>
            ))}

            <Link
              href="/donacije"
              className="block text-center rounded-full bg-teal-500 py-2.5
                         font-semibold text-black hover:bg-teal-400 transition"
            >
              Doniraj
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
