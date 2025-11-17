/**
 * Утилиты для работы с DOM
 */

/**
 * Проверка на mobile устройство
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Проверка на touch устройство
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Копирование текста в буфер обмена
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator?.clipboard) {
    // Fallback для старых браузеров
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (error) {
      document.body.removeChild(textArea);
      return false;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Scroll to element
 */
export function scrollToElement(
  elementId: string,
  behavior: ScrollBehavior = 'smooth',
  block: ScrollLogicalPosition = 'start'
) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior, block });
  }
}

/**
 * Scroll to top
 */
export function scrollToTop(behavior: ScrollBehavior = 'smooth') {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior });
  }
}

/**
 * Получение координат элемента
 */
export function getElementPosition(element: HTMLElement): { top: number; left: number } {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };
}

/**
 * Проверка видимости элемента
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
