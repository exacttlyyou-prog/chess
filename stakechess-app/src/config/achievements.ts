export type AchievementCategory = 'wins' | 'games' | 'tactics' | 'special' | 'social' | 'time' | 'streak';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;
  requirement: number;
  reward?: {
    coins?: number;
    xp?: number;
    title?: string;
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  // Wins
  { id: 'first_win', name: 'Первая победа', description: 'Выиграй свою первую партию', category: 'wins', rarity: 'common', icon: '🎉', requirement: 1, reward: { coins: 50, xp: 100 } },
  { id: 'win_10', name: 'Десятка', description: 'Выиграй 10 партий', category: 'wins', rarity: 'common', icon: '🏆', requirement: 10, reward: { coins: 200, xp: 300 } },
  { id: 'win_50', name: 'Полусотня', description: 'Выиграй 50 партий', category: 'wins', rarity: 'rare', icon: '🌟', requirement: 50, reward: { coins: 500, xp: 800 } },
  { id: 'win_100', name: 'Сотня', description: 'Выиграй 100 партий', category: 'wins', rarity: 'rare', icon: '💯', requirement: 100, reward: { coins: 1000, xp: 1500 } },
  { id: 'win_500', name: 'Мастер побед', description: 'Выиграй 500 партий', category: 'wins', rarity: 'epic', icon: '👑', requirement: 500, reward: { coins: 5000, xp: 5000, title: 'Мастер побед' } },
  { id: 'win_1000', name: 'Легенда', description: 'Выиграй 1000 партий', category: 'wins', rarity: 'legendary', icon: '🔥', requirement: 1000, reward: { coins: 10000, xp: 10000, title: 'Легенда' } },

  // Games played
  { id: 'games_10', name: 'Новичок', description: 'Сыграй 10 партий', category: 'games', rarity: 'common', icon: '🎮', requirement: 10, reward: { coins: 100, xp: 150 } },
  { id: 'games_100', name: 'Опытный', description: 'Сыграй 100 партий', category: 'games', rarity: 'rare', icon: '🎯', requirement: 100, reward: { coins: 500, xp: 1000 } },
  { id: 'games_500', name: 'Ветеран', description: 'Сыграй 500 партий', category: 'games', rarity: 'epic', icon: '⚔️', requirement: 500, reward: { coins: 2000, xp: 3000 } },
  { id: 'games_1000', name: 'Гроссмейстер опыта', description: 'Сыграй 1000 партий', category: 'games', rarity: 'legendary', icon: '🎖️', requirement: 1000, reward: { coins: 5000, xp: 8000 } },

  // Tactics
  { id: 'checkmate_10', name: 'Мат-специалист', description: 'Поставь 10 матов', category: 'tactics', rarity: 'common', icon: '♟️', requirement: 10, reward: { coins: 150, xp: 200 } },
  { id: 'checkmate_50', name: 'Мастер мата', description: 'Поставь 50 матов', category: 'tactics', rarity: 'rare', icon: '⚡', requirement: 50, reward: { coins: 600, xp: 1000 } },
  { id: 'brilliant_move', name: 'Гениальный ход', description: 'Сделай brilliant move', category: 'tactics', rarity: 'rare', icon: '💎', requirement: 1, reward: { coins: 300, xp: 500 } },
  { id: 'brilliant_10', name: 'Гений', description: 'Сделай 10 brilliant moves', category: 'tactics', rarity: 'epic', icon: '🧠', requirement: 10, reward: { coins: 1500, xp: 2500 } },
  { id: 'fork', name: 'Вилка', description: 'Сделай вилку', category: 'tactics', rarity: 'common', icon: '🍴', requirement: 1, reward: { coins: 100, xp: 150 } },
  { id: 'pin', name: 'Связка', description: 'Примени связку', category: 'tactics', rarity: 'common', icon: '📌', requirement: 1, reward: { coins: 100, xp: 150 } },
  { id: 'skewer', name: 'Рентген', description: 'Примени рентген', category: 'tactics', rarity: 'common', icon: '🔍', requirement: 1, reward: { coins: 100, xp: 150 } },
  { id: 'discovered_attack', name: 'Вскрытое нападение', description: 'Примени вскрытое нападение', category: 'tactics', rarity: 'rare', icon: '🎭', requirement: 1, reward: { coins: 200, xp: 300 } },

  // Special
  { id: 'castle_both', name: 'Рокировка обоих', description: 'Сделай короткую и длинную рокировку', category: 'special', rarity: 'common', icon: '🏰', requirement: 2, reward: { coins: 150, xp: 200 } },
  { id: 'en_passant', name: 'Взятие на проходе', description: 'Сделай взятие на проходе', category: 'special', rarity: 'rare', icon: '👻', requirement: 1, reward: { coins: 300, xp: 400 } },
  { id: 'promotion_queen', name: 'Новая королева', description: 'Преврати пешку в ферзя', category: 'special', rarity: 'common', icon: '👸', requirement: 1, reward: { coins: 100, xp: 150 } },
  { id: 'promotion_knight', name: 'Необычное превращение', description: 'Преврати пешку в коня', category: 'special', rarity: 'rare', icon: '🐴', requirement: 1, reward: { coins: 250, xp: 350 } },
  { id: 'sacrifice_queen', name: 'Жертва ферзя', description: 'Пожертвуй ферзя и выиграй', category: 'special', rarity: 'epic', icon: '💝', requirement: 1, reward: { coins: 1000, xp: 1500 } },
  { id: 'back_rank_mate', name: 'Линейный мат', description: 'Поставь линейный мат', category: 'special', rarity: 'rare', icon: '📏', requirement: 1, reward: { coins: 300, xp: 450 } },
  { id: 'smothered_mate', name: 'Спертый мат', description: 'Поставь спертый мат', category: 'special', rarity: 'epic', icon: '🌪️', requirement: 1, reward: { coins: 800, xp: 1200 } },
  { id: 'arabian_mate', name: 'Арабский мат', description: 'Поставь арабский мат', category: 'special', rarity: 'epic', icon: '🐫', requirement: 1, reward: { coins: 800, xp: 1200 } },

  // Streaks
  { id: 'streak_3', name: 'Разогрев', description: 'Выиграй 3 партии подряд', category: 'streak', rarity: 'common', icon: '🔥', requirement: 3, reward: { coins: 200, xp: 300 } },
  { id: 'streak_5', name: 'В ударе', description: 'Выиграй 5 партий подряд', category: 'streak', rarity: 'rare', icon: '💥', requirement: 5, reward: { coins: 500, xp: 700 } },
  { id: 'streak_10', name: 'Непобедимый', description: 'Выиграй 10 партий подряд', category: 'streak', rarity: 'epic', icon: '⚡', requirement: 10, reward: { coins: 1500, xp: 2000 } },
  { id: 'streak_20', name: 'Король серий', description: 'Выиграй 20 партий подряд', category: 'streak', rarity: 'legendary', icon: '👑', requirement: 20, reward: { coins: 5000, xp: 7000, title: 'Король серий' } },

  // Time
  { id: 'blitz_master', name: 'Мастер блица', description: 'Выиграй 50 блиц партий', category: 'time', rarity: 'rare', icon: '⏱️', requirement: 50, reward: { coins: 600, xp: 900 } },
  { id: 'bullet_master', name: 'Мастер пули', description: 'Выиграй 50 пуль', category: 'time', rarity: 'rare', icon: '🚀', requirement: 50, reward: { coins: 700, xp: 1000 } },
  { id: 'rapid_master', name: 'Мастер рапида', description: 'Выиграй 50 рапид партий', category: 'time', rarity: 'rare', icon: '🎯', requirement: 50, reward: { coins: 600, xp: 900 } },
  { id: 'classical_master', name: 'Мастер классики', description: 'Выиграй 50 классических партий', category: 'time', rarity: 'epic', icon: '🏛️', requirement: 50, reward: { coins: 1000, xp: 1500 } },
  { id: 'speed_demon', name: 'Демон скорости', description: 'Выиграй партию за 30 секунд', category: 'time', rarity: 'epic', icon: '👹', requirement: 1, reward: { coins: 800, xp: 1200 } },

  // Social
  { id: 'add_friend', name: 'Социальный', description: 'Добавь первого друга', category: 'social', rarity: 'common', icon: '🤝', requirement: 1, reward: { coins: 100, xp: 150 } },
  { id: 'friends_10', name: 'Популярный', description: 'Набери 10 друзей', category: 'social', rarity: 'rare', icon: '👥', requirement: 10, reward: { coins: 400, xp: 600 } },
  { id: 'join_tournament', name: 'Турнирный боец', description: 'Участвуй в турнире', category: 'social', rarity: 'common', icon: '🎪', requirement: 1, reward: { coins: 150, xp: 200 } },
  { id: 'win_tournament', name: 'Чемпион', description: 'Выиграй турнир', category: 'social', rarity: 'epic', icon: '🏆', requirement: 1, reward: { coins: 2000, xp: 3000, title: 'Чемпион' } },
  { id: 'spectator', name: 'Зритель', description: 'Посмотри 10 игр', category: 'social', rarity: 'common', icon: '👀', requirement: 10, reward: { coins: 100, xp: 150 } },

  // Analysis
  { id: 'use_analysis', name: 'Аналитик', description: 'Проанализируй партию', category: 'tactics', rarity: 'common', icon: '🔬', requirement: 1, reward: { coins: 100, xp: 150 } },
  { id: 'perfect_game', name: 'Идеальная игра', description: 'Сыграй партию с точностью 95%+', category: 'tactics', rarity: 'legendary', icon: '💯', requirement: 1, reward: { coins: 3000, xp: 5000 } },
  { id: 'no_blunders', name: 'Без ошибок', description: 'Сыграй партию без грубых ошибок', category: 'tactics', rarity: 'rare', icon: '✅', requirement: 1, reward: { coins: 300, xp: 500 } },

  // Puzzle
  { id: 'solve_puzzle', name: 'Решатель', description: 'Реши первую задачу', category: 'tactics', rarity: 'common', icon: '🧩', requirement: 1, reward: { coins: 50, xp: 100 } },
  { id: 'puzzles_50', name: 'Тактик', description: 'Реши 50 задач', category: 'tactics', rarity: 'rare', icon: '🎲', requirement: 50, reward: { coins: 500, xp: 800 } },
  { id: 'puzzles_200', name: 'Мастер тактики', description: 'Реши 200 задач', category: 'tactics', rarity: 'epic', icon: '🎰', requirement: 200, reward: { coins: 2000, xp: 3000 } },
  { id: 'puzzle_streak_10', name: 'Серия решений', description: 'Реши 10 задач подряд', category: 'tactics', rarity: 'rare', icon: '🎯', requirement: 10, reward: { coins: 600, xp: 900 } },

  // Rating
  { id: 'reach_1500', name: '1500 рейтинга', description: 'Набери 1500 рейтинга', category: 'wins', rarity: 'rare', icon: '📈', requirement: 1500, reward: { coins: 500, xp: 800 } },
  { id: 'reach_1800', name: '1800 рейтинга', description: 'Набери 1800 рейтинга', category: 'wins', rarity: 'epic', icon: '📊', requirement: 1800, reward: { coins: 1000, xp: 1500 } },
  { id: 'reach_2000', name: '2000 рейтинга', description: 'Набери 2000 рейтинга', category: 'wins', rarity: 'epic', icon: '🚀', requirement: 2000, reward: { coins: 2000, xp: 3000, title: 'Эксперт' } },
  { id: 'reach_2200', name: '2200 рейтинга', description: 'Набери 2200 рейтинга', category: 'wins', rarity: 'legendary', icon: '💫', requirement: 2200, reward: { coins: 5000, xp: 7000, title: 'Мастер' } },
];

export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.category === category);
}

export function getAchievementsByRarity(rarity: AchievementRarity): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.rarity === rarity);
}

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}
