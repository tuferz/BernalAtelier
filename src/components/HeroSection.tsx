"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    let splitTitle1: SplitType | null = null;
    let splitTitle2: SplitType | null = null;
    let chars1: HTMLElement[] = [];
    let chars2: HTMLElement[] = [];

    if (!isMobile) {
      // 1. Split Text Setup
      splitTitle1 = new SplitType(title1Ref.current!, { types: 'chars' });
      splitTitle2 = new SplitType(title2Ref.current!, { types: 'chars' });
      
      chars1 = splitTitle1.chars || [];
      chars2 = splitTitle2.chars || [];
      
      // Hide initially to prevent flash
      gsap.set([...chars1, ...chars2], { opacity: 0 });
      gsap.set([title1Ref.current, title2Ref.current], { opacity: 1 }); // Reveal parent after chars are hidden
      gsap.set(chars1, { y: 100 });
      gsap.set(chars2, { y: 100 });
    } else {
      // On mobile, animate parent elements instead of splitting chars (fixes Safari clipping & performance)
      gsap.set([title1Ref.current, title2Ref.current], { opacity: 0, y: 30 });
    }
    
    gsap.set(bgRef.current, { scale: 1.1, opacity: 0 });

    // 2. Initial Load Timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Background fade + scale down
    tl.to(bgRef.current, {
      scale: 1,
      opacity: 1,
      duration: 2.5,
      ease: "power2.out"
    }, 0);

    if (!isMobile) {
      // BERNAL (Char by char)
      tl.to(chars1, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.04,
        ease: "expo.out"
      }, 0.2);

      // atelier (Char by char)
      tl.to(chars2, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.03,
        ease: "expo.out"
      }, 0.5);
    } else {
      // Mobile header animation
      tl.to(title1Ref.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }, 0.2);

      tl.to(title2Ref.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }, 0.4);
    }

    // Description & CTA fade up
    tl.fromTo(descRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      1.2
    );
    tl.fromTo(ctaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" },
      1.5
    );

    // 3. Scroll Parallax Effects (Desktop only)
    if (!isMobile) {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to([title1Ref.current, title2Ref.current], {
        yPercent: 50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Cleanup split text on unmount
    return () => {
      if (splitTitle1) splitTitle1.revert();
      if (splitTitle2) splitTitle2.revert();
    };
  }, { scope: containerRef, dependencies: [isMobile] });

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 overflow-hidden border-b border-stitching">
      
      {/* Background Image full bleed, moody, immersive */}
      <div className="absolute inset-0 w-full h-full z-0 bg-stone-950">
        <div 
          ref={bgRef}
          className="relative w-full h-[120%] top-[-10%] opacity-0"
        >
          {/* Main Leather/Fabric Texture Blend */}
          <Image 
            src="/images/product6.jpg" 
            alt="Textura envolvente de Cuero y Tela"
            fill
            sizes="100vw"
            className="object-cover object-[75%_center] md:object-center opacity-100"
            priority
          />
          {/* Amber overlay for intense warmth */}
          <div className="absolute inset-0 bg-amber-900/20 md:bg-amber-900/10 md:mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/80 via-transparent to-stone-950/20" />
          
          {/* Backlight (candle/lamp effect) - warm emanation */}
          <div className="hidden md:block absolute top-[30%] right-[20%] w-[60vw] h-[60vw] bg-amber-500/20 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
          
          {/* Gradient shadow to ground the bottom section naturally */}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent pointer-events-none" />
          
          {/* Bokeh Tool Detail */}
          <div className="hidden md:block absolute -bottom-8 right-12 w-[30vw] h-[30vw] max-w-[400px] opacity-30 blur-xl pointer-events-none transform rotate-12">
            <Image 
              src="/images/product4.jpg" 
              alt="Detalle desenfocado"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              className="object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none z-0" />
      
      {/* Right Side Gradient for CTA Legibility */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none z-0" />

      {/* Left Side: Typography */}
      <div className="absolute top-[22vh] md:top-[30vh] left-[24px] sm:left-[32px] md:left-[48px] lg:left-[80px] z-10 flex flex-col gap-2">
        <div className="pb-4" style={{ clipPath: "polygon(-5% 0, 105% 0, 105% 120%, -5% 120%)" }}>
          <h1 
            ref={title1Ref}
            className="text-[14vw] sm:text-[16vw] lg:text-[12vw] leading-[0.9] font-serif uppercase tracking-tighter text-orange-50 drop-shadow-md opacity-0"
          >
            BERNAL
          </h1>
        </div>
        <div className="pb-4 ml-6 md:ml-20" style={{ clipPath: "polygon(-5% 0, 105% 0, 105% 120%, -5% 120%)" }}>
          <h2 
            ref={title2Ref}
            className="text-[11vw] lg:text-[8vw] leading-[0.9] font-serif italic font-light lowercase text-orange-100/90 drop-shadow-sm opacity-0"
          >
            atelier.
          </h2>
        </div>
      </div>

      {/* Right Side: Floating Text */}
      <div className="absolute bottom-[96px] md:bottom-[64px] left-[24px] md:left-auto right-[24px] md:right-[180px] lg:right-[10vw] 2xl:right-[15vw] z-10 flex flex-col gap-8 max-w-[280px] md:max-w-sm 2xl:max-w-lg">
        <p 
          ref={descRef}
          className="text-orange-50/90 text-sm md:text-lg 2xl:text-2xl font-light leading-relaxed opacity-0"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
        >
          Piezas de cuero genuino que envejecen con carácter. Diseñadas bajo un rigor industrial, creadas con pasión artesanal.
        </p>
        
        <div ref={ctaRef} className="opacity-0">
          <MagneticButton>
            <a href="#gallery" className="group flex items-center gap-4 text-[10px] md:text-xs 2xl:text-sm uppercase tracking-[0.3em] text-orange-50/90 hover:text-amber-500 transition-colors duration-500" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
              <span className="w-8 md:w-12 2xl:w-16 h-px bg-stone-400 group-hover:w-16 md:group-hover:w-20 2xl:group-hover:w-24 group-hover:bg-amber-500 transition-all duration-500 ease-out"></span>
              Explorar Colección
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
