import { motion } from 'framer-motion';
import { Trophy, Star, Award, Share2, Home } from 'lucide-react';

interface TournamentCompletionScreenProps {
  tournamentName: string;
  placement: number;
  totalPlayers: number;
  points: number;
  rewards: {
    rating: number;
    coins: number;
    badge?: string;
  };
  onShareResults?: () => void;
  onReturnHome?: () => void;
}

export default function TournamentCompletionScreen({
  tournamentName,
  placement,
  totalPlayers,
  points,
  rewards,
  onShareResults,
  onReturnHome,
}: TournamentCompletionScreenProps) {
  const isTopThree = placement <= 3;
  const isWinner = placement === 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black">
      {/* Confetti Effect */}
      {isTopThree && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: `${Math.random() * 100}vw`, opacity: 1 }}
              animate={{
                y: '110vh',
                opacity: [1, 1, 0],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.02,
                ease: 'linear',
              }}
              className={`absolute w-3 h-3 ${
                Math.random() > 0.5 ? 'bg-yellow-400' : 'bg-stake-red'
              }`}
              style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="glass-card max-w-2xl w-full p-8 relative overflow-hidden"
      >
        {/* Background Glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 bg-gradient-radial ${
            isWinner
              ? 'from-yellow-500/20 via-transparent to-transparent'
              : isTopThree
              ? 'from-orange-500/20 via-transparent to-transparent'
              : 'from-stake-red/20 via-transparent to-transparent'
          }`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Trophy Image */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative w-64 h-64 mx-auto mb-6"
          >
            <motion.img
              animate={{
                y: [-10, 10, -10],
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              src="/images/achievements/tournament-cup.png"
              alt="Tournament Trophy"
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]"
            />

            {/* Glow Rings */}
            {isTopThree &&
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  className={`absolute inset-0 rounded-full border-4 ${
                    isWinner ? 'border-yellow-400' : 'border-orange-500'
                  }`}
                />
              ))}

            {/* Sparkles */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              const distance = 120;
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x,
                    y,
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5 + i * 0.1,
                    repeat: Infinity,
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                />
              );
            })}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-bold mb-2">
              <span
                className={`bg-gradient-to-r ${
                  isWinner
                    ? 'from-yellow-400 via-yellow-300 to-yellow-400'
                    : isTopThree
                    ? 'from-orange-400 via-orange-300 to-orange-400'
                    : 'from-stake-red via-orange-500 to-stake-red'
                } bg-clip-text text-transparent`}
              >
                {isWinner
                  ? 'Победа!'
                  : isTopThree
                  ? 'Отличная игра!'
                  : 'Турнир завершен!'}
              </span>
            </h1>
            <p className="text-xl text-gray-300">{tournamentName}</p>
          </motion.div>

          {/* Placement Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="flex justify-center mb-8"
          >
            <div
              className={`glass-card px-8 py-4 inline-flex items-center gap-3 ${
                isWinner
                  ? 'border-2 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]'
                  : isTopThree
                  ? 'border-2 border-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.4)]'
                  : 'border border-stake-red/30'
              }`}
            >
              <Trophy
                className={`w-8 h-8 ${
                  isWinner
                    ? 'text-yellow-400'
                    : isTopThree
                    ? 'text-orange-400'
                    : 'text-stake-red'
                }`}
              />
              <div>
                <p className="text-sm text-gray-400">Ваше место</p>
                <p className="text-3xl font-bold">
                  #{placement}{' '}
                  <span className="text-sm text-gray-500">/ {totalPlayers}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            <div className="glass-card p-4 text-center">
              <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400 mb-1">Очки</p>
              <p className="text-2xl font-bold text-gradient">{points}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <Award className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400 mb-1">Рейтинг</p>
              <p className="text-2xl font-bold text-green-400">+{rewards.rating}</p>
            </div>
          </motion.div>

          {/* Rewards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="glass-card p-6 mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30"
          >
            <h3 className="!text-lg mb-4 text-center">Награды</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  {rewards.coins}
                </div>
                <p className="text-sm text-gray-400">Монет</p>
              </div>
              {rewards.badge && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center mb-2 mx-auto">
                    <Award className="w-8 h-8 text-yellow-400" />
                  </div>
                  <p className="text-sm text-gray-400">{rewards.badge}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onShareResults}
              className="btn-secondary flex items-center justify-center gap-2 flex-1"
            >
              <Share2 className="w-5 h-5" />
              <span>Поделиться</span>
            </button>
            <button
              onClick={onReturnHome}
              className="btn-primary flex items-center justify-center gap-2 flex-1"
            >
              <Home className="w-5 h-5" />
              <span>Вернуться домой</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
