import type { ProfileData } from '../types/editor';

/** Template 4 (Indian Blue) – replica of FE Template4.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template4HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate4Css(assetBase: string): string {
  const bg = assetBase ? `url('${assetBase}/blue-background.jpg')` : 'none';
  return `
body { margin: 0; padding: 0; }
.template4-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template4-container { width: 100%; display: flex; justify-content: stretch; }
.template4-container .container { white-space: pre-line; margin: 0; padding: 0; width: 100%; min-height: 1057px; border-radius: 10px; background-image: ${bg}; background-size: 100% 100%; background-position: center; background-clip: border-box; opacity: 0.9; color: hsl(30, 91%, 75%); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
.template4-container h1, .template4-container h2, .template4-container h3 { font-family: Roboto, sans-serif; font-optical-sizing: auto; font-weight: 500; }
.template4-container h1 { font-size: 1.8rem; }
.template4-container h2 { font-size: 1.3rem; margin-bottom: 1rem; }
.template4-container h3 { font-size: 1rem; }
.template4-container .header { padding-top: 2.5rem; font-weight: bolder; text-align: center; }
.template4-container .main { width: 90%; margin: 0 auto; }
.template4-container .sub-header { font-weight: bolder; text-align: center; }
.template4-container .row { padding-top: 1rem; display: flex; flex-direction: row; gap: 0; }
.template4-container .right { width: 30%; margin: 1rem; font-size: 12px; background-color: transparent; }
.template4-container .left { width: 60%; font-size: 12px; }
.template4-container .info { margin: 1rem; display: flex; flex-direction: column; }
.template4-container .contact { text-align: center; }
.template4-container .expectations, .template4-container .about, .template4-container .family { margin: 1rem; line-height: 1rem; }
.template4-container .details { margin: 1rem; font-size: 11px; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; }
.template4-container .details div { display: contents; }
.template4-container .details span { padding-right: 2rem; font-weight: bold; }
.template4-container .image { background-color: transparent; width: 95%; height: 42%; min-height: 280px; text-align: center; margin: 1rem; overflow: hidden; position: relative; border-radius: 5px; }
.template4-container .image img { width: 100%; height: 100%; min-height: 280px; position: relative; object-fit: cover; filter: brightness(0.7); display: block; }
.template4-container .profile-details { font-size: 12px; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; }
.template4-container .profile-details div { display: contents; }
.template4-container .profile-details span { padding-right: 24px; font-weight: bold; }
`;
}

export function buildTemplate4Html(profileData: ProfileData, options?: Template4HtmlOptions): string {
  const assetBase = options?.assetBase ?? '';
  const css = getTemplate4Css(assetBase);
  const name = escapeHtml(profileData.name ?? '');
  const about = escapeHtml(profileData.about ?? '');
  const profileImage = profileData.profileImage ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage) : '';
  const pdHtml = profileData.profileDetails?.filter((d) => d.value).map((d) => `<div><span>${escapeHtml(d.label)}:</span> ${escapeHtml(d.value)}</div>`).join('') ?? '';
  const famHtml = profileData.family?.filter((f) => f.description).map((f) => `<div><span>${escapeHtml(f.label)}:</span> ${escapeHtml(f.description)}</div>`).join('') ?? '';
  const sectionsHtml = profileData.sections?.map((s) => `<div class="expectations"><h2>${escapeHtml(s.title)} :—</h2><p>${escapeHtml(s.description)}</p></div>`).join('') ?? '';
  const contactsHtml = profileData.contacts?.map((c) => `<div class="contact-row"><p class="contact-content">${escapeHtml(c.label)} : ${escapeHtml(c.value)}</p></div>`).join('') ?? '';
  const baseTag = options?.baseURL ? `\n  <base href="${options.baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=750">${baseTag}
<title>Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="template4-container" id="biodata-container">
<div class="container">
<div class="header"><h3>ॐ गणेशाय नमः:</h3></div>
<main class="main">
<div class="sub-header">${name ? `<h1>${name}</h1>` : ''}</div>
<div class="row">
<div class="info left">
${about ? `<div class="about"><h2>ABOUT :—</h2><p>${about}</p></div>` : ''}
${pdHtml ? `<div class="details">${pdHtml}</div>` : ''}
${famHtml ? `<div class="family"><h2>Family:—</h2><div class="profile-details">${famHtml}</div></div>` : ''}
</div>
<div class="right">
${profileImage ? `<div class="image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Picture" /></div>` : ''}
${sectionsHtml}
</div>
</div>
${contactsHtml ? `<div class="contact"><h2>—: Contact :—</h2>${contactsHtml}</div>` : ''}
</main>
</div>
</div>
</body>
</html>`;
}
