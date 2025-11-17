/**
 * Конфигурация приложения
 */

export const APP_CONFIG = {
  name: 'StakeChess',
  version: '1.0.0',
  description: 'Играйте в шахматы онлайн с продвинутым AI',
  author: 'StakeChess Team',

  // API
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  apiTimeout: 30000,

  // Analytics
  analyticsEnabled: import.meta.env.PROD,
  yandexMetrikaId: import.meta.env.VITE_YANDEX_METRIKA_ID,
  googleAnalyticsId: import.meta.env.VITE_GA_ID,

  // Features
  features: {
    aiAnalysis: true,
    tournaments: true,
    puzzles: true,
    openings: true,
    achievements: true,
    premium: true,
  },

  // Limits
  limits: {
    freeAIAnalysis: 3,
    premiumAIAnalysis: -1, // unlimited
    maxGamesHistory: 50,
    maxFavoriteOpenings: 20,
  },

  // UI
  ui: {
    defaultTheme: 'dark' as const,
    defaultLanguage: 'ru' as const,
    animationsEnabled: true,
    soundEffectsEnabled: true,
  },

  // Game
  game: {
    defaultTimeControl: '10+0',
    aiDifficulties: ['beginner', 'intermediate', 'advanced', 'expert', 'grandmaster'] as const,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
