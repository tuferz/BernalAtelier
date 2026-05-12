"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LogoSVG from "./LogoSVG";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      className="absolute top-0 w-full z-50"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 h-24 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="group flex flex-col hover:opacity-70 transition-all duration-500">
            <LogoSVG className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg group-hover:text-amber-500 transition-colors" />
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center gap-12">
          <Link href="#gallery" className="text-[9px] uppercase tracking-[0.3em] text-white hover:text-amber-500 transition-colors drop-shadow-lg font-semibold">Colección</Link>
          <Link href="#about" className="text-[9px] uppercase tracking-[0.3em] text-white hover:text-amber-500 transition-colors drop-shadow-lg font-semibold">Artesano</Link>
        </div>

        <div className="flex-1 flex justify-end">
          <Link 
            href="#contact" 
            className="text-[9px] uppercase tracking-[0.3em] text-white hover:text-amber-500 transition-colors drop-shadow-lg font-semibold"
          >
            Contacto
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
