import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Activity, Wind, Clock, Shuffle, Bot, ArrowLeft, ArrowRight } from 'lucide-react';

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
    ratingPoints: '+50',
    players: '128/256',
    entry: 'Открытый',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Ежедневная арена',
    time: 'Идет сейчас',
    ratingPoints: '+25',
    players: '45/100',
    entry: 'Открытый',
    status: 'live',
  },
];

export default function GameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('blitz');
  const [activeTab, setActiveTab] = useState<'play' | 'tournament'>('play');

  const handlePlay = () => {
    navigate('/play');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern pb-20"
    >
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
        <div className="glass rounded-2xl p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('play')}
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
        <>
          {/* Game Modes */}
          <div className="px-8 mb-8">
            <h6 className="!text-base text-gray-400 mb-4">Режим игры</h6>
            <div className="grid grid-cols-2 gap-4">
              {gameModes.map((mode, index) => (
                <motion.button
                  key={mode.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05, type: 'spring' }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`glass-card p-6 text-left transition-all shadow-depth ${
                    selectedMode === mode.id
                      ? 'border-stake-red/50 bg-stake-red/10 shadow-red-glow'
                      : ''
                  }`}
                >
                  <div className={`bg-gradient-to-br ${
                    selectedMode === mode.id
                      ? 'from-stake-red/30 to-stake-red/10'
                      : 'from-stake-red/20 to-stake-red/5'
                  } w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                    <mode.Icon className="w-6 h-6 text-stake-red" strokeWidth={2} />
                  </div>
                  <h6 className="mb-1">{mode.title}</h6>
                  <p className="text-body-sm text-gray-400 mb-2 font-medium">{mode.time}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{mode.description}</p>
                </motion.button>
              ))}
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
              <button className="glass-card p-6 w-full text-left hover:bg-white/10 transition-all shadow-depth">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-3 rounded-xl">
                    <Shuffle className="w-6 h-6 text-stake-red" />
                  </div>
                  <div className="flex-1">
                    <h6 className="!text-base mb-1">Случайный соперник</h6>
                    <p className="text-body-sm text-gray-400">Рейтинг: 1400 - 1500</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
              </button>
              <button className="glass-card p-6 w-full text-left hover:bg-white/10 transition-all shadow-depth">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-3 rounded-xl">
                    <Bot className="w-6 h-6 text-stake-red" />
                  </div>
                  <div className="flex-1">
                    <h6 className="!text-base mb-1">Играть с AI</h6>
                    <p className="text-body-sm text-gray-400">Тренировочный режим</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
              </button>
            </div>
          </motion.div>

          {/* Play Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-8"
          >
            <button onClick={handlePlay} className="btn-primary w-full">
              Начать игру
            </button>
          </motion.div>
        </>
      ) : (
        /* Tournaments - Hero Cards */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-8 space-y-6"
        >
          {tournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              className="card-hero min-h-[280px] cursor-pointer hover:scale-[1.01] transition-transform duration-300"
              onClick={() => navigate('/play')}
            >
              {/* Hero background with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF1744] via-[#D50000] to-[#AA0000]" />

              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 chess-pattern" />

              {/* Content */}
              <div className="card-hero-content relative z-10">
                {/* Status badge */}
                <div className="mb-6">
                  {tournament.status === 'live' ? (
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-sm font-semibold text-white">В эфире</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <span className="text-sm font-semibold text-white/90">Скоро</span>
                    </div>
                  )}
                </div>

                {/* Title and time */}
                <div className="mb-6">
                  <h2 className="!text-4xl mb-2 text-white drop-shadow-lg">{tournament.title}</h2>
                  <p className="text-xl text-white/90 font-medium">{tournament.time}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                    <p className="text-sm text-white/70 mb-1">Награда</p>
                    <p className="text-2xl font-bold text-white">{tournament.ratingPoints}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                    <p className="text-sm text-white/70 mb-1">Игроки</p>
                    <p className="text-2xl font-bold text-white">{tournament.players}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                    <p className="text-sm text-white/70 mb-1">Вход</p>
                    <p className="text-lg font-bold text-white">{tournament.entry}</p>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-white text-[#FF1744] font-bold py-4 rounded-2xl hover:bg-white/95 transition-all duration-200 shadow-lg">
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
