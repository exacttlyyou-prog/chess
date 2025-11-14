export type TournamentStatus = 'locked' | 'active' | 'completed';

export interface TournamentRound {
  roundNumber: number;
  opponentId: string;
  opponentName: string;
  opponentRating: number;
  opponentPersonality: string;
  requiredScore?: number; // minimum score to advance
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master' | 'grandmaster';
  rounds: TournamentRound[];
  rewards: {
    coins: number;
    xp: number;
    title?: string;
    badge?: string;
  };
  unlockRequirement?: {
    type: 'rating' | 'wins' | 'tournament';
    value: number | string;
  };
  entryFee?: number;
  isPremium?: boolean;
}

export const TOURNAMENTS: Tournament[] = [
  // Beginner Level
  {
    id: 'novice_cup',
    name: 'Кубок новичков',
    description: 'Ваш первый турнир. Победите трех начинающих игроков.',
    difficulty: 'beginner',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'bot_novice_1',
        opponentName: 'Алексей Начинающий',
        opponentRating: 600,
        opponentPersonality: 'beginner',
      },
      {
        roundNumber: 2,
        opponentId: 'bot_novice_2',
        opponentName: 'Мария Ученица',
        opponentRating: 750,
        opponentPersonality: 'beginner',
      },
      {
        roundNumber: 3,
        opponentId: 'bot_novice_3',
        opponentName: 'Иван Практикант',
        opponentRating: 850,
        opponentPersonality: 'beginner',
      },
    ],
    rewards: {
      coins: 500,
      xp: 1000,
      title: 'Покоритель основ',
      badge: 'novice-champion',
    },
  },

  {
    id: 'first_steps',
    name: 'Первые шаги',
    description: 'Покажите свои базовые навыки против 4 соперников.',
    difficulty: 'beginner',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'bot_beginner_1',
        opponentName: 'Сергей Игрок',
        opponentRating: 900,
        opponentPersonality: 'beginner',
      },
      {
        roundNumber: 2,
        opponentId: 'bot_beginner_2',
        opponentName: 'Ольга Любитель',
        opponentRating: 950,
        opponentPersonality: 'beginner',
      },
      {
        roundNumber: 3,
        opponentId: 'bot_beginner_3',
        opponentName: 'Дмитрий Энтузиаст',
        opponentRating: 1000,
        opponentPersonality: 'intermediate',
      },
      {
        roundNumber: 4,
        opponentId: 'bot_beginner_4',
        opponentName: 'Елена Прогресс',
        opponentRating: 1100,
        opponentPersonality: 'intermediate',
      },
    ],
    rewards: {
      coins: 750,
      xp: 1500,
      title: 'Шахматный энтузиаст',
    },
    unlockRequirement: {
      type: 'tournament',
      value: 'novice_cup',
    },
  },

  // Intermediate Level
  {
    id: 'club_championship',
    name: 'Клубный чемпионат',
    description: 'Сразитесь с опытными клубными игроками в 5 раундах.',
    difficulty: 'intermediate',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'bot_club_1',
        opponentName: 'Андрей Клубник',
        opponentRating: 1200,
        opponentPersonality: 'intermediate',
      },
      {
        roundNumber: 2,
        opponentId: 'bot_club_2',
        opponentName: 'Виктор Разрядник',
        opponentRating: 1350,
        opponentPersonality: 'intermediate',
      },
      {
        roundNumber: 3,
        opponentId: 'bot_club_3',
        opponentName: 'Наталья Опытная',
        opponentRating: 1450,
        opponentPersonality: 'intermediate',
      },
      {
        roundNumber: 4,
        opponentId: 'bot_club_4',
        opponentName: 'Павел Стратег',
        opponentRating: 1550,
        opponentPersonality: 'intermediate',
      },
      {
        roundNumber: 5,
        opponentId: 'bot_club_5',
        opponentName: 'Татьяна КМС',
        opponentRating: 1650,
        opponentPersonality: 'advanced',
      },
    ],
    rewards: {
      coins: 1500,
      xp: 3000,
      title: 'Клубный чемпион',
      badge: 'club-master',
    },
    unlockRequirement: {
      type: 'rating',
      value: 1200,
    },
  },

  {
    id: 'regional_open',
    name: 'Региональный турнир',
    description: 'Докажите свое мастерство против региональных мастеров.',
    difficulty: 'intermediate',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'bot_regional_1',
        opponentName: 'Максим Региональный',
        opponentRating: 1600,
        opponentPersonality: 'intermediate',
      },
      {
        roundNumber: 2,
        opponentId: 'bot_regional_2',
        opponentName: 'Анна Областная',
        opponentRating: 1700,
        opponentPersonality: 'advanced',
      },
      {
        roundNumber: 3,
        opponentId: 'bot_regional_3',
        opponentName: 'Борис Краевой',
        opponentRating: 1800,
        opponentPersonality: 'advanced',
      },
      {
        roundNumber: 4,
        opponentId: 'bot_regional_4',
        opponentName: 'Ирина Республиканка',
        opponentRating: 1850,
        opponentPersonality: 'advanced',
      },
      {
        roundNumber: 5,
        opponentId: 'morphy',
        opponentName: 'Пол Морфи',
        opponentRating: 1900,
        opponentPersonality: 'morphy',
      },
    ],
    rewards: {
      coins: 2000,
      xp: 4000,
      title: 'Региональная звезда',
    },
    unlockRequirement: {
      type: 'tournament',
      value: 'club_championship',
    },
  },

  // Advanced Level
  {
    id: 'national_masters',
    name: 'Мастера России',
    description: 'Турнир национального уровня. Только для сильнейших!',
    difficulty: 'advanced',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'bot_national_1',
        opponentName: 'Федор Мастер',
        opponentRating: 2000,
        opponentPersonality: 'advanced',
      },
      {
        roundNumber: 2,
        opponentId: 'bot_national_2',
        opponentName: 'Светлана ФИДЕ',
        opponentRating: 2100,
        opponentPersonality: 'advanced',
      },
      {
        roundNumber: 3,
        opponentId: 'botvinnik',
        opponentName: 'Михаил Ботвинник',
        opponentRating: 2200,
        opponentPersonality: 'botvinnik',
      },
      {
        roundNumber: 4,
        opponentId: 'petrosian',
        opponentName: 'Тигран Петросян',
        opponentRating: 2300,
        opponentPersonality: 'petrosian',
      },
      {
        roundNumber: 5,
        opponentId: 'tal',
        opponentName: 'Михаил Таль',
        opponentRating: 2400,
        opponentPersonality: 'tal',
      },
      {
        roundNumber: 6,
        opponentId: 'karpov',
        opponentName: 'Анатолий Карпов',
        opponentRating: 2500,
        opponentPersonality: 'karpov',
      },
    ],
    rewards: {
      coins: 5000,
      xp: 10000,
      title: 'Мастер России',
      badge: 'national-master',
    },
    unlockRequirement: {
      type: 'rating',
      value: 2000,
    },
  },

  {
    id: 'legends_arena',
    name: 'Арена легенд',
    description: 'Сразитесь с величайшими шахматистами истории!',
    difficulty: 'advanced',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'capablanca',
        opponentName: 'Хосе Капабланка',
        opponentRating: 2450,
        opponentPersonality: 'capablanca',
      },
      {
        roundNumber: 2,
        opponentId: 'tal',
        opponentName: 'Михаил Таль',
        opponentRating: 2500,
        opponentPersonality: 'tal',
      },
      {
        roundNumber: 3,
        opponentId: 'fischer',
        opponentName: 'Роберт Фишер',
        opponentRating: 2600,
        opponentPersonality: 'fischer',
      },
      {
        roundNumber: 4,
        opponentId: 'karpov',
        opponentName: 'Анатолий Карпов',
        opponentRating: 2700,
        opponentPersonality: 'karpov',
      },
      {
        roundNumber: 5,
        opponentId: 'kasparov',
        opponentName: 'Гарри Каспаров',
        opponentRating: 2800,
        opponentPersonality: 'kasparov',
      },
    ],
    rewards: {
      coins: 10000,
      xp: 20000,
      title: 'Победитель легенд',
      badge: 'legend-slayer',
    },
    unlockRequirement: {
      type: 'tournament',
      value: 'national_masters',
    },
  },

  // Master Level
  {
    id: 'international_masters',
    name: 'Международный мастер',
    description: 'Турнир для получения звания IM. 7 раундов борьбы.',
    difficulty: 'master',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'im_candidate_1',
        opponentName: 'Жан-Поль Дюпон',
        opponentRating: 2400,
        opponentPersonality: 'advanced',
      },
      {
        roundNumber: 2,
        opponentId: 'im_candidate_2',
        opponentName: 'Хенрик Мюллер',
        opponentRating: 2450,
        opponentPersonality: 'advanced',
      },
      {
        roundNumber: 3,
        opponentId: 'petrosian',
        opponentName: 'Тигран Петросян',
        opponentRating: 2500,
        opponentPersonality: 'petrosian',
      },
      {
        roundNumber: 4,
        opponentId: 'botvinnik',
        opponentName: 'Михаил Ботвинник',
        opponentRating: 2550,
        opponentPersonality: 'botvinnik',
      },
      {
        roundNumber: 5,
        opponentId: 'tal',
        opponentName: 'Михаил Таль',
        opponentRating: 2600,
        opponentPersonality: 'tal',
      },
      {
        roundNumber: 6,
        opponentId: 'fischer',
        opponentName: 'Роберт Фишер',
        opponentRating: 2650,
        opponentPersonality: 'fischer',
      },
      {
        roundNumber: 7,
        opponentId: 'karpov',
        opponentName: 'Анатолий Карпов',
        opponentRating: 2700,
        opponentPersonality: 'karpov',
      },
    ],
    rewards: {
      coins: 15000,
      xp: 30000,
      title: 'Международный мастер',
      badge: 'im-title',
    },
    unlockRequirement: {
      type: 'rating',
      value: 2400,
    },
    entryFee: 1000,
  },

  // Grandmaster Level
  {
    id: 'grandmaster_norm',
    name: 'Норма гроссмейстера',
    description: 'Заработайте норму GM. Испытание для элиты шахмат.',
    difficulty: 'grandmaster',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'gm_2500',
        opponentName: 'Владимир Иванович',
        opponentRating: 2500,
        opponentPersonality: 'advanced',
      },
      {
        roundNumber: 2,
        opponentId: 'capablanca',
        opponentName: 'Хосе Капабланка',
        opponentRating: 2600,
        opponentPersonality: 'capablanca',
      },
      {
        roundNumber: 3,
        opponentId: 'tal',
        opponentName: 'Михаил Таль',
        opponentRating: 2650,
        opponentPersonality: 'tal',
      },
      {
        roundNumber: 4,
        opponentId: 'fischer',
        opponentName: 'Роберт Фишер',
        opponentRating: 2700,
        opponentPersonality: 'fischer',
      },
      {
        roundNumber: 5,
        opponentId: 'karpov',
        opponentName: 'Анатолий Карпов',
        opponentRating: 2750,
        opponentPersonality: 'karpov',
      },
      {
        roundNumber: 6,
        opponentId: 'kasparov',
        opponentName: 'Гарри Каспаров',
        opponentRating: 2800,
        opponentPersonality: 'kasparov',
      },
      {
        roundNumber: 7,
        opponentId: 'magnus',
        opponentName: 'Магнус Карлсен',
        opponentRating: 2850,
        opponentPersonality: 'magnus',
      },
    ],
    rewards: {
      coins: 25000,
      xp: 50000,
      title: 'Гроссмейстер',
      badge: 'gm-title',
    },
    unlockRequirement: {
      type: 'rating',
      value: 2500,
    },
    entryFee: 2500,
  },

  {
    id: 'world_championship',
    name: 'Чемпионат мира',
    description: 'Матч за звание чемпиона мира. Высшее испытание!',
    difficulty: 'grandmaster',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'fischer',
        opponentName: 'Роберт Фишер',
        opponentRating: 2750,
        opponentPersonality: 'fischer',
      },
      {
        roundNumber: 2,
        opponentId: 'kasparov',
        opponentName: 'Гарри Каспаров',
        opponentRating: 2800,
        opponentPersonality: 'kasparov',
      },
      {
        roundNumber: 3,
        opponentId: 'magnus_1',
        opponentName: 'Магнус Карлсен',
        opponentRating: 2850,
        opponentPersonality: 'magnus',
      },
      {
        roundNumber: 4,
        opponentId: 'magnus_2',
        opponentName: 'Магнус Карлсен',
        opponentRating: 2860,
        opponentPersonality: 'magnus',
      },
      {
        roundNumber: 5,
        opponentId: 'magnus_3',
        opponentName: 'Магнус Карлсен',
        opponentRating: 2870,
        opponentPersonality: 'magnus',
      },
      {
        roundNumber: 6,
        opponentId: 'magnus_4',
        opponentName: 'Магнус Карлсен',
        opponentRating: 2880,
        opponentPersonality: 'magnus',
      },
      {
        roundNumber: 7,
        opponentId: 'magnus_final',
        opponentName: 'Магнус Карлсен',
        opponentRating: 2900,
        opponentPersonality: 'magnus',
      },
    ],
    rewards: {
      coins: 100000,
      xp: 100000,
      title: 'Чемпион мира',
      badge: 'world-champion',
    },
    unlockRequirement: {
      type: 'tournament',
      value: 'grandmaster_norm',
    },
    entryFee: 5000,
    isPremium: true,
  },

  // Premium Tournament
  {
    id: 'blitz_arena',
    name: 'Блиц-арена',
    description: 'Быстрые партии против сильнейших соперников. Только Premium.',
    difficulty: 'master',
    rounds: [
      {
        roundNumber: 1,
        opponentId: 'blitz_master_1',
        opponentName: 'Speedmaster 2400',
        opponentRating: 2400,
        opponentPersonality: 'tal',
      },
      {
        roundNumber: 2,
        opponentId: 'blitz_master_2',
        opponentName: 'Blitz King 2500',
        opponentRating: 2500,
        opponentPersonality: 'kasparov',
      },
      {
        roundNumber: 3,
        opponentId: 'blitz_master_3',
        opponentName: 'Lightning 2600',
        opponentRating: 2600,
        opponentPersonality: 'magnus',
      },
      {
        roundNumber: 4,
        opponentId: 'blitz_master_4',
        opponentName: 'Bullet God 2700',
        opponentRating: 2700,
        opponentPersonality: 'fischer',
      },
      {
        roundNumber: 5,
        opponentId: 'blitz_legend',
        opponentName: 'Blitz Legend',
        opponentRating: 2800,
        opponentPersonality: 'tal',
      },
    ],
    rewards: {
      coins: 20000,
      xp: 40000,
      title: 'Король блица',
      badge: 'blitz-king',
    },
    unlockRequirement: {
      type: 'rating',
      value: 2200,
    },
    isPremium: true,
  },
];

