"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getImagePath, convertToPyeong } from "@/lib/utils";
import { UNIT_TYPES } from "@/data/unit-types";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";

export default function FloorPlanSection() {
  const [selectedType, setSelectedType] = useState(UNIT_TYPES[0].id);
  const [usePyeong, setUsePyeong] = useState(false);
  const unit = UNIT_TYPES.find((u) => u.id === selectedType)!;

  const fmt = (sqm: number) => usePyeong ? `${convertToPyeong(sqm)}평` : `${sqm}㎡`;

  return (
    <SectionWrapper id="floorplan" title="세대 안내" subtitle="Unit Types">
      {/* Type selector - horizontal scroll */}
      <RevealOnScroll>
        <div className="mb-12 flex gap-px overflow-x-auto bg-neutral-200 dark:bg-neutral-800">
          {UNIT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={cn(
                "shrink-0 px-6 py-3 text-sm transition-colors",
                selectedType === type.id
                  ? "bg-accent font-semibold text-white"
                  : "bg-white text-neutral-500 hover:bg-neutral-50 dark:bg-[#0a0a0a] dark:hover:bg-neutral-900"
              )}
            >
              {type.name}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid gap-12 lg:grid-cols-2"
        >
          {/* Floor plan */}
          <div className="flex items-center justify-center bg-neutral-50 p-12 dark:bg-neutral-900/50">
            <img
              src={getImagePath(unit.image)}
              alt={`${unit.name} 타입`}
              className="h-auto w-full max-w-md"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8">
              <span className="label-caps text-neutral-500 dark:text-neutral-400">Type {unit.name}</span>
              <h3 className="heading-display mt-2 text-3xl text-neutral-900 dark:text-white md:text-4xl">
                전용 {fmt(unit.exclusiveArea)}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {unit.rooms}Room · {unit.baths}Bath · {unit.unitCount}세대
              </p>
            </div>

            {/* Unit toggle */}
            <div className="mb-6 flex items-center gap-2">
              <button
                onClick={() => setUsePyeong(false)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition",
                  !usePyeong
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-400"
                )}
              >
                ㎡
              </button>
              <button
                onClick={() => setUsePyeong(true)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition",
                  usePyeong
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-400"
                )}
              >
                평
              </button>
            </div>

            {/* Specs */}
            <div className="divide-y divide-neutral-100 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              {[
                { label: "전용면적", value: unit.exclusiveArea },
                { label: "주거공용", value: unit.commonArea },
                { label: "공급면적", value: unit.supplyArea },
                { label: "기타공용", value: unit.otherCommonArea },
                { label: "계약면적", value: unit.contractArea },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3.5">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">{row.label}</span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">{fmt(row.value)}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[11px] text-neutral-300 dark:text-neutral-600">
              ※ 상기 면적은 인허가 과정에서 다소 변경될 수 있습니다.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
