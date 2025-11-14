import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Bot, Trophy, Users, User, Flame, Home as HomeIcon } from 'lucide-react';

const quickActions = [
  { id: 'quick', title: 'Быстрая игра', Icon: Zap, path: '/game-mode' },
  { id: 'ai', title: 'Игра с AI', Icon: Bot, path: '/play' },
  { id: 'tournament', title: 'Турниры', Icon: Trophy, path: '/game-mode' },
  { id: 'friends', title: 'С другом', Icon: Users, path: '/game-mode' },
];

const liveGames = [
  { id: 1, white: 'Гроссмейстер_89', black: 'ТактикПро', viewers: 234 },
  { id: 2, white: 'Мастер_Блица', black: 'Шахматный_Король', viewers: 189 },
  { id: 3, white: 'Стратег_2100', black: 'Защитник_1900', viewers: 156 },
  { id: 4, white: 'Атакующий', black: 'Позиционник', viewers: 98 },
  { id: 5, white: 'Молния_Ход', black: 'Терпеливый', viewers: 67 },
];

const recentGames = [
  {
    id: 1,
    opponent: 'Мастер_1450',
    result: 'win',
    mode: 'Блиц 3+2',
    image: '/images/pieces/king-crown.png',
    moves: 32,
    date: '2 часа назад',
  },
  {
    id: 2,
    opponent: 'Стратег_99',
    result: 'loss',
    mode: 'Рапид 10+0',
    image: '/images/pieces/queen-luxury.png',
    moves: 45,
    date: '5 часов назад',
  },
  {
    id: 3,
    opponent: 'Тактик_2000',
    result: 'draw',
    mode: 'Классика',
    image: '/images/pieces/knight-neon.png',
    moves: 68,
    date: 'Вчера',
  },
];

const widgets = [
  {
    type: 'tournament',
    title: 'Турнир выходного дня',
    subtitle: 'Старт через 2:15:00',
    participants: '128 игроков',
  },
  {
    type: 'achievement',
    title: 'Новое достижение!',
    subtitle: '5 побед подряд',
    badge: 'flame',
  },
  {
    type: 'friends',
    title: 'Друзья онлайн',
    subtitle: '3 игрока',
    avatars: ['user', 'user', 'user'],
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-black pb-24"
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="!text-3xl mb-1">Привет, Игрок</h1>
            <p className="text-sm text-gray-500">Онлайн</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-[#242424] transition-all"
          >
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Card - Hero Style with Full Gradient */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="card-hero min-h-[220px] mb-8 cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF1744] via-[#D50000] to-[#AA0000]" />

          {/* Background chess piece */}
          <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10 pointer-events-none">
            <img
              src="/images/pieces/king-crown.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-10 chess-pattern" />

          <div className="card-hero-content">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm text-white/70 mb-2">Рейтинг</p>
                <h2 className="!text-6xl font-bold text-white tracking-tighter">1450</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/70 mb-2">За месяц</p>
                <p className="text-3xl font-bold text-white">+50</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-white/60 mb-1">Побед</p>
                <p className="text-2xl font-bold text-white">128</p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Поражений</p>
                <p className="text-2xl font-bold text-white/90">94</p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Ничьих</p>
                <p className="text-2xl font-bold text-white/90">23</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Games Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10 overflow-hidden"
      >
        <div className="px-6 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF1744] animate-pulse" />
          <h3 className="!text-xl">Игры идут сейчас</h3>
        </div>
        <div className="relative">
          <motion.div
            className="flex gap-3 px-6"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...liveGames, ...liveGames].map((game, index) => (
              <div
                key={`${game.id}-${index}`}
                className="card px-5 py-4 flex items-center gap-3 min-w-[300px] cursor-pointer hover:border-white/12 transition-all"
                onClick={() => navigate('/play')}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">{game.white}</span>
                  <span className="text-gray-600 text-xs">vs</span>
                  <span className="text-sm font-medium truncate">{game.black}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <User className="w-3.5 h-3.5" />
                  <span>{game.viewers}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="px-6 mb-10">
        <h3 className="!text-xl mb-4">Быстрый старт</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 + index * 0.03, type: 'spring', stiffness: 150 }}
              onClick={() => navigate(action.path)}
              className="card-interactive p-6 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF1744] to-[#D50000] flex items-center justify-center mb-4">
                <action.Icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <p className="font-semibold">{action.title}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Games Carousel */}
      <div className="px-6 mb-10">
        <h3 className="!text-xl mb-4">Недавние партии</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {recentGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.08, type: 'spring' }}
              className="card-interactive min-w-[280px] p-6 relative overflow-hidden snap-start"
              onClick={() => navigate('/play')}
            >
              {/* Background image */}
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-5 pointer-events-none">
                <img
                  src={game.image}
                  alt=""
                  className="w-full h-full object-contain"
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
                <h4 className="font-bold text-lg mb-3">{game.opponent}</h4>

                {/* Game info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Режим</span>
                    <span className="text-white font-medium">{game.mode}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Ходов</span>
                    <span className="text-white font-medium">{game.moves}</span>
                  </div>
                  <div className="text-gray-600 text-xs mt-3">{game.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Widgets */}
      <div className="px-6 pb-28">
        <h3 className="!text-xl mb-4">Актуально</h3>
        <div className="space-y-3">
          {widgets.map((widget, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.08, type: 'spring' }}
              className="card-interactive p-5 cursor-pointer"
              onClick={() => navigate('/game-mode')}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold mb-1">{widget.title}</h4>
                  <p className="text-sm text-gray-500">{widget.subtitle}</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  {widget.participants && (
                    <p className="text-gray-500 text-sm font-medium">{widget.participants}</p>
                  )}
                  {widget.badge && (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF1744] to-[#D50000] flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {widget.avatars && (
                    <div className="flex -space-x-2">
                      {widget.avatars.map((_, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center border-2 border-black"
                        >
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-white/[0.06] px-6 py-4 flex justify-around backdrop-blur-xl">
        <button className="flex flex-col items-center gap-1.5 text-[#FF1744]">
          <div className="w-10 h-10 rounded-xl bg-[#FF1744]/10 flex items-center justify-center">
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
        <button
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Профиль</span>
        </button>
      </div>
    </motion.div>
  );
}
