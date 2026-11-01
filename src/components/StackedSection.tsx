"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface StackedSectionProps {
  children: React.ReactNode;
  index: number;
  isLast?: boolean;
}

export function StackedSection({ children, index, isLast = false }: StackedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  const [scrollOffset, setScrollOffset] = useState<["end bottom" | "start start", "end top"]>(["start start", "end top"]);

  useEffect(() => {
    let rafId: number | null = null;

    const updateOffset = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (!sectionRef.current) return;
        const h = sectionRef.current.offsetHeight;
        const wh = window.innerHeight;
        const targetTop = h > wh ? wh - h : 0;
        setTopOffset((prev) => (prev !== targetTop ? targetTop : prev));
        const newOffset: ["end bottom" | "start start", "end top"] =
          h > wh ? ["end bottom", "end top"] : ["start start", "end top"];
        setScrollOffset((prev) =>
          prev[0] !== newOffset[0] || prev[1] !== newOffset[1] ? newOffset : prev
        );
      });
    };

    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    window.addEventListener('resize', updateOffset, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: scrollOffset as any
  });

  // Scale down subtly for a premium depth effect, originating from top center
  // to avoid gaps at the top while pinned.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <motion.section
      ref={sectionRef}
      className="w-full relative"
      style={{
        position: 'sticky',
        top: topOffset,
        zIndex: index,
      }}
    >
      <motion.div
        style={isLast ? {} : { scale, transformOrigin: "center top" }}
        className={`w-full h-full bg-black relative ${
          index > 0 
            ? 'rounded-t-[24px] sm:rounded-t-[32px] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-white/10' 
            : ''
        } overflow-hidden`}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
