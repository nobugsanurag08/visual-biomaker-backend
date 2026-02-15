import request from 'supertest';
import { app } from '../src/app';

describe('App', () => {
  describe('GET /', () => {
    it('returns welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Visual Biomaker Backend');
      expect(res.body).toHaveProperty('health', '/health/health');
    });
  });

  describe('GET /health/health', () => {
    it('returns health status', async () => {
      const res = await request(app).get('/health/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('GET /health/ready', () => {
    it('returns ready status', async () => {
      const res = await request(app).get('/health/ready');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('ready', true);
    });
  });

  describe('GET /api', () => {
    it('returns API info', async () => {
      const res = await request(app).get('/api');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Visual Biomaker API');
    });
  });

  describe('404', () => {
    it('returns 404 for unknown route', async () => {
      const res = await request(app).get('/unknown');
      expect(res.status).toBe(404);
      expect(res.body.error).toHaveProperty('message');
    });
  });
});
