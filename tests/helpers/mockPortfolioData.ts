import type { PortfolioData } from '@app-types/portfolio'

export const mockPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    greeting: 'Hello, I am',
    profession: 'Software Engineer',
    resume_link: 'https://example.com/cv.pdf',
    location: { city: 'Paris', country: 'France' },
    bio: 'A passionate software engineer who loves building great products.',
    detailedBio: 'Detailed biography here.',
    avatar: { primary: '/images/avatar.jpg', alt: 'John Doe avatar' },
    languages: ['English', 'French'],
    birthday: '1990-01-15',
    availability: ['Full-time', 'Remote'],
  },
  contact: {
    email: 'john@example.com',
    phone: '+33 6 12 34 56 78',
    social: {
      github: { label: 'github.com/johndoe', url: 'https://github.com/johndoe' },
      linkedin: { label: 'linkedin.com/in/johndoe', url: 'https://linkedin.com/in/johndoe' },
      website: { label: 'johndoe.dev', url: 'https://johndoe.dev' },
      twitter: { label: '@johndoe', url: 'https://twitter.com/johndoe' },
      instagram: { label: '@johndoe', url: 'https://instagram.com/johndoe' },
      telegram: { label: '@johndoe', url: 'https://t.me/johndoe' },
    },
  },
  skills: {
    technical: [
      { name: 'React', level: 90, category: 'frontend' },
      { name: 'TypeScript', level: 85, category: 'language' },
      { name: 'Node.js', level: 80, category: 'backend' },
      { name: 'Jest', level: 75, category: 'testing' },
      { name: 'Docker', level: 70, category: 'tools' },
    ],
    categories: {
      frontend: ['React', 'Vue', 'CSS'],
      backend: ['Node.js', 'Express'],
      languages: ['TypeScript', 'JavaScript'],
      tools: ['Docker', 'Git'],
      testing: ['Jest', 'Vitest'],
      learning: ['Rust'],
    },
  },
  education: [
    {
      degree: 'Master of Computer Science',
      duration: '2012 - 2014',
      description: 'Studied algorithms, distributed systems, and software engineering.',
    },
  ],
  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Frontend Engineer',
      duration: '2020 - Present',
      description: 'Led development of large-scale React applications.',
      highlights: ['Built reusable UI components', 'Improved performance by 30%'],
    },
  ],
  services: [
    { id: 1, title: 'Web Development', description: 'Building modern web apps.' },
    { id: 2, title: 'Mobile Development', description: 'React Native apps.' },
  ],
  projects: [
    {
      id: 1,
      title: 'Portfolio Website',
      url: 'https://johndoe.dev',
      projectTypes: ['full-stack', 'frontend', 'backend'],
      excerpt: 'A modern portfolio built with React and TypeScript.',
      category: 'Web',
      tags: ['React', 'TypeScript', 'Vite'],
      shortDescription: 'A modern portfolio built with React and TypeScript.',
      highlights: ['Responsive design', 'Fast load times'],
      publishDate: '2024-01-01',
    },
    {
      id: 2,
      title: 'Open Source CLI Tool',
      projectTypes: ['misc'],
      excerpt: 'A command-line utility written in Node.js.',
      category: 'Tools',
      tags: ['Node.js', 'CLI'],
      shortDescription: 'A command-line utility written in Node.js.',
      highlights: ['Cross-platform', 'Easy to use'],
      publishDate: '2023-06-15',
    },
  ],
}
