export const aboutEn = {
  title: 'About Me',
  seoDescription:
    'Learn about Shaikh Zeeshan Murshed – his background, experience, education, and technical skills as a Full Stack Developer.',

  introPrefix: 'I am {{name}} and',
  actions: {
    downloadCv: 'Download CV',
    hireMe: 'Hire Me',
  },
  github: {
    eyebrow: 'GitHub Snapshot',
    title: 'Code activity and dev signals',
    description:
      'A live view of contributions, streak history, and one rotating dev quote pulled from the public GitHub widgets.',
    profileLink: 'View Profile',
    yearSelector: 'Select contribution year',
    loadingYear: 'Loading {{year}} contributions...',
    loadFailed: 'Unable to load contribution graph right now.',
    cards: {
      contributions: 'Contribution Graph',
      streak: 'Streak Snapshot',
      quote: 'Random Dev Quote',
    },
    alt: {
      contributions: '{{username}} GitHub contribution chart',
      streak: '{{username}} GitHub streak stats',
      quote: 'Random developer quote card',
    },
  },
  info: {
    birthday: 'Birthday',
    age: 'Age',
    website: 'Website',
    email: 'Email',
    phone: 'Phone',
    city: 'City',
    availability: 'Availability',
    languages: 'Languages',
    notAvailable: 'N/A',
  },
  sections: {
    education: 'Education',
    experience: 'Experience',
  },
} as const
