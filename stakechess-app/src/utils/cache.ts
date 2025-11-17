/**
 * Простая in-memory cache утилита
 */

interface CacheItem<T> {
  value: T;
  expiresAt?: number;
}

export class Cache<T = unknown> {
  private cache = new Map<string, CacheItem<T>>();

  /**
   * Установка значения в cache
   */
  set(key: string, value: T, ttl?: number): void {
    const item: CacheItem<T> = {
      value,
      expiresAt: ttl ? Date.now() + ttl : undefined,
    };

    this.cache.set(key, item);
  }

  /**
   * Получение значения из cache
   */
  get(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) return null;

    // Проверка TTL
    if (item.expiresAt && item.expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Проверка наличия ключа
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Удаление значения
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Очистка всего cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Получение или установка значения
   */
  async getOrSet(key: string, factory: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get(key);

    if (cached !== null) {
      return cached;
    }

    const value = await factory();
    this.set(key, value, ttl);

    return value;
  }

  /**
   * Размер cache
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Получение всех ключей
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
}

// Singleton instance
export const cache = new Cache();
