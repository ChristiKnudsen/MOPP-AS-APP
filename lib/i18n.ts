export type Language = "en" | "no" | "pt" | "fr" | "sv" | "da"

export const languages: Record<Language, string> = {
  en: "English",
  no: "Norsk",
  pt: "Português",
  fr: "Français",
  sv: "Svenska",
  da: "Dansk",
}

export interface Translations {
  common: {
    tagline: string
    sectionNotFound: string
    loading: string
    save: string
    cancel: string
    delete: string
    edit: string
    add: string
    search: string
    filter: string
    export: string
    import: string
    settings: string
    profile: string
    logout: string
    login: string
    email: string
    password: string
    name: string
    phone: string
    address: string
    city: string
    country: string
    status: string
    active: string
    inactive: string
    pending: string
    approved: string
    rejected: string
    date: string
    time: string
    amount: string
    total: string
    subtotal: string
    tax: string
    discount: string
    description: string
    notes: string
    actions: string
    view: string
    download: string
    upload: string
    submit: string
    confirm: string
    yes: string
    no: string
    back: string
    next: string
    previous: string
    close: string
    open: string
    select: string
    selectAll: string
    clear: string
    reset: string
    refresh: string
    update: string
    create: string
    remove: string
    duplicate: string
    copy: string
    paste: string
    cut: string
    undo: string
    redo: string
    help: string
    about: string
    contact: string
    support: string
    documentation: string
    version: string
    language: string
    theme: string
    notifications: string
    privacy: string
    terms: string
    cookies: string
    legal: string
    copyright: string
    allRightsReserved: string
  }
  welcome: {
    title: string
    description: string
    features: {
      transparency: {
        title: string
        description: string
      }
      collaboration: {
        title: string
        description: string
      }
      multilanguage: {
        title: string
        description: string
      }
    }
    chooseRole: {
      title: string
      description: string
    }
  }
  navigation: {
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
  }
  userTypes: {
    company: {
      title: string
      description: string
    }
    employee: {
      title: string
      description: string
    }
    customer: {
      title: string
      description: string
    }
    supplier: {
      title: string
      description: string
    }
  }
  dashboard: {
    title: string
    welcome: string
    stats: {
      totalEmployees: string
      activeContracts: string
      monthlyRevenue: string
      completedJobs: string
      pendingTasks: string
      customerSatisfaction: string
    }
    recentActivity: string
    quickActions: string
  }
  auth: {
    login: {
      title: string
      subtitle: string
      emailPlaceholder: string
      passwordPlaceholder: string
      loginButton: string
      forgotPassword: string
      noAccount: string
      signUp: string
      backToWelcome: string
    }
    roles: {
      admin: string
      manager: string
      employee: string
      customer: string
      supplier: string
    }
  }
}

