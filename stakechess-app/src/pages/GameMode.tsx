import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const gameModes = [
  {
    id: 'blitz',
    title: 'Блиц',
    time: '3 + 2',
    description: '3 мин + 2 сек',
    icon: '/images/icons/молния.png',
    accentColor: '#ff3b30',
  },
  {
    id: 'rapid',
    title: 'Рапид',
    time: '10 + 0',
    description: '10 минут',
    icon: '/images/icons/секундомер.png',
    accentColor: '#ffcc00',
  },
  {
    id: 'bullet',
    title: 'Пуля',
    time: '1 + 0',
    description: '1 минута',
    icon: '/images/icons/пуля.png',
    accentColor: '#5e5ce6',
  },
  {
    id: 'classic',
    title: 'Классика',
    time: '30 + 0',
    description: '30 минут',
    icon: '/images/icons/пешка.png',
    accentColor: '#30d158',
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

export default function GameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('blitz');
  const [activeTab, setActiveTab] = useState<'play' | 'tournament'>('play');

  const handlePlay = () => {
    navigate('/match-search');
  };

  const handlePlayWithAI = () => {
    navigate('/select-ai');
  };

  const selectedModeData = gameModes.find(m => m.id === selectedMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-28 md:pb-20"
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
          {/* Game Modes - 2x2 Grid with Hero Icons */}
          <div className="px-4 md:px-8 mb-8">
            <h6 className="!text-base text-gray-400 mb-4">Режим игры</h6>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {gameModes.map((mode, index) => {
                const isSelected = selectedMode === mode.id;

                return (
                  <motion.button
                    key={mode.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    onClick={() => setSelectedMode(mode.id)}
                    aria-label={`${mode.title} - ${mode.description}`}
                    aria-pressed={isSelected}
                    className={`glass-card aspect-square p-1.5 md:p-6 text-center transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 !border-opacity-100'
                        : 'border border-white/5 hover:border-white/10'
                    }`}
                    style={{
                      borderColor: isSelected ? mode.accentColor : undefined,
                      boxShadow: isSelected
                        ? `0 4px 24px ${mode.accentColor}40, 0 0 0 1px ${mode.accentColor}60`
                        : undefined,
                    }}
                  >
                    {/* Hero Icon - compact on mobile */}
                    <motion.div
                      animate={{
                        scale: isSelected ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="flex items-center justify-center h-[55%] md:flex-1"
                    >
                      <img
                        src={mode.icon}
                        alt=""
                        className="w-full h-full max-h-[80%] md:max-h-[60%] object-contain"
                        style={{
                          filter: isSelected
                            ? `drop-shadow(0 4px 16px ${mode.accentColor}80)`
                            : 'opacity: 0.6',
                          opacity: isSelected ? 1 : 0.6,
                        }}
                      />
                    </motion.div>

                    {/* Text below icon - fixed height on mobile */}
                    <div className="relative z-10 w-full h-[45%] md:h-auto flex flex-col justify-end">
                      <h6
                        className="!text-[10px] md:!text-lg font-bold truncate leading-tight mb-0.5"
                        style={{ color: isSelected ? mode.accentColor : 'white' }}
                      >
                        {mode.title}
                      </h6>
                      <p className="text-[11px] md:text-2xl font-semibold text-white truncate leading-tight">{mode.time}</p>
                      <p className="hidden md:block text-xs text-gray-400 truncate mt-1">{mode.description}</p>
                    </div>

                    {/* Energy glow when selected */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${mode.accentColor}20 0%, transparent 70%)`,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Opponent Selection - Separate section below grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-8 mb-6"
          >
            <h6 className="!text-base text-gray-400 mb-4">Выбор соперника</h6>
            <div className="space-y-3">
              <button
                onClick={handlePlay}
                className="glass-card p-6 w-full text-left hover:border-stake-red/30 transition-all relative overflow-hidden"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 opacity-35 pointer-events-none"
                />
              </button>
              <button
                onClick={handlePlayWithAI}
                className="glass-card p-6 w-full text-left hover:border-stake-red/30 transition-all relative overflow-hidden"
                aria-label="Играть против AI моделей шахматистов"
              >
                {/* 3D Icon Anchor - behind text */}
                <img
                  src="/images/icons/играй с ии.png"
                  alt=""
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 opacity-35 pointer-events-none z-0"
                />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="flex-1">
                    <h6 className="!text-base mb-1">Играть с AI</h6>
                    <p className="text-body-sm text-gray-400">Тренировочный режим</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
              </button>
            </div>
          </motion.div>

          {/* Play Button - Main CTA with volumetric design */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-8 mb-8"
          >
            <motion.button
              onClick={handlePlay}
              disabled={!selectedMode}
              animate={{
                boxShadow: selectedMode && selectedModeData
                  ? [
                      `0 8px 24px ${selectedModeData.accentColor}40`,
                      `0 12px 32px ${selectedModeData.accentColor}60`,
                      `0 8px 24px ${selectedModeData.accentColor}40`,
                    ]
                  : 'none',
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className={`w-full py-5 rounded-2xl font-bold text-lg transition-all relative overflow-hidden ${
                selectedMode
                  ? 'bg-gradient-to-b from-stake-red to-stake-red-dark text-white hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
              }`}
              style={{
                boxShadow: selectedMode
                  ? `0 1px 0 inset rgba(255, 255, 255, 0.2), 0 8px 24px ${selectedModeData?.accentColor}40`
                  : undefined,
              }}
              aria-label="Начать игру с выбранными настройками"
            >
              {selectedMode ? 'Начать игру' : 'Выберите режим игры'}
            </motion.button>
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
              className="glass-card p-8 relative overflow-hidden hover-lift cursor-pointer"
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
