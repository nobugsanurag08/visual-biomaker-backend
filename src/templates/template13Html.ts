import type { ProfileData } from '../types/editor';

/** Template 13 (Clean Slate) – replica of FE Template13.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template13HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate13Css(): string {
  return `
body { margin: 0; padding: 0; }
.template13-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template13-container { font-size: 12px; font-weight: 500; font-family: Poppins, sans-serif; display: flex; flex-direction: column; width: 100%; min-height: 1057px; margin: 0; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); color: #333; }
.template13-container p, .template13-container .contact-content, .template13-container .details { white-space: pre-line; }
.template13-container .section-title { text-transform: uppercase; letter-spacing: 0.2rem; font-weight: bold; }
.template13-container h1 { font-size: 2.3rem; font-family: "Helvetica Neue", Arial, sans-serif; font-weight: bold; color: #333; letter-spacing: 0.3rem; text-transform: uppercase; }
.template13-container h2 { font-size: 1.3rem; font-family: "Helvetica Neue", Arial, sans-serif; letter-spacing: 0.2rem; font-weight: bold; color: #333; }
.template13-container .contact-title { font-weight: bold; }
.template13-container h3 { font-size: 1rem; font-family: Roboto, sans-serif; font-weight: bold; }
.template13-container p { font-size: 0.75rem; font-family: Poppins, sans-serif; }
.template13-container .content { padding: 0 1rem; padding-top: 1rem; min-height: 806px; }
.template13-container .row { display: flex; flex-direction: row; gap: 1rem; }
.template13-container .info-left { width: 45%; flex: 1; }
.template13-container .info-left-wrapper { width: 90%; background-color: #d6dee6; margin: 0 auto; border-radius: 10px 10px 0 0; min-height: 806px; height: 100%; color: #000000; text-align: left; }
.template13-container .info-left-content { width: 80%; margin: 0 auto; }
.template13-container .info-right { width: 55%; height: fit-content; position: relative; padding-top: 1.5em; padding-bottom: 1rem; top: 0; min-height: 801px; }
.template13-container .section { margin-top: 2rem; }
.template13-container .section-text { margin-top: 0.75rem; line-height: 1.6; }
.template13-container .about { padding-top: 3rem; }
.template13-container .about-text { margin-top: 0.75rem; line-height: 1.6; }
.template13-container .family { margin-top: 2rem; }
.template13-container .details { margin-top: 1rem; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; line-height: 1.6; }
.template13-container .details div { display: contents; }
.template13-container .details span:first-child { padding-right: 2rem; font-weight: bold; }
.template13-container .details span:last-child { padding-right: 2rem; }
.template13-container .family-label { font-size: 12px; font-weight: 500; font-family: "Helvetica Neue", Arial, sans-serif; }
.template13-container .profile-wrapper { position: relative; display: flex; align-items: center; margin-left: 2rem; margin-top: 2rem; }
.template13-container .profile-image-wrapper { position: relative; z-index: 2; margin-right: -4rem; flex-shrink: 0; }
.template13-container .profile-card { background-color: rgb(255, 255, 255); border-radius: 50%; padding: 1rem; box-shadow: 0 0 1px rgba(0, 0, 0, 0.1); flex-shrink: 0; }
.template13-container .profile-card img { width: 12rem; height: 12rem; min-width: 12rem; min-height: 12rem; border-radius: 50%; object-fit: cover; display: block; }
.template13-container .profile-info-box { background-color: #d6dee6; padding: 3.75rem 3rem; z-index: 1; flex-grow: 1; }
.template13-container .profile-info-box h1 { margin-left: 5rem; font-size: 2rem; font-weight: bold; color: #333; font-family: "Helvetica Neue", Arial, sans-serif; letter-spacing: 0.3rem; text-transform: uppercase; }
.template13-container .personal { padding-top: 2em; }
.template13-container .footer { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 0; margin: 2rem 0 0.5rem 0; }
.template13-container .contact-text { margin: 1rem 0; display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; }
.template13-container .contact-icon { width: 15px; height: 15px; margin-right: 0.8rem; font-size: 0.75rem; display: flex; align-items: center; }
.template13-container .contact-content { font-family: "Helvetica Neue", Arial, sans-serif; }
.template13-container .contact-row { display: flex; flex-direction: row; align-items: center; }
`;
}

export function buildTemplate13Html(profileData: ProfileData, options?: Template13HtmlOptions): string {
  const css = getTemplate13Css();
  const name = escapeHtml(profileData.name ?? '');
  const about = escapeHtml(profileData.about ?? '');
  const profileImage = profileData.profileImage ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage) : '';
  const contactIcons = ['fas fa-envelope', 'fas fa-map-marker-alt', 'fas fa-home'];
  const pdHtml = profileData.profileDetails?.filter((d) => d.value).map((d) => `<div><span>${escapeHtml(d.label)}:</span><span>${escapeHtml(d.value)}</span></div>`).join('') ?? '';
  const famHtml = profileData.family?.map((f) => `<div><span class="family-label">${escapeHtml(f.label)}:</span><span>${escapeHtml(f.description)}</span></div>`).join('') ?? '';
  const firstSection = profileData.sections?.[0];
  const firstSectionHtml = firstSection ? `<div class="section"><h2 class="section-title">${escapeHtml(firstSection.title)}</h2><p class="section-text">${escapeHtml(firstSection.description)}</p></div>` : '';
  const restSectionsHtml = profileData.sections?.slice(1).map((s) => `<div class="section"><div class="section-divider"><h2 class="section-title">${escapeHtml(s.title)}</h2><p class="section-text">${escapeHtml(s.description)}</p></div></div>`).join('') ?? '';
  const contactsHtml = profileData.contacts?.map((c, i) => `<div class="contact-row"><div class="contact-icon"><i class="${contactIcons[i] ?? 'fa-regular fa-address-card'}"></i></div><p class="contact-content">${escapeHtml(c.value)}</p></div>`).join('') ?? '';
  const baseTag = options?.baseURL ? `\n  <base href="${options.baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">${baseTag}
<title>Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Roboto:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>${css}</style>
</head>
<body>
<div class="template13-container" id="biodata-container">
<div class="profile-wrapper">
<div class="profile-image-wrapper">
${profileImage ? `<div class="profile-card"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Image" width="192" height="192" /></div>` : ''}
</div>
${name ? `<div class="profile-info-box"><h1>${name}</h1></div>` : ''}
</div>
<div class="content row">
<div class="info-left">
<div class="info-left-wrapper">
<div class="info-left-content">
${about ? `<div class="about"><h2>ABOUT</h2><p class="about-text">${about}</p></div>` : ''}
${firstSectionHtml}
${contactsHtml ? `<div class="footer"><h2 class="contact-title">CONTACT</h2><div class="contact-text">${contactsHtml}</div></div>` : ''}
</div>
</div>
</div>
<div class="info-right">
${pdHtml ? `<div class="personal"><h2>PERSONAL DETAILS</h2><div class="details">${pdHtml}</div></div>` : ''}
${famHtml ? `<div class="family"><h2>FAMILY</h2><div class="details">${famHtml}</div></div>` : ''}
${restSectionsHtml}
</div>
</div>
</div>
</body>
</html>`;
}
