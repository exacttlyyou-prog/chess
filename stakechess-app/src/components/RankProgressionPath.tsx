import { motion } from 'framer-motion';
import { Trophy, Star, Lock, Check, Zap, Crown } from 'lucide-react';

interface RankTier {
  id: number;
  name: string;
  requiredRating: number;
  reward?: string;
  unlocked: boolean;
}

interface RankProgressionPathProps {
  currentRating: number;
  ranks: RankTier[];
  onClaimReward?: (rankId: number) => void;
}

export default function RankProgressionPath({
  currentRating,
  ranks,
  onClaimReward,
}: RankProgressionPathProps) {
  const getCurrentRankIndex = () => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (currentRating >= ranks[i].requiredRating) {
        return i;
      }
    }
    return -1;
  };

  const currentRankIndex = getCurrentRankIndex();
  const nextRank = ranks[currentRankIndex + 1];

  return (
    <div className="glass-card overflow-hidden relative">
      {/* Growth Path Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <img
          src="/images/heroes/growth-path.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stake-black/90 via-stake-black/85 to-stake-black/90" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="!text-2xl mb-1">Путь к вершине</h3>
            <p className="text-sm text-gray-400">
              Текущий рейтинг: <span className="text-stake-red font-bold">{currentRating}</span>
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stake-red/20 to-yellow-500/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
        </div>

        {/* Next Rank Progress */}
        {nextRank && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 glass-card p-4 bg-gradient-to-r from-stake-red/10 to-yellow-500/10 border border-stake-red/30"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">До следующего ранга</span>
              <span className="text-sm font-bold text-stake-red">
                {nextRank.requiredRating - currentRating} очков
              </span>
            </div>

            <div className="h-3 bg-stake-gray rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((currentRating - ranks[currentRankIndex]?.requiredRating) /
                      (nextRank.requiredRating - ranks[currentRankIndex]?.requiredRating)) *
                    100
                  }%`,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-stake-red via-orange-500 to-yellow-500 relative"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Rank Path */}
      <div className="relative z-10 p-6 max-h-96 overflow-y-auto">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-stake-gray" />
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: `${(currentRankIndex / (ranks.length - 1)) * 100}%`,
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-6 top-0 w-1 bg-gradient-to-b from-stake-red via-orange-500 to-yellow-500"
          />

          {/* Ranks */}
          <div className="space-y-6">
            {ranks.map((rank, index) => {
              const isUnlocked = currentRating >= rank.requiredRating;
              const isCurrent = index === currentRankIndex;
              const isNext = index === currentRankIndex + 1;

              return (
                <motion.div
                  key={rank.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-center gap-4"
                >
                  {/* Rank Icon */}
                  <div
                    className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-stake-red to-orange-500 shadow-red-glow'
                        : 'bg-stake-gray'
                    } border-4 border-stake-black`}
                  >
                    {isUnlocked ? (
                      <>
                        {index === ranks.length - 1 ? (
                          <Crown className="w-7 h-7 text-yellow-400" fill="currentColor" />
                        ) : (
                          <Check className="w-7 h-7 text-white" strokeWidth={3} />
                        )}
                      </>
                    ) : (
                      <Lock className="w-6 h-6 text-gray-600" />
                    )}
                  </div>

                  {/* Rank Card */}
                  <motion.div
                    whileHover={isUnlocked ? { scale: 1.02, x: 5 } : {}}
                    className={`flex-1 glass-card p-4 relative overflow-hidden ${
                      isCurrent
                        ? 'border-2 border-stake-red shadow-red-glow'
                        : isNext
                        ? 'border border-yellow-500/30'
                        : isUnlocked
                        ? 'border border-green-500/30'
                        : 'opacity-60'
                    }`}
                  >
                    {/* Background Glow */}
                    {isCurrent && (
                      <div className="absolute inset-0 bg-gradient-to-r from-stake-red/20 to-orange-500/20" />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`!text-lg ${isCurrent ? 'text-stake-red' : ''}`}>
                            {rank.name}
                          </h4>
                          {isCurrent && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-stake-red/20 text-stake-red border border-stake-red/30">
                              Текущий
                            </span>
                          )}
                          {isNext && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                              Следующий
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          <span className="text-gray-400">
                            {rank.requiredRating.toLocaleString()} рейтинга
                          </span>
                        </div>

                        {rank.reward && (
                          <p className="text-xs text-green-400 flex items-center gap-1">
                            <Zap className="w-3 h-3" fill="currentColor" />
                            {rank.reward}
                          </p>
                        )}
                      </div>

                      {/* Claim Reward Button */}
                      {isUnlocked && rank.reward && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onClaimReward?.(rank.id)}
                          className="btn-primary !py-2 !px-4 !text-sm"
                        >
                          Забрать
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
