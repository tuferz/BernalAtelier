"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PRODUCTS = [
  { title: "Cinturón", img: "/images/product1.jpg", desc: "Robusto y elegante." },
  { title: "Cartera Bifold", img: "/images/bifold.jpg", desc: "La de toda la vida." },
  { title: "Money Clip", img: "/images/product3.jpg", desc: "Clásico de la casa." },
  { title: "Tarjetero", img: "/images/product4.jpg", desc: "Compacto y esencial." },
];

const TITLES = [
  "¿Qué pieza te llama?",
  "¿Tienes alguna preferencia?",
  "¿Cómo prefieres el contacto?",
  "Resumen de tu pieza"
];

export default function OrderWizardSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    product: "",
    preferences: "",
    contactMethod: "whatsapp",
    contactName: "",
    contactDetail: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { contextSafe } = useGSAP({ scope: sectionRef });

  // 1. Initial Scroll Entrance
  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    const fixedStamp = document.getElementById('fixed-stamp');
    if (fixedStamp) {
      gsap.to(fixedStamp, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        }
      });
    }
  }, { scope: sectionRef });

  // 2. Step Animations (Left Title & Right Elements)
  useGSAP(() => {
    if (isSubmitted) {
      gsap.fromTo('.success-content > *',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: "expo.out", delay: 0.2 }
      );
      return;
    }

    // Left Column: Split Text Animation
    const title = document.querySelector('.step-title');
    let split: SplitType | null = null;

    if (title) {
      split = new SplitType(title as HTMLElement, { types: 'lines,words,chars' });
      gsap.set(title, { opacity: 1 }); // Reveal wrapper to prevent blink

      gsap.fromTo(split.chars,
        { opacity: 0, y: 40, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.02,
          duration: 1,
          ease: "back.out(1.5)"
        }
      );
    }

    gsap.set('.step-content-wrapper', { opacity: 1 });

    // Right Column: Stagger form elements and nav
    gsap.fromTo(['.step-element', '.step-nav'],
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    // Step 1: Cards stagger
    if (step === 1 && cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }

    return () => {
      if (split) split.revert();
    };
  }, { scope: sectionRef, dependencies: [step, isSubmitted] });

  // 3. Transitions between steps
  const animateStepChange = contextSafe((nextStep: number) => {
    const direction = nextStep > step ? -50 : 50;

    // Animate out both title and right content
    gsap.to('.step-title, .step-content-wrapper, .step-nav', {
      opacity: 0,
      x: direction,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.05,
      onComplete: () => {
        setStep(nextStep);
      }
    });
  });

  const handleNext = () => {
    if (step < 4) animateStepChange(step + 1);
  };

  const handleBack = () => {
    if (step > 1) animateStepChange(step - 1);
  };

  const handleSubmit = contextSafe(() => {
    gsap.to('.step-title, .step-content-wrapper, .step-nav', {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setIsSubmitted(true);
        gsap.fromTo(
          '.success-content',
          { opacity: 0, scale: 0.8, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.2)" }
        );
      }
    });
  });

  const handleToggle = contextSafe((method: "whatsapp" | "email") => {
    setFormData({ ...formData, contactMethod: method });
    const isWhatsApp = method === "whatsapp";
    gsap.to(".toggle-pill", {
      x: isWhatsApp ? 0 : "100%",
      duration: 0.5,
      ease: "expo.out"
    });
  });

  const isNextDisabled = () => {
    if (step === 1 && !formData.product) return true;
    if (step === 3 && (!formData.contactName || !formData.contactDetail)) return true;
    return false;
  };

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] w-full flex flex-col md:flex-row bg-stone-900 overflow-hidden border-t border-white/[0.04]">

      {/* Texture Background */}
      <div className="absolute inset-0 z-0 opacity-[0.45] pointer-events-none mix-blend-overlay">
        <Image src="/images/granite.jpg" alt="Textura de Granito" fill className="object-cover grayscale" sizes="100vw" />
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-leather-light/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {isSubmitted ? (
        <div className="relative z-10 w-full h-full min-h-[100svh] flex flex-col items-center justify-center">
          <div className="success-content flex flex-col items-center text-center space-y-8 p-8 max-w-2xl">
            <div className="w-24 h-24 border border-leather/30 rounded-full flex items-center justify-center text-leather-light mb-4 shadow-[inset_0_0_30px_rgba(196,106,50,0.1)] opacity-0">
              <Check size={40} />
            </div>
            <h3 className="text-5xl md:text-7xl font-serif text-stone-200 uppercase tracking-tight opacity-0">Recibido</h3>
            <p className="text-stone-400 font-light text-lg md:text-xl opacity-0">
              Tu solicitud de cotización está en nuestro taller. Nos pondremos en contacto contigo a la brevedad para afinar los detalles de tu pieza.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* LEFT COLUMN: Typography & Progress */}
          <div ref={leftColRef} className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-between p-8 md:p-12 lg:p-16 relative z-10 min-h-[40vh] md:min-h-[100svh] border-b md:border-b-0 md:border-r border-white/[0.04] bg-stone-950/50">

            <div className="step-nav mb-12 md:mb-0">
              <span className="text-stone-500 text-[10px] md:text-xs tracking-[0.4em] uppercase">
                0{step} / 04 — Cotización
              </span>
            </div>

            <div className="my-auto perspective-[1000px] pr-4">
              <h2 key={`title-${step}`} className="step-title text-5xl md:text-6xl lg:text-[4vw] font-serif leading-[0.95] text-stone-200 uppercase opacity-0 break-words md:break-normal">
                {TITLES[step - 1]}
              </h2>
            </div>

            <div className="hidden md:block mt-auto text-stone-700 text-[10px] uppercase tracking-widest">
              Bernal Atelier Bespoke
            </div>
          </div>

          {/* RIGHT COLUMN: Interaction Canvas */}
          <div ref={rightColRef} className="w-full md:w-[55%] lg:w-[60%] flex flex-col p-8 md:p-12 lg:p-16 relative z-10 min-h-[60vh] md:h-[100svh]">

            {/* Scrollable Content Area */}
            <div key={`content-${step}`} className="step-content-wrapper flex-1 flex flex-col overflow-y-auto no-scrollbar w-full max-w-3xl mx-auto opacity-0">
              <div className="my-auto py-8">
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                    {PRODUCTS.map((p, i) => {
                      const isActive = formData.product === p.title;
                      return (
                        <div
                          key={i}
                          ref={(el) => { cardsRef.current[i] = el; }}
                          onClick={() => setFormData({ ...formData, product: p.title })}
                          className={`opacity-0 group cursor-pointer transition-all duration-500 flex items-center gap-5 p-4 border ${isActive ? 'bg-[#1a1412] border-leather/60 shadow-[0_0_20px_rgba(196,106,50,0.15)]' : 'bg-stone-950/40 border-white/10 hover:border-leather/30 hover:bg-stone-900/60'}`}
                        >
                          <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 overflow-hidden bg-stone-950">
                            <Image src={p.img} alt={p.title} fill sizes="(max-width: 768px) 112px, 144px" className={`object-cover transition-all duration-700 ${isActive ? 'grayscale-0' : 'grayscale-[0.6] group-hover:grayscale-[0.2] brightness-90 group-hover:brightness-100'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-lg md:text-xl font-serif leading-tight transition-colors duration-300 ${isActive ? 'text-leather-light' : 'text-stone-200'}`}>{p.title}</h4>
                            <p className="text-stone-500 text-xs md:text-sm mt-1 leading-snug">{p.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="w-full">
                    <div className="step-element opacity-0">
                      <div className="relative group">
                        <textarea
                          value={formData.preferences}
                          onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                          placeholder="Color de piel, medidas específicas, grabado de iniciales... o déjalo en blanco y lo platicamos."
                          className="w-full h-48 md:h-64 bg-stone-950/60 border border-white/[0.05] focus:border-leather focus:bg-stone-950 outline-none text-stone-200 placeholder:text-stone-700 resize-none p-6 md:p-8 text-xl md:text-2xl font-light transition-all duration-500 leading-relaxed no-scrollbar focus:shadow-[0_0_30px_rgba(196,106,50,0.08)]"
                        />
                        <div className="absolute inset-0 border-stitching pointer-events-none opacity-0 group-focus-within:opacity-20 transition-opacity duration-500 m-2"></div>
                      </div>
                      <p className="text-stone-600 text-[10px] md:text-xs tracking-[0.3em] uppercase text-right mt-4">Opcional</p>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="w-full max-w-xl space-y-12">
                    <div className="step-element opacity-0 relative group">
                      <label className="text-stone-500 text-[10px] uppercase tracking-[0.3em] mb-3 block px-1">Tu Nombre Completo</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="Ej. Alejandro Bernal"
                          className="w-full bg-stone-950/60 border border-white/[0.05] focus:border-leather focus:bg-stone-950 outline-none text-stone-200 placeholder:text-stone-800 p-5 md:p-6 text-2xl md:text-3xl font-light transition-all duration-500 focus:shadow-[0_0_30px_rgba(196,106,50,0.08)]"
                        />
                        <div className="absolute inset-0 border-stitching pointer-events-none opacity-0 group-focus-within:opacity-20 transition-opacity duration-500 m-1.5"></div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="step-element opacity-0">
                        <label className="text-stone-500 text-[10px] uppercase tracking-[0.3em] mb-3 block px-1">Vía de Contacto</label>
                        <div className="relative flex w-full max-w-xs bg-[#1a1412] border border-white/[0.05] p-1.5 shadow-inner">
                          <div
                            className="toggle-pill absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-stone-800 pointer-events-none border border-white/5"
                            style={{ transform: formData.contactMethod === "whatsapp" ? "translateX(0)" : "translateX(100%)" }}
                          />
                          <button
                            onClick={() => handleToggle("whatsapp")}
                            className={`flex-1 relative z-10 text-[10px] md:text-xs py-4 transition-colors duration-300 tracking-[0.2em] uppercase font-medium ${formData.contactMethod === "whatsapp" ? "text-stone-200" : "text-stone-600 hover:text-stone-400"}`}
                          >
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleToggle("email")}
                            className={`flex-1 relative z-10 text-[10px] md:text-xs py-4 transition-colors duration-300 tracking-[0.2em] uppercase font-medium ${formData.contactMethod === "email" ? "text-stone-200" : "text-stone-600 hover:text-stone-400"}`}
                          >
                            Correo
                          </button>
                        </div>
                      </div>

                      <div className="step-element opacity-0 relative group">
                        <div className="relative">
                          <input
                            type={formData.contactMethod === "email" ? "email" : "tel"}
                            value={formData.contactDetail}
                            onChange={(e) => setFormData({ ...formData, contactDetail: e.target.value })}
                            placeholder={formData.contactMethod === "whatsapp" ? "+52 123 456 7890" : "tu@correo.com"}
                            className="w-full bg-stone-950/30 border border-white/[0.05] focus:border-leather focus:bg-[#1a1412] outline-none text-stone-200 placeholder:text-stone-800 p-5 md:p-6 text-2xl md:text-3xl font-light transition-all duration-500 focus:shadow-[0_0_30px_rgba(196,106,50,0.08)]"
                          />
                          <div className="absolute inset-0 border-stitching pointer-events-none opacity-0 group-focus-within:opacity-20 transition-opacity duration-500 m-1.5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div className="w-full">
                    <div className="step-element opacity-0 bg-[#120e0d] p-8 md:p-12 border border-white/[0.03] space-y-8 relative overflow-hidden">
                      <div className="absolute inset-3 border-stitching pointer-events-none opacity-20"></div>

                      <div className="relative z-10">
                        <span className="text-leather-light text-[10px] uppercase tracking-[0.3em] block mb-2">Producto Seleccionado</span>
                        <span className="text-stone-200 text-xl md:text-2xl font-serif">{formData.product}</span>
                      </div>
                      {formData.preferences && (
                        <div className="relative z-10">
                          <span className="text-leather-light text-[10px] uppercase tracking-[0.3em] block mb-2">Notas y Preferencias</span>
                          <span className="text-stone-300 text-lg md:text-xl font-light leading-relaxed italic border-l border-white/[0.1] pl-5 block">{formData.preferences}</span>
                        </div>
                      )}
                      <div className="relative z-10">
                        <span className="text-leather-light text-[10px] uppercase tracking-[0.3em] block mb-2">Datos de Contacto</span>
                        <span className="text-stone-200 text-xl font-light">{formData.contactName}</span>
                        <span className="text-stone-500 text-base block mt-1">Vía {formData.contactMethod === "whatsapp" ? "WhatsApp" : "Correo"} — {formData.contactDetail}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CONTROLS (Always visible at the bottom) */}
            <div key={`nav-${step}`} className="step-nav mt-6 pt-6 border-t border-white/[0.04] flex items-center justify-between w-full max-w-3xl mx-auto flex-shrink-0 opacity-0">

              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="group text-stone-500 hover:text-stone-300 text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-3 md:gap-4"
                >
                  <ArrowLeft size={16} className="text-stone-600 group-hover:-translate-x-1 transition-transform duration-300" />
                  Atrás
                </button>
              ) : (
                <div></div> // Empty div for flex spacing
              )}

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className="group flex items-center gap-4 md:gap-6 text-stone-200 text-xs md:text-sm uppercase tracking-[0.2em] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Continuar
                  <span className="w-10 h-10 md:w-14 md:h-14 border border-white/[0.1] flex items-center justify-center group-hover:border-leather/50 transition-colors duration-500 bg-[#1a1412]">
                    <ArrowRight size={16} className="text-stone-400 group-hover:text-leather group-hover:translate-x-1 transition-all duration-500" />
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-stone-200 text-stone-950 px-8 md:px-10 py-4 md:py-5 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300"
                >
                  Solicitar Cotización
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
