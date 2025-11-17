/**
 * Утилиты для форматирования данных
 */

/**
 * Форматирование чисел с разделителями
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Форматирование больших чисел (1000 → 1K, 1000000 → 1M)
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
}

/**
 * Форматирование валюты
 */
export function formatCurrency(amount: number, currency: string = 'RUB'): string {
  return amount.toLocaleString('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/**
 * Форматирование процентов
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Форматирование размера файла
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Б';

  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Truncate текста с многоточием
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize первой буквы
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Форматирование имени пользователя
 */
export function formatUsername(username: string | null | undefined): string {
  if (!username) return 'Аноним';
  return username;
}

/**
 * Форматирование рейтинга
 */
export function formatRating(rating: number): string {
  if (rating < 1000) return `${rating} (Новичок)`;
  if (rating < 1500) return `${rating} (Любитель)`;
  if (rating < 2000) return `${rating} (Опытный)`;
  if (rating < 2500) return `${rating} (Мастер)`;
  return `${rating} (Гроссмейстер)`;
}

/**
 * Склонение слов в зависимости от числа
 */
export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return `${count} ${one}`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} ${few}`;
  return `${count} ${many}`;
}

/**
 * Маскирование email
 */
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  if (!domain) return email;

  const maskedName = name.length > 2
    ? name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
    : name[0] + '*';

  return `${maskedName}@${domain}`;
}

/**
 * Маскирование телефона
 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return phone;

  return `+${digits.slice(0, 1)} (***) ***-**-${digits.slice(-2)}`;
}
