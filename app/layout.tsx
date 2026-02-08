import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 1. NASLOV: Jasno definiše koga podržavate
  title: {
    default: "Fondacija Duljević - Podrška za Mlade, Žene i Privrednike",
    template: "%s | Fondacija Duljević",
  },
  
  // 2. OPIS: Fokus na razvoj, stipendije i biznis
  description: "Fondacija Duljević posvećena je podršci mladima, osnaživanju žena i razvoju poduzetništva. Kroz stipendije, edukaciju i umrežavanje gradimo društvo uspješnih.",
  
  // 3. KLJUČNE RIJEČI: Prilagođeno novom fokusu
  keywords: [
    "Fondacija Duljević", 
    "Hako Duljević", 
    "stipendije", 
    "mladi", 
    "žene u biznisu", 
    "privrednici", 
    "poduzetništvo", 
    "edukacija", 
    "razvoj karijere", 
    "networking",
    "Sarajevo",
    "Sandžak"
  ],

  // 4. AUTOR
  authors: [{ name: "Fondacija Duljević" }],

  // 5. OPEN GRAPH: Kako izgleda kad se link podijeli
  openGraph: {
    title: "Fondacija Duljević - Mladi, Žene i Privrednici",
    description: "Ulažemo u znanje i razvoj. Podrška obrazovanju, ženskom poduzetništvu i privrednom razvoju.",
    url: "https://www.fondacijaduljevic.com",
    siteName: "Fondacija Duljević",
    images: [
      {
        url: "/hero/hero4.webp", 
        width: 1200,
        height: 630,
        alt: "Fondacija Duljević - Podrška razvoju",
      },
    ],
    locale: "bs_BA",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs">
      <body className={`${inter.className} bg-white text-gray-900 flex flex-col min-h-screen`}>
        
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}