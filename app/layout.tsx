import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Ovdje uvozimo naš novi meni
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Stranica Fondacije",
  description: "Humanitarna fondacija za pomoć onima kojima je najpotrebnije.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* Meni ide na vrh */}
        <Navbar />
        
        {/* Ovdje se učitava sadržaj svake pojedinačne stranice */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer (podnožje) ćemo dodati kasnije, ovdje je samo placeholder */}
        <footer className="bg-gray-800 text-white p-6 text-center mt-10">
          <p>&copy; 2024 Fondacija. Sva prava zadržana.</p>
        </footer>
      </body>
    </html>
  );
}