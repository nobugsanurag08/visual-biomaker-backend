import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export function notFound(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  next(new AppError(404, `Not Found - ${req.method} ${req.originalUrl}`));
}
