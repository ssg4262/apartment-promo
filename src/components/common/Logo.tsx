"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className, light = false, size = "sm" }: LogoProps) {
  const sizes = {
    sm: { hoban: "text-[9px]", summit: "text-[15px]" },
    md: { hoban: "text-[11px]", summit: "text-[20px]" },
    lg: { hoban: "text-[16px]", summit: "text-[32px]" },
  };

  return (
    <div className={cn("flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          sizes[size].hoban,
          "font-medium tracking-[0.25em]",
          light ? "text-[#c4835a]" : "text-[#b87348]"
        )}
      >
        HOBAN
      </span>
      <span
        className={cn(
          sizes[size].summit,
          "font-extrabold tracking-[0.02em]",
          light ? "text-white" : "text-black dark:text-white"
        )}
      >
        SUMMIT
      </span>
    </div>
  );
}
