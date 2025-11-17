/**
 * Утилиты для работы с числами
 */

/**
 * Clamp числа в диапазоне
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Генерация случайного числа в диапазоне
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Генерация случайного float в диапазоне
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Округление до N знаков
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Проверка на четное число
 */
export function isEven(n: number): boolean {
  return n % 2 === 0;
}

/**
 * Проверка на нечетное число
 */
export function isOdd(n: number): boolean {
  return n % 2 !== 0;
}

/**
 * Сумма чисел в массиве
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

/**
 * Среднее значение
 */
export function average(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}

/**
 * Медиана
 */
export function median(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Минимальное значение
 */
export function min(numbers: number[]): number {
  return Math.min(...numbers);
}

/**
 * Максимальное значение
 */
export function max(numbers: number[]): number {
  return Math.max(...numbers);
}

/**
 * Перевод в проценты
 */
export function toPercent(value: number, total: number, decimals: number = 0): number {
  return roundTo((value / total) * 100, decimals);
}

/**
 * Проверка на число в диапазоне
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
