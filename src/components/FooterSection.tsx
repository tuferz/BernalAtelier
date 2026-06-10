"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import LogoSVG from "./LogoSVG";
import MagneticButton from "./MagneticButton";

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const footerBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMob = window.innerWidth < 768;
    // Fade out the global stamp when footer is reached
    if (!isMob) {
      gsap.to("#fixed-stamp", {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        }
      });
    } else {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => gsap.to("#fixed-stamp", { opacity: 0, duration: 0.5 }),
        onLeaveBack: () => gsap.to("#fixed-stamp", { opacity: 1, duration: 0.5 })
      });
    }
  });

  useGSAP(() => {
    const isMob = window.innerWidth < 768;
    let split1: SplitType | null = null;
    let split2: SplitType | null = null;
    let allChars: HTMLElement[] = [];

    gsap.set(buttonRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(footerBottomRef.current, { y: 30, opacity: 0 });

    if (!isMob) {
      // 1. Split Text (Desktop only)
      split1 = new SplitType(title1Ref.current!, { types: 'chars' });
      split2 = new SplitType(title2Ref.current!, { types: 'chars' });
      const chars1 = split1.chars || [];
      const chars2 = split2.chars || [];
      allChars = [...chars1, ...chars2];

      gsap.set(allChars, { y: 150, rotate: 10, opacity: 0 });
    } else {
      // Mobile header (no split chars to prevent clipping)
      gsap.set([title1Ref.current, title2Ref.current], { y: 50, opacity: 0 });
    }

    // 2. Timeline Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    if (!isMob) {
      tl.to(allChars, {
        y: 0,
        rotate: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.03,
        ease: "power4.out"
      });
    } else {
      tl.to([title1Ref.current, title2Ref.current], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });
    }

    tl.to(buttonRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.8")
      .to(footerBottomRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=1.2");

    // Cleanup
    return () => {
      if (split1) split1.revert();
      if (split2) split2.revert();
    };
  }, { scope: sectionRef });

  return (
    <footer id="contact" ref={sectionRef} className="bg-stone-950 min-h-screen flex flex-col py-12 md:py-16 border-t border-stitching relative overflow-hidden">
      {/* Debossed overlay */}
      <div className="absolute inset-0 deboss pointer-events-none md:mix-blend-multiply opacity-50" />

      {/* Subtle bottom glow */}
      <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-amber-900/10 rounded-t-[100%] blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex-1 flex flex-col">

        <div className="flex-1 flex flex-col justify-center items-center text-center mt-12 mb-24">

          <div className="relative">
            <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-serif leading-none tracking-tighter text-stone-200">
              <div style={{ clipPath: "polygon(-5% 0, 105% 0, 105% 120%, -5% 120%)" }}>
                <span ref={title1Ref} className="inline-block">Legado</span>
              </div>
              <div style={{ clipPath: "polygon(-5% 0, 105% 0, 105% 120%, -5% 120%)" }}>
                <span ref={title2Ref} className="italic font-normal text-stone-500 inline-block pr-2">en Cuero.</span>
              </div>
            </h2>
          </div>

          {/* Highly Visible Solid Button CTA */}
          <div ref={buttonRef} className="mt-16 md:mt-24">
            <a
              href="https://wa.me/521XXXXXXXXXX"
              className="group relative inline-flex items-center justify-center px-12 md:px-20 py-6 md:py-8 bg-amber-800/90 text-amber-50 hover:bg-amber-600 hover:text-white transition-all duration-500 overflow-hidden cursor-pointer shadow-2xl shadow-amber-900/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full group-hover:translate-x-full" />
              <span className="relative z-10 text-xs md:text-base uppercase tracking-[0.4em] font-medium transition-colors duration-500">
                Cotizar Proyecto
              </span>
            </a>
          </div>
        </div>

        {/* Footer Bottom Links (3 columns for perfect centering) */}
        <div ref={footerBottomRef} className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center w-full">
          {/* Left: Logo */}
          <div className="flex justify-center md:justify-start md:-ml-22">
            <LogoSVG className="w-16 h-16 md:w-20 md:h-20 text-stone-500 hover:text-amber-600 transition-colors duration-500" />
          </div>

          {/* Center: Social Links */}
          <div className="flex justify-center gap-8 text-[11px] md:text-xs uppercase tracking-[0.3em] text-stone-400">
            <a href="https://www.instagram.com/bernal_atelier/" className="pl-[0.3em] pb-1 border-b border-stone-700 hover:border-amber-500 hover:text-amber-500 transition-all duration-300" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>

          {/* Right: Copyright */}
          <div className="flex justify-center md:justify-end md:-mr-22">
            <p className="text-[10px] md:text-[11px] text-stone-600 uppercase tracking-widest">
              © 2026. Hecho a mano.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
