"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    { title: "100% Piel Genuina", desc: "Seleccionamos las mejores pieles de curtido vegetal para asegurar durabilidad y una pátina única." },
    { title: "Cosido a Mano", desc: "Utilizamos la técnica tradicional de costura a dos agujas para una resistencia inigualable." },
    { title: "Diseño Personalizado", desc: "Cada pieza se adapta a tus necesidades, desde el color del hilo hasta el grabado final." }
  ];

  return (
    <section className="py-32 md:py-48 px-6 bg-stone-950 text-stone-200 relative">
      <div className="absolute inset-0 bg-stone-950/50 deboss mix-blend-multiply pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 relative z-10">

        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
              className="mt-16 relative w-full aspect-[4/5] max-w-sm hidden md:block"
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

        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-16 md:gap-24 pt-12 md:pt-32">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="w-full border-t border-stitching opacity-50" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 items-start">
                <h3 className="text-xl md:text-2xl font-serif md:col-span-2">{f.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed md:col-span-3">
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
