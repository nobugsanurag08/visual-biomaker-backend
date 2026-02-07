import type { ProfileData } from '../types/editor';
import path from 'path';

/** Build CSS with asset base path (e.g. /templates/template-22 for HTTP serving). */
function getTemplate22Css(assetBase: string): string {
  const u = (file: string) => (assetBase ? `url('${assetBase}/${file}')` : `url('${file}')`);
  return `
body { margin: 0; padding: 0; }
.template22-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template22-container h1 { font-size: 2.5rem; font-family: "Great Vibes", cursive; font-weight: 700; }
.template22-container p { font-size: 0.75rem; font-family: "Poppins", sans-serif; }
.template22-container h2 { font-size: 1.3rem; letter-spacing: 0.2rem; font-weight: 200; }
.template22-container h3 { font-size: 1rem; font-family: "Roboto", sans-serif; }
.template22-container {
  white-space: pre-line; font-size: 13px; font-weight: 500; font-family: "Poppins", sans-serif;
  display: flex; flex-direction: column; width: 750px; min-height: 1057px; margin: 0;
  border-radius: 10px; background: radial-gradient(circle at 50% 50%, #0f8696, #0d7582, #0a626f);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); color: #ffcd96; position: relative; overflow: hidden;
}
.template22-container .pattern-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background-image: ${u('pattern.png')}; background-repeat: repeat; background-size: 200px 200px;
  opacity: 0.1; z-index: 1; border-radius: 10px; pointer-events: none;
}
.template22-container .border-box {
  overflow: hidden; min-height: 1032px; height: 100%; margin: 0; position: relative; z-index: 5;
}
.template22-container .corner-svg {
  position: absolute; width: 280px; height: 280px; opacity: 1; pointer-events: none;
  background-image: ${u('star.png')}; background-size: contain; background-repeat: no-repeat; background-position: center;
}
.template22-container .corner-top-left { top: -140px; left: -140px; transform: rotate(0deg); }
.template22-container .corner-top-right { top: -140px; right: -140px; transform: rotate(90deg); }
.template22-container .corner-bottom-left { bottom: -140px; left: -140px; transform: rotate(270deg); }
.template22-container .corner-bottom-right { bottom: -140px; right: -140px; transform: rotate(180deg); }
.template22-container .center-svg {
  position: absolute; width: 300px; height: 300px; z-index: 1; opacity: 0.4; pointer-events: none;
  background-image: ${u('star.png')}; background-size: contain; background-repeat: no-repeat; background-position: center;
}
.template22-container .center-top { top: -150px; left: 50%; transform: translateX(-50%) rotate(0deg); }
.template22-container .center-bottom { bottom: -150px; left: 50%; transform: translateX(-50%) rotate(180deg); }
.template22-container .center-ganesh {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; max-width: 400px;
  height: 30%; opacity: 0.4; z-index: 1; pointer-events: none;
  background-image: ${u('ganesh.svg')}; background-size: contain; background-repeat: no-repeat; background-position: center;
}
.template22-container .header {
  font-weight: bolder; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 1rem;
}
.template22-container .profile-image {
  margin-top: 1.5rem; margin-bottom: 1rem; width: 180px; height: 180px; border-radius: 50%; overflow: hidden;
  border: 3px solid #ffd38c; box-shadow: 0 0 15px rgba(255, 211, 140, 0.5); position: relative; z-index: 10;
}
.template22-container .profile-image img { width: 100%; height: 100%; object-fit: cover; }
.template22-container .content {
  padding: 0 1rem; padding-top: 1rem; display: flex; flex-direction: column; align-items: center; text-align: center; z-index: 10;
}
.template22-container .row { display: flex; flex-direction: row; gap: 1rem; justify-content: center; }
.template22-container .info-right { width: 70%; height: fit-content; position: relative; padding-bottom: 1rem; top: 0; }
.template22-container .personal { padding-top: 1rem; }
.template22-container .family { padding-top: 1rem; }
.template22-container .details {
  margin-top: 1rem; text-align: left; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; line-height: 1.6;
}
.template22-container .details div { display: contents; }
.template22-container .details span:first-child { padding-right: 2rem; font-weight: bold; }
.template22-container .details span:last-child { padding-right: 2rem; }
.template22-container .family-label { font-size: 13px; font-weight: 500; font-family: "Poppins", sans-serif; }
.template22-container .section-header {
  background-color: #ffd38c; padding: 0.15rem 0.5rem; width: fit-content; margin: 0 auto 1rem auto; border-radius: 50px; text-align: center;
}
.template22-container .section-header h3 { color: #33002a; margin: 0; font-weight: 600; letter-spacing: 3px; }
.template22-container .footer { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; margin: 1rem 0 0.5rem 0; }
.template22-container .contact-text { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
.template22-container .contact-icon { width: 15px; height: 15px; margin-right: 0.8rem; font-size: 13px; display: flex; align-items: center; }
.template22-container .contact-content { font-family: "Montserrat", sans-serif; font-size: 13px; }
.template22-container .contact-row { display: flex; flex-direction: row; align-items: center; }
`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface Template22HtmlOptions {
  /** Base URL for document (e.g. file:///path/). Optional. */
  baseURL?: string;
  /** Asset path prefix for CSS url() so images resolve (e.g. /templates/template-22). */
  assetBase?: string;
}

/** Build full HTML for template-22 (Sky Blossom) with profile data. */
export function buildTemplate22Html(
  profileData: ProfileData,
  options?: Template22HtmlOptions
): string {
  const assetBase = options?.assetBase ?? '';
  const css = getTemplate22Css(assetBase);
  const name = escapeHtml(profileData.name ?? '');
  const profileImage = profileData.profileImage
    ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage)
    : '';

  const profileDetailsHtml =
    profileData.profileDetails?.length &&
    profileData.profileDetails
      .filter((d) => d.value)
      .map(
        (d) =>
          `<div><span>${escapeHtml(d.label)}:</span><span>${escapeHtml(d.value)}</span></div>`
      )
      .join('') || '';

  const familyHtml =
    profileData.family?.length &&
    profileData.family
      .map(
        (f) =>
          `<div><span class="family-label">${escapeHtml(f.label)}:</span><span>${escapeHtml(f.description)}</span></div>`
      )
      .join('') || '';

  const contactIcons = ['fas fa-envelope', 'fas fa-map-marker-alt', 'fas fa-home'];
  const contactsHtml =
    profileData.contacts?.length &&
    profileData.contacts
      .map(
        (c, i) =>
          `<div class="contact-row"><div class="contact-icon"><i class="${contactIcons[i] ?? 'fa-regular fa-address-card'}"></i></div><p class="contact-content">${escapeHtml(c.value)}</p></div>`
      )
      .join('') || '';

  const baseURL = options?.baseURL;
  const baseTag = baseURL ? `\n  <base href="${baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=750">${baseTag}
  <title>Biodata</title>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@400;500;600&family=Roboto:wght@400;600&family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>${css}</style>
</head>
<body>
  <div class="template22-container" id="biodata-container">
    <div class="border-box">
      <div class="pattern-overlay"></div>
      <div class="corner-svg corner-top-left"></div>
      <div class="corner-svg corner-top-right"></div>
      <div class="corner-svg corner-bottom-left"></div>
      <div class="corner-svg corner-bottom-right"></div>
      <div class="center-svg center-top"></div>
      <div class="center-svg center-bottom"></div>
      <div class="center-ganesh"></div>
      <div class="header">
        ${name ? `<h1>${name}</h1>` : ''}
        ${profileImage ? `<div class="profile-image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile" /></div>` : ''}
      </div>
      <div class="content row">
        <div class="info-right">
          <div class="personal">
            <div class="section-header"><h3>PERSONAL DETAILS</h3></div>
            <div class="details">${profileDetailsHtml}</div>
          </div>
          ${familyHtml ? `<div class="family"><div class="section-header"><h3>FAMILY</h3></div><div class="details">${familyHtml}</div></div>` : ''}
          ${contactsHtml ? `<div class="footer"><div class="section-header"><h3 class="contact-title">CONTACT</h3></div><div class="contact-text">${contactsHtml}</div></div>` : ''}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/** Resolve absolute path to template-22 directory (for Puppeteer baseURL / file serving). */
export function getTemplate22Dir(): string {
  return path.join(process.cwd(), 'templates', 'template-22');
}
