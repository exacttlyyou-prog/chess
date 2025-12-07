/**
 * Logger утилита для структурированного логирования
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  context?: string;
  data?: Record<string, unknown>;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private logLevel: LogLevel = this.isDevelopment ? 'debug' : 'info';

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private formatMessage(level: LogLevel, message: string, options?: LogOptions): string {
    const timestamp = new Date().toISOString();
    const context = options?.context ? `[${options.context}]` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${context} ${message}`;
  }

  debug(message: string, options?: LogOptions) {
    if (!this.shouldLog('debug')) return;

    console.debug(this.formatMessage('debug', message, options), options?.data);
  }

  info(message: string, options?: LogOptions) {
    if (!this.shouldLog('info')) return;

    console.info(this.formatMessage('info', message, options), options?.data);
  }

  warn(message: string, options?: LogOptions) {
    if (!this.shouldLog('warn')) return;

    console.warn(this.formatMessage('warn', message, options), options?.data);
  }

  error(message: string, error?: Error | unknown, options?: LogOptions) {
    if (!this.shouldLog('error')) return;

    console.error(this.formatMessage('error', message, options), error, options?.data);

    // Здесь можно добавить отправку в сервис (Sentry, LogRocket, etc.)
  }

  group(label: string) {
    if (this.isDevelopment) {
      console.group(label);
    }
  }

  groupEnd() {
    if (this.isDevelopment) {
      console.groupEnd();
    }
  }
}

export const logger = new Logger();
