import { motion } from 'framer-motion';
import { Eye, Users, Clock, Zap, TrendingUp } from 'lucide-react';

interface LiveGame {
  id: string;
  whitePlayer: {
    name: string;
    rating: number;
    avatar?: string;
  };
  blackPlayer: {
    name: string;
    rating: number;
    avatar?: string;
  };
  viewers: number;
  timeControl: string;
  currentMove: number;
  isHot?: boolean;
}

interface LiveGameCardProps {
  game: LiveGame;
  onWatch?: () => void;
  variant?: 'default' | 'dynamic' | 'glass';
}

export default function LiveGameCard({ game, onWatch, variant = 'default' }: LiveGameCardProps) {
  const backgroundImage =
    variant === 'dynamic'
      ? '/images/pieces/knight-dynamic.png'
      : variant === 'glass'
      ? '/images/pieces/knight-glass.png'
      : '/images/pieces/pair-duo.png';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -3 }}
      onClick={onWatch}
      className="glass-card overflow-hidden relative group cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img
          animate={{
            scale: variant === 'dynamic' ? [1, 1.15, 1] : [1, 1.05, 1],
            rotate: variant === 'glass' ? [-2, 2, -2] : [0, 0, 0],
            x: variant === 'dynamic' ? [-10, 10, -10] : [0, 0, 0],
          }}
          transition={{
            duration: variant === 'dynamic' ? 4 : 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          src={backgroundImage}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover ${
            variant === 'glass' ? 'opacity-15' : 'opacity-10'
          } group-hover:opacity-20 transition-opacity`}
        />

        {/* Dynamic Speed Lines */}
        {variant === 'dynamic' && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [-200, 400],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-stake-red/20 to-transparent"
              />
            ))}
          </>
        )}

        {/* Glass Shimmer */}
        {variant === 'glass' && (
          <motion.div
            animate={{
              x: [-100, 300],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ width: '150px' }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-stake-black/90 via-stake-black/85 to-stake-black/80" />
      </div>

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {game.isHot && (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30"
              >
                <Zap className="w-3 h-3 text-red-400" fill="currentColor" />
                <span className="text-xs font-semibold text-red-400">HOT</span>
              </motion.div>
            )}

            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-stake-gray/50">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{game.timeControl}</span>
            </div>
          </div>

          {/* Viewers */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
          >
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">
              {game.viewers.toLocaleString()}
            </span>
          </motion.div>
        </div>

        {/* Players */}
        <div className="space-y-3 mb-4">
          {/* White Player */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-300 p-1 flex-shrink-0">
              {game.whitePlayer.avatar ? (
                <img
                  src={game.whitePlayer.avatar}
                  alt={game.whitePlayer.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-stake-black font-bold">{game.whitePlayer.name[0]}</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{game.whitePlayer.name}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-sm text-gray-400">{game.whitePlayer.rating}</span>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 py-1 bg-stake-black-light text-xs font-bold text-stake-red border border-stake-red/30 rounded-full">
                VS
              </span>
            </div>
          </div>

          {/* Black Player */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black p-1 flex-shrink-0">
              {game.blackPlayer.avatar ? (
                <img
                  src={game.blackPlayer.avatar}
                  alt={game.blackPlayer.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-stake-black flex items-center justify-center border border-white/20">
                  <span className="text-white font-bold">{game.blackPlayer.name[0]}</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{game.blackPlayer.name}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-sm text-gray-400">{game.blackPlayer.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="glass-card p-3 mb-4 bg-stake-black-light/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Текущий ход</span>
            <span className="text-sm font-bold text-gradient">#{game.currentMove}</span>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 mt-2">
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="w-2 h-2 rounded-full bg-red-500"
            />
            <span className="text-xs font-semibold text-red-500">В ЭФИРЕ</span>
          </div>
        </div>

        {/* Watch Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onWatch}
          className="w-full btn-primary flex items-center justify-center gap-2 group"
        >
          <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Смотреть партию</span>
        </motion.button>
      </div>

      {/* Glow Effect on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className={`absolute inset-0 ${
          variant === 'glass'
            ? 'bg-gradient-radial from-blue-500/10 via-transparent to-transparent'
            : 'bg-gradient-radial from-stake-red/10 via-transparent to-transparent'
        } pointer-events-none`}
      />

      {/* Hot Game Pulse */}
      {game.isHot && (
        <motion.div
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 border-2 border-red-500/30 rounded-2xl pointer-events-none"
        />
      )}
    </motion.div>
  );
}
