'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/components/theme/ThemeContext';

export default function Template({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const skipMotion = theme === 'light' || prefersReducedMotion;

  if (skipMotion) {
    return <div className="flex h-full w-full flex-1 flex-col">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex h-full w-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
