import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Zap, Clock, User, X } from 'lucide-react';

type MatchmakingState = 'searching' | 'found' | 'countdown';

interface OpponentData {
  name: string;
  rating: number;
  country: string;
  wins: number;
}

const mockOpponents: OpponentData[] = [
  { name: 'Мастер_1450', rating: 1450, country: '🇷🇺', wins: 234 },
  { name: 'TacticalKing', rating: 1480, country: '🇺🇸', wins: 189 },
  { name: 'BlitzMeister', rating: 1420, country: '🇩🇪', wins: 312 },
  { name: 'StrategPro', rating: 1465, country: '🇫🇷', wins: 267 },
];

export default function Matchmaking() {
  const navigate = useNavigate();
  const [state, setState] = useState<MatchmakingState>('searching');
  const [searchTime, setSearchTime] = useState(0);
  const [opponent, setOpponent] = useState<OpponentData | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Simulate matchmaking
    const searchDuration = 2000 + Math.random() * 2000; // 2-4 seconds

    const searchTimer = setTimeout(() => {
      const randomOpponent = mockOpponents[Math.floor(Math.random() * mockOpponents.length)];
      setOpponent(randomOpponent);
      setState('found');

      // Start countdown after showing opponent
      setTimeout(() => {
        setState('countdown');
      }, 1500);
    }, searchDuration);

    return () => clearTimeout(searchTimer);
  }, []);

  useEffect(() => {
    if (state === 'searching') {
      const timer = setInterval(() => {
        setSearchTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state]);

  useEffect(() => {
    if (state === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        navigate('/play');
      }
    }
  }, [state, countdown, navigate]);

  const handleCancel = () => {
    navigate('/game-mode');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black speed-lines-overlay overflow-hidden">
      {/* Background Image - Motion Blur for speed/excitement */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.2, scale: 1 }}
        className="absolute inset-0"
      >
        <img
          src="/images/перебивка1.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'blur(15px)' }}
        />
      </motion.div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-stake-red/20 via-transparent to-transparent"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        {/* Cancel Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleCancel}
          className="absolute top-8 right-8 glass-button !px-4 !py-3"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <AnimatePresence mode="wait">
          {state === 'searching' && (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              {/* Pulsing Search Icon */}
              <motion.div
                className="relative w-32 h-32 mx-auto mb-8"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute inset-0 rounded-full bg-stake-red/20 blur-2xl" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-stake-red/30 to-stake-red/10 flex items-center justify-center">
                  <Users className="w-16 h-16 text-stake-red" strokeWidth={1.5} />
                </div>
              </motion.div>

              <h2 className="!text-4xl mb-4">Поиск соперника</h2>
              <p className="text-body text-gray-400 mb-8">
                Подбираем достойного противника по вашему рейтингу
              </p>

              {/* Search Timer */}
              <div className="glass px-6 py-3 rounded-full inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-stake-red" />
                <span className="text-body-sm font-medium">{searchTime}s</span>
              </div>

              {/* Loading Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-stake-red"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {state === 'found' && opponent && (
            <motion.div
              key="found"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center max-w-md w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="mb-6"
              >
                <div className="glass px-6 py-2 rounded-full inline-flex items-center gap-2 bg-green-500/20 border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-semibold">Соперник найден!</span>
                </div>
              </motion.div>

              {/* Opponent Card */}
              <motion.div
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                className="glass-card p-8 shadow-depth-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-stake-red/30 to-stake-red/10 flex items-center justify-center mx-auto mb-6 border-4 border-stake-red/20">
                  <User className="w-12 h-12 text-stake-red" strokeWidth={1.5} />
                </div>

                {/* Name & Country */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl">{opponent.country}</span>
                    <h3 className="!text-3xl !font-bold !tracking-tight">{opponent.name}</h3>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass p-4 rounded-xl">
                    <p className="text-body-sm text-gray-400 mb-1">Рейтинг</p>
                    <p className="text-2xl font-bold text-gradient">{opponent.rating}</p>
                  </div>
                  <div className="glass p-4 rounded-xl">
                    <p className="text-body-sm text-gray-400 mb-1">Побед</p>
                    <p className="text-2xl font-bold text-white">{opponent.wins}</p>
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-body-sm text-gray-500 mt-6"
              >
                Приготовьтесь к битве...
              </motion.p>
            </motion.div>
          )}

          {state === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center flex items-center justify-center min-h-[300px]"
            >
              <motion.div
                key={countdown}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative flex items-center justify-center"
              >
                <div className="absolute inset-0 flex items-center justify-center blur-3xl pointer-events-none">
                  <div className="w-72 h-72 rounded-full bg-stake-red/40" />
                </div>
                <h1 className="relative text-[180px] font-bold text-gradient leading-none select-none">
                  {countdown}
                </h1>
              </motion.div>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xl text-gray-400 mt-8"
              >
                Игра начинается...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Indicator */}
        {state === 'searching' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12 left-0 right-0"
          >
            <div className="max-w-md mx-auto px-8">
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <Zap className="w-5 h-5 text-stake-red flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-body-sm font-semibold mb-1">Блиц 3+2</p>
                    <p className="text-xs text-gray-500">Рейтинг: 1400-1500</p>
                  </div>
                  <div className="glass px-3 py-1.5 rounded-lg">
                    <p className="text-xs font-semibold text-stake-red">1450</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-stake-red/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
