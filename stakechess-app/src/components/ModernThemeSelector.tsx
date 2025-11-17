import { motion } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  preview: string;
  background: string;
}

const themes: Theme[] = [
  {
    id: 'cubes-modern',
    name: 'Современные Кубы',
    preview: '/images/backgrounds/cubes-abstract.png',
    background: 'from-purple-900/20 to-blue-900/20',
  },
  {
    id: 'futuristic',
    name: 'Футуристик',
    preview: '/images/backgrounds/futuristic.png',
    background: 'from-cyan-900/20 to-purple-900/20',
  },
  {
    id: 'board-depth',
    name: 'Глубина Доски',
    preview: '/images/backgrounds/board-depth.png',
    background: 'from-gray-900/20 to-slate-900/20',
  },
  {
    id: 'board-glow',
    name: 'Сияние Доски',
    preview: '/images/backgrounds/board-glow.png',
    background: 'from-amber-900/20 to-orange-900/20',
  },
];

interface ModernThemeSelectorProps {
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
}

export default function ModernThemeSelector({ selectedTheme, onSelectTheme }: ModernThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-6 h-6 text-stake-red" />
        <div>
          <h3 className="!text-xl">Фоновые темы</h3>
          <p className="text-sm text-gray-400">Выберите стиль для вашей игры</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme, index) => {
          const isSelected = selectedTheme === theme.id;

          return (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectTheme(theme.id)}
              className={`glass-card p-4 text-left transition-all relative overflow-hidden ${
                isSelected ? 'border-stake-red/50 shadow-red-glow' : 'hover-lift'
              }`}
            >
              {/* Preview Image */}
              <div className={`aspect-video rounded-xl overflow-hidden mb-3 bg-gradient-to-br ${theme.background} relative`}>
                <img
                  src={theme.preview}
                  alt={theme.name}
                  className="w-full h-full object-cover opacity-60"
                />

                {/* Selected Overlay */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-stake-red/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="bg-stake-red rounded-full p-3">
                      <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Theme Name */}
              <p className={`font-semibold transition-colors ${isSelected ? 'text-stake-red' : 'text-white'}`}>
                {theme.name}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
