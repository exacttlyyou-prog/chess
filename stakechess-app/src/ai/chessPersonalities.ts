import { Chess } from 'chess.js';
import type { Move } from 'chess.js';

/**
 * AI Personality interface - defines playing style characteristics
 */
export interface ChessPersonality {
  id: string;
  name: string;
  description: string;
  rating: number;
  avatar?: string;
  style: {
    aggression: number; // 0-1: How aggressive (attacking vs defensive)
    tactical: number; // 0-1: Tactical vs positional
    risk: number; // 0-1: Risk-taking vs safe play
    development: number; // 0-1: Piece development priority
    centerControl: number; // 0-1: Center control importance
  };
  thinkingTime: {
    min: number; // Minimum thinking time in ms
    max: number; // Maximum thinking time in ms
  };
}

/**
 * Chess AI Personalities - Models of real chess players
 */
export const CHESS_PERSONALITIES: Record<string, ChessPersonality> = {
  magnus: {
    id: 'magnus',
    name: 'Magnus Carlsen',
    description: 'Универсальный стиль, отличная эндшпиль игра, минимальные ошибки',
    rating: 2850,
    style: {
      aggression: 0.6,
      tactical: 0.7,
      risk: 0.5,
      development: 0.8,
      centerControl: 0.8,
    },
    thinkingTime: { min: 800, max: 2000 },
  },
  kasparov: {
    id: 'kasparov',
    name: 'Garry Kasparov',
    description: 'Агрессивный, динамичный стиль с глубокой подготовкой',
    rating: 2820,
    style: {
      aggression: 0.9,
      tactical: 0.9,
      risk: 0.7,
      development: 0.9,
      centerControl: 0.9,
    },
    thinkingTime: { min: 600, max: 1800 },
  },
  fischer: {
    id: 'fischer',
    name: 'Bobby Fischer',
    description: 'Точный, принципиальный стиль с отличной техникой',
    rating: 2780,
    style: {
      aggression: 0.7,
      tactical: 0.8,
      risk: 0.6,
      development: 0.9,
      centerControl: 0.8,
    },
    thinkingTime: { min: 700, max: 1900 },
  },
  tal: {
    id: 'tal',
    name: 'Mikhail Tal',
    description: 'Магический стиль с жертвами и комбинациями',
    rating: 2750,
    style: {
      aggression: 1.0,
      tactical: 1.0,
      risk: 0.9,
      development: 0.7,
      centerControl: 0.6,
    },
    thinkingTime: { min: 500, max: 1500 },
  },
  petrosian: {
    id: 'petrosian',
    name: 'Tigran Petrosian',
    description: 'Защитник - профилактический стиль, минимальный риск',
    rating: 2720,
    style: {
      aggression: 0.3,
      tactical: 0.5,
      risk: 0.2,
      development: 0.7,
      centerControl: 0.7,
    },
    thinkingTime: { min: 900, max: 2200 },
  },
  capablanca: {
    id: 'capablanca',
    name: 'José Raúl Capablanca',
    description: 'Простота и ясность - природный талант',
    rating: 2740,
    style: {
      aggression: 0.5,
      tactical: 0.6,
      risk: 0.4,
      development: 0.8,
      centerControl: 0.8,
    },
    thinkingTime: { min: 600, max: 1600 },
  },
  morphy: {
    id: 'morphy',
    name: 'Paul Morphy',
    description: 'Быстрое развитие и атака на короля',
    rating: 2700,
    style: {
      aggression: 0.9,
      tactical: 0.9,
      risk: 0.8,
      development: 1.0,
      centerControl: 0.9,
    },
    thinkingTime: { min: 400, max: 1200 },
  },
  karpov: {
    id: 'karpov',
    name: 'Anatoly Karpov',
    description: 'Позиционная игра, удушающий стиль',
    rating: 2780,
    style: {
      aggression: 0.4,
      tactical: 0.6,
      risk: 0.3,
      development: 0.8,
      centerControl: 0.9,
    },
    thinkingTime: { min: 800, max: 2000 },
  },
  botvinnik: {
    id: 'botvinnik',
    name: 'Mikhail Botvinnik',
    description: 'Научный подход, глубокая подготовка',
    rating: 2760,
    style: {
      aggression: 0.6,
      tactical: 0.7,
      risk: 0.5,
      development: 0.8,
      centerControl: 0.9,
    },
    thinkingTime: { min: 1000, max: 2500 },
  },
  beginner: {
    id: 'beginner',
    name: 'Новичок',
    description: 'Базовый уровень для начинающих',
    rating: 800,
    style: {
      aggression: 0.5,
      tactical: 0.3,
      risk: 0.6,
      development: 0.4,
      centerControl: 0.4,
    },
    thinkingTime: { min: 300, max: 800 },
  },
  intermediate: {
    id: 'intermediate',
    name: 'Любитель',
    description: 'Средний уровень игры',
    rating: 1500,
    style: {
      aggression: 0.6,
      tactical: 0.5,
      risk: 0.5,
      development: 0.6,
      centerControl: 0.6,
    },
    thinkingTime: { min: 400, max: 1200 },
  },
  advanced: {
    id: 'advanced',
    name: 'Мастер',
    description: 'Продвинутый уровень',
    rating: 2200,
    style: {
      aggression: 0.7,
      tactical: 0.7,
      risk: 0.5,
      development: 0.8,
      centerControl: 0.8,
    },
    thinkingTime: { min: 600, max: 1600 },
  },
};

