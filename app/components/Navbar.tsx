"use client";

import { useState } from "react"; // 1. Dodali smo useState
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// 2. Dodali smo ikonice za meni (hamburger i X za zatvaranje)
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // 3. Stanje: da li je otvoren?
  const pathname = usePathname();

  const navLinks = [
    { name: "O nama", href: "/onama" },
    { name: "Naš tim", href: "/tim" },
    { name: "Projekti", href: "/projekti" },
    { name: "Novosti", href: "/blog" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  // Funkcija za zatvaranje menija kad se klikne na link
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-[#0b1120] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="relative w-12 h-12">
               <Image 
                 src="/logo.png" 
                 alt="Logo Fondacije"
                 fill
                 className="object-contain group-hover:scale-105 transition duration-300"
               />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-white font-light text-xs tracking-[0.3em] uppercase leading-none opacity-90">
                Fondacija
              </span>
              <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide uppercase leading-none mt-1 group-hover:text-blue-500 transition">
                Duljević
              </h1>
            </div>
          </Link>

          {/* --- DESKTOP MENI (Sakriven na mobitelu) --- */}
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

          {/* --- MOBILNO DUGME (Hamburger) --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
      </div>

      {/* --- MOBILNI MENI (Prikazuje se samo kad je isOpen === true) --- */}
      {isOpen && (
        <div className="md:hidden bg-[#0b1120] border-t border-gray-800">
          <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu} // Zatvori meni kad klikneš
                className={`${
                  pathname === link.href
                    ? "text-blue-500 bg-gray-900/50"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                } block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wide transition`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Doniraj dugme za mobitel */}
            <div className="pt-4">
              <Link
                href="/donacije"
                onClick={closeMenu}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition duration-300 shadow-lg"
              >
                Doniraj
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;