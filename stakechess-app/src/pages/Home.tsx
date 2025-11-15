import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Bot, Trophy, User, Flame, Crown, Settings } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ThemeToggle from '../components/ThemeToggle';
import { useToast } from '../contexts/ToastContext';

const liveGames = [
  {
    id: '1',
    whitePlayer: { name: 'Гроссмейстер_89', rating: 2450 },
    blackPlayer: { name: 'ТактикПро', rating: 2380 },
    viewers: 234,
    timeControl: '10+0',
    currentMove: 24,
    isHot: true,
  },
  {
    id: '2',
    whitePlayer: { name: 'Мастер_Блица', rating: 2100 },
    blackPlayer: { name: 'Шахматный_Король', rating: 2050 },
    viewers: 189,
    timeControl: '3+2',
    currentMove: 18,
  },
  {
    id: '3',
    whitePlayer: { name: 'Стратег_2100', rating: 1950 },
    blackPlayer: { name: 'Защитник_1900', rating: 1920 },
    viewers: 156,
    timeControl: '5+3',
    currentMove: 31,
  },
];

const recentGames = [
  {
    id: 1,
    opponent: 'Мастер_1450',
    result: 'win',
    mode: 'Блиц 3+2',
    image: '/images/pieces/king-solo.png',
    moves: 32,
    date: '2 часа назад',
  },
  {
    id: 2,
    opponent: 'Стратег_99',
    result: 'loss',
    mode: 'Рапид 10+0',
    image: '/images/pieces/king-shatter.png',
    moves: 45,
    date: '5 часов назад',
  },
  {
    id: 3,
    opponent: 'Тактик_2000',
    result: 'draw',
    mode: 'Классика',
    image: '/images/pieces/queen-bishop.png',
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
  const { success, info } = useToast();

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
        className="px-8 pt-2 pb-6"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="!text-3xl mb-1">Привет, Игрок</h1>
            <p className="text-body-sm text-gray-400">Рейтинг: 1450 • Онлайн</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => navigate('/settings')}
              className="glass-button !px-4 !py-3"
            >
              <Settings className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="glass-button !px-4 !py-3"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Live Players Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card !px-4 !py-2 mb-8 inline-flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-400">
            <span className="text-white font-semibold">1,247</span> игроков онлайн
          </span>
        </motion.div>

        {/* Quick Actions - ГЛАВНЫЕ И ПЕРВЫЕ */}
        <h2 className="!text-2xl mb-6 text-gradient">Начать игру</h2>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* Главная кнопка - Играть с AI */}
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              info('Модели шахматистов', 'Играй в стиле Магнуса Карлсена, Каспарова и других!');
              navigate('/select-ai');
            }}
            className="glass-card p-8 text-left shadow-[0_0_32px_rgba(239,49,36,0.3),0_8px_24px_rgba(0,0,0,0.4)] bg-gradient-to-br from-stake-red/20 to-transparent border-stake-red/40 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-radial from-stake-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-stake-red to-stake-red-dark flex items-center justify-center shadow-[0_0_24px_rgba(239,49,36,0.5)]">
                <Bot className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="!text-2xl mb-2">Модели шахматистов</h3>
                <p className="text-body text-gray-400">Играй с AI стилями легенд шахмат</p>
              </div>
            </div>
          </motion.button>

          {/* Другие игровые опции */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring' }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/game-mode')}
              className="glass-card p-6 text-center shadow-depth hover-lift bg-[#2a2a2a]"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-stake-red/20 to-stake-red/5 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-7 h-7 text-stake-red" strokeWidth={2} />
              </div>
              <p className="font-semibold text-base mb-1">Быстрая игра</p>
              <p className="text-xs text-gray-400">Блиц 3+2</p>
            </motion.button>

            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/tournaments')}
              className="glass-card p-6 text-center shadow-depth hover-lift bg-[#2a2a2a]"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-stake-red/20 to-stake-red/5 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-7 h-7 text-stake-red" strokeWidth={2} />
              </div>
              <p className="font-semibold text-base mb-1">Турниры</p>
              <p className="text-xs text-gray-400">Призовые партии</p>
            </motion.button>
          </div>

          {/* Premium отдельно */}
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, type: 'spring' }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/premium')}
            className="glass-card p-6 text-center shadow-depth hover-lift border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 relative overflow-hidden shadow-[0_0_24px_rgba(255,215,0,0.2),0_4px_16px_rgba(255,215,0,0.15)]"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-400" strokeWidth={2} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-base mb-0.5">King Premium</p>
                <p className="text-xs text-gray-400">Получить -50%</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Stats Card - компактнее */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 bg-gradient-to-br from-white/[0.06] to-white/[0.02] relative overflow-hidden"
          whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
        >
          <div className="absolute right-0 bottom-0 w-32 h-32 opacity-5 pointer-events-none">
            <img
              src="/images/pieces/0_0__64_.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-stake-red/50">
                  <img
                    src="/images/heroes/ai-network.png"
                    alt="Player"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Текущий рейтинг</p>
                  <p className="text-3xl font-bold text-gradient">1450</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Прогресс</p>
                <p className="text-2xl font-bold text-green-400">+50</p>
              </div>
            </div>
            <div className="flex gap-6 text-center">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Побед</p>
                <p className="text-white font-semibold">128</p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Поражений</p>
                <p className="text-gray-400 font-semibold">94</p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Ничьих</p>
                <p className="text-gray-400 font-semibold">23</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tournament Banner - White with Red/Black */}
      <div className="px-8 mb-10">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring' }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/tournaments')}
          className="w-full bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
            <img
              src="/images/heroes/0_0_-_2025-11-13T230855_596.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* Red accent gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-stake-red/10 to-transparent" />

          <div className="relative z-10 flex items-center gap-6">
            {/* Trophy Icon */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-stake-red to-stake-red-dark flex items-center justify-center shadow-[0_4px_16px_rgba(239,49,36,0.4)]">
              <Trophy className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              <h3 className="!text-2xl text-black mb-1">Турниры</h3>
              <p className="text-gray-700 text-base mb-2">Сразись с лучшими. Выиграй призы.</p>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-lg bg-stake-red/10 border border-stake-red/20">
                  <span className="text-xs font-semibold text-stake-red">12 турниров</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <span className="text-xs font-semibold text-yellow-600">🏆 До 100K монет</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Training & Progress Section */}
      <div className="px-8 mb-8">
        <h3 className="!text-xl mb-6">Тренировки</h3>
        <div className="grid grid-cols-3 gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/puzzles')}
            className="glass-card p-5 text-center shadow-depth hover-lift"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🧩</span>
            </div>
            <p className="font-semibold text-sm mb-1">Задачи</p>
            <p className="text-xs text-gray-400">Ежедневно</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/openings')}
            className="glass-card p-5 text-center shadow-depth hover-lift"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📖</span>
            </div>
            <p className="font-semibold text-sm mb-1">Дебюты</p>
            <p className="text-xs text-gray-400">Библиотека</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/leaderboard')}
            className="glass-card p-5 text-center shadow-depth hover-lift"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏆</span>
            </div>
            <p className="font-semibold text-sm mb-1">Топ-100</p>
            <p className="text-xs text-gray-400">Рейтинг</p>
          </motion.button>
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
              className={`glass-card min-w-[280px] cursor-pointer shadow-depth overflow-hidden snap-start flex flex-col h-[240px] ${
                game.result === 'win'
                  ? '!bg-[rgba(48,209,88,0.08)] border border-[rgba(48,209,88,0.2)]'
                  : game.result === 'loss'
                  ? '!bg-[rgba(255,59,48,0.08)] border border-[rgba(255,59,48,0.2)]'
                  : '!bg-[#2a2a2a] border border-[rgba(255,255,255,0.1)]'
              }`}
              onClick={() => navigate('/play')}
            >
              {/* Text Content - Top */}
              <div className="p-5 flex-1">
                {/* Result badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl mb-3 text-xs font-semibold ${
                  game.result === 'win'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : game.result === 'loss'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {game.result === 'win' ? 'Победа' : game.result === 'loss' ? 'Поражение' : 'Ничья'}
                </div>

                {/* Opponent */}
                <h5 className="mb-3 !text-base">{game.opponent}</h5>

                {/* Game info */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Режим</span>
                    <span className="text-white font-medium">{game.mode}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Ходов</span>
                    <span className="text-white font-medium">{game.moves}</span>
                  </div>
                </div>
              </div>

              {/* Image - Bottom (40-50% height) */}
              <div className="h-[100px] overflow-hidden">
                <img
                  src={game.image}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Widgets */}
      <div className="px-8 mb-8">
        <h3 className="!text-xl mb-6">Актуально</h3>
        <div className="space-y-4">
          {widgets.map((widget, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card p-6 cursor-pointer shadow-depth hover-lift"
              onClick={() => navigate('/game-mode')}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h6 className="mb-2">{widget.title}</h6>
                  <p className="text-body-sm text-gray-400">{widget.subtitle}</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  {widget.participants && (
                    <p className="text-gray-400 text-body-sm font-medium">{widget.participants}</p>
                  )}
                  {widget.badge && (
                    <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-3 rounded-2xl">
                      <Flame className="w-6 h-6 text-stake-red" />
                    </div>
                  )}
                  {widget.avatars && (
                    <div className="flex -space-x-2">
                      {widget.avatars.map((_, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border-2 border-stake-black-light"
                        >
                          <User className="w-4 h-4 text-gray-400" />
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

      {/* Live Games - компактные и внизу */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-8 pb-28"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <h4 className="!text-base text-gray-400">Эфиры</h4>
          </div>
          <span className="text-xs text-gray-500">{liveGames.length}</span>
        </div>
        <div className="space-y-3">
          {liveGames.slice(0, 2).map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + index * 0.05 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                success('Подключаемся к партии', 'Загрузка трансляции...');
                setTimeout(() => navigate('/play'), 1500);
              }}
              className="glass-card p-4 w-full text-left hover-lift"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold truncate">{game.whitePlayer.name}</span>
                    <span className="text-xs text-gray-500">{game.whitePlayer.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate">{game.blackPlayer.name}</span>
                    <span className="text-xs text-gray-500">{game.blackPlayer.rating}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <User className="w-3 h-3" />
                    <span>{game.viewers}</span>
                  </div>
                  <span className="text-xs text-gray-500">{game.timeControl}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </motion.div>
  );
}
