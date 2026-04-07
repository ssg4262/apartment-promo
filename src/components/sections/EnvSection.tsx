"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const TABS = [
  {
    id: "analysis",
    label: "입지분석",
    image: "/images/location/analysis.jpg",
    title: "시청·경찰서·학군·생활편의시설이 조화된 안정적인 도심 인프라 입지",
  },
  {
    id: "transport",
    label: "교통환경",
    image: "/images/location/transport.jpg",
    title: "임당역(1.7km)·경산역(1.3km) 접근성과 광역도로 이용이 용이한 교통입지",
  },
  {
    id: "education",
    label: "교육환경",
    image: "/images/location/education.jpg",
    title: "경산초(약 400m) 배정 예정, 1.5km 내 중·고교 다수로 학군 접근성 양호",
  },
  {
    id: "living",
    label: "생활환경",
    image: "/images/location/living.jpg",
    title: "공원·체육시설 접근성이 양호한 도심형 생활권",
  },
];

export default function EnvSection() {
  const [active, setActive] = useState(TABS[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <SectionWrapper id="environment" title="사업의 이해" subtitle="Overview">
      {/* Tabs */}
      <RevealOnScroll>
        <div className="mb-10 flex gap-8 border-b border-neutral-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative pb-4 text-sm transition-colors whitespace-nowrap",
                active === tab.id
                  ? "font-medium text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {tab.label}
              {active === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Image */}
      <RevealOnScroll>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="group relative cursor-pointer overflow-hidden rounded-sm shadow-md"
              onClick={() => setModalOpen(true)}
            >
              <div className="aspect-[16/9] bg-neutral-100">
                <img
                  src={getImagePath(activeTab.image)}
                  alt={activeTab.label}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                <Maximize2 size={24} strokeWidth={1} className="text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              * 클릭하여 확대 · {activeTab.title}
            </p>
          </motion.div>
        </AnimatePresence>
      </RevealOnScroll>

      <ImageZoomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={activeTab.image}
        alt={activeTab.label}
      />
    </SectionWrapper>
  );
}
