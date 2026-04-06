"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Train, GraduationCap, ShoppingBag, Heart, TreePine, MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FACILITY_CATEGORIES, FACILITIES } from "@/data/facilities";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";

// Dynamic import to avoid SSR issues with Leaflet
const LeafletMap = dynamic(() => import("@/components/common/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-neutral-100">
      <MapPin size={24} className="text-neutral-300 animate-pulse" />
    </div>
  ),
});

const ICON_MAP: Record<string, React.ElementType> = {
  Train, GraduationCap, ShoppingBag, Heart, TreePine,
};

export default function LocationSection() {
  const [active, setActive] = useState<string>("all");

  const filtered = active === "all"
    ? FACILITIES
    : FACILITIES.filter((f) => f.category === active);

  return (
    <SectionWrapper id="location" title="입지 환경" subtitle="Location">
      {/* Category buttons */}
      <RevealOnScroll>
        <div className="mb-12 flex flex-wrap gap-6">
          <button
            onClick={() => setActive("all")}
            className={cn(
              "text-sm transition",
              active === "all" ? "font-medium text-neutral-900 dark:text-white" : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            전체
          </button>
          {FACILITY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "text-sm transition",
                active === cat.id ? "font-medium text-neutral-900 dark:text-white" : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Real map */}
        <RevealOnScroll className="lg:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md">
            <LeafletMap
              lat={35.8249}
              lng={128.7438}
              label="호반써밋 경산 상방공원 1단지"
            />
          </div>
          {/* Address badge */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 border border-neutral-200 px-3 py-1 text-[11px] text-neutral-500">
              <MapPin size={10} /> 경상북도 경산시 상방동 71-1번지
            </span>
            <span className="border border-neutral-200 px-3 py-1 text-[11px] text-neutral-500">
              상방공원 도보 1분
            </span>
            <span className="border border-neutral-200 px-3 py-1 text-[11px] text-neutral-500">
              경산IC 차량 8분
            </span>
          </div>
        </RevealOnScroll>

        {/* Facility list */}
        <RevealOnScroll className="lg:col-span-2" delay={0.15}>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800" style={{ maxHeight: "480px", overflowY: "auto" }}>
            {filtered.map((f) => {
              const catInfo = FACILITY_CATEGORIES.find((c) => c.id === f.category);
              const Icon = catInfo ? ICON_MAP[catInfo.icon] : MapPin;
              return (
                <div key={f.id} className="flex items-center gap-4 py-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                    {Icon && <Icon size={16} strokeWidth={1.5} className="text-neutral-500" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200">{f.name}</p>
                    <div className="flex gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span>{f.distance}</span>
                      <span>{f.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  );
}
