/**
 * Keyboard shortcuts для приложения
 */

export const KEYBINDINGS = {
  // Navigation
  SEARCH: { key: 'k', ctrl: true },
  HELP: { key: '?', shift: true },
  SETTINGS: { key: ',', ctrl: true },
  HOME: { key: 'h', ctrl: true },
  PROFILE: { key: 'p', ctrl: true },

  // Game
  NEW_GAME: { key: 'n', ctrl: true },
  RESIGN: { key: 'r', ctrl: true, shift: true },
  DRAW_OFFER: { key: 'd', ctrl: true },
  UNDO_MOVE: { key: 'z', ctrl: true },
  REDO_MOVE: { key: 'y', ctrl: true },

  // UI
  TOGGLE_THEME: { key: 't', ctrl: true },
  TOGGLE_SOUND: { key: 'm', ctrl: true },
  FULLSCREEN: { key: 'f', ctrl: true },

  // Modal/Overlay
  CLOSE: { key: 'Escape' },
  CONFIRM: { key: 'Enter' },

  // Lists
  ARROW_UP: { key: 'ArrowUp' },
  ARROW_DOWN: { key: 'ArrowDown' },
  ARROW_LEFT: { key: 'ArrowLeft' },
  ARROW_RIGHT: { key: 'ArrowRight' },
} as const;

export type KeyBinding = typeof KEYBINDINGS[keyof typeof KEYBINDINGS];
