"use client";

import { motion } from "framer-motion";
import LogoSVG from "./LogoSVG";

export default function FooterSection() {
  return (
    <footer id="contact" className="bg-stone-950 pt-32 pb-12 border-t border-stitching relative">
      <div className="absolute inset-0 deboss pointer-events-none mix-blend-multiply opacity-50" />
      <div className="max-w-7xl mx-auto px-6 space-y-32 relative z-10">
        <div className="flex flex-col items-center text-center space-y-16 relative">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[10vw] font-serif leading-none tracking-tighter text-stone-200"
          >
            Legado <br /><span className="italic font-normal text-stone-500">en Cuero.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <a
              href="https://wa.me/521XXXXXXXXXX"
              className="inline-block text-[10px] uppercase tracking-[0.4em] border border-stone-800 px-12 py-6 hover:bg-leather hover:text-white hover:border-transparent transition-colors duration-500"
            >
              Cotizar
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <LogoSVG className="w-24 h-24 text-stone-500 hover:text-amber-600 transition-colors duration-500" />

          <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] text-stone-600">
            <a href="#" className="hover:text-stone-300 transition-colors">Instagram</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Behance</a>
          </div>

          <p className="text-[9px] text-stone-700 uppercase tracking-widest">
            © 2026. Hecho a mano.
          </p>
        </div>
      </div>
    </footer>
  );
}
