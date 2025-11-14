/**
 * StakeChess Design System & AI Prompts Configuration
 * Based on Alfa Bank A-Club visual language
 * https://alfabank.ru/a-club/
 */

// ============================================
// COLOR PALETTE
// ============================================
export const COLORS = {
  // Core colors
  alfaRed: '#EF3124',      // RGB 239-49-36, Pantone 2035CU
  black: '#000000',         // Pure black background
  white: '#FFFFFF',         // UI text & elements

  // UI surfaces (white with opacity)
  surface: {
    low: 'rgba(255, 255, 255, 0.03)',
    medium: 'rgba(255, 255, 255, 0.05)',
    high: 'rgba(255, 255, 255, 0.08)',
    card: 'rgba(255, 255, 255, 0.05)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.4)',
  },

  // State colors
  active: '#EF3124',
  hover: '#FF3F2F',
  disabled: 'rgba(255, 255, 255, 0.2)',
} as const;

// ============================================
// CHESS PIECE PROMPTS
// ============================================
export const CHESS_PIECE_PROMPTS = {

  pawn: {
    name: "Пешка",
    base: `Classic chess pawn piece,
premium 3D render in glossy black material,
thin red accent line along the crown edge,
minimalist composition on pure black background,
soft studio lighting from top-right,
floating with subtle shadow beneath,
contemporary luxury aesthetic like Alfa Bank A-Club,
octane render, 8k, ultra sharp,
--ar 1:1 --style raw --v 6 --q 2`,

    active: `Classic chess pawn piece,
glossy black material with glowing red outline,
active state with red aura effect,
pure black background,
dramatic lighting emphasizing selection,
luxury render,
--ar 1:1 --style raw --v 6`,

    captured: `Classic chess pawn piece,
glossy black material fading to 40% opacity,
tilted at defeated angle,
desaturated and ghosted appearance,
pure black background,
soft dramatic lighting,
--ar 1:1 --style raw --v 6`,
  },

  rook: {
    name: "Ладья",
    base: `Chess rook tower piece,
premium 3D render in matte black material with glossy details,
red metallic accent on castle battlements,
floating on pure black background,
soft rim lighting creating elegant highlights,
modern luxury banking aesthetic,
rendered in Cinema 4D style,
photorealistic, 8k,
--ar 1:1 --style raw --v 6 --q 2`,

    active: `Chess rook tower piece,
matte black with glowing red battlements,
active selection state with red aura,
pure black background,
enhanced rim lighting,
--ar 1:1 --style raw --v 6`,

    captured: `Chess rook tower piece,
matte black fading to 40% opacity,
tilted defeated angle,
ghosted appearance,
pure black background,
--ar 1:1 --style raw --v 6`,
  },

  knight: {
    name: "Конь",
    base: `Chess knight horse head piece,
premium 3D sculptural render,
smooth black ceramic material with red accent on mane,
elegant silhouette on pure black background,
dramatic side lighting with soft shadows,
luxury product photography style,
ultra detailed, photorealistic, 8k,
--ar 1:1 --style raw --v 6 --q 2`,

    active: `Chess knight horse head piece,
smooth black ceramic with glowing red mane accent,
active state with red energy glow,
pure black background,
dramatic side lighting,
--ar 1:1 --style raw --v 6`,

    captured: `Chess knight horse head piece,
black ceramic fading to 40% opacity,
defeated tilted angle,
ghosted semi-transparent,
pure black background,
--ar 1:1 --style raw --v 6`,
  },

  bishop: {
    name: "Слон",
    base: `Chess bishop piece with diagonal cut top,
premium 3D render in polished black material,
thin red accent ring at the mitre,
minimalist floating composition,
soft gradient lighting on pure black background,
contemporary luxury design like private banking,
octane render, clean and sharp, 8k,
--ar 1:1 --style raw --v 6 --q 2`,

    active: `Chess bishop piece with diagonal cut top,
polished black with glowing red mitre ring,
active state with red highlight,
pure black background,
enhanced gradient lighting,
--ar 1:1 --style raw --v 6`,

    captured: `Chess bishop piece,
polished black fading to 40% opacity,
tilted defeated state,
ghosted appearance,
pure black background,
--ar 1:1 --style raw --v 6`,
  },

  queen: {
    name: "Ферзь",
    base: `Chess queen piece with pointed crown,
premium 3D render in glossy black material,
red metallic accents on crown points,
elegant vertical composition on pure black background,
soft backlit rim light,
luxury brand aesthetic, sophisticated,
8k render, ultra realistic,
--ar 1:1 --style raw --v 6 --q 2`,

    active: `Chess queen piece with pointed crown,
glossy black with glowing red crown points,
active royal state with red corona,
pure black background,
dramatic backlit rim light,
--ar 1:1 --style raw --v 6`,

    captured: `Chess queen piece,
glossy black fading to 40% opacity,
dramatic defeated angle,
ghosted semi-transparent,
pure black background,
--ar 1:1 --style raw --v 6`,
  },

  // 🦆 KING = DUCK!
  king: {
    name: "Король (Утка)",
    base: `Elegant duck figure as chess king piece,
smooth glossy black body with premium finish,
tiny red crown on duck's head,
minimal sophisticated composition on pure black background,
soft studio lighting highlighting the curves,
playful yet luxurious aesthetic,
contemporary art meets chess design,
octane render, photorealistic, 8k,
--ar 1:1 --style raw --v 6 --q 2`,

    baseAlt: `Minimalist rubber duck wearing tiny red chess king crown,
premium matte black material with subtle sheen,
floating elegantly on pure black background,
soft rim lighting from top,
luxury brand photography style,
clean, sophisticated, slightly whimsical,
ultra detailed, 8k,
--ar 1:1 --style raw --v 6 --q 2`,

    active: `Elegant black duck chess king,
glossy black body with glowing red crown,
active royal state with red aura,
majestic floating pose,
pure black background,
enhanced dramatic lighting,
--ar 1:1 --style raw --v 6`,

    captured: `Elegant black duck chess king,
glossy black fading to 40% opacity,
dramatic defeated angle, crown falling off,
ghosted semi-transparent appearance,
pure black background,
melancholic lighting,
--ar 1:1 --style raw --v 6`,
  },
} as const;

// ============================================
// BOARD & BACKGROUND PROMPTS
// ============================================
export const BOARD_PROMPTS = {
  board: `Minimalist chess board surface,
alternating pure black (#000000) and dark grey (rgba(255,255,255,0.05)) squares,
subtle grid with thin red accent lines,
floating perspective view,
soft ambient lighting,
premium material visualization,
luxury banking aesthetic,
--ar 16:9 --style raw --v 6`,

  background: `Abstract geometric shapes in black and dark grey,
subtle red accent lines,
floating on pure black background,
minimal contemporary design,
soft shadows and depth,
luxury banking brand aesthetic,
Alfa Bank A-Club style,
--ar 16:9 --style raw --v 6`,
} as const;

// ============================================
// SPACING SYSTEM
// ============================================
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const;

// ============================================
// BORDER RADIUS
// ============================================
export const RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

// ============================================
// SHADOWS
// ============================================
export const SHADOWS = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.2)',
  md: '0 4px 16px rgba(0, 0, 0, 0.3)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.5)',
  red: '0 8px 24px rgba(239, 49, 36, 0.4)',
} as const;

export default {
  COLORS,
  CHESS_PIECE_PROMPTS,
  BOARD_PROMPTS,
  SPACING,
  RADIUS,
  SHADOWS,
};
