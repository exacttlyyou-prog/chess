import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, X, Users, Clock, Award } from 'lucide-react';
import { TOURNAMENTS } from '../config/tournaments';

export default function Tournaments() {
  const navigate = useNavigate();
  const [selectedTournament, setSelectedTournament] = useState<typeof TOURNAMENTS[0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-20"
    >
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="glass-button !p-3 !rounded-xl" aria-label="Вернуться назад">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="!text-3xl">Турниры</h1>
            <p className="text-sm text-gray-400">{TOURNAMENTS.length} турниров доступно</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {TOURNAMENTS.map((tournament) => (
          <motion.button
            key={tournament.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedTournament(tournament)}
            className="glass-card p-5 w-full text-left"
            aria-label={`Открыть детали турнира ${tournament.name}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-stake-red" />
              <h3 className="!text-lg font-bold">{tournament.name}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">{tournament.description}</p>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-lg bg-yellow-500/10 text-xs font-semibold text-yellow-400">
                🪙 {tournament.rewards.coins}
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-xs font-semibold text-blue-400">
                ⭐ {tournament.rewards.xp} XP
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Tournament Details Modal */}
      <AnimatePresence>
        {selectedTournament && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedTournament(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tournament-modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-8 w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stake-red/30 to-stake-red/10 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-stake-red" />
                  </div>
                  <div>
                    <h2 id="tournament-modal-title" className="!text-2xl mb-1">{selectedTournament.name}</h2>
                    <p className="text-sm text-gray-400">{selectedTournament.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTournament(null)}
                  className="glass-button !p-3"
                  aria-label="Закрыть детали турнира"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-card p-4 text-center">
                  <Users className="w-6 h-6 text-stake-red mx-auto mb-2" />
                  <p className="text-2xl font-bold">{selectedTournament.rounds.length}</p>
                  <p className="text-xs text-gray-400">Раундов</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{selectedTournament.difficulty === 'beginner' ? 'Новичок' : selectedTournament.difficulty === 'intermediate' ? 'Средний' : selectedTournament.difficulty === 'advanced' ? 'Сложный' : selectedTournament.difficulty === 'master' ? 'Мастер' : 'GM'}</p>
                  <p className="text-xs text-gray-400">Уровень</p>
                </div>
              </div>

              {/* Rewards */}
              <div className="glass-card p-6 mb-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <h3 className="!text-lg">Награды</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Монеты:</span>
                    <span className="font-bold text-yellow-400">🪙 {selectedTournament.rewards.coins}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Опыт:</span>
                    <span className="font-bold text-blue-400">⭐ {selectedTournament.rewards.xp} XP</span>
                  </div>
                </div>
              </div>

              {/* Premium CTA */}
              <div className="glass-card p-6 bg-gradient-to-br from-stake-red/10 to-transparent border-stake-red/30 mb-4">
                <p className="text-sm text-gray-300 mb-4">
                  🔒 Участие в турнирах доступно только для Premium пользователей
                </p>
                <button
                  onClick={() => navigate('/premium')}
                  className="btn-primary w-full"
                >
                  Получить Premium
                </button>
              </div>

              <button
                onClick={() => setSelectedTournament(null)}
                className="btn-secondary w-full"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
