"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TrendingUp, Truck as TruckIcon, Sparkles, Watch, Footprints, Home } from "lucide-react";
import SwatchTile from "./SwatchTile";

const slides = [
  {
    image: "/hero/ae2ab3b1-dc6a-4a4e-88a7-df31f334a1c9.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
    eyebrow: "preview",
    title: "nova coleção",
    subtitle: "treino com atitude",
    cta: "Comprar",
  },
  {
    image: "/hero/de8169bdcc5800c9e8706ed4c0b35ec9.jpg",
    eyebrow: "recém-chegado",
    title: "linha performance",
    subtitle: "tecido que respira com você",
    cta: "Ver novidades",
  },
  {
    image: "/hero/ioga.jpg",
    eyebrow: "fim de semana",
    title: "frete grátis",
    subtitle: "em compras acima de R$149",
    cta: "Aproveitar frete",
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Big striking hero — full-bleed photo carousel */}
<section className="relative border-b border-hair overflow-hidden aspect-[4/3] sm:aspect-[16/7]">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === active ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={i !== active}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          </div>
        ))}

<div className="relative z-20 flex flex-col items-center justify-end sm:justify-center text-center h-full aspect-[4/3] sm:aspect-[16/7] px-6 py-12">
          <p className="italic text-white/90 text-sm sm:text-base mb-2 drop-shadow">
            {slides[active].eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-[0.95] tracking-tight mb-3 uppercase drop-shadow-lg">
            {slides[active].title}
          </h1>
          <p className="text-white/90 text-sm sm:text-base mb-7 drop-shadow">
            {slides[active].subtitle}
          </p>

          <a
            href="#produtos"
            className="inline-block bg-white text-ink border-2 border-white text-sm font-semibold tracking-wide uppercase px-8 py-3 hover:bg-transparent hover:text-white transition-colors"
          >
            {slides[active].cta}
          </a>
        </div>

        <button
          aria-label="Slide anterior"
          onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
          className="absolute z-20 left-3 sm:left-5 top-1/2 -translate-y-1/2 text-white hover:opacity-60 transition-opacity"
        >
          <ChevronLeft size={30} strokeWidth={1.5} />
        </button>
        <button
          aria-label="Próximo slide"
          onClick={() => setActive((a) => (a + 1) % slides.length)}
          className="absolute z-20 right-3 sm:right-5 top-1/2 -translate-y-1/2 text-white hover:opacity-60 transition-opacity"
        >
          <ChevronRight size={30} strokeWidth={1.5} />
        </button>

        <div className="absolute z-20 bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

    </>
  );
}

function TileCard({
  label,
  icon,
}: {
  label: string;
  icon: typeof TrendingUp;
  index: number;
}) {
  return (
    <a href="#produtos" className="relative overflow-hidden flex-1 min-h-[70px] group block">
      <SwatchTile icon={icon} className="absolute inset-0" />
      <span className="absolute inset-0 flex items-end p-3">
        <span className="text-ink text-xs sm:text-sm font-semibold border-b border-ink">{label}</span>
      </span>
    </a>
  );
}
