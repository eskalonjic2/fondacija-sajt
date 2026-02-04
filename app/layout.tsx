import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // ⚠️ OVO JE KLJUČNO: Ovdje se učitava pravi Tailwind
import Navbar from "./components/Navbar"; // Koristimo @ alias za čišći kod (ili ./components/Navbar)

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
      <body className={`${inter.className} bg-white text-gray-900`}>
        {/* Navbar ide na vrh */}
        <Navbar />
        
        {/* Glavni sadržaj */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100 py-8 text-center mt-auto">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Fondacija Duljević. Sva prava zadržana.
          </p>
        </footer>
      </body>
    </html>
  );
}