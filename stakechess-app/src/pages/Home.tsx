import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Bot, Trophy, User, Flame, Crown } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import LiveGameCard from '../components/LiveGameCard';
import { useToast } from '../contexts/ToastContext';

const quickActions = [
  { id: 'quick', title: 'Быстрая игра', Icon: Zap, path: '/game-mode', desc: 'Блиц 3+2' },
  { id: 'ai', title: 'Модели шахматистов', Icon: Bot, path: '/play', desc: 'Играй с AI стилями' },
  { id: 'tournament', title: 'Турниры', Icon: Trophy, path: '/tournaments', desc: 'Призовые партии' },
  { id: 'premium', title: 'King Premium', Icon: Crown, path: '/premium', desc: 'Получить -50%' },
];

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
    image: '/images/pieces/king-crown.png',
    moves: 32,
    date: '2 часа назад',
  },
  {
    id: 2,
    opponent: 'Стратег_99',
    result: 'loss',
    mode: 'Рапид 10+0',
    image: '/images/pieces/queen-bishop.png',
    moves: 45,
    date: '5 часов назад',
  },
  {
    id: 3,
    opponent: 'Тактик_2000',
    result: 'draw',
    mode: 'Классика',
    image: '/images/pieces/knight-light.png',
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
          <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10 pointer-events-none">
            <img
              src="/images/pieces/king-crown.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-stake-red/50 shadow-[0_0_16px_rgba(255,23,68,0.4)]">
                  <img
                    src="/images/heroes/ai-network.png"
                    alt="Player"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-body-sm text-gray-400 mb-2">Текущий рейтинг</p>
                  <h2 className="!text-display-sm text-gradient">1450</h2>
                </div>
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

      {/* Live Games */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-8 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <h3 className="!text-xl">Игры в прямом эфире</h3>
          </div>
          <span className="text-sm text-gray-400">{liveGames.length} партий</span>
        </div>
        <div className="grid gap-4">
          {liveGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <LiveGameCard
                game={game}
                onWatch={() => {
                  success('Подключаемся к партии', 'Загрузка трансляции...');
                  setTimeout(() => navigate('/play'), 1500);
                }}
                variant={index === 0 ? 'dynamic' : index === 1 ? 'glass' : 'default'}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="px-8 mb-8">
        <h3 className="!text-xl mb-6">Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const isSpecial = action.id === 'premium';
            return (
              <motion.button
                key={action.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05, type: 'spring' }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (action.id === 'ai') {
                    info('Модели шахматистов', 'Играй в стиле Магнуса Карлсена, Каспарова и других!');
                  }
                  navigate(action.path);
                }}
                className={`glass-card p-6 text-center shadow-depth hover-lift relative overflow-hidden ${
                  isSpecial ? 'border-2 border-yellow-500/30' : ''
                }`}
              >
                {isSpecial && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10" />
                )}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                  isSpecial
                    ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20'
                    : 'bg-gradient-to-br from-stake-red/20 to-stake-red/5'
                }`}>
                  <action.Icon className={`w-7 h-7 ${isSpecial ? 'text-yellow-400' : 'text-stake-red'}`} strokeWidth={2} />
                </div>
                <p className="font-semibold text-base mb-1">{action.title}</p>
                <p className="text-xs text-gray-400">{action.desc}</p>
              </motion.button>
            );
          })}
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
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10 pointer-events-none">
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

      {/* Widgets */}
      <div className="px-8 pb-28">
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

      <BottomNav />
    </motion.div>
  );
}