/**
 * Evaluate move based on personality style
 */
function evaluateMove(
  move: Move,
  game: Chess,
  personality: ChessPersonality
): number {
  let score = Math.random() * 100; // Base randomness

  // Capture bonus
  if (move.captured) {
    const pieceValues: Record<string, number> = {
      p: 1,
      n: 3,
      b: 3,
      r: 5,
      q: 9,
      k: 0,
    };
    const captureValue = pieceValues[move.captured] || 0;
    score += captureValue * 50 * personality.style.aggression;
  }

  // Check bonus
  const testGame = new Chess(game.fen());
  testGame.move(move);
  if (testGame.inCheck()) {
    score += 30 * personality.style.aggression;
  }

  // Checkmate bonus
  if (testGame.isCheckmate()) {
    score += 10000;
  }

  // Center control bonus
  const centerSquares = ['e4', 'e5', 'd4', 'd5'];
  if (centerSquares.includes(move.to)) {
    score += 20 * personality.style.centerControl;
  }

  // Development bonus (moving pieces from back rank)
  const backRank = move.color === 'w' ? '1' : '8';
  if (move.from.includes(backRank) && !move.to.includes(backRank)) {
    score += 15 * personality.style.development;
  }

  // Tactical patterns
  if (move.flags.includes('p')) {
    // Promotion
    score += 80 * personality.style.tactical;
  }

  return score;
}

/**
 * Select best move based on personality
 */
export function selectMoveByPersonality(
  game: Chess,
  personality: ChessPersonality
): Move | null {
  const moves = game.moves({ verbose: true });

  if (moves.length === 0) return null;

  // For beginner, add randomness
  if (personality.rating < 1000) {
    const randomChance = Math.random();
    if (randomChance < 0.3) {
      // 30% chance of random move
      return moves[Math.floor(Math.random() * moves.length)];
    }
  }

  // Score all moves
  const scoredMoves = moves.map((move) => ({
    move,
    score: evaluateMove(move, game, personality),
  }));

  // Sort by score
  scoredMoves.sort((a, b) => b.score - a.score);

  // Add some randomness based on rating
  const randomness = (2850 - personality.rating) / 2850; // Higher for lower rated
  const topN = Math.max(1, Math.floor(moves.length * (0.1 + randomness * 0.3)));

  // Select from top N moves
  const selectedMove =
    scoredMoves[Math.floor(Math.random() * Math.min(topN, scoredMoves.length))];

  return selectedMove.move;
}

/**
 * Get thinking time for personality
 */
export function getThinkingTime(personality: ChessPersonality): number {
  const { min, max } = personality.thinkingTime;
  return min + Math.random() * (max - min);
}
