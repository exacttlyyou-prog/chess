import { useState, useCallback } from 'react';

interface RippleEffect {
  x: number;
  y: number;
  size: number;
  id: number;
}

/**
 * Хук для создания ripple-эффекта на кнопках и карточках
 * Материал дизайн эффект волны при клике
 */
export function useRipple() {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: RippleEffect = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Удаляем ripple через 600ms (время анимации)
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  return { ripples, createRipple };
}
