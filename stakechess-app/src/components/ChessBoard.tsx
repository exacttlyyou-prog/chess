import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chess } from 'chess.js';
import ChessPiece from './ChessPiece';
import CaptureAnimation from './CaptureAnimation';
import CheckIndicator from './CheckIndicator';
import CheckmateModal from './CheckmateModal';
import { ParticleEffect } from './ParticleEffect';
import type { ChessSquare } from '../hooks/useChess';
import { useSound } from '../hooks/useSound';
import { useBoardSettings } from '../contexts/BoardSettingsContext';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type PieceColor = 'white' | 'black';

interface Piece {
  type: PieceType;
  color: PieceColor;
}

interface Square {
  piece: Piece | null;
  position: { row: number; col: number };
}

const fenToBoard = (fen: string): Square[][] => {
  const board: Square[][] = [];
  const rows = fen.split(' ')[0].split('/');

  for (let row = 0; row < 8; row++) {
    board[row] = [];
    let col = 0;
    for (const char of rows[row]) {
      if (isNaN(parseInt(char))) {
        const color: PieceColor = char === char.toUpperCase() ? 'white' : 'black';
        const pieceMap: Record<string, PieceType> = {
          'k': 'king', 'q': 'queen', 'r': 'rook',
          'b': 'bishop', 'n': 'knight', 'p': 'pawn'
        };
        const type = pieceMap[char.toLowerCase()];
        board[row][col] = { piece: { type, color }, position: { row, col } };
        col++;
      } else {
        const emptySquares = parseInt(char);
        for (let i = 0; i < emptySquares; i++) {
          board[row][col] = { piece: null, position: { row, col } };
          col++;
        }
      }
    }
  }

  return board;
};

const squareToRowCol = (square: ChessSquare): { row: number; col: number } => {
  const col = square.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
  const row = 8 - parseInt(square[1]); // '8' = 0, '7' = 1, etc.
  return { row, col };
};

const rowColToSquare = (row: number, col: number): ChessSquare => {
  const file = String.fromCharCode(97 + col);
  const rank = (8 - row).toString();
  return `${file}${rank}` as ChessSquare;
};

interface ChessBoardProps {
  game: Chess;
  position: string;
  onMove?: (from: ChessSquare, to: ChessSquare) => void;
  whiteTime: number;
  blackTime: number;
  isPlayerTurn: boolean;
}

