import { motion } from 'framer-motion';
import { Crown, Medal, Trophy, Star, Zap } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  rating: number;
  avatar?: string;
  gamesWon: number;
  country?: string;
}

interface LeaderboardPodiumProps {
  topPlayers: [Player, Player, Player]; // 1st, 2nd, 3rd
  seasonName?: string;
  onPlayerClick?: (player: Player) => void;
}

export default function LeaderboardPodium({
  topPlayers,
  seasonName = 'Текущий сезон',
  onPlayerClick,
}: LeaderboardPodiumProps) {
  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [topPlayers[1], topPlayers[0], topPlayers[2]];
  const heights = ['h-48', 'h-64', 'h-40'];
  const positions = [2, 1, 3];
  const medals = [
    { icon: Medal, color: 'text-gray-400', glow: 'shadow-[0_0_20px_rgba(156,163,175,0.5)]' },
    { icon: Crown, color: 'text-yellow-400', glow: 'shadow-[0_0_30px_rgba(250,204,21,0.7)]' },
    { icon: Medal, color: 'text-orange-600', glow: 'shadow-[0_0_20px_rgba(234,88,12,0.5)]' },
  ];

  return (
    <div className="glass-card overflow-hidden relative">
      {/* Podium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        <motion.img
          animate={{
            scale: [1, 1.05, 1],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          src="/images/heroes/podium.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stake-black/90 via-stake-black/80 to-stake-black/90" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/10 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-3 mb-2"
        >
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="!text-3xl">Лидеры</h2>
          <Trophy className="w-8 h-8 text-yellow-400" />
        </motion.div>
        <p className="text-sm text-gray-400">{seasonName}</p>
      </div>

      {/* Podium */}
      <div className="relative z-10 p-8">
        <div className="flex items-end justify-center gap-4 max-w-4xl mx-auto">
          {podiumOrder.map((player, index) => {
            const MedalIcon = medals[index].icon;
            const position = positions[index];
            const isFirst = position === 1;

            return (
              <motion.button
                key={player.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                onClick={() => onPlayerClick?.(player)}
                className="relative flex-1 group"
              >
                {/* Player Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`glass-card p-4 mb-2 relative overflow-hidden ${
                    isFirst ? 'border-2 border-yellow-400' : ''
                  } ${medals[index].glow}`}
                >
                  {/* Rank Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.2, type: 'spring' }}
                    className="absolute -top-3 -right-3 z-10"
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        isFirst
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                          : position === 2
                          ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                          : 'bg-gradient-to-br from-orange-400 to-orange-600'
                      } shadow-lg`}
                    >
                      <MedalIcon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>

                  {/* Confetti for Winner */}
                  {isFirst && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{
                            y: 100,
                            opacity: [0, 1, 0],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          className={`absolute w-2 h-2 ${
                            i % 2 === 0 ? 'bg-yellow-400' : 'bg-orange-500'
                          }`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Glow Effect */}
                  {isFirst && (
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-gradient-radial from-yellow-400/20 via-transparent to-transparent"
                    />
                  )}

                  <div className="relative z-10">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-stake-red to-orange-500 p-1 relative"
                    >
                      {player.avatar ? (
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-stake-black-light flex items-center justify-center">
                          <span className="text-2xl font-bold">{player.name[0]}</span>
                        </div>
                      )}

                      {/* Crown for Winner */}
                      {isFirst && (
                        <motion.div
                          animate={{
                            rotate: [-5, 5, -5],
                            y: [-2, 0, -2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2"
                        >
                          <Crown className="w-8 h-8 text-yellow-400 fill-current" />
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Name */}
                    <h3 className={`!text-lg mb-1 truncate ${isFirst ? 'text-yellow-400' : ''}`}>
                      {player.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-stake-red" fill="currentColor" />
                      <span className="text-xl font-bold text-gradient">{player.rating}</span>
                    </div>

                    {/* Games Won */}
                    <p className="text-xs text-gray-400">
                      {player.gamesWon} побед
                    </p>
                  </div>
                </motion.div>

                {/* Podium Base */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  className={`${heights[index]} relative overflow-hidden rounded-t-2xl ${
                    isFirst
                      ? 'bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400'
                      : position === 2
                      ? 'bg-gradient-to-t from-gray-600 via-gray-500 to-gray-400'
                      : 'bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500'
                  } shadow-2xl`}
                  style={{ transformOrigin: 'bottom' }}
                >
                  {/* Shine Effect */}
                  <motion.div
                    animate={{ x: [-100, 300] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{ width: '100px' }}
                  />

                  {/* Position Number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.2, type: 'spring' }}
                      className="text-6xl font-bold text-white/30"
                    >
                      {position}
                    </motion.span>
                  </div>

                  {/* Sparkles */}
                  {isFirst &&
                    [...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          y: [0, -30],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                        }}
                        className="absolute bottom-4 w-2 h-2 bg-white rounded-full"
                        style={{ left: `${20 + i * 15}%` }}
                      />
                    ))}
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* Base Platform */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="h-4 bg-gradient-to-r from-stake-gray via-white/10 to-stake-gray rounded-t-lg shadow-lg"
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
            }}
            className="absolute"
          >
            <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
