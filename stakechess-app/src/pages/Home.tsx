import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, User, Flame, Home as HomeIcon, Clock, ChevronRight, X, Target, Puzzle, Crown } from 'lucide-react';

const featuredTournament = {
  title: 'Турнир выходного дня',
  subtitle: 'Блиц-марафон',
  prize: '+50 рейтинга',
  startTime: '2:15:00',
  participants: '128/256',
  image: '/images/achievements/tournament-cup.png',
};

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

const stats = {
  rating: 1450,
  wins: 128,
  losses: 94,
  draws: 23,
  streak: 5,
  totalGames: 245,
};

export default function Home() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern"
    >
      {/* Compact Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-8 pt-2 pb-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="!text-3xl mb-1">Привет, Игрок</h1>
            <div className="flex items-center gap-4 text-body-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Рейтинг:</span>
                <span className="font-bold text-gradient text-lg">1450</span>
              </div>
              <div className="flex items-center gap-1 text-stake-red">
                <Flame className="w-4 h-4" />
                <span className="font-semibold">5</span>
              </div>
            </div>
          </div>
          <motion.button
            onClick={() => setShowProfile(true)}
            className="glass-button !px-4 !py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>

      {/* Hero Tournament Section */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
        className="px-8 mb-8"
      >
        <motion.div
          className="glass-card p-8 bg-gradient-to-br from-stake-red/20 to-transparent border-stake-red/40 relative overflow-hidden cursor-pointer shadow-depth-lg"
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/game-mode')}
        >
          {/* Background image */}
          <div className="absolute right-0 bottom-0 w-48 h-48 opacity-8 pointer-events-none">
            <img
              src={featuredTournament.image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-stake-red" />
                  <span className="text-xs font-semibold text-stake-red uppercase tracking-wide">
                    Скоро старт
                  </span>
                </div>
                <h2 className="!text-4xl mb-2">{featuredTournament.title}</h2>
                <p className="text-body text-gray-300">{featuredTournament.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="glass px-4 py-3 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Старт через</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stake-red" />
                  <p className="text-xl font-bold text-white">{featuredTournament.startTime}</p>
                </div>
              </div>
              <div className="glass px-4 py-3 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Участники</p>
                <p className="text-xl font-bold text-white">{featuredTournament.participants}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 px-5 py-3 rounded-2xl">
                <p className="text-stake-red font-bold text-lg">{featuredTournament.prize}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Giant Quick Play Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
        className="px-8 mb-10"
      >
        <motion.button
          onClick={() => navigate('/game-mode')}
          className="btn-primary w-full !py-8 text-center relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-4">
            <Zap className="w-8 h-8" strokeWidth={2.5} />
            <span className="!text-3xl font-bold">Быстрая игра</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Recent Games - Compact */}
      <div className="px-8 pb-28">
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-xl">Недавние партии</h3>
          <motion.button
            className="text-body-sm text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: 4 }}
          >
            Все
          </motion.button>
        </div>
        <div className="space-y-3">
          {recentGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
              whileHover={{ x: 4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="glass-card p-5 cursor-pointer shadow-depth"
              onClick={() => navigate('/play')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Result indicator */}
                  <div className={`w-2 h-2 rounded-full ${
                    game.result === 'win'
                      ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]'
                      : game.result === 'loss'
                      ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]'
                      : 'bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.6)]'
                  }`} />

                  <div>
                    <h6 className="!text-base mb-1">{game.opponent}</h6>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{game.mode}</span>
                      <span>•</span>
                      <span>{game.moves} ходов</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-sm font-semibold mb-1 ${
                    game.result === 'win' ? 'text-green-400' : game.result === 'loss' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {game.result === 'win' ? 'Победа' : game.result === 'loss' ? 'Поражение' : 'Ничья'}
                  </div>
                  <div className="text-xs text-gray-500">{game.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - 2 tabs only */}
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
          onClick={() => navigate('/game-mode')}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all min-h-[44px]"
        >
          <div className="p-2">
            <Zap className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Играть</span>
        </button>
      </motion.div>

      {/* Profile Modal Sheet */}
      <AnimatePresence>
        {showProfile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-stake-black-light to-stake-black rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto"
            >
              {/* Handle bar */}
              <div className="sticky top-0 bg-gradient-to-b from-stake-black-light to-transparent pt-4 pb-2 px-8">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between">
                  <h2 className="!text-3xl">Профиль</h2>
                  <button
                    onClick={() => setShowProfile(false)}
                    className="glass-button !px-4 !py-3"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="px-8 pb-8">
                {/* Profile Header */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-stake-red/30 to-stake-red/10 flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-stake-red" />
                  </div>
                  <h3 className="!text-2xl mb-2">Игрок</h3>
                  <div className="flex items-center justify-center gap-4">
                    <div className="glass px-5 py-3 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Рейтинг</p>
                      <p className="text-2xl font-bold text-gradient">{stats.rating}</p>
                    </div>
                    <div className="glass px-5 py-3 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Побед подряд</p>
                      <div className="flex items-center justify-center gap-1">
                        <p className="text-2xl font-bold text-stake-red">{stats.streak}</p>
                        <Flame className="w-5 h-5 text-stake-red" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="glass-card p-6 mb-6 shadow-depth">
                  <h5 className="mb-4">Общая статистика</h5>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-400">{stats.wins}</p>
                      <p className="text-body-sm text-gray-400">Побед</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-red-400">{stats.losses}</p>
                      <p className="text-body-sm text-gray-400">Поражений</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-400">{stats.draws}</p>
                      <p className="text-body-sm text-gray-400">Ничьих</p>
                    </div>
                  </div>
                </div>

                {/* Achievements Preview */}
                <div className="glass-card p-6 shadow-depth">
                  <div className="flex items-center justify-between mb-4">
                    <h5>Достижения</h5>
                    <span className="text-body-sm text-gray-400">3 из 6</span>
                  </div>
                  <div className="flex gap-3">
                    {[
                      { Icon: Target, unlocked: true },
                      { Icon: Flame, unlocked: true },
                      { Icon: Zap, unlocked: true },
                      { Icon: Puzzle, unlocked: false },
                      { Icon: Crown, unlocked: false },
                      { Icon: Trophy, unlocked: false },
                    ].map((achievement, i) => (
                      <div
                        key={i}
                        className={`flex-1 aspect-square bg-gradient-to-br from-stake-red/30 to-stake-red/10 rounded-2xl flex items-center justify-center ${
                          !achievement.unlocked ? 'opacity-30 grayscale' : ''
                        }`}
                      >
                        <achievement.Icon className="w-8 h-8 text-stake-red" strokeWidth={1.5} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
