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
  // Extended metadata for storytelling
  title?: string; // e.g., "Чемпион мира 2013-2023"
  bio?: string; // Full biography (2-3 sentences)
  styleTags?: string[]; // e.g., ["Агрессивный", "Тактический"]
  stats?: {
    peakRating?: number;
    yearsAsChampion?: number;
    notableRecord?: string;
  };
  // Gamification
  locked?: boolean;
  unlockCondition?: string; // e.g., "Набери 2200 рейтинг"
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
    title: 'Чемпион мира 2013-2023',
    bio: 'Норвежский вундеркинд с феноменальной интуицией. Известен непобедимым эндшпилем и способностью выжимать победы из ничейных позиций. Достиг высшего рейтинга в истории — 2882.',
    styleTags: ['Универсальный', 'Позиционный', 'Эндшпиль-виртуоз'],
    stats: {
      peakRating: 2882,
      yearsAsChampion: 10,
      notableRecord: '125 партий без поражений',
    },
    locked: true,
    unlockCondition: 'Набери 2200 рейтинг',
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
    title: 'Чемпион мира 1985-2000',
    bio: 'Один из величайших шахматистов всех времён. Агрессивный тактический стиль и непревзойдённая дебютная подготовка. Доминировал в мировых шахматах 15 лет подряд.',
    styleTags: ['Агрессивный', 'Тактический', 'Дебютная подготовка'],
    stats: {
      peakRating: 2851,
      yearsAsChampion: 15,
      notableRecord: '255 месяцев подряд №1',
    },
    locked: true,
    unlockCondition: 'Выиграй турнир',
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
    title: 'Чемпион мира 1972-1975',
    bio: 'Американская легенда, победившая советскую шахматную школу. Известен идеальной техникой и принципиальной игрой. Выиграл матч века против Спасского.',
    styleTags: ['Точный', 'Принципиальный', 'Техничный'],
    stats: {
      peakRating: 2785,
      yearsAsChampion: 3,
      notableRecord: '20 побед подряд в турнирах',
    },
    locked: true,
    unlockCondition: 'King Premium подписка',
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
    title: 'Чемпион мира 1960-1961',
    bio: 'Магический Миша — мастер фантастических жертв и комбинаций. Его атаки казались невозможными, но работали. Самый креативный шахматист в истории.',
    styleTags: ['Магический', 'Жертвы', 'Комбинационный'],
    stats: {
      peakRating: 2750,
      yearsAsChampion: 1,
      notableRecord: '95 партий без поражений',
    },
    locked: false,
    unlockCondition: 'Набери 1800 рейтинг',
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
    title: 'Чемпион мира 1963-1969',
    bio: 'Железный Тигран — мастер защиты и профилактики. Его позиции казались неприступными крепостями. Минимальный риск, максимальная надёжность.',
    styleTags: ['Защитный', 'Профилактический', 'Надёжный'],
    stats: {
      peakRating: 2720,
      yearsAsChampion: 6,
      notableRecord: 'Ни одного поражения в защите титула',
    },
    locked: false,
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
    title: 'Чемпион мира 1921-1927',
    bio: 'Кубинский вундеркинд с природным талантом. Играл просто, ясно и почти без ошибок. Его эндшпиль был образцом совершенства.',
    styleTags: ['Природный талант', 'Ясный', 'Эндшпиль'],
    stats: {
      peakRating: 2740,
      yearsAsChampion: 6,
      notableRecord: '8 лет без поражений',
    },
    locked: false,
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
    title: 'Неофициальный чемпион мира 1858',
    bio: 'Американский гений XIX века. Блестящее быстрое развитие фигур и прямая атака на короля. Доминировал над всеми соперниками своей эпохи.',
    styleTags: ['Атакующий', 'Быстрое развитие', 'Тактический'],
    stats: {
      peakRating: 2700,
      notableRecord: 'Не проиграл ни одной серьёзной партии',
    },
    locked: false,
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
    title: 'Чемпион мира 1975-1985',
    bio: 'Мастер позиционной игры и удушающего стиля. Медленно, но неумолимо создаёт преимущество. Один из самых успешных чемпионов мира.',
    styleTags: ['Позиционный', 'Удушающий', 'Стратегический'],
    stats: {
      peakRating: 2780,
      yearsAsChampion: 10,
      notableRecord: '9 побед в Олимпиадах',
    },
    locked: false,
    unlockCondition: 'Выиграй 20 партий',
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
    title: 'Чемпион мира 1948-1963',
    bio: 'Патриарх советской шахматной школы. Научный подход к игре, глубочайшая подготовка и железная воля. Воспитал поколение чемпионов.',
    styleTags: ['Научный', 'Подготовленный', 'Универсальный'],
    stats: {
      peakRating: 2760,
      yearsAsChampion: 13,
      notableRecord: 'Трижды возвращал титул',
    },
    locked: false,
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
    title: 'AI уровень 1',
    bio: 'Идеальный соперник для тех, кто только начинает свой путь в шахматах. Понятные ходы, минимум сложных комбинаций.',
    styleTags: ['Простой', 'Обучающий'],
    locked: false,
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
    title: 'AI уровень 2',
    bio: 'Для игроков, знающих основы. Понимает базовые принципы и может создавать угрозы. Хороший баланс между обучением и вызовом.',
    styleTags: ['Сбалансированный', 'Обучающий'],
    locked: false,
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
    title: 'AI уровень 3',
    bio: 'Серьёзный вызов для опытных игроков. Сильная позиционная игра, понимание стратегии и тактики. Требует полной концентрации.',
    styleTags: ['Сильный', 'Универсальный'],
    locked: false,
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
