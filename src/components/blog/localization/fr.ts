export const blogFr = {
  title: 'Blog',
  seoDescription:
    'Articles et publications de Shaikh Zeeshan Murshed sur le génie logiciel, le développement web et la technologie.',
  readArticle: "Lire l'article",
  sourceLabel: 'Hashnode',
  coverFallback: 'Nouveau billet',
  empty:
    "Aucun article publié pour l'instant. Les prochains billets apparaîtront ici automatiquement.",
  error: 'Impossible de charger les articles pour le moment.',
  loadingMore: 'Chargement des articles suivants...',
  openArticleAriaLabel: "Ouvrir l'article : {{title}}",
  filter: {
    label: 'Filtrer les articles par tag',
    placeholder: 'Rechercher des tags',
    empty: 'Aucun tag correspondant.',
    loading: 'Chargement des tags...',
    options: {
      all: 'Tous les tags',
    },
  },
  sort: {
    label: 'Trier les articles du blog',
    options: {
      latest: 'Plus récents',
      oldest: 'Plus anciens',
      'title-asc': 'Titre A-Z',
    },
  },
} as const
