export type Language = "en" | "no" | "pt" | "fr" | "sv" | "da"

export interface Translations {
  // Navigation
  dashboard: string
  employees: string
  contracts: string
  marketplace: string
  communication: string
  scheduling: string
  financial: string
  quality: string
  mobile: string
  payroll: string

  // User types
  cleaningCompany: string
  employee: string
  customer: string
  supplier: string

  // Common actions
  add: string
  edit: string
  delete: string
  save: string
  cancel: string
  view: string
  search: string
  filter: string
  export: string
  import: string

  // Status
  active: string
  inactive: string
  pending: string
  completed: string
  cancelled: string
  draft: string
  sent: string
  paid: string
  overdue: string
  expired: string
  terminated: string

  // Contract types
  residential: string
  commercial: string
  industrial: string

  // Frequency
  oneTime: string
  weekly: string
  biWeekly: string
  monthly: string
  quarterly: string
  yearly: string

  // General
  name: string
  email: string
  phone: string
  address: string
  description: string
  price: string
  quantity: string
  total: string
  date: string
  time: string
  notes: string

  // Specific features
  employeeManagement: string
  transparentCommunication: string
  materialSupplies: string
  contractManagement: string
  createContract: string
  viewDetails: string
  contractNumber: string
  clientName: string
  serviceType: string
  contractType: string
  contractValue: string
  startDate: string
  endDate: string
  renewalDate: string
  frequency: string
  paymentTerms: string
  termsConditions: string
  specialRequirements: string
  contractServices: string
  contractDocuments: string
  assignedTeam: string
  clientInformation: string
  timelineValue: string
  filterByStatus: string
  totalContracts: string
  activeContracts: string
  pendingContracts: string
  expiredContracts: string
  totalEmployees: string
  monthlyRevenue: string
  pendingTasks: string
}

