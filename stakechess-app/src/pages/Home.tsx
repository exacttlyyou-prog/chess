import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Bot, Trophy, Settings } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ThemeToggle from '../components/ThemeToggle';
import { useToast } from '../contexts/ToastContext';

const recentGames = [
  {
    id: 1,
    opponent: 'Магнус Карлсен',
    rating: '2831',
    result: 'win',
    mode: 'Блиц 3+2',
    image: '/images/pieces/king-solo.png',
    moves: 32,
    date: '2 часа назад',
  },
  {
    id: 2,
    opponent: 'Стратег_99',
    rating: '1850',
    result: 'loss',
    mode: 'Рапид 10+0',
    image: '/images/pieces/king-shatter.png',
    moves: 45,
    date: '5 часов назад',
  },
  {
    id: 3,
    opponent: 'Тактик_2000',
    rating: '2000',
    result: 'draw',
    mode: 'Классика',
    image: '/images/pieces/queen-bishop.png',
    moves: 68,
    date: 'Вчера',
  },
];


export default function Home() {
  const navigate = useNavigate();
  const { info } = useToast();

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
        {/* Hero Profile Card */}
        <motion.button
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/profile')}
          aria-label="Открыть профиль игрока"
          className="relative mb-6 hover-lift overflow-hidden rounded-3xl shadow-depth-lg group h-[180px]"
        >
          {/* Full Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/pieces/king-solo.png"
              alt=""
              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-stake-black/95 via-stake-black/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-stake-red/20 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full p-6 flex flex-col justify-between">
            {/* Top Section - Avatar & Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Large Avatar */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                  <img
                    src="/images/pieces/king-crown.png"
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-stake-red/30" />
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h1 className="!text-2xl font-bold">Игрок</h1>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg" />
                      <span className="text-xs text-green-400 font-semibold">Онлайн</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                      <span className="text-yellow-400 font-bold text-lg">⭐ 1450</span>
                      <span className="text-xs text-yellow-300/80 font-medium">ELO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Actions */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/settings');
                  }}
                  className="glass-button !px-3 !py-3 hover:bg-white/10"
                  aria-label="Открыть настройки"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bottom Section - Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-green-400">12</span>
                <span className="text-xs text-gray-400">Побед</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-red-400">3</span>
                <span className="text-xs text-gray-400">Поражений</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-gray-400">5</span>
                <span className="text-xs text-gray-400">Ничья</span>
              </div>
              <div className="ml-auto">
                <span className="text-xs text-gray-400 font-medium">Смотреть профиль →</span>
              </div>
            </div>
          </div>
        </motion.button>

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

        {/* Quick Actions - Simplified */}
        <h2 className="!text-2xl mb-6 text-gradient">Начать игру</h2>
        <div className="space-y-4 mb-8">
          {/* Main CTA - Play with AI */}
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
            className="glass-card p-8 text-left shadow-lg bg-gradient-to-br from-stake-red/20 to-transparent border-stake-red/40 relative overflow-hidden group w-full"
            aria-label="Играть с AI моделями легендарных шахматистов"
          >
            <div className="absolute inset-0 bg-gradient-radial from-stake-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-stake-red to-stake-red-dark flex items-center justify-center shadow-lg">
                <Bot className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="!text-2xl mb-2">Модели шахматистов</h3>
                <p className="text-body text-gray-400">Играй с AI стилями легенд шахмат</p>
              </div>
            </div>
          </motion.button>

          {/* Secondary actions - compact */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring' }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/game-mode')}
              className="glass-card p-6 text-center shadow-depth hover-lift !bg-gradient-to-br !from-[rgba(255,59,48,0.12)] !to-[#2a2a2a] border-l-4 !border-l-[#ff3b30]"
              aria-label="Быстрая игра в режиме Блиц 3+2"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-stake-red/30 to-stake-red/10 flex items-center justify-center mx-auto mb-3">
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
              className="glass-card p-6 text-center shadow-depth hover-lift !bg-gradient-to-br !from-[rgba(255,204,0,0.12)] !to-[#2a2a2a] border-l-4 !border-l-[#ffcc00]"
              aria-label="Турниры с призовыми партиями"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-7 h-7 text-yellow-500" strokeWidth={2} />
              </div>
              <p className="font-semibold text-base mb-1">Турниры</p>
              <p className="text-xs text-gray-400">Призовые партии</p>
            </motion.button>
          </div>
        </div>

        {/* Training - Compact single row */}
        <h3 className="!text-xl mb-4">Тренировки</h3>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/puzzles')}
            className="glass-card p-4 text-center shadow-depth hover-lift"
            aria-label="Решать шахматные задачи"
          >
            <span className="text-2xl mb-2 block">🧩</span>
            <p className="font-semibold text-sm">Задачи</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/openings')}
            className="glass-card p-4 text-center shadow-depth hover-lift"
            aria-label="Изучать шахматные дебюты"
          >
            <span className="text-2xl mb-2 block">📖</span>
            <p className="font-semibold text-sm">Дебюты</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/leaderboard')}
            className="glass-card p-4 text-center shadow-depth hover-lift"
            aria-label="Посмотреть таблицу лидеров"
          >
            <span className="text-2xl mb-2 block">🏆</span>
            <p className="font-semibold text-sm">Рейтинг</p>
          </motion.button>
        </div>
      </motion.div>

      {/* Recent Games - Compact horizontal scroll */}
      <div className="px-8 pb-28">
        <h3 className="!text-xl mb-4">Недавние партии</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" role="list" aria-label="Недавние шахматные партии">
          {recentGames.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/play')}
              className={`glass-card p-4 min-w-[200px] text-left shadow-depth ${
                game.result === 'win'
                  ? 'border-l-4 !border-l-green-500'
                  : game.result === 'loss'
                  ? 'border-l-4 !border-l-red-500'
                  : 'border-l-4 !border-l-gray-500'
              }`}
              aria-label={`Партия против ${game.opponent}, результат: ${game.result === 'win' ? 'Победа' : game.result === 'loss' ? 'Поражение' : 'Ничья'}`}
              role="listitem"
            >
              {/* Result badge */}
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg mb-3 text-xs font-bold ${
                game.result === 'win'
                  ? 'bg-green-500/20 text-green-400'
                  : game.result === 'loss'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {game.result === 'win' ? '✓ Победа' : game.result === 'loss' ? '✗ Поражение' : '= Ничья'}
              </div>

              {/* Opponent */}
              <h6 className="!text-base mb-1 truncate">{game.opponent}</h6>
              {game.rating && (
                <p className="text-xs text-yellow-400 mb-2">⭐ {game.rating} ELO</p>
              )}

              {/* Game info */}
              <div className="space-y-1">
                <p className="text-xs text-gray-400">{game.mode} • {game.moves} ходов</p>
                <p className="text-xs text-gray-500">{game.date}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </motion.div>
  );
}
