import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Activity, Wind, Clock, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const gameModes = [
  {
    id: 'blitz',
    title: 'Блиц',
    time: '3 + 2',
    description: '3 минуты на партию + 2 сек за ход',
    Icon: Zap,
  },
  {
    id: 'rapid',
    title: 'Рапид',
    time: '10 + 0',
    description: '10 минут на партию',
    Icon: Activity,
  },
  {
    id: 'bullet',
    title: 'Пуля',
    time: '1 + 0',
    description: '1 минута на партию',
    Icon: Wind,
  },
  {
    id: 'classic',
    title: 'Классика',
    time: '30 + 0',
    description: '30 минут на партию',
    Icon: Clock,
  },
];

const tournaments = [
  {
    id: 1,
    title: 'Турнир выходного дня',
    time: 'Старт: 2:15:00',
    ratingPoints: '+50 рейтинга',
    players: '128/256',
    entry: 'Открытый',
  },
  {
    id: 2,
    title: 'Ежедневная арена',
    time: 'Идет сейчас',
    ratingPoints: '+25 рейтинга',
    players: '45/100',
    entry: 'Открытый',
  },
];

const modeTooltips = {
  blitz: 'Быстрая игра для опытных игроков. Каждая партия длится около 6 минут.',
  rapid: 'Классический темп. Достаточно времени на обдумывание стратегии.',
  bullet: 'Молниеносная игра! Только для профи с быстрой реакцией.',
  classic: 'Полноценные партии без спешки. Идеально для глубокого анализа.',
};

