import type { LogContext } from 'types';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private readonly serviceName?: string;

  constructor(serviceName?: string) {
    this.serviceName = serviceName;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const service = this.serviceName ? `[${this.serviceName}] ` : '';
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${service}${message}${contextStr}`;
  }

  info(message: string, context?: LogContext): void {
    console.log(this.formatMessage('info', message, context));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, context?: LogContext): void {
    console.error(this.formatMessage('error', message, context));
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message, context));
    }
  }
}

export const createLogger = (serviceName?: string): Logger => {
  return new Logger(serviceName);
};

export const logger = new Logger();
