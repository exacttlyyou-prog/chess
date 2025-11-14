import { motion } from 'framer-motion';
import { Star, TrendingUp, Award } from 'lucide-react';

interface SkillLevelIndicatorProps {
  currentLevel: number;
  maxLevel: number;
  experience: number;
  nextLevelExp: number;
  skillName: string;
}

const levelTitles = [
  'Новичок',
  'Ученик',
  'Практикующий',
  'Опытный',
  'Профессионал',
  'Эксперт',
  'Мастер',
  'Гроссмейстер',
  'Легенда',
  'Чемпион',
];

export default function SkillLevelIndicator({
  currentLevel,
  maxLevel,
  experience,
  nextLevelExp,
  skillName,
}: SkillLevelIndicatorProps) {
  const progressPercent = (experience / nextLevelExp) * 100;
  const levelTitle = levelTitles[Math.min(currentLevel - 1, levelTitles.length - 1)];

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Background Skill Levels Image */}
      <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10 pointer-events-none">
        <img
          src="/images/heroes/skill-levels.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="!text-xl mb-1">{skillName}</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Уровень</span>
              <span className="text-2xl font-bold text-gradient">{currentLevel}</span>
              <span className="text-sm text-gray-500">/ {maxLevel}</span>
            </div>
          </div>

          {/* Level Badge */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-stake-red/30 to-orange-500/30 p-4 rounded-2xl border-2 border-stake-red/50">
              {currentLevel >= maxLevel ? (
                <Award className="w-8 h-8 text-yellow-400" />
              ) : (
                <Star className="w-8 h-8 text-stake-red" />
              )}
            </div>

            {/* Level Number Badge */}
            <div className="absolute -top-2 -right-2 bg-stake-red rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold border-2 border-stake-black-light">
              {currentLevel}
            </div>
          </motion.div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-stake-red/20 to-orange-500/20 rounded-full border border-stake-red/30">
            <span className="text-sm font-semibold text-gradient">{levelTitle}</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Опыт до следующего уровня</span>
            <span className="font-semibold">
              {experience} / {nextLevelExp}
            </span>
          </div>

          <div className="relative">
            {/* Background Track */}
            <div className="h-3 bg-stake-gray rounded-full overflow-hidden">
              {/* Progress Fill */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-stake-red via-orange-500 to-yellow-500 relative shadow-[0_0_12px_rgba(239,49,36,0.6)]"
              >
                {/* Shimmer Effect */}
                <motion.div
                  animate={{ x: [-100, 300] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{ width: '100px' }}
                />

                {/* Pulse Effect at the end */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-yellow-400/50"
                />
              </motion.div>
            </div>

            {/* Level Markers */}
            <div className="absolute -top-1 left-0 right-0 flex justify-between">
              {Array.from({ length: 5 }).map((_, i) => {
                const markerPercent = (i / 4) * 100;
                const isPassed = progressPercent >= markerPercent;

                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-5 h-5 rounded-full border-2 ${
                      isPassed
                        ? 'bg-stake-red border-stake-red shadow-[0_0_8px_rgba(239,49,36,0.6)]'
                        : 'bg-stake-gray border-gray-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Next Level Reward */}
        {currentLevel < maxLevel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30"
          >
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-400">Награда за уровень {currentLevel + 1}</p>
              <p className="text-sm font-semibold text-yellow-400">+50 Очков рейтинга</p>
            </div>
          </motion.div>
        )}

        {/* Max Level Achieved */}
        {currentLevel >= maxLevel && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border-2 border-yellow-500/50 text-center"
          >
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="font-bold text-yellow-400">Максимальный уровень достигнут!</p>
            <p className="text-xs text-gray-400 mt-1">Вы - настоящий мастер!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
