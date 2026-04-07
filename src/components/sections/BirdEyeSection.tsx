"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import { BIRDSEYE_TABS } from "@/data/birdseye";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

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
              <div className="aspect-[16/9] bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={getImagePath(activeItem.image)}
                  alt={activeItem.label}
                  className="h-full w-full object-cover"
                />
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
