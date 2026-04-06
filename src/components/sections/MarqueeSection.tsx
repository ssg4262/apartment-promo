"use client";

import MarqueeTicker from "@/components/common/MarqueeTicker";

const KEYWORDS = [
  "경산 상방공원 조망",
  "980세대 대단지",
  "호반건설 프리미엄",
  "지하 2층 ~ 지상 29층",
  "써밋 브랜드",
  "경산 중심 입지",
  "프리미엄 커뮤니티",
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
