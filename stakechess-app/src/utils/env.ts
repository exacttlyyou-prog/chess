/**
 * Утилиты для работы с environment variables
 */

/**
 * Получение env переменной
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

/**
 * Проверка среды выполнения
 */
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
export const isSSR = import.meta.env.SSR;

/**
 * API URL
 */
export const API_URL = getEnv('VITE_API_URL', 'http://localhost:3000/api');

/**
 * App version
 */
export const APP_VERSION = getEnv('VITE_APP_VERSION', '1.0.0');

/**
 * Проверка на required env variables
 */
export function validateEnv(requiredVars: string[]): void {
  const missing = requiredVars.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
