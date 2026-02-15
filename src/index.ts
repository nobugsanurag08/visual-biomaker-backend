import { app } from './app';
import { env } from './config/index';
import { logger } from './utils/logger';
import { closeRenderBrowser } from './services/templateRenderService';

const server = app.listen(env.port, () => {
  logger.info(`Server listening on port ${env.port} (${env.nodeEnv})`);
});

const shutdown = async (signal: string) => {
  logger.info(`${signal} received, closing server`);
  await closeRenderBrowser();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);
};

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
