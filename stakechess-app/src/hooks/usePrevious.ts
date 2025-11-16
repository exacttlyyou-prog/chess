import { useEffect, useRef } from 'react';

/**
 * Хук для получения предыдущего значения
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
