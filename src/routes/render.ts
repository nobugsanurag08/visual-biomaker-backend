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

/** POST /api/render – body: { templateId: string, formData: EditorFormData, download?: boolean }. Returns image/png. When download!==true, returns optimized/smaller image for preview. */
router.post('/render', async (req: Request, res: Response) => {
  const { templateId, formData, download } = req.body as {
    templateId?: string;
    formData?: EditorFormData;
    download?: boolean;
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

  const forDownload = download === true;

  try {
    const { buffer, mimeType } = await renderTemplateToPng(
      normalized,
      profileData,
      env.port,
      forDownload
    );
    const ext = mimeType === 'image/jpeg' ? 'jpg' : 'png';
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="biodata.${ext}"`);
    res.send(buffer);
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
