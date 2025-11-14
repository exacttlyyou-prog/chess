import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Trophy, Star } from 'lucide-react';
import { useAchievements } from '../contexts/AchievementsContext';
import { ACHIEVEMENTS, getAchievementsByCategory, type AchievementCategory, type AchievementRarity } from '../config/achievements';

const rarityColors: Record<AchievementRarity, string> = {
  common: 'text-gray-400 border-gray-600',
  rare: 'text-blue-400 border-blue-600',
  epic: 'text-purple-400 border-purple-600',
  legendary: 'text-yellow-400 border-yellow-600',
};

export default function Achievements() {
  const navigate = useNavigate();
  const { unlockedCount, totalCount, isUnlocked, getProgress } = useAchievements();
  const [filter, setFilter] = useState<'all' | AchievementCategory>('all');

  const filteredAchievements = filter === 'all'
    ? ACHIEVEMENTS
    : getAchievementsByCategory(filter);

  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-20"
    >
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="glass-button !p-3 !rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="!text-3xl flex items-center gap-2">
              <Trophy className="w-8 h-8 text-stake-red" />
              Достижения
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {unlockedCount} / {totalCount} ({completionPercentage}%)
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Общий прогресс</span>
            <span className="text-sm text-stake-red font-mono">{completionPercentage}%</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-stake-red to-orange-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
          {[
            { id: 'all' as const, label: 'Все', icon: '🎯' },
            { id: 'wins' as const, label: 'Победы', icon: '🏆' },
            { id: 'games' as const, label: 'Игры', icon: '🎮' },
            { id: 'tactics' as const, label: 'Тактика', icon: '🧩' },
            { id: 'special' as const, label: 'Особые', icon: '⭐' },
            { id: 'streak' as const, label: 'Серии', icon: '🔥' },
            { id: 'time' as const, label: 'Время', icon: '⏱️' },
            { id: 'social' as const, label: 'Соц.', icon: '👥' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filter === tab.id ? 'bg-stake-red text-white' : 'glass-button'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Achievements grid */}
        <div className="grid gap-4">
          {filteredAchievements.map((achievement) => {
            const unlocked = isUnlocked(achievement.id);
            const progressValue = getProgress(achievement.id);
            const progressPercent = Math.round((progressValue / achievement.requirement) * 100);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-card p-4 ${!unlocked ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-4xl ${unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        {achievement.name}
                        {!unlocked && <Lock className="w-4 h-4 text-gray-500" />}
                        {achievement.rarity !== 'common' && (
                          <Star className={`w-4 h-4 ${rarityColors[achievement.rarity]}`} />
                        )}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>

                    {!unlocked && (
                      <>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Прогресс: {progressValue} / {achievement.requirement}</span>
                          <span className="text-stake-red font-mono">{progressPercent}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-stake-red to-orange-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </>
                    )}

                    {unlocked && achievement.reward && (
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        {achievement.reward.coins && (
                          <span className="text-yellow-400">💰 {achievement.reward.coins}</span>
                        )}
                        {achievement.reward.xp && (
                          <span className="text-blue-400">⚡ {achievement.reward.xp} XP</span>
                        )}
                        {achievement.reward.title && (
                          <span className="text-purple-400">🎖️ {achievement.reward.title}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
