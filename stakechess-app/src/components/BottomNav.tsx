import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Zap, User, Trophy, Target } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Главная', icon: Home, path: '/home' },
  { id: 'play', label: 'Играть', icon: Zap, path: '/game-mode' },
  { id: 'tournaments', label: 'Турниры', icon: Trophy, path: '/tournaments' },
  { id: 'achievements', label: 'Награды', icon: Target, path: '/achievements' },
  { id: 'profile', label: 'Профиль', icon: User, path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 safe-area-bottom"
    >
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all min-h-[64px] min-w-[64px] relative ${
                active ? 'text-stake-red' : 'text-gray-400 hover:text-white'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-stake-red/10 rounded-xl border border-stake-red/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={`w-6 h-6 relative z-10 ${active ? '' : ''}`} strokeWidth={active ? 2 : 1.5} />
              <span className={`text-xs relative z-10 font-medium ${active ? 'text-stake-red' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
