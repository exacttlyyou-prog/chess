import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Lock, Volume2, VolumeX, Zap, Sparkles } from 'lucide-react';
import { useBoardSettings } from '../contexts/BoardSettingsContext';
import { getFreeBoardThemes, getPremiumBoardThemes } from '../config/boardThemes';
import { useToast } from '../contexts/ToastContext';

export default function Settings() {
  const navigate = useNavigate();
  const { settings, setTheme, toggleCoordinates, toggleHighlightLastMove, toggleShowLegalMoves, setAnimationSpeed, setSoundVolume, setParticleIntensity } = useBoardSettings();
  const { info, warning } = useToast();
  const [activeTab, setActiveTab] = useState<'board' | 'gameplay' | 'audio' | 'effects'>('board');

  const freeThemes = getFreeBoardThemes();
  const premiumThemes = getPremiumBoardThemes();

  const handleThemeSelect = (themeId: string, isPremium: boolean) => {
    if (isPremium) {
      warning('Премиум тема', 'Требуется подписка Premium для использования этой темы');
      navigate('/premium');
      return;
    }
    setTheme(themeId);
    info('Тема доски', 'Тема успешно применена!');
  };

  const animationSpeeds: Array<{ id: typeof settings.animationSpeed; label: string; ms: string }> = [
    { id: 'slow', label: 'Медленно', ms: '600ms' },
    { id: 'normal', label: 'Нормально', ms: '300ms' },
    { id: 'fast', label: 'Быстро', ms: '150ms' },
    { id: 'instant', label: 'Мгновенно', ms: '0ms' },
  ];

  const particleIntensities: Array<{ id: typeof settings.particleIntensity; label: string }> = [
    { id: 'off', label: 'Выкл' },
    { id: 'low', label: 'Низкая' },
    { id: 'medium', label: 'Средняя' },
    { id: 'high', label: 'Высокая' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-28 md:pb-20"
    >
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="glass-button !p-3 !rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="!text-3xl">Настройки</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { id: 'board' as const, label: 'Доска' },
            { id: 'gameplay' as const, label: 'Игра' },
            { id: 'audio' as const, label: 'Звук' },
            { id: 'effects' as const, label: 'Эффекты' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-stake-red text-white'
                  : 'glass-button'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Board Themes Tab */}
        {activeTab === 'board' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="!text-xl mb-4">Бесплатные темы</h2>
            <div className="grid grid-cols-2 gap-4">
              {freeThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id, false)}
                  className={`glass-card p-4 text-left relative ${
                    settings.theme.id === theme.id ? 'ring-2 ring-stake-red' : ''
                  }`}
                >
                  {settings.theme.id === theme.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-stake-red rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex gap-2 mb-3">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.colors.light }} />
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.colors.dark }} />
                  </div>
                  <h3 className="font-semibold mb-1">{theme.name}</h3>
                  <p className="text-sm text-gray-400">{theme.description}</p>
                </button>
              ))}
            </div>

            <h2 className="!text-xl mb-4 mt-8">Премиум темы</h2>
            <div className="grid grid-cols-2 gap-4">
              {premiumThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id, true)}
                  className="glass-card p-4 text-left relative"
                >
                  <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.colors.light }} />
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.colors.dark }} />
                  </div>
                  <h3 className="font-semibold mb-1">{theme.name}</h3>
                  <p className="text-sm text-gray-400">{theme.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gameplay Tab */}
        {activeTab === 'gameplay' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <button
              onClick={toggleCoordinates}
              className="glass-card p-5 w-full text-left flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold mb-1">Показывать координаты</h3>
                <p className="text-sm text-gray-400">Буквы и цифры по краям доски</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition-colors ${
                settings.showCoordinates ? 'bg-stake-red' : 'bg-gray-600'
              } relative`}>
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showCoordinates ? 'right-1' : 'left-1'
                }`} />
              </div>
            </button>

            <button
              onClick={toggleHighlightLastMove}
              className="glass-card p-5 w-full text-left flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold mb-1">Подсветка последнего хода</h3>
                <p className="text-sm text-gray-400">Выделять клетки предыдущего хода</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition-colors ${
                settings.highlightLastMove ? 'bg-stake-red' : 'bg-gray-600'
              } relative`}>
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.highlightLastMove ? 'right-1' : 'left-1'
                }`} />
              </div>
            </button>

            <button
              onClick={toggleShowLegalMoves}
              className="glass-card p-5 w-full text-left flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold mb-1">Показывать доступные ходы</h3>
                <p className="text-sm text-gray-400">Подсказки возможных ходов при выборе фигуры</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition-colors ${
                settings.showLegalMoves ? 'bg-stake-red' : 'bg-gray-600'
              } relative`}>
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showLegalMoves ? 'right-1' : 'left-1'
                }`} />
              </div>
            </button>

            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-stake-red" />
                <h3 className="font-semibold">Скорость анимации</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {animationSpeeds.map((speed) => (
                  <button
                    key={speed.id}
                    onClick={() => setAnimationSpeed(speed.id)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      settings.animationSpeed === speed.id
                        ? 'bg-stake-red text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold">{speed.label}</div>
                    <div className="text-xs opacity-70">{speed.ms}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Audio Tab */}
        {activeTab === 'audio' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                {settings.soundVolume > 0 ? (
                  <Volume2 className="w-5 h-5 text-stake-red" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
                <h3 className="font-semibold">Громкость звуков</h3>
                <span className="ml-auto text-stake-red font-mono">
                  {Math.round(settings.soundVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.soundVolume * 100}
                onChange={(e) => setSoundVolume(Number(e.target.value) / 100)}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stake-red [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </motion.div>
        )}

        {/* Effects Tab */}
        {activeTab === 'effects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-stake-red" />
                <h3 className="font-semibold">Интенсивность частиц</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {particleIntensities.map((intensity) => (
                  <button
                    key={intensity.id}
                    onClick={() => setParticleIntensity(intensity.id)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      settings.particleIntensity === intensity.id
                        ? 'bg-stake-red text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {intensity.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
