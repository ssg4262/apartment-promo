"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon path issue with bundlers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  lat: number;
  lng: number;
  label?: string;
}

export default function LeafletMap({ lat, lng, label = "호반써밋 경산 상방공원 1단지" }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    // Custom bronze marker
    const icon = L.divIcon({
      html: `
        <div style="
          width:36px;height:44px;position:relative;
        ">
          <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 26 18 26S36 31.5 36 18C36 8.06 27.94 0 18 0z" fill="#B87348"/>
            <circle cx="18" cy="18" r="8" fill="white"/>
          </svg>
        </div>
      `,
      className: "",
      iconSize: [36, 44],
      iconAnchor: [18, 44],
      popupAnchor: [0, -44],
    });

    const marker = L.marker([lat, lng], { icon }).addTo(map);
    marker.bindPopup(
      `<div style="font-size:13px;font-weight:600;color:#222;padding:4px 2px;white-space:nowrap;">${label}</div>`,
      { closeButton: false }
    ).openPopup();

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, label]);

  return <div ref={containerRef} className="h-full w-full z-0" />;
}
