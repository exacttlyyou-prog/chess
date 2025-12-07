/**
 * Утилиты для работы с датами и временем
 */

/**
 * Форматирование даты в читаемый вид
 */
export function formatDate(date: Date | string | number, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = new Date(date);

  if (format === 'relative') {
    return getRelativeTime(d);
  }

  const options: Intl.DateTimeFormatOptions = format === 'long'
    ? { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { year: 'numeric', month: 'short', day: 'numeric' };

  return d.toLocaleDateString('ru-RU', options);
}

/**
 * Получение относительного времени ("5 минут назад", "вчера")
 */
export function getRelativeTime(date: Date | string | number): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'только что';
  if (diffMin < 60) return `${diffMin} ${pluralize(diffMin, 'минуту', 'минуты', 'минут')} назад`;
  if (diffHour < 24) return `${diffHour} ${pluralize(diffHour, 'час', 'часа', 'часов')} назад`;
  if (diffDay === 1) return 'вчера';
  if (diffDay < 7) return `${diffDay} ${pluralize(diffDay, 'день', 'дня', 'дней')} назад`;
  if (diffDay < 30) {
    const weeks = Math.floor(diffDay / 7);
    return `${weeks} ${pluralize(weeks, 'неделю', 'недели', 'недель')} назад`;
  }
  if (diffDay < 365) {
    const months = Math.floor(diffDay / 30);
    return `${months} ${pluralize(months, 'месяц', 'месяца', 'месяцев')} назад`;
  }

  const years = Math.floor(diffDay / 365);
  return `${years} ${pluralize(years, 'год', 'года', 'лет')} назад`;
}

/**
 * Форматирование длительности в читаемый вид
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}д ${hours % 24}ч`;
  if (hours > 0) return `${hours}ч ${minutes % 60}м`;
  if (minutes > 0) return `${minutes}м ${seconds % 60}с`;
  return `${seconds}с`;
}

/**
 * Форматирование времени до события
 */
export function formatTimeUntil(futureDate: Date | string | number): string {
  const future = new Date(futureDate);
  const now = new Date();
  const diffMs = future.getTime() - now.getTime();

  if (diffMs <= 0) return 'Началось';

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) return `через ${diffDay}д ${diffHour % 24}ч`;
  if (diffHour > 0) return `через ${diffHour}ч ${diffMin % 60}м`;
  if (diffMin > 0) return `через ${diffMin}м`;
  return `через ${diffSec}с`;
}

/**
 * Проверка, является ли дата сегодня
 */
export function isToday(date: Date | string | number): boolean {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

/**
 * Проверка, является ли дата вчера
 */
export function isYesterday(date: Date | string | number): boolean {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

/**
 * Получение начала дня
 */
export function startOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Получение конца дня
 */
export function endOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Pluralize для русского языка
 */
function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/**
 * Форматирование времени игры (mm:ss)
 */
export function formatGameTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
