import type { Request, Response } from 'express';
import { Router } from 'express';
import { getTemplateHtml, normalizeTemplateId } from '../templates/index';
import type { ProfileData } from '../types/editor';

const router = Router();

/** Asset base path for a template (served at /templates/template-X/...). */
function getAssetBase(templateId: string): string {
  const canonical = normalizeTemplateId(templateId);
  if (!canonical) return '';
  const num = canonical.replace('template', '');
  return `/templates/template-${num}`;
}

/**
 * GET /templates/preview?templateId=...&data=base64(JSON.stringify(profileData))
 * Returns HTML for Puppeteer to load so assets resolve via same origin.
 */
router.get('/preview', (req: Request, res: Response) => {
  const templateId = (req.query.templateId as string)?.trim() || 'template22';
  const dataBase64 = req.query.data as string;
  if (!dataBase64) {
    res.status(400).send('Missing query: data (base64-encoded profile JSON)');
    return;
  }
  let profileData: ProfileData;
  try {
    const json = Buffer.from(dataBase64, 'base64').toString('utf8');
    profileData = JSON.parse(json) as ProfileData;
  } catch {
    res.status(400).send('Invalid data: must be base64-encoded JSON');
    return;
  }
  const html = getTemplateHtml(templateId, profileData, {
    assetBase: getAssetBase(templateId),
  });
  if (!html) {
    res.status(400).send('Unsupported templateId');
    return;
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

export const previewRoutes = router;
