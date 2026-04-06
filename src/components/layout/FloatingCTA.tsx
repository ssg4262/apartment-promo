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
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-30 flex flex-col gap-2"
        >
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
  );
}
