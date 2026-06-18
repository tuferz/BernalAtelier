"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const features = [
  {
    num: "01",
    title: "Piel Genuina",
    desc: "Pieles de curtido vegetal seleccionadas a mano. Cada corte desarrolla una pátina única que solo el tiempo puede otorgar.",
    image: "/images/bernal_atelier_469051069_17938428872941800_5773733062010921575_n.jpg",
    accent: "Curtido Vegetal",
  },
  {
    num: "02",
    title: "Cosido a Mano",
    desc: "Técnica saddle-stitch a dos agujas. Si un hilo se rompe, el otro sostiene — una costura que supera cualquier máquina.",
    image: "/images/bernal_atelier_479731540_17947530086941800_1811671710656040896_n.jpg",
    accent: "Saddle Stitch",
  },
  {
    num: "03",
    title: "Diseño a Medida",
    desc: "Desde el color del hilo hasta el grabado final. Tu visión guía cada decisión; nuestra técnica la materializa.",
    image: "/images/bernal_atelier_487324114_17952195977941800_2601241407698225403_n.jpg",
    accent: "Personalizado",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const isMob = window.innerWidth < 768;
    let splitTitle1: SplitType | null = null;
    let splitTitle2: SplitType | null = null;
    
    if (!isMob) {
      // 1. Header SplitType Reveal (Desktop only)
      splitTitle1 = new SplitType(title1Ref.current!, { types: 'chars' });
      splitTitle2 = new SplitType(title2Ref.current!, { types: 'chars' });
      
      const chars1 = splitTitle1.chars || [];
      const chars2 = splitTitle2.chars || [];
      const allChars = [...chars1, ...chars2];
      
      gsap.set(allChars, { y: 100, opacity: 0 });
      
      ScrollTrigger.batch(allChars, {
        onEnter: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.03,
            ease: "expo.out",
            overwrite: "auto"
          });
        },
        start: "top 85%",
      });
    } else {
      // Mobile header animation (no split chars to prevent clipping)
      gsap.set([title1Ref.current, title2Ref.current], { y: 30, opacity: 0 });
      gsap.to([title1Ref.current, title2Ref.current], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-header-container",
          start: "top 85%",
        }
      });
    }

    gsap.set(".feature-header-sub", { opacity: 0, y: 20 });

    gsap.to(".feature-header-sub", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".feature-header-container",
        start: "top 80%"
      }
    });

    // 2. Feature Cards Stagger Reveal
    gsap.set(".feature-card", { y: 100, opacity: 0 });
    gsap.set(".feature-img-inner", { scale: 1.2 });
    gsap.set(".feature-line", { scaleX: 0 });
    gsap.set(".feature-text", { y: 20, opacity: 0 });

    if (!isMob) {
      ScrollTrigger.batch(".feature-card", {
        onEnter: (elements) => {
          // Card wrapper
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 1.6,
            stagger: 0.2,
            ease: "power3.out",
            overwrite: "auto"
          });

          // Inner image scale down (settle)
          elements.forEach((card, i) => {
            gsap.to(card.querySelector(".feature-img-inner"), {
              scale: 1,
              duration: 2.5,
              delay: i * 0.2,
              ease: "power2.out"
            });

            // Line stitch
            gsap.to(card.querySelector(".feature-line"), {
              scaleX: 1,
              duration: 1.5,
              delay: 0.4 + i * 0.2,
              ease: "power4.inOut"
            });

            // Text reveal
            gsap.to(card.querySelectorAll(".feature-text"), {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.1,
              delay: 0.3 + i * 0.2,
              ease: "power2.out"
            });
          });
        },
        start: "top 85%"
      });
    } else {
      // Simpler, faster direct scroll trigger per card on mobile for better performance
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
      cards.forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        });
        
        gsap.to(card.querySelector(".feature-img-inner"), {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        });

        gsap.to(card.querySelector(".feature-line"), {
          scaleX: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        });

        gsap.to(card.querySelectorAll(".feature-text"), {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        });
      });
    }

    // 3. Footer line
    gsap.fromTo(".feature-footer", 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-footer",
          start: "top 95%"
        }
      }
    );

    return () => {
      if (splitTitle1) splitTitle1.revert();
      if (splitTitle2) splitTitle2.revert();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-12 md:py-16 text-stone-200 overflow-hidden bg-stone-950">
      
      {/* Debossed overlay */}
      <div className="absolute inset-0 deboss md:mix-blend-multiply pointer-events-none opacity-50" />

      {/* Subtle warm glow */}
      <div className="hidden md:block absolute top-[40%] left-[50%] -translate-x-1/2 w-[60vw] h-[40vw] max-w-[800px] max-h-[500px] bg-amber-900/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Top stitching */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 border-t border-stitching" />

      <div className="relative z-10 w-full max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-6 md:px-12 2xl:px-32 flex-1 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 feature-header-container">
          <div className="flex flex-col">
            <span className="text-leather-light text-xs 2xl:text-sm uppercase tracking-[0.4em] mb-4 block feature-header-sub">
              El Compromiso
            </span>
            <div className="pb-4" style={{ clipPath: "polygon(-5% 0, 105% 0, 105% 120%, -5% 120%)" }}>
              <h2 ref={title1Ref} className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight text-stone-200">
                Calidad que
              </h2>
            </div>
            <div className="pb-4 -mt-4 md:-mt-6 ml-8" style={{ clipPath: "polygon(-5% 0, 105% 0, 105% 120%, -5% 120%)" }}>
              <h2 ref={title2Ref} className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight italic font-normal text-stone-400">
                Trasciende.
              </h2>
            </div>
          </div>
          
          <p className="text-stone-400 text-base 2xl:text-xl font-light leading-relaxed max-w-xs 2xl:max-w-md md:text-right md:pb-1 feature-header-sub">
            Tres pilares definen cada pieza. Sin atajos, sin compromisos.
          </p>
        </div>

        {/* Feature Cards — 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group relative feature-card">
              {/* Card container */}
              <div className="relative overflow-hidden rounded-sm border border-white/10 bg-stone-900/80">
                
                {/* Image strip at top */}
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <div className="w-full h-full relative feature-img-inner">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover grayscale-[0.2] contrast-110 group-hover:grayscale-0 transition-all duration-1000"
                    />
                    {/* Subtle bottom fade into content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 md:p-8 flex flex-col gap-4">
                  {/* Accent */}
                  <div className="flex items-center gap-4">
                    <div className="h-px w-8 md:w-12 bg-gradient-to-r from-leather/60 to-transparent origin-left feature-line" />
                    <span className="text-[11px] 2xl:text-xs uppercase tracking-[0.25em] text-stone-500 feature-text">
                      {feature.accent}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="pt-2">
                    <h3 className="text-2xl md:text-3xl font-serif leading-tight text-stone-200 feature-text">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-stone-400 text-base 2xl:text-lg font-light leading-relaxed feature-text">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
