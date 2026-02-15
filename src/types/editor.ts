/** Matches visual-biomaker-v2 FormData / ProfileData for template rendering */
export interface ProfileData {
  profileImage?: string;
  name: string;
  dob?: string;
  sections?: ProfileSection[];
  contacts?: ContactInfo[];
  about?: string;
  profileDetails: ProfileDetail[];
  family?: FamilyMember[];
}

export interface ProfileDetail {
  label: string;
  value: string;
  icon?: string;
}

export interface ContactInfo {
  label: string;
  value: string;
}

export interface ProfileSection {
  title: string;
  description: string;
}

export interface FamilyMember {
  label: string;
  description: string;
}

export interface FormField {
  label?: string;
  value: string | number | boolean | null;
  icon?: string;
}

/** Form data shape sent from FE (localStorage / API) */
export interface EditorFormData {
  generalInfo: {
    name?: FormField;
    Dob?: FormField;
    profileImage?: FormField;
    about?: FormField;
  };
  profileDetails?: Record<string, FormField>;
  family?: Record<string, FormField>;
  contacts?: Record<string, FormField>;
  Others?: Record<string, FormField>;
}