// Helper functions
export function getTournament(id: string): Tournament | undefined {
  return TOURNAMENTS.find(t => t.id === id);
}

export function getTournamentsByDifficulty(difficulty: Tournament['difficulty']): Tournament[] {
  return TOURNAMENTS.filter(t => t.difficulty === difficulty);
}

export function getAvailableTournaments(userRating: number, completedTournaments: string[]): Tournament[] {
  return TOURNAMENTS.filter(tournament => {
    // Check unlock requirement
    if (tournament.unlockRequirement) {
      if (tournament.unlockRequirement.type === 'rating') {
        if (userRating < (tournament.unlockRequirement.value as number)) return false;
      } else if (tournament.unlockRequirement.type === 'tournament') {
        if (!completedTournaments.includes(tournament.unlockRequirement.value as string)) {
          return false;
        }
      }
    }
    return true;
  });
}

export function getNextTournament(completedTournaments: string[]): Tournament | null {
  for (const tournament of TOURNAMENTS) {
    if (completedTournaments.includes(tournament.id)) continue;

    // Check if can unlock
    if (tournament.unlockRequirement?.type === 'tournament') {
      const requiredId = tournament.unlockRequirement.value as string;
      if (!completedTournaments.includes(requiredId)) continue;
    }

    return tournament;
  }
  return null;
}
