"use client";

import { motion } from "framer-motion";

export default function ArtisanStamp({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center opacity-90 md:mix-blend-screen text-amber-500 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)] ${className}`}>
      <motion.svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <path id="textPath" d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="none" />
        <text className="text-[8.5px] uppercase tracking-[0.2em] font-sans fill-current">
          <textPath href="#textPath" startOffset="0%" textLength="262" lengthAdjust="spacing">
            BERNAL ATELIER • HANDCRAFTED LEATHER • 
          </textPath>
        </text>
      </motion.svg>
      <div className="text-xl font-serif italic text-amber-500 font-medium drop-shadow-md">
        BA
      </div>
    </div>
  );
}
