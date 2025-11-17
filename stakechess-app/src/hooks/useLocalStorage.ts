import { useState, useEffect, useCallback } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';

/**
 * React hook для работы с localStorage
 * Автоматическая синхронизация между вкладками
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Получаем начальное значение
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getStorageItem<T>(key);
    return item !== null ? item : initialValue;
  });

  // Устанавливаем значение
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        setStorageItem(key, valueToStore);

        // Отправляем custom event для синхронизации между компонентами
        window.dispatchEvent(new CustomEvent('local-storage-change', {
          detail: { key, value: valueToStore },
        }));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Удаляем значение
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      removeStorageItem(key);

      window.dispatchEvent(new CustomEvent('local-storage-change', {
        detail: { key, value: null },
      }));
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue).value);
        } catch {
          // Ignore parse errors
        }
      }
    };

    const handleCustomStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === key) {
        setStoredValue(customEvent.detail.value ?? initialValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-change', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-change', handleCustomStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
