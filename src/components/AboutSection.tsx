"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const stats = [
  { value: 100, suffix: "%", label: "Piel Genuina" },
  { value: 250, suffix: "+", label: "Piezas Entregadas" },
  { value: 5, suffix: "", label: "Años de Oficio" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const imgMainRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const splitTitle1 = new SplitType(title1Ref.current!, { types: 'chars' });
    const splitTitle2 = new SplitType(title2Ref.current!, { types: 'chars' });
    
    const chars1 = splitTitle1.chars || [];
    const chars2 = splitTitle2.chars || [];
    const allChars = [...chars1, ...chars2];
    
    gsap.set(allChars, { y: 100, opacity: 0 });
    gsap.set(".about-text-reveal", { y: 30, opacity: 0 });
    gsap.set(".about-line", { scaleX: 0 });

    // 1. Text reveals
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

    // 2. Paragraph and Line reveals
    gsap.to(".about-text-reveal", {
      y: 0,
      opacity: 1,
      duration: 1.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-text-container",
        start: "top 80%",
      }
    });

    gsap.to(".about-line", {
      scaleX: 1,
      duration: 2,
      ease: "power4.inOut", // Feels like pulling a thread tight
      scrollTrigger: {
        trigger: ".about-text-container",
        start: "top 80%",
      }
    });

    // 3. Image Parallax and Reveals
    const imgMain = imgMainRef.current;

    // Main image overlay clip reveal
    gsap.fromTo(imgMain, 
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.8,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: imgMain,
          start: "top 85%",
        }
      }
    );


    // Parallax on images
    gsap.fromTo(imgMain!.querySelector('img'), 
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );



    // Background Parallax
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 4. Counters
    counterRefs.current.forEach((counter, i) => {
      const target = stats[i].value;
      gsap.to(counter, {
        innerHTML: target,
        duration: 3,
        ease: "power4.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 95%",
        }
      });
    });

    return () => {
      splitTitle1.revert();
      splitTitle2.revert();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen flex flex-col justify-center py-12 md:py-20 overflow-hidden bg-stone-950">
      
      {/* Layered Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
      >
        <Image src="/images/granite.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.07] mix-blend-luminosity" />
      </div>
      
      {/* Warm ambient glow */}
      <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-amber-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top stitching separator */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 border-t border-stitching" />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Single row: Image left, Title+Text right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Images */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative">
              <div
                ref={imgMainRef}
                className="relative aspect-[4/3] w-full bg-stone-900 overflow-hidden"
              >
                <div className="relative w-full h-[150%] -top-[25%]">
                  <Image
                    src="/images/artisan.jpg"
                    alt="El artesano en su taller"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale contrast-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/10 pointer-events-none" />
              </div>
            </div>

            {/* Stats inline below image */}
            <div className="mt-6 pt-4 border-t border-stitching grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-2 stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-0.5 about-text-reveal">
                  <span className="text-xl md:text-2xl font-serif text-orange-50/90 tabular-nums block">
                    <span ref={el => { counterRefs.current[i] = el }}>0</span>
                    {stat.suffix}
                  </span>
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-stone-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 flex flex-col gap-6 about-text-container">
            
            <span className="text-leather-light text-xs uppercase tracking-[0.4em] about-text-reveal">
              Filosofía
            </span>

            {/* Title */}
            <div className="flex flex-col gap-0 md:gap-2">
              <div className="pb-2" style={{ clipPath: "polygon(0 0, 100% 0, 100% 120%, 0% 120%)" }}>
                <h2 ref={title1Ref} className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight text-stone-200">
                  Dualidad
                </h2>
              </div>
              <div className="pb-2 ml-8 md:ml-12" style={{ clipPath: "polygon(0 0, 100% 0, 100% 120%, 0% 120%)" }}>
                <h2 ref={title2Ref} className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight italic font-normal text-stone-400">
                  Técnica.
                </h2>
              </div>
            </div>

            {/* Animated underline */}
            <div className="w-24 h-px bg-gradient-to-r from-leather/60 to-transparent origin-left about-line" />

            {/* Pull Quote */}
            <blockquote className="relative pl-5 border-l-2 border-leather/40 about-text-reveal">
              <p className="text-base md:text-lg font-serif italic text-orange-100/80 leading-relaxed">
                &ldquo;La perfección no es un destino, es un proceso que se pule con cada puntada.&rdquo;
              </p>
            </blockquote>

            {/* Body Text */}
            <div className="flex flex-col gap-4 text-stone-400 text-base font-light leading-relaxed">
              <p className="about-text-reveal">
                Bernal Atelier nace de una búsqueda personal por la perfección tangible. Su creador divide su vida entre el rigor técnico de la industria y la libertad creativa del taller de cuero.
              </p>
              <p className="about-text-reveal">
                Esta dualidad imprime en cada pieza una atención al detalle obsesiva y una durabilidad pensada para resistir las condiciones más exigentes, sin perder nunca la elegancia rústica.
              </p>
            </div>

            {/* Founder Signature */}
            <div className="flex items-center gap-4 md:gap-5 pt-4 about-text-reveal">
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-leather/60 to-transparent origin-left about-line" />
              <div>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-stone-500 block mb-1">Fundador & Artesano</span>
                <span className="text-lg md:text-xl font-serif italic text-orange-50/90">Eben.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom stitching separator */}
      <div className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12 border-b border-stitching" />
    </section>
  );
}
