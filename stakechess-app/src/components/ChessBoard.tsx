import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Chess } from 'chess.js';
import ChessPiece from './ChessPiece';
import CaptureAnimation from './CaptureAnimation';
import CheckIndicator from './CheckIndicator';
import CheckmateModal from './CheckmateModal';
import type { ChessSquare } from '../hooks/useChess';

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

  // Hero moment states
  const [captureAnimations, setCaptureAnimations] = useState<Array<{ id: number; position: { x: number; y: number }; pieceColor: PieceColor }>>([]);
  const [kingInCheck, setKingInCheck] = useState<{ row: number; col: number } | null>(null);
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [checkmateWinner, setCheckmateWinner] = useState<PieceColor | null>(null);

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

  const handleSquareClick = (row: number, col: number) => {
    if (!isPlayerTurn) return; // Prevent moves during AI turn

    if (selectedSquare) {
      // Check if clicked square is a valid move
      const isValidMoveClick = validMoves.some(move => move.row === row && move.col === col);

      if (isValidMoveClick) {
        const from = rowColToSquare(selectedSquare.row, selectedSquare.col);
        const to = rowColToSquare(row, col);

        // Check if capturing a piece
        const capturedPiece = board[row][col].piece;
        if (capturedPiece) {
          // Trigger capture animation
          const boardRect = document.querySelector('.chess-board-grid')?.getBoundingClientRect();
          if (boardRect) {
            const squareSize = boardRect.width / 8;
            const animationId = Date.now();
            setCaptureAnimations(prev => [...prev, {
              id: animationId,
              position: {
                x: boardRect.left + (col + 0.5) * squareSize,
                y: boardRect.top + (row + 0.5) * squareSize,
              },
              pieceColor: capturedPiece.color,
            }]);
          }

          setCapturedPieces(prev => ({
            ...prev,
            [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece.type]
          }));
        }

        setLastMove({ from: selectedSquare, to: { row, col } });

        if (onMove) {
          onMove(from, to);
        }
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
                  ? 'text-red-500 animate-pulse drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                  : blackTime < 30
                  ? 'text-stake-red animate-[pulse_1.5s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]'
                  : 'text-stake-red drop-shadow-[0_0_8px_rgba(255,23,68,0.4)]'
                : 'text-gray-400'
            }`}
          >
            {Math.floor(blackTime / 60)}:{(blackTime % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Chess Board */}
      <div className="glass-card p-4 sm:p-6">
        <div className="aspect-square max-w-xl mx-auto relative">
          {/* Board container with coordinates */}
          <div className="relative">
            {/* Rank labels (1-8) on the left */}
            <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-around text-xs text-gray-300 font-mono font-bold tracking-wider">
              {[8, 7, 6, 5, 4, 3, 2, 1].map((rank) => (
                <div key={rank} className="h-[12.5%] flex items-center">
                  {rank}
                </div>
              ))}
            </div>

            {/* File labels (a-h) on the bottom */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-around text-xs text-gray-300 font-mono font-bold tracking-wider">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file) => (
                <div key={file} className="w-[12.5%] flex justify-center">
                  {file}
                </div>
              ))}
            </div>

            {/* Main board - transparent with grid lines */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset'
            }}>
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 800" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="800" height="800" fill="url(#grid)" />
              </svg>

              <div className="chess-board-grid grid grid-cols-8 gap-0 w-full h-full">
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
                        className={`
                          relative aspect-square flex items-center justify-center
                          transition-all duration-300 ease-out
                          ${isDark ? 'bg-black/20' : 'bg-white/5'}
                          ${selected ? 'bg-stake-red/30 shadow-[inset_0_0_24px_rgba(255,23,68,0.4)] ring-2 ring-inset ring-stake-red/60' : ''}
                          ${validMove ? 'bg-stake-red/20' : ''}
                          ${highlight ? 'bg-yellow-500/20 shadow-[inset_0_0_16px_rgba(234,179,8,0.3)]' : ''}
                          hover:bg-white/10
                        `}
                        style={{ willChange: 'background-color' }}
                      >
                      {validMove && !piece && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.9, 1, 0.9]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="w-4 h-4 rounded-full bg-stake-red shadow-lg shadow-stake-red/50"
                        />
                      )}
                      {validMove && piece && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="absolute inset-0 border-4 border-stake-red rounded-full m-1 shadow-lg shadow-stake-red/40"
                        />
                      )}
                      {piece && (
                        <div className="w-full h-full p-2 relative">
                          <ChessPiece
                            type={piece.type}
                            color={piece.color}
                            className="w-full h-full select-none cursor-pointer relative z-10"
                          />
                        </div>
                      )}
                      </button>
                    );
                  })
                )}
              </div>
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
                  ? 'text-red-500 animate-pulse drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                  : whiteTime < 30
                  ? 'text-stake-red animate-[pulse_1.5s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]'
                  : 'text-stake-red drop-shadow-[0_0_8px_rgba(255,23,68,0.4)]'
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
