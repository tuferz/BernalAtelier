"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-48 px-6 bg-stone-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">

        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-12">
          <div className="space-y-6">
            <span className="text-leather-light text-[10px] uppercase tracking-[0.4em]">Filosofía</span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-tight">
              Dualidad <br /> <span className="italic font-normal text-stone-400">Técnica.</span>
            </h3>
          </div>

          <div className="flex flex-col gap-8 text-stone-400 text-sm md:text-base font-light leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Bernal Atelier nace de una búsqueda personal por la perfección tangible. Su creador divide su vida entre el rigor técnico de la industria y la libertad creativa del taller de cuero.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Esta dualidad imprime en cada pieza una atención al detalle obsesiva y una durabilidad pensada para resistir las condiciones más exigentes, sin perder nunca la elegancia rústica.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-8 border-t border-white/5"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 block mb-2">Fundador & Artesano</span>
            <span className="text-2xl font-serif">Eben.</span>
          </motion.div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-4/5 w-full bg-stone-900"
          >
            <Image
              src="/images/artisan.jpg"
              alt="El artesano"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale contrast-125"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
