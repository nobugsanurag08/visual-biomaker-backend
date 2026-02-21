import type { Request, Response } from 'express';
import { Router } from 'express';
import { env } from '../config/index';
import { formDataToProfileData } from '../services/formDataToProfileData';
import {
  renderTemplateToPng,
  getSupportedTemplateIds,
} from '../services/templateRenderService';
import type { EditorFormData } from '../types/editor';
import { logger } from '../utils/logger';

const router = Router();

/** POST /api/render – body: { templateId: string, formData: EditorFormData }. Returns image/png. */
router.post('/render', async (req: Request, res: Response) => {
  const { templateId, formData } = req.body as {
    templateId?: string;
    formData?: EditorFormData;
  };

  if (!templateId || typeof templateId !== 'string') {
    res.status(400).json({ error: { message: 'Missing or invalid templateId' } });
    return;
  }
  if (!formData || typeof formData !== 'object') {
    res.status(400).json({ error: { message: 'Missing or invalid formData (JSON object)' } });
    return;
  }

  const profileData = formDataToProfileData(formData);
  const supported = getSupportedTemplateIds();
  const normalized = templateId.trim();
  if (!supported.includes(normalized)) {
    res.status(400).json({
      error: { message: `Unsupported templateId. Supported: ${supported.join(', ')}` },
    });
    return;
  }

  try {
    const pngBuffer = await renderTemplateToPng(
      normalized,
      profileData,
      env.port
    );
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename="biodata.png"');
    res.send(pngBuffer);
  } catch (err) {
    logger.error('Render failed', err);
    const msg = err instanceof Error ? err.message : String(err);
    const isTimeoutOrSocket =
      msg.includes('socket hang up') ||
      msg.includes('Timeout') ||
      msg.includes('Navigation timeout');
    const message = isTimeoutOrSocket
      ? 'Render timed out or connection closed. Try again or use a smaller payload (e.g. default profile image).'
      : msg || 'Template render failed';
    res.status(500).json({ error: { message } });
  }
});

/** GET /api/render/templates – list supported template IDs. */
router.get('/render/templates', (_req: Request, res: Response) => {
  res.json({ templateIds: getSupportedTemplateIds() });
});

export const renderRoutes = router;
