/**
 * Утилиты для валидации форм
 */

export interface ValidationRule {
  validate: (value: unknown) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Валидация email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Валидация пароля (минимум 8 символов, 1 буква, 1 цифра)
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
}

/**
 * Валидация username (3-20 символов, только буквы, цифры, подчеркивание)
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Валидация URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Валидация номера телефона (простая проверка)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s()+-]{10,}$/;
  return phoneRegex.test(phone);
}

/**
 * Проверка на пустое значение
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Проверка минимальной длины
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Проверка максимальной длины
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

/**
 * Проверка минимального значения
 */
export function minValue(value: number, min: number): boolean {
  return value >= min;
}

/**
 * Проверка максимального значения
 */
export function maxValue(value: number, max: number): boolean {
  return value <= max;
}

/**
 * Композиция правил валидации
 */
export function validate(value: unknown, rules: ValidationRule[]): ValidationResult {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Готовые правила валидации
 */
export const ValidationRules = {
  required: (message = 'Это поле обязательно'): ValidationRule => ({
    validate: isRequired,
    message,
  }),

  email: (message = 'Введите корректный email'): ValidationRule => ({
    validate: (value) => isValidEmail(String(value)),
    message,
  }),

  password: (message = 'Пароль должен содержать минимум 8 символов, буквы и цифры'): ValidationRule => ({
    validate: (value) => isValidPassword(String(value)),
    message,
  }),

  username: (message = 'Username должен содержать 3-20 символов (буквы, цифры, _)'): ValidationRule => ({
    validate: (value) => isValidUsername(String(value)),
    message,
  }),

  min: (min: number, message?: string): ValidationRule => ({
    validate: (value) => minLength(String(value), min),
    message: message || `Минимум ${min} символов`,
  }),

  max: (max: number, message?: string): ValidationRule => ({
    validate: (value) => maxLength(String(value), max),
    message: message || `Максимум ${max} символов`,
  }),

  minValue: (min: number, message?: string): ValidationRule => ({
    validate: (value) => minValue(Number(value), min),
    message: message || `Минимальное значение ${min}`,
  }),

  maxValue: (max: number, message?: string): ValidationRule => ({
    validate: (value) => maxValue(Number(value), max),
    message: message || `Максимальное значение ${max}`,
  }),

  url: (message = 'Введите корректный URL'): ValidationRule => ({
    validate: (value) => isValidUrl(String(value)),
    message,
  }),

  phone: (message = 'Введите корректный номер телефона'): ValidationRule => ({
    validate: (value) => isValidPhone(String(value)),
    message,
  }),

  custom: (validator: (value: unknown) => boolean, message: string): ValidationRule => ({
    validate: validator,
    message,
  }),
};
