import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Zap, User } from 'lucide-react';

interface BottomNavProps {
  active: 'home' | 'play' | 'profile';
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 glass border-t border-white/[0.08] px-6 py-4 flex justify-around backdrop-blur-2xl z-50"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <button
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center gap-2 transition-all min-h-[44px] ${
          active === 'home' ? 'text-stake-red' : 'text-gray-400 hover:text-white'
        }`}
      >
        {active === 'home' && (
          <div className="bg-stake-red/10 p-2 rounded-xl">
            <Home className="w-6 h-6" strokeWidth={2} />
          </div>
        )}
        {active !== 'home' && (
          <div className="p-2">
            <Home className="w-6 h-6" strokeWidth={2} />
          </div>
        )}
        <span className="text-xs font-medium">Главная</span>
      </button>
      <button
        onClick={() => navigate('/game-mode')}
        className={`flex flex-col items-center gap-2 transition-all min-h-[44px] ${
          active === 'play' ? 'text-stake-red' : 'text-gray-400 hover:text-white'
        }`}
      >
        {active === 'play' && (
          <div className="bg-stake-red/10 p-2 rounded-xl">
            <Zap className="w-6 h-6" strokeWidth={2} />
          </div>
        )}
        {active !== 'play' && (
          <div className="p-2">
            <Zap className="w-6 h-6" strokeWidth={2} />
          </div>
        )}
        <span className="text-xs font-medium">Играть</span>
      </button>
      <button
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center gap-2 transition-all min-h-[44px] ${
          active === 'profile' ? 'text-stake-red' : 'text-gray-400 hover:text-white'
        }`}
      >
        {active === 'profile' && (
          <div className="bg-stake-red/10 p-2 rounded-xl">
            <User className="w-6 h-6" strokeWidth={2} />
          </div>
        )}
        {active !== 'profile' && (
          <div className="p-2">
            <User className="w-6 h-6" strokeWidth={2} />
          </div>
        )}
        <span className="text-xs font-medium">Профиль</span>
      </button>
    </motion.div>
  );
}
