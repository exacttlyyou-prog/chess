import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Handshake, Flag, Settings, ArrowLeft, Clock } from 'lucide-react';
import ChessBoard from '../components/ChessBoard';

interface Move {
  from: { row: number; col: number };
  to: { row: number; col: number };
  piece: string;
  notation: string;
  time: string;
}

export default function GamePlay() {
  const navigate = useNavigate();
  const [timeWhite, setTimeWhite] = useState(180); // 3 minutes in seconds
  const [timeBlack, setTimeBlack] = useState(180);
  const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white');
  const [showMenu, setShowMenu] = useState(false);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);

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

  const handleMove = (from: { row: number; col: number }, to: { row: number; col: number }) => {
    setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');

    // Add move to history (simplified notation)
    const move: Move = {
      from,
      to,
      piece: '',
      notation: `${String.fromCharCode(97 + from.col)}${8 - from.row}-${String.fromCharCode(97 + to.col)}${8 - to.row}`,
      time: `${Math.floor((currentTurn === 'white' ? timeWhite : timeBlack) / 60)}:${((currentTurn === 'white' ? timeWhite : timeBlack) % 60).toString().padStart(2, '0')}`
    };
    setMoveHistory([...moveHistory, move]);
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
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/backgrounds/board-depth.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 flex flex-1"
    >
      {/* Left Panel - Chess Board */}
      <div className="flex-1 flex flex-col p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 flex items-center gap-4"
        >
          <button
            onClick={() => navigate('/game-mode')}
            className="glass-button !px-4 !py-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-stake-red" />
            <span className="text-sm font-semibold">Блиц 3+2</span>
          </div>
        </motion.div>

        {/* Chess Board Component */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 flex items-center"
        >
          <div className="w-full">
            <ChessBoard
              onMove={handleMove}
              whiteTime={timeWhite}
              blackTime={timeBlack}
            />
          </div>
        </motion.div>

        {/* Game Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex gap-3"
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Settings className="w-5 h-5" />
            <span>Меню</span>
          </button>
          <button
            onClick={handleDraw}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Handshake className="w-5 h-5" />
            <span>Ничья</span>
          </button>
          <button
            onClick={handleResign}
            className="glass-button !bg-red-500/20 !border-red-500/30 flex-1 flex items-center justify-center gap-2 hover:!bg-red-500/30"
          >
            <Flag className="w-5 h-5" />
            <span>Сдаться</span>
          </button>
        </motion.div>
      </div>

      {/* Right Panel - Move History (Desktop) */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="hidden lg:block w-80 bg-gradient-to-b from-black/40 to-black/60 border-l border-white/10 p-6"
      >
        <h3 className="text-xl font-bold mb-6 tracking-tight">История ходов</h3>

        <div className="glass-card p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Ход</span>
            <span className="text-sm text-gray-400">Время</span>
          </div>
        </div>

        <div className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
          {moveHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">Ходов пока нет</p>
            </div>
          ) : (
            moveHistory.map((move, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-3 flex items-center justify-between hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500 w-8">
                    {Math.floor(index / 2) + 1}.
                  </span>
                  <span className="font-semibold">{move.notation}</span>
                </div>
                <span className="text-xs font-mono text-gray-400">{move.time}</span>
              </motion.div>
            ))
          )}
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
            className="glass-card p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Меню игры</h3>
            <div className="space-y-3">
              <button className="btn-secondary w-full !py-4 text-left px-6">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span>Настройки доски</span>
                </div>
              </button>
              <button className="btn-secondary w-full !py-4 text-left px-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>История ходов</span>
                </div>
              </button>
              <button
                onClick={() => navigate('/home')}
                className="glass-button w-full !bg-red-500/20 !border-red-500/30 !py-4 text-left px-6 hover:!bg-red-500/30"
              >
                <div className="flex items-center gap-3">
                  <Flag className="w-5 h-5" />
                  <span>Выйти из игры</span>
                </div>
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="btn-primary w-full !py-4"
              >
                Продолжить
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
    </div>
  );
}
