import type { BirdEyeTab } from "@/types";

export const BIRDSEYE_TABS: BirdEyeTab[] = [
  {
    id: "perspective",
    label: "조감도",
    image: "/images/overview/birdseye-aerial.jpg",
    description: "호반써밋 경산 상방공원 1단지 조감도 (CG)",
  },
  {
    id: "night",
    label: "투시도",
    image: "/images/overview/birdseye-night.jpg",
    description: "야경 투시도 (CG)",
  },
  {
    id: "wide",
    label: "광역조감도",
    image: "/images/overview/birdseye-wide.jpg",
    description: "1단지·2단지 및 상방공원 광역 조감도 (CG)",
  },
  {
    id: "siteplan",
    label: "단지배치도",
    image: "/images/overview/siteplan.jpg",
    description: "동별 배치 및 타입 구성",
  },
];