const translations: Record<Language, Translations> = {
  en: {
    common: {
      tagline: "WE MAKE IT CLEAN!",
      sectionNotFound: "Section not found",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      filter: "Filter",
      export: "Export",
      import: "Import",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      login: "Login",
      email: "Email",
      password: "Password",
      name: "Name",
      phone: "Phone",
      address: "Address",
      city: "City",
      country: "Country",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      date: "Date",
      time: "Time",
      amount: "Amount",
      total: "Total",
      subtotal: "Subtotal",
      tax: "Tax",
      discount: "Discount",
      description: "Description",
      notes: "Notes",
      actions: "Actions",
      view: "View",
      download: "Download",
      upload: "Upload",
      submit: "Submit",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      open: "Open",
      select: "Select",
      selectAll: "Select All",
      clear: "Clear",
      reset: "Reset",
      refresh: "Refresh",
      update: "Update",
      create: "Create",
      remove: "Remove",
      duplicate: "Duplicate",
      copy: "Copy",
      paste: "Paste",
      cut: "Cut",
      undo: "Undo",
      redo: "Redo",
      help: "Help",
      about: "About",
      contact: "Contact",
      support: "Support",
      documentation: "Documentation",
      version: "Version",
      language: "Language",
      theme: "Theme",
      notifications: "Notifications",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
      legal: "Legal",
      copyright: "Copyright",
      allRightsReserved: "All rights reserved",
    },
    welcome: {
      title: "Welcome to MOPP",
      description:
        "The comprehensive platform connecting cleaning companies, employees, customers, and suppliers for transparent and efficient operations.",
      features: {
        transparency: {
          title: "Transparency",
          description: "Promoting transparency in the cleaning industry with clear communication and fair practices.",
        },
        collaboration: {
          title: "Collaboration",
          description: "Seamless collaboration between companies, employees, and customers on one platform.",
        },
        multilanguage: {
          title: "Multi-Language",
          description: "Available in English, Norwegian, Portuguese, French, Swedish, and Danish.",
        },
      },
      chooseRole: {
        title: "Choose Your Role",
        description: "Select how you want to use MOPP to get started with the right features for you.",
      },
    },
    navigation: {
      dashboard: "Dashboard",
      employees: "Employees",
      contracts: "Contracts",
      marketplace: "Marketplace",
      communication: "Communication",
      scheduling: "Scheduling",
      financial: "Financial",
      quality: "Quality Control",
      mobile: "Mobile",
      payroll: "Payroll",
    },
    userTypes: {
      company: {
        title: "Cleaning Company",
        description: "Manage operations, employees, and customer relationships",
      },
      employee: {
        title: "Employee",
        description: "Access schedules, track hours, and communicate with management",
      },
      customer: {
        title: "Customer",
        description: "Book services, track progress, and manage contracts",
      },
      supplier: {
        title: "Supplier",
        description: "Manage inventory, process orders, and track deliveries",
      },
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back",
      stats: {
        totalEmployees: "Total Employees",
        activeContracts: "Active Contracts",
        monthlyRevenue: "Monthly Revenue",
        completedJobs: "Completed Jobs",
        pendingTasks: "Pending Tasks",
        customerSatisfaction: "Customer Satisfaction",
      },
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
    },
    auth: {
      login: {
        title: "Sign In",
        subtitle: "Enter your credentials to access your account",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
        loginButton: "Sign In",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
        backToWelcome: "Back to Welcome",
      },
      roles: {
        admin: "Administrator",
        manager: "Manager",
        employee: "Employee",
        customer: "Customer",
        supplier: "Supplier",
      },
    },
  },
  no: {
    common: {
      tagline: "VI GJØR RENT!",
      sectionNotFound: "Seksjon ikke funnet",
      loading: "Laster...",
      save: "Lagre",
      cancel: "Avbryt",
      delete: "Slett",
      edit: "Rediger",
      add: "Legg til",
      search: "Søk",
      filter: "Filter",
      export: "Eksporter",
      import: "Importer",
      settings: "Innstillinger",
      profile: "Profil",
      logout: "Logg ut",
      login: "Logg inn",
      email: "E-post",
      password: "Passord",
      name: "Navn",
      phone: "Telefon",
      address: "Adresse",
      city: "By",
      country: "Land",
      status: "Status",
      active: "Aktiv",
      inactive: "Inaktiv",
      pending: "Venter",
      approved: "Godkjent",
      rejected: "Avvist",
      date: "Dato",
      time: "Tid",
      amount: "Beløp",
      total: "Totalt",
      subtotal: "Delsum",
      tax: "Skatt",
      discount: "Rabatt",
      description: "Beskrivelse",
      notes: "Notater",
      actions: "Handlinger",
      view: "Vis",
      download: "Last ned",
      upload: "Last opp",
      submit: "Send inn",
      confirm: "Bekreft",
      yes: "Ja",
      no: "Nei",
      back: "Tilbake",
      next: "Neste",
      previous: "Forrige",
      close: "Lukk",
      open: "Åpne",
      select: "Velg",
      selectAll: "Velg alle",
      clear: "Tøm",
      reset: "Tilbakestill",
      refresh: "Oppdater",
      update: "Oppdater",
      create: "Opprett",
      remove: "Fjern",
      duplicate: "Dupliser",
      copy: "Kopier",
      paste: "Lim inn",
      cut: "Klipp ut",
      undo: "Angre",
      redo: "Gjør om",
      help: "Hjelp",
      about: "Om",
      contact: "Kontakt",
      support: "Support",
      documentation: "Dokumentasjon",
      version: "Versjon",
      language: "Språk",
      theme: "Tema",
      notifications: "Varsler",
      privacy: "Personvern",
      terms: "Vilkår",
      cookies: "Informasjonskapsler",
      legal: "Juridisk",
      copyright: "Opphavsrett",
      allRightsReserved: "Alle rettigheter forbeholdt",
    },
    welcome: {
      title: "Velkommen til MOPP",
      description:
        "Den omfattende plattformen som forbinder rengjøringsselskaper, ansatte, kunder og leverandører for transparente og effektive operasjoner.",
      features: {
        transparency: {
          title: "Transparens",
          description: "Fremmer transparens i rengjøringsbransjen med klar kommunikasjon og rettferdig praksis.",
        },
        collaboration: {
          title: "Samarbeid",
          description: "Sømløst samarbeid mellom selskaper, ansatte og kunder på én plattform.",
        },
        multilanguage: {
          title: "Flerspråklig",
          description: "Tilgjengelig på engelsk, norsk, portugisisk, fransk, svensk og dansk.",
        },
      },
      chooseRole: {
        title: "Velg din rolle",
        description: "Velg hvordan du vil bruke MOPP for å komme i gang med de riktige funksjonene for deg.",
      },
    },
    navigation: {
      dashboard: "Dashbord",
      employees: "Ansatte",
      contracts: "Kontrakter",
      marketplace: "Markedsplass",
      communication: "Kommunikasjon",
      scheduling: "Planlegging",
      financial: "Økonomi",
      quality: "Kvalitetskontroll",
      mobile: "Mobil",
      payroll: "Lønn",
    },
    userTypes: {
      company: {
        title: "Rengjøringsselskap",
        description: "Administrer drift, ansatte og kunderelasjoner",
      },
      employee: {
        title: "Ansatt",
        description: "Få tilgang til tidsplaner, spor timer og kommuniser med ledelsen",
      },
      customer: {
        title: "Kunde",
        description: "Bestill tjenester, spor fremgang og administrer kontrakter",
      },
      supplier: {
        title: "Leverandør",
        description: "Administrer lager, behandle bestillinger og spor leveranser",
      },
    },
    dashboard: {
      title: "Dashbord",
      welcome: "Velkommen tilbake",
      stats: {
        totalEmployees: "Totalt ansatte",
        activeContracts: "Aktive kontrakter",
        monthlyRevenue: "Månedlig inntekt",
        completedJobs: "Fullførte jobber",
        pendingTasks: "Ventende oppgaver",
        customerSatisfaction: "Kundetilfredshet",
      },
      recentActivity: "Nylig aktivitet",
      quickActions: "Hurtighandlinger",
    },
    auth: {
      login: {
        title: "Logg inn",
        subtitle: "Skriv inn dine legitimasjoner for å få tilgang til kontoen din",
        emailPlaceholder: "Skriv inn e-posten din",
        passwordPlaceholder: "Skriv inn passordet ditt",
        loginButton: "Logg inn",
        forgotPassword: "Glemt passord?",
        noAccount: "Har du ikke en konto?",
        signUp: "Registrer deg",
        backToWelcome: "Tilbake til velkommen",
      },
      roles: {
        admin: "Administrator",
        manager: "Leder",
        employee: "Ansatt",
        customer: "Kunde",
        supplier: "Leverandør",
      },
    },
  },
  pt: {
    common: {
      tagline: "NÓS FAZEMOS LIMPO!",
      sectionNotFound: "Seção não encontrada",
      loading: "Carregando...",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Excluir",
      edit: "Editar",
      add: "Adicionar",
      search: "Pesquisar",
      filter: "Filtrar",
      export: "Exportar",
      import: "Importar",
      settings: "Configurações",
      profile: "Perfil",
      logout: "Sair",
      login: "Entrar",
      email: "E-mail",
      password: "Senha",
      name: "Nome",
      phone: "Telefone",
      address: "Endereço",
      city: "Cidade",
      country: "País",
      status: "Status",
      active: "Ativo",
      inactive: "Inativo",
      pending: "Pendente",
      approved: "Aprovado",
      rejected: "Rejeitado",
      date: "Data",
      time: "Hora",
      amount: "Valor",
      total: "Total",
      subtotal: "Subtotal",
      tax: "Imposto",
      discount: "Desconto",
      description: "Descrição",
      notes: "Notas",
      actions: "Ações",
      view: "Ver",
      download: "Baixar",
      upload: "Enviar",
      submit: "Enviar",
      confirm: "Confirmar",
      yes: "Sim",
      no: "Não",
      back: "Voltar",
      next: "Próximo",
      previous: "Anterior",
      close: "Fechar",
      open: "Abrir",
      select: "Selecionar",
      selectAll: "Selecionar tudo",
      clear: "Limpar",
      reset: "Redefinir",
      refresh: "Atualizar",
      update: "Atualizar",
      create: "Criar",
      remove: "Remover",
      duplicate: "Duplicar",
      copy: "Copiar",
      paste: "Colar",
      cut: "Cortar",
      undo: "Desfazer",
      redo: "Refazer",
      help: "Ajuda",
      about: "Sobre",
      contact: "Contato",
      support: "Suporte",
      documentation: "Documentação",
      version: "Versão",
      language: "Idioma",
      theme: "Tema",
      notifications: "Notificações",
      privacy: "Privacidade",
      terms: "Termos",
      cookies: "Cookies",
      legal: "Legal",
      copyright: "Direitos autorais",
      allRightsReserved: "Todos os direitos reservados",
    },
    welcome: {
      title: "Bem-vindo ao MOPP",
      description:
        "A plataforma abrangente que conecta empresas de limpeza, funcionários, clientes e fornecedores para operações transparentes e eficientes.",
      features: {
        transparency: {
          title: "Transparência",
          description: "Promovendo transparência na indústria de limpeza com comunicação clara e práticas justas.",
        },
        collaboration: {
          title: "Colaboração",
          description: "Colaboração perfeita entre empresas, funcionários e clientes em uma plataforma.",
        },
        multilanguage: {
          title: "Multi-idioma",
          description: "Disponível em inglês, norueguês, português, francês, sueco e dinamarquês.",
        },
      },
      chooseRole: {
        title: "Escolha seu papel",
        description: "Selecione como você quer usar o MOPP para começar com os recursos certos para você.",
      },
    },
    navigation: {
      dashboard: "Painel",
      employees: "Funcionários",
      contracts: "Contratos",
      marketplace: "Mercado",
      communication: "Comunicação",
      scheduling: "Agendamento",
      financial: "Financeiro",
      quality: "Controle de qualidade",
      mobile: "Móvel",
      payroll: "Folha de pagamento",
    },
    userTypes: {
      company: {
        title: "Empresa de limpeza",
        description: "Gerencie operações, funcionários e relacionamentos com clientes",
      },
      employee: {
        title: "Funcionário",
        description: "Acesse horários, rastreie horas e comunique-se com a gerência",
      },
      customer: {
        title: "Cliente",
        description: "Reserve serviços, acompanhe o progresso e gerencie contratos",
      },
      supplier: {
        title: "Fornecedor",
        description: "Gerencie estoque, processe pedidos e rastreie entregas",
      },
    },
    dashboard: {
      title: "Painel",
      welcome: "Bem-vindo de volta",
      stats: {
        totalEmployees: "Total de funcionários",
        activeContracts: "Contratos ativos",
        monthlyRevenue: "Receita mensal",
        completedJobs: "Trabalhos concluídos",
        pendingTasks: "Tarefas pendentes",
        customerSatisfaction: "Satisfação do cliente",
      },
      recentActivity: "Atividade recente",
      quickActions: "Ações rápidas",
    },
    auth: {
      login: {
        title: "Entrar",
        subtitle: "Digite suas credenciais para acessar sua conta",
        emailPlaceholder: "Digite seu e-mail",
        passwordPlaceholder: "Digite sua senha",
        loginButton: "Entrar",
        forgotPassword: "Esqueceu a senha?",
        noAccount: "Não tem uma conta?",
        signUp: "Cadastre-se",
        backToWelcome: "Voltar ao início",
      },
      roles: {
        admin: "Administrador",
        manager: "Gerente",
        employee: "Funcionário",
        customer: "Cliente",
        supplier: "Fornecedor",
      },
    },
  },
  fr: {
    common: {
      tagline: "NOUS NETTOYONS!",
      sectionNotFound: "Section non trouvée",
      loading: "Chargement...",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      add: "Ajouter",
      search: "Rechercher",
      filter: "Filtrer",
      export: "Exporter",
      import: "Importer",
      settings: "Paramètres",
      profile: "Profil",
      logout: "Se déconnecter",
      login: "Se connecter",
      email: "E-mail",
      password: "Mot de passe",
      name: "Nom",
      phone: "Téléphone",
      address: "Adresse",
      city: "Ville",
      country: "Pays",
      status: "Statut",
      active: "Actif",
      inactive: "Inactif",
      pending: "En attente",
      approved: "Approuvé",
      rejected: "Rejeté",
      date: "Date",
      time: "Heure",
      amount: "Montant",
      total: "Total",
      subtotal: "Sous-total",
      tax: "Taxe",
      discount: "Remise",
      description: "Description",
      notes: "Notes",
      actions: "Actions",
      view: "Voir",
      download: "Télécharger",
      upload: "Téléverser",
      submit: "Soumettre",
      confirm: "Confirmer",
      yes: "Oui",
      no: "Non",
      back: "Retour",
      next: "Suivant",
      previous: "Précédent",
      close: "Fermer",
      open: "Ouvrir",
      select: "Sélectionner",
      selectAll: "Tout sélectionner",
      clear: "Effacer",
      reset: "Réinitialiser",
      refresh: "Actualiser",
      update: "Mettre à jour",
      create: "Créer",
      remove: "Supprimer",
      duplicate: "Dupliquer",
      copy: "Copier",
      paste: "Coller",
      cut: "Couper",
      undo: "Annuler",
      redo: "Refaire",
      help: "Aide",
      about: "À propos",
      contact: "Contact",
      support: "Support",
      documentation: "Documentation",
      version: "Version",
      language: "Langue",
      theme: "Thème",
      notifications: "Notifications",
      privacy: "Confidentialité",
      terms: "Conditions",
      cookies: "Cookies",
      legal: "Légal",
      copyright: "Droits d'auteur",
      allRightsReserved: "Tous droits réservés",
    },
    welcome: {
      title: "Bienvenue chez MOPP",
      description:
        "La plateforme complète qui connecte les entreprises de nettoyage, les employés, les clients et les fournisseurs pour des opérations transparentes et efficaces.",
      features: {
        transparency: {
          title: "Transparence",
          description:
            "Promouvoir la transparence dans l'industrie du nettoyage avec une communication claire et des pratiques équitables.",
        },
        collaboration: {
          title: "Collaboration",
          description:
            "Collaboration transparente entre les entreprises, les employés et les clients sur une seule plateforme.",
        },
        multilanguage: {
          title: "Multi-langues",
          description: "Disponible en anglais, norvégien, portugais, français, suédois et danois.",
        },
      },
      chooseRole: {
        title: "Choisissez votre rôle",
        description:
          "Sélectionnez comment vous voulez utiliser MOPP pour commencer avec les bonnes fonctionnalités pour vous.",
      },
    },
    navigation: {
      dashboard: "Tableau de bord",
      employees: "Employés",
      contracts: "Contrats",
      marketplace: "Marché",
      communication: "Communication",
      scheduling: "Planification",
      financial: "Financier",
      quality: "Contrôle qualité",
      mobile: "Mobile",
      payroll: "Paie",
    },
    userTypes: {
      company: {
        title: "Entreprise de nettoyage",
        description: "Gérer les opérations, les employés et les relations clients",
      },
      employee: {
        title: "Employé",
        description: "Accéder aux horaires, suivre les heures et communiquer avec la direction",
      },
      customer: {
        title: "Client",
        description: "Réserver des services, suivre les progrès et gérer les contrats",
      },
      supplier: {
        title: "Fournisseur",
        description: "Gérer l'inventaire, traiter les commandes et suivre les livraisons",
      },
    },
    dashboard: {
      title: "Tableau de bord",
      welcome: "Bon retour",
      stats: {
        totalEmployees: "Total des employés",
        activeContracts: "Contrats actifs",
        monthlyRevenue: "Revenus mensuels",
        completedJobs: "Travaux terminés",
        pendingTasks: "Tâches en attente",
        customerSatisfaction: "Satisfaction client",
      },
      recentActivity: "Activité récente",
      quickActions: "Actions rapides",
    },
    auth: {
      login: {
        title: "Se connecter",
        subtitle: "Entrez vos identifiants pour accéder à votre compte",
        emailPlaceholder: "Entrez votre e-mail",
        passwordPlaceholder: "Entrez votre mot de passe",
        loginButton: "Se connecter",
        forgotPassword: "Mot de passe oublié?",
        noAccount: "Vous n'avez pas de compte?",
        signUp: "S'inscrire",
        backToWelcome: "Retour à l'accueil",
      },
      roles: {
        admin: "Administrateur",
        manager: "Gestionnaire",
        employee: "Employé",
        customer: "Client",
        supplier: "Fournisseur",
      },
    },
  },
  sv: {
    common: {
      tagline: "VI GÖR RENT!",
      sectionNotFound: "Sektion hittades inte",
      loading: "Laddar...",
      save: "Spara",
      cancel: "Avbryt",
      delete: "Radera",
      edit: "Redigera",
      add: "Lägg till",
      search: "Sök",
      filter: "Filtrera",
      export: "Exportera",
      import: "Importera",
      settings: "Inställningar",
      profile: "Profil",
      logout: "Logga ut",
      login: "Logga in",
      email: "E-post",
      password: "Lösenord",
      name: "Namn",
      phone: "Telefon",
      address: "Adress",
      city: "Stad",
      country: "Land",
      status: "Status",
      active: "Aktiv",
      inactive: "Inaktiv",
      pending: "Väntande",
      approved: "Godkänd",
      rejected: "Avvisad",
      date: "Datum",
      time: "Tid",
      amount: "Belopp",
      total: "Totalt",
      subtotal: "Delsumma",
      tax: "Skatt",
      discount: "Rabatt",
      description: "Beskrivning",
      notes: "Anteckningar",
      actions: "Åtgärder",
      view: "Visa",
      download: "Ladda ner",
      upload: "Ladda upp",
      submit: "Skicka",
      confirm: "Bekräfta",
      yes: "Ja",
      no: "Nej",
      back: "Tillbaka",
      next: "Nästa",
      previous: "Föregående",
      close: "Stäng",
      open: "Öppna",
      select: "Välj",
      selectAll: "Välj alla",
      clear: "Rensa",
      reset: "Återställ",
      refresh: "Uppdatera",
      update: "Uppdatera",
      create: "Skapa",
      remove: "Ta bort",
      duplicate: "Duplicera",
      copy: "Kopiera",
      paste: "Klistra in",
      cut: "Klipp ut",
      undo: "Ångra",
      redo: "Gör om",
      help: "Hjälp",
      about: "Om",
      contact: "Kontakt",
      support: "Support",
      documentation: "Dokumentation",
      version: "Version",
      language: "Språk",
      theme: "Tema",
      notifications: "Notifieringar",
      privacy: "Integritet",
      terms: "Villkor",
      cookies: "Cookies",
      legal: "Juridisk",
      copyright: "Upphovsrätt",
      allRightsReserved: "Alla rättigheter förbehållna",
    },
    welcome: {
      title: "Välkommen till MOPP",
      description:
        "Den omfattande plattformen som förbinder städföretag, anställda, kunder och leverantörer för transparenta och effektiva operationer.",
      features: {
        transparency: {
          title: "Transparens",
          description: "Främjar transparens i städbranschen med tydlig kommunikation och rättvisa metoder.",
        },
        collaboration: {
          title: "Samarbete",
          description: "Sömlöst samarbete mellan företag, anställda och kunder på en plattform.",
        },
        multilanguage: {
          title: "Flerspråkig",
          description: "Tillgänglig på engelska, norska, portugisiska, franska, svenska och danska.",
        },
      },
      chooseRole: {
        title: "Välj din roll",
        description: "Välj hur du vill använda MOPP för att komma igång med rätt funktioner för dig.",
      },
    },
    navigation: {
      dashboard: "Instrumentpanel",
      employees: "Anställda",
      contracts: "Kontrakt",
      marketplace: "Marknadsplats",
      communication: "Kommunikation",
      scheduling: "Schemaläggning",
      financial: "Ekonomi",
      quality: "Kvalitetskontroll",
      mobile: "Mobil",
      payroll: "Löner",
    },
    userTypes: {
      company: {
        title: "Städföretag",
        description: "Hantera verksamhet, anställda och kundrelationer",
      },
      employee: {
        title: "Anställd",
        description: "Få tillgång till scheman, spåra timmar och kommunicera med ledningen",
      },
      customer: {
        title: "Kund",
        description: "Boka tjänster, spåra framsteg och hantera kontrakt",
      },
      supplier: {
        title: "Leverantör",
        description: "Hantera lager, bearbeta beställningar och spåra leveranser",
      },
    },
    dashboard: {
      title: "Instrumentpanel",
      welcome: "Välkommen tillbaka",
      stats: {
        totalEmployees: "Totalt anställda",
        activeContracts: "Aktiva kontrakt",
        monthlyRevenue: "Månadsintäkter",
        completedJobs: "Slutförda jobb",
        pendingTasks: "Väntande uppgifter",
        customerSatisfaction: "Kundnöjdhet",
      },
      recentActivity: "Senaste aktivitet",
      quickActions: "Snabbåtgärder",
    },
    auth: {
      login: {
        title: "Logga in",
        subtitle: "Ange dina uppgifter för att komma åt ditt konto",
        emailPlaceholder: "Ange din e-post",
        passwordPlaceholder: "Ange ditt lösenord",
        loginButton: "Logga in",
        forgotPassword: "Glömt lösenord?",
        noAccount: "Har du inget konto?",
        signUp: "Registrera dig",
        backToWelcome: "Tillbaka till välkommen",
      },
      roles: {
        admin: "Administratör",
        manager: "Chef",
        employee: "Anställd",
        customer: "Kund",
        supplier: "Leverantör",
      },
    },
  },
  da: {
    common: {
      tagline: "VI GØR RENT!",
      sectionNotFound: "Sektion ikke fundet",
      loading: "Indlæser...",
      save: "Gem",
      cancel: "Annuller",
      delete: "Slet",
      edit: "Rediger",
      add: "Tilføj",
      search: "Søg",
      filter: "Filtrer",
      export: "Eksporter",
      import: "Importer",
      settings: "Indstillinger",
      profile: "Profil",
      logout: "Log ud",
      login: "Log ind",
      email: "E-mail",
      password: "Adgangskode",
      name: "Navn",
      phone: "Telefon",
      address: "Adresse",
      city: "By",
      country: "Land",
      status: "Status",
      active: "Aktiv",
      inactive: "Inaktiv",
      pending: "Afventende",
      approved: "Godkendt",
      rejected: "Afvist",
      date: "Dato",
      time: "Tid",
      amount: "Beløb",
      total: "Total",
      subtotal: "Subtotal",
      tax: "Skat",
      discount: "Rabat",
      description: "Beskrivelse",
      notes: "Noter",
      actions: "Handlinger",
      view: "Vis",
      download: "Download",
      upload: "Upload",
      submit: "Indsend",
      confirm: "Bekræft",
      yes: "Ja",
      no: "Nej",
      back: "Tilbage",
      next: "Næste",
      previous: "Forrige",
      close: "Luk",
      open: "Åbn",
      select: "Vælg",
      selectAll: "Vælg alle",
      clear: "Ryd",
      reset: "Nulstil",
      refresh: "Opdater",
      update: "Opdater",
      create: "Opret",
      remove: "Fjern",
      duplicate: "Duplikat",
      copy: "Kopier",
      paste: "Indsæt",
      cut: "Klip",
      undo: "Fortryd",
      redo: "Gentag",
      help: "Hjælp",
      about: "Om",
      contact: "Kontakt",
      support: "Support",
      documentation: "Dokumentation",
      version: "Version",
      language: "Sprog",
      theme: "Tema",
      notifications: "Notifikationer",
      privacy: "Privatliv",
      terms: "Vilkår",
      cookies: "Cookies",
      legal: "Juridisk",
      copyright: "Ophavsret",
      allRightsReserved: "Alle rettigheder forbeholdes",
    },
    welcome: {
      title: "Velkommen til MOPP",
      description:
        "Den omfattende platform, der forbinder rengøringsvirksomheder, medarbejdere, kunder og leverandører for gennemsigtige og effektive operationer.",
      features: {
        transparency: {
          title: "Gennemsigtighed",
          description: "Fremmer gennemsigtighed i rengøringsindustrien med klar kommunikation og fair praksis.",
        },
        collaboration: {
          title: "Samarbejde",
          description: "Problemfrit samarbejde mellem virksomheder, medarbejdere og kunder på én platform.",
        },
        multilanguage: {
          title: "Flersproget",
          description: "Tilgængelig på engelsk, norsk, portugisisk, fransk, svensk og dansk.",
        },
      },
      chooseRole: {
        title: "Vælg din rolle",
        description: "Vælg hvordan du vil bruge MOPP for at komme i gang med de rigtige funktioner til dig.",
      },
    },
    navigation: {
      dashboard: "Dashboard",
      employees: "Medarbejdere",
      contracts: "Kontrakter",
      marketplace: "Markedsplads",
      communication: "Kommunikation",
      scheduling: "Planlægning",
      financial: "Økonomi",
      quality: "Kvalitetskontrol",
      mobile: "Mobil",
      payroll: "Løn",
    },
    userTypes: {
      company: {
        title: "Rengøringsvirksomhed",
        description: "Administrer drift, medarbejdere og kunderelationer",
      },
      employee: {
        title: "Medarbejder",
        description: "Få adgang til tidsplaner, spor timer og kommuniker med ledelsen",
      },
      customer: {
        title: "Kunde",
        description: "Book tjenester, spor fremskridt og administrer kontrakter",
      },
      supplier: {
        title: "Leverandør",
        description: "Administrer lager, behandl ordrer og spor leverancer",
      },
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Velkommen tilbage",
      stats: {
        totalEmployees: "Totalt medarbejdere",
        activeContracts: "Aktive kontrakter",
        monthlyRevenue: "Månedlig omsætning",
        completedJobs: "Afsluttede job",
        pendingTasks: "Afventende opgaver",
        customerSatisfaction: "Kundetilfredshed",
      },
      recentActivity: "Seneste aktivitet",
      quickActions: "Hurtige handlinger",
    },
    auth: {
      login: {
        title: "Log ind",
        subtitle: "Indtast dine legitimationsoplysninger for at få adgang til din konto",
        emailPlaceholder: "Indtast din e-mail",
        passwordPlaceholder: "Indtast din adgangskode",
        loginButton: "Log ind",
        forgotPassword: "Glemt adgangskode?",
        noAccount: "Har du ikke en konto?",
        signUp: "Tilmeld dig",
        backToWelcome: "Tilbage til velkommen",
      },
      roles: {
        admin: "Administrator",
        manager: "Leder",
        employee: "Medarbejder",
        customer: "Kunde",
        supplier: "Leverandør",
      },
    },
  },
}

export function getTranslations(language: Language): Translations {
  return translations[language] || translations.en
}

// Legacy function for backward compatibility
export function useTranslation(language: Language): Translations {
  return getTranslations(language)
}
