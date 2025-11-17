import { motion } from 'framer-motion';
import { Check, Lock, Crown } from 'lucide-react';

interface BoardTheme {
  id: string;
  name: string;
  description: string;
  image: string;
  isPremium: boolean;
  isUnlocked: boolean;
}

const themes: BoardTheme[] = [
  {
    id: 'royal-glass',
    name: 'Королевское Стекло',
    description: 'Элегантный стеклянный дизайн с благородным блеском',
    image: '/images/pieces/royal-glass.png',
    isPremium: true,
    isUnlocked: false,
  },
  {
    id: 'royal-elite',
    name: 'Королевская Элита',
    description: 'Премиум дизайн для истинных мастеров',
    image: '/images/pieces/royal-elite.png',
    isPremium: true,
    isUnlocked: false,
  },
  {
    id: 'royal-pair',
    name: 'Королевская Пара',
    description: 'Изысканный дизайн для парных игр',
    image: '/images/pieces/royal-pair.png',
    isPremium: true,
    isUnlocked: false,
  },
  {
    id: 'bishops-chrome',
    name: 'Хромированные Слоны',
    description: 'Современный металлический дизайн',
    image: '/images/pieces/bishops-chrome.png',
    isPremium: false,
    isUnlocked: true,
  },
  {
    id: 'pair-reflect',
    name: 'Зеркальное Отражение',
    description: 'Уникальный зеркальный эффект',
    image: '/images/pieces/pair-reflect.png',
    isPremium: false,
    isUnlocked: true,
  },
];

interface PremiumBoardThemesProps {
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
  onUnlock: (themeId: string) => void;
}

export default function PremiumBoardThemes({
  selectedTheme,
  onSelectTheme,
  onUnlock,
}: PremiumBoardThemesProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
        <div className="flex items-center gap-3">
          <Crown className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="!text-xl mb-1">Премиум Темы</h3>
            <p className="text-sm text-gray-400">Эксклюзивные дизайны для вашей доски</p>
          </div>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme, index) => {
          const isSelected = selectedTheme === theme.id;
          const canSelect = theme.isUnlocked;

          return (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 cursor-pointer transition-all relative overflow-hidden ${
                isSelected ? 'border-stake-red/50 bg-stake-red/10 shadow-red-glow' : ''
              } ${!canSelect ? 'opacity-60' : 'hover-lift'}`}
              onClick={() => canSelect && onSelectTheme(theme.id)}
            >
              {/* Premium Badge */}
              {theme.isPremium && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Crown className="w-3 h-3 text-white" />
                    <span className="text-xs text-white font-bold">PREMIUM</span>
                  </div>
                </div>
              )}

              {/* Lock Overlay */}
              {!theme.isUnlocked && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnlock(theme.id);
                    }}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Разблокировать
                  </button>
                </div>
              )}

              {/* Theme Preview */}
              <div className="relative mb-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 p-4">
                  <img
                    src={theme.image}
                    alt={theme.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 left-2 bg-stake-red rounded-full p-2 shadow-lg"
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>

              {/* Theme Info */}
              <div className="relative z-10">
                <h4 className="!text-lg mb-1">{theme.name}</h4>
                <p className="text-sm text-gray-400">{theme.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Unlock All CTA */}
      <div className="glass-card p-6 bg-gradient-to-r from-stake-red/10 to-orange-500/10 border-stake-red/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="!text-lg mb-1">Разблокировать все темы</h4>
            <p className="text-sm text-gray-400">Получите доступ ко всем премиум дизайнам</p>
          </div>
          <button className="btn-primary">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}
