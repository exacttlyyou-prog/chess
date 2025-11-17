export interface BoardTheme {
  id: string;
  name: string;
  description: string;
  premium: boolean;
  colors: {
    light: string;
    dark: string;
    border: string;
    highlight: string;
    selected: string;
    lastMove: string;
  };
  style: 'flat' | 'gradient' | 'neon' | 'minimal';
}

export const BOARD_THEMES: BoardTheme[] = [
  {
    id: 'classic',
    name: 'Классическая',
    description: 'Традиционные шахматные цвета',
    premium: false,
    colors: {
      light: 'rgba(255, 255, 255, 0.25)',
      dark: 'rgba(0, 0, 0, 0.60)',
      border: 'rgba(255, 255, 255, 0.12)',
      highlight: 'rgba(239, 49, 36, 0.3)',
      selected: 'rgba(239, 49, 36, 0.4)',
      lastMove: 'rgba(234, 179, 8, 0.2)',
    },
    style: 'flat',
  },
  {
    id: 'modern',
    name: 'Модерн',
    description: 'Современные градиенты и глубина',
    premium: false,
    colors: {
      light: 'rgba(59, 130, 246, 0.12)',
      dark: 'rgba(30, 58, 138, 0.25)',
      border: 'rgba(59, 130, 246, 0.2)',
      highlight: 'rgba(239, 49, 36, 0.35)',
      selected: 'rgba(239, 49, 36, 0.5)',
      lastMove: 'rgba(167, 139, 250, 0.25)',
    },
    style: 'gradient',
  },
  {
    id: 'neon',
    name: 'Неон',
    description: 'Яркие неоновые акценты',
    premium: true,
    colors: {
      light: 'rgba(236, 72, 153, 0.15)',
      dark: 'rgba(131, 24, 67, 0.3)',
      border: 'rgba(236, 72, 153, 0.4)',
      highlight: 'rgba(34, 211, 238, 0.4)',
      selected: 'rgba(34, 211, 238, 0.6)',
      lastMove: 'rgba(250, 204, 21, 0.3)',
    },
    style: 'neon',
  },
  {
    id: 'minimalist',
    name: 'Минимализм',
    description: 'Чистые линии и простота',
    premium: false,
    colors: {
      light: 'rgba(255, 255, 255, 0.18)',
      dark: 'rgba(0, 0, 0, 0.50)',
      border: 'rgba(255, 255, 255, 0.08)',
      highlight: 'rgba(239, 49, 36, 0.25)',
      selected: 'rgba(239, 49, 36, 0.35)',
      lastMove: 'rgba(255, 255, 255, 0.12)',
    },
    style: 'minimal',
  },
  {
    id: 'emerald',
    name: 'Изумруд',
    description: 'Роскошные зеленые оттенки',
    premium: true,
    colors: {
      light: 'rgba(52, 211, 153, 0.15)',
      dark: 'rgba(6, 78, 59, 0.3)',
      border: 'rgba(52, 211, 153, 0.25)',
      highlight: 'rgba(239, 49, 36, 0.35)',
      selected: 'rgba(239, 49, 36, 0.5)',
      lastMove: 'rgba(253, 224, 71, 0.25)',
    },
    style: 'gradient',
  },
  {
    id: 'sunset',
    name: 'Закат',
    description: 'Теплые закатные тона',
    premium: true,
    colors: {
      light: 'rgba(251, 146, 60, 0.15)',
      dark: 'rgba(124, 45, 18, 0.3)',
      border: 'rgba(251, 146, 60, 0.25)',
      highlight: 'rgba(236, 72, 153, 0.4)',
      selected: 'rgba(236, 72, 153, 0.6)',
      lastMove: 'rgba(252, 211, 77, 0.3)',
    },
    style: 'gradient',
  },
  {
    id: 'ocean',
    name: 'Океан',
    description: 'Глубокие морские тона',
    premium: true,
    colors: {
      light: 'rgba(56, 189, 248, 0.15)',
      dark: 'rgba(8, 47, 73, 0.35)',
      border: 'rgba(56, 189, 248, 0.25)',
      highlight: 'rgba(239, 49, 36, 0.35)',
      selected: 'rgba(239, 49, 36, 0.5)',
      lastMove: 'rgba(45, 212, 191, 0.25)',
    },
    style: 'gradient',
  },
  {
    id: 'royal',
    name: 'Королевская',
    description: 'Благородные пурпурные оттенки',
    premium: true,
    colors: {
      light: 'rgba(168, 85, 247, 0.15)',
      dark: 'rgba(59, 7, 100, 0.35)',
      border: 'rgba(168, 85, 247, 0.3)',
      highlight: 'rgba(239, 49, 36, 0.4)',
      selected: 'rgba(239, 49, 36, 0.6)',
      lastMove: 'rgba(250, 204, 21, 0.3)',
    },
    style: 'gradient',
  },
];

export function getBoardTheme(id: string): BoardTheme {
  return BOARD_THEMES.find(theme => theme.id === id) || BOARD_THEMES[0];
}

export function getFreeBoardThemes(): BoardTheme[] {
  return BOARD_THEMES.filter(theme => !theme.premium);
}

export function getPremiumBoardThemes(): BoardTheme[] {
  return BOARD_THEMES.filter(theme => theme.premium);
}
