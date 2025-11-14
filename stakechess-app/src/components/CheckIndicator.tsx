import { motion } from 'framer-motion';

interface CheckIndicatorProps {
  position: { row: number; col: number };
}

/**
 * Dramatic red glow + pulsing ring around king in check
 * Creates tension and urgency
 */
export default function CheckIndicator({ position }: CheckIndicatorProps) {
  return (
    <div
      className="absolute pointer-events-none z-40"
      style={{
        gridRow: position.row + 1,
        gridColumn: position.col + 1,
        width: '100%',
        height: '100%',
      }}
    >
      {/* Pulsing danger glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'radial-gradient(circle, rgba(255, 23, 68, 0.4) 0%, rgba(255, 23, 68, 0.1) 60%, transparent 100%)',
          boxShadow: '0 0 24px rgba(255, 23, 68, 0.6), inset 0 0 24px rgba(255, 23, 68, 0.3)',
        }}
      />

      {/* Rotating danger ring */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-2"
      >
        <div
          className="w-full h-full rounded-lg"
          style={{
            border: '2px solid rgba(255, 23, 68, 0.8)',
            borderTopColor: 'rgba(255, 23, 68, 0.2)',
            borderRightColor: 'rgba(255, 23, 68, 0.4)',
          }}
        />
      </motion.div>

      {/* Corner warning indicators */}
      {[0, 1, 2, 3].map((corner) => (
        <motion.div
          key={corner}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: corner * 0.15,
            ease: 'easeOut',
          }}
          className="absolute w-3 h-3"
          style={{
            background: '#EF3124',
            borderRadius: '2px',
            ...(corner === 0 && { top: -2, left: -2 }),
            ...(corner === 1 && { top: -2, right: -2 }),
            ...(corner === 2 && { bottom: -2, right: -2 }),
            ...(corner === 3 && { bottom: -2, left: -2 }),
            boxShadow: '0 0 8px rgba(239, 49, 36, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
