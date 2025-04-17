import type { SkillCategory } from './types';

export const skillCategoriesData: SkillCategory[] = [
  {
    id: 1,
    name: 'Software Development',
    skills: [
      { id: 19, name: 'C/C++', level: 'Advanced' },
      { id: 21, name: 'Embedded Systems Programming', level: 'Advanced' },
      { id: 22, name: 'Data Analysis', level: 'Intermediate' }
    ]
  },
  {
    id: 2,
    name: 'Engineering & Simulation',
    skills: [
      { id: 6, name: 'CFD (Computational Fluid Dynamics)', level: 'Advanced' },
      { id: 7, name: 'Simulation Modeling', level: 'Advanced' }
    ]
  },
  {
    id: 3,
    name: 'Automotive Technology',
    skills: [
      { id: 10, name: 'Advanced Driver Assistnace Systems', level: 'Intermediate' },
      { id: 11, name: 'Automotive ECU Architecture', level: 'Advanced' },
      { id: 20, name: 'Embedded Systems', level: 'Advanced' }
    ]
  },
  {
    id: 4,
    name: 'Leadership & Management',
    skills: [
      { id: 13, name: 'Team Leadership', level: 'Advanced' },
      { id: 14, name: 'Project Management', level: 'Intermediate' }
    ]
  },
  {
    id: 5,
    name: 'Languages',
    skills: [
      { id: 17, name: 'German', level: 'Native' },
      { id: 18, name: 'English', level: 'Native' }
    ]
  },
  {
    id : 6,
    name : 'Web Development',
    skills : [
      { id : 23, name : 'Vue.js', level : 'Intermediate' },
      { id : 24, name : 'Laravel', level : 'Intermediate' },
      { id : 25, name : 'Tailwind CSS', level : 'Intermediate' }
    ]
  }
];