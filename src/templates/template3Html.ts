import type { ProfileData } from '../types/editor';

/** Template 3 (Blue Berry) – replica of FE Template3.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template3HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate3Css(): string {
  return `
body { margin: 0; padding: 0; }
.template3-container *, .template3-container *::after, .template3-container *::before { box-sizing: border-box; }
.template3-container { width: 100%; display: flex; justify-content: center; }
.template3-container .container { font-family: Montserrat, sans-serif; white-space: pre-line; margin: 0; padding: 0; width: 750px; min-height: 1057px; background: #f6f6f1; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
.template3-container .header { position: relative; text-align: center; }
.template3-container .header .blue-bar { height: 8rem; display: flex; background: #003366; color: #fff; padding: 20px; margin-bottom: 1rem; font-size: 2rem; justify-content: center; align-items: center; font-weight: bold; }
.template3-container .header .black-bar { height: 4rem; display: flex; align-items: center; justify-content: center; background: #2b2828; color: #fff; padding: 10px; font-size: 1.3rem; }
.template3-container .profile-img { position: absolute; top: 50%; left: 15%; transform: translate(-50%, -50%); width: 12rem; height: 12rem; border-radius: 50%; object-fit: cover; border: 5px solid #fff; display: block; }
.template3-container .content { display: flex; padding: 20px; gap: 20px; }
.template3-container .left { width: 35%; }
.template3-container .right { width: 70%; }
.template3-container p { font-size: 14px; line-height: 1.5; color: #555; }
.template3-container h2 { font-size: 1.3rem; margin-bottom: 0.9rem; color: #003366; position: relative; line-height: 1; }
.template3-container h2::after { content: ""; display: block; width: 100%; height: 3px; background: #413d3d; margin-top: 0.5rem; margin-bottom: 1rem; }
.template3-container .contact h2 { font-size: 1.3rem; margin-bottom: 10px; color: white; position: relative; }
.template3-container .contact h2::after { content: ""; display: block; width: 100%; height: 3px; background: white; margin-top: 0.5rem; margin-bottom: 1rem; }
.template3-container .contact p { font-size: 0.8rem; line-height: 1.5; color: white; }
.template3-container .about { margin: 1rem; }
.template3-container .family { margin: 1rem; margin-top: 3rem; }
.template3-container .expectations { padding: 1rem; background-color: rgb(223, 220, 220); padding-bottom: 3rem; margin-bottom: 1rem; }
.template3-container .contact { background-color: #413d3d; padding: 1rem; color: white; padding-top: 2rem; padding-bottom: 2rem; }
.template3-container .details { margin: 1rem; font-size: 12px; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; }
.template3-container .details div { display: contents; color: #555; }
.template3-container .details span { color: #413d3d; padding-right: 2rem; font-weight: bold; }
.template3-container .family-items { font-size: 0.8rem; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; }
.template3-container .family-items div { display: contents; color: #555; }
.template3-container .family span { color: #413d3d; padding-right: 2rem; font-weight: bold; }
`;
}

export function buildTemplate3Html(profileData: ProfileData, options?: Template3HtmlOptions): string {
  const css = getTemplate3Css();
  const name = escapeHtml(profileData.name ?? '');
  const dob = escapeHtml(profileData.dob ?? '');
  const profileImage = profileData.profileImage ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage) : '';
  const about = escapeHtml(profileData.about ?? '');
  const pdHtml = profileData.profileDetails?.filter((d) => d.value).map((d) => `<div><span>${escapeHtml(d.label)}:</span> ${escapeHtml(d.value)}</div>`).join('') ?? '';
  const famHtml = profileData.family?.map((f) => `<div><span>${escapeHtml(f.label)}:</span> ${escapeHtml(f.description)}</div>`).join('') ?? '';
  const sectionsHtml = profileData.sections?.map((s) => `<div class="expectations"><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.description)}</p></div>`).join('') ?? '';
  const contactsHtml = profileData.contacts?.map((c) => `<div class="contact-row"><p class="contact-content">${escapeHtml(c.label)} : ${escapeHtml(c.value)}</p></div>`).join('') ?? '';
  const baseTag = options?.baseURL ? `\n  <base href="${options.baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=750">${baseTag}
<title>Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="template3-container" id="biodata-container">
<div class="container">
<div class="header">
<div class="blue-bar">${name}</div>
<div class="black-bar">${dob}</div>
${profileImage ? `<img class="profile-img" src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Picture" />` : ''}
</div>
<div class="content">
<div class="section left">${sectionsHtml}
${contactsHtml ? `<div class="contact"><h2>CONTACT</h2>${contactsHtml}</div>` : ''}
</div>
<div class="section right">
${about ? `<div class="about"><h2>ABOUT ME</h2><p>${about}</p></div>` : ''}
${pdHtml ? `<div class="details">${pdHtml}</div>` : ''}
${famHtml ? `<div class="family"><h2>FAMILY</h2><div class="family-items">${famHtml}</div></div>` : ''}
</div>
</div>
</div>
</div>
</body>
</html>`;
}
