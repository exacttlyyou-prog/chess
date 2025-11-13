import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Bot, Trophy, Users, User, Home as HomeIcon, TrendingUp } from 'lucide-react';

const quickActions = [
  { id: 'quick', title: 'Быстрая игра', Icon: Zap, path: '/game-mode' },
  { id: 'ai', title: 'Игра с AI', Icon: Bot, path: '/play' },
  { id: 'tournament', title: 'Турниры', Icon: Trophy, path: '/game-mode' },
  { id: 'friends', title: 'С другом', Icon: Users, path: '/game-mode' },
];

// Removed liveGames - too distracting, low value (Jony Ive: less is more)

const recentGames = [
  {
    id: 1,
    opponent: 'Мастер_1450',
    result: 'win',
    mode: 'Блиц 3+2',
    image: '/images/0_0 (85).png', // Pawn + crown (victory/promotion)
    moves: 32,
    date: '2 часа назад',
  },
  {
    id: 2,
    opponent: 'Стратег_99',
    result: 'loss',
    mode: 'Рапид 10+0',
    image: '/images/0_1 (1).png', // Shattered king (defeat)
    moves: 45,
    date: '5 часов назад',
  },
  {
    id: 3,
    opponent: 'Тактик_2000',
    result: 'draw',
    mode: 'Классика',
    image: '/images/0_3.png', // Balanced pair (draw)
    moves: 68,
    date: 'Вчера',
  },
];

// Removed widgets - redundant, simplifying (Jony Ive approach)

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-8 pt-2 pb-4"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="!text-3xl mb-1">Привет, Игрок</h1>
            <p className="text-body-sm text-gray-400">Рейтинг: 1450 • Онлайн</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="glass-button !px-4 !py-3"
          >
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Card with Hero Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-6 bg-gradient-to-br from-stake-red/20 to-transparent border-stake-red/40 shadow-[0_0_32px_rgba(255,23,68,0.3),0_8px_24px_rgba(0,0,0,0.4)] relative overflow-hidden"
          whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
        >
          {/* Background chess piece */}
          <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10 pointer-events-none overflow-hidden">
            <img
              src="/images/pieces/king-crown.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-body-sm text-gray-400 mb-2">Текущий рейтинг</p>
                <h2 className="!text-display-sm text-gradient">1450</h2>
              </div>
              <div className="text-right">
                <p className="text-body-sm text-gray-400 mb-2">Прогресс</p>
                <p className="text-3xl font-bold text-green-400">+50</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-body-sm text-gray-500 mb-1">Побед</p>
                <p className="text-white font-semibold text-lg">128</p>
              </div>
              <div>
                <p className="text-body-sm text-gray-500 mb-1">Поражений</p>
                <p className="text-gray-400 font-semibold text-lg">94</p>
              </div>
              <div>
                <p className="text-body-sm text-gray-500 mb-1">Ничьих</p>
                <p className="text-gray-400 font-semibold text-lg">23</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* HERO CTA - Tournament Banner */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-8 mb-8"
      >
        <div
          className="relative glass-card p-8 shadow-depth-lg overflow-hidden cursor-pointer group widescreen-bg"
          onClick={() => navigate('/game-mode')}
          style={{ backgroundBlendMode: 'overlay' }}
        >
          {/* Foreground Trophy Image */}
          <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity overflow-hidden">
            <img
              src="/images/0_0 (76).png"
              alt="Tournament"
              className="w-full h-full object-cover scale-110"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-stake-red/40 via-transparent to-black/60" />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-green-400">Идёт сейчас</span>
                </div>
                <h3 className="!text-3xl mb-2">Турнир выходного дня</h3>
                <p className="text-body text-gray-300">Участвуй и выигрывай призы</p>
              </div>
              <Trophy className="w-12 h-12 text-stake-red" />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass p-3 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Игроков</p>
                <p className="text-lg font-bold">156/256</p>
              </div>
              <div className="glass p-3 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Призовой</p>
                <p className="text-lg font-bold text-green-400">50K ₽</p>
              </div>
              <div className="glass p-3 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Старт</p>
                <p className="text-lg font-bold text-stake-red">2:15:00</p>
              </div>
            </div>

            <button className="btn-primary w-full group-hover:scale-[1.02] transition-transform">
              Участвовать →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="px-8 mb-8">
        <h3 className="!text-xl mb-6">Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05, type: 'spring' }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(action.path)}
              className="glass-card p-8 text-center shadow-depth hover-lift"
            >
              <div className="bg-gradient-to-br from-stake-red/20 to-stake-red/5 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <action.Icon className="w-7 h-7 text-stake-red" strokeWidth={2} />
              </div>
              <p className="font-semibold text-base">{action.title}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Games Carousel */}
      <div className="px-8 mb-8">
        <h3 className="!text-xl mb-6">Недавние партии</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {recentGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card min-w-[280px] p-6 cursor-pointer shadow-depth relative overflow-hidden snap-start"
              onClick={() => navigate('/play')}
            >
              {/* Background image */}
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10 pointer-events-none overflow-hidden">
                <img
                  src={game.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10">
                {/* Result badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl mb-4 text-xs font-semibold ${
                  game.result === 'win'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : game.result === 'loss'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {game.result === 'win' ? 'Победа' : game.result === 'loss' ? 'Поражение' : 'Ничья'}
                </div>

                {/* Opponent */}
                <h5 className="mb-2">{game.opponent}</h5>

                {/* Game info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-body-sm text-gray-400">
                    <span>Режим</span>
                    <span className="text-white font-medium">{game.mode}</span>
                  </div>
                  <div className="flex justify-between text-body-sm text-gray-400">
                    <span>Ходов</span>
                    <span className="text-white font-medium">{game.moves}</span>
                  </div>
                  <div className="text-gray-500 text-xs mt-3">{game.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-28" />

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 glass border-t border-white/[0.08] px-6 py-4 flex justify-around backdrop-blur-2xl"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <button className="flex flex-col items-center gap-2 text-stake-red min-h-[44px]">
          <div className="bg-stake-red/10 p-2 rounded-xl">
            <HomeIcon className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Главная</span>
        </button>
        <button
          onClick={() => navigate('/feed')}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all min-h-[44px]"
        >
          <div className="p-2">
            <TrendingUp className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Лента</span>
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
        <button
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all min-h-[44px]"
        >
          <div className="p-2">
            <User className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Профиль</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
