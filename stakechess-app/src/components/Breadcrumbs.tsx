import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const routeNames: Record<string, string> = {
  '/': 'Главная',
  '/home': 'Главная',
  '/game-mode': 'Режим игры',
  '/match-search': 'Поиск соперника',
  '/play': 'Игра',
  '/profile': 'Профиль',
  '/tournaments': 'Турниры',
  '/premium': 'Premium',
  '/select-ai': 'Выбор AI',
  '/settings': 'Настройки',
  '/achievements': 'Достижения',
  '/puzzles': 'Задачи',
  '/openings': 'Дебюты',
  '/leaderboard': 'Рейтинг',
};

export default function Breadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show breadcrumbs on onboarding or home
  if (location.pathname === '/' || location.pathname === '/home') {
    return null;
  }

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-8 py-3 flex items-center gap-2 text-sm overflow-x-auto scrollbar-hide"
      aria-label="Breadcrumb"
    >
      {/* Home link */}
      <button
        onClick={() => navigate('/home')}
        className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
        aria-label="Домой"
      >
        <Home className="w-4 h-4" />
      </button>

      {/* Current page */}
      {pathSegments.length > 0 && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white font-medium whitespace-nowrap">
            {routeNames[`/${pathSegments[pathSegments.length - 1]}`] || 'Страница'}
          </span>
        </>
      )}
    </motion.nav>
  );
}
