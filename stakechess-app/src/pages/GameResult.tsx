import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Trophy, Target, Zap, Home as HomeIcon } from 'lucide-react';

type GameResult = 'victory' | 'defeat' | 'draw';

interface ResultData {
  result: GameResult;
  ratingChange: number;
  accuracy: number;
  movesPlayed: number;
  timeUsed: string;
  opponent: string;
}

const mockResult: ResultData = {
  result: 'victory', // Change to test different states
  ratingChange: 32,
  accuracy: 89,
  movesPlayed: 42,
  timeUsed: '08:34',
  opponent: 'Мастер_1480',
};

export default function GameResult() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [data] = useState<ResultData>(mockResult);

  useEffect(() => {
    if (data.result === 'victory') {
      setShowConfetti(true);
      // Stop confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [data.result]);

  const getResultConfig = () => {
    switch (data.result) {
      case 'victory':
        return {
          title: 'Победа!',
          subtitle: 'Отличная игра! Продолжай в том же духе',
          image: '/images/0_0 (85).png', // Pawn + crown (promotion)
          bgGradient: 'from-green-900/40 via-stake-black to-stake-black',
          accentColor: 'text-green-400',
          borderColor: 'border-green-500/30',
          icon: Trophy,
        };
      case 'defeat':
        return {
          title: 'Поражение',
          subtitle: 'Великие игроки растут на ошибках. Анализируй и возвращайся!',
          image: '/images/0_1 (1).png', // Shattered king
          bgGradient: 'from-red-900/40 via-stake-black to-stake-black',
          accentColor: 'text-red-400',
          borderColor: 'border-red-500/30',
          icon: Target,
        };
      case 'draw':
        return {
          title: 'Ничья',
          subtitle: 'Достойное противостояние равных сил',
          image: '/images/0_3.png', // Balanced pair (king + rook)
          bgGradient: 'from-gray-800/40 via-stake-black to-stake-black',
          accentColor: 'text-gray-400',
          borderColor: 'border-gray-500/30',
          icon: Minus,
        };
    }
  };

  const config = getResultConfig();

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-b ${config.bgGradient} overflow-hidden`}>
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <img
          src={data.result === 'victory' ? '/images/backgrounds/board-glow.png' : '/images/backgrounds/atmospheric-dark.png'}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'blur(30px)' }}
        />
      </motion.div>

      {/* Confetti Particles (Victory only) */}
      {showConfetti && data.result === 'victory' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['#FFD700', '#FF1744', '#FFFFFF', '#4CAF50'][Math.floor(Math.random() * 4)],
                left: `${Math.random() * 100}%`,
                top: -20,
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, Math.random() * 720],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        {/* Hero Image with Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className={`w-64 h-64 ${data.result === 'victory' ? 'bg-green-500/40' : data.result === 'defeat' ? 'bg-red-500/40' : 'bg-gray-500/40'}`} />
          </motion.div>

          {/* Main image */}
          <div className="relative w-64 h-64">
            <img
              src={config.image}
              alt={config.title}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Floating icon */}
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card p-4 ${config.borderColor} border-2`}
          >
            <config.icon className={`w-8 h-8 ${config.accentColor}`} strokeWidth={2} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className={`!text-6xl mb-4 ${config.accentColor}`}>
            {config.title}
          </h1>
          <p className="text-body text-gray-400 max-w-md">
            {config.subtitle}
          </p>
        </motion.div>

        {/* Rating Change Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className={`glass-card p-8 mb-8 ${config.borderColor} border-2 shadow-depth-lg max-w-md w-full`}
        >
          {/* Rating */}
          <div className="flex items-center justify-center mb-6">
            <div className="text-center">
              <p className="text-body-sm text-gray-400 mb-2">Изменение рейтинга</p>
              <div className="flex items-center justify-center gap-3">
                {data.ratingChange > 0 ? (
                  <TrendingUp className="w-8 h-8 text-green-400" />
                ) : data.ratingChange < 0 ? (
                  <TrendingDown className="w-8 h-8 text-red-400" />
                ) : (
                  <Minus className="w-8 h-8 text-gray-400" />
                )}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className={`text-5xl font-bold ${
                    data.ratingChange > 0
                      ? 'text-green-400'
                      : data.ratingChange < 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {data.ratingChange > 0 ? '+' : ''}{data.ratingChange}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass p-4 rounded-xl text-center">
              <p className="text-body-sm text-gray-400 mb-1">Точность</p>
              <p className="text-2xl font-bold text-white">{data.accuracy}%</p>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <p className="text-body-sm text-gray-400 mb-1">Ходов</p>
              <p className="text-2xl font-bold text-white">{data.movesPlayed}</p>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <p className="text-body-sm text-gray-400 mb-1">Время</p>
              <p className="text-2xl font-bold text-white">{data.timeUsed}</p>
            </div>
          </div>

          {/* Opponent */}
          <div className="mt-6 glass p-4 rounded-xl">
            <p className="text-body-sm text-gray-400 mb-1">Соперник</p>
            <p className="text-lg font-semibold text-white">{data.opponent}</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 w-full max-w-md"
        >
          <button
            onClick={() => navigate('/analysis')}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            <span>Анализ партии</span>
          </button>
          <button
            onClick={() => navigate('/home')}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>На главную</span>
          </button>
        </motion.div>

        {/* Play Again Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => navigate('/game-mode')}
          className="mt-6 text-gray-400 hover:text-white transition-colors text-lg font-semibold"
        >
          Играть снова →
        </motion.button>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              data.result === 'victory' ? 'bg-green-400' : data.result === 'defeat' ? 'bg-red-400' : 'bg-gray-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
