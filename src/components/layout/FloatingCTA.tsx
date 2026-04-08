"use client";

import { Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { PROJECT } from "@/data/project";

export default function FloatingCTA() {
  const { scrollY } = useScrollDirection();
  const scrollTo = useSmoothScroll();
  const visible = scrollY > 800;

  return (
    <>
      {/* Desktop: 좌측 하단 */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-30 hidden md:flex flex-col gap-2"
          >
            <a
              href={`tel:${PROJECT.phone}`}
              className="flex items-center gap-2 bg-neutral-900 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white shadow-2xl transition hover:bg-black"
            >
              <Phone size={13} strokeWidth={2} />
              전화상담
            </a>
            <button
              onClick={() => scrollTo("registration")}
              className="flex items-center gap-2 bg-accent px-5 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white shadow-2xl transition hover:bg-accent-dark"
            >
              관심고객
              <ArrowRight size={12} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: 하단 고정 바 */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-0 left-0 right-0 z-30 flex md:hidden"
          >
            <a
              href={`tel:${PROJECT.phone}`}
              className="flex flex-1 items-center justify-center gap-2 bg-neutral-900 py-4 text-xs font-semibold text-white transition active:bg-black"
            >
              <Phone size={15} strokeWidth={2} />
              전화상담
            </a>
            <button
              onClick={() => scrollTo("registration")}
              className="flex flex-1 items-center justify-center gap-2 bg-accent py-4 text-xs font-semibold text-white transition active:bg-accent-dark"
            >
              관심고객 등록
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
