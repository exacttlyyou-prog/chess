import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Handshake, Flag, Settings } from 'lucide-react';

// Chess pieces unicode (for future use)
// const pieces = {
//   white: {
//     king: '♔',
//     queen: '♕',
//     rook: '♖',
//     bishop: '♗',
//     knight: '♘',
//     pawn: '♙',
//   },
//   black: {
//     king: '♚',
//     queen: '♛',
//     rook: '♜',
//     bishop: '♝',
//     knight: '♞',
//     pawn: '♟',
//   },
// };

// Initial board position
const initialBoard = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

export default function GamePlay() {
  const navigate = useNavigate();
  const [timeWhite, setTimeWhite] = useState(180); // 3 minutes in seconds
  const [timeBlack, setTimeBlack] = useState(180);
  const [currentTurn] = useState<'white' | 'black'>('white');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentTurn === 'white') {
        setTimeWhite((prev) => Math.max(0, prev - 1));
      } else {
        setTimeBlack((prev) => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResign = () => {
    if (window.confirm('Вы уверены, что хотите сдаться?')) {
      navigate('/home');
    }
  };

  const handleDraw = () => {
    if (window.confirm('Предложить ничью сопернику?')) {
      setShowMenu(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern flex flex-col">
      {/* Opponent Info */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4"
      >
        <div className="glass-card p-6 flex items-center justify-between shadow-depth">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stake-red/30 to-stake-red/10 flex items-center justify-center">
              <User className="w-6 h-6 text-stake-red" />
            </div>
            <div>
              <p className="font-semibold">Соперник</p>
              <p className="text-sm text-gray-400">Рейтинг: 1480</p>
            </div>
          </div>
          <div
            className={`text-right ${
              currentTurn === 'black' ? 'text-stake-red' : ''
            }`}
          >
            <p className="text-2xl font-bold font-mono">{formatTime(timeBlack)}</p>
          </div>
        </div>
      </motion.div>

      {/* Chess Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Board container with glassmorphism frame */}
          <div className="glass-card p-6 shadow-depth-lg">
            <div className="aspect-square grid grid-cols-8 gap-0 rounded-lg overflow-hidden shadow-2xl">
              {initialBoard.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                  const isLight = (rowIndex + colIndex) % 2 === 0;
                  return (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (rowIndex * 8 + colIndex) * 0.005 }}
                      className={`flex items-center justify-center text-4xl cursor-pointer transition-all hover:brightness-110 ${
                        isLight
                          ? 'bg-gray-300'
                          : 'bg-stake-gray-light'
                      }`}
                    >
                      {piece}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Captured Pieces */}
          <div className="mt-4 flex justify-between px-2">
            <div className="flex gap-1 text-xl opacity-70">
              {['♟', '♞', '♝'].map((p, i) => (
                <span key={i}>{p}</span>
              ))}
            </div>
            <div className="text-stake-red font-bold">+2</div>
          </div>
        </motion.div>
      </div>

      {/* Player Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4"
      >
        <div className="glass-card p-6 flex items-center justify-between shadow-depth">
          <div
            className={`text-left ${
              currentTurn === 'white' ? 'text-stake-red' : ''
            }`}
          >
            <p className="text-2xl font-bold font-mono">{formatTime(timeWhite)}</p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold text-right">Вы</p>
              <p className="text-sm text-gray-400 text-right">Рейтинг: 1450</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Game Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 pb-6"
      >
        <div className="flex gap-3">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span>Меню</span>
          </button>
          <button
            onClick={handleDraw}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Handshake className="w-4 h-4" />
            <span>Ничья</span>
          </button>
          <button
            onClick={handleResign}
            className="glass-button !bg-red-500/20 !border-red-500/30 flex-1 flex items-center justify-center gap-2"
          >
            <Flag className="w-4 h-4" />
            <span>Сдаться</span>
          </button>
        </div>
      </motion.div>

      {/* Menu Overlay */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={() => setShowMenu(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-card p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Меню игры</h3>
            <div className="space-y-3">
              <button className="btn-secondary w-full">
                Настройки доски
              </button>
              <button className="btn-secondary w-full">
                История ходов
              </button>
              <button className="btn-secondary w-full">
                Анализ позиции
              </button>
              <button
                onClick={() => navigate('/home')}
                className="glass-button w-full !bg-red-500/20 !border-red-500/30"
              >
                Выйти из игры
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="btn-secondary w-full"
              >
                Продолжить
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Game Mode Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 z-10"
      >
        <p className="text-sm text-gray-400 text-center">Блиц 3+2</p>
      </motion.div>
    </div>
  );
}
