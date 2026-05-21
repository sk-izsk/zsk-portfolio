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
    eyebrow: 'Apercu GitHub',
    title: 'Activite code et signaux dev',
    description:
      "Une vue en direct des contributions, de l'historique des streaks et d'une citation dev rotative provenant des widgets publics GitHub.",
    profileLink: 'Voir le profil',
    yearSelector: "Selectionner l'annee de contribution",
    loadingYear: 'Chargement des contributions de {{year}}...',
    loadFailed: 'Impossible de charger le graphe des contributions pour le moment.',
    cards: {
      contributions: 'Graphe des contributions',
      streak: 'Apercu du streak',
      quote: 'Citation dev aleatoire',
    },
    alt: {
      contributions: 'Graphique des contributions GitHub de {{username}}',
      streak: 'Statistiques de streak GitHub de {{username}}',
      quote: 'Carte de citation de developpeur aleatoire',
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
