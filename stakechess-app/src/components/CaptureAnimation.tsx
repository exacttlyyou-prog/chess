import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CaptureAnimationProps {
  position: { x: number; y: number };
  pieceColor: 'white' | 'black';
  onComplete: () => void;
}

/**
 * Dramatic particle explosion when a piece is captured
 * Inspired by Chess.com's capture effects but with premium glass aesthetic
 */
export default function CaptureAnimation({ position, pieceColor, onComplete }: CaptureAnimationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; distance: number }>>([]);

  useEffect(() => {
    // Generate 12 particles in circular pattern
    const particleCount = 12;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / particleCount,
      distance: 40 + Math.random() * 20,
    }));
    setParticles(newParticles);

    // Auto-cleanup after animation
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const glowColor = pieceColor === 'white'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(255, 23, 68, 0.9)'; // stake-red for black pieces

  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Central flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute w-16 h-16 rounded-full"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          left: -32,
          top: -32,
        }}
      />

      {/* Ring wave */}
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute w-20 h-20 rounded-full border-2"
        style={{
          borderColor: glowColor,
          left: -40,
          top: -40,
        }}
      />

      {/* Particle burst */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: Math.cos(particle.angle) * particle.distance,
            y: Math.sin(particle.angle) * particle.distance,
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: glowColor,
            boxShadow: `0 0 8px ${glowColor}`,
            left: -4,
            top: -4,
          }}
        />
      ))}

      {/* Shockwave distortion effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0.3 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 40%, ${glowColor} 50%, transparent 60%)`,
          filter: 'blur(4px)',
          left: -48,
          top: -48,
        }}
      />
    </div>
  );
}
