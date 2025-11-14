import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy } from 'lucide-react';
import { TOURNAMENTS } from '../config/tournaments';

export default function Tournaments() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-20"
    >
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="glass-button !p-3 !rounded-xl">
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
            onClick={() => navigate('/premium')}
            className="glass-card p-5 w-full text-left"
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
    </motion.div>
  );
}
