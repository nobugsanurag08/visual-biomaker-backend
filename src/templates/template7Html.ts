import type { ProfileData } from '../types/editor';

/** Template 7 (Green Lotus) – replica of FE Template7.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template7HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate7Css(assetBase: string): string {
  const u = (f: string) => (assetBase ? `url('${assetBase}/${f}')` : 'none');
  return `
body { margin: 0; padding: 0; }
.template7-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template7-container { white-space: pre-line; font-size: 12px; font-weight: 500; font-family: Roboto, Inter, sans-serif; display: flex; flex-direction: column; width: 100%; min-height: 1057px; margin: 0; border-radius: 10px; background-image: ${u('green_background.png')}; background-size: 100% 100%; background-position: center; opacity: 0.9; background-clip: border-box; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); color: hsl(30, 91%, 75%); position: relative; }
.template7-container .section-title { text-transform: uppercase; }
.template7-container .border-box { min-height: 1047px; height: 100%; border: 6px solid hsl(30, 91%, 75%); margin: 0; position: relative; z-index: 1; }
.template7-container .lotus-svg { position: absolute; width: 400px; height: 400px; top: 40%; right: 50px; opacity: 0.80; z-index: 0; pointer-events: none; background-repeat: no-repeat; background-size: contain; background-position: center; background-image: ${u('om.svg')}; }
.template7-container .corner-svg { position: absolute; width: 100px; height: 100px; background-repeat: no-repeat; background-size: contain; background-image: ${u('corner-1-small.svg')}; pointer-events: none; }
.template7-container .corner-top-left { top: 10px; left: 10px; transform: rotate(90deg); }
.template7-container .corner-top-right { top: 10px; right: 10px; transform: rotate(-180deg); }
.template7-container .corner-bottom-left { bottom: 10px; left: 10px; transform: rotate(0deg); }
.template7-container .corner-bottom-right { bottom: 10px; right: 10px; transform: rotate(-90deg); }
.template7-container .icon { width: 40px; height: 40px; margin-bottom: 0.5rem; position: relative; background-image: ${u('upper.svg')}; background-size: contain; background-repeat: no-repeat; }
.template7-container h1 { font-size: 2rem; color: hsl(30, 91%, 75%); }
.template7-container h2 { font-size: 1.3rem; color: hsl(30, 91%, 75%); }
.template7-container h3 { font-size: 1rem; }
.template7-container .header { margin: 0 1rem 1rem 1rem; font-weight: bolder; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.template7-container .content { padding: 0 1rem; }
.template7-container .row { display: flex; flex-direction: row; gap: 1.5rem; }
.template7-container .info-left { width: 32%; margin: 1rem; height: fit-content; }
.template7-container .info-right { width: 60%; height: fit-content; }
.template7-container .section { margin-top: 2.5rem; }
.template7-container .section-text { margin-top: 0.575rem; }
.template7-container .about { margin-top: 2rem; }
.template7-container .about-text { margin-top: 0.75rem; }
.template7-container .family { margin-top: 2.5rem; }
.template7-container .details { margin-top: 1rem; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; line-height: 1.6; }
.template7-container .details div { display: contents; }
.template7-container .details span:first-child { padding-right: 2rem; font-weight: bold; }
.template7-container .details span:last-child { padding-right: 2rem; }
.template7-container .profile-image { width: 95%; max-height: 250px; border-radius: 5px; overflow: hidden; position: relative; margin-bottom: 1rem; }
.template7-container .profile-image img { width: 100%; height: 100%; object-fit: cover; }
.template7-container .personal { margin-top: 2.5rem; }
.template7-container .footer { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; margin: 1.5rem 0 0.5rem 0; }
.template7-container .contact-text { margin: 1rem 0; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
.template7-container .contact-icon { width: 15px; height: 15px; margin-right: 0.8rem; font-size: 0.75rem; display: flex; align-items: center; }
.template7-container .contact-row { display: flex; flex-direction: row; align-items: center; }
`;
}

export function buildTemplate7Html(profileData: ProfileData, options?: Template7HtmlOptions): string {
  const assetBase = options?.assetBase ?? '';
  const css = getTemplate7Css(assetBase);
  const name = escapeHtml(profileData.name ?? '');
  const about = escapeHtml(profileData.about ?? '');
  const profileImage = profileData.profileImage ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage) : '';
  const contactIcons = ['fas fa-envelope', 'fas fa-map-marker-alt', 'fas fa-home'];
  const pdHtml = profileData.profileDetails?.filter((d) => d.value).map((d) => `<div><span>${escapeHtml(d.label)}:</span><span>${escapeHtml(d.value)}</span></div>`).join('') ?? '';
  const famHtml = profileData.family?.map((f) => `<div><span>${escapeHtml(f.label)}:</span><span>${escapeHtml(f.description)}</span></div>`).join('') ?? '';
  const sectionsHtml = profileData.sections?.map((s) => `<div class="section"><h2 class="section-title">${escapeHtml(s.title)}</h2><p class="section-text">${escapeHtml(s.description)}</p></div>`).join('') ?? '';
  const contactsHtml = profileData.contacts?.map((c, i) => `<div class="contact-row"><div class="contact-icon"><i class="${contactIcons[i] ?? 'fa-regular fa-address-card'}"></i></div><p class="contact-content">${escapeHtml(c.value)}</p></div>`).join('') ?? '';
  const baseTag = options?.baseURL ? `\n  <base href="${options.baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=750">${baseTag}
<title>Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>${css}</style>
</head>
<body>
<div class="template7-container" id="biodata-container">
<div class="border-box">
<div class="corner-svg corner-top-left"></div>
<div class="corner-svg corner-top-right"></div>
<div class="corner-svg corner-bottom-left"></div>
<div class="corner-svg corner-bottom-right"></div>
<div class="lotus-svg"></div>
<div class="header"><div class="icon"></div>${name ? `<h1>${name}</h1>` : ''}</div>
<div class="content row">
<div class="info-left">
${profileImage ? `<div class="profile-image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Image" style="object-fit:cover" /></div>` : ''}
${sectionsHtml}
${contactsHtml ? `<div class="footer"><h2 class="contact-title">Contacts</h2><div class="contact-text">${contactsHtml}</div></div>` : ''}
</div>
<div class="info-right">
${about ? `<div class="about"><h2>ABOUT</h2><p class="about-text">${about}</p></div>` : ''}
${pdHtml ? `<div class="details personal">${pdHtml}</div>` : ''}
${famHtml ? `<div class="family"><h2>FAMILY</h2><div class="details">${famHtml}</div></div>` : ''}
</div>
</div>
</div>
</div>
</body>
</html>`;
}
