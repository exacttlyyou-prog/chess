import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';

export type ChessSquare =
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8'
  | 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8'
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8'
  | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8'
  | 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8'
  | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8'
  | 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';

export interface ChessMove {
  from: ChessSquare;
  to: ChessSquare;
  promotion?: 'q' | 'r' | 'b' | 'n';
}

export function useChess(initialFen?: string) {
  const [game] = useState(() => new Chess(initialFen));
  const [position, setPosition] = useState(game.fen());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const makeMove = useCallback((move: ChessMove) => {
    try {
      const result = game.move(move);
      if (result) {
        setPosition(game.fen());
        setMoveHistory(game.history());
        return {
          success: true,
          move: result,
          isCheck: game.inCheck(),
          isCheckmate: game.isCheckmate(),
          isStalemate: game.isStalemate(),
          isDraw: game.isDraw(),
          isGameOver: game.isGameOver(),
        };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error };
    }
  }, [game]);

  const getMoves = useCallback((square?: ChessSquare) => {
    if (square) {
      return game.moves({ square, verbose: true });
    }
    return game.moves({ verbose: true });
  }, [game]);

  const getPiece = useCallback((square: ChessSquare) => {
    return game.get(square);
  }, [game]);

  const undo = useCallback(() => {
    const move = game.undo();
    if (move) {
      setPosition(game.fen());
      setMoveHistory(game.history());
      return true;
    }
    return false;
  }, [game]);

  const reset = useCallback(() => {
    game.reset();
    setPosition(game.fen());
    setMoveHistory([]);
  }, [game]);

  const load = useCallback((fen: string) => {
    try {
      game.load(fen);
      setPosition(game.fen());
      setMoveHistory(game.history());
      return true;
    } catch {
      return false;
    }
  }, [game]);

  return {
    game,
    position,
    moveHistory,
    makeMove,
    getMoves,
    getPiece,
    undo,
    reset,
    load,
    turn: game.turn(),
    isCheck: game.inCheck(),
    isCheckmate: game.isCheckmate(),
    isStalemate: game.isStalemate(),
    isDraw: game.isDraw(),
    isGameOver: game.isGameOver(),
  };
}
