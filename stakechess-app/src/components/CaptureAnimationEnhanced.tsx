import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CaptureAnimationEnhancedProps {
  position: { x: number; y: number };
  pieceType: 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
  isVisible: boolean;
  onComplete?: () => void;
}

export default function CaptureAnimationEnhanced({
  position,
  pieceType,
  isVisible,
  onComplete,
}: CaptureAnimationEnhancedProps) {
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowExplosion(true);
      const timer = setTimeout(() => {
        setShowExplosion(false);
        onComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  const explosionImage =
    pieceType === 'bishop'
      ? '/images/pieces/bishop-explosion.png'
      : pieceType === 'pawn'
      ? '/images/pieces/pawn-glow.png'
      : '/images/pieces/bishop-explosion.png'; // fallback

  return (
    <AnimatePresence>
      {showExplosion && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            pointerEvents: 'none',
            zIndex: 100,
          }}
          className="flex items-center justify-center"
        >
          {/* Explosion Image */}
          <motion.div
            animate={{
              scale: [0.5, 1.5, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 0.6 }}
            className="relative w-32 h-32"
          >
            <img
              src={explosionImage}
              alt="Explosion"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Particle Burst */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            const distance = 80 + Math.random() * 40;
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance;

            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x,
                  y,
                  opacity: 0,
                  scale: [1, 1.5, 0],
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                style={{
                  boxShadow: '0 0 10px rgba(255,100,50,0.8)',
                }}
              />
            );
          })}

          {/* Flash Effect */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-orange-400 rounded-full blur-xl"
          />

          {/* Ripple Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2 + i, opacity: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="absolute inset-0 border-4 border-orange-500 rounded-full"
            />
          ))}

          {/* Smoke Trail */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`smoke-${i}`}
              initial={{ y: 0, x: (Math.random() - 0.5) * 40, opacity: 0.6, scale: 0 }}
              animate={{
                y: -100 - Math.random() * 50,
                x: (Math.random() - 0.5) * 80,
                opacity: 0,
                scale: 1 + Math.random(),
              }}
              transition={{
                duration: 1 + Math.random() * 0.5,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
              className="absolute w-6 h-6 rounded-full bg-gray-600 blur-md"
            />
          ))}

          {/* Star Sparkles */}
          {[...Array(12)].map((_, i) => {
            const spreadAngle = (i * 360) / 12;
            const spreadDist = 60 + Math.random() * 20;
            const sx = Math.cos((spreadAngle * Math.PI) / 180) * spreadDist;
            const sy = Math.sin((spreadAngle * Math.PI) / 180) * spreadDist;

            return (
              <motion.div
                key={`star-${i}`}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: sx,
                  y: sy,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.03,
                  ease: 'easeOut',
                }}
                className="absolute w-2 h-2"
              >
                <div className="w-full h-full bg-yellow-400 transform rotate-45" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
