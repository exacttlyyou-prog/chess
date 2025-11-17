import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { CHESS_PERSONALITIES } from '../ai/chessPersonalities';
import type { ChessPersonality } from '../ai/chessPersonalities';

const personalityBackgrounds: Record<string, string> = {
  magnus: '/images/pieces/king-solo.png',
  fischer: '/images/pieces/king-crown.png',
  tal: '/images/pieces/knight-speed.png',
  capablanca: '/images/pieces/royal-glass.png',
  karpov: '/images/pieces/royal-pair.png',
  beginner: '/images/pieces/pawn-glow.png',
  intermediate: '/images/pieces/knight-glass.png',
  advanced: '/images/pieces/king-queen-red.png',
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
      personalities: ['magnus', 'fischer', 'tal', 'capablanca', 'karpov'],
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
                const bgImage = personalityBackgrounds[personalityId];

                return (
                  <motion.button
                    key={personality.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: personality.locked ? 1 : 1.02, y: personality.locked ? 0 : -4 }}
                    whileTap={{ scale: personality.locked ? 1 : 0.98 }}
                    onClick={() => !personality.locked && handleSelectPersonality(personality)}
                    disabled={personality.locked}
                    className={`glass-card p-6 text-left relative overflow-hidden group ${
                      personality.locked ? 'opacity-60 cursor-not-allowed' : 'hover-lift cursor-pointer'
                    }`}
                  >
                    {/* Locked Overlay */}
                    {personality.locked && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="glass-card !px-3 !py-2 border border-yellow-500/30 bg-yellow-500/10">
                          <Lock className="w-4 h-4 text-yellow-500" />
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black/50 flex-shrink-0 border-2 border-white/10 group-hover:border-stake-red/30 transition-colors">
                        <img
                          src={personality.avatar || bgImage}
                          alt={personality.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name & Title */}
                      <div className="flex-1 min-w-0">
                        <h3 className="!text-xl font-bold mb-1">{personality.name}</h3>
                        {personality.title && (
                          <p className="text-sm text-gray-400 mb-2">{personality.title}</p>
                        )}

                        {/* Rating Badge */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(
                              personality.rating
                            )}`}
                          >
                            {getDifficultyLabel(personality.rating)}
                          </div>
                          <div className="text-sm font-mono text-gray-400">
                            ELO {personality.rating}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Biography */}
                    {personality.bio && (
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">
                        {personality.bio}
                      </p>
                    )}

                    {/* Style Tags */}
                    {personality.styleTags && personality.styleTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {personality.styleTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-stake-red/10 to-purple-900/10 border border-stake-red/20 text-xs font-semibold text-white shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats Grid */}
                    {personality.stats && (
                      <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-white/5">
                        {personality.stats.peakRating && (
                          <div className="text-center">
                            <div className="text-xl font-bold text-stake-red">
                              {personality.stats.peakRating}
                            </div>
                            <div className="text-xs text-gray-500">Пик рейтинга</div>
                          </div>
                        )}
                        {personality.stats.yearsAsChampion && (
                          <div className="text-center">
                            <div className="text-xl font-bold text-yellow-500">
                              {personality.stats.yearsAsChampion}
                            </div>
                            <div className="text-xs text-gray-500">Лет чемпионом</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Notable Record */}
                    {personality.stats?.notableRecord && (
                      <div className="glass-card !px-4 !py-3 bg-gradient-to-r from-stake-red/5 to-transparent border-l-2 border-stake-red/50">
                        <p className="text-sm text-gray-300">
                          <span className="text-stake-red font-semibold">Рекорд:</span> {personality.stats.notableRecord}
                        </p>
                      </div>
                    )}

                    {/* Unlock Condition */}
                    {personality.locked && personality.unlockCondition && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-sm text-yellow-500">
                          <Lock className="w-4 h-4" />
                          <span>{personality.unlockCondition}</span>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    {!personality.locked && (
                      <div className="mt-4 text-stake-red font-semibold text-sm group-hover:text-white transition-colors">
                        Играть против {personality.name.split(' ')[0]} →
                      </div>
                    )}

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-stake-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
