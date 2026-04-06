"use client";

import { cn, getImagePath } from "@/lib/utils";
import RevealOnScroll from "@/components/common/RevealOnScroll";

interface VideoSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  src: string;
  poster?: string;
  dark?: boolean;
}

export default function VideoSection({
  id,
  title,
  subtitle,
  src,
  poster,
  dark = false,
}: VideoSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        dark ? "bg-[#0a0a0a]" : "bg-white"
      )}
    >
      {/* Title bar */}
      <div className={cn(
        "py-10 md:py-14",
        dark ? "bg-[#0a0a0a]" : "bg-white"
      )}>
        <div className="mx-auto max-w-7xl section-padding">
          <RevealOnScroll>
            <span className={cn(
              "label-caps mb-3 block",
              dark ? "text-neutral-400" : "text-neutral-500"
            )}>
              {subtitle}
            </span>
            <h2 className={cn(
              "heading-display text-2xl md:text-3xl lg:text-4xl",
              dark ? "text-white" : "text-neutral-900"
            )}>
              {title}
            </h2>
            <div className="mt-5 h-px w-12 bg-accent" />
          </RevealOnScroll>
        </div>
      </div>

      {/* Video - contained width with max height */}
      <div className="mx-auto max-w-6xl section-padding pb-10 md:pb-14">
        <video
          src={getImagePath(src)}
          poster={poster ? getImagePath(poster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="auto"
          className="w-full rounded-sm"
          style={{ maxHeight: "70vh" }}
        />
      </div>
    </section>
  );
}
