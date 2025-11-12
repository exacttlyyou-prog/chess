import { useState } from 'react';
import { motion } from 'framer-motion';

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

const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙',
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟',
  },
};

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
        <div className={`text-2xl font-mono font-bold ${currentTurn === 'black' ? 'text-stake-red' : 'text-gray-400'}`}>
          {Math.floor(blackTime / 60)}:{(blackTime % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {/* Chess Board */}
      <div className="glass-card p-4 sm:p-6">
        <div className="aspect-square max-w-xl mx-auto relative">
          {/* Board container with coordinates */}
          <div className="relative">
            {/* Rank labels (1-8) on the left */}
            <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-around text-xs text-gray-500 font-mono">
              {[8, 7, 6, 5, 4, 3, 2, 1].map((rank) => (
                <div key={rank} className="h-[12.5%] flex items-center">
                  {rank}
                </div>
              ))}
            </div>

            {/* File labels (a-h) on the bottom */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-around text-xs text-gray-500 font-mono">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file) => (
                <div key={file} className="w-[12.5%] flex justify-center">
                  {file}
                </div>
              ))}
            </div>

            {/* Main board */}
            <div className="grid grid-cols-8 gap-0 w-full h-full rounded-2xl overflow-hidden shadow-depth-lg border-2 border-white/10">
              {board.map((row, rowIndex) =>
                row.map((square, colIndex) => {
                  const isDark = (rowIndex + colIndex) % 2 === 1;
                  const piece = square.piece;
                  const selected = isSquareSelected(rowIndex, colIndex);
                  const validMove = isValidMove(rowIndex, colIndex);
                  const highlight = isLastMove(rowIndex, colIndex);

                  return (
                    <motion.button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleSquareClick(rowIndex, colIndex)}
                      className={`
                        relative aspect-square flex items-center justify-center text-4xl sm:text-5xl
                        transition-all duration-300
                        ${isDark
                          ? 'bg-gradient-to-br from-emerald-900/40 to-emerald-950/60'
                          : 'bg-gradient-to-br from-amber-50/15 to-amber-100/10'}
                        ${selected ? 'ring-4 ring-stake-red ring-inset shadow-[inset_0_0_20px_rgba(255,23,68,0.3)]' : ''}
                        ${validMove ? 'bg-gradient-to-br from-stake-red/40 to-stake-red/20' : ''}
                        ${highlight ? 'bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 shadow-[inset_0_0_15px_rgba(234,179,8,0.4)]' : ''}
                        hover:brightness-110
                      `}
                      whileHover={{ scale: piece ? 1.05 : 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {validMove && !piece && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 rounded-full bg-stake-red shadow-lg shadow-stake-red/50"
                        />
                      )}
                      {validMove && piece && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 border-4 border-stake-red rounded-full m-1 shadow-lg shadow-stake-red/30"
                        />
                      )}
                      {piece && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className={`
                            select-none cursor-pointer relative z-10
                            ${piece.color === 'white'
                              ? 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] [text-shadow:_0_0_20px_rgba(255,255,255,0.3)]'
                              : 'text-gray-900 drop-shadow-[0_3px_8px_rgba(255,255,255,0.4)] [text-shadow:_0_0_15px_rgba(0,0,0,0.5)]'}
                          `}
                        >
                          {PIECE_SYMBOLS[piece.color][piece.type]}
                        </motion.div>
                      )}
                    </motion.button>
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
        <div className={`text-2xl font-mono font-bold ${currentTurn === 'white' ? 'text-stake-red' : 'text-gray-400'}`}>
          {Math.floor(whiteTime / 60)}:{(whiteTime % 60).toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
