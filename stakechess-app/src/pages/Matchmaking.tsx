import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Users, Trophy, Check } from 'lucide-react';

const opponents = [
  { name: 'Мастер_1450', rating: 1450, avatar: '♔' },
  { name: 'Стратег_99', rating: 1420, avatar: '♕' },
  { name: 'Тактик_2000', rating: 1480, avatar: '♖' },
  { name: 'Гроссмейстер_89', rating: 1465, avatar: '♗' },
];

export default function Matchmaking() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'searching' | 'found'>('searching');
  const [matchedOpponent] = useState(opponents[Math.floor(Math.random() * opponents.length)]);

  useEffect(() => {
    // Searching stage - 3 seconds
    const searchTimer = setTimeout(() => {
      setStage('found');
    }, 3000);

    return () => clearTimeout(searchTimer);
  }, []);

  useEffect(() => {
    if (stage === 'found') {
      // Match found stage - 2 seconds, then navigate
      const foundTimer = setTimeout(() => {
        navigate('/play');
      }, 2000);

      return () => clearTimeout(foundTimer);
    }
  }, [stage, navigate]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {stage === 'searching' ? (
          <motion.div
            key="searching"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-center px-8 max-w-md"
          >
            {/* Animated Chess Pieces Circle */}
            <div className="relative w-48 h-48 mx-auto mb-12">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-stake-red/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Chess pieces orbiting */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.3,
                  }}
                >
                  <div
                    className="absolute w-12 h-12 bg-gradient-to-br from-stake-red/30 to-stake-red/10 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-xl border border-white/10"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) translateY(-70px) rotate(-${i * 60}deg)`,
                    }}
                  >
                    {['♔', '♕', '♖', '♗', '♘', '♙'][i]}
                  </div>
                </motion.div>
              ))}

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card p-6 rounded-3xl shadow-depth-lg">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Users className="w-12 h-12 text-stake-red" strokeWidth={2} />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Text */}
            <motion.h1
              className="!text-5xl mb-4"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Ищем соперника
            </motion.h1>
            <p className="text-body-lg text-gray-400">
              Подбираем достойного противника...
            </p>

            {/* Animated dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-stake-red"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="found"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
            className="text-center px-8 max-w-md"
          >
            {/* Success checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-500/30 to-green-600/10 rounded-full flex items-center justify-center relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
                className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse"
              />
              <Check className="w-16 h-16 text-green-400" strokeWidth={3} />
            </motion.div>

            {/* Text */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="!text-5xl mb-4 text-gradient"
            >
              Соперник найден!
            </motion.h1>

            {/* Opponent card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="glass-card p-8 shadow-depth-lg mb-6"
            >
              <div className="flex items-center justify-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-stake-red/30 to-stake-red/10 rounded-3xl flex items-center justify-center text-5xl">
                  {matchedOpponent.avatar}
                </div>
                <div className="text-left">
                  <h3 className="!text-2xl mb-2">{matchedOpponent.name}</h3>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-gray-400" />
                    <span className="text-body text-gray-400">
                      Рейтинг: <span className="font-bold text-white">{matchedOpponent.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-body text-gray-400"
            >
              Начинаем партию...
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.4, ease: 'easeInOut' }}
              className="mt-6 h-1 bg-gradient-to-r from-stake-red to-stake-red-dark rounded-full"
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