// --- NEW: supported language list -----------------------------
export const languages = {
  en: "English",
  no: "Norsk",
  pt: "Português",
  fr: "Français",
  sv: "Svenska",
  da: "Dansk",
} as const
// --------------------------------------------------------------

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    employees: "Employees",
    contracts: "Contracts",
    marketplace: "Marketplace",
    communication: "Communication",
    scheduling: "Scheduling",
    financial: "Financial",
    quality: "Quality",
    mobile: "Mobile",
    payroll: "Payroll",

    // User types
    cleaningCompany: "Cleaning Company",
    employee: "Employee",
    customer: "Customer",
    supplier: "Supplier",

    // Common actions
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    view: "View",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",

    // Status
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    draft: "Draft",
    sent: "Sent",
    paid: "Paid",
    overdue: "Overdue",
    expired: "Expired",
    terminated: "Terminated",

    // Contract types
    residential: "Residential",
    commercial: "Commercial",
    industrial: "Industrial",

    // Frequency
    oneTime: "One Time",
    weekly: "Weekly",
    biWeekly: "Bi-Weekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",

    // General
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    description: "Description",
    price: "Price",
    quantity: "Quantity",
    total: "Total",
    date: "Date",
    time: "Time",
    notes: "Notes",

    // Specific features
    employeeManagement: "Employee Management",
    transparentCommunication: "Transparent Communication",
    materialSupplies: "Material Supplies",
    contractManagement: "Contract Management",
    createContract: "Create Contract",
    viewDetails: "View Details",
    contractNumber: "Contract Number",
    clientName: "Client Name",
    serviceType: "Service Type",
    contractType: "Contract Type",
    contractValue: "Contract Value",
    startDate: "Start Date",
    endDate: "End Date",
    renewalDate: "Renewal Date",
    frequency: "Frequency",
    paymentTerms: "Payment Terms",
    termsConditions: "Terms & Conditions",
    specialRequirements: "Special Requirements",
    contractServices: "Contract Services",
    contractDocuments: "Contract Documents",
    assignedTeam: "Assigned Team",
    clientInformation: "Client Information",
    timelineValue: "Timeline & Value",
    filterByStatus: "Filter by Status",
    totalContracts: "Total Contracts",
    activeContracts: "Active Contracts",
    pendingContracts: "Pending Contracts",
    expiredContracts: "Expired Contracts",
    totalEmployees: "Total Employees",
    monthlyRevenue: "Monthly Revenue",
    pendingTasks: "Pending Tasks",
  },
  no: {
    // Navigation
    dashboard: "Dashbord",
    employees: "Ansatte",
    contracts: "Kontrakter",
    marketplace: "Markedsplass",
    communication: "Kommunikasjon",
    scheduling: "Planlegging",
    financial: "Økonomi",
    quality: "Kvalitet",
    mobile: "Mobil",
    payroll: "Lønn",

    // User types
    cleaningCompany: "Rengjøringsfirma",
    employee: "Ansatt",
    customer: "Kunde",
    supplier: "Leverandør",

    // Common actions
    add: "Legg til",
    edit: "Rediger",
    delete: "Slett",
    save: "Lagre",
    cancel: "Avbryt",
    view: "Vis",
    search: "Søk",
    filter: "Filter",
    export: "Eksporter",
    import: "Importer",

    // Status
    active: "Aktiv",
    inactive: "Inaktiv",
    pending: "Venter",
    completed: "Fullført",
    cancelled: "Avbrutt",
    draft: "Utkast",
    sent: "Sendt",
    paid: "Betalt",
    overdue: "Forfalt",
    expired: "Utløpt",
    terminated: "Avsluttet",

    // Contract types
    residential: "Bolig",
    commercial: "Kommersiell",
    industrial: "Industriell",

    // Frequency
    oneTime: "Engangs",
    weekly: "Ukentlig",
    biWeekly: "Annenhver uke",
    monthly: "Månedlig",
    quarterly: "Kvartalsvis",
    yearly: "Årlig",

    // General
    name: "Navn",
    email: "E-post",
    phone: "Telefon",
    address: "Adresse",
    description: "Beskrivelse",
    price: "Pris",
    quantity: "Antall",
    total: "Total",
    date: "Dato",
    time: "Tid",
    notes: "Notater",

    // Specific features
    employeeManagement: "Ansattadministrasjon",
    transparentCommunication: "Transparent kommunikasjon",
    materialSupplies: "Materialforsyninger",
    contractManagement: "Kontraktadministrasjon",
    createContract: "Opprett kontrakt",
    viewDetails: "Vis detaljer",
    contractNumber: "Kontraktnummer",
    clientName: "Kundenavn",
    serviceType: "Tjenestetype",
    contractType: "Kontrakttype",
    contractValue: "Kontraktverdi",
    startDate: "Startdato",
    endDate: "Sluttdato",
    renewalDate: "Fornyelsesdato",
    frequency: "Frekvens",
    paymentTerms: "Betalingsbetingelser",
    termsConditions: "Vilkår og betingelser",
    specialRequirements: "Spesielle krav",
    contractServices: "Kontrakttjenester",
    contractDocuments: "Kontraktdokumenter",
    assignedTeam: "Tildelt team",
    clientInformation: "Kundeinformasjon",
    timelineValue: "Tidslinje og verdi",
    filterByStatus: "Filtrer etter status",
    totalContracts: "Totale kontrakter",
    activeContracts: "Aktive kontrakter",
    pendingContracts: "Ventende kontrakter",
    expiredContracts: "Utløpte kontrakter",
    totalEmployees: "Totale ansatte",
    monthlyRevenue: "Månedlig inntekt",
    pendingTasks: "Ventende oppgaver",
  },
  pt: {
    // Navigation
    dashboard: "Painel",
    employees: "Funcionários",
    contracts: "Contratos",
    marketplace: "Mercado",
    communication: "Comunicação",
    scheduling: "Agendamento",
    financial: "Financeiro",
    quality: "Qualidade",
    mobile: "Móvel",
    payroll: "Folha de Pagamento",

    // User types
    cleaningCompany: "Empresa de Limpeza",
    employee: "Funcionário",
    customer: "Cliente",
    supplier: "Fornecedor",

    // Common actions
    add: "Adicionar",
    edit: "Editar",
    delete: "Excluir",
    save: "Salvar",
    cancel: "Cancelar",
    view: "Ver",
    search: "Pesquisar",
    filter: "Filtrar",
    export: "Exportar",
    import: "Importar",

    // Status
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
    completed: "Concluído",
    cancelled: "Cancelado",
    draft: "Rascunho",
    sent: "Enviado",
    paid: "Pago",
    overdue: "Vencido",
    expired: "Expirado",
    terminated: "Terminado",

    // Contract types
    residential: "Residencial",
    commercial: "Comercial",
    industrial: "Industrial",

    // Frequency
    oneTime: "Uma vez",
    weekly: "Semanal",
    biWeekly: "Quinzenal",
    monthly: "Mensal",
    quarterly: "Trimestral",
    yearly: "Anual",

    // General
    name: "Nome",
    email: "E-mail",
    phone: "Telefone",
    address: "Endereço",
    description: "Descrição",
    price: "Preço",
    quantity: "Quantidade",
    total: "Total",
    date: "Data",
    time: "Hora",
    notes: "Notas",

    // Specific features
    employeeManagement: "Gestão de Funcionários",
    transparentCommunication: "Comunicação Transparente",
    materialSupplies: "Suprimentos de Material",
    contractManagement: "Gestão de Contratos",
    createContract: "Criar Contrato",
    viewDetails: "Ver Detalhes",
    contractNumber: "Número do Contrato",
    clientName: "Nome do Cliente",
    serviceType: "Tipo de Serviço",
    contractType: "Tipo de Contrato",
    contractValue: "Valor do Contrato",
    startDate: "Data de Início",
    endDate: "Data de Término",
    renewalDate: "Data de Renovação",
    frequency: "Frequência",
    paymentTerms: "Termos de Pagamento",
    termsConditions: "Termos e Condições",
    specialRequirements: "Requisitos Especiais",
    contractServices: "Serviços do Contrato",
    contractDocuments: "Documentos do Contrato",
    assignedTeam: "Equipe Designada",
    clientInformation: "Informações do Cliente",
    timelineValue: "Cronograma e Valor",
    filterByStatus: "Filtrar por Status",
    totalContracts: "Total de Contratos",
    activeContracts: "Contratos Ativos",
    pendingContracts: "Contratos Pendentes",
    expiredContracts: "Contratos Expirados",
    totalEmployees: "Total de Funcionários",
    monthlyRevenue: "Receita Mensal",
    pendingTasks: "Tarefas Pendentes",
  },
  fr: {
    // Navigation
    dashboard: "Tableau de bord",
    employees: "Employés",
    contracts: "Contrats",
    marketplace: "Marché",
    communication: "Communication",
    scheduling: "Planification",
    financial: "Financier",
    quality: "Qualité",
    mobile: "Mobile",
    payroll: "Paie",

    // User types
    cleaningCompany: "Entreprise de Nettoyage",
    employee: "Employé",
    customer: "Client",
    supplier: "Fournisseur",

    // Common actions
    add: "Ajouter",
    edit: "Modifier",
    delete: "Supprimer",
    save: "Enregistrer",
    cancel: "Annuler",
    view: "Voir",
    search: "Rechercher",
    filter: "Filtrer",
    export: "Exporter",
    import: "Importer",

    // Status
    active: "Actif",
    inactive: "Inactif",
    pending: "En attente",
    completed: "Terminé",
    cancelled: "Annulé",
    draft: "Brouillon",
    sent: "Envoyé",
    paid: "Payé",
    overdue: "En retard",
    expired: "Expiré",
    terminated: "Terminé",

    // Contract types
    residential: "Résidentiel",
    commercial: "Commercial",
    industrial: "Industriel",

    // Frequency
    oneTime: "Une fois",
    weekly: "Hebdomadaire",
    biWeekly: "Bihebdomadaire",
    monthly: "Mensuel",
    quarterly: "Trimestriel",
    yearly: "Annuel",

    // General
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    address: "Adresse",
    description: "Description",
    price: "Prix",
    quantity: "Quantité",
    total: "Total",
    date: "Date",
    time: "Heure",
    notes: "Notes",

    // Specific features
    employeeManagement: "Gestion des Employés",
    transparentCommunication: "Communication Transparente",
    materialSupplies: "Fournitures de Matériel",
    contractManagement: "Gestion des Contrats",
    createContract: "Créer un Contrat",
    viewDetails: "Voir les Détails",
    contractNumber: "Numéro de Contrat",
    clientName: "Nom du Client",
    serviceType: "Type de Service",
    contractType: "Type de Contrat",
    contractValue: "Valeur du Contrat",
    startDate: "Date de Début",
    endDate: "Date de Fin",
    renewalDate: "Date de Renouvellement",
    frequency: "Fréquence",
    paymentTerms: "Conditions de Paiement",
    termsConditions: "Termes et Conditions",
    specialRequirements: "Exigences Spéciales",
    contractServices: "Services du Contrat",
    contractDocuments: "Documents du Contrat",
    assignedTeam: "Équipe Assignée",
    clientInformation: "Informations Client",
    timelineValue: "Chronologie et Valeur",
    filterByStatus: "Filtrer par Statut",
    totalContracts: "Total des Contrats",
    activeContracts: "Contrats Actifs",
    pendingContracts: "Contrats en Attente",
    expiredContracts: "Contrats Expirés",
    totalEmployees: "Total des Employés",
    monthlyRevenue: "Revenus Mensuels",
    pendingTasks: "Tâches en Attente",
  },
  sv: {
    // Navigation
    dashboard: "Instrumentpanel",
    employees: "Anställda",
    contracts: "Kontrakt",
    marketplace: "Marknadsplats",
    communication: "Kommunikation",
    scheduling: "Schemaläggning",
    financial: "Finansiell",
    quality: "Kvalitet",
    mobile: "Mobil",
    payroll: "Löner",

    // User types
    cleaningCompany: "Städföretag",
    employee: "Anställd",
    customer: "Kund",
    supplier: "Leverantör",

    // Common actions
    add: "Lägg till",
    edit: "Redigera",
    delete: "Ta bort",
    save: "Spara",
    cancel: "Avbryt",
    view: "Visa",
    search: "Sök",
    filter: "Filtrera",
    export: "Exportera",
    import: "Importera",

    // Status
    active: "Aktiv",
    inactive: "Inaktiv",
    pending: "Väntande",
    completed: "Slutförd",
    cancelled: "Avbruten",
    draft: "Utkast",
    sent: "Skickad",
    paid: "Betald",
    overdue: "Förfallen",
    expired: "Utgången",
    terminated: "Avslutad",

    // Contract types
    residential: "Bostäder",
    commercial: "Kommersiell",
    industrial: "Industriell",

    // Frequency
    oneTime: "En gång",
    weekly: "Veckovis",
    biWeekly: "Varannan vecka",
    monthly: "Månadsvis",
    quarterly: "Kvartalsvis",
    yearly: "Årligen",

    // General
    name: "Namn",
    email: "E-post",
    phone: "Telefon",
    address: "Adress",
    description: "Beskrivning",
    price: "Pris",
    quantity: "Antal",
    total: "Totalt",
    date: "Datum",
    time: "Tid",
    notes: "Anteckningar",

    // Specific features
    employeeManagement: "Personalhantering",
    transparentCommunication: "Transparent Kommunikation",
    materialSupplies: "Materialförsörjning",
    contractManagement: "Kontrakthantering",
    createContract: "Skapa Kontrakt",
    viewDetails: "Visa Detaljer",
    contractNumber: "Kontraktnummer",
    clientName: "Kundnamn",
    serviceType: "Servicetyp",
    contractType: "Kontrakttyp",
    contractValue: "Kontraktvärde",
    startDate: "Startdatum",
    endDate: "Slutdatum",
    renewalDate: "Förnyelsedatum",
    frequency: "Frekvens",
    paymentTerms: "Betalningsvillkor",
    termsConditions: "Villkor",
    specialRequirements: "Särskilda Krav",
    contractServices: "Kontraktstjänster",
    contractDocuments: "Kontraktdokument",
    assignedTeam: "Tilldelat Team",
    clientInformation: "Kundinfo",
    timelineValue: "Tidslinje och Värde",
    filterByStatus: "Filtrera efter Status",
    totalContracts: "Totala Kontrakt",
    activeContracts: "Aktiva Kontrakt",
    pendingContracts: "Väntande Kontrakt",
    expiredContracts: "Utgångna Kontrakt",
    totalEmployees: "Totala Anställda",
    monthlyRevenue: "Månadsintäkter",
    pendingTasks: "Väntande Uppgifter",
  },
  da: {
    // Navigation
    dashboard: "Dashboard",
    employees: "Medarbejdere",
    contracts: "Kontrakter",
    marketplace: "Markedsplads",
    communication: "Kommunikation",
    scheduling: "Planlægning",
    financial: "Finansiel",
    quality: "Kvalitet",
    mobile: "Mobil",
    payroll: "Løn",

    // User types
    cleaningCompany: "Rengøringsfirma",
    employee: "Medarbejder",
    customer: "Kunde",
    supplier: "Leverandør",

    // Common actions
    add: "Tilføj",
    edit: "Rediger",
    delete: "Slet",
    save: "Gem",
    cancel: "Annuller",
    view: "Se",
    search: "Søg",
    filter: "Filtrer",
    export: "Eksporter",
    import: "Importer",

    // Status
    active: "Aktiv",
    inactive: "Inaktiv",
    pending: "Afventende",
    completed: "Fuldført",
    cancelled: "Annulleret",
    draft: "Udkast",
    sent: "Sendt",
    paid: "Betalt",
    overdue: "Forfalden",
    expired: "Udløbet",
    terminated: "Afsluttet",

    // Contract types
    residential: "Bolig",
    commercial: "Kommerciel",
    industrial: "Industriel",

    // Frequency
    oneTime: "En gang",
    weekly: "Ugentlig",
    biWeekly: "Hver anden uge",
    monthly: "Månedlig",
    quarterly: "Kvartalsvis",
    yearly: "Årlig",

    // General
    name: "Navn",
    email: "E-mail",
    phone: "Telefon",
    address: "Adresse",
    description: "Beskrivelse",
    price: "Pris",
    quantity: "Antal",
    total: "Total",
    date: "Dato",
    time: "Tid",
    notes: "Noter",

    // Specific features
    employeeManagement: "Medarbejderstyring",
    transparentCommunication: "Transparent Kommunikation",
    materialSupplies: "Materialeforsyninger",
    contractManagement: "Kontraktstyring",
    createContract: "Opret Kontrakt",
    viewDetails: "Se Detaljer",
    contractNumber: "Kontraktnummer",
    clientName: "Kundenavn",
    serviceType: "Servicetype",
    contractType: "Kontrakttype",
    contractValue: "Kontraktværdi",
    startDate: "Startdato",
    endDate: "Slutdato",
    renewalDate: "Fornyelsesdato",
    frequency: "Frekvens",
    paymentTerms: "Betalingsbetingelser",
    termsConditions: "Vilkår og Betingelser",
    specialRequirements: "Særlige Krav",
    contractServices: "Kontrakttjenester",
    contractDocuments: "Kontraktdokumenter",
    assignedTeam: "Tildelt Team",
    clientInformation: "Kundeoplysninger",
    timelineValue: "Tidslinje og Værdi",
    filterByStatus: "Filtrer efter Status",
    totalContracts: "Samlede Kontrakter",
    activeContracts: "Aktive Kontrakter",
    pendingContracts: "Afventende Kontrakter",
    expiredContracts: "Udløbne Kontrakter",
    totalEmployees: "Samlede Medarbejdere",
    monthlyRevenue: "Månedlig Omsætning",
    pendingTasks: "Afventende Opgaver",
  },
}

export function useTranslation(language: Language): Translations {
  return translations[language] || translations.en
}

export { translations }
