import type { ProfileData } from '../types/editor';

/**
 * Template 1 (Purple Bee) – replica of FE Template1.tsx.
 * Same structure, CSS, and data mapping as frontend.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface Template1HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

/** CSS from FE TEMPLATE_1_CSS – no external assets. Matches FE text, color, margin, padding. */
function getTemplate1Css(): string {
  return `
body { margin: 0; padding: 0; }
:root { --accent-color: #ad137d; }
.template1-container *, .template1-container *::after, .template1-container *::before { box-sizing: border-box; }
.template1-container h1, .template1-container h2, .template1-container h3 { font-family: "Ubuntu", Roboto, sans-serif; font-weight: 500; font-style: normal; margin: 1rem 0; line-height: 1; }
.template1-container h2 { font-size: 1.4rem; }
.template1-container h3 { font-size: 1.2rem; }
.template1-container img { max-width: 100%; height: 100%; }
.template1-container header { text-align: center; }
.template1-container { white-space: pre-line; margin: 0; padding: 0; font-size: 13px; font-family: Montserrat, sans-serif; width: 750px; border-radius: 10px; background-color: #f0f0f0; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden; }
.template1-container .my-row { display: flex; gap: 0rem; }
.template1-container .contact-row { display: flex; gap: 0.5rem; align-items: center; }
.template1-container .contact-content { margin: 0.3rem; }
.template1-container .profile-image { width: 33%; position: relative; }
.template1-container .profile-image img { border-top-left-radius: 10px; width: 100%; height: 100%; object-fit: cover; display: block; }
.template1-container .title { width: 67%; background-image: linear-gradient(to right, #ad137d, #71077d); padding: 3rem 0; color: white; text-align: center; border-top-right-radius: 10px; align-items: center; display: flex; }
.template1-container .title h1 { font-size: 36px; }
.template1-container .title-content { margin: 0 auto; }
.template1-container .title-name { text-transform: uppercase; }
.template1-container .title-dob { font-size: 1.2rem; margin-top: 0.5rem; }
.template1-container .left-container { width: 80%; margin: 0 auto; padding: 1.2rem 0 0 0; }
.template1-container .left-container hr { border: 1px solid white; opacity: 0.7; }
.template1-container .left-panel { width: 33%; text-align: left; background-image: linear-gradient(to bottom, #ad137d, #71077d); color: white; border-bottom-left-radius: 10px; min-height: 800px; padding-bottom: 2rem; }
.template1-container .right-panel { width: 67%; padding-bottom: 2rem; }
.template1-container .content-title { text-transform: uppercase; }
.template1-container .content-details { padding: 0.8rem 0; }
.template1-container .right-container { width: 80%; margin: 0 auto; padding: 1.2rem 0 0 0; }
.template1-container .bio-title { color: #ad137d; text-transform: uppercase; }
.template1-container .profile-details { font-size: 12px; display: grid; grid-template-columns: auto 1fr; row-gap: 10px; }
.template1-container .profile-details div { display: contents; }
.template1-container .profile-details span { padding-right: 24px; font-weight: bold; }
`;
}

/** Build full HTML for template-1 (Purple Bee) with profile data. */
export function buildTemplate1Html(
  profileData: ProfileData,
  options?: Template1HtmlOptions
): string {
  const css = getTemplate1Css();
  const name = escapeHtml(profileData.name ?? '');
  const dob = escapeHtml(profileData.dob ?? '');
  const profileImage = profileData.profileImage
    ? (profileData.profileImage.startsWith('data:') ? profileData.profileImage : profileData.profileImage)
    : '';
  const about = escapeHtml(profileData.about ?? '');

  const sectionsHtml =
    profileData.sections
      ?.filter((s) => s.title || s.description)
      .map(
        (s) =>
          `<div class="left-container">
  ${s.title ? `<h2 class="content-title">${escapeHtml(s.title)}</h2>` : ''}
  ${s.description ? `<p class="content-details">${escapeHtml(s.description)}</p>` : ''}
  <hr />
</div>`
      )
      .join('') ?? '';

  const contactIcons = ['fas fa-envelope contact-icon', 'fas fa-map-marker-alt contact-icon', 'fas fa-home contact-icon'];
  const contactsHtml =
    profileData.contacts?.length &&
    profileData.contacts
      .map(
        (c, i) =>
          `<div class="contact-row"><i class="${contactIcons[i] ?? 'fa-regular fa-address-card contact-icon'}"></i><p class="contact-content">${escapeHtml(c.label)} : ${escapeHtml(c.value)}</p></div>`
      )
      .join('') || '';

  const profileDetailsHtml =
    profileData.profileDetails?.length &&
    profileData.profileDetails
      .filter((d) => d.value)
      .map(
        (d) =>
          `<div><span>${escapeHtml(d.label)}:</span> ${escapeHtml(d.value)}</div>`
      )
      .join('') || '';

  const familyHtml =
    profileData.family?.length &&
    profileData.family
      .filter((f) => f.description)
      .map(
        (f) =>
          `<div><span>${escapeHtml(f.label)}:</span> ${escapeHtml(f.description)}</div>`
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
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&family=Montserrat:wght@400;500&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>${css}</style>
</head>
<body>
  <div class="template1-container" id="biodata-container">
    <header>
      <div class="top-panel my-row">
        ${profileImage ? `<div class="profile-image"><img src="${profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage)}" alt="Profile Image" style="object-fit: cover;" /></div>` : ''}
        <div class="title">
          <div class="title-content">
            ${name ? `<h1 class="title-name">${name}</h1>` : ''}
            ${dob ? `<h2 class="title-dob">${dob}</h2>` : ''}
          </div>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="my-row">
        <aside class="left-panel">
          ${sectionsHtml}
          ${contactsHtml ? `<div class="left-container"><div class="contact-div"><h2 class="content-title">Contacts</h2>${contactsHtml}</div></div>` : ''}
        </aside>
        <div class="right-panel">
          ${about ? `<div class="right-container"><h2 class="bio-title">About Myself</h2><p class="bio-details">${about}</p></div>` : ''}
          ${profileDetailsHtml ? `<div class="right-container profile-details-container"><div class="profile-details">${profileDetailsHtml}</div></div>` : ''}
          ${familyHtml ? `<div class="right-container"><h2 class="bio-title">Family</h2><div class="profile-details">${familyHtml}</div></div>` : ''}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}
