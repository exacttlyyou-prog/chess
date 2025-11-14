import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';

interface MatchLoadingScreenProps {
  player1: { name: string; rating: number };
  player2: { name: string; rating: number };
}

export default function MatchLoadingScreen({ player1, player2 }: MatchLoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Knights Battle Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/pieces/knights-battle.png"
            alt=""
            className="w-full max-w-2xl h-auto object-contain"
          />
        </motion.div>

        {/* Players VS */}
        <div className="relative z-10 grid grid-cols-3 gap-8 items-center">
          {/* Player 1 */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-center"
          >
            <div className="glass-card p-8 shadow-depth-lg">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border-4 border-white/30">
                <img
                  src="/images/pieces/king-solo.png"
                  alt="White King"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="!text-xl mb-2">{player1.name}</h3>
              <div className="text-sm text-gray-400">
                Рейтинг: <span className="text-white font-bold">{player1.rating}</span>
              </div>
            </div>
          </motion.div>

          {/* VS Center */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              {/* Pulse Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                  className="absolute inset-0 border-4 border-stake-red rounded-full"
                />
              ))}

              {/* VS Badge */}
              <div className="relative bg-gradient-to-br from-stake-red/30 to-stake-red/10 p-8 rounded-full border-4 border-stake-red/50 shadow-[0_0_40px_rgba(255,23,68,0.4)]">
                <Swords className="w-16 h-16 text-stake-red" strokeWidth={2.5} />
              </div>
            </div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-6"
            >
              <h2 className="text-4xl font-bold text-gradient">VS</h2>
            </motion.div>
          </motion.div>

          {/* Player 2 */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-center"
          >
            <div className="glass-card p-8 shadow-depth-lg">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-stake-black-light to-black flex items-center justify-center border-4 border-gray-700">
                <img
                  src="/images/pieces/king-solo.png"
                  alt="Black King"
                  className="w-16 h-16 object-contain filter brightness-50"
                />
              </div>
              <h3 className="!text-xl mb-2">{player2.name}</h3>
              <div className="text-sm text-gray-400">
                Рейтинг: <span className="text-white font-bold">{player2.rating}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <span>Загрузка партии</span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-2 bg-stake-gray rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-stake-red to-orange-500 shadow-[0_0_16px_rgba(255,23,68,0.6)]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
