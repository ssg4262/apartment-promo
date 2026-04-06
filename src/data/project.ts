import type { ProjectInfo } from "@/types";

export const PROJECT: ProjectInfo = {
  name: "호반써밋 경산 상방공원 1단지",
  location: "경상북도 경산시 상방동 일원",
  developer: "호반건설(주)",
  totalUnits: 980,
  totalBuildings: 10,
  maxFloors: 29,
  parkingSpaces: 1274,
  moveInDate: "2027년 12월 예정",
  phone: "1800-6700",
  siteArea: "42,156.00㎡",
  buildingArea: "6,324.00㎡",
  floorAreaRatio: "249.97%",
  buildingCoverageRatio: "14.99%",
  structure: "철근콘크리트 벽식구조",
  heating: "개별난방 (도시가스)",
};

export const PROJECT_STATS = [
  { label: "총 세대수", value: 980, suffix: "세대" },
  { label: "총 동수", value: 10, suffix: "개동" },
  { label: "최고 층수", value: 29, suffix: "층" },
  { label: "주차 대수", value: 1274, suffix: "대" },
] as const;

export const PROJECT_OVERVIEW_TABLE = [
  { label: "사업명", value: "호반써밋 경산 상방공원 1단지" },
  { label: "위치", value: "경상북도 경산시 상방동 일원" },
  { label: "대지면적", value: "42,156.00㎡" },
  { label: "건축면적", value: "6,324.00㎡" },
  { label: "용적률", value: "249.97%" },
  { label: "건폐율", value: "14.99%" },
  { label: "규모", value: "지하 2층 ~ 지상 29층, 10개동" },
  { label: "총세대수", value: "980세대" },
  { label: "주차대수", value: "1,274대 (세대당 1.3대)" },
  { label: "구조", value: "철근콘크리트 벽식구조" },
  { label: "난방방식", value: "개별난방 (도시가스)" },
  { label: "입주예정일", value: "2027년 12월 예정" },
  { label: "시공사", value: "호반건설(주)" },
] as const;
