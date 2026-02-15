import type { EditorFormData, ProfileData } from '../types/editor';

function calculateAge(dob: string | Date): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
  return age;
}

/**
 * Convert FE form data (JSON payload) to ProfileData for template rendering.
 * Mirrors visual-biomaker-v2 editorUtils.convertNewFormDataToProfileData / convertFormsProfileData.
 */
export function formDataToProfileData(formData: EditorFormData): ProfileData {
  // Support both camelCase and lowercase keys (some runtimes parse JSON with different casing)
  const generalInfo = formData.generalInfo ?? (formData as unknown as Record<string, unknown>).generalinfo;
  const dobRaw = generalInfo && typeof generalInfo === 'object'
    ? (generalInfo as Record<string, { value?: unknown }>).Dob?.value ?? (generalInfo as Record<string, { value?: unknown }>).dob?.value
    : undefined;
  const dob = String(dobRaw ?? '');
  const age = dob ? calculateAge(dob) : null;

  const profileDetails = Object.entries(formData.profileDetails ?? {}).map(
    ([key, obj]) =>
      obj && typeof obj === 'object' && 'value' in obj
        ? { label: (obj as { label?: string }).label ?? key, value: String((obj as { value: unknown }).value ?? '') }
        : { label: key, value: '' }
  );

  if (age !== null) {
    profileDetails.unshift({ label: 'Age', value: age.toString() + ' years' });
  }
  if (dob) {
    const formattedDob = new Date(dob).toLocaleDateString('en-GB').replace(/\//g, '-');
    profileDetails.unshift({ label: 'DOB', value: formattedDob });
  }

  const familyEntries = Object.entries(formData.family ?? {}).map(([key, obj]) =>
    obj && typeof obj === 'object' && 'value' in obj
      ? { label: (obj as { label?: string }).label ?? key, description: String((obj as { value: unknown }).value ?? '') }
      : { label: key, description: '' }
  );

  const contacts = Object.entries(formData.contacts ?? {}).map(([key, obj]) =>
    obj && typeof obj === 'object' && 'value' in obj
      ? { label: (obj as { label?: string }).label ?? key, value: String((obj as { value: unknown }).value ?? '') }
      : { label: key, value: '' }
  );

  const sections = Object.entries(formData.Others ?? {})
    .filter(([key]) => key.trim().toLowerCase() !== 'additional info')
    .map(([key, obj]) =>
      obj && typeof obj === 'object' && 'value' in obj
        ? { title: (obj as { label?: string }).label ?? key, description: String((obj as { value: unknown }).value ?? '') }
        : { title: key, description: '' }
    )
    .filter((s) => s.title.trim().toLowerCase() !== 'additional info');

  const profileImageField = generalInfo && typeof generalInfo === 'object'
    ? (generalInfo as Record<string, { value?: unknown }>).profileImage ?? (generalInfo as Record<string, { value?: unknown }>).profileimage
    : undefined;
  const profileImageValue = profileImageField && typeof profileImageField === 'object' && 'value' in profileImageField
    ? (profileImageField as { value: unknown }).value
    : undefined;
  const profileImageRaw = String(profileImageValue ?? '').trim();
  const defaultProfileImage = '/assets/img/profile-pic/profile-pic-9.webp';
  const isBlank = (s: string) => !s || s === 'null' || s === 'undefined' || s === '{}';

  return {
    profileImage: isBlank(profileImageRaw) ? defaultProfileImage : profileImageRaw,
    name: String((generalInfo && typeof generalInfo === 'object' ? (generalInfo as Record<string, { value?: unknown }>).name?.value : undefined) ?? ''),
    dob: dob || undefined,
    about: String((generalInfo && typeof generalInfo === 'object' ? (generalInfo as Record<string, { value?: unknown }>).about?.value : undefined) ?? ''),
    profileDetails,
    ...(familyEntries.length > 0 && { family: familyEntries }),
    ...(contacts.length > 0 && { contacts }),
    ...(sections.length > 0 && { sections }),
  };
}
