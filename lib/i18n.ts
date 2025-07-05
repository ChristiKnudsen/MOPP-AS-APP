/* lib/i18n.ts */

export const languages = {
  en: "English",
  no: "Norsk",
  // Add any additional locales below.
} as const

export type Language = keyof typeof languages

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // ---------- Navigation ----------
    dashboard: "Dashboard",
    employees: "Employees",
    contracts: "Contracts",
    materials: "Materials",
    schedule: "Schedule",
    communication: "Communication",
    financial: "Financial",
    quality: "Quality",
    payroll: "Payroll",
    mobile: "Mobile",
    profile: "Profile",
    settings: "Settings",
    // ---------- Common ----------
    welcome: "Welcome to MOPP",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    search: "Search",
    // ---------- Misc (extend freely) ----------
  },
  no: {
    // ---------- Navigation ----------
    dashboard: "Dashbord",
    employees: "Ansatte",
    contracts: "Kontrakter",
    materials: "Materialer",
    schedule: "Timeplan",
    communication: "Kommunikasjon",
    financial: "Finans",
    quality: "Kvalitet",
    payroll: "Lønn",
    mobile: "Mobil",
    profile: "Profil",
    settings: "Innstillinger",
    // ---------- Common ----------
    welcome: "Velkommen til MOPP",
    logout: "Logg ut",
    save: "Lagre",
    cancel: "Avbryt",
    edit: "Rediger",
    delete: "Slett",
    add: "Legg til",
    search: "Søk",
    // ---------- Misc ----------
  },
}

/**
 * Simple helper hook used across the app to fetch strings for
 * the active language.  (It is NOT a React hook – it’s just a
 * plain function, so it works in Server Components as well.)
 */
export function useTranslation(lang: Language) {
  return translations[lang] ?? translations.en
}
