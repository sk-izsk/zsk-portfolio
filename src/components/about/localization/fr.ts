export const aboutFr = {
  title: 'A Propos de Moi',
  seoDescription:
    'Découvrez Shaikh Zeeshan Murshed – son parcours, son expérience, sa formation et ses compétences techniques.',

  introPrefix: 'Je suis {{name}} et',
  actions: {
    downloadCv: 'Telecharger CV',
    hireMe: 'Embauchez-moi',
  },
  github: {
    eyebrow: 'Activite GitHub',
    title: 'Activite de code et historique de contributions',
    description:
      "Une vue locale de l'historique des contributions depuis les donnees GitHub mises en cache.",
    profileLink: 'Voir le profil',
    yearSelector: "Selectionner l'annee de contribution",
    loadingYear: 'Chargement des contributions de {{year}}...',
    loadFailed: 'Impossible de charger le graphe des contributions pour le moment.',
    streakUnavailable: 'Apercu du streak GitHub temporairement indisponible.',
    cards: {
      contributions: 'Graphe des contributions',
      streak: 'Apercu du streak',
    },
    alt: {
      contributions: 'Graphique des contributions GitHub de {{username}}',
      streak: 'Statistiques de streak GitHub de {{username}}',
    },
  },
  info: {
    birthday: 'Date de naissance',
    age: 'Age',
    website: 'Site web',
    email: 'Email',
    phone: 'Telephone',
    city: 'Ville',
    availability: 'Disponibilite',
    languages: 'Langues',
    notAvailable: 'N/D',
  },
  sections: {
    education: 'Formation',
    experience: 'Experience professionnelle',
  },
} as const
