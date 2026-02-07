import type { ProfileData } from '../types/editor';

/** Template 9 (Ivory Lines) – replica of FE Template9.tsx. Layout: left=about+details+family, right=image+sections+contacts */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template9HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate9Css(assetBase: string): string {
  const u = (f: string) => (assetBase ? `url('${assetBase}/${f}')` : 'none');
  return `
body { margin: 0; padding: 0; }
.template9-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template9-container { white-space: pre-line; font-size: 13px; font-weight: 450; font-family: Poppins, sans-serif; display: flex; flex-direction: column; width: 100%; min-height: 1057px; margin: 0; border-radius: 10px; background-image: ${u('background.jpg')}; background-size: 100% 100%; background-position: center; background-clip: border-box; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); color: #596c86; overflow: hidden; position: relative; opacity: 0.8; }
.template9-container .section-title { text-transform: uppercase; }
.template9-container .border-box { z-index: 10; min-height: 1047px; height: 100%; margin: 0; position: relative; }
.template9-container .corner-svg { position: absolute; background-repeat: no-repeat; background-size: contain; background-position: center; pointer-events: none; }
.template9-container .corner-top-right { top: -30px; right: -130px; width: 350px; height: 350px; transform: rotate(-14deg); z-index: 0; opacity: 0.08; background-image: ${u('flower-2.png')}; }
.template9-container .corner-bottom-left { bottom: -22px; left: -12px; width: 230px; height: 230px; transform: rotate(10deg); z-index: 0; opacity: 0.08; background-image: ${u('flower-1.png')}; }
.template9-container .corner-bottom-left-2 { bottom: -24px; left: 100px; width: 230px; height: 230px; transform: rotate(4deg); z-index: 0; opacity: 0.08; background-image: ${u('flower-3.png')}; }
.template9-container h1 { font-family: Great Vibes, cursive; font-size: 75px; font-weight: 700; color: #31496a; }
.template9-container h2 { font-size: 1.3rem; font-family: Cormorant Garamond, serif; color: #31496a; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; }
.template9-container h3 { font-size: 1rem; }
.template9-container p { font-family: Poppins, sans-serif; }
.template9-container .header { color: #31496a; margin: -20px 1rem 1rem 1rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
.template9-container .content { padding: 0 1rem; }
.template9-container .row { display: flex; flex-direction: row; gap: 1.5rem; }
.template9-container .info-left { width: 60%; height: fit-content; }
.template9-container .info-right { width: 32%; margin: 1rem; height: fit-content; }
.template9-container .section { margin-top: 2.5rem; }
.template9-container .section-text { margin-top: 0.575rem; }
.template9-container .about { margin-top: 1rem; }
.template9-container .about-text { margin-top: 0.75rem; }
.template9-container .family { margin-top: 2.5rem; }
.template9-container .details { margin-top: 1rem; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; line-height: 1.6; }
.template9-container .details div { display: contents; }
.template9-container .details span:first-child { padding-right: 2rem; font-weight: bold; }
.template9-container .details span:last-child { padding-right: 2rem; }
.template9-container .profile-image { width: 95%; max-height: 250px; border-radius: 5px; overflow: hidden; position: relative; margin-bottom: 1rem; }
.template9-container .profile-image img { width: 100%; height: 100%; object-fit: cover; }
.template9-container .personal { margin-top: 2.5rem; }
.template9-container .footer { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 0; margin: 2.5rem 0 0.5rem 0; }
.template9-container .contact-text { margin: 1rem 0; display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; }
.template9-container .contact-icon { width: 15px; height: 15px; margin-right: 0.8rem; font-size: 0.75rem; display: flex; align-items: center; }
.template9-container .contact-row { display: flex; flex-direction: row; align-items: center; }
`;
}

export function buildTemplate9Html(profileData: ProfileData, options?: Template9HtmlOptions): string {
  const assetBase = options?.assetBase ?? '';
  const css = getTemplate9Css(assetBase);
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
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@400;500&family=Cormorant+Garamond:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>${css}</style>
</head>
<body>
<div class="template9-container" id="biodata-container">
<div class="border-box">
<div class="corner-svg corner-top-right"></div>
<div class="corner-svg corner-bottom-left"></div>
<div class="corner-svg corner-bottom-left-2"></div>
<div class="header">${name ? `<h1>${name}</h1>` : ''}</div>
<div class="content row">
<div class="info-left">
${about ? `<div class="about"><h2>ABOUT</h2><p class="about-text">${about}</p></div>` : ''}
${pdHtml ? `<div class="details personal">${pdHtml}</div>` : ''}
${famHtml ? `<div class="family"><h2>FAMILY</h2><div class="details">${famHtml}</div></div>` : ''}
</div>
<div class="info-right">
${profileImage ? `<div class="profile-image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Image" style="object-fit:cover" /></div>` : ''}
${sectionsHtml}
${contactsHtml ? `<div class="footer"><h2 class="contact-title">CONTACTS</h2><div class="contact-text">${contactsHtml}</div></div>` : ''}
</div>
</div>
</div>
</div>
</body>
</html>`;
}
