import type { ProfileData } from '../types/editor';

/** Template 10 (Minimalist) – replica of FE Template10.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template10HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate10Css(): string {
  return `
body { margin: 0; padding: 0; }
.template10-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template10-container { white-space: pre-line; font-size: 12px; font-weight: 450; letter-spacing: 0.8px; font-family: Poppins, sans-serif; display: flex; flex-direction: column; width: 100%; min-height: 1057px; margin: 0; border-radius: 10px; background-color: #f8f4ef; opacity: 1; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); color: #373434; }
.template10-container .section-title { text-transform: uppercase; }
.template10-container .border-box { z-index: 10; min-height: 1047px; height: 100%; margin: 0; position: relative; }
.template10-container h1 { font-family: Great Vibes, cursive; font-size: 70px; font-weight: 400; color: #373434; }
.template10-container h2 { font-size: 1.3rem; font-family: "Times New Roman", serif; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #373434; }
.template10-container h3 { font-size: 1rem; }
.template10-container p { font-family: Poppins, sans-serif; }
.template10-container .header { margin: 1rem; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.template10-container .content { padding: 0 1rem; }
.template10-container .row { display: flex; flex-direction: row; gap: 1.5rem; }
.template10-container .info-left { width: 32%; margin: 1rem; height: fit-content; }
.template10-container .info-right { width: 60%; height: fit-content; }
.template10-container .section { margin-top: 2.5rem; }
.template10-container .section-text { margin-top: 0.575rem; }
.template10-container .about { margin-top: 1rem; }
.template10-container .about-text { margin-top: 0.75rem; }
.template10-container .family { margin-top: 2.5rem; }
.template10-container .details { margin-top: 1rem; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; line-height: 1.6; }
.template10-container .details div { display: contents; }
.template10-container .details span:first-child { padding-right: 2rem; font-weight: bold; }
.template10-container .details span:last-child { padding-right: 2rem; }
.template10-container .profile-image { width: 95%; max-height: 250px; border-radius: 5px; overflow: hidden; position: relative; margin-bottom: 1rem; }
.template10-container .profile-image img { width: 100%; height: 100%; object-fit: cover; }
.template10-container .personal { margin-top: 2.5rem; }
.template10-container .footer { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 0; margin: 2.5rem 0 0.5rem 0; }
.template10-container .contact-text { margin: 1rem 0; display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; }
.template10-container .contact-icon { width: 15px; height: 15px; margin-right: 0.8rem; font-size: 0.75rem; display: flex; align-items: center; }
.template10-container .contact-row { display: flex; flex-direction: row; align-items: center; }
`;
}

export function buildTemplate10Html(profileData: ProfileData, options?: Template10HtmlOptions): string {
  const css = getTemplate10Css();
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
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>${css}</style>
</head>
<body>
<div class="template10-container" id="biodata-container">
<div class="border-box">
<div class="header">${name ? `<h1>${name}</h1>` : ''}</div>
<div class="content row">
<div class="info-left">
${profileImage ? `<div class="profile-image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Image" style="object-fit:cover" /></div>` : ''}
${sectionsHtml}
${contactsHtml ? `<div class="footer"><h2 class="contact-title">CONTACTS</h2><div class="contact-text">${contactsHtml}</div></div>` : ''}
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
