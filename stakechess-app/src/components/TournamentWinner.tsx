import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Share2, Award } from 'lucide-react';

interface TournamentWinnerProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentName: string;
  rank: number;
  totalPlayers: number;
  prize?: string;
  rating

Gain?: number;
}

export default function TournamentWinner({
  isOpen,
  onClose,
  tournamentName,
  rank,
  totalPlayers,
  prize,
  ratingGain = 0,
}: TournamentWinnerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass-card p-8 max-w-md w-full pointer-events-auto relative overflow-hidden shadow-2xl"
            >
              {/* Background Trophy */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <img
                  src="/images/achievements/trophy-crown.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Confetti Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 400 - 200, opacity: 1 }}
                    animate={{
                      y: 600,
                      rotate: Math.random() * 360,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      repeat: Infinity,
                    }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['#FF1744', '#FFD700', '#00E676', '#00B0FF'][Math.floor(Math.random() * 4)],
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Trophy Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-32 h-32 mx-auto mb-6 relative"
                >
                  <img
                    src="/images/achievements/trophy-crown.png"
                    alt="Trophy"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"
                  />
                  {rank === 1 && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0"
                    >
                      <div className="absolute inset-0 border-4 border-yellow-400/30 rounded-full" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="!text-3xl mb-2 text-gradient"
                >
                  {rank === 1 ? 'Победа!' : rank <= 3 ? 'Призовое место!' : 'Турнир завершен!'}
                </motion.h2>

                {/* Tournament Name */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 mb-6"
                >
                  {tournamentName}
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 mb-8"
                >
                  <div className="glass-card p-4 flex items-center justify-between">
                    <span className="text-gray-400">Место</span>
                    <span className="text-2xl font-bold text-gradient">
                      #{rank} из {totalPlayers}
                    </span>
                  </div>

                  {ratingGain > 0 && (
                    <div className="glass-card p-4 flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Рейтинг
                      </span>
                      <span className="text-xl font-bold text-green-400">+{ratingGain}</span>
                    </div>
                  )}

                  {prize && (
                    <div className="glass-card p-4 flex items-center justify-between bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                      <span className="text-yellow-400 flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Приз
                      </span>
                      <span className="text-xl font-bold text-yellow-400">{prize}</span>
                    </div>
                  )}
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Поделиться результатом
                  </button>
                  <button onClick={onClose} className="btn-secondary w-full">
                    Закрыть
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
