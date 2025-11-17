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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern pb-20"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-6 md:px-8 pt-2 pb-4 flex items-center gap-3 md:gap-4"
      >
        <button
          onClick={() => navigate('/home')}
          className="glass-button !px-3 !py-3 md:!px-4"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <h1 className="!text-2xl md:!text-3xl">Профиль</h1>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-6 md:px-8 mb-6"
      >
        <div className="glass-card p-6 md:p-8 text-center shadow-depth-lg">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-stake-red/30 to-stake-red/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <User className="w-10 h-10 md:w-12 md:h-12 text-stake-red" />
          </div>
          <h2 className="!text-2xl md:!text-3xl mb-2">Иван</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="glass px-3 py-2 md:px-4 rounded-lg">
              <p className="text-xs md:text-body-sm text-gray-400">Рейтинг</p>
              <p className="text-xl md:text-2xl font-bold text-gradient">{stats.rating}</p>
            </div>
            <div className="glass px-3 py-2 md:px-4 rounded-lg">
              <p className="text-xs md:text-body-sm text-gray-400">Побед подряд</p>
              <div className="flex items-center justify-center gap-1">
                <p className="text-xl md:text-2xl font-bold text-stake-red">{stats.streak}</p>
                <Flame className="w-4 h-4 md:w-5 md:h-5 text-stake-red" />
              </div>
            </div>
          </div>
          <button className="btn-secondary">
            Редактировать профиль
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="px-6 md:px-8 mb-6">
        <div className="glass rounded-xl p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all ${
              activeTab === 'stats'
                ? 'bg-stake-red text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Статистика
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all ${
              activeTab === 'achievements'
                ? 'bg-stake-red text-white'
                : 'text-gray-400 hover:text-white'
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
          className="px-6 md:px-8 space-y-3 md:space-y-4"
        >
          {/* Win Rate */}
          <div className="glass-card p-5 md:p-8 shadow-depth">
            <h5 className="mb-3 md:mb-4">Общая статистика</h5>
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-green-400">{stats.wins}</p>
                <p className="text-xs md:text-body-sm text-gray-400">Побед</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-red-400">{stats.losses}</p>
                <p className="text-xs md:text-body-sm text-gray-400">Поражений</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-400">{stats.draws}</p>
                <p className="text-xs md:text-body-sm text-gray-400">Ничьих</p>
              </div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-body-sm text-gray-400">Процент побед</span>
                <span className="text-body-sm font-semibold">{winRate}%</span>
              </div>
              <div className="w-full bg-stake-gray rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-stake-red to-stake-red-light h-2 rounded-full transition-all"
                  style={{ width: `${winRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Rating History */}
          <div className="glass-card p-5 md:p-8 shadow-depth">
            <h5 className="mb-3 md:mb-4">История рейтинга</h5>
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
                    stroke="rgba(255,255,255,0.05)"
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
                      stroke="#0A0A0A"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              {ratingHistory.map((point) => (
                <span key={point.date}>{point.date}</span>
              ))}
            </div>
          </div>

          {/* Performance by Mode */}
          <div className="glass-card p-5 md:p-8 shadow-depth">
            <h5 className="mb-3 md:mb-4">По режимам</h5>
            <div className="space-y-2 md:space-y-3">
              {[
                { mode: 'Блиц', rating: 1450, games: 120, Icon: Zap },
                { mode: 'Рапид', rating: 1380, games: 80, Icon: Activity },
                { mode: 'Пуля', rating: 1520, games: 45, Icon: Wind },
              ].map((item) => (
                <div
                  key={item.mode}
                  className="glass p-3 md:p-4 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-2 rounded-lg">
                      <item.Icon className="w-4 h-4 md:w-5 md:h-5 text-stake-red" />
                    </div>
                    <div>
                      <h6 className="!text-sm md:!text-base">{item.mode}</h6>
                      <p className="text-xs md:text-body-sm text-gray-400">{item.games} партий</p>
                    </div>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-gradient">{item.rating}</p>
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
          className="px-6 md:px-8"
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card p-4 md:p-6 text-center shadow-depth ${
                  !achievement.unlocked ? 'opacity-50 grayscale' : ''
                }`}
              >
                <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-2.5 md:p-3 rounded-full w-14 h-14 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 flex items-center justify-center">
                  <achievement.Icon className="w-7 h-7 md:w-8 md:h-8 text-stake-red" strokeWidth={1.5} />
                </div>
                <h6 className="!text-xs md:!text-sm mb-1 line-clamp-1">{achievement.title}</h6>
                <p className="text-[10px] md:text-xs text-gray-400 line-clamp-2">{achievement.description}</p>
                {achievement.unlocked && (
                  <div className="mt-2 flex items-center justify-center gap-1 text-[10px] md:text-xs text-stake-red font-semibold">
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    <span>Получено</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 glass border-t border-white/[0.08] px-6 py-4 flex justify-around backdrop-blur-2xl"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <button
          onClick={() => navigate('/home')}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all min-h-[44px]"
        >
          <div className="p-2">
            <HomeIcon className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Главная</span>
        </button>
        <button
          onClick={() => navigate('/game-mode')}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all min-h-[44px]"
        >
          <div className="p-2">
            <Zap className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Играть</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-stake-red min-h-[44px]">
          <div className="bg-stake-red/10 p-2 rounded-xl">
            <User className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Профиль</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
