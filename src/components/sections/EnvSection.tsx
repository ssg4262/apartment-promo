"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const TABS = [
  { id: "analysis",  label: "입지분석",       image: "/images/location/analysis.jpg"  },
  { id: "transport", label: "교통환경",       image: "/images/location/transport.jpg" },
  { id: "education", label: "교육환경",       image: "/images/location/education.jpg" },
  { id: "living",    label: "생활환경",       image: "/images/location/living.jpg"    },
  { id: "living2",   label: "녹지·공원인프라", image: "/images/location/living2.jpg"   },
  { id: "sports",    label: "경산생활체육공원", image: "/images/location/sports.jpg"    },
];

export default function EnvSection() {
  const [active, setActive] = useState(TABS[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <SectionWrapper id="environment" title="입지 분석" subtitle="Location Analysis">
      {/* Tabs */}
      <RevealOnScroll>
        <div className="mb-10 flex gap-6 overflow-x-auto border-b border-neutral-200 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative pb-4 text-[15px] transition-colors whitespace-nowrap",
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
              className="group relative -mx-5 cursor-pointer overflow-hidden shadow-md md:mx-0 md:rounded-sm"
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
              * 클릭하여 확대 · {activeTab.label}
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
