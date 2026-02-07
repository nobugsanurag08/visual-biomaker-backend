import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { routes } from './routes/index';
import { previewRoutes } from './routes/preview';
import { errorHandler, notFound } from './middleware/index';
import { env } from './config/index';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.isDev ? 1000 : 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.isDev ? true : [] }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

app.get('/', (_req, res) => {
  res.json({ message: 'Visual Biomaker Backend', health: '/health/health' });
});

// Static template assets first so /templates/template-N/file.png are served; then preview route for /templates/preview
app.use('/templates', express.static(path.join(process.cwd(), 'templates')));
app.use('/templates', previewRoutes);
// Default profile image and other assets (e.g. /assets/img/profile-pic/profile-pic-9.webp)
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

app.use(routes);
app.use(notFound);
app.use(errorHandler);
