import { motion } from 'framer-motion';
import { Zap, Clock, Flame, TrendingUp } from 'lucide-react';

interface SpeedChessModeCardProps {
  mode: {
    id: string;
    name: string;
    timeControl: string;
    description: string;
    playersOnline?: number;
    difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  };
  onStartGame?: () => void;
}

export default function SpeedChessModeCard({ mode, onStartGame }: SpeedChessModeCardProps) {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-orange-400';
      case 'extreme':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Легко';
      case 'medium':
        return 'Средне';
      case 'hard':
        return 'Сложно';
      case 'extreme':
        return 'Экстрим';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card overflow-hidden relative group cursor-pointer"
      onClick={onStartGame}
    >
      {/* Knight Speed Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img
          animate={{
            x: [-30, 30, -30],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          src="/images/pieces/knight-speed.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity"
        />

        {/* Speed Lines Effect */}
        <motion.div
          animate={{
            x: [-100, 300],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-stake-red/20 to-transparent"
          style={{ width: '200px' }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-stake-black/90 via-stake-black/85 to-stake-black/80" />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-stake-red/30 to-orange-500/30 flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-stake-red" fill="currentColor" />
              </motion.div>

              <h3 className="!text-2xl">{mode.name}</h3>
            </div>

            <p className="text-gray-400 text-sm mb-3">{mode.description}</p>
          </div>

          {/* Difficulty Badge */}
          {mode.difficulty && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring' }}
              className={`px-3 py-1 rounded-full ${
                mode.difficulty === 'extreme'
                  ? 'bg-red-500/20 border border-red-500/30'
                  : mode.difficulty === 'hard'
                  ? 'bg-orange-500/20 border border-orange-500/30'
                  : mode.difficulty === 'medium'
                  ? 'bg-yellow-500/20 border border-yellow-500/30'
                  : 'bg-green-500/20 border border-green-500/30'
              }`}
            >
              <span className={`text-xs font-semibold ${getDifficultyColor(mode.difficulty)}`}>
                {getDifficultyLabel(mode.difficulty)}
              </span>
            </motion.div>
          )}
        </div>

        {/* Time Control */}
        <div className="glass-card p-4 mb-4 bg-stake-black-light/50 relative overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-stake-red/10 to-transparent"
          />

          <div className="relative z-10 flex items-center gap-3">
            <Clock className="w-8 h-8 text-stake-red" />
            <div>
              <p className="text-xs text-gray-400 mb-1">Контроль времени</p>
              <p className="text-2xl font-bold text-gradient">{mode.timeControl}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Players Online */}
          {mode.playersOnline !== undefined && (
            <div className="glass-card p-3 text-center bg-stake-black-light/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <span className="text-xs text-gray-400">Онлайн</span>
              </div>
              <p className="text-lg font-bold text-green-400">
                {mode.playersOnline.toLocaleString()}
              </p>
            </div>
          )}

          {/* Streak/Popularity */}
          <div className="glass-card p-3 text-center bg-stake-black-light/30">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-gray-400">Популярно</span>
            </div>
            <p className="text-lg font-bold text-orange-400">
              <TrendingUp className="w-5 h-5 inline" />
            </p>
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartGame}
          className="btn-primary w-full flex items-center justify-center gap-2 group"
        >
          <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Начать игру</span>
          <Zap className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
        </motion.button>
      </div>

      {/* Speed Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', y: `${Math.random() * 100}%` }}
            animate={{
              x: '200%',
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute h-0.5 w-20 bg-gradient-to-r from-transparent via-stake-red to-transparent"
          />
        ))}
      </div>

      {/* Glow Effect on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-radial from-stake-red/20 via-transparent to-transparent pointer-events-none"
      />
    </motion.div>
  );
}
