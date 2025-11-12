import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Bot, Trophy, Users, User, Flame, Home as HomeIcon } from 'lucide-react';

const quickActions = [
  { id: 'quick', title: 'Быстрая игра', Icon: Zap, path: '/game-mode' },
  { id: 'ai', title: 'Игра с AI', Icon: Bot, path: '/play' },
  { id: 'tournament', title: 'Турниры', Icon: Trophy, path: '/game-mode' },
  { id: 'friends', title: 'С другом', Icon: Users, path: '/game-mode' },
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
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-8 pb-4"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Привет, Игрок</h1>
            <p className="text-gray-400">Рейтинг: 1450 • Онлайн</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="glass-button !px-4 !py-3"
          >
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-6 bg-gradient-to-br from-stake-red/20 to-transparent border-stake-red/30 shadow-red-glow"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Текущий рейтинг</p>
              <h2 className="text-4xl font-bold text-gradient">1450</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 mb-1">Прогресс</p>
              <p className="text-2xl font-bold text-green-400">+50</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <p className="text-gray-500">Побед</p>
              <p className="text-white font-semibold">128</p>
            </div>
            <div>
              <p className="text-gray-500">Поражений</p>
              <p className="text-gray-400 font-semibold">94</p>
            </div>
            <div>
              <p className="text-gray-500">Ничьих</p>
              <p className="text-gray-400 font-semibold">23</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <div className="px-8 mb-6">
        <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(action.path)}
              className="glass-card p-8 text-center hover:bg-white/10 transition-all shadow-depth"
            >
              <action.Icon className="w-10 h-10 mx-auto mb-2 text-stake-red" strokeWidth={1.5} />
              <p className="font-semibold">{action.title}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Widgets */}
      <div className="px-8 pb-8">
        <h3 className="text-lg font-semibold mb-4">Актуально</h3>
        <div className="space-y-4">
          {widgets.map((widget, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass-card p-6 hover:bg-white/10 transition-all cursor-pointer shadow-depth"
              onClick={() => navigate('/game-mode')}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold mb-1">{widget.title}</h4>
                  <p className="text-sm text-gray-400">{widget.subtitle}</p>
                </div>
                <div className="text-right">
                  {widget.participants && (
                    <p className="text-gray-400 text-sm">{widget.participants}</p>
                  )}
                  {widget.badge && (
                    <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-2 rounded-full">
                      <Flame className="w-6 h-6 text-stake-red" />
                    </div>
                  )}
                  {widget.avatars && (
                    <div className="flex -space-x-2">
                      {widget.avatars.map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-stake-gray flex items-center justify-center border-2 border-stake-black-light"
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

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 p-4 flex justify-around"
      >
        <button className="flex flex-col items-center gap-1 text-stake-red">
          <HomeIcon className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-xs">Главная</span>
        </button>
        <button
          onClick={() => navigate('/game-mode')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          <Zap className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-xs">Играть</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          <User className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-xs">Профиль</span>
        </button>
      </motion.div>
    </div>
  );
}
