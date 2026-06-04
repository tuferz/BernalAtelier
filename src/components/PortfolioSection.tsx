"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PRODUCTS = [
  { title: "Cinturón Full Grain", img: "/images/product1.jpg", desc: "Piel curtida al vegetal. Envejece contigo." },
  { title: "Cartera Bifold Clásica", img: "/images/bifold.jpg", desc: "Plena flor, sin forro. El clásico eterno." },
  { title: "Money Clip", img: "/images/product3.jpg", desc: "Acero y piel. Lo esencial, nada más." },
  { title: "Tarjetero Minimalista", img: "/images/product4.jpg", desc: "Una pieza, tres ranuras. Pura geometría." },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current;
    
    // Animar la entrada de los títulos
    gsap.fromTo(
      ".portfolio-header",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Animación de scroll horizontal (Pinning)
    const totalScrollWidth = scrollContainerRef.current ? scrollContainerRef.current.scrollWidth - window.innerWidth : 0;
    
    if (totalScrollWidth > 0 && window.innerWidth > 768) {
      // Setup pin for desktop: Animate the container horizontally
      gsap.to(scrollContainerRef.current, {
        x: () => {
          const containerWidth = scrollContainerRef.current!.scrollWidth;
          const viewportWidth = window.innerWidth;
          return -(containerWidth - viewportWidth + window.innerWidth * 0.1); 
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top", 
          end: () => `+=${totalScrollWidth}`, // Scroll distance matches the width
          invalidateOnRefresh: true,
        }
      });
    } else {
      // Fade in secuencial para mobile
      cards.forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="gallery" ref={sectionRef} className="relative h-[100svh] bg-stone-950 overflow-hidden">
      {/* Textura de Granito de Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/granite.jpg"
          alt="Textura de Granito"
          fill
          sizes="100vw"
          className="object-cover opacity-20 grayscale"
        />
        {/* Difuminado suave arriba y abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/40 to-transparent h-48" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center py-12 md:py-20 overflow-hidden">
        {/* Header estático arriba del pin */}
        <div className="portfolio-header flex flex-col items-center text-center space-y-4 md:space-y-6 mb-8 md:mb-12 flex-shrink-0">
          <span className="text-leather-light text-[10px] md:text-xs uppercase tracking-[0.4em]">La Colección</span>
          <div className="pb-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.1] max-w-2xl text-stone-200">
              Catálogo <span className="italic font-normal text-stone-400">Curado</span>
            </h2>
          </div>
        </div>

        {/* Contenedor que será animado horizontalmente */}
        <div className="flex-1 flex items-center min-h-0 w-full">
          <div ref={scrollContainerRef} className="flex flex-row gap-6 md:gap-0 px-6 md:px-0 md:pl-[10vw] w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="flex-shrink-0 flex flex-col gap-4 md:gap-6 md:mr-16 lg:mr-24 w-[85vw] md:w-auto snap-center"
            >
              {/* Image Container strictly bound by height to prevent text push-down */}
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[3/4] h-[35vh] md:h-[45vh] lg:h-[50vh] bg-stone-900 group cursor-pointer border border-white/[0.04]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover scale-105 group-hover:scale-100 transition-all duration-[2s] ease-[0.16,1,0.3,1] grayscale-[0.3] group-hover:grayscale-0 brightness-[0.85] group-hover:brightness-100"
                />
                <div className="absolute inset-0 border border-transparent group-hover:border-leather/30 m-6 transition-colors duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              </div>
              
              {/* Product Info */}
              <div className="flex justify-between items-start px-2">
                <div>
                  <h4 className="text-xl font-serif mb-2 text-stone-200">{p.title}</h4>
                  <p className="text-stone-400 text-sm font-light">{p.desc}</p>
                </div>
                <span className="text-xs uppercase tracking-widest text-stone-500 hover:text-leather-accent transition-colors cursor-pointer mt-1">Ver Detalles</span>
              </div>
            </div>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
}
