"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BIRDSEYE_TABS } from "@/data/birdseye";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

/* SVG-based architectural placeholder per tab */
const TAB_VISUALS: Record<string, React.ReactNode> = {
  perspective: (
    <svg viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e5e5e5"/><stop offset="100%" stopColor="#d4d4d4"/></linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#sky)"/>
      {/* Ground */}
      <rect y="450" width="1200" height="225" fill="#d4d4d4"/>
      <rect y="448" width="1200" height="2" fill="#a3a3a3" opacity="0.3"/>
      {/* Buildings */}
      {[120, 280, 440, 600, 760, 920].map((x, i) => {
        const h = [280, 320, 300, 340, 290, 310][i];
        return <g key={i}>
          <rect x={x} y={450 - h} width={80} height={h} fill={i % 2 === 0 ? "#a3a3a3" : "#b5b5b5"} />
          <rect x={x} y={450 - h} width={80} height={h} fill="none" stroke="#d4d4d4" strokeWidth="0.5"/>
          {/* Windows */}
          {Array.from({ length: Math.floor(h / 20) }).map((_, j) => (
            <g key={j}>
              <rect x={x + 10} y={450 - h + 10 + j * 20} width={12} height={8} fill="#d4d4d4" opacity="0.6"/>
              <rect x={x + 30} y={450 - h + 10 + j * 20} width={12} height={8} fill="#d4d4d4" opacity="0.6"/>
              <rect x={x + 50} y={450 - h + 10 + j * 20} width={12} height={8} fill="#d4d4d4" opacity="0.6"/>
            </g>
          ))}
        </g>;
      })}
      {/* Trees */}
      {[180, 380, 550, 850, 1050].map((x, i) => (
        <g key={i}>
          <rect x={x - 2} y={440} width={4} height={20} fill="#a3a3a3"/>
          <circle cx={x} cy={432} r={12} fill="#b5b5b5"/>
        </g>
      ))}
      {/* Label */}
      <text x="600" y="600" textAnchor="middle" fill="#737373" fontSize="14" fontFamily="sans-serif" fontWeight="300" letterSpacing="0.15em">PERSPECTIVE VIEW</text>
    </svg>
  ),
  siteplan: (
    <svg viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="1200" height="675" fill="#e5e5e5"/>
      {/* Roads */}
      <rect x="0" y="320" width="1200" height="40" fill="#d4d4d4"/>
      <rect x="560" y="0" width="40" height="675" fill="#d4d4d4"/>
      {/* Building blocks */}
      {[
        { x: 80, y: 60, w: 150, h: 100, label: "101동" },
        { x: 280, y: 60, w: 150, h: 100, label: "102동" },
        { x: 80, y: 200, w: 150, h: 80, label: "103동" },
        { x: 280, y: 200, w: 150, h: 80, label: "104동" },
        { x: 650, y: 60, w: 150, h: 100, label: "105동" },
        { x: 850, y: 60, w: 150, h: 100, label: "106동" },
        { x: 650, y: 200, w: 150, h: 80, label: "107동" },
        { x: 850, y: 200, w: 150, h: 80, label: "108동" },
        { x: 80, y: 400, w: 200, h: 90, label: "109동" },
        { x: 350, y: 400, w: 150, h: 90, label: "110동" },
        { x: 650, y: 400, w: 200, h: 90, label: "111동" },
        { x: 920, y: 400, w: 150, h: 90, label: "112동" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="#a3a3a3" stroke="#999" strokeWidth="0.5"/>
          <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 4} textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="500">{b.label}</text>
        </g>
      ))}
      {/* Green areas */}
      {[
        { x: 460, y: 80, r: 30 }, { x: 500, y: 180, r: 20 },
        { x: 550, y: 520, r: 25 }, { x: 200, y: 540, r: 18 },
        { x: 800, y: 540, r: 22 },
      ].map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="#b5b5b5" opacity="0.5"/>
      ))}
      <text x="600" y="640" textAnchor="middle" fill="#737373" fontSize="14" fontFamily="sans-serif" fontWeight="300" letterSpacing="0.15em">SITE PLAN</text>
    </svg>
  ),
  unitmap: (
    <svg viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="1200" height="675" fill="#e5e5e5"/>
      {/* Grid table header */}
      <rect x="50" y="40" width="1100" height="40" fill="#a3a3a3"/>
      <text x="600" y="66" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="sans-serif" fontWeight="500" letterSpacing="0.05em">동호수 배치표</text>
      {/* Grid rows */}
      {Array.from({ length: 12 }).map((_, row) => (
        <g key={row}>
          <rect x="50" y={100 + row * 42} width="120" height="40" fill="#d4d4d4" stroke="#ccc" strokeWidth="0.5"/>
          <text x="110" y={125 + row * 42} textAnchor="middle" fill="#737373" fontSize="11" fontFamily="sans-serif">{`${35 - row}층`}</text>
          {Array.from({ length: 8 }).map((_, col) => (
            <rect key={col} x={170 + col * 122.5} y={100 + row * 42} width="122.5" height="40" fill="white" stroke="#e5e5e5" strokeWidth="0.5"/>
          ))}
        </g>
      ))}
      {/* Column headers */}
      {["101호", "102호", "103호", "104호", "105호", "106호", "107호", "108호"].map((label, i) => (
        <text key={i} x={231 + i * 122.5} y={92} textAnchor="middle" fill="#737373" fontSize="10" fontFamily="sans-serif">{label}</text>
      ))}
      <text x="600" y="640" textAnchor="middle" fill="#737373" fontSize="14" fontFamily="sans-serif" fontWeight="300" letterSpacing="0.15em">UNIT MAP</text>
    </svg>
  ),
  community: (
    <svg viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="1200" height="675" fill="#e5e5e5"/>
      {/* Community areas */}
      {[
        { x: 60, y: 40, w: 350, h: 280, label: "피트니스 센터", icon: "●" },
        { x: 430, y: 40, w: 350, h: 280, label: "독서실 / 스터디룸", icon: "■" },
        { x: 800, y: 40, w: 350, h: 280, label: "골프 연습장", icon: "◆" },
        { x: 60, y: 350, w: 350, h: 280, label: "키즈카페", icon: "▲" },
        { x: 430, y: 350, w: 350, h: 280, label: "GX룸 / 요가", icon: "◇" },
        { x: 800, y: 350, w: 350, h: 280, label: "라운지 / 게스트하우스", icon: "○" },
      ].map((area, i) => (
        <g key={i}>
          <rect x={area.x} y={area.y} width={area.w} height={area.h} fill="#d4d4d4" stroke="#ccc" strokeWidth="0.5"/>
          <text x={area.x + area.w / 2} y={area.y + area.h / 2 - 10} textAnchor="middle" fill="#999" fontSize="24" fontFamily="sans-serif">{area.icon}</text>
          <text x={area.x + area.w / 2} y={area.y + area.h / 2 + 20} textAnchor="middle" fill="#737373" fontSize="13" fontFamily="sans-serif" fontWeight="500">{area.label}</text>
        </g>
      ))}
    </svg>
  ),
};

export default function BirdEyeSection() {
  const [activeTab, setActiveTab] = useState(BIRDSEYE_TABS[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const activeItem = BIRDSEYE_TABS.find((t) => t.id === activeTab)!;

  return (
    <SectionWrapper
      id="birdseye"
      title="단지 안내"
      subtitle="Complex"
      className="bg-neutral-50 dark:bg-[#0f0f0f]"
    >
      <RevealOnScroll>
        <div className="mb-12 flex gap-8 border-b border-neutral-200 dark:border-neutral-800">
          {BIRDSEYE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative pb-4 text-sm transition-colors",
                activeTab === tab.id
                  ? "font-medium text-neutral-900 dark:text-white"
                  : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="group relative cursor-pointer overflow-hidden"
              onClick={() => setModalOpen(true)}
            >
              <div className="aspect-[16/9]">
                {TAB_VISUALS[activeTab]}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                <Maximize2 size={24} strokeWidth={1} className="text-neutral-600 opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
            <p className="mt-4 text-[11px] text-neutral-400">
              * 클릭하여 확대 · {activeItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </RevealOnScroll>

      <ImageZoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} src={activeItem.image} alt={activeItem.label} />
    </SectionWrapper>
  );
}
