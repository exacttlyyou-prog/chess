/**
 * Очередь для последовательной обработки задач
 */

type Task<T> = () => Promise<T>;

export class Queue {
  private queue: Array<() => Promise<unknown>> = [];
  private concurrency: number;
  private running = 0;

  constructor(concurrency: number = 1) {
    this.concurrency = concurrency;
  }

  /**
   * Добавление задачи в очередь
   */
  async add<T>(task: Task<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.process();
    });
  }

  /**
   * Обработка очереди
   */
  private async process(): Promise<void> {
    if (this.running >= this.concurrency) return;

    const task = this.queue.shift();
    if (!task) return;

    this.running++;

    try {
      await task();
    } finally {
      this.running--;
      this.process();
    }
  }

  /**
   * Очистка очереди
   */
  clear(): void {
    this.queue = [];
  }

  /**
   * Размер очереди
   */
  get size(): number {
    return this.queue.length;
  }

  /**
   * Проверка активности
   */
  get isActive(): boolean {
    return this.running > 0 || this.queue.length > 0;
  }
}
