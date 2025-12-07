/**
 * Константы маршрутов приложения
 */

export const ROUTES = {
  HOME: '/',
  GAME: '/game',
  GAME_MODE: '/game-mode',
  GAME_PLAY: '/game/:id',
  TOURNAMENTS: '/tournaments',
  LEADERBOARD: '/leaderboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  PREMIUM: '/premium',
  ACHIEVEMENTS: '/achievements',
  PUZZLES: '/puzzles',
  OPENINGS: '/openings',
  ONBOARDING: '/onboarding',
  MATCH_SEARCH: '/match-search',
  SELECT_AI: '/select-ai',
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
  ROUTES.PREMIUM,
] as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ONBOARDING,
] as const;
