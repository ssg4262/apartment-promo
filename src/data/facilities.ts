import type { Facility } from "@/types";

export const FACILITY_CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: "transport", label: "교통", icon: "Train" },
  { id: "education", label: "교육", icon: "GraduationCap" },
  { id: "convenience", label: "편의시설", icon: "ShoppingBag" },
  { id: "medical", label: "의료", icon: "Heart" },
  { id: "park", label: "공원", icon: "TreePine" },
];

export const FACILITIES: Facility[] = [
  { id: "f1", name: "경산역", category: "transport", distance: "2.5km", time: "차량 7분" },
  { id: "f2", name: "상방정류장", category: "transport", distance: "200m", time: "도보 3분" },
  { id: "f3", name: "경산IC", category: "transport", distance: "3km", time: "차량 8분" },
  { id: "f4", name: "상방초등학교", category: "education", distance: "300m", time: "도보 4분" },
  { id: "f5", name: "경산중학교", category: "education", distance: "500m", time: "도보 7분" },
  { id: "f6", name: "경산고등학교", category: "education", distance: "800m", time: "도보 10분" },
  { id: "f7", name: "경산도서관", category: "education", distance: "600m", time: "도보 8분" },
  { id: "f8", name: "이마트 경산점", category: "convenience", distance: "1.5km", time: "차량 5분" },
  { id: "f9", name: "경산중앙시장", category: "convenience", distance: "2km", time: "차량 6분" },
  { id: "f10", name: "하나로마트", category: "convenience", distance: "500m", time: "도보 7분" },
  { id: "f11", name: "경산시청", category: "convenience", distance: "2.5km", time: "차량 7분" },
  { id: "f12", name: "경산제일병원", category: "medical", distance: "1.8km", time: "차량 5분" },
  { id: "f13", name: "삼성의원", category: "medical", distance: "400m", time: "도보 5분" },
  { id: "f14", name: "경산보건소", category: "medical", distance: "2km", time: "차량 6분" },
  { id: "f15", name: "상방공원", category: "park", distance: "100m", time: "도보 1분" },
  { id: "f16", name: "남산공원", category: "park", distance: "1km", time: "도보 13분" },
  { id: "f17", name: "경산둘레길", category: "park", distance: "500m", time: "도보 7분" },
];
