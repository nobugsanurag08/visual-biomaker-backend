import type { ProfileData } from '../types/editor';

/** Template 14 (Regal Varnika) – replica of FE Template14.tsx. Centered header + single column content like 21/22 */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template14HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate14Css(assetBase: string): string {
  const u = (f: string) => (assetBase ? `url('${assetBase}/${f}')` : 'none');
  return `
html, body { margin: 0; padding: 0; }
.template14-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template14-container { font-size: 13px; font-weight: 500; font-family: Poppins, sans-serif; display: flex; flex-direction: column; width: 100%; min-height: 1057px; margin: 0; border-radius: 10px; background-color: #33002a; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); color: #ffd38c; position: relative; overflow: hidden; }
.template14-container p, .template14-container .contact-content, .template14-container .details { white-space: pre-line; }
.template14-container .border-box { overflow: hidden; min-height: 1032px; height: 100%; margin: 0; position: relative; z-index: 5; }
.template14-container .corner-svg { position: absolute; width: 280px; height: 280px; opacity: 0.9; pointer-events: none; background-image: ${u('star.png')}; background-size: contain; background-repeat: no-repeat; background-position: center; }
.template14-container .corner-top-left { top: -140px; left: -140px; transform: rotate(0deg); }
.template14-container .corner-top-right { top: -140px; right: -140px; transform: rotate(90deg); }
.template14-container .corner-bottom-left { bottom: -140px; left: -140px; transform: rotate(270deg); }
.template14-container .corner-bottom-right { bottom: -140px; right: -140px; transform: rotate(180deg); }
.template14-container .center-svg { position: absolute; width: 300px; height: 300px; opacity: 0.2; pointer-events: none; background-image: ${u('star.png')}; background-size: contain; background-repeat: no-repeat; background-position: center; }
.template14-container .center-top { top: -150px; left: 50%; transform: translateX(-50%) rotate(0deg); }
.template14-container .center-bottom { bottom: -150px; left: 50%; transform: translateX(-50%) rotate(180deg); }
.template14-container .center-decoration { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; height: 30%; max-height: 300px; opacity: 0.2; z-index: 1; pointer-events: none; background-image: ${u('ganesh.svg')}; background-size: contain; background-repeat: no-repeat; background-position: center; }
.template14-container .header { font-weight: bolder; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 0; }
.template14-container .header h1 { font-size: 2.5rem; font-family: "Great Vibes", cursive; font-weight: 700; color: #ffd38c; }
.template14-container .profile-image { margin-top: 1.5rem; margin-bottom: 1rem; width: 180px; height: 180px; border-radius: 50%; overflow: hidden; border: 3px solid #ffd38c; box-shadow: 0 0 15px rgba(255, 211, 140, 0.5); position: relative; z-index: 10; }
.template14-container .profile-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.template14-container .content { padding: 0 1rem; padding-top: 1rem; display: flex; flex-direction: column; align-items: center; text-align: center; z-index: 10; position: relative; }
.template14-container .row { display: flex; flex-direction: row; gap: 1rem; justify-content: center; }
.template14-container .info-right { width: 70%; height: fit-content; position: relative; padding-bottom: 1rem; top: 0; }
.template14-container .personal { padding-top: 1rem; }
.template14-container .family { padding-top: 1rem; }
.template14-container .details { margin-top: 1rem; text-align: left; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; line-height: 1.6; }
.template14-container .details div { display: contents; }
.template14-container .details span:first-child { padding-right: 2rem; font-weight: bold; }
.template14-container .details span:last-child { padding-right: 2rem; }
.template14-container .family-label { font-size: 13px; font-weight: 500; font-family: Poppins, sans-serif; }
.template14-container .section-header { background-color: #ffd38c; padding: 0.15rem 0.5rem; width: fit-content; margin: 0 auto 1rem auto; border-radius: 50px; text-align: center; }
.template14-container .section-header h3 { color: #33002a; margin: 0; font-weight: 600; letter-spacing: 3px; font-size: 1rem; font-family: Roboto, sans-serif; }
.template14-container .footer { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; margin: 1rem 0 0.5rem 0; }
.template14-container .contact-text { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
.template14-container .contact-icon { width: 15px; height: 15px; margin-right: 0.8rem; font-size: 13px; display: flex; align-items: center; }
.template14-container .contact-content { font-family: Montserrat, sans-serif; font-size: 13px; }
.template14-container .contact-row { display: flex; flex-direction: row; align-items: center; }
.template14-container p { font-size: 0.75rem; font-family: Poppins, sans-serif; }
`;
}

export function buildTemplate14Html(profileData: ProfileData, options?: Template14HtmlOptions): string {
  const assetBase = options?.assetBase ?? '';
  const css = getTemplate14Css(assetBase);
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
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@400;500&family=Roboto:wght@400;600&family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>${css}</style>
</head>
<body>
<div class="template14-container" id="biodata-container">
<div class="border-box">
<div class="corner-svg corner-top-left"></div>
<div class="corner-svg corner-top-right"></div>
<div class="corner-svg corner-bottom-left"></div>
<div class="corner-svg corner-bottom-right"></div>
<div class="center-svg center-top"></div>
<div class="center-svg center-bottom"></div>
<div class="center-decoration"></div>
<div class="header">
${name ? `<h1>${name}</h1>` : ''}
${profileImage ? `<div class="profile-image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Image" width="180" height="180" /></div>` : ''}
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
