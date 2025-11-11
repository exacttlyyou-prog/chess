import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const gameModes = [
  {
    id: 'blitz',
    title: 'Блиц',
    time: '3 + 2',
    description: '3 минуты на партию + 2 сек за ход',
    icon: '⚡',
  },
  {
    id: 'rapid',
    title: 'Рапид',
    time: '10 + 0',
    description: '10 минут на партию',
    icon: '🏃',
  },
  {
    id: 'bullet',
    title: 'Пуля',
    time: '1 + 0',
    description: '1 минута на партию',
    icon: '💨',
  },
  {
    id: 'classic',
    title: 'Классика',
    time: '30 + 0',
    description: '30 минут на партию',
    icon: '♟',
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
    navigate('/play');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 flex items-center gap-4"
      >
        <button
          onClick={() => navigate('/home')}
          className="glass-button !px-4 !py-3"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold">Выбор режима</h1>
      </motion.div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="glass rounded-xl p-1 flex gap-2">
          <button
            onClick={() => setActiveTab('play')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'play'
                ? 'bg-stake-red text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Играть
          </button>
          <button
            onClick={() => setActiveTab('tournament')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'tournament'
                ? 'bg-stake-red text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Турниры
          </button>
        </div>
      </div>

      {activeTab === 'play' ? (
        <>
          {/* Game Modes */}
          <div className="px-6 mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Режим игры</h3>
            <div className="grid grid-cols-2 gap-4">
              {gameModes.map((mode, index) => (
                <motion.button
                  key={mode.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`glass-card p-4 text-left transition-all ${
                    selectedMode === mode.id
                      ? 'border-stake-red bg-stake-red/10'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="text-3xl mb-2">{mode.icon}</div>
                  <h4 className="font-bold mb-1">{mode.title}</h4>
                  <p className="text-sm text-gray-400 mb-2">{mode.time}</p>
                  <p className="text-xs text-gray-500">{mode.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Opponent Selection */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Выбор соперника</h3>
            <div className="space-y-3">
              <button className="glass-card p-4 w-full text-left hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold mb-1">🎲 Случайный соперник</p>
                    <p className="text-sm text-gray-400">Рейтинг: 1400 - 1500</p>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
              </button>
              <button className="glass-card p-4 w-full text-left hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold mb-1">🤖 Играть с AI</p>
                    <p className="text-sm text-gray-400">Тренировочный режим</p>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Play Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-6"
          >
            <button onClick={handlePlay} className="btn-primary w-full">
              Начать игру
            </button>
          </motion.div>
        </>
      ) : (
        /* Tournaments */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 space-y-4"
        >
          {tournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{tournament.title}</h3>
                  <p className="text-sm text-gray-400">{tournament.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-stake-red font-bold text-lg">{tournament.ratingPoints}</p>
                  <p className="text-xs text-gray-500">за победу</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">Участники</p>
                  <p className="font-semibold">{tournament.players}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Формат</p>
                  <p className="font-semibold">{tournament.entry}</p>
                </div>
              </div>
              <button className="btn-primary w-full">
                Зарегистрироваться
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
