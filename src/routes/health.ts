import type { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? 'development',
  });
});

router.get('/ready', (_req: Request, res: Response) => {
  res.json({ ready: true });
});

export const healthRoutes = router;
