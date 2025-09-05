import type { ExperienceItem } from '@/components/ExperienceSection'

export const experienceItems: ExperienceItem[] = [
  // your items here (fallback uses defaultItems if empty)
]
export const defaultItems: ExperienceItem[] = [
  {
    role: 'Frontend Engineer',
    company: 'Tech Company',
    url: 'https://techcompany.com',
    start: '2022-01',
    end: 'Present',
    location: 'Remote',
    achievements: [
      'Led the development of a design system used across multiple products.',
      'Improved performance of key web applications by optimizing React components.',
      'Mentored junior developers on best practices in frontend development.',
    ],
  },
  {
    role: 'UI Developer',
    company: 'Design Studio',
    url: 'https://designstudio.com',
    start: '2020-06',
    end: '2021-12',
    location: 'New York, NY',
    achievements: [
      'Created interactive prototypes for client projects using Figma and Framer Motion.',
      'Collaborated with designers to implement responsive web designs.',
      'Enhanced user experience through usability testing and feedback loops.',
    ],
  },
]

// Provide a merged export other components can import
export const resolvedExperience: ExperienceItem[] = experienceItems.length ? experienceItems : defaultItems