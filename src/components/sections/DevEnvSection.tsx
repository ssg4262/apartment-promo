"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { getImagePath } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const ITEMS = [
  { id: "market-21", label: "분양/입주현황", image: "/images/market/market-21.jpg" },
  { id: "dev-28", label: "상방공원", image: "/images/devenv/devenv-28.jpg" },
];

export default function DevEnvSection() {
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState("");

  const openModal = (image: string, alt: string) => {
    setModalSrc(image);
    setModalAlt(alt);
  };

  return (
    <SectionWrapper id="devenv" title="개발환경" subtitle="Development" className="bg-neutral-50">
      <div className="flex flex-col gap-10">
        {ITEMS.map((item) => (
          <RevealOnScroll key={item.id}>
            <h3 className="mb-4 text-lg font-semibold text-neutral-800">{item.label}</h3>
            <div
              className="group relative cursor-pointer overflow-hidden rounded-sm shadow-md"
              onClick={() => openModal(item.image, item.label)}
            >
              <div className="aspect-[16/9] bg-neutral-100">
                <img
                  src={getImagePath(item.image)}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                <Maximize2 size={24} strokeWidth={1} className="text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-400">* 클릭하여 확대</p>
          </RevealOnScroll>
        ))}
      </div>

      <ImageZoomModal
        isOpen={!!modalSrc}
        onClose={() => setModalSrc(null)}
        src={modalSrc ?? ""}
        alt={modalAlt}
      />
    </SectionWrapper>
  );
}
