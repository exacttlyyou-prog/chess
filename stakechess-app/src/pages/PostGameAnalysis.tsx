import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, AlertTriangle, Lightbulb, Play, Home as HomeIcon } from 'lucide-react';

interface KeyMoment {
  move: number;
  type: 'best' | 'mistake' | 'missed';
  title: string;
  description: string;
  evaluation: string;
}

const mockAnalysis: KeyMoment[] = [
  {
    move: 12,
    type: 'best',
    title: 'Отличный ход!',
    description: 'Фигура противника под угрозой, вы получили преимущество',
    evaluation: '+1.8',
  },
  {
    move: 24,
    type: 'mistake',
    title: 'Неточность',
    description: 'Пропущена возможность атаки на слабую пешку',
    evaluation: '-0.9',
  },
  {
    move: 35,
    type: 'missed',
    title: 'Упущенный шанс',
    description: 'Был доступен тактический удар конём',
    evaluation: '+2.4',
  },
];

const mockStats = {
  averageAccuracy: 87,
  bestMoves: 12,
  goodMoves: 18,
  inaccuracies: 5,
  mistakes: 2,
  blunders: 1,
};

export default function PostGameAnalysis() {
  const navigate = useNavigate();
  const [selectedMoment, setSelectedMoment] = useState<number | null>(null);

  const getMomentConfig = (type: KeyMoment['type']) => {
    switch (type) {
      case 'best':
        return {
          icon: TrendingUp,
          iconColor: 'text-green-400',
          bg: 'from-green-500/20 to-green-500/5',
          border: 'border-green-500/30',
        };
      case 'mistake':
        return {
          icon: AlertTriangle,
          iconColor: 'text-red-400',
          bg: 'from-red-500/20 to-red-500/5',
          border: 'border-red-500/30',
        };
      case 'missed':
        return {
          icon: Lightbulb,
          iconColor: 'text-yellow-400',
          bg: 'from-yellow-500/20 to-yellow-500/5',
          border: 'border-yellow-500/30',
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern pb-20"
    >
      {/* Background Image */}
      <div className="fixed inset-0 z-0 opacity-5">
        <img
          src="/images/0_0 (80).png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-8 pt-2 pb-4 flex items-center gap-4"
        >
          <button
            onClick={() => navigate('/home')}
            className="glass-button !px-4 !py-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="!text-3xl">Анализ партии</h1>
            <p className="text-body-sm text-gray-400">Разбор ключевых моментов</p>
          </div>
        </motion.div>

        {/* Overall Stats Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-8 mb-8"
        >
          <div className="glass-card p-8 shadow-depth-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-body-sm text-gray-400 mb-1">Средняя точность</p>
                <h2 className="!text-5xl text-gradient">{mockStats.averageAccuracy}%</h2>
              </div>
              <div className="w-32 h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#FF1744"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${mockStats.averageAccuracy * 2.51} 251`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-stake-red" />
                </div>
              </div>
            </div>

            {/* Move Quality Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-body-sm text-gray-400 mb-1">Лучшие</p>
                <p className="text-2xl font-bold text-green-400">{mockStats.bestMoves}</p>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-body-sm text-gray-400 mb-1">Хорошие</p>
                <p className="text-2xl font-bold text-white">{mockStats.goodMoves}</p>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-body-sm text-gray-400 mb-1">Неточности</p>
                <p className="text-2xl font-bold text-yellow-400">{mockStats.inaccuracies}</p>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-body-sm text-gray-400 mb-1">Ошибки</p>
                <p className="text-2xl font-bold text-orange-400">{mockStats.mistakes}</p>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-body-sm text-gray-400 mb-1">Грубые</p>
                <p className="text-2xl font-bold text-red-400">{mockStats.blunders}</p>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-body-sm text-gray-400 mb-1">Всего</p>
                <p className="text-2xl font-bold text-gray-300">38</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Moments */}
        <div className="px-8 mb-8">
          <h3 className="!text-xl mb-4">Ключевые моменты</h3>
          <div className="space-y-4">
            {mockAnalysis.map((moment, index) => {
              const config = getMomentConfig(moment.type);
              const isSelected = selectedMoment === index;

              return (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setSelectedMoment(isSelected ? null : index)}
                  className="cursor-pointer"
                >
                  <div className={`glass-card p-6 shadow-depth hover-lift border ${config.border} bg-gradient-to-br ${config.bg}`}>
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`bg-gradient-to-br ${config.bg} p-3 rounded-xl`}>
                        <config.icon className={`w-6 h-6 ${config.iconColor}`} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-body-sm text-gray-400">Ход {moment.move}</p>
                            <h5 className="!text-lg mb-1">{moment.title}</h5>
                          </div>
                          <div className={`glass px-3 py-1.5 rounded-lg ${config.iconColor} font-semibold text-sm`}>
                            {moment.evaluation}
                          </div>
                        </div>
                        <p className="text-body-sm text-gray-300">{moment.description}</p>

                        {/* Expanded Details */}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-white/10"
                          >
                            <div className="glass p-4 rounded-xl mb-3">
                              <p className="text-body-sm text-gray-400 mb-2">AI Рекомендация:</p>
                              <p className="text-body text-white">
                                {moment.type === 'best'
                                  ? 'Продолжайте активную игру, используя преимущество'
                                  : moment.type === 'mistake'
                                  ? 'Лучше было развить фигуры перед атакой'
                                  : 'Тактический удар давал решающее преимущество'}
                              </p>
                            </div>
                            <button className="btn-secondary w-full flex items-center justify-center gap-2">
                              <Play className="w-4 h-4" />
                              <span>Посмотреть позицию</span>
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-8 mb-8"
        >
          <div className="glass-card p-8 shadow-depth border-stake-red/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-3 rounded-xl">
                <Lightbulb className="w-6 h-6 text-stake-red" />
              </div>
              <div>
                <h5 className="mb-2">Совет от AI</h5>
                <p className="text-body-sm text-gray-300">
                  Ваша защита была сильной, но стоит больше внимания уделять инициативе в миттельшпиле. Рекомендуем изучить тактические паттерны.
                </p>
              </div>
            </div>
            <button className="btn-secondary w-full">
              Тренировка тактики →
            </button>
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="px-8 flex gap-4"
        >
          <button
            onClick={() => navigate('/game-mode')}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            <span>Играть снова</span>
          </button>
          <button
            onClick={() => navigate('/home')}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>На главную</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
