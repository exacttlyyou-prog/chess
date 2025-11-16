import { useState } from 'react';

/**
 * Утилиты для работы с localStorage и sessionStorage
 * С поддержкой типизации, TTL, и обработкой ошибок
 */

interface StorageItem<T> {
  value: T;
  expiresAt?: number;
}

/**
 * Безопасное получение значения из storage
 */
export function getStorageItem<T>(key: string, storage: Storage = localStorage): T | null {
  try {
    const item = storage.getItem(key);
    if (!item) return null;

    const parsed: StorageItem<T> = JSON.parse(item);

    // Проверка TTL
    if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
      storage.removeItem(key);
      return null;
    }

    return parsed.value;
  } catch (error) {
    console.error(`Error reading from storage (key: ${key}):`, error);
    return null;
  }
}

/**
 * Безопасное сохранение значения в storage
 */
export function setStorageItem<T>(
  key: string,
  value: T,
  ttl?: number,
  storage: Storage = localStorage
): boolean {
  try {
    const item: StorageItem<T> = {
      value,
      expiresAt: ttl ? Date.now() + ttl : undefined,
    };

    storage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error(`Error writing to storage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Удаление значения из storage
 */
export function removeStorageItem(key: string, storage: Storage = localStorage): void {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from storage (key: ${key}):`, error);
  }
}

/**
 * Очистка всего storage
 */
export function clearStorage(storage: Storage = localStorage): void {
  try {
    storage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}

/**
 * Получение всех ключей из storage
 */
export function getStorageKeys(storage: Storage = localStorage): string[] {
  try {
    return Object.keys(storage);
  } catch (error) {
    console.error('Error getting storage keys:', error);
    return [];
  }
}

/**
 * Класс для работы с namespaced storage
 */
export class NamespacedStorage {
  private prefix: string;
  private storage: Storage;

  constructor(namespace: string, storage: Storage = localStorage) {
    this.prefix = `${namespace}:`;
    this.storage = storage;
  }

  get<T>(key: string): T | null {
    return getStorageItem<T>(`${this.prefix}${key}`, this.storage);
  }

  set<T>(key: string, value: T, ttl?: number): boolean {
    return setStorageItem(`${this.prefix}${key}`, value, ttl, this.storage);
  }

  remove(key: string): void {
    removeStorageItem(`${this.prefix}${key}`, this.storage);
  }

  clear(): void {
    const keys = getStorageKeys(this.storage);
    keys
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => this.storage.removeItem(key));
  }

  keys(): string[] {
    return getStorageKeys(this.storage)
      .filter((key) => key.startsWith(this.prefix))
      .map((key) => key.replace(this.prefix, ''));
  }
}

/**
 * React hook для работы со storage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStorageItem<T>(key) ?? initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    setStorageItem(key, value);
  };

  const removeValue = () => {
    setStoredValue(initialValue);
    removeStorageItem(key);
  };

  return [storedValue, setValue, removeValue];
}
