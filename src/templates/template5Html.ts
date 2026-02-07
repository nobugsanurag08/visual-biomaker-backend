import type { ProfileData } from '../types/editor';

/** Template 5 (Indian Violet) – replica of FE Template5.tsx */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template5HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate5Css(): string {
  return `
body { margin: 0; padding: 0; }
.template5-container * { margin: 0; padding: 0; box-sizing: border-box; }
.template5-container { width: 100%; display: flex; justify-content: stretch; }
.template5-container .container { width: 100%; min-height: 1057px; margin: 0; border-radius: 10px; border: 1.2rem solid #4d0d77; overflow: hidden; background: linear-gradient(135deg, #2C003E, #4B0082, #6A0572, #32004D, #000000); color: hsl(30, 91%, 75%); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
.template5-container h1, .template5-container h2, .template5-container h3 { font-family: Roboto, sans-serif; font-optical-sizing: auto; font-weight: 500; }
.template5-container h1 { font-size: 1.8rem; }
.template5-container h2 { font-size: 1.3rem; margin-bottom: 1rem; }
.template5-container h3 { font-size: 1rem; }
.template5-container .sub-header { font-weight: bolder; margin-top: 1rem; text-align: center; }
.template5-container .header { margin-top: 1.5rem; font-weight: bolder; text-align: center; }
.template5-container .row { display: flex; flex-direction: row; gap: 0; width: 95%; margin: 0 auto; }
.template5-container .right { width: 36%; margin: 1rem; font-size: 12px; background-color: transparent; }
.template5-container .left { width: 60%; font-size: 12px; }
.template5-container .info { margin: 1rem; display: flex; flex-direction: column; }
.template5-container .contact { margin: 1rem; text-align: center; }
.template5-container .expectations, .template5-container .about, .template5-container .family { margin: 1rem; line-height: 1rem; }
.template5-container .details { margin: 1rem; font-size: 12px; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; }
.template5-container .details div { font-size: 0.9rem; display: contents; }
.template5-container .details span { padding-right: 2rem; font-weight: bold; }
.template5-container .image { background-color: transparent; width: 95%; height: 42%; min-height: 280px; text-align: center; margin: 1rem; overflow: hidden; position: relative; border-radius: 5px; }
.template5-container .image img { width: 100%; height: 100%; min-height: 280px; position: relative; object-fit: cover; filter: brightness(0.7); display: block; }
.template5-container .profile-details { font-size: 12px; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; }
.template5-container .profile-details div { display: contents; }
.template5-container .profile-details span { padding-right: 24px; font-weight: bold; }
`;
}

export function buildTemplate5Html(profileData: ProfileData, options?: Template5HtmlOptions): string {
  const css = getTemplate5Css();
  const name = escapeHtml(profileData.name ?? '');
  const about = escapeHtml(profileData.about ?? '');
  const profileImage = profileData.profileImage ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage) : '';
  const pdHtml = profileData.profileDetails?.filter((d) => d.value).map((d) => `<div><span>${escapeHtml(d.label)}:</span> ${escapeHtml(d.value)}</div>`).join('') ?? '';
  const famHtml = profileData.family?.filter((f) => f.description).map((f) => `<div><span>${escapeHtml(f.label)}:</span> ${escapeHtml(f.description)}</div>`).join('') ?? '';
  const sectionsHtml = profileData.sections?.map((s) => `<div class="expectations"><h2>${escapeHtml(s.title)} :—</h2><p>${escapeHtml(s.description)}</p></div>`).join('') ?? '';
  const contactsHtml = profileData.contacts?.map((c) => `<div class="contact-row"><p class="contact-content">${escapeHtml(c.label)} : ${escapeHtml(c.value)}</p></div>`).join('') ?? '';
  const baseTag = options?.baseURL ? `\n  <base href="${options.baseURL.replace(/"/g, '&quot;')}">` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=750">${baseTag}
<title>Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="template5-container" id="biodata-container">
<div class="container">
<div class="header"><h3>ॐ गणेशाय नमः:</h3></div>
<main>
<div class="sub-header">${name ? `<h1>${name}</h1>` : ''}</div>
<div class="row">
<div class="info left">
${about ? `<div class="about"><h2>ABOUT :—</h2><p>${about}</p></div>` : ''}
${pdHtml ? `<div class="details">${pdHtml}</div>` : ''}
${famHtml ? `<div class="family"><h2>Family:—</h2><div class="profile-details">${famHtml}</div></div>` : ''}
</div>
<div class="right">
${profileImage ? `<div class="image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Picture" /></div>` : ''}
${sectionsHtml}
</div>
</div>
${contactsHtml ? `<div class="contact"><h2>—: Contact :—</h2>${contactsHtml}</div>` : ''}
</main>
</div>
</div>
</body>
</html>`;
}
