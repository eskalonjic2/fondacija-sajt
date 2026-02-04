"use client"; // <--- OVO JE KLJUČNO! Mora biti prva linija.

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "O nama", href: "/onama" },
    { name: "Naš tim", href: "/tim" },
    { name: "Projekti", href: "/projekti" },
    { name: "Novosti", href: "/blog" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  return (
    <nav className="bg-[#0b1120] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO I NAZIV SEKCIJA */}
          <Link href="/" className="flex items-center gap-3 group">
            
            {/* 1. SLIKA LOGA */}
            <div className="relative w-12 h-12">
               <Image 
                 src="/logo.png" 
                 alt="Logo Fondacije"
                 fill
                 className="object-contain group-hover:scale-105 transition duration-300"
               />
            </div>

            {/* 2. TEKST */}
            <div className="flex flex-col justify-center">
              <span className="text-white font-light text-xs tracking-[0.3em] uppercase leading-none opacity-90">
                Fondacija
              </span>
              <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide uppercase leading-none mt-1 group-hover:text-blue-500 transition">
                Duljević
              </h1>
            </div>
          </Link>

          {/* DESNA STRANA - LINKOVI (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-blue-500 font-medium"
                    : "text-gray-300 hover:text-white"
                } transition-colors duration-200 text-sm uppercase tracking-wide`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/donacije"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold transition duration-300 shadow-lg shadow-blue-900/20"
            >
              Doniraj
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;