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
      'A local view of contribution history from cached GitHub activity data.',
    profileLink: 'View Profile',
    yearSelector: 'Select contribution year',
    loadingYear: 'Loading {{year}} contributions...',
    loadFailed: 'Unable to load contribution graph right now.',
    streakUnavailable: 'GitHub streak snapshot is temporarily unavailable.',
    streak: {
      current: 'Current streak',
      longest: 'Longest streak',
      activeDays: 'Active days',
      contributions: 'Contributions',
      days: 'days',
    },
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
