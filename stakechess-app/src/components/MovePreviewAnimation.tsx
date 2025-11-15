import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Target, TrendingUp } from 'lucide-react';

interface Square {
  x: number;
  y: number;
  type?: 'move' | 'capture' | 'castle' | 'enpassant';
  piece?: string;
}

interface MovePreviewAnimationProps {
  selectedSquare: Square | null;
  validMoves: Square[];
  onSquareClick?: (square: Square) => void;
  showMotionTrails?: boolean;
  showSuggestions?: boolean;
}

export default function MovePreviewAnimation({
  selectedSquare,
  validMoves,
  onSquareClick,
  showMotionTrails = true,
  showSuggestions = true,
}: MovePreviewAnimationProps) {
  const [hoveredMove, setHoveredMove] = useState<Square | null>(null);
  const [bestMove, setBestMove] = useState<Square | null>(null);

  useEffect(() => {
    // Simulate AI suggestion for best move
    if (validMoves.length > 0 && showSuggestions) {
      const timeout = setTimeout(() => {
        setBestMove(validMoves[Math.floor(Math.random() * validMoves.length)]);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [validMoves, showSuggestions]);

  const getMoveIcon = (moveType?: string) => {
    switch (moveType) {
      case 'capture':
        return <Target className="w-4 h-4" />;
      case 'castle':
        return <Zap className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Knight Motion Background */}
      {showMotionTrails && selectedSquare && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <img
            src="/images/pieces/knight-motion.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Valid Move Squares */}
      <AnimatePresence>
        {validMoves.map((move, index) => {
          const isBestMove = bestMove && bestMove.x === move.x && bestMove.y === move.y;
          const isHovered = hoveredMove && hoveredMove.x === move.x && hoveredMove.y === move.y;
          const isCapture = move.type === 'capture';

          return (
            <motion.div
              key={`${move.x}-${move.y}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                delay: index * 0.03,
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              style={{
                position: 'absolute',
                left: `${move.x}px`,
                top: `${move.y}px`,
                transformOrigin: 'center',
              }}
              className="pointer-events-auto"
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSquareClick?.(move)}
                onMouseEnter={() => setHoveredMove(move)}
                onMouseLeave={() => setHoveredMove(null)}
                className="relative"
              >
                {/* Main Circle/Ring */}
                {isCapture ? (
                  // Capture Ring
                  <div
                    className={`w-12 h-12 rounded-full border-4 ${
                      isBestMove
                        ? 'border-yellow-400 shadow-md'
                        : 'border-stake-red shadow-md'
                    } relative`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full ${
                        isBestMove ? 'bg-yellow-400/30' : 'bg-stake-red/30'
                      }`}
                    />
                  </div>
                ) : (
                  // Normal Move Circle
                  <motion.div
                    animate={{
                      scale: isHovered ? [1, 1.2, 1] : isBestMove ? [1, 1.15, 1] : 1,
                    }}
                    transition={{
                      duration: isBestMove ? 1.5 : 0.6,
                      repeat: isBestMove ? Infinity : isHovered ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                    className={`w-8 h-8 rounded-full ${
                      isBestMove
                        ? 'bg-yellow-400/40 border-2 border-yellow-400 shadow-md'
                        : 'bg-white/20 border-2 border-white/40'
                    }`}
                  />
                )}

                {/* Best Move Indicator */}
                {isBestMove && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 shadow-lg"
                  >
                    <TrendingUp className="w-3 h-3 text-stake-black" />
                  </motion.div>
                )}

                {/* Move Type Icon */}
                {move.type && getMoveIcon(move.type) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.03 }}
                    className="absolute inset-0 flex items-center justify-center text-white"
                  >
                    {getMoveIcon(move.type)}
                  </motion.div>
                )}
              </motion.button>

              {/* Connection Line from Selected Square */}
              {selectedSquare && showMotionTrails && (
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ delay: index * 0.03, duration: 0.5 }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `-${move.x - selectedSquare.x}px`,
                    top: `-${move.y - selectedSquare.y}px`,
                    width: `${Math.abs(move.x - selectedSquare.x)}px`,
                    height: `${Math.abs(move.y - selectedSquare.y)}px`,
                  }}
                >
                  <motion.line
                    x1={selectedSquare.x}
                    y1={selectedSquare.y}
                    x2={move.x}
                    y2={move.y}
                    stroke={isBestMove ? '#facc15' : '#ef3124'}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    animate={{
                      strokeDashoffset: [0, -10],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.svg>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* AI Suggestion Panel */}
      {showSuggestions && bestMove && validMoves.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 flex items-center gap-2 border border-yellow-500/30"
        >
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-xs text-yellow-400 font-semibold">
            AI рекомендует лучший ход
          </span>
          <TrendingUp className="w-4 h-4 text-yellow-400" />
        </motion.div>
      )}

      {/* Move Count Badge */}
      {validMoves.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-4 right-4 glass-card px-3 py-1 flex items-center gap-2"
        >
          <Target className="w-4 h-4 text-stake-red" />
          <span className="text-sm font-semibold">{validMoves.length} ходов</span>
        </motion.div>
      )}
    </div>
  );
}
