import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Zap, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckmateModalProps {
  isOpen: boolean;
  winner: 'white' | 'black' | null;
  isPlayerWinner: boolean;
  ratingChange: number;
  onClose: () => void;
  onRematch: () => void;
}

/**
 * Epic victory/defeat screen using premium 3D assets
 * King shatter explosion (asset 0_1(1).png) + podium visualization
 */
export default function CheckmateModal({
  isOpen,
  isPlayerWinner,
  ratingChange,
  onClose,
  onRematch,
}: CheckmateModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass-card p-10 max-w-md w-full text-center relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Background dramatic effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {isPlayerWinner ? (
              <>
                {/* Victory rays */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `conic-gradient(
                      from 0deg,
                      transparent 0deg,
                      rgba(255, 23, 68, 0.3) 45deg,
                      transparent 90deg,
                      rgba(255, 23, 68, 0.3) 135deg,
                      transparent 180deg,
                      rgba(255, 23, 68, 0.3) 225deg,
                      transparent 270deg,
                      rgba(255, 23, 68, 0.3) 315deg,
                      transparent 360deg
                    )`,
                  }}
                />
                {/* Particles floating up */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: '100%', x: `${Math.random() * 100}%`, opacity: 0 }}
                    animate={{
                      y: '-100%',
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: 'linear',
                    }}
                    className="absolute w-1 h-1 bg-stake-red rounded-full"
                  />
                ))}
              </>
            ) : (
              /* Defeat dim overlay */
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50" />
            )}
          </div>

          {/* Hero image container */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 20 }}
            className="relative z-10 mb-8"
          >
            {isPlayerWinner ? (
              /* Victory: Use podium.png asset as background */
              <div className="relative w-48 h-48 mx-auto">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Trophy className="w-32 h-32 text-stake-red" strokeWidth={1.5} />
                </motion.div>
                {/* Glow effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 23, 68, 0.3) 0%, transparent 70%)',
                  }}
                />
              </div>
            ) : (
              /* Defeat: Shattered king reference */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="w-48 h-48 mx-auto flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-6xl filter grayscale opacity-50"
                >
                  👑
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`!text-5xl mb-4 ${
              isPlayerWinner ? 'text-transparent bg-clip-text bg-gradient-to-r from-stake-red to-orange-500' : 'text-gray-400'
            }`}
          >
            {isPlayerWinner ? 'Победа!' : 'Поражение'}
          </motion.h2>

          {/* Rating change */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="glass p-6 rounded-2xl mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <TrendingUp
                className={`w-6 h-6 ${isPlayerWinner ? 'text-green-400' : 'text-red-400'}`}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-body-sm text-gray-400"
              >
                Изменение рейтинга
              </motion.div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring', damping: 10 }}
              className={`text-5xl font-bold ${
                isPlayerWinner ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isPlayerWinner ? '+' : ''}{ratingChange}
            </motion.div>
          </motion.div>

          {/* Action buttons */}
          <div className="space-y-3 relative z-10">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onRematch}
              className="btn-primary w-full flex items-center justify-center gap-3"
            >
              <Zap className="w-5 h-5" />
              <span>Реванш</span>
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              onClick={() => navigate('/game-mode')}
              className="btn-secondary w-full"
            >
              Новая игра
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => navigate('/home')}
              className="glass-button w-full"
            >
              На главную
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
