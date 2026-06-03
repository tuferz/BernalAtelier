import Image from "next/image";

export default function PromoPage() {
  return (
    <main className="bg-stone-950 min-h-screen flex items-center justify-center p-8">
      {/* Contenedor principal para la captura (1080x1080 o similar, formato cuadrado para redes) */}
      <div 
        id="captura"
        className="relative w-full max-w-4xl bg-stone-950 overflow-hidden border border-stone-800/50 p-16 shadow-2xl flex flex-col items-center justify-center gap-16"
        style={{ aspectRatio: '1 / 1' }}
      >
        {/* Textura de Granito de Fondo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/granite.jpg"
            alt="Textura de Granito"
            fill
            sizes="100vw"
            className="object-cover opacity-25 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/40 to-transparent h-48" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <span className="text-leather-light text-sm md:text-base uppercase tracking-[0.4em]">Edición Especial</span>
          <h2 className="text-6xl md:text-7xl font-serif leading-[1.1]">
            Bernal <span className="italic font-normal">Atelier</span>
          </h2>
        </div>

        {/* Productos */}
        <div className="relative z-10 grid grid-cols-2 gap-12 w-full max-w-3xl">
          {/* Tarjetero */}
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden aspect-3/4 bg-stone-900 w-full border-stitching-solid">
              <Image
                src="/images/product4.jpg"
                alt="Tarjetero Minimalista"
                fill
                className="object-cover brightness-90 grayscale-[0.2]"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <h4 className="text-3xl font-serif mb-2">Tarjetero Minimalista</h4>
              <p className="text-stone-400 text-base md:text-lg font-light">Una pieza, tres ranuras. Pura geometría.</p>
            </div>
          </div>

          {/* Money Clip */}
          <div className="flex flex-col gap-6 mt-12">
            <div className="relative overflow-hidden aspect-3/4 bg-stone-900 w-full border-stitching-solid">
              <Image
                src="/images/product3.jpg"
                alt="Money Clip"
                fill
                className="object-cover brightness-90 grayscale-[0.2]"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <h4 className="text-3xl font-serif mb-2">Money Clip</h4>
              <p className="text-stone-400 text-base md:text-lg font-light">Acero y piel. Lo esencial, nada más.</p>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
