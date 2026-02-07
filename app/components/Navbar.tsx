"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "O nama", href: "/onama" },
    { name: "Naš tim", href: "/tim" },
    { name: "Podcast", href: "/podcast" },
    { name: "Novosti", href: "/blog" },
    { name: "Projekti", href: "/projekti" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-[#0b1120] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center gap-3 group z-50" onClick={closeMenu}>
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

          {/* --- DESKTOP MENI (Samo za velike ekrane - LG i veće) --- */}
          {/* Promijenjeno sa 'hidden md:flex' na 'hidden lg:flex' */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-blue-500 font-medium"
                    : "text-gray-300 hover:text-white"
                } transition-colors duration-200 text-sm uppercase tracking-wide whitespace-nowrap`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/donacije"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold transition duration-300 shadow-lg shadow-blue-900/20 whitespace-nowrap"
            >
              Doniraj
            </Link>
          </div>

          {/* --- DUGME ZA MOBILNI I TABLET MENI --- */}
          {/* Promijenjeno sa 'md:hidden' na 'lg:hidden' da se vidi i na tabletima */}
          <div className="lg:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none text-2xl p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
      </div>

      {/* --- MOBILNI I TABLET MENI (DROPDOWN) --- */}
      {/* Prikazuje se sve dok ekran nije širi od LG (1024px) */}
      <div 
        className={`fixed inset-0 bg-[#0b1120]/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "80px" }} // Visina navbara da ne prekrije logo
      >
        <div className="flex flex-col h-full overflow-y-auto pb-20">
            <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`${
                  pathname === link.href
                    ? "text-blue-500 bg-gray-900/50 border-l-4 border-blue-500 pl-3"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white pl-4"
                } block py-4 text-lg font-medium uppercase tracking-wide transition-all rounded-r-md`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-6 px-4">
              <Link
                href="/donacije"
                onClick={closeMenu}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-lg"
              >
                Doniraj
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;