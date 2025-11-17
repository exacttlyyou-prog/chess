import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  color: string;
  size: number;
}

interface ParticleEffectProps {
  trigger: boolean;
  x: number;
  y: number;
  type: 'capture' | 'promote' | 'check';
  onComplete?: () => void;
}

export function ParticleEffect({ trigger, x, y, type, onComplete }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const particleCount = type === 'capture' ? 20 : type === 'promote' ? 30 : 15;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: 0,
        y: 0,
        angle: (Math.PI * 2 * i) / particleCount,
        velocity: type === 'capture' ? 50 + Math.random() * 50 : 60 + Math.random() * 40,
        color: type === 'check'
          ? '#EF3124'
          : type === 'promote'
          ? `hsl(${Math.random() * 60}, 70%, 60%)`
          : `rgba(239, 49, 36, ${0.6 + Math.random() * 0.4})`,
        size: type === 'promote' ? 4 + Math.random() * 4 : 3 + Math.random() * 3,
      });
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 800);

    return () => clearTimeout(timer);
  }, [trigger, type, onComplete]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: x,
            top: y,
            width: 0,
            height: 0,
          }}
        >
          {particles.map((particle) => {
            const endX = Math.cos(particle.angle) * particle.velocity;
            const endY = Math.sin(particle.angle) * particle.velocity;

            return (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  backgroundColor: particle.color,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: type === 'check'
                    ? `0 0 ${particle.size * 2}px ${particle.color}`
                    : 'none',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: endX,
                  y: endY,
                  opacity: 0,
                  scale: type === 'promote' ? 1.5 : 0.3,
                }}
                transition={{
                  duration: 0.6,
                  ease: type === 'check' ? 'easeOut' : 'easeInOut',
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
