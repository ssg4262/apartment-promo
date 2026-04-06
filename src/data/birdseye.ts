import type { BirdEyeTab } from "@/types";

export const BIRDSEYE_TABS: BirdEyeTab[] = [
  {
    id: "perspective",
    label: "조감도",
    image: "/images/overview/perspective.jpg",
    description: "르클래스 센트럴파크의 전체 단지 조감도",
  },
  {
    id: "siteplan",
    label: "배치도",
    image: "/images/overview/siteplan.jpg",
    description: "동별 배치 및 조경 계획",
  },
  {
    id: "unitmap",
    label: "동호수배치도",
    image: "/images/overview/unitmap.jpg",
    description: "동호수 배치 현황",
  },
  {
    id: "community",
    label: "커뮤니티",
    image: "/images/overview/community.jpg",
    description: "단지 내 커뮤니티 시설 안내",
  },
];
