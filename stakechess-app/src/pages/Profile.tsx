import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Flame,
  ArrowLeft,
  Zap,
  Activity,
  Wind,
  Home as HomeIcon,
  Target,
  Puzzle,
  Crown,
  Trophy,
  Check
} from 'lucide-react';

const stats = {
  rating: 1450,
  wins: 128,
  losses: 94,
  draws: 23,
  streak: 5,
  totalGames: 245,
};

const achievements = [
  { id: 1, title: 'Первая победа', description: 'Выиграй первую партию', Icon: Target, unlocked: true },
  { id: 2, title: 'Серия побед', description: '5 побед подряд', Icon: Flame, unlocked: true },
  { id: 3, title: 'Мастер блица', description: '50 партий в блиц', Icon: Zap, unlocked: true },
  { id: 4, title: 'Тактик', description: 'Реши 100 задач', Icon: Puzzle, unlocked: false },
  { id: 5, title: 'Гроссмейстер', description: 'Достигни 2000 рейтинга', Icon: Crown, unlocked: false },
  { id: 6, title: 'Турнирный игрок', description: 'Победи в турнире', Icon: Trophy, unlocked: false },
];

const ratingHistory = [
  { date: '01.11', rating: 1350 },
  { date: '05.11', rating: 1380 },
  { date: '10.11', rating: 1400 },
  { date: '15.11', rating: 1420 },
  { date: '20.11', rating: 1450 },
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');

  const winRate = Math.round((stats.wins / stats.totalGames) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-black pb-24"
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/home')}
          className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-[#242424] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="!text-3xl">Профиль</h1>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="px-6 mb-8"
      >
        <div className="card-elevated p-8 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF1744] to-[#D50000] flex items-center justify-center mx-auto mb-4 shadow-premium">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="!text-3xl mb-4">Игрок</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="card px-5 py-3 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Рейтинг</p>
              <p className="text-2xl font-bold text-white">{stats.rating}</p>
            </div>
            <div className="card px-5 py-3 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Побед подряд</p>
              <div className="flex items-center justify-center gap-1">
                <p className="text-2xl font-bold text-[#FF1744]">{stats.streak}</p>
                <Flame className="w-5 h-5 text-[#FF1744]" />
              </div>
            </div>
          </div>
          <button className="btn-secondary">
            Редактировать профиль
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="card p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'stats'
                ? 'bg-[#FF1744] text-white'
                : 'text-gray-500 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            Статистика
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'achievements'
                ? 'bg-[#FF1744] text-white'
                : 'text-gray-500 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            Достижения
          </button>
        </div>
      </div>

      {activeTab === 'stats' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 space-y-4"
        >
          {/* Win Rate */}
          <div className="card-elevated p-6">
            <h4 className="font-semibold mb-4">Общая статистика</h4>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">{stats.wins}</p>
                <p className="text-sm text-gray-500 mt-1">Побед</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-400">{stats.losses}</p>
                <p className="text-sm text-gray-500 mt-1">Поражений</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-400">{stats.draws}</p>
                <p className="text-sm text-gray-500 mt-1">Ничьих</p>
              </div>
            </div>
            <div className="card p-4 rounded-2xl">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Процент побед</span>
                <span className="text-sm font-semibold">{winRate}%</span>
              </div>
              <div className="w-full bg-[#1A1A1A] rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-[#FF1744] to-[#D50000] h-2.5 rounded-full transition-all"
                  style={{ width: `${winRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Rating History */}
          <div className="card-elevated p-6">
            <h4 className="font-semibold mb-4">История рейтинга</h4>
            <div className="relative h-40">
              {/* Simple line chart visualization */}
              <svg className="w-full h-full" viewBox="0 0 300 100">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="300"
                    y2={y}
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="1"
                  />
                ))}

                {/* Rating line */}
                <polyline
                  points={ratingHistory
                    .map((point, index) => {
                      const x = (index / (ratingHistory.length - 1)) * 300;
                      const y = 100 - ((point.rating - 1300) / 200) * 100;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#FF1744', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#D50000', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>

                {/* Points */}
                {ratingHistory.map((point, index) => {
                  const x = (index / (ratingHistory.length - 1)) * 300;
                  const y = 100 - ((point.rating - 1300) / 200) * 100;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#FF1744"
                      stroke="#000000"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-600">
              {ratingHistory.map((point) => (
                <span key={point.date}>{point.date}</span>
              ))}
            </div>
          </div>

          {/* Performance by Mode */}
          <div className="card-elevated p-6">
            <h4 className="font-semibold mb-4">По режимам</h4>
            <div className="space-y-3">
              {[
                { mode: 'Блиц', rating: 1450, games: 120, Icon: Zap },
                { mode: 'Рапид', rating: 1380, games: 80, Icon: Activity },
                { mode: 'Пуля', rating: 1520, games: 45, Icon: Wind },
              ].map((item) => (
                <div
                  key={item.mode}
                  className="card p-4 rounded-2xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF1744] to-[#D50000] flex items-center justify-center">
                      <item.Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold">{item.mode}</h5>
                      <p className="text-sm text-gray-500">{item.games} партий</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-white">{item.rating}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        /* Achievements */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6"
        >
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`card-interactive p-6 text-center ${
                  !achievement.unlocked ? 'opacity-40 grayscale' : ''
                }`}
              >
                <div className="bg-gradient-to-br from-[#FF1744] to-[#D50000] p-3 rounded-2xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <achievement.Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h5 className="font-semibold text-sm mb-1">{achievement.title}</h5>
                <p className="text-xs text-gray-500">{achievement.description}</p>
                {achievement.unlocked && (
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#FF1744] font-semibold">
                    <Check className="w-3 h-3" />
                    <span>Получено</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-white/[0.06] px-6 py-4 flex justify-around backdrop-blur-xl">
        <button
          onClick={() => navigate('/home')}
          className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <HomeIcon className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Главная</span>
        </button>
        <button
          onClick={() => navigate('/game-mode')}
          className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Играть</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-[#FF1744]">
          <div className="w-10 h-10 rounded-xl bg-[#FF1744]/10 flex items-center justify-center">
            <User className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Профиль</span>
        </button>
      </div>
    </motion.div>
  );
}
