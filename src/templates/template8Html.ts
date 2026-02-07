import type { ProfileData } from '../types/editor';

/** Template 8 (Mint Blossom) – replica of FE Template8.tsx */

const DEFAULT_PROFILE_IMAGE = '/assets/img/profile-pic/profile-pic-9.webp';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface Template8HtmlOptions {
  baseURL?: string;
  assetBase?: string;
}

function getTemplate8Css(assetBase: string): string {
  const u = (f: string) => (assetBase ? `url('${assetBase}/${f}')` : 'none');
  return `
.template8-container *{margin:0;padding:0;box-sizing:border-box;}
body{margin:0;padding:0;}
.template8-container{white-space:pre-line;font-size:13px;font-weight:450;letter-spacing:0.8px;font-family:Raleway,sans-serif;display:flex;flex-direction:column;width:750px;min-height:1057px;margin:0;border-radius:10px;background-image:${u('water-color.jpg')};background-size:100% 100%;background-position:center;background-clip:border-box;box-shadow:0 4px 10px rgba(0,0,0,0.1);color:#383838;opacity:1;position:relative;}
.template8-container h1{font-family:Cormorant Garamond,serif;font-size:60px;font-weight:bolder;color:#8a9571;}
.template8-container h2{font-size:1.3rem;font-family:Cormorant Garamond,serif;color:#8a9571;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;}
.template8-container h3{font-size:1rem;}
.template8-container p{font-family:Raleway,sans-serif;}
.template8-container .section-title{text-transform:uppercase;}
.template8-container .border-box{z-index:10;min-height:1047px;height:100%;margin:0;position:relative;}
.template8-container .corner-svg{position:absolute;background-repeat:no-repeat;background-size:contain;pointer-events:none;}
.template8-container .corner-top-left{top:-30px;left:10px;width:250px;height:250px;transform:rotate(50deg);opacity:0.3;z-index:-1;background-image:${u('flower-1.png')};}
.template8-container .corner-bottom-right{bottom:0;right:10px;width:200px;height:200px;transform:rotate(5deg);opacity:0.3;z-index:-1;background-image:${u('flower-2.png')};}
.template8-container .header{color:#8a9571;margin:1rem;padding:0 3rem;display:flex;flex-direction:column;justify-content:center;align-items:flex-end;}
.template8-container .content{padding:0 1rem;}
.template8-container .row{display:flex;flex-direction:row;gap:1.5rem;}
.template8-container .info-left{width:32%;margin:1rem;height:fit-content;}
.template8-container .info-right{width:60%;height:fit-content;}
.template8-container .section{margin-top:2.5rem;}
.template8-container .section-text{margin-top:0.575rem;}
.template8-container .about{margin-top:1rem;}
.template8-container .about-text{margin-top:0.75rem;}
.template8-container .family{margin-top:2.5rem;}
.template8-container .details{margin-top:1rem;display:grid;grid-template-columns:auto 1fr;row-gap:10px;line-height:1.6;}
.template8-container .details div{display:contents;}
.template8-container .details span:first-child{padding-right:2rem;font-weight:bold;}
.template8-container .details span:last-child{padding-right:2rem;}
.template8-container .profile-image{width:95%;max-height:250px;min-height:200px;border-radius:5px;overflow:hidden;position:relative;margin-bottom:1rem;}
.template8-container .profile-image img{width:100%;height:100%;min-height:200px;object-fit:cover;display:block;}
.template8-container .personal{margin-top:2.5rem;}
.template8-container .footer{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:0;margin:2.5rem 0 0.5rem 0;}
.template8-container .contact-text{margin:1rem 0;display:flex;flex-direction:column;align-items:flex-start;gap:0.3rem;}
.template8-container .contact-icon{width:15px;height:15px;margin-right:0.8rem;font-size:0.75rem;display:flex;align-items:center;}
.template8-container .contact-row{display:flex;flex-direction:row;align-items:center;}
`;
}

export function buildTemplate8Html(profileData: ProfileData, options?: Template8HtmlOptions): string {
  const assetBase = options?.assetBase ?? '';
  const css = getTemplate8Css(assetBase);
  const name = escapeHtml(profileData.name ?? '');
  const about = escapeHtml(profileData.about ?? '');
  const profileImage = (profileData.profileImage?.trim() || DEFAULT_PROFILE_IMAGE);
  const profileImageSrc = profileImage.startsWith('data:') ? profileImage : escapeHtml(profileImage);
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
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Raleway:wght@400;500&family=Poppins:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>${css}</style>
</head>
<body>
<div class="template8-container" id="biodata-container">
<div class="border-box">
<div class="corner-svg corner-top-left"></div>
<div class="corner-svg corner-bottom-right"></div>
<div class="header">${name ? `<h1>${name}</h1>` : ''}</div>
<div class="content row">
<div class="info-left">
<div class="profile-image"><img src="${profileImageSrc}" alt="Profile Image" style="object-fit:cover" /></div>
${sectionsHtml}
${contactsHtml ? `<div class="footer"><h2 class="contact-title">CONTACTS</h2><div class="contact-text">${contactsHtml}</div></div>` : ''}
</div>
<div class="info-right">
${about ? `<div class="about"><h2>ABOUT</h2><p class="about-text">${about}</p></div>` : ''}
${pdHtml ? `<div class="details personal">${pdHtml}</div>` : ''}
${famHtml ? `<div class="family"><h2 class="bio-title">FAMILY</h2><div class="details">${famHtml}</div></div>` : ''}
</div>
</div>
</div>
</div>
</body>
</html>`;
}
