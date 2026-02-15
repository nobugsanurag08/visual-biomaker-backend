import path from 'path';
import { readFile } from 'fs/promises';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import type { ProfileData } from '../types/editor';
import {
  getTemplateHtml,
  getSupportedTemplateIds as getTemplateIdsFromRegistry,
  normalizeTemplateId,
} from '../templates/index';
import { logger } from '../utils/logger';

const CONTAINER_SELECTOR = '#biodata-container';
/** Must match default in formDataToProfileData – when profile uses this, we embed as data URL so it loads without a network request. */
const DEFAULT_PROFILE_IMAGE_PATH = '/assets/img/profile-pic/profile-pic-9.webp';

let defaultProfileImageDataUrl: string | null = null;

async function getDefaultProfileImageDataUrl(): Promise<string> {
  if (defaultProfileImageDataUrl) return defaultProfileImageDataUrl;
  const filePath = path.join(process.cwd(), 'assets', 'img', 'profile-pic', 'profile-pic-9.webp');
  const buffer = await readFile(filePath);
  defaultProfileImageDataUrl = `data:image/webp;base64,${buffer.toString('base64')}`;
  return defaultProfileImageDataUrl;
}
const RENDER_TIMEOUT_MS = 45000; // Allow more time for slow loads / external images
const IMAGE_LOAD_TIMEOUT_MS = 15000; // Max wait for images before screenshot
const POST_IMAGE_DELAY_MS = 800; // Extra delay after images to allow paint

/**
 * Wait for images inside element to load (mirrors FE observeRendering).
 * Resolves when all img elements have fired 'load' or 'error', or after IMAGE_LOAD_TIMEOUT_MS.
 * Uses Function-from-string so tsx/esbuild does not inject __name (undefined in browser).
 */
async function waitForImages(page: Page, selector: string): Promise<void> {
  const timeoutMs = IMAGE_LOAD_TIMEOUT_MS;
  const waitScript = new Function(
    'selectorStr',
    'imageTimeoutMs',
    `
    return new Promise(function(resolve) {
      var el = document.querySelector(selectorStr);
      if (!el) { resolve(); return; }
      var images = Array.from(el.querySelectorAll('img'));
      if (images.length === 0) { resolve(); return; }
      var settled = 0;
      var fallback = setTimeout(function() { resolve(); }, imageTimeoutMs);
      var check = function() {
        settled++;
        if (settled === images.length) {
          clearTimeout(fallback);
          resolve();
        }
      };
      images.forEach(function(img) {
        if (img.complete) check();
        else {
          img.addEventListener('load', check);
          img.addEventListener('error', check);
        }
      });
    });
  `
  );
  await page.evaluate(
    waitScript as (selectorStr: string, imageTimeoutMs: number) => Promise<void>,
    selector,
    timeoutMs
  );
}

let sharedBrowser: Browser | null = null;

/** Possible system Chrome/Chromium paths (fallback when Puppeteer cache has no browser). */
function getSystemChromePaths(): string[] {
  if (process.platform === 'darwin') {
    return [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ];
  }
  if (process.platform === 'win32') {
    return [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ];
  }
  return ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
}

async function getBrowser(): Promise<Browser> {
  if (sharedBrowser && sharedBrowser.connected) return sharedBrowser;
  const launchOpts: Parameters<typeof puppeteer.launch>[0] = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  };
  try {
    sharedBrowser = await puppeteer.launch(launchOpts);
    return sharedBrowser;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes('Could not find Chrome')) throw err;
  }
  const { existsSync } = await import('fs');
  for (const exe of getSystemChromePaths()) {
    try {
      if (existsSync(exe)) {
        sharedBrowser = await puppeteer.launch({
          ...launchOpts,
          executablePath: exe,
        });
        logger.info(`Using system browser: ${exe}`);
        return sharedBrowser;
      }
    } catch {
      // continue
    }
  }
  throw new Error(
    'Chrome not found. Install with: npx puppeteer browsers install chrome'
  );
}

