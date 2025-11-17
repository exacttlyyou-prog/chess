import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Zap } from 'lucide-react';

interface CheckmateAnimationProps {
  winner: 'white' | 'black';
  isVisible: boolean;
  onComplete?: () => void;
}

export default function CheckmateAnimationEnhanced({ winner, isVisible, onComplete }: CheckmateAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Flash Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white"
          />

          {/* King Shatter Effect */}
          <div className="relative">
            {/* Shattered King */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: [1, 1.2, 0.8],
                opacity: [1, 1, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 1.5 }}
              className="relative w-64 h-64"
            >
              <img
                src="/images/pieces/king-shatter.png"
                alt="Shattered King"
                className="w-full h-full object-contain"
              />

              {/* Explosion Particles */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 360) / 12;
                const distance = 150;
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
                      scale: 0.5,
                    }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-stake-red to-orange-500 rounded-full"
                  />
                );
              })}
            </motion.div>

            {/* Checkmate Text */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 blur-xl bg-gradient-to-r from-stake-red to-yellow-500 opacity-50" />

                {/* Text */}
                <h1 className="relative text-6xl font-bold bg-gradient-to-r from-stake-red via-yellow-500 to-stake-red bg-clip-text text-transparent">
                  ШАХ И МАТ!
                </h1>
              </motion.div>

              {/* Winner Badge */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex items-center gap-3 glass-card px-8 py-4 shadow-2xl"
              >
                <Crown className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl font-bold">
                  {winner === 'white' ? 'Белые' : 'Черные'} победили
                </span>
                <Crown className="w-8 h-8 text-yellow-400" />
              </motion.div>

              {/* Lightning Bolts */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      rotate: i * 60,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.1,
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Zap className="w-16 h-16 text-yellow-400" fill="currentColor" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Ripple Effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 border-8 border-stake-red rounded-full"
            style={{ borderRadius: '50%' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
