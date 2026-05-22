# 🪵 Bernal Atelier — Lujo Rústico & Artesanía en Cuero

Un portafolio y catálogo digital boutique diseñado para un taller de marroquinería y artesanía en cuero premium. Este sitio web fusiona el rigor industrial con la calidez del trabajo hecho a mano.

---

## 🎨 Filosofía & Concepto

**Bernal Atelier** nace de una búsqueda personal por la perfección tangible. Su creador, **Eben**, divide su vida entre el rigor técnico de la industria y la libertad creativa del taller de cuero. 

Esta dualidad imprime en cada pieza una atención al detalle obsesiva y una durabilidad pensada para resistir las condiciones más exigentes, sin perder la elegancia rústica.

---

## ✨ Características de la Experiencia (Premium UI/UX)

*   **Desplazamiento Ultra-Suave:** Integración de `Lenis Scroll` para una sensación de navegación fluida y premium.
*   **Micro-animaciones Orgánicas:** Transiciones asimétricas, efectos parallax y entradas dinámicas potenciadas con `Framer Motion`.
*   **Texturas Analógicas:** Capa global de ruido (`NoiseOverlay`) y fondos texturizados (granito y cuero) para evocar una sensación física y táctil.
*   **Botones Magnéticos:** Componentes interactivos que reaccionan con una atracción magnética sutil al pasar el cursor.
*   **Paleta de Color Cordobesa:** Inspirada en cueros curtidos al vegetal, caoba profunda, tonos hueso y costuras rústicas (`--color-stone-950` mapeado a `#130a06` en combinación con tonos `leather`).
*   **Sello Artesanal Fijo:** Un emblema interactivo rotativo (`ArtisanStamp`) que acompaña la navegación en la esquina inferior derecha.

---

## 🛠️ Stack Tecnológico

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
*   **Librería UI:** [React 19](https://react.dev/)
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (aprovechando `@theme` nativo y directivas v4)
*   **Animaciones:** [Framer Motion 12](https://motion.dev/)
*   **Scroll:** [Lenis](https://lenis.darkroom.engineering/)
*   **Iconos:** [Lucide React](https://lucide.dev/)

---

## 📁 Estructura del Código

```bash
src/
├── app/
│   ├── globals.css      # Sistema de diseño con variables personalizadas (caoba, costuras, texturas)
│   ├── layout.tsx       # Estructura principal con NoiseOverlay y ArtisanStamp
│   └── page.tsx         # Composición de la landing page única
└── components/
    ├── AboutSection.tsx # Filosofía e introducción de Eben, el artesano
    ├── ArtisanStamp.tsx # Sello interactivo giratorio
    ├── FeaturesSection.tsx # Los tres pilares: piel genuina, cosido a mano y personalización
    ├── FooterSection.tsx # Sección de contacto y cierre del taller
    ├── HeroSection.tsx  # Bienvenida inmersiva con efecto paralaje e iluminación focal cálida
    ├── MagneticButton.tsx # Botón interactivo con física magnética
    ├── Navbar.tsx       # Navegación minimalista y fluida
    ├── NoiseOverlay.tsx # Overlay de grano sutil sobre toda la interfaz
    ├── PortfolioSection.tsx # Catálogo curado con imágenes asimétricas que reaccionan al hover
    ├── SmoothScroll.tsx # Habilitador del scroll Lenis
    └── useRevealOnScroll.ts # Hook reutilizable para animaciones scroll-triggered
```

---

## 🚀 Inicio Rápido (Desarrollo Local)

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (se recomienda versión LTS).

### Pasos para Ejecutar

1.  **Clonar el proyecto**
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    El sitio estará disponible en [http://localhost:3000](http://localhost:3000).
4.  **Generar el build de producción:**
    ```bash
    npm run build
    ```

---

*Diseñado y desarrollado con el máximo respeto por el oficio de la marroquinería.* 🧵🪡
