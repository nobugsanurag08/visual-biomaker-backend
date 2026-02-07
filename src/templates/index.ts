import type { ProfileData } from '../types/editor';
import { buildTemplate1Html } from './template1Html';
import { buildTemplate2Html } from './template2Html';
import { buildTemplate3Html } from './template3Html';
import { buildTemplate4Html } from './template4Html';
import { buildTemplate5Html } from './template5Html';
import { buildTemplate6Html } from './template6Html';
import { buildTemplate7Html } from './template7Html';
import { buildTemplate8Html } from './template8Html';
import { buildTemplate9Html } from './template9Html';
import { buildTemplate10Html } from './template10Html';
import { buildTemplate11Html } from './template11Html';
import { buildTemplate12Html } from './template12Html';
import { buildTemplate13Html } from './template13Html';
import { buildTemplate14Html } from './template14Html';
import { buildTemplate15Html } from './template15Html';
import { buildTemplate16Html } from './template16Html';
import { buildTemplate17Html } from './template17Html';
import { buildTemplate21Html } from './template21Html';
import { buildTemplate22Html } from './template22Html';

/** Options passed to template HTML builders (base URL and asset path for images). */
export interface TemplateHtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

/** Map templateId (label or type) to canonical template key for builder lookup. */
const LABEL_AND_ALIAS_TO_CANONICAL: Record<string, string> = {
  'Purple Bee': 'template1',
  template1: 'template1',
  'template-1': 'template1',
  Classical: 'template2',
  template2: 'template2',
  'template-2': 'template2',
  'Blue Berry': 'template3',
  template3: 'template3',
  'template-3': 'template3',
  'Indian Blue': 'template4',
  template4: 'template4',
  'template-4': 'template4',
  'Indian Violet': 'template5',
  template5: 'template5',
  'template-5': 'template5',
  'Velvet Vows': 'template6',
  template6: 'template6',
  'template-6': 'template6',
  'Green Lotus': 'template7',
  template7: 'template7',
  'template-7': 'template7',
  'Mint Blossom': 'template8',
  template8: 'template8',
  'template-8': 'template8',
  'Ivory Lines': 'template9',
  template9: 'template9',
  'template-9': 'template9',
  Minimalist: 'template10',
  template10: 'template10',
  'template-10': 'template10',
  Frostline: 'template11',
  template11: 'template11',
  'template-11': 'template11',
  'Charcoal Grace': 'template12',
  template12: 'template12',
  'template-12': 'template12',
  'Clean Slate': 'template13',
  template13: 'template13',
  'template-13': 'template13',
  'Regal Varnika': 'template14',
  template14: 'template14',
  'template-14': 'template14',
  'Royal Red': 'template15',
  template15: 'template15',
  'template-15': 'template15',
  'Floral Grace': 'template16',
  template16: 'template16',
  'template-16': 'template16',
  'Peach Pearl': 'template17',
  template17: 'template17',
  'template-17': 'template17',
  'Regal Anvika': 'template21',
  template21: 'template21',
  'template-21': 'template21',
  'Sky Blossom': 'template22',
  template22: 'template22',
  'template-22': 'template22',
};

type BuilderFn = (
  profileData: ProfileData,
  options?: TemplateHtmlOptions
) => string;

const BUILDERS: Record<string, BuilderFn> = {
  template1: buildTemplate1Html,
  template2: buildTemplate2Html,
  template3: buildTemplate3Html,
  template4: buildTemplate4Html,
  template5: buildTemplate5Html,
  template6: buildTemplate6Html,
  template7: buildTemplate7Html,
  template8: buildTemplate8Html,
  template9: buildTemplate9Html,
  template10: buildTemplate10Html,
  template11: buildTemplate11Html,
  template12: buildTemplate12Html,
  template13: buildTemplate13Html,
  template14: buildTemplate14Html,
  template15: buildTemplate15Html,
  template16: buildTemplate16Html,
  template17: buildTemplate17Html,
  template21: buildTemplate21Html,
  template22: buildTemplate22Html,
};

/**
 * Normalize templateId (label or type) to canonical key, or null if unsupported.
 */
export function normalizeTemplateId(templateId: string): string | null {
  const key = templateId?.trim();
  if (!key) return null;
  return LABEL_AND_ALIAS_TO_CANONICAL[key] ?? null;
}

/**
 * Build full HTML for a template. Returns HTML string or null if templateId is unsupported.
 */
export function getTemplateHtml(
  templateId: string,
  profileData: ProfileData,
  options?: TemplateHtmlOptions
): string | null {
  const canonical = normalizeTemplateId(templateId);
  if (!canonical) return null;
  const builder = BUILDERS[canonical];
  if (!builder) return null;
  return builder(profileData, options);
}

/**
 * List all supported template IDs (canonical types + labels) for API docs and validation.
 */
export function getSupportedTemplateIds(): string[] {
  const uniq = new Set<string>();
  Object.keys(LABEL_AND_ALIAS_TO_CANONICAL).forEach((id) => uniq.add(id));
  return [...uniq].sort();
}
