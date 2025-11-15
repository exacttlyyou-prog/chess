import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Trophy, Target, Clock, CheckCircle2 } from 'lucide-react';
import { DAILY_PUZZLES } from '../config/puzzles';
import type { Puzzle } from '../config/puzzles';

const difficultyColors = {
  easy: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
  medium: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
  hard: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
  expert: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
};

const getDifficulty = (rating: number): keyof typeof difficultyColors => {
  if (rating < 1200) return 'easy';
  if (rating < 1600) return 'medium';
  if (rating < 2000) return 'hard';
  return 'expert';
};

export default function Puzzles() {
  const navigate = useNavigate();
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<string>>(new Set());
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);

  const dailyPuzzle = DAILY_PUZZLES[0]; // Today's puzzle
  const isDailyCompleted = solvedPuzzles.has(dailyPuzzle.id);

  const handleSolvePuzzle = (puzzleId: string) => {
    setSolvedPuzzles(prev => new Set([...prev, puzzleId]));
  };

  const stats = {
    total: DAILY_PUZZLES.length,
    solved: solvedPuzzles.size,
    streak: 3,
    rating: 1456,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-20"
    >
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="glass-button !p-3 !rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="!text-3xl">Задачи</h1>
            <p className="text-sm text-gray-400">Решай и прокачивай тактику</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-stake-red">{stats.solved}</p>
            <p className="text-xs text-gray-400">Решено</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.streak}</p>
            <p className="text-xs text-gray-400">Серия</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{stats.rating}</p>
            <p className="text-xs text-gray-400">Рейтинг</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{Math.round((stats.solved / stats.total) * 100)}%</p>
            <p className="text-xs text-gray-400">Точность</p>
          </div>
        </div>

        {/* Daily Puzzle */}
        <motion.button
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedPuzzle(dailyPuzzle)}
          className={`w-full glass-card p-6 mb-8 relative overflow-hidden ${
            isDailyCompleted ? 'border-2 border-green-500/30' : 'border-2 border-stake-red/30'
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-stake-red/10 to-transparent" />

          {/* Completed badge */}
          {isDailyCompleted && (
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>
          )}

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-stake-red" />
              <h3 className="!text-xl font-bold">Задача дня</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">{dailyPuzzle.explanation}</p>
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-lg bg-gradient-to-br ${difficultyColors[getDifficulty(dailyPuzzle.rating)]}`}>
                <span className="text-xs font-semibold">{dailyPuzzle.rating}</span>
              </div>
              <div className="flex gap-1.5">
                {dailyPuzzle.themes.map((theme, i) => (
                  <div key={i} className="px-2 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
                    {theme}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Puzzle Categories */}
      <div className="px-6 mb-8">
        <h3 className="!text-xl mb-4">Категории</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Тактика', count: 45, Icon: Target, color: 'red' },
            { title: 'Эндшпиль', count: 32, Icon: Trophy, color: 'yellow' },
            { title: 'Быстрый счёт', count: 28, Icon: Clock, color: 'blue' },
            { title: 'Мат в 2', count: 56, Icon: Zap, color: 'purple' },
          ].map((category, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate('/premium')}
              className="glass-card p-5 text-left"
            >
              <div className={`w-12 h-12 rounded-2xl bg-${category.color}-500/20 flex items-center justify-center mb-3`}>
                <category.Icon className={`w-6 h-6 text-${category.color}-400`} />
              </div>
              <h4 className="!text-base font-bold mb-1">{category.title}</h4>
              <p className="text-xs text-gray-400">{category.count} задач</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* All Puzzles List */}
      <div className="px-6">
        <h3 className="!text-xl mb-4">Все задачи</h3>
        <div className="space-y-3">
          {DAILY_PUZZLES.slice(0, 10).map((puzzle, index) => {
            const isSolved = solvedPuzzles.has(puzzle.id);
            const difficulty = getDifficulty(puzzle.rating);

            return (
              <motion.button
                key={puzzle.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedPuzzle(puzzle)}
                className={`glass-card p-4 w-full text-left ${isSolved ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold">Задача #{index + 1}</span>
                      {isSolved && (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded text-xs font-semibold bg-gradient-to-br ${difficultyColors[difficulty]}`}>
                        {puzzle.rating}
                      </div>
                      {puzzle.themes.slice(0, 2).map((theme, i) => (
                        <span key={i} className="text-xs text-gray-500">{theme}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-stake-red">→</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Puzzle Modal */}
      {selectedPuzzle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedPuzzle(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-8 max-w-md w-full"
          >
            <h3 className="!text-2xl mb-4">{selectedPuzzle.explanation}</h3>
            <div className="mb-6">
              <div className={`inline-flex px-3 py-1 rounded-lg bg-gradient-to-br ${difficultyColors[getDifficulty(selectedPuzzle.rating)]}`}>
                <span className="text-sm font-semibold">Рейтинг: {selectedPuzzle.rating}</span>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => {
                  handleSolvePuzzle(selectedPuzzle.id);
                  setSelectedPuzzle(null);
                  navigate('/play');
                }}
                className="btn-primary w-full"
              >
                Решить задачу
              </button>
              <button onClick={() => setSelectedPuzzle(null)} className="btn-secondary w-full">
                Закрыть
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
