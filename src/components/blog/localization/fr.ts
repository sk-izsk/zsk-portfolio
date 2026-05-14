export const blogFr = {
  title: 'Blog',
  seoDescription:
    'Articles et publications de Shaikh Zeeshan Murshed sur le génie logiciel, le développement web et la technologie.',
  readMore: 'Lire plus...',
  readArticle: "Lire l'article",
  empty: "Aucun article disponible pour l'instant.",
  error: 'Impossible de charger les articles pour le moment.',
  filter: {
    label: 'Filtrer les articles par catégorie',
    options: {
      all: 'Tous',
      frontend: 'Frontend',
      backend: 'Backend',
      architecture: 'Architecture',
      'state-management': 'Gestion d état',
    },
  },
  tagFilter: {
    label: 'Filtrer les articles par tag',
    placeholder: 'Rechercher des tags',
    empty: 'Aucun tag correspondant.',
  },
} as const
