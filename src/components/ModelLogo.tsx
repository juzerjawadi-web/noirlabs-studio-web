import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function ModelLogo({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '100px' });

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className} 
      style={{ ...style, position: 'relative' }}
    >
      {/* @ts-ignore */}
      <model-viewer
        src={`${import.meta.env.BASE_URL}noir-logo.glb`}
        auto-rotate={isInView ? true : undefined}
        camera-controls={false}
        disable-zoom
        disable-pan
        interaction-prompt="none"
        shadow-intensity="1"
        loading="lazy"
        reveal="auto"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      >
      {/* @ts-ignore */}
      </model-viewer>
    </motion.div>
  );
}
