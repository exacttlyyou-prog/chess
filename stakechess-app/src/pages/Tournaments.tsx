import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, Star, TrendingUp, Calendar } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import LeaderboardPodium from '../components/LeaderboardPodium';
import TournamentCompletionScreen from '../components/TournamentCompletionScreen';

const upcomingTournaments = [
  {
    id: '1',
    name: 'Кубок выходного дня',
    startTime: '2 hours',
    players: 128,
    prizePool: '50,000₽',
    entryFee: 'Free',
    timeControl: '10+0',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Блиц Мастер',
    startTime: '5 hours',
    players: 256,
    prizePool: '100,000₽',
    entryFee: '500₽',
    timeControl: '3+2',
    status: 'upcoming',
  },
  {
    id: '3',
    name: 'Вечерний Рапид',
    startTime: '1 day',
    players: 64,
    prizePool: '25,000₽',
    entryFee: 'Free',
    timeControl: '15+10',
    status: 'upcoming',
  },
];

const topPlayers: [any, any, any] = [
  {
    id: '1',
    name: 'Гроссмейстер_2500',
    rating: 2500,
    gamesWon: 156,
    avatar: undefined,
  },
  {
    id: '2',
    name: 'Мастер_Атаки',
    rating: 2450,
    gamesWon: 143,
    avatar: undefined,
  },
  {
    id: '3',
    name: 'Тактик_Про',
    rating: 2400,
    gamesWon: 128,
    avatar: undefined,
  },
];

export default function Tournaments() {
  const [showCompletion, setShowCompletion] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-24"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="!text-3xl mb-1">Турниры</h1>
            <p className="text-gray-400">Участвуй и побеждай</p>
          </div>

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center"
          >
            <Trophy className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Trophy, label: 'Побед', value: '12' },
            { icon: Star, label: 'Рейтинг', value: '1450' },
            { icon: TrendingUp, label: 'Призы', value: '5,000₽' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-3 text-center"
              >
                <Icon className="w-5 h-5 text-stake-red mx-auto mb-1" />
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Podium */}
      <div className="p-6">
        <LeaderboardPodium
          topPlayers={topPlayers}
          seasonName="Зимний сезон 2025"
          onPlayerClick={() => {}}
        />
      </div>

      {/* Upcoming Tournaments */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="!text-xl">Ближайшие турниры</h2>
          <Calendar className="w-5 h-5 text-stake-red" />
        </div>

        {upcomingTournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5 hover-lift cursor-pointer"
            onClick={() => setShowCompletion(true)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="!text-lg mb-1">{tournament.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Через {tournament.startTime}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Призовой фонд</p>
                <p className="text-lg font-bold text-yellow-400">{tournament.prizePool}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Игроки</p>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-stake-red" />
                  <span className="text-sm font-semibold">{tournament.players}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Взнос</p>
                <span className="text-sm font-semibold text-green-400">{tournament.entryFee}</span>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Контроль</p>
                <span className="text-sm font-semibold">{tournament.timeControl}</span>
              </div>
            </div>

            <button className="btn-primary w-full mt-4">Участвовать</button>
          </motion.div>
        ))}
      </div>

      {/* Tournament Completion Modal */}
      {showCompletion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <TournamentCompletionScreen
            tournamentName="Кубок выходного дня"
            placement={3}
            totalPlayers={128}
            points={450}
            rewards={{
              rating: 25,
              coins: 500,
              badge: 'Бронзовый призер',
            }}
            onShareResults={() => {}}
            onReturnHome={() => setShowCompletion(false)}
          />
        </div>
      )}

      <BottomNav />
    </motion.div>
  );
}
