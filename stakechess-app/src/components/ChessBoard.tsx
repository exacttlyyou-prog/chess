import { useState } from 'react';
import { motion } from 'framer-motion';
import ChessPiece from './ChessPiece';

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

const createInitialBoard = (): Square[][] => {
  const board: Square[][] = [];

  // Initialize empty board
  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      board[row][col] = {
        piece: null,
        position: { row, col },
      };
    }
  }

  // Set up black pieces (top)
  const blackPieces: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  blackPieces.forEach((type, col) => {
    board[0][col].piece = { type, color: 'black' };
  });
  for (let col = 0; col < 8; col++) {
    board[1][col].piece = { type: 'pawn', color: 'black' };
  }

  // Set up white pieces (bottom)
  const whitePieces: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  whitePieces.forEach((type, col) => {
    board[7][col].piece = { type, color: 'white' };
  });
  for (let col = 0; col < 8; col++) {
    board[6][col].piece = { type: 'pawn', color: 'white' };
  }

  return board;
};

interface ChessBoardProps {
  onMove?: (from: { row: number; col: number }, to: { row: number; col: number }) => void;
  whiteTime: number;
  blackTime: number;
}

export default function ChessBoard({ onMove, whiteTime, blackTime }: ChessBoardProps) {
  const [board, setBoard] = useState<Square[][]>(createInitialBoard());
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([]);
  const [currentTurn, setCurrentTurn] = useState<PieceColor>('white');
  const [lastMove, setLastMove] = useState<{ from: { row: number; col: number }; to: { row: number; col: number } } | null>(null);
  const [capturedPieces, setCapturedPieces] = useState<{ white: PieceType[]; black: PieceType[] }>({ white: [], black: [] });

  const getValidMoves = (row: number, col: number): { row: number; col: number }[] => {
    const piece = board[row][col].piece;
    if (!piece || piece.color !== currentTurn) return [];

    const moves: { row: number; col: number }[] = [];

    // Simplified move validation (just basic moves, not checking for check/checkmate)
    switch (piece.type) {
      case 'pawn': {
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;

        // Forward move
        if (!board[row + direction]?.[col]?.piece) {
          moves.push({ row: row + direction, col });
          // Double move from start
          if (row === startRow && !board[row + 2 * direction]?.[col]?.piece) {
            moves.push({ row: row + 2 * direction, col });
          }
        }

        // Captures
        [-1, 1].forEach(offset => {
          const targetPiece = board[row + direction]?.[col + offset]?.piece;
          if (targetPiece && targetPiece.color !== piece.color) {
            moves.push({ row: row + direction, col: col + offset });
          }
        });
        break;
      }
      case 'rook': {
        // Horizontal and vertical moves
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        directions.forEach(([dRow, dCol]) => {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dRow * i;
            const newCol = col + dCol * i;
            if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) break;
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        });
        break;
      }
      case 'knight': {
        const knightMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        knightMoves.forEach(([dRow, dCol]) => {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece || targetPiece.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
        break;
      }
      case 'bishop': {
        const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        directions.forEach(([dRow, dCol]) => {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dRow * i;
            const newCol = col + dCol * i;
            if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) break;
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        });
        break;
      }
      case 'queen': {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
        directions.forEach(([dRow, dCol]) => {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dRow * i;
            const newCol = col + dCol * i;
            if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) break;
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        });
        break;
      }
      case 'king': {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
        directions.forEach(([dRow, dCol]) => {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
            const targetPiece = board[newRow][newCol].piece;
            if (!targetPiece || targetPiece.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
        break;
      }
    }

    return moves;
  };

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      // Check if clicked square is a valid move
      const isValidMove = validMoves.some(move => move.row === row && move.col === col);

      if (isValidMove) {
        // Make the move
        const newBoard = board.map(r => r.map(sq => ({ ...sq, piece: sq.piece ? { ...sq.piece } : null })));

        // Check if capturing a piece
        const capturedPiece = newBoard[row][col].piece;
        if (capturedPiece) {
          setCapturedPieces(prev => ({
            ...prev,
            [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece.type]
          }));
        }

        newBoard[row][col].piece = newBoard[selectedSquare.row][selectedSquare.col].piece;
        newBoard[selectedSquare.row][selectedSquare.col].piece = null;

        setBoard(newBoard);
        setLastMove({ from: selectedSquare, to: { row, col } });
        setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');

        if (onMove) {
          onMove(selectedSquare, { row, col });
        }
      }

      setSelectedSquare(null);
      setValidMoves([]);
    } else {
      // Select a piece
      const piece = board[row][col].piece;
      if (piece && piece.color === currentTurn) {
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
          <div className="flex items-center gap-1.5">
            {capturedPieces.white.map((pieceType, index) => (
              <motion.div
                key={`${pieceType}-${index}`}
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                className="w-7 h-7 drop-shadow-md"
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
            <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-around text-xs text-gray-400 font-mono font-semibold tracking-wide">
              {[8, 7, 6, 5, 4, 3, 2, 1].map((rank) => (
                <div key={rank} className="h-[12.5%] flex items-center">
                  {rank}
                </div>
              ))}
            </div>

            {/* File labels (a-h) on the bottom */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-around text-xs text-gray-400 font-mono font-semibold tracking-wide">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file) => (
                <div key={file} className="w-[12.5%] flex justify-center">
                  {file}
                </div>
              ))}
            </div>

            {/* Main board */}
            <div className="grid grid-cols-8 gap-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4),0_16px_64px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] border border-white/15">
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
                        relative aspect-square flex items-center justify-center text-4xl sm:text-5xl
                        transition-all duration-200
                        ${isDark
                          ? 'bg-gradient-to-br from-stone-700/30 to-stone-800/40'
                          : 'bg-gradient-to-br from-stone-100/25 to-white/15'}
                        ${selected ? 'ring-4 ring-stake-red ring-inset shadow-[inset_0_0_32px_rgba(255,23,68,0.5)] animate-pulse' : ''}
                        ${validMove ? 'bg-gradient-to-br from-stake-red/45 to-stake-red/25' : ''}
                        ${highlight ? 'bg-gradient-to-br from-yellow-500/35 to-yellow-600/25 shadow-[inset_0_0_28px_rgba(234,179,8,0.5)] animate-[pulse_2s_ease-in-out_infinite]' : ''}
                        hover:brightness-115 hover:shadow-[0_0_8px_rgba(255,255,255,0.1)]
                        active:brightness-105
                      `}
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
                        <div className="w-full h-full p-2 relative group">
                          <ChessPiece
                            type={piece.type}
                            color={piece.color}
                            className="w-full h-full select-none cursor-pointer relative z-10 transition-all duration-200 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
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

      {/* Timer for white */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-white" />
          <span className="font-semibold">Белые</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Captured black pieces */}
          <div className="flex items-center gap-1.5">
            {capturedPieces.black.map((pieceType, index) => (
              <motion.div
                key={`${pieceType}-${index}`}
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                className="w-7 h-7 drop-shadow-md"
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
    </div>
  );
}
