import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import ArtisanStamp from "@/components/ArtisanStamp";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bernal Atelier | Lujo Rústico y Artesanía",
  description: "Piezas de cuero únicas hechas a mano, fusionando el rigor industrial con la pasión artesanal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-stone-950 text-stone-200">
        <NoiseOverlay />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* Sello Global Fijo */}
        <div id="fixed-stamp" className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex pointer-events-none drop-shadow-2xl scale-[0.6] md:scale-75 lg:scale-100 origin-bottom-right">
          <ArtisanStamp />
        </div>
      </body>
    </html>
  );
}
