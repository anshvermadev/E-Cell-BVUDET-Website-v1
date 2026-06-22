import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

// Shared page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export const pageTransition = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 20,
  mass: 0.6,
};

export default function PageTransition({ children, className }: PropsWithChildren<{ className?: string }>) {
  // Reduce heavy route animations on small screens to prevent flash/blanking
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit={isMobile ? undefined : 'exit'}
      variants={pageVariants}
      transition={isMobile ? { type: 'tween', duration: 0.3 } : pageTransition}
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}