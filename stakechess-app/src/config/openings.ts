export type OpeningColor = 'white' | 'black' | 'both';

export interface OpeningVariation {
  name: string;
  moves: string[];
  fen: string;
  description: string;
}

export interface Opening {
  id: string;
  name: string;
  eco: string;
  color: OpeningColor;
  moves: string[];
  variations: OpeningVariation[];
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
}

export const OPENINGS: Opening[] = [
  {
    id: 'italian',
    name: 'Итальянская партия',
    eco: 'C50',
    color: 'white',
    moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1c4'],
    variations: [
      {
        name: 'Гамбит Эванса',
        moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1c4', 'f8c5', 'b2b4'],
        fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4',
        description: 'Агрессивный гамбит с жертвой пешки для развития',
      },
      {
        name: 'Защита двух коней',
        moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1c4', 'g8f6'],
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        description: 'Симметричное развитие с защитой центра',
      },
    ],
    description: 'Одна из старейших и самых популярных партий, направленная на быстрое развитие и контроль центра',
    difficulty: 'beginner',
    popularity: 95,
  },
  {
    id: 'spanish',
    name: 'Испанская партия (Руй Лопес)',
    eco: 'C60',
    color: 'white',
    moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1b5'],
    variations: [
      {
        name: 'Берлинская защита',
        moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1b5', 'g8f6'],
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        description: 'Твердая защита, популярная на высшем уровне',
      },
      {
        name: 'Закрытый вариант',
        moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1b5', 'a7a6', 'b5a4', 'g8f6', 'e1g1', 'f8e7'],
        fen: 'r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 7 6',
        description: 'Сложная позиционная игра с медленным маневрированием',
      },
    ],
    description: 'Названа в честь испанского священника XVI века, считается одной из сильнейших партий',
    difficulty: 'intermediate',
    popularity: 90,
  },
  {
    id: 'sicilian',
    name: 'Сицилианская защита',
    eco: 'B20',
    color: 'black',
    moves: ['e2e4', 'c7c5'],
    variations: [
      {
        name: 'Найдорф',
        moves: ['e2e4', 'c7c5', 'g1f3', 'd7d6', 'd2d4', 'c5d4', 'f3d4', 'g8f6', 'b1c3', 'a7a6'],
        fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
        description: 'Самый популярный и острый вариант Сицилианской защиты',
      },
      {
        name: 'Дракон',
        moves: ['e2e4', 'c7c5', 'g1f3', 'd7d6', 'd2d4', 'c5d4', 'f3d4', 'g8f6', 'b1c3', 'g7g6'],
        fen: 'rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
        description: 'Агрессивный контргамбит на королевском фланге',
      },
    ],
    description: 'Самая популярная защита против e4, дает черным асимметричную игру',
    difficulty: 'advanced',
    popularity: 100,
  },
  {
    id: 'french',
    name: 'Французская защита',
    eco: 'C00',
    color: 'black',
    moves: ['e2e4', 'e7e6'],
    variations: [
      {
        name: 'Классический вариант',
        moves: ['e2e4', 'e7e6', 'd2d4', 'd7d5', 'b1c3', 'g8f6', 'c1g5'],
        fen: 'rnbqkb1r/ppp2ppp/4pn2/3p2B1/3PP3/2N5/PPP2PPP/R2QKBNR b KQkq - 3 4',
        description: 'Позиционная борьба за центр',
      },
    ],
    description: 'Твердая защита с упором на контроль центра пешками',
    difficulty: 'intermediate',
    popularity: 75,
  },
  {
    id: 'queens_gambit',
    name: 'Ферзевый гамбит',
    eco: 'D06',
    color: 'white',
    moves: ['d2d4', 'd7d5', 'c2c4'],
    variations: [
      {
        name: 'Принятый',
        moves: ['d2d4', 'd7d5', 'c2c4', 'd5c4'],
        fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
        description: 'Черные принимают гамбит',
      },
      {
        name: 'Отказанный',
        moves: ['d2d4', 'd7d5', 'c2c4', 'e7e6'],
        fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
        description: 'Черные защищают пешку d5',
      },
    ],
    description: 'Не настоящий гамбит, так как белые легко возвращают пешку',
    difficulty: 'intermediate',
    popularity: 85,
  },
  {
    id: 'kings_indian',
    name: 'Защита Грюнфельда',
    eco: 'E60',
    color: 'black',
    moves: ['d2d4', 'g8f6', 'c2c4', 'g7g6', 'g1f3', 'f8g7'],
    variations: [],
    description: 'Гипермодернистский дебют с фианкетто слона',
    difficulty: 'advanced',
    popularity: 70,
  },
];

export function getOpeningsByColor(color: OpeningColor): Opening[] {
  return OPENINGS.filter(o => o.color === color || o.color === 'both');
}

export function getOpeningsByDifficulty(difficulty: Opening['difficulty']): Opening[] {
  return OPENINGS.filter(o => o.difficulty === difficulty);
}

export function getOpening(id: string): Opening | undefined {
  return OPENINGS.find(o => o.id === id);
}

export function getTopOpenings(limit: number = 5): Opening[] {
  return OPENINGS.sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}
