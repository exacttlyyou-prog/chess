import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Target, Zap, Share2, RotateCcw, Home, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameEndModalProps {
  result: 'win' | 'loss' | 'draw';
  onClose: () => void;
  stats: {
    ratingChange: number;
    accuracy: number;
    movesPlayed: number;
    timeElapsed: string;
    coinsEarned: number;
    xpEarned: number;
  };
}

// Confetti particle component
function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
            background: ['#EF3124', '#FFD700', '#FF6B35', '#4ECDC4', '#95E1D3'][i % 5],
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

export default function GameEndModal({ result, onClose, stats }: GameEndModalProps) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(result === 'win');

  useEffect(() => {
    if (result === 'win') {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const resultConfig = {
    win: {
      title: 'Победа!',
      subtitle: 'Отличная партия!',
      icon: Trophy,
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      bgGradient: 'from-green-500/20 to-emerald-600/10',
    },
    loss: {
      title: 'Поражение',
      subtitle: 'Продолжай учиться',
      icon: Target,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-400',
      bgGradient: 'from-red-500/20 to-red-600/10',
    },
    draw: {
      title: 'Ничья',
      subtitle: 'Упорная борьба',
      icon: Zap,
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-400',
      bgGradient: 'from-gray-500/20 to-gray-600/10',
    },
  };

  const config = resultConfig[result];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        {showConfetti && <Confetti />}

        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md"
        >
          {/* Main Card */}
          <div className={`glass-card p-8 relative overflow-hidden bg-gradient-to-br ${config.bgGradient}`}>
            {/* Animated background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-10`}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: result === 'win' ? 360 : 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(239,49,36,0.4)]`}
              >
                <Icon className="w-12 h-12 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="!text-4xl text-center mb-2"
              >
                {config.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-center ${config.textColor} font-semibold mb-8`}
              >
                {config.subtitle}
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                <div className="glass p-4 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className={`w-4 h-4 ${stats.ratingChange >= 0 ? 'text-green-400' : 'text-red-400'}`} />
                    <p className={`text-2xl font-bold ${stats.ratingChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stats.ratingChange >= 0 ? '+' : ''}{stats.ratingChange}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">Рейтинг</p>
                </div>

                <div className="glass p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-400 mb-1">{stats.accuracy}%</p>
                  <p className="text-xs text-gray-400">Точность</p>
                </div>

                <div className="glass p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-yellow-400 mb-1">{stats.coinsEarned}</p>
                  <p className="text-xs text-gray-400">Монеты</p>
                </div>

                <div className="glass p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-purple-400 mb-1">{stats.xpEarned}</p>
                  <p className="text-xs text-gray-400">Опыт</p>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="glass p-4 rounded-xl mb-8"
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Ходов сделано</span>
                  <span className="text-white font-semibold">{stats.movesPlayed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Время партии</span>
                  <span className="text-white font-semibold">{stats.timeElapsed}</span>
                </div>
              </motion.div>

              {/* Premium Upsell for losses */}
              {result === 'loss' && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/premium')}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 rounded-2xl mb-4 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.4)]"
                >
                  <Crown className="w-5 h-5" />
                  <span>Получи анализ партии с Premium</span>
                </motion.button>
              )}

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-3"
              >
                <button
                  onClick={() => navigate('/game-mode')}
                  className="btn-primary !py-4 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Реванш</span>
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="btn-secondary !py-4 flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Домой</span>
                </button>
              </motion.div>

              {/* Share */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="w-full mt-3 text-gray-400 hover:text-white transition-colors py-3 flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Поделиться результатом</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
