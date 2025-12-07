/**
 * Утилиты для работы с URL
 */

/**
 * Построение URL с query параметрами
 */
export function buildUrl(base: string, params?: Record<string, string | number | boolean>): string {
  if (!params) return base;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}

/**
 * Парсинг query параметров из URL
 */
export function parseQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const searchParams = new URL(url).searchParams;

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * Получение query параметра по ключу
 */
export function getQueryParam(key: string): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/**
 * Проверка на валидный URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * Получение домена из URL
 */
export function getDomain(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}
