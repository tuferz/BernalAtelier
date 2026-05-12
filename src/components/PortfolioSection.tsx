"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PRODUCTS = [
  { title: "Tarjetero Minimalista", img: "/images/product1.jpg", desc: "Costura a dos agujas." },
  { title: "Cartera Bifold Clásica", img: "/images/product2.jpg", desc: "Piel de curtido vegetal." },
  { title: "Cinturón Piel Noble", img: "/images/product3.jpg", desc: "Herrajes de latón macizo." },
  { title: "Maletín Ejecutivo", img: "/images/product4.jpg", desc: "Interior forrado en lona." },
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section id="gallery" ref={containerRef} className="py-32 md:py-48 px-6 bg-stone-900/10">
      <div className="max-w-7xl mx-auto space-y-32">
        
        <div className="flex flex-col items-center text-center space-y-8">
          <span className="text-leather-light text-[10px] uppercase tracking-[0.4em]">La Colección</span>
          <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] max-w-2xl">
            Catálogo <span className="italic font-normal">Curado</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-48">
          {PRODUCTS.map((p, i) => (
            <motion.div 
              key={i} 
              style={{ y: i % 2 === 0 ? y1 : y2 }}
              className={`group flex flex-col gap-6 ${i % 2 !== 0 ? 'md:mt-48' : ''}`}
            >
              <div className="relative overflow-hidden aspect-3/4 bg-stone-900 w-full">
                <Image 
                  src={p.img} 
                  alt={p.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] grayscale-[0.4] group-hover:grayscale-0 brightness-75 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 border border-transparent group-hover:border-stone-500/20 m-6 transition-colors duration-700 pointer-events-none" />
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h4 className="text-xl font-serif mb-2">{p.title}</h4>
                  <p className="text-stone-500 text-xs font-light">{p.desc}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-stone-600 group-hover:text-leather-accent transition-colors">Ver Detalles</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
