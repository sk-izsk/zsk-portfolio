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
    eyebrow: 'GitHub Activity',
    title: 'Code activity and contribution history',
    description:
      'A live view of contribution history and streak activity pulled from the public GitHub widgets.',
    profileLink: 'View Profile',
    yearSelector: 'Select contribution year',
    loadingYear: 'Loading {{year}} contributions...',
    loadFailed: 'Unable to load contribution graph right now.',
    cards: {
      contributions: 'Contribution Graph',
      streak: 'Streak Snapshot',
    },
    alt: {
      contributions: '{{username}} GitHub contribution chart',
      streak: '{{username}} GitHub streak stats',
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
