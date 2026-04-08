import type { BirdEyeTab } from "@/types";

export const BIRDSEYE_TABS: BirdEyeTab[] = [
  {
    id: "perspective",
    label: "조감도",
    image: "/images/overview/perspective.jpg",
    description: "단지 조감도 (CG)",
  },
  {
    id: "night",
    label: "투시도",
    image: "/images/overview/birdseye-night.jpg",
    description: "야경 투시도 (CG)",
  },
  {
    id: "siteplan",
    label: "단지배치도",
    image: "/images/overview/siteplan.jpg",
    description: "동별 배치 및 타입 구성",
  },
  {
    id: "unit-layout",
    label: "동호배치",
    image: "/images/overview/unit-layout.jpg",
    description: "전 세대 동·호수 배치표",
  },
];
