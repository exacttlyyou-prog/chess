import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Eye } from 'lucide-react';
import { useState } from 'react';

interface Move {
  id: number;
  notation: string;
  piece: string;
  from: string;
  to: string;
  captured?: string;
  check?: boolean;
  checkmate?: boolean;
  timestamp: number;
}

interface MoveHistoryVisualizationProps {
  moves: Move[];
  currentMoveIndex?: number;
  onMoveSelect?: (index: number) => void;
  onResetToStart?: () => void;
  showTrails?: boolean;
}

export default function MoveHistoryVisualization({
  moves,
  currentMoveIndex = moves.length - 1,
  onMoveSelect,
  onResetToStart,
  showTrails = true,
}: MoveHistoryVisualizationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredMove, setHoveredMove] = useState<number | null>(null);

  // Group moves by pairs (white, black)
  const movePairs: Array<[Move, Move?]> = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push([moves[i], moves[i + 1]]);
  }

  const handlePreviousMove = () => {
    if (currentMoveIndex > 0) {
      onMoveSelect?.(currentMoveIndex - 1);
    }
  };

  const handleNextMove = () => {
    if (currentMoveIndex < moves.length - 1) {
      onMoveSelect?.(currentMoveIndex + 1);
    }
  };

  return (
    <div className="glass-card overflow-hidden relative">
      {/* Knight Trails Background */}
      {showTrails && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <motion.img
            animate={{
              x: [-50, 50, -50],
              y: [-30, 30, -30],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src="/images/pieces/knight-trails.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-stake-black/90 via-stake-black/80 to-stake-black/90" />
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stake-red/20 to-orange-500/20 flex items-center justify-center">
            <Eye className="w-5 h-5 text-stake-red" />
          </div>
          <div>
            <h3 className="!text-lg">История ходов</h3>
            <p className="text-xs text-gray-400">
              Ход {currentMoveIndex + 1} из {moves.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResetToStart}
            className="p-2 rounded-lg bg-stake-gray/50 hover:bg-stake-gray transition-colors"
            title="Вернуться к началу"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>

          {/* Expand/Collapse */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 rounded-lg bg-stake-red/20 hover:bg-stake-red/30 transition-colors text-sm"
          >
            {isExpanded ? 'Свернуть' : 'Развернуть'}
          </motion.button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="relative z-10 p-4 border-b border-white/10 flex items-center justify-between bg-stake-black-light/50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePreviousMove}
          disabled={currentMoveIndex === 0}
          className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${
            currentMoveIndex === 0
              ? 'bg-stake-gray/30 text-gray-600 cursor-not-allowed'
              : 'bg-stake-gray/50 hover:bg-stake-gray'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Назад</span>
        </motion.button>

        {/* Progress Bar */}
        <div className="flex-1 mx-4">
          <div className="h-2 bg-stake-gray rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentMoveIndex + 1) / moves.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-stake-red to-orange-500 relative"
            >
              {/* Shimmer Effect */}
              <motion.div
                animate={{ x: [-50, 200] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ width: '50px' }}
              />
            </motion.div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextMove}
          disabled={currentMoveIndex === moves.length - 1}
          className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${
            currentMoveIndex === moves.length - 1
              ? 'bg-stake-gray/30 text-gray-600 cursor-not-allowed'
              : 'bg-stake-gray/50 hover:bg-stake-gray'
          }`}
        >
          <span className="text-sm">Вперед</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Move List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isExpanded ? 'expanded' : 'collapsed'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`relative z-10 overflow-y-auto transition-all ${
            isExpanded ? 'max-h-96' : 'max-h-48'
          }`}
        >
          <div className="p-4 space-y-2">
            {movePairs.map((pair, pairIndex) => {
              const [whiteMove, blackMove] = pair;
              const whiteMoveIndex = pairIndex * 2;
              const blackMoveIndex = whiteMoveIndex + 1;

              return (
                <div
                  key={pairIndex}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  {/* Move Number */}
                  <div className="col-span-2 text-center">
                    <span className="text-xs text-gray-500 font-mono">
                      {pairIndex + 1}.
                    </span>
                  </div>

                  {/* White Move */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onMoveSelect?.(whiteMoveIndex)}
                    onMouseEnter={() => setHoveredMove(whiteMoveIndex)}
                    onMouseLeave={() => setHoveredMove(null)}
                    className={`col-span-5 px-3 py-2 rounded-lg text-left transition-all relative overflow-hidden ${
                      currentMoveIndex === whiteMoveIndex
                        ? 'bg-stake-red/20 border border-stake-red/50 text-white'
                        : hoveredMove === whiteMoveIndex
                        ? 'bg-white/10'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {currentMoveIndex === whiteMoveIndex && (
                      <motion.div
                        layoutId="currentMove"
                        className="absolute inset-0 bg-gradient-to-r from-stake-red/30 to-orange-500/30 rounded-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-mono text-sm">{whiteMove.notation}</span>
                      {whiteMove.captured && (
                        <span className="text-xs text-orange-400">×</span>
                      )}
                      {whiteMove.check && (
                        <span className="text-xs text-yellow-400">+</span>
                      )}
                      {whiteMove.checkmate && (
                        <span className="text-xs text-red-400">#</span>
                      )}
                    </div>
                  </motion.button>

                  {/* Black Move */}
                  {blackMove ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onMoveSelect?.(blackMoveIndex)}
                      onMouseEnter={() => setHoveredMove(blackMoveIndex)}
                      onMouseLeave={() => setHoveredMove(null)}
                      className={`col-span-5 px-3 py-2 rounded-lg text-left transition-all relative overflow-hidden ${
                        currentMoveIndex === blackMoveIndex
                          ? 'bg-stake-red/20 border border-stake-red/50 text-white'
                          : hoveredMove === blackMoveIndex
                          ? 'bg-white/10'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {currentMoveIndex === blackMoveIndex && (
                        <motion.div
                          layoutId="currentMove"
                          className="absolute inset-0 bg-gradient-to-r from-stake-red/30 to-orange-500/30 rounded-lg"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="font-mono text-sm">{blackMove.notation}</span>
                        {blackMove.captured && (
                          <span className="text-xs text-orange-400">×</span>
                        )}
                        {blackMove.check && (
                          <span className="text-xs text-yellow-400">+</span>
                        )}
                        {blackMove.checkmate && (
                          <span className="text-xs text-red-400">#</span>
                        )}
                      </div>
                    </motion.button>
                  ) : (
                    <div className="col-span-5" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Trail Effect Particles */}
      {showTrails && hoveredMove !== null && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
              }}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-stake-red to-orange-500"
            />
          ))}
        </div>
      )}
    </div>
  );
}
