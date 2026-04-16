import type { ProjectInfo } from "@/types";

export const PROJECT: ProjectInfo = {
  name: "호반써밋 경산 상방공원 1단지",
  location: "경상북도 경산시 상방동 71-1 일원",
  showroom: "대구광역시 수성구 사월동 367-3",
  developer: "호반건설(주)",
  totalUnits: 1004,
  totalBuildings: 8,
  maxFloors: 35,
  parkingSpaces: 1572,
  moveInDate: "2027년 12월 예정",
  phone: "1866-2011",
  siteArea: "51,163.0000㎡",
  buildingArea: "9,305.8665㎡",
  floorAreaRatio: "229.94%",
  buildingCoverageRatio: "18.19%",
  structure: "철근콘크리트 벽식구조",
  heating: "개별난방 (도시가스)",
};

export const PROJECT_STATS = [
  { label: "총 세대수", value: 1004, suffix: "세대" },
  { label: "총 동수", value: 8, suffix: "개동" },
  { label: "최고 층수", value: 35, suffix: "층" },
  { label: "주차 대수", value: 1572, suffix: "대" },
] as const;

export const PROJECT_OVERVIEW_TABLE = [
  { label: "사업명", value: "경산시 상방공원 민간공원조성 특례사업 호반써밋 1단지 공동주택 신축사업" },
  { label: "현장", value: "경상북도 경산시 상방동 71-1 일원" },
  { label: "홍보관", value: "대구광역시 수성구 사월동 367-3" },
  { label: "대지면적", value: "51,163.0000㎡ (15,476.81평)" },
  { label: "건축면적", value: "9,305.8665㎡ (2,815.02평)" },
  { label: "연면적", value: "176,751.1994㎡ (53,467.23평)" },
  { label: "건폐율 / 용적률", value: "18.19% / 229.94%" },
  { label: "규모", value: "지하 2층 ~ 지상 35층 / 8개동" },
  { label: "용도", value: "공동주택 (아파트, 부대복리시설)" },
  { label: "주택형", value: "74㎡A, 84㎡A, 84㎡B, 99㎡A, 99㎡B / 총 5개 타입" },
  { label: "세대수", value: "1,004 세대" },
  { label: "주차대수", value: "총 1,572대 (세대당 1.56대) / 근린생활시설 4대" },
  { label: "시공사", value: "호반건설(주)" },
] as const;
