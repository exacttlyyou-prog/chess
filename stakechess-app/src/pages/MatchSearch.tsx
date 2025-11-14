import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Swords, Check } from 'lucide-react';
import { generateOpponentAvatar, svgToDataUrl } from '../utils/avatarGenerator';

export default function MatchSearch() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'searching' | 'found' | 'ready'>('searching');
  const [progress, setProgress] = useState(0);

  // Generate opponent data
  const opponent = useMemo(() => {
    const rating = 1400 + Math.floor(Math.random() * 200);
    const { name, avatar } = generateOpponentAvatar(rating);
    return {
      name,
      rating,
      avatar: svgToDataUrl(avatar),
    };
  }, []);

  // Search animation (3 seconds)
  useEffect(() => {
    if (stage === 'searching') {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => setStage('found'), 200);
            return 100;
          }
          return prev + 2;
        });
      }, 60); // 3000ms / 50 steps = 60ms per step

      return () => clearInterval(progressInterval);
    }
  }, [stage]);

  // Auto-transition to ready after match found
  useEffect(() => {
    if (stage === 'found') {
      const timer = setTimeout(() => {
        setStage('ready');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleCancel = () => {
    navigate('/game-mode');
  };

  const handleStart = () => {
    navigate('/play');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        {stage === 'searching' && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="glass-card p-12 text-center shadow-depth-lg relative overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-4 border-stake-red/30 rounded-3xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Search Icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 mx-auto mb-6 relative z-10"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-stake-red/30 to-stake-red/10 flex items-center justify-center">
                  <Swords className="w-12 h-12 text-stake-red" />
                </div>
              </motion.div>

              <h2 className="!text-3xl mb-4 relative z-10">Поиск соперника</h2>
              <p className="text-gray-400 mb-8 relative z-10">Подбираем достойного противника...</p>

              {/* Progress Bar */}
              <div className="mb-8 relative z-10">
                <div className="w-full bg-stake-gray rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-stake-red to-stake-red-light h-3 rounded-full shadow-[0_0_16px_rgba(239,49,36,0.6)]"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">{Math.round(progress)}%</p>
              </div>

              <button onClick={handleCancel} className="btn-secondary relative z-10">
                Отменить поиск
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'found' && (
          <motion.div
            key="found"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="w-full max-w-md"
          >
            <div className="glass-card p-12 text-center shadow-depth-lg relative overflow-hidden">
              {/* Success Burst */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-stake-red/20 rounded-3xl"
              />

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-6 relative z-10"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center border-4 border-green-500/50 shadow-[0_0_32px_rgba(34,197,94,0.4)]">
                  <Check className="w-12 h-12 text-green-400" strokeWidth={3} />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="!text-3xl mb-2 relative z-10"
              >
                Соперник найден!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-green-400 font-semibold relative z-10"
              >
                Подготовка к матчу...
              </motion.p>
            </div>
          </motion.div>
        )}

        {stage === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="glass-card p-8 shadow-depth-lg">
              <h3 className="!text-2xl mb-6 text-center">Ваш соперник</h3>

              {/* Opponent Card */}
              <div className="glass-card p-8 mb-6 relative overflow-hidden">
                {/* Background */}
                <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10 pointer-events-none">
                  <img
                    src={opponent.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-stake-red/50 mx-auto mb-4 shadow-[0_0_20px_rgba(239,49,36,0.3)]">
                    <img
                      src={opponent.avatar}
                      alt={opponent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="!text-xl mb-2">{opponent.name}</h4>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-400">Рейтинг:</span>
                    <span className="text-xl font-bold text-gradient">{opponent.rating}</span>
                  </div>
                </div>
              </div>

              {/* VS Divider */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-stake-red/50" />
                <div className="bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-3 rounded-xl">
                  <Swords className="w-6 h-6 text-stake-red" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-stake-red/50" />
              </div>

              {/* Your Info */}
              <div className="glass p-6 rounded-2xl mb-8 text-center">
                <div className="flex items-center justify-center gap-3">
                  <User className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-semibold">Вы</p>
                    <p className="text-sm text-gray-400">Рейтинг: 1450</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button onClick={handleStart} className="btn-primary w-full">
                  Начать игру
                </button>
                <button onClick={handleCancel} className="btn-secondary w-full">
                  Отменить
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