export default function GameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('blitz');
  const [activeTab, setActiveTab] = useState<'play' | 'tournament'>('play');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handlePlay = () => {
    navigate('/match-search');
  };

  const handlePlayWithAI = () => {
    navigate('/select-ai');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-20"
    >
      <Breadcrumbs />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-8 pt-2 pb-4 flex items-center gap-4"
      >
        <button
          onClick={() => navigate('/home')}
          className="glass-button !px-4 !py-3"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="!text-3xl">Выбор режима</h1>
      </motion.div>

      {/* Tabs */}
      <div className="px-8 mb-8">
        <div className="glass rounded-2xl p-2 flex gap-2" role="tablist" aria-label="Режим игры">
          <button
            onClick={() => setActiveTab('play')}
            role="tab"
            aria-selected={activeTab === 'play'}
            aria-controls="play-panel"
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'play'
                ? 'bg-gradient-to-r from-stake-red to-stake-red-dark text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Играть
          </button>
          <button
            onClick={() => setActiveTab('tournament')}
            role="tab"
            aria-selected={activeTab === 'tournament'}
            aria-controls="tournament-panel"
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'tournament'
                ? 'bg-gradient-to-r from-stake-red to-stake-red-dark text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Турниры
          </button>
        </div>
      </div>

      {activeTab === 'play' ? (
        <div role="tabpanel" id="play-panel" aria-labelledby="play-tab">
          {/* Game Modes */}
          <div className="px-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h6 className="!text-base text-gray-400">Режим игры</h6>
              <button
                onClick={() => setShowTooltip(showTooltip ? null : 'info')}
                className="glass-button !px-3 !py-2 flex items-center gap-2"
              >
                <Info className="w-4 h-4 text-stake-red" />
                <span className="text-xs">Подсказка</span>
              </button>
            </div>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 mb-4 bg-stake-red/10 border-stake-red/30"
              >
                <p className="text-sm text-gray-300">
                  {modeTooltips[selectedMode as keyof typeof modeTooltips]}
                </p>
              </motion.div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {gameModes.map((mode, index) => {
                const isSelected = selectedMode === mode.id;
                const getModeStyles = () => {
                  const baseOpacity = isSelected ? 'opacity-100' : 'opacity-40 hover:opacity-70';

                  switch(mode.id) {
                    case 'blitz':
                      return isSelected
                        ? `${baseOpacity} !bg-[#1a1a1a] border-l-4 !border-l-[#ff3b30] border-2 !border-[#ff3b30] shadow-[0_4px_16px_rgba(255,59,48,0.2)]`
                        : `${baseOpacity} !bg-[#1a1a1a] border-l-4 !border-l-[#ff3b30]/20 border !border-white/5`;
                    case 'rapid':
                      return isSelected
                        ? `${baseOpacity} !bg-[#1a1a1a] border-l-4 !border-l-[#ffcc00] border-2 !border-[#ffcc00] shadow-[0_4px_16px_rgba(255,204,0,0.2)]`
                        : `${baseOpacity} !bg-[#1a1a1a] border-l-4 !border-l-[#ffcc00]/20 border !border-white/5`;
                    case 'bullet':
                      return isSelected
                        ? `${baseOpacity} !bg-[#1a1a1a] border-l-4 !border-l-[#5e5ce6] border-2 !border-[#5e5ce6] shadow-[0_4px_16px_rgba(94,92,230,0.2)]`
                        : `${baseOpacity} !bg-[#1a1a1a] border-l-4 !border-l-[#5e5ce6]/20 border !border-white/5`;
                    case 'classic':
                      return isSelected
                        ? `${baseOpacity} !bg-[#1a1a1a] border-l-4 !border-l-[#30d158] border-2 !border-[#30d158] shadow-[0_4px_16px_rgba(48,209,88,0.2)]`
                        : `${baseOpacity} !bg-[#1a1a1a] border-l-4 !border-l-[#30d158]/20 border !border-white/5`;
                    default:
                      return '';
                  }
                };

                return (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => setSelectedMode(mode.id)}
                  aria-label={`${mode.title} - ${mode.description}`}
                  aria-pressed={isSelected}
                  className={`glass-card p-6 text-left transition-all hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden ${getModeStyles()}`}
                >
                  <h6 className="mb-1 mt-4">{mode.title}</h6>
                  <p className="text-body-sm text-gray-400 mb-2 font-medium">{mode.time}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{mode.description}</p>
                  {/* 3D Icon Anchor */}
                  {mode.id === 'blitz' && (
                    <img src="/images/icons/молния.png" alt="" className="absolute bottom-4 right-4 w-20 h-20 opacity-25 pointer-events-none" />
                  )}
                  {mode.id === 'rapid' && (
                    <img src="/images/icons/ожидание.png" alt="" className="absolute bottom-4 right-4 w-20 h-20 opacity-25 pointer-events-none" />
                  )}
                  {mode.id === 'classic' && (
                    <img src="/images/icons/ожидание.png" alt="" className="absolute bottom-4 right-4 w-20 h-20 opacity-25 pointer-events-none" />
                  )}
                </motion.button>
                );
              })}
            </div>
          </div>

          {/* Opponent Selection */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-8 mb-6"
          >
            <h6 className="!text-sm text-gray-400 mb-3">Выбор соперника</h6>
            <div className="space-y-3">
              <button
                onClick={handlePlay}
                className="glass-card p-6 w-full text-left bg-white/5 border border-white/10 hover:bg-white/8 hover:border-stake-red/30 transition-all shadow-depth relative overflow-hidden"
                aria-label="Играть против случайного соперника"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h6 className="!text-base mb-1">Случайный соперник</h6>
                    <p className="text-body-sm text-gray-400">Рейтинг: 1400 - 1500</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
                {/* 3D Icon Anchor */}
                <img
                  src="/images/icons/кубик.png"
                  alt=""
                  className="absolute bottom-4 right-4 w-20 h-20 opacity-25 pointer-events-none"
                />
              </button>
              <button
                onClick={handlePlayWithAI}
                className="glass-card p-6 w-full text-left bg-white/5 border border-white/10 hover:bg-white/8 hover:border-stake-red/30 transition-all shadow-depth relative overflow-hidden"
                aria-label="Играть против AI моделей шахматистов"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h6 className="!text-base mb-1">Играть с AI</h6>
                    <p className="text-body-sm text-gray-400">Тренировочный режим</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
                {/* 3D Icon Anchor */}
                <img
                  src="/images/icons/ai-robot.png"
                  alt=""
                  className="absolute bottom-4 right-4 w-20 h-20 opacity-25 pointer-events-none"
                />
              </button>
            </div>
          </motion.div>

          {/* Play Button - Main CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-8 mb-8"
          >
            <button
              onClick={handlePlay}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                selectedMode
                  ? 'bg-gradient-to-r from-stake-red to-stake-red-dark text-white shadow-[0_8px_24px_rgba(255,59,48,0.4)] hover:shadow-[0_12px_32px_rgba(255,59,48,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
              }`}
              disabled={!selectedMode}
              aria-label="Начать игру с выбранными настройками"
            >
              {selectedMode ? 'Начать игру' : 'Выберите режим игры'}
            </button>
          </motion.div>

        </div>
      ) : (
        /* Tournaments */
        <motion.div
          role="tabpanel"
          id="tournament-panel"
          aria-labelledby="tournament-tab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-8 space-y-6"
        >
          {tournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="glass-card p-8 shadow-depth-lg relative overflow-hidden hover-lift cursor-pointer border border-white/10"
            >
              {/* Background chess piece */}
              <div className="absolute -right-4 -top-4 w-48 h-48 opacity-15 pointer-events-none">
                <img
                  src="/images/achievements/0_0__73_.png"
                  alt=""
                  className="w-full h-full object-cover scale-110"
                />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="mb-2">{tournament.title}</h4>
                    <p className="text-body-sm text-gray-400 font-medium">{tournament.time}</p>
                  </div>
                  <div className="text-right bg-gradient-to-br from-stake-red/20 to-stake-red/5 px-4 py-3 rounded-2xl">
                    <p className="text-stake-red font-bold text-lg">{tournament.ratingPoints}</p>
                    <p className="text-xs text-gray-500">за победу</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-body-sm text-gray-400 mb-1">Участники</p>
                    <h6 className="!text-base">{tournament.players}</h6>
                  </div>
                  <div>
                    <p className="text-body-sm text-gray-400 mb-1">Формат</p>
                    <h6 className="!text-base">{tournament.entry}</h6>
                  </div>
                </div>
                <button className="btn-primary w-full">
                  Зарегистрироваться
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
