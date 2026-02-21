import type { ProfileData } from '../types/editor';

/** Template 17 (Peach Pearl) – replica of FE Template17.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template17HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate17Css(assetBase: string): string {
  const u = (f: string) => (assetBase ? `url('${assetBase}/${f}')` : 'none');
  return `
html, body { margin: 0; padding: 0; }
.template17-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template17-container { font-size: 13px; font-weight: 500; font-family: Poppins, sans-serif; display: flex; flex-direction: column; width: 100%; min-height: 1057px; margin: 0; border-radius: 10px; background-image: ${u('template17bg.webp')}; background-repeat: no-repeat; background-size: cover; background-position: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); color: #d45e16; position: relative; }
.template17-container p, .template17-container .contact-content, .template17-container .details { white-space: pre-line; }
.template17-container .border-box { overflow: hidden; min-height: 1032px; height: 100%; margin: 0; position: relative; background-color: rgba(255, 255, 255, 0.7); backdrop-filter: blur(4px); }
.template17-container .star-svg { position: absolute; width: 600px; height: 600px; opacity: 0.3; pointer-events: none; background-size: contain; background-repeat: no-repeat; background-position: center; background-image: ${u('template_17Star.png')}; }
.template17-container .star-svg.left-center { left: -450px; transform: translateY(250px); }
.template17-container .star-svg.right-center { right: -450px; transform: translateY(250px); }
.template17-container .center-svg { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 330px; height: 30%; opacity: 0.15; pointer-events: none; background-image: ${u('Ganeshji_t17.svg')}; background-size: contain; background-repeat: no-repeat; background-position: center; }
.template17-container .header { margin: 0 auto; width: 70%; font-weight: bolder; display: flex; gap: 50px; align-items: center; margin-top: 0; }
.template17-container .header h1 { font-size: 2.5rem; font-family: "Cinzel Decorative", cursive; font-weight: 700; color: #d45e16; }
.template17-container .profile-image { margin-top: 1.5rem; margin-bottom: 1rem; width: 180px; height: 180px; border-radius: 50%; overflow: hidden; border: 3px solid #ffd38c; box-shadow: 0 0 15px rgba(255, 211, 140, 0.5); position: relative; z-index: 10; flex-shrink: 0; }
.template17-container .profile-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.template17-container .content { padding: 0 5rem; padding-top: 1rem; display: flex; flex-direction: column; align-items: center; text-align: center; }
.template17-container .row { display: flex; flex-direction: row; gap: 1rem; justify-content: center; }
.template17-container .info-right { width: 70%; height: fit-content; position: relative; padding-bottom: 1rem; top: 0; }
.template17-container .personal { padding-top: 1rem; }
.template17-container .family { padding-top: 1rem; }
.template17-container .details { margin-top: 1rem; text-align: left; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; line-height: 1.6; }
.template17-container .details div { display: contents; }
.template17-container .details span { padding-right: 2rem; font-weight: 700; }
.template17-container .family-label { font-size: 13px; font-weight: 500; font-family: Poppins, sans-serif; }
.template17-container .section-header { padding: 0.15rem 0.5rem; width: fit-content; margin: 0 auto 1rem auto; text-align: center; }
.template17-container .section-header h3 { margin: 0; font-weight: 600; letter-spacing: 3px; text-decoration: underline; text-decoration-style: double; text-underline-offset: 6px; font-size: 1rem; font-family: Roboto, sans-serif; color: #d45e16; }
.template17-container .footer { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; margin: 1rem 0 0.5rem 0; }
.template17-container .contact-text { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
.template17-container .contact-icon { width: 15px; height: 15px; margin-right: 0.8rem; font-size: 13px; display: flex; align-items: center; }
.template17-container .contact-content { font-family: Montserrat, sans-serif; font-size: 13px; }
.template17-container .contact-row { display: flex; flex-direction: row; align-items: center; }
.template17-container p { font-size: 0.75rem; font-family: Poppins, sans-serif; }
`;
}

export function buildTemplate17Html(profileData: ProfileData, options?: Template17HtmlOptions): string {
  const assetBase = options?.assetBase ?? '';
  const css = getTemplate17Css(assetBase);
  const name = escapeHtml(profileData.name ?? '');
  const profileImage = profileData.profileImage ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage) : '';
  const contactIcons = ['fas fa-envelope', 'fas fa-map-marker-alt', 'fas fa-home'];
  const pdHtml = profileData.profileDetails?.filter((d) => d.value).map((d) => `<div><span>${escapeHtml(d.label)}:</span><span>${escapeHtml(d.value)}</span></div>`).join('') ?? '';
  const famHtml = profileData.family?.map((f) => `<div><span class="family-label">${escapeHtml(f.label)}:</span><span>${escapeHtml(f.description)}</span></div>`).join('') ?? '';
  const contactsHtml = profileData.contacts?.map((c, i) => `<div class="contact-row"><div class="contact-icon"><i class="${contactIcons[i] ?? 'fa-regular fa-address-card'}"></i></div><p class="contact-content">${escapeHtml(c.value)}</p></div>`).join('') ?? '';
  const baseTag = options?.baseURL ? `\n  <base href="${options.baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">${baseTag}
<title>Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Poppins:wght@400;500&family=Roboto:wght@400;600&family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>${css}</style>
</head>
<body>
<div class="template17-container" id="biodata-container">
<div class="border-box">
<div class="star-svg left-center"></div>
<div class="star-svg right-center"></div>
<div class="center-svg center"></div>
<div class="header">
${profileImage ? `<div class="profile-image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Image" width="180" height="180" /></div>` : ''}
${name ? `<h1>${name}</h1>` : ''}
</div>
<div class="content row">
<div class="info-right">
<div class="personal">
<div class="section-header"><h3>PERSONAL DETAILS</h3></div>
${pdHtml ? `<div class="details">${pdHtml}</div>` : ''}
</div>
${famHtml ? `<div class="family"><div class="section-header"><h3>FAMILY</h3></div><div class="details">${famHtml}</div></div>` : ''}
${contactsHtml ? `<div class="footer"><div class="section-header"><h3 class="contact-title">CONTACT</h3></div><div class="contact-text">${contactsHtml}</div></div>` : ''}
</div>
</div>
</div>
</div>
</body>
</html>`;
}
