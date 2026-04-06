"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECT } from "@/data/project";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const SLIDES = [
  {
    number: "01",
    title: "경산의\n새로운 자부심",
    sub: PROJECT.name,
    desc: "상방공원 조망, 980세대 프리미엄 대단지",
    bgStyle: {
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #0d0d0d 100%)",
    },
    decorColor: "rgba(255,255,255,0.03)",
  },
  {
    number: "02",
    title: "공원 속\n프리미엄 라이프",
    sub: "Park Premium",
    desc: "상방공원 품은 자연친화 주거단지",
    bgStyle: {
      background: "linear-gradient(135deg, #0d0d0d 0%, #111 50%, #0a0a0a 100%)",
    },
    decorColor: "rgba(255,255,255,0.02)",
  },
  {
    number: "03",
    title: "호반써밋이\n증명하는 품격",
    sub: "Hoban Summit",
    desc: "호반건설의 프리미엄 브랜드, 써밋 시리즈",
    bgStyle: {
      background: "linear-gradient(135deg, #0a0a0a 0%, #151515 50%, #0a0a0a 100%)",
    },
    decorColor: "rgba(255,255,255,0.025)",
  },
];

export default function HeroSection() {
  const scrollTo = useSmoothScroll();
  const [selected, setSelected] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section id="hero" className="relative h-[100svh] bg-black overflow-hidden">
      {/* Slide backgrounds */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]" style={slide.bgStyle}>
              {/* Geometric decoration */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Large circle */}
                <div
                  className="absolute -right-[20%] top-[10%] h-[70vh] w-[70vh] rounded-full border"
                  style={{ borderColor: slide.decorColor }}
                />
                {/* Small circle */}
                <div
                  className="absolute right-[15%] top-[25%] h-[25vh] w-[25vh] rounded-full border"
                  style={{ borderColor: slide.decorColor }}
                />
                {/* Horizontal lines */}
                <div className="absolute left-0 top-[40%] h-px w-[30%]" style={{ background: `linear-gradient(90deg, transparent, ${slide.decorColor})` }} />
                <div className="absolute left-0 top-[42%] h-px w-[20%]" style={{ background: `linear-gradient(90deg, transparent, ${slide.decorColor})` }} />
                {/* Vertical line right */}
                <div className="absolute right-[30%] top-0 h-full w-px" style={{ background: `linear-gradient(180deg, transparent, ${slide.decorColor}, transparent)` }} />
                {/* Corner frame */}
                <div className="absolute right-[10%] bottom-[20%] h-32 w-32 border-b border-r" style={{ borderColor: slide.decorColor }} />
                {/* Dot grid */}
                <div className="absolute right-[8%] top-[15%] grid grid-cols-5 gap-4 opacity-30">
                  {Array.from({ length: 25 }).map((_, j) => (
                    <div key={j} className="h-px w-px bg-white/20 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end pb-36 md:items-center md:pb-0">
        <div className="w-full section-padding">
          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 flex items-center gap-6"
                >
                  <span className="text-[10px] font-light tracking-[0.3em] text-white/60">
                    {SLIDES[selected].number}
                  </span>
                  <div className="h-px w-16 bg-white/20" />
                  <span className="text-[10px] font-light tracking-[0.2em] text-white/60 uppercase">
                    {SLIDES[selected].sub}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="heading-display mb-8 whitespace-pre-line text-white text-[clamp(2.8rem,7.5vw,7rem)]"
                >
                  {SLIDES[selected].title}
                </motion.h1>

                {/* Desc */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-12 max-w-md text-sm font-light leading-relaxed text-white/70 md:text-base"
                >
                  {SLIDES[selected].desc}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <button
                    onClick={() => scrollTo("registration")}
                    className="bg-accent px-8 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-accent-dark"
                  >
                    관심고객 등록
                  </button>
                  <a
                    href={`tel:${PROJECT.phone}`}
                    className="border border-white/30 px-8 py-4 text-[11px] font-light uppercase tracking-[0.15em] text-white/70 transition-all hover:border-white/30 hover:text-white/70"
                  >
                    {PROJECT.phone}
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="group relative flex-1 py-6"
            >
              <div className="h-px w-full bg-white/5">
                <motion.div
                  className="h-full bg-accent-light"
                  initial={{ width: "0%" }}
                  animate={{ width: selected === i ? "100%" : "0%" }}
                  transition={{ duration: selected === i ? 8 : 0.3, ease: "linear" }}
                />
              </div>
              <span className={cn(
                "absolute bottom-1.5 left-0 text-[9px] font-light tracking-wider transition",
                selected === i ? "text-white/80" : "text-white/50"
              )}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Side indicators */}
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex md:right-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "transition-all duration-500",
              selected === i ? "h-12 w-px bg-white/60" : "h-6 w-px bg-white/20 hover:bg-white/20"
            )}
            aria-label={`슬라이드 ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows - hidden on mobile */}
      <div className="absolute bottom-10 right-10 z-20 hidden gap-px md:flex">
        <button onClick={scrollPrev} className="border border-white/10 p-3 text-white/60 transition hover:bg-white/5 hover:text-white/80" aria-label="이전">
          <ChevronLeft size={16} strokeWidth={1} />
        </button>
        <button onClick={scrollNext} className="border border-white/10 p-3 text-white/60 transition hover:bg-white/5 hover:text-white/80" aria-label="다음">
          <ChevronRight size={16} strokeWidth={1} />
        </button>
      </div>

      {/* Scroll down */}
      <motion.button
        onClick={() => scrollTo("overview")}
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-white/50 transition hover:text-white/30"
        aria-label="스크롤"
      >
        <ArrowDown size={16} strokeWidth={1} />
      </motion.button>
    </section>
  );
}
