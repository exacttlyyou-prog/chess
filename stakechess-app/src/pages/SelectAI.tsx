import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Trophy, Flame, Shield, Zap, Crown, Star } from 'lucide-react';
import { CHESS_PERSONALITIES } from '../ai/chessPersonalities';
import type { ChessPersonality } from '../ai/chessPersonalities';

const personalityIcons: Record<string, typeof Bot> = {
  magnus: Crown,
  kasparov: Flame,
  fischer: Star,
  tal: Zap,
  petrosian: Shield,
  capablanca: Trophy,
  morphy: Zap,
  karpov: Shield,
  botvinnik: Star,
  beginner: Bot,
  intermediate: Bot,
  advanced: Bot,
};

const getDifficultyColor = (rating: number) => {
  if (rating < 1000) return 'text-green-400 border-green-500/30 bg-green-500/10';
  if (rating < 1600) return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
  if (rating < 2200) return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
  return 'text-red-400 border-red-500/30 bg-red-500/10';
};

const getDifficultyLabel = (rating: number) => {
  if (rating < 1000) return 'Легко';
  if (rating < 1600) return 'Средне';
  if (rating < 2200) return 'Сложно';
  return 'Мастер';
};

export default function SelectAI() {
  const navigate = useNavigate();

  const handleSelectPersonality = (personality: ChessPersonality) => {
    navigate('/play', { state: { aiPersonality: personality.id } });
  };

  const categories = [
    {
      title: 'Для начинающих',
      personalities: ['beginner', 'intermediate'],
    },
    {
      title: 'Легенды шахмат',
      personalities: ['magnus', 'kasparov', 'fischer', 'tal', 'petrosian', 'capablanca', 'morphy', 'karpov', 'botvinnik'],
    },
    {
      title: 'Сложность',
      personalities: ['advanced'],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-8 pt-6 pb-4"
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="glass-button !px-4 !py-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="!text-3xl mb-1">Модели шахматистов</h1>
            <p className="text-body-sm text-gray-400">
              Выберите стиль игры легендарного шахматиста
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI Personalities Grid */}
      <div className="px-8 pb-28 space-y-8">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h2 className="!text-xl mb-4 text-gray-300">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.personalities.map((personalityId, index) => {
                const personality = CHESS_PERSONALITIES[personalityId];
                const Icon = personalityIcons[personalityId] || Bot;

                return (
                  <motion.button
                    key={personality.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPersonality(personality)}
                    className="glass-card p-6 text-left relative overflow-hidden group hover-lift"
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-stake-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Icon */}
                    <div className="relative z-10 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-stake-red/20 to-stake-red/5 flex items-center justify-center mb-3">
                        <Icon className="w-7 h-7 text-stake-red" strokeWidth={2} />
                      </div>

                      {/* Name & Rating */}
                      <h3 className="!text-lg mb-2">{personality.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(
                            personality.rating
                          )}`}
                        >
                          {getDifficultyLabel(personality.rating)}
                        </div>
                        <div className="text-sm font-mono text-gray-400">
                          ELO {personality.rating}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-body-sm text-gray-400 mb-4">
                        {personality.description}
                      </p>

                      {/* Style indicators */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Агрессивность</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-sm ${
                                  i <= personality.style.aggression * 5
                                    ? 'bg-stake-red'
                                    : 'bg-stake-gray'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Тактика</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-sm ${
                                  i <= personality.style.tactical * 5
                                    ? 'bg-blue-500'
                                    : 'bg-stake-gray'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-radial from-stake-red/10 via-transparent to-transparent pointer-events-none"
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
