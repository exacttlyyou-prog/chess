import { useState, useEffect } from 'react';

/**
 * Хук для debounce значений
 * Откладывает обновление значения на указанное время
 * Полезно для поиска, фильтрации, API запросов
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
