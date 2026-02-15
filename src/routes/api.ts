import type { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Visual Biomaker API',
    version: '1.0.0',
    docs: '/api',
  });
});

export const apiRoutes = router;
