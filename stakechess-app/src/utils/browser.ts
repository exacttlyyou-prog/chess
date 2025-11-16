/**
 * Утилиты для работы с браузером
 */

/**
 * Определение браузера
 */
export function getBrowser(): string {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = window.navigator.userAgent;

  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('SamsungBrowser')) return 'Samsung Internet';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  if (userAgent.includes('Trident')) return 'Internet Explorer';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';

  return 'unknown';
}

/**
 * Определение ОС
 */
export function getOS(): string {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = window.navigator.userAgent;

  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';

  return 'unknown';
}

/**
 * Проверка поддержки Web API
 */
export function supportsAPI(api: string): boolean {
  if (typeof window === 'undefined') return false;

  return api in window;
}

/**
 * Проверка поддержки localStorage
 */
export function supportsLocalStorage(): boolean {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Получение viewport размеров
 */
export function getViewportSize(): { width: number; height: number } {
  if (typeof window === 'undefined') return { width: 0, height: 0 };

  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  };
}
