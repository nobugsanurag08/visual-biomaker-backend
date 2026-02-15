import { Router } from 'express';
import { healthRoutes } from './health';
import { apiRoutes } from './api';
import { renderRoutes } from './render';

const router = Router();

router.use('/health', healthRoutes);
router.use('/api', apiRoutes);
router.use('/api', renderRoutes);

export { router as routes };
