/**
 * Simple EventEmitter для pub/sub паттерна
 */

type EventHandler<T = unknown> = (data: T) => void;

export class EventEmitter {
  private events = new Map<string, Set<EventHandler>>();

  /**
   * Подписка на событие
   */
  on<T = unknown>(event: string, handler: EventHandler<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event)!.add(handler as EventHandler);

    // Возвращаем функцию отписки
    return () => this.off(event, handler);
  }

  /**
   * Одноразовая подписка
   */
  once<T = unknown>(event: string, handler: EventHandler<T>): void {
    const wrappedHandler = (data: T) => {
      handler(data);
      this.off(event, wrappedHandler);
    };

    this.on(event, wrappedHandler);
  }

  /**
   * Отписка от события
   */
  off<T = unknown>(event: string, handler: EventHandler<T>): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.delete(handler as EventHandler);
    }
  }

  /**
   * Emit события
   */
  emit<T = unknown>(event: string, data?: T): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  /**
   * Удаление всех подписок на событие
   */
  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  /**
   * Получение количества подписчиков на событие
   */
  listenerCount(event: string): number {
    return this.events.get(event)?.size || 0;
  }
}

// Singleton instance для глобальных событий
export const globalEvents = new EventEmitter();
