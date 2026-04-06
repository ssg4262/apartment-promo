"use client";

import MarqueeTicker from "@/components/common/MarqueeTicker";

const KEYWORDS = [
  "경산 상방공원 조망",
  "1,004세대 대단지",
  "호반건설 프리미엄",
  "지하 2층 ~ 지상 35층",
  "써밋 브랜드",
  "세대당 1.56대 주차",
  "5개 타입 74~99㎡",
  "공원 품은 주거단지",
];

export default function MarqueeSection() {
  return (
    <div className="border-y border-neutral-100 bg-white py-5 dark:border-neutral-800 dark:bg-[#111]">
      <MarqueeTicker
        items={KEYWORDS}
        className="text-[11px] font-light uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500"
        speed={40}
      />
    </div>
  );
}
