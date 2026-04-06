"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className,
  title,
  subtitle,
  dark = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32",
        dark
          ? "bg-[#0a0a0a] text-white"
          : "bg-white dark:bg-[#0a0a0a] dark:text-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl section-padding">
        {(title || subtitle) && (
          <div className="mb-16 md:mb-20">
            {subtitle && (
              <span className="label-caps mb-4 block text-neutral-500 dark:text-neutral-400">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="heading-display text-3xl text-neutral-900 dark:text-white md:text-4xl lg:text-[2.75rem]">
                {title}
              </h2>
            )}
            <div className="mt-6 h-px w-12 bg-accent" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