export default function ChessBoard({ game, position, onMove, whiteTime, blackTime, isPlayerTurn }: ChessBoardProps) {
  const [board, setBoard] = useState<Square[][]>(fenToBoard(position));
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([]);
  const [lastMove, setLastMove] = useState<{ from: { row: number; col: number }; to: { row: number; col: number } } | null>(null);
  const [capturedPieces, setCapturedPieces] = useState<{ white: PieceType[]; black: PieceType[] }>({ white: [], black: [] });

  // Animation state for moving pieces
  const [animatingPiece, setAnimatingPiece] = useState<{
    piece: Piece;
    from: { row: number; col: number };
    to: { row: number; col: number };
  } | null>(null);

  // Hero moment states
  const [captureAnimations, setCaptureAnimations] = useState<Array<{ id: number; position: { x: number; y: number }; pieceColor: PieceColor }>>([]);
  const [kingInCheck, setKingInCheck] = useState<{ row: number; col: number } | null>(null);
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [checkmateWinner, setCheckmateWinner] = useState<PieceColor | null>(null);

  // Particle effects
  const [particleEffects, setParticleEffects] = useState<Array<{
    id: number;
    x: number;
    y: number;
    type: 'capture' | 'promote' | 'check';
    trigger: boolean;
  }>>([]);

  // Sound effects
  const { playSound } = useSound();

  // Board settings
  const { settings } = useBoardSettings();
  const boardTheme = settings.theme;

  // Drag and drop
  const {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    isDragging,
    isDragOver,
  } = useDragAndDrop();

  const currentTurn: PieceColor = game.turn() === 'w' ? 'white' : 'black';

  // Update board when position changes
  useEffect(() => {
    setBoard(fenToBoard(position));

    // Check for check
    if (game.inCheck()) {
      const turn = game.turn();
      const kingSquare = game.board().flat().find(sq => sq && sq.type === 'k' && sq.color === turn);
      if (kingSquare) {
        const kingPos = squareToRowCol(kingSquare.square as ChessSquare);
        setKingInCheck(kingPos);
      }
    } else {
      setKingInCheck(null);
    }

    // Check for checkmate
    if (game.isCheckmate()) {
      setIsCheckmate(true);
      setCheckmateWinner(game.turn() === 'w' ? 'black' : 'white');
    }
  }, [position, game]);

  const getValidMoves = (row: number, col: number): { row: number; col: number }[] => {
    const square = rowColToSquare(row, col);
    const moves = game.moves({ square, verbose: true });
    return moves.map(move => squareToRowCol(move.to as ChessSquare));
  };

  // Execute a move (used by both click and drag-and-drop)
  const executeMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const from = rowColToSquare(fromRow, fromCol);
    const to = rowColToSquare(toRow, toCol);

    // Get the piece being moved for animation
    const movingPiece = board[fromRow][fromCol].piece;

    // Get move info for sound detection
    const capturedPiece = board[toRow][toCol].piece;

    // Start piece animation
    if (movingPiece) {
      setAnimatingPiece({
        piece: movingPiece,
        from: { row: fromRow, col: fromCol },
        to: { row: toRow, col: toCol },
      });

      // Clear animation after it completes
      const animationDuration = settings.animationSpeed === 'instant' ? 0
        : settings.animationSpeed === 'fast' ? 150
        : settings.animationSpeed === 'normal' ? 300
        : 600;

      setTimeout(() => {
        setAnimatingPiece(null);
      }, animationDuration + 100);
    }

    // Make the move to check for special conditions
    const testGame = new Chess(game.fen());
    const moveResult = testGame.move({ from, to });

    // Play appropriate sound
    if (moveResult) {
      const boardRect = document.querySelector('.chess-board-grid')?.getBoundingClientRect();
      const squareSize = boardRect ? boardRect.width / 8 : 0;
      const particleX = boardRect ? boardRect.left + (toCol + 0.5) * squareSize : 0;
      const particleY = boardRect ? boardRect.top + (toRow + 0.5) * squareSize : 0;

      if (moveResult.flags.includes('k') || moveResult.flags.includes('q')) {
        // Castling
        playSound('castle');
      } else if (moveResult.flags.includes('p')) {
        // Promotion - add particle effect
        playSound('promote');
        if (boardRect && settings.particleIntensity !== 'off') {
          const effectId = Date.now();
          setParticleEffects(prev => [...prev, {
            id: effectId,
            x: particleX,
            y: particleY,
            type: 'promote',
            trigger: true,
          }]);
        }
      } else if (testGame.inCheck()) {
        // Check - add particle effect
        playSound('check');
        if (boardRect && settings.particleIntensity !== 'off') {
          const effectId = Date.now();
          setParticleEffects(prev => [...prev, {
            id: effectId,
            x: particleX,
            y: particleY,
            type: 'check',
            trigger: true,
          }]);
        }
      } else if (capturedPiece) {
        // Capture
        playSound('capture');
      } else {
        // Regular move
        playSound('move');
      }
    }

    // Check if capturing a piece
    if (capturedPiece) {
      // Trigger capture animation
      const boardRect = document.querySelector('.chess-board-grid')?.getBoundingClientRect();
      if (boardRect) {
        const squareSize = boardRect.width / 8;
        const animationId = Date.now();
        setCaptureAnimations(prev => [...prev, {
          id: animationId,
          position: {
            x: boardRect.left + (toCol + 0.5) * squareSize,
            y: boardRect.top + (toRow + 0.5) * squareSize,
          },
          pieceColor: capturedPiece.color,
        }]);

        // Add particle effect for capture
        if (settings.particleIntensity !== 'off') {
          const effectId = Date.now() + 1;
          setParticleEffects(prev => [...prev, {
            id: effectId,
            x: boardRect.left + (toCol + 0.5) * squareSize,
            y: boardRect.top + (toRow + 0.5) * squareSize,
            type: 'capture',
            trigger: true,
          }]);
        }
      }

      setCapturedPieces(prev => ({
        ...prev,
        [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece.type]
      }));
    }

    setLastMove({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol } });

    if (onMove) {
      onMove(from, to);
    }
  };

  const handleSquareClick = (row: number, col: number) => {
    if (!isPlayerTurn) return; // Prevent moves during AI turn

    if (selectedSquare) {
      // Check if clicked square is a valid move
      const isValidMoveClick = validMoves.some(move => move.row === row && move.col === col);

      if (isValidMoveClick) {
        executeMove(selectedSquare.row, selectedSquare.col, row, col);
      }

      setSelectedSquare(null);
      setValidMoves([]);
    } else {
      // Select a piece
      const piece = board[row][col].piece;
      if (piece && piece.color === currentTurn && isPlayerTurn) {
        setSelectedSquare({ row, col });
        setValidMoves(getValidMoves(row, col));
      }
    }
  };

  const handleSquareDrop = (e: React.DragEvent, row: number, col: number) => {
    if (!isPlayerTurn) return;

    const result = handleDrop(e, { row, col });
    if (!result) return;

    // Check if this is a valid move
    const piece = board[result.from.row][result.from.col].piece;
    if (!piece || piece.color !== currentTurn) return;

    const moves = getValidMoves(result.from.row, result.from.col);
    const isValid = moves.some(move => move.row === result.to.row && move.col === result.to.col);

    if (isValid) {
      executeMove(result.from.row, result.from.col, result.to.row, result.to.col);
    }
  };

  const isSquareSelected = (row: number, col: number) => {
    return selectedSquare?.row === row && selectedSquare?.col === col;
  };

  const isValidMove = (row: number, col: number) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  const isLastMove = (row: number, col: number) => {
    return (lastMove?.from.row === row && lastMove?.from.col === col) ||
           (lastMove?.to.row === row && lastMove?.to.col === col);
  };

  return (
    <div className="space-y-4">
      {/* Timer for black */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="font-semibold text-gray-300">Черные</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Captured white pieces */}
          <div className="flex items-center gap-2">
            {capturedPieces.white.map((pieceType, index) => (
              <motion.div
                key={`${pieceType}-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03, ease: [0.4, 0, 0.2, 1] }}
                className="w-6 h-6"
              >
                <ChessPiece type={pieceType} color="white" className="w-full h-full" />
              </motion.div>
            ))}
          </div>
          <div
            className={`text-2xl font-mono font-bold tabular-nums tracking-tight transition-all duration-300 ${
              currentTurn === 'black'
                ? blackTime < 10
                  ? 'text-red-500 animate-pulse'
                  : blackTime < 30
                  ? 'text-stake-red animate-[pulse_1.5s_ease-in-out_infinite]'
                  : 'text-stake-red'
                : 'text-gray-400'
            }`}
          >
            {Math.floor(blackTime / 60)}:{(blackTime % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Chess Board */}
      <div className="p-0 sm:p-2 lg:p-4">
        <div className="aspect-square w-[calc(100vw-32px)] max-w-full sm:max-w-xl mx-auto relative rounded-2xl overflow-hidden shadow-depth-md">
          {/* Board container with coordinates */}
          <div className="relative">
            {/* Rank labels (1-8) on the left - HIDDEN ON MOBILE */}
            {settings.showCoordinates && (
              <div className="hidden sm:flex absolute -left-6 top-0 bottom-0 flex-col justify-around text-xs text-gray-300 font-mono font-bold tracking-wider">
                {[8, 7, 6, 5, 4, 3, 2, 1].map((rank) => (
                  <div key={rank} className="h-[12.5%] flex items-center">
                    {rank}
                  </div>
                ))}
              </div>
            )}

            {/* File labels (a-h) on the bottom - HIDDEN ON MOBILE */}
            {settings.showCoordinates && (
              <div className="hidden sm:flex absolute -bottom-6 left-0 right-0 justify-around text-xs text-gray-300 font-mono font-bold tracking-wider">
                {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file) => (
                  <div key={file} className="w-[12.5%] flex justify-center">
                    {file}
                  </div>
                ))}
              </div>
            )}

            {/* Main board - transparent with grid lines */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset'
            }}>
              {/* Solid background layer - blocks pattern completely */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f14] to-[#0a0a0e] backdrop-blur-xl" style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.98) 0%, rgba(10, 10, 14, 0.98) 100%)'
              }} />

              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 800" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="800" height="800" fill="url(#grid)" />
              </svg>

              <div className="chess-board-grid grid grid-cols-8 gap-0 w-full h-full relative z-20">
                {board.map((row, rowIndex) =>
                  row.map((square, colIndex) => {
                    const isDark = (rowIndex + colIndex) % 2 === 1;
                    const piece = square.piece;
                    const selected = isSquareSelected(rowIndex, colIndex);
                    const validMove = isValidMove(rowIndex, colIndex);
                    const highlight = isLastMove(rowIndex, colIndex);

                    return (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                        onDragOver={(e) => handleDragOver(e, { row: rowIndex, col: colIndex })}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleSquareDrop(e, rowIndex, colIndex)}
                        className="relative aspect-square flex items-center justify-center transition-all ease-out"
                        style={{
                          backgroundColor: selected
                            ? boardTheme.colors.selected
                            : validMove && settings.showLegalMoves
                            ? boardTheme.colors.highlight
                            : highlight && settings.highlightLastMove
                            ? boardTheme.colors.lastMove
                            : isDragOver({ row: rowIndex, col: colIndex })
                            ? boardTheme.colors.highlight
                            : isDark
                            ? boardTheme.colors.dark
                            : boardTheme.colors.light,
                          transitionDuration: settings.animationSpeed === 'instant' ? '0ms'
                            : settings.animationSpeed === 'fast' ? '150ms'
                            : settings.animationSpeed === 'normal' ? '300ms'
                            : '600ms',
                          boxShadow: selected ? `inset 0 0 24px ${boardTheme.colors.selected}` : undefined,
                          willChange: 'background-color',
                        }}
                      >
                      {validMove && !piece && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.9 }}
                          className="w-4 h-4 rounded-full bg-stake-red shadow-lg shadow-stake-red/50"
                        />
                      )}
                      {validMove && piece && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8 }}
                          className="absolute inset-0 border-4 border-stake-red rounded-full m-1 shadow-lg shadow-stake-red/40"
                        />
                      )}
                      {piece && (
                        <div
                          className="w-full h-full p-2 relative"
                          draggable={piece.color === currentTurn && isPlayerTurn}
                          onDragStart={(e) => piece.color === currentTurn && isPlayerTurn && handleDragStart(e, { row: rowIndex, col: colIndex })}
                          onDragEnd={handleDragEnd}
                        >
                          <ChessPiece
                            type={piece.type}
                            color={piece.color}
                            className={`w-full h-full select-none cursor-${piece.color === currentTurn && isPlayerTurn ? 'grab' : 'default'} relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] ${
                              animatingPiece &&
                              animatingPiece.from.row === rowIndex &&
                              animatingPiece.from.col === colIndex
                                ? 'opacity-0'
                                : ''
                            } ${
                              isDragging({ row: rowIndex, col: colIndex })
                                ? 'opacity-40'
                                : ''
                            }`}
                          />
                        </div>
                      )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Animating piece overlay */}
              {animatingPiece && (
                <motion.div
                  className="absolute pointer-events-none z-50"
                  initial={{
                    left: `${(animatingPiece.from.col / 8) * 100}%`,
                    top: `${(animatingPiece.from.row / 8) * 100}%`,
                  }}
                  animate={{
                    left: `${(animatingPiece.to.col / 8) * 100}%`,
                    top: `${(animatingPiece.to.row / 8) * 100}%`,
                  }}
                  transition={{
                    duration: settings.animationSpeed === 'instant' ? 0
                      : settings.animationSpeed === 'fast' ? 0.15
                      : settings.animationSpeed === 'normal' ? 0.3
                      : 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    width: `${100 / 8}%`,
                    height: `${100 / 8}%`,
                  }}
                >
                  <div className="w-full h-full p-2 relative">
                    <ChessPiece
                      type={animatingPiece.piece.type}
                      color={animatingPiece.piece.color}
                      className="w-full h-full select-none drop-shadow-2xl"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timer for white */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-white" />
          <span className="font-semibold">Белые</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Captured black pieces */}
          <div className="flex items-center gap-2">
            {capturedPieces.black.map((pieceType, index) => (
              <motion.div
                key={`${pieceType}-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03, ease: [0.4, 0, 0.2, 1] }}
                className="w-6 h-6"
              >
                <ChessPiece type={pieceType} color="black" className="w-full h-full" />
              </motion.div>
            ))}
          </div>
          <div
            className={`text-2xl font-mono font-bold tabular-nums tracking-tight transition-all duration-300 ${
              currentTurn === 'white'
                ? whiteTime < 10
                  ? 'text-red-500 animate-pulse'
                  : whiteTime < 30
                  ? 'text-stake-red animate-[pulse_1.5s_ease-in-out_infinite]'
                  : 'text-stake-red'
                : 'text-gray-400'
            }`}
          >
            {Math.floor(whiteTime / 60)}:{(whiteTime % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Capture animations */}
      {captureAnimations.map(animation => (
        <CaptureAnimation
          key={animation.id}
          position={animation.position}
          pieceColor={animation.pieceColor}
          onComplete={() => {
            setCaptureAnimations(prev => prev.filter(a => a.id !== animation.id));
          }}
        />
      ))}

      {/* Particle effects */}
      {particleEffects.map(effect => (
        <ParticleEffect
          key={effect.id}
          trigger={effect.trigger}
          x={effect.x}
          y={effect.y}
          type={effect.type}
          onComplete={() => {
            setParticleEffects(prev => prev.filter(e => e.id !== effect.id));
          }}
        />
      ))}

      {/* Check indicator */}
      {kingInCheck && (
        <CheckIndicator position={kingInCheck} />
      )}

      {/* Checkmate modal */}
      <CheckmateModal
        isOpen={isCheckmate}
        winner={checkmateWinner}
        isPlayerWinner={checkmateWinner === 'white'}
        ratingChange={checkmateWinner === 'white' ? 15 : -15}
        onClose={() => {
          setIsCheckmate(false);
          setCheckmateWinner(null);
        }}
        onRematch={() => {
          game.reset();
          setBoard(fenToBoard(game.fen()));
          setIsCheckmate(false);
          setCheckmateWinner(null);
          setCapturedPieces({ white: [], black: [] });
          setLastMove(null);
        }}
      />
    </div>
  );
}
