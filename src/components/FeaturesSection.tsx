"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    { title: "100% Piel Genuina", desc: "Seleccionamos las mejores pieles de curtido vegetal para asegurar durabilidad y una pátina única.", image: "/images/leather_texture.png", stitched: false },
    { title: "Cosido a Mano", desc: "Utilizamos la técnica tradicional de costura a dos agujas para una resistencia inigualable.", image: "/images/leather_texture_alt.png", stitched: true },
    { title: "Diseño Personalizado", desc: "Cada pieza se adapta a tus necesidades, desde el color del hilo hasta el grabado final.", image: "/images/custom_design.png", stitched: false }
  ];

  return (
    <section className="py-32 md:py-48 px-6 bg-stone-950 text-stone-200 relative">
      <div className="absolute inset-0 bg-stone-950/50 deboss mix-blend-multiply pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 relative z-10">

        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-48"
          >
            <span className="text-leather-light text-[10px] uppercase tracking-[0.4em] mb-6 block">El Compromiso</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-tight">
              Calidad que <br />
              <span className="italic font-normal text-stone-400">Trasciende.</span>
            </h2>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-12 md:mt-16 relative w-full aspect-[4/5] max-w-sm"
              >
              <Image
                src="/images/about.jpg"
                alt="Detalle de Cuero Artesanal"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale opacity-60 mix-blend-luminosity border border-white/5"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-8 md:gap-12 pt-12 md:pt-32">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-6 p-6 md:p-8 rounded-sm border border-stone-800 overflow-hidden transition-all duration-500 hover:border-stone-600 hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/60 group-hover:bg-stone-950/40 transition-colors duration-700" />
              </div>

              {f.stitched && (
                <div className="absolute inset-1.5 md:inset-2 pointer-events-none z-20 mix-blend-overlay opacity-100">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="8 6" strokeLinecap="round" rx="2" style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,1))' }} />
                  </svg>
                </div>
              )}

              <div className="relative z-10 w-full border-t border-stitching/50 transition-colors duration-500 group-hover:border-leather-light/70" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 items-start drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                <h3 className="text-xl md:text-2xl font-serif md:col-span-2 text-white group-hover:text-leather-light transition-colors duration-500">{f.title}</h3>
                <p className="text-stone-200 text-sm leading-relaxed md:col-span-3 group-hover:text-white transition-colors duration-500 font-medium">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
