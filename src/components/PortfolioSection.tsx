"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PRODUCTS = [
  { title: "Cinturón Full Grain", img: "/images/product1.jpg", desc: "Piel curtida al vegetal. Envejece contigo." },
  { title: "Cartera Bifold Clásica", img: "/images/bifold.jpg", desc: "Plena flor, sin forro. El clásico eterno." },
  { title: "Money Clip", img: "/images/product3.jpg", desc: "Acero y piel. Lo esencial, nada más." },
  { title: "Tarjetero Minimalista", img: "/images/product4.jpg", desc: "Una pieza, tres ranuras. Pura geometría." },
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
    <section id="gallery" ref={containerRef} className="relative py-32 md:py-48 px-6 bg-stone-950 overflow-hidden">
      {/* Textura de Granito de Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/granite.jpg"
          alt="Textura de Granito"
          fill
          sizes="100vw"
          className="object-cover opacity-25 grayscale"
        />
        {/* Difuminado suave arriba y abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/40 to-transparent h-48" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto space-y-32 relative z-10">

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
