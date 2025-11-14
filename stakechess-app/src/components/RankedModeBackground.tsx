import { motion } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';

interface RankedModeBackgroundProps {
  playerRank: number;
  seasonName: string;
  ratingChange?: number;
}

export default function RankedModeBackground({
  playerRank,
  seasonName,
  ratingChange = 0,
}: RankedModeBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Futuristic Background - Primary Layer */}
      <div className="fixed inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 2 }}
          src="/images/backgrounds/futuristic.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stake-red/5 to-transparent">
          <motion.div
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(239, 49, 36, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239, 49, 36, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Glow Orbs */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-stake-red/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-stake-black-light/90 to-black/80" />
      </div>

      {/* Ranked Season Badge */}
      <div className="relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute top-8 left-1/2 -translate-x-1/2"
        >
          <div className="glass-card px-8 py-4 flex items-center gap-4 border-2 border-stake-red/50 shadow-[0_0_40px_rgba(239,49,36,0.3)]">
            <Trophy className="w-6 h-6 text-stake-red" />
            <div>
              <p className="text-xs text-gray-400">Ранговый сезон</p>
              <h3 className="!text-lg text-gradient font-bold">{seasonName}</h3>
            </div>
            {ratingChange !== 0 && (
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                ratingChange > 0 ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
              }`}>
                <TrendingUp className={`w-4 h-4 ${ratingChange > 0 ? 'text-green-400' : 'text-red-400 rotate-180'}`} />
                <span className={`text-sm font-bold ${ratingChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {ratingChange > 0 ? '+' : ''}{ratingChange}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Rank Display */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="absolute bottom-8 right-8"
        >
          <div className="glass-card p-6 text-center border-2 border-yellow-500/50">
            <p className="text-xs text-gray-400 mb-2">Ваш ранг</p>
            <div className="text-5xl font-bold text-gradient mb-2">#{playerRank}</div>
            <p className="text-xs text-yellow-400">TOP {Math.round((playerRank / 100000) * 100)}%</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
