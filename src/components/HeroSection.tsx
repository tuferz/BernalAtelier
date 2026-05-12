"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";



export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 overflow-hidden border-b border-stitching">
      
      {/* Background Image full bleed, moody, immersive */}
      <div className="absolute inset-0 w-full h-full z-0 bg-stone-950">
        <motion.div 
          style={{ y: isMobile ? "0%" : yImage }} 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[120%] top-[-10%] will-change-transform"
        >
          {/* Main Leather/Fabric Texture Blend */}
          <Image 
            src="/images/product6.jpg" 
            alt="Textura envolvente de Cuero y Tela"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-100"
            priority
          />
          {/* Amber overlay for intense warmth */}
          <div className="absolute inset-0 bg-amber-900/20 md:bg-amber-900/10 md:mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/80 via-transparent to-stone-950/20" />
          
          {/* Backlight (candle/lamp effect) - warm emanation (Heavy on GPU, disabled on mobile) */}
          <div className="hidden md:block absolute top-[30%] right-[20%] w-[60vw] h-[60vw] bg-amber-500/20 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
          
          {/* Gradient shadow to ground the bottom section naturally */}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent pointer-events-none" />
          
          {/* Bokeh Tool Detail (Heavy on GPU, disabled on mobile) */}
          <div className="hidden md:block absolute -bottom-8 right-12 w-[30vw] h-[30vw] max-w-[400px] opacity-30 blur-xl pointer-events-none transform rotate-12">
            <Image 
              src="/images/product4.jpg" 
              alt="Detalle desenfocado"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              className="object-cover rounded-full"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none z-0" />
      
      {/* Right Side Gradient for CTA Legibility */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none z-0" />

      <motion.div 
        style={{ y: isMobile ? "0%" : yText, opacity: opacityText }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 pt-20"
      >
        {/* Left Side: Typography (Bone/Cream warm color) */}
        <div className="lg:col-span-8 flex flex-col gap-2 relative">
          <div className="overflow-hidden pb-4">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[17vw] lg:text-[12vw] leading-[0.9] font-serif uppercase tracking-tighter text-orange-50 drop-shadow-md"
            >
              BERNAL
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-4 ml-6 md:ml-20">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-[12vw] lg:text-[8vw] leading-[0.9] font-serif italic font-light lowercase text-orange-100/90 drop-shadow-sm"
            >
              atelier.
            </motion.h2>
          </div>
        </div>

        {/* Right Side: Floating Text over Texture */}
        <div className="lg:col-span-4 flex flex-col gap-10 md:pt-32 relative">
          <div className="flex flex-col gap-8 md:pl-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="text-orange-50/90 text-sm md:text-base font-light leading-relaxed max-w-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Piezas de cuero genuino que envejecen con carácter. Diseñadas bajo un rigor industrial, creadas con pasión artesanal.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <MagneticButton>
                <a href="#gallery" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-orange-50/90 hover:text-amber-500 transition-colors duration-500 drop-shadow-md">
                  <span className="w-12 h-px bg-stone-400 group-hover:w-20 group-hover:bg-amber-500 transition-all duration-500 ease-out"></span>
                  Explorar Colección
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
