/**
 * Цветовые константы приложения
 */

export const COLORS = {
  // Primary
  primary: {
    DEFAULT: '#3b82f6',
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Success
  success: {
    DEFAULT: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },

  // Error
  error: {
    DEFAULT: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },

  // Warning
  warning: {
    DEFAULT: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },

  // Info
  info: {
    DEFAULT: '#06b6d4',
    light: '#22d3ee',
    dark: '#0891b2',
  },

  // Gray
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

export const GRADIENT_COLORS = {
  primary: 'from-blue-600 to-blue-500',
  success: 'from-green-600 to-green-500',
  error: 'from-red-600 to-red-500',
  warning: 'from-yellow-600 to-yellow-500',
  purple: 'from-purple-600 to-purple-500',
  pink: 'from-pink-600 to-pink-500',
  indigo: 'from-indigo-600 to-indigo-500',
} as const;
