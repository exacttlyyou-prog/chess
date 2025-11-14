type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type PieceColor = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean; // For castling and pawn double move
}

export interface Square {
  piece: Piece | null;
  position: { row: number; col: number };
}

export type Board = Square[][];

/**
 * Check if a square is under attack by the opponent
 */
export function isSquareUnderAttack(
  board: Board,
  row: number,
  col: number,
  byColor: PieceColor
): boolean {
  // Check all opponent pieces to see if any can attack this square
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c].piece;
      if (piece && piece.color === byColor) {
        const moves = getPseudoLegalMoves(board, r, c);
        if (moves.some(move => move.row === row && move.col === col)) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Find king position for a given color
 */
export function findKing(board: Board, color: PieceColor): { row: number; col: number } | null {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col].piece;
      if (piece && piece.type === 'king' && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
}

/**
 * Check if a king is in check
 */
export function isInCheck(board: Board, color: PieceColor): boolean {
  const kingPos = findKing(board, color);
  if (!kingPos) return false;

  const opponentColor: PieceColor = color === 'white' ? 'black' : 'white';
  return isSquareUnderAttack(board, kingPos.row, kingPos.col, opponentColor);
}

/**
 * Get pseudo-legal moves (without check validation)
 */
export function getPseudoLegalMoves(
  board: Board,
  row: number,
  col: number
): { row: number; col: number }[] {
  const piece = board[row][col].piece;
  if (!piece) return [];

  const moves: { row: number; col: number }[] = [];

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

      // Castling
      if (!piece.hasMoved) {
        // Kingside castling
        const kingsideRook = board[row][7].piece;
        if (
          kingsideRook &&
          kingsideRook.type === 'rook' &&
          kingsideRook.color === piece.color &&
          !kingsideRook.hasMoved &&
          !board[row][5].piece &&
          !board[row][6].piece
        ) {
          const opponentColor: PieceColor = piece.color === 'white' ? 'black' : 'white';
          if (
            !isSquareUnderAttack(board, row, 4, opponentColor) &&
            !isSquareUnderAttack(board, row, 5, opponentColor) &&
            !isSquareUnderAttack(board, row, 6, opponentColor)
          ) {
            moves.push({ row, col: 6 }); // Kingside castle
          }
        }

        // Queenside castling
        const queensideRook = board[row][0].piece;
        if (
          queensideRook &&
          queensideRook.type === 'rook' &&
          queensideRook.color === piece.color &&
          !queensideRook.hasMoved &&
          !board[row][1].piece &&
          !board[row][2].piece &&
          !board[row][3].piece
        ) {
          const opponentColor: PieceColor = piece.color === 'white' ? 'black' : 'white';
          if (
            !isSquareUnderAttack(board, row, 4, opponentColor) &&
            !isSquareUnderAttack(board, row, 3, opponentColor) &&
            !isSquareUnderAttack(board, row, 2, opponentColor)
          ) {
            moves.push({ row, col: 2 }); // Queenside castle
          }
        }
      }
      break;
    }
  }

  return moves;
}

/**
 * Simulate a move and check if it leaves the king in check
 */
export function wouldBeInCheck(
  board: Board,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean {
  // Create a copy of the board
  const testBoard: Board = board.map(row =>
    row.map(sq => ({
      ...sq,
      piece: sq.piece ? { ...sq.piece } : null
    }))
  );

  const piece = testBoard[fromRow][fromCol].piece;
  if (!piece) return false;

  // Make the move on test board
  testBoard[toRow][toCol].piece = piece;
  testBoard[fromRow][fromCol].piece = null;

  // Check if own king is in check after this move
  return isInCheck(testBoard, piece.color);
}

/**
 * Get all legal moves (filtering out moves that would leave king in check)
 */
export function getLegalMoves(
  board: Board,
  row: number,
  col: number
): { row: number; col: number }[] {
  const pseudoMoves = getPseudoLegalMoves(board, row, col);

  return pseudoMoves.filter(move =>
    !wouldBeInCheck(board, row, col, move.row, move.col)
  );
}

/**
 * Check if a player is in checkmate
 */
export function isCheckmate(board: Board, color: PieceColor): boolean {
  // Must be in check
  if (!isInCheck(board, color)) return false;

  // Check if any piece has any legal moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col].piece;
      if (piece && piece.color === color) {
        const legalMoves = getLegalMoves(board, row, col);
        if (legalMoves.length > 0) {
          return false; // Found a legal move, not checkmate
        }
      }
    }
  }

  return true; // No legal moves available, checkmate!
}

/**
 * Check if game is a stalemate (not in check but no legal moves)
 */
export function isStalemate(board: Board, color: PieceColor): boolean {
  // Must NOT be in check
  if (isInCheck(board, color)) return false;

  // Check if any piece has any legal moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col].piece;
      if (piece && piece.color === color) {
        const legalMoves = getLegalMoves(board, row, col);
        if (legalMoves.length > 0) {
          return false; // Found a legal move, not stalemate
        }
      }
    }
  }

  return true; // No legal moves available, stalemate!
}
