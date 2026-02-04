import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <--- 1. Uvozimo Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fondacija Duljević",
  description: "Humanitarna fondacija za pomoć onima kojima je najpotrebnije.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs">
      {/* 2. Dodali smo 'flex flex-col min-h-screen' da bi footer uvijek bio na dnu */}
      <body className={`${inter.className} bg-white text-gray-900 flex flex-col min-h-screen`}>
        
        {/* Navbar ide na vrh */}
        <Navbar />
        
        {/* 3. 'flex-grow' gura footer na dno ako je sadržaj kratak */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Ovdje se učitava tvoj novi Footer sa ikonama */}
        <Footer />
        
      </body>
    </html>
  );
}