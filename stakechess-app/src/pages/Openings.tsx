import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Star, TrendingUp } from 'lucide-react';
import { OPENINGS } from '../config/openings';
import type { Opening } from '../config/openings';

const difficultyColors = {
  beginner: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
  intermediate: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
  advanced: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
};

export default function Openings() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<'white' | 'black' | 'all'>('all');
  const [selectedOpening, setSelectedOpening] = useState<Opening | null>(null);

  const filteredOpenings = OPENINGS.filter(
    opening => selectedColor === 'all' || opening.color === selectedColor
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-28 md:pb-20"
    >
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="glass-button !p-3 !rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="!text-3xl">Дебюты</h1>
            <p className="text-sm text-gray-400">Изучай классические открытия</p>
          </div>
        </div>

        {/* Color Filter */}
        <div className="glass rounded-xl p-2 flex gap-2 mb-6">
          {[
            { key: 'all', label: 'Все' },
            { key: 'white', label: 'За белых' },
            { key: 'black', label: 'За чёрных' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedColor(key as typeof selectedColor)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                selectedColor === key
                  ? 'bg-stake-red text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-stake-red">{OPENINGS.length}</p>
            <p className="text-xs text-gray-400">Дебютов</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {OPENINGS.reduce((sum, o) => sum + o.variations.length, 0)}
            </p>
            <p className="text-xs text-gray-400">Вариантов</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">3</p>
            <p className="text-xs text-gray-400">Изучено</p>
          </div>
        </div>
      </div>

      {/* Openings List */}
      <div className="px-6 space-y-4">
        {filteredOpenings.map((opening, index) => (
          <motion.button
            key={opening.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedOpening(opening)}
            className="glass-card p-6 w-full text-left"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="!text-lg font-bold">{opening.name}</h3>
                  <span className="text-xs text-gray-500">{opening.eco}</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{opening.description}</p>
              </div>
              <div className={`px-3 py-1 rounded-lg bg-gradient-to-br ${difficultyColors[opening.difficulty]}`}>
                <span className="text-xs font-semibold capitalize">{opening.difficulty}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Популярность:</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i <= opening.popularity / 20
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Variations count */}
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-stake-red" />
              <span className="text-sm text-gray-400">
                {opening.variations.length} вариантов доступно
              </span>
            </div>

            {/* Color badge */}
            <div className="absolute top-6 right-6">
              <div className={`w-8 h-8 rounded-full border-2 ${
                opening.color === 'white' ? 'bg-white border-gray-700' : 'bg-black border-gray-400'
              }`} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Opening Detail Modal */}
      {selectedOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedOpening(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-8 max-w-2xl w-full my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="!text-2xl mb-1">{selectedOpening.name}</h3>
                <p className="text-sm text-gray-400">{selectedOpening.eco}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg bg-gradient-to-br ${difficultyColors[selectedOpening.difficulty]}`}>
                <span className="text-sm font-semibold capitalize">{selectedOpening.difficulty}</span>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{selectedOpening.description}</p>

            {/* Main Line */}
            <div className="glass p-4 rounded-xl mb-6">
              <h4 className="!text-sm font-semibold text-gray-400 mb-3">Основная линия:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedOpening.moves.map((move, i) => (
                  <div key={i} className="glass-card px-3 py-1.5 rounded-lg text-sm font-mono">
                    {i % 2 === 0 && <span className="text-gray-500 mr-2">{Math.floor(i / 2) + 1}.</span>}
                    {move}
                  </div>
                ))}
              </div>
            </div>

            {/* Variations */}
            <div className="mb-6">
              <h4 className="!text-base font-bold mb-4">Варианты ({selectedOpening.variations.length})</h4>
              <div className="space-y-3">
                {selectedOpening.variations.map((variation, i) => (
                  <div key={i} className="glass p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="!text-sm font-semibold">{variation.name}</h5>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{variation.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {variation.moves.slice(0, 8).map((move, j) => (
                        <span key={j} className="text-xs font-mono text-gray-500">
                          {move}
                        </span>
                      ))}
                      {variation.moves.length > 8 && (
                        <span className="text-xs text-gray-500">...</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setSelectedOpening(null);
                  navigate('/play');
                }}
                className="btn-primary w-full"
              >
                Практиковать
              </button>
              <button onClick={() => setSelectedOpening(null)} className="btn-secondary w-full">
                Закрыть
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
