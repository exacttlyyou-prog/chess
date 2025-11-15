import { motion } from 'framer-motion';
import { TrendingUp, Award, Target } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  progress: number; // 0-100
  reward?: string;
  isCompleted: boolean;
}

interface ProgressTrackerProps {
  milestones: Milestone[];
  currentLevel: number;
  nextLevel: number;
  overallProgress: number;
}

export default function ProgressTracker({
  milestones,
  currentLevel,
  nextLevel,
  overallProgress,
}: ProgressTrackerProps) {
  return (
    <div className="space-y-6">
      {/* Header with Progress Stairs Background */}
      <div className="glass-card p-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute right-0 bottom-0 w-64 h-64 opacity-10 pointer-events-none">
          <img
            src="/images/heroes/progress-stairs.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="!text-2xl mb-2">Ваш прогресс</h3>
              <p className="text-gray-400">
                Уровень {currentLevel} → {nextLevel}
              </p>
            </div>
            <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-4 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-stake-red" />
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Общий прогресс</span>
              <span className="font-bold text-gradient">{overallProgress}%</span>
            </div>
            <div className="h-4 bg-stake-gray rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-stake-red via-orange-500 to-yellow-500 relative"
              >
                {/* Shimmer Effect */}
                <motion.div
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ width: '100px' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-6 relative overflow-hidden ${
              milestone.isCompleted ? 'border-green-500/30 bg-green-500/5' : ''
            }`}
          >
            {/* Completion Badge */}
            {milestone.isCompleted && (
              <div className="absolute top-4 right-4 bg-green-500/20 px-3 py-1 rounded-full flex items-center gap-2 border border-green-500/30">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400 font-semibold">Выполнено</span>
              </div>
            )}

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`p-3 rounded-xl ${
                milestone.isCompleted
                  ? 'bg-green-500/20 border border-green-500/30'
                  : 'bg-stake-red/20 border border-stake-red/30'
              }`}>
                <Target className={`w-6 h-6 ${
                  milestone.isCompleted ? 'text-green-400' : 'text-stake-red'
                }`} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="!text-lg mb-1">{milestone.title}</h4>
                <p className="text-sm text-gray-400 mb-3">{milestone.description}</p>

                {/* Progress Bar */}
                {!milestone.isCompleted && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Прогресс</span>
                      <span className="font-semibold text-gray-300">{milestone.progress}%</span>
                    </div>
                    <div className="h-2 bg-stake-gray rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${milestone.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-stake-red to-orange-500"
                      />
                    </div>
                  </div>
                )}

                {/* Reward */}
                {milestone.reward && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-500/30">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-yellow-400 font-semibold">{milestone.reward}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
