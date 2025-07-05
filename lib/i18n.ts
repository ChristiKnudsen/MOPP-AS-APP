export const languages = {
  en: "English",
  no: "Norsk",
  pt: "Português",
  fr: "Français",
  sv: "Svenska",
  da: "Dansk",
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    employees: "Employees",
    contracts: "Contracts",
    schedule: "Schedule",
    materials: "Materials",
    communication: "Communication",
    profile: "Profile",
    settings: "Settings",

    // Common
    welcome: "Welcome to MOPP",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    search: "Search",

    // Dashboard
    totalEmployees: "Total Employees",
    activeContracts: "Active Contracts",
    pendingTasks: "Pending Tasks",
    monthlyRevenue: "Monthly Revenue",

    // User Types
    cleaningCompany: "Cleaning Company",
    employee: "Employee",
    customer: "Customer",
    supplier: "Supplier",

    // Features
    employeeManagement: "Employee Management",
    contractManagement: "Contract Management",
    materialSupplies: "Material Supplies",
    transparentCommunication: "Transparent Communication",
  },
  no: {
    // Navigation
    dashboard: "Dashbord",
    employees: "Ansatte",
    contracts: "Kontrakter",
    schedule: "Timeplan",
    materials: "Materialer",
    communication: "Kommunikasjon",
    profile: "Profil",
    settings: "Innstillinger",

    // Common
    welcome: "Velkommen til MOPP",
    logout: "Logg ut",
    save: "Lagre",
    cancel: "Avbryt",
    edit: "Rediger",
    delete: "Slett",
    add: "Legg til",
    search: "Søk",

    // Dashboard
    totalEmployees: "Totalt Ansatte",
    activeContracts: "Aktive Kontrakter",
    pendingTasks: "Ventende Oppgaver",
    monthlyRevenue: "Månedlig Inntekt",

    // User Types
    cleaningCompany: "Rengjøringsselskap",
    employee: "Ansatt",
    customer: "Kunde",
    supplier: "Leverandør",

    // Features
    employeeManagement: "Ansattadministrasjon",
    contractManagement: "Kontraktadministrasjon",
    materialSupplies: "Materialforsyning",
    transparentCommunication: "Transparent Kommunikasjon",
  },
  pt: {
    // Navigation
    dashboard: "Painel",
    employees: "Funcionários",
    contracts: "Contratos",
    schedule: "Horário",
    materials: "Materiais",
    communication: "Comunicação",
    profile: "Perfil",
    settings: "Configurações",

    // Common
    welcome: "Bem-vindo ao MOPP",
    logout: "Sair",
    save: "Salvar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Excluir",
    add: "Adicionar",
    search: "Pesquisar",

    // Dashboard
    totalEmployees: "Total de Funcionários",
    activeContracts: "Contratos Ativos",
    pendingTasks: "Tarefas Pendentes",
    monthlyRevenue: "Receita Mensal",

    // User Types
    cleaningCompany: "Empresa de Limpeza",
    employee: "Funcionário",
    customer: "Cliente",
    supplier: "Fornecedor",

    // Features
    employeeManagement: "Gestão de Funcionários",
    contractManagement: "Gestão de Contratos",
    materialSupplies: "Suprimentos de Material",
    transparentCommunication: "Comunicação Transparente",
  },
  fr: {
    // Navigation
    dashboard: "Tableau de bord",
    employees: "Employés",
    contracts: "Contrats",
    schedule: "Horaire",
    materials: "Matériaux",
    communication: "Communication",
    profile: "Profil",
    settings: "Paramètres",

    // Common
    welcome: "Bienvenue à MOPP",
    logout: "Déconnexion",
    save: "Sauvegarder",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    add: "Ajouter",
    search: "Rechercher",

    // Dashboard
    totalEmployees: "Total Employés",
    activeContracts: "Contrats Actifs",
    pendingTasks: "Tâches en Attente",
    monthlyRevenue: "Revenus Mensuels",

    // User Types
    cleaningCompany: "Entreprise de Nettoyage",
    employee: "Employé",
    customer: "Client",
    supplier: "Fournisseur",

    // Features
    employeeManagement: "Gestion des Employés",
    contractManagement: "Gestion des Contrats",
    materialSupplies: "Fournitures de Matériel",
    transparentCommunication: "Communication Transparente",
  },
  sv: {
    // Navigation
    dashboard: "Instrumentpanel",
    employees: "Anställda",
    contracts: "Kontrakt",
    schedule: "Schema",
    materials: "Material",
    communication: "Kommunikation",
    profile: "Profil",
    settings: "Inställningar",

    // Common
    welcome: "Välkommen till MOPP",
    logout: "Logga ut",
    save: "Spara",
    cancel: "Avbryt",
    edit: "Redigera",
    delete: "Radera",
    add: "Lägg till",
    search: "Sök",

    // Dashboard
    totalEmployees: "Totalt Anställda",
    activeContracts: "Aktiva Kontrakt",
    pendingTasks: "Väntande Uppgifter",
    monthlyRevenue: "Månadsintäkter",

    // User Types
    cleaningCompany: "Städföretag",
    employee: "Anställd",
    customer: "Kund",
    supplier: "Leverantör",

    // Features
    employeeManagement: "Personalhantering",
    contractManagement: "Kontrakthantering",
    materialSupplies: "Materialförsörjning",
    transparentCommunication: "Transparent Kommunikation",
  },
  da: {
    // Navigation
    dashboard: "Dashboard",
    employees: "Medarbejdere",
    contracts: "Kontrakter",
    schedule: "Tidsplan",
    materials: "Materialer",
    communication: "Kommunikation",
    profile: "Profil",
    settings: "Indstillinger",

    // Common
    welcome: "Velkommen til MOPP",
    logout: "Log ud",
    save: "Gem",
    cancel: "Annuller",
    edit: "Rediger",
    delete: "Slet",
    add: "Tilføj",
    search: "Søg",

    // Dashboard
    totalEmployees: "Totalt Medarbejdere",
    activeContracts: "Aktive Kontrakter",
    pendingTasks: "Afventende Opgaver",
    monthlyRevenue: "Månedlig Omsætning",

    // User Types
    cleaningCompany: "Rengøringsvirksomhed",
    employee: "Medarbejder",
    customer: "Kunde",
    supplier: "Leverandør",

    // Features
    employeeManagement: "Medarbejderstyring",
    contractManagement: "Kontraktstyring",
    materialSupplies: "Materialeforsyning",
    transparentCommunication: "Transparent Kommunikation",
  },
}

export function useTranslation(language: Language) {
  return translations[language]
}
