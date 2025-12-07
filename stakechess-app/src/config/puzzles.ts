export type PuzzleTheme = 'fork' | 'pin' | 'skewer' | 'discovery' | 'mate_in_1' | 'mate_in_2' | 'mate_in_3' | 'sacrifice' | 'endgame' | 'opening';

export interface Puzzle {
  id: string;
  fen: string;
  moves: string[];
  rating: number;
  themes: PuzzleTheme[];
  solution: string[];
  explanation: string;
}

export const DAILY_PUZZLES: Puzzle[] = [
  {
    id: 'daily_001',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    moves: ['e1g1', 'f8c5', 'b1c3'],
    rating: 1200,
    themes: ['opening', 'fork'],
    solution: ['f3e5', 'c6e5', 'd1h5', 'e5g6', 'h5e5'],
    explanation: 'Вилка конем с последующим выигрышем пешки и доминированием в центре',
  },
  {
    id: 'daily_002',
    fen: '3r2k1/ppp2ppp/4p3/3pP3/1b1Pn3/2N5/PPP2PPP/R3KB1R w KQ - 0 12',
    moves: [],
    rating: 1400,
    themes: ['pin', 'mate_in_2'],
    solution: ['c3e4', 'd5e4', 'f1b5'],
    explanation: 'Связка слоном ведет к мату',
  },
  {
    id: 'daily_003',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQ - 0 7',
    moves: [],
    rating: 1600,
    themes: ['sacrifice', 'mate_in_3'],
    solution: ['c4f7', 'f8f7', 'f3g5', 'f7f8', 'd1h5'],
    explanation: 'Жертва слона открывает линии для атаки на короля',
  },
];

export function getDailyPuzzle(): Puzzle {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_PUZZLES[dayOfYear % DAILY_PUZZLES.length];
}

export function getPuzzlesByTheme(theme: PuzzleTheme): Puzzle[] {
  return DAILY_PUZZLES.filter(p => p.themes.includes(theme));
}

export function getPuzzlesByRating(minRating: number, maxRating: number): Puzzle[] {
  return DAILY_PUZZLES.filter(p => p.rating >= minRating && p.rating <= maxRating);
}
