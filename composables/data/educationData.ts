import type { Education } from './types';

export const mastersEducation = {
  id: 2,
  degree: "Master's studies in Data Science and Artificial Intelligence",
  subject: 'Data Science and Artificial Intelligence',
  institution: 'DHBW CAS – Center for Advanced Studies',
  institutionShort: 'DHBW CAS',
  period: 'Oct 2026 - present',
  startDate: '2026-10',
  since: 'October 2026',
  description: "Studying Data Science and Artificial Intelligence alongside my engineering work at Mercedes-Benz."
};

export const educationData: Education[] = [
  mastersEducation,
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'DHBW (Baden-Württemberg Cooperative State University)',
    period: '2022 - 2025',
    description: 'Dual study program in cooperation with Mercedes Benz, combining academic studies with practical industry experience in automotive software engineering.'
  }
];