/** Asset base path for template assets (same as preview route). */
function getAssetBase(templateId: string): string {
  const canonical = normalizeTemplateId(templateId);
  if (!canonical) return '';
  const num = canonical.replace('template', '');
  return `/templates/template-${num}`;
}

const TEMPLATE_URL_RE = /url\((['"])(\/templates\/template-\d+\/[^'"]+)\1\)/g;
const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

/** Replace url('/templates/template-N/file.ext') with data URLs so backgrounds/assets load without network. */
async function embedTemplateAssetsAsDataUrls(html: string): Promise<string> {
  const uniqueMatches = [...new Set(html.match(TEMPLATE_URL_RE) ?? [])];
  let out = html;
  for (const quoted of uniqueMatches) {
    const m = quoted.match(/url\((['"])(\/templates\/template-\d+\/[^'"]+)\1\)/);
    if (!m) continue;
    const relPath = m[2];
    const filePath = path.join(process.cwd(), relPath.slice(1));
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_BY_EXT[ext] ?? 'application/octet-stream';
    try {
      const buffer = await readFile(filePath);
      const dataUrl = `data:${mime};base64,${buffer.toString('base64')}`;
      out = out.split(quoted).join(`url('${dataUrl}')`);
    } catch (err) {
      logger.warn(`Template asset not found: ${filePath}`, err);
    }
  }
  return out;
}

/**
 * Render a template with profile data to PNG using Puppeteer.
 * Builds HTML in-process; embeds template assets as data URLs so backgrounds load without network.
 */
export async function renderTemplateToPng(
  templateId: string,
  profileData: ProfileData,
  port: number
): Promise<Buffer> {
  const data: ProfileData = { ...profileData };
  if (data.profileImage === DEFAULT_PROFILE_IMAGE_PATH) {
    data.profileImage = await getDefaultProfileImageDataUrl();
  }
  let html = getTemplateHtml(templateId, data, {
    assetBase: getAssetBase(templateId),
  });
  if (!html) {
    throw new Error(`Unsupported templateId: ${templateId}`);
  }

  html = await embedTemplateAssetsAsDataUrls(html);

  const origin = `http://127.0.0.1:${port}`;
  // setContent leaves page at about:blank; rewrite /assets/ so img src (e.g. custom profile image URL) loads.
  const htmlWithAbsoluteUrls = html
    .replace(/(src|href)=(["'])\/(assets\/)/g, `$1=$2${origin}/$3`)
    .replace(/url\((['"]?)\/(assets\/)/g, `url($1${origin}/$2`);

  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.setDefaultNavigationTimeout(RENDER_TIMEOUT_MS);
    await page.setContent(htmlWithAbsoluteUrls, {
      waitUntil: 'load',
      timeout: RENDER_TIMEOUT_MS,
    });

    await page.waitForSelector(CONTAINER_SELECTOR, { timeout: 15000 });
    await waitForImages(page, CONTAINER_SELECTOR);
    await new Promise((r) => setTimeout(r, POST_IMAGE_DELAY_MS));

    const element = await page.$(CONTAINER_SELECTOR);
    if (!element) throw new Error('Container element not found');
    const buffer = await element.screenshot({
      type: 'png',
      omitBackground: false,
    });
    await element.dispose();
    if (!buffer) throw new Error('Screenshot returned empty');
    return Buffer.from(buffer);
  } finally {
    await page.close().catch(() => {});
  }
}

/** Close shared browser (call on app shutdown). */
export async function closeRenderBrowser(): Promise<void> {
  if (sharedBrowser) {
    try {
      await sharedBrowser.close();
    } catch (e) {
      logger.warn('Failed to close Puppeteer browser', e);
    }
    sharedBrowser = null;
  }
}

/** List supported template IDs (for API and validation). */
export function getSupportedTemplateIds(): string[] {
  return getTemplateIdsFromRegistry();
}
