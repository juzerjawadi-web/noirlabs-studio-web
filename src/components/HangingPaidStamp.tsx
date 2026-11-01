import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface HangingPaidStampProps {
  className?: string;
  style?: React.CSSProperties;
}

export function HangingPaidStamp({ className = '', style }: HangingPaidStampProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '150px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-auto flex flex-col items-center ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Mounting Grommet / Rivet (Fixed to card rim) */}
      <div className="relative z-20 flex items-center justify-center -mb-1">
        {/* Outer metallic brass/gold grommet ring */}
        <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#d4af37] via-[#aa820a] to-[#594204] p-[1.5px] shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center">
          {/* Inner dark eyelet hole with deep shadow */}
          <div className="w-full h-full rounded-full bg-[#121214] border border-black/80 flex items-center justify-center shadow-inner">
            {/* Center metallic rivet core */}
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#3a3a40] to-[#8e8e93]" />
          </div>
        </div>
      </div>

      {/* Swinging Assembly: Rope + Knot + Metal Ring + 3D Stamp */}
      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: 'top center' }}
        animate={
          isHovered
            ? {
                rotate: [-6, 6, -4, 4, -2, 2, 0],
                transition: { duration: 1.4, ease: 'easeOut' },
              }
            : isInView
            ? {
                rotate: [-3, 3, -3],
                transition: {
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }
            : { rotate: 0 }
        }
      >
        {/* Braided Hanging Rope (SVG with realistic twist texture) */}
        <div className="relative flex flex-col items-center z-10">
          <svg
            width="12"
            height="34"
            viewBox="0 0 12 34"
            fill="none"
            className="overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            {/* Ambient rope shadow */}
            <line
              x1="6"
              y1="0"
              x2="6"
              y2="34"
              stroke="rgba(0,0,0,0.6)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Base braided hemp / golden cord */}
            <line
              x1="6"
              y1="0"
              x2="6"
              y2="34"
              stroke="#b58750"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Twisted strand highlights */}
            <line
              x1="6"
              y1="0"
              x2="6"
              y2="34"
              stroke="#fae1b3"
              strokeWidth="2"
              strokeDasharray="2.5 3"
              strokeLinecap="round"
            />
            {/* Deep spiral crevices for realistic rope twist */}
            <line
              x1="6"
              y1="1"
              x2="6"
              y2="33"
              stroke="#593a15"
              strokeWidth="1"
              strokeDasharray="1 4.5"
            />
          </svg>

          {/* Bound Rope Knot / Whipping Band */}
          <div className="relative -mt-1.5 z-10 flex flex-col items-center">
            <div className="w-3.5 h-2 rounded-[2px] bg-gradient-to-r from-[#6e461b] via-[#d4af37] to-[#6e461b] border-t border-b border-[#3d260f] shadow-md" />
            <div className="w-2.5 h-1 rounded-b-[2px] bg-[#8a5d24] -mt-[1px]" />
          </div>

          {/* Antiqued Brass Jump-Ring / Swivel Clasp */}
          <div className="-mt-1 z-10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border-[1.5px] border-[#d4af37] bg-transparent shadow-[0_1px_3px_rgba(0,0,0,0.7)]" />
          </div>
        </div>

        {/* 3D Paid Stamp Model */}
        <div className="relative -mt-1 w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] flex items-center justify-center group/stamp cursor-grab active:cursor-grabbing">
          {/* Subtle warm glow behind the stamp */}
          <div className="absolute inset-2 rounded-full bg-red-600/15 blur-xl pointer-events-none group-hover/stamp:bg-red-500/25 transition-all duration-500" />

          {/* @ts-ignore */}
          <model-viewer
            src={`${import.meta.env.BASE_URL}paid-stamp.glb`}
            alt="Paid Stamp 3D Model"
            auto-rotate={isInView ? true : undefined}
            rotation-per-second="24deg"
            camera-controls
            disable-zoom
            disable-pan
            interaction-prompt="none"
            shadow-intensity="1.6"
            shadow-softness="0.75"
            exposure="1.2"
            loading="lazy"
            reveal="auto"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
          >
            {/* @ts-ignore */}
          </model-viewer>

          {/* Subtle swinging drop-shadow below the stamp */}
          <motion.div
            className="absolute -bottom-1 w-12 h-2 rounded-full bg-black/60 blur-xs pointer-events-none"
            animate={
              isHovered
                ? { scale: [1, 1.15, 1], opacity: 0.7 }
                : isInView
                ? {
                    scale: [1, 0.9, 1],
                    opacity: [0.45, 0.55, 0.45],
                  }
                : { scale: 1, opacity: 0.45 }
            }
            transition={
              isInView
                ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.2 }
            }
          />
        </div>
      </motion.div>
    </div>
  );
}
