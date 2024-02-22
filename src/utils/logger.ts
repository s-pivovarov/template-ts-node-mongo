export interface ILogger {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

class Logger implements ILogger {
  log(...args: any[]) {
    return console.log(...args);
  }

  warn(...args: any[]) {
    return console.warn(...args);
  }

  error(...args: any[]) {
    return console.error(...args);
  }

  debug(...args: any[]) {
    return console.log(...args);
  }
}

export const logger = new Logger();
