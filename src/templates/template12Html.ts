import type { ProfileData } from '../types/editor';

/** Template 12 (Charcoal Grace) – replica of FE Template12.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template12HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate12Css(): string {
  return `
html, body { margin: 0; padding: 0; }
.template12-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template12-container { font-size: 12px; font-weight: 500; font-family: Poppins, sans-serif; display: flex; flex-direction: column; width: 100%; min-height: 1057px; margin: 0; padding: 0; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); background-color: #ffffff; color: #333; position: relative; }
.template12-container p, .template12-container .contact-content, .template12-container .details { white-space: pre-line; }
.template12-container .section-title { text-transform: uppercase; letter-spacing: 0.2rem; font-weight: bold; }
.template12-container .row { display: flex; flex-direction: row; }
.template12-container .content { min-height: 1057px; height: 100%; width: 100%; display: flex; }
.template12-container .info-left { width: 40%; flex: 1; }
.template12-container .info-left-wrapper { width: 100%; background-color: #dfd7d3; margin: 0 auto; height: 100%; color: #000000; text-align: left; padding-top: 230px; }
.template12-container .info-left-content { width: 80%; margin: 0 auto; }
.template12-container .about { padding-top: 3rem; }
.template12-container .about-text { margin-top: 0.75rem; line-height: 1.6; }
.template12-container .section { margin-top: 1rem; }
.template12-container .section-text { margin-top: 0.75rem; line-height: 1.6; }
.template12-container .footer { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 0; margin: 1rem 0 0.5rem 0; }
.template12-container .contact-text { margin: 1rem 0; display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; }
.template12-container .contact-icon { width: 15px; height: 15px; margin-right: 0.8rem; font-size: 0.75rem; display: flex; align-items: center; }
.template12-container .contact-content { font-family: Montserrat, sans-serif; }
.template12-container .contact-row { display: flex; flex-direction: row; align-items: center; }
.template12-container .info-right { width: 60%; padding-top: 230px; }
.template12-container .info-right-content { width: 100%; margin: 0 auto; padding-left: 30px; padding-right: 30px; padding-bottom: 10px; }
.template12-container .personal { padding-top: 3rem; }
.template12-container .family { margin-top: 1rem; }
.template12-container .section-divider-line { margin-top: 0.75rem; border: none; height: 2px; background-color: #000000; width: 100%; }
.template12-container .details { margin-top: 0.75rem; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; line-height: 1.6; }
.template12-container .details div { display: contents; }
.template12-container .details span:first-child { padding-right: 2rem; font-weight: bold; }
.template12-container .details span:last-child { padding-right: 2rem; }
.template12-container .family-label { font-size: 12px; font-weight: 500; font-family: "Helvetica Neue", Arial, sans-serif; }
.template12-container .header { position: absolute; top: 0; left: 0; right: 0; z-index: 10; margin: 0; padding: 0; }
.template12-container .profile-wrapper { position: relative; display: flex; align-items: center; margin: 0 0 0 2rem; }
.template12-container .profile-image-wrapper { position: relative; z-index: 2; margin-right: -4rem; flex-shrink: 0; }
.template12-container .profile-card { background-color: rgb(255, 255, 255); border-radius: 50%; padding: 0.55rem; box-shadow: 0 0 1px rgba(0, 0, 0, 0.1); flex-shrink: 0; }
.template12-container .profile-card img { width: 12rem; height: 12rem; min-width: 12rem; min-height: 12rem; border-radius: 50%; object-fit: cover; display: block; }
.template12-container .profile-info-box { background-color: #241d19; padding: 2rem 3rem; z-index: 1; flex-grow: 1; text-align: center; display: flex; align-items: center; justify-content: center; }
.template12-container .profile-info-box h1 { margin: 0; font-size: 2.3rem; font-family: "Helvetica Neue", Arial, sans-serif; font-weight: bold; color: #ffffff; letter-spacing: 0.3rem; text-transform: uppercase; }
.template12-container h1 { font-size: 2.3rem; font-family: "Helvetica Neue", Arial, sans-serif; font-weight: bold; color: #ffffff; letter-spacing: 0.3rem; text-transform: uppercase; }
.template12-container h2 { font-size: 1.3rem; font-family: "Helvetica Neue", Arial, sans-serif; letter-spacing: 0.2rem; font-weight: bold; color: #333; }
.template12-container h3 { font-size: 1rem; font-family: Roboto, sans-serif; }
.template12-container p { font-size: 0.75rem; font-family: Poppins, sans-serif; }
`;
}

export function buildTemplate12Html(profileData: ProfileData, options?: Template12HtmlOptions): string {
  const css = getTemplate12Css();
  const name = escapeHtml(profileData.name ?? '');
  const about = escapeHtml(profileData.about ?? '');
  const profileImage = profileData.profileImage ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage) : '';
  const contactIcons = ['fas fa-envelope', 'fas fa-map-marker-alt', 'fas fa-home'];
  const pdHtml = profileData.profileDetails?.filter((d) => d.value).map((d) => `<div><span>${escapeHtml(d.label)}:</span><span>${escapeHtml(d.value)}</span></div>`).join('') ?? '';
  const famHtml = profileData.family?.map((f) => `<div><span class="family-label">${escapeHtml(f.label)}:</span><span>${escapeHtml(f.description)}</span></div>`).join('') ?? '';
  const firstSection = profileData.sections?.[0];
  const firstSectionHtml = firstSection ? `<div class="section"><h2 class="section-title">${escapeHtml(firstSection.title)}</h2><hr class="section-divider-line" /><p class="section-text">${escapeHtml(firstSection.description)}</p></div>` : '';
  const restSectionsHtml = profileData.sections?.slice(1).map((s) => `<div class="section"><div class="section-divider"><h2 class="section-title">${escapeHtml(s.title)}</h2><hr class="section-divider-line" /><p class="section-text">${escapeHtml(s.description)}</p></div></div>`).join('') ?? '';
  const contactsHtml = profileData.contacts?.map((c, i) => `<div class="contact-row"><div class="contact-icon"><i class="${contactIcons[i] ?? 'fa-regular fa-address-card'}"></i></div><p class="contact-content">${escapeHtml(c.value)}</p></div>`).join('') ?? '';
  const baseTag = options?.baseURL ? `\n  <base href="${options.baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">${baseTag}
<title>Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Montserrat:wght@400;500&family=Roboto:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>${css}</style>
</head>
<body>
<div class="template12-container" id="biodata-container">
<div class="header">
<div class="profile-wrapper">
<div class="profile-image-wrapper">
${profileImage ? `<div class="profile-card"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Image" width="192" height="192" /></div>` : ''}
</div>
${name ? `<div class="profile-info-box"><h1>${name}</h1></div>` : ''}
</div>
</div>
<div class="content row">
<div class="info-left">
<div class="info-left-wrapper">
<div class="info-left-content">
${about ? `<div class="about"><h2>ABOUT</h2><hr class="section-divider-line" /><p class="about-text">${about}</p></div>` : ''}
${firstSectionHtml}
${contactsHtml ? `<div class="footer"><h2 class="contact-title">CONTACT</h2><hr class="section-divider-line" /><div class="contact-text">${contactsHtml}</div></div>` : ''}
</div>
</div>
</div>
<div class="info-right">
<div class="info-right-content">
${pdHtml ? `<div class="personal"><h2>PERSONAL DETAILS</h2><hr class="section-divider-line" /><div class="details">${pdHtml}</div></div>` : ''}
${famHtml ? `<div class="family"><h2>FAMILY</h2><hr class="section-divider-line" /><div class="details">${famHtml}</div></div>` : ''}
${restSectionsHtml}
</div>
</div>
</div>
</div>
</body>
</html>`;
}
