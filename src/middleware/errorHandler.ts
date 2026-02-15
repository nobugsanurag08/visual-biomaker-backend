import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { env } from '../config/index';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError
      ? err.message
      : env.isDev
        ? err.message
        : 'Internal Server Error';

  if (statusCode >= 500) {
    logger.error(err);
  } else {
    logger.warn(err.message);
  }

  res.status(statusCode).json({
    error: {
      message,
      ...(env.isDev && { stack: err.stack }),
    },
  });
}
