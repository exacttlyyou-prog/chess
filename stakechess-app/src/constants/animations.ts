/**
 * Константы анимаций для Framer Motion
 */

export const ANIMATION_DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

export const SPRING_CONFIGS = {
  default: { type: 'spring' as const, damping: 25, stiffness: 300 },
  gentle: { type: 'spring' as const, damping: 30, stiffness: 200 },
  bouncy: { type: 'spring' as const, damping: 15, stiffness: 400 },
  stiff: { type: 'spring' as const, damping: 20, stiffness: 500 },
} as const;

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const SLIDE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const SCALE_IN = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};
