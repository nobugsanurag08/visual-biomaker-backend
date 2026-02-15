import type { ProfileData } from '../types/editor';

/** Template 2 (Classical) – replica of FE Template2.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template2HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate2Css(): string {
  return `
body { margin: 0; padding: 0; }
.template2-container *, .template2-container *::after, .template2-container *::before { box-sizing: border-box; }
.template2-container { width: 100%; display: flex; justify-content: stretch; }
.template2-container .container { white-space: pre-line; margin: 0; padding: 0; font-size: 11px; font-family: Montserrat, sans-serif; display: flex; width: 100%; min-height: 1057px; border-radius: 10px; background: #e2dbdb; border: 1.2rem solid #b5b2b2; overflow: hidden; background-color: #882e2e; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
.template2-container .left, .template2-container .right { flex: 1; min-width: 0; background-color: #f5f5f5; padding: 20px; overflow-wrap: break-word; word-wrap: break-word; }
.template2-container .right .family-details, .template2-container .right .expectations { min-width: 0; overflow-wrap: break-word; }
.template2-container h1 { font-family: "Ubuntu", Roboto, sans-serif; font-optical-sizing: auto; font-size: 2rem; color: #333333; margin-bottom: 20px; margin-left: 1rem; font-weight: bold; letter-spacing: 0.3vw; text-transform: uppercase; margin-top: 1rem; line-height: 1; }
.template2-container h2 { font-family: "Ubuntu", Roboto, sans-serif; font-optical-sizing: auto; font-size: 1.4rem; margin-bottom: 10px; color: #8c6239; font-weight: bold; text-transform: uppercase; margin-top: 1rem; line-height: 1; }
.template2-container .details .detail-accent, .template2-container .details .detail-accent strong { color: #8c6239; font-weight: bold; }
.template2-container p { margin-bottom: 10px; color: #333333; line-height: 1.5; }
.template2-container .about p, .template2-container .expectations p { font-size: 0.80rem; }
.template2-container .details p, .template2-container .contact p { font-size: 0.95rem; color: #333333; }
.template2-container .contact p { margin-bottom: 0.5rem; }
.template2-container strong { color: #a58667; }
.template2-container .about, .template2-container .contact, .template2-container .details { margin-left: 1rem; margin-top: 2rem; }
.template2-container .image { width: 100%; text-align: center; margin-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; overflow: hidden; position: relative; }
.template2-container .image img { width: 100%; height: 100%; position: relative; object-fit: cover; filter: brightness(0.7); display: block; }
.template2-container .image::after { content: ''; position: absolute; bottom: 0.01rem; left: 0; width: 100%; height: 25%; background: rgba(0, 0, 0, 0.4); filter: brightness(0.6); pointer-events: none; }
.template2-container .family-details { display: grid; grid-template-columns: auto 1fr; row-gap: 10px; margin-top: 2rem; margin-right: 1rem; color: #333333; }
.template2-container .right > h2 { margin-top: 2rem; margin-right: 1rem; }
.template2-container .family-details div { display: contents; }
.template2-container .family-details span { padding-right: 24px; font-weight: bold; }
.template2-container .expectations { margin-top: 2rem; margin-right: 1rem; }
.template2-container .expectations p { color: #333333; }
.template2-container .contact-row { display: flex; align-items: center; }
`;
}

export function buildTemplate2Html(profileData: ProfileData, options?: Template2HtmlOptions): string {
  const css = getTemplate2Css();
  const name = escapeHtml(profileData.name ?? '');
  const about = escapeHtml(profileData.about ?? '');
  const profileImage = profileData.profileImage ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage) : '';
  const accentLabels = ['age', 'time'];
  const pdHtml = profileData.profileDetails?.filter((d) => d.value).map((d) => {
    const isAccent = accentLabels.includes((d.label || '').trim().toLowerCase());
    const cls = isAccent ? ' class="detail-accent"' : '';
    return `<div${cls}><p><strong>${escapeHtml(d.label)}:</strong> ${escapeHtml(d.value)}</p></div>`;
  }).join('') ?? '';
  const famHtml = profileData.family?.filter((f) => f.description).map((f) => `<div><span>${escapeHtml(f.label)}:</span> ${escapeHtml(f.description)}</div>`).join('') ?? '';
  const contactsHtml = profileData.contacts?.map((c) => `<div class="contact-row"><p class="contact-content">${escapeHtml(c.label)} : ${escapeHtml(c.value)}</p></div>`).join('') ?? '';
  const sectionsHtml = profileData.sections?.map((s) => `<div class="expectations"><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.description)}</p></div>`).join('') ?? '';
  const baseTag = options?.baseURL ? `\n  <base href="${options.baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=750">${baseTag}
<title>Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&family=Montserrat:wght@400;500&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="template2-container" id="biodata-container">
<div class="container">
<div class="left">
${name ? `<div><h1>${name}</h1></div>` : ''}
${about ? `<div class="about"><h2>About</h2><p>${about}</p></div>` : ''}
${pdHtml ? `<div class="details">${pdHtml}</div>` : ''}
${contactsHtml ? `<div class="contact"><h2>Contact</h2>${contactsHtml}</div>` : ''}
</div>
<div class="right">
${profileImage ? `<div class="image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Picture" /></div>` : ''}
${famHtml ? `<h2>Family</h2><div class="family-details">${famHtml}</div>` : ''}
${sectionsHtml}
</div>
</div>
</div>
</body>
</html>`;
}
