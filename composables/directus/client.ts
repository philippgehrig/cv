// Directus SDK client configuration
import { createDirectus, rest, readItems, readItem } from '@directus/sdk';
import { useRuntimeConfig } from '#app';

// Define your Directus collection types
export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  profile_image?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface Role {
  title: string;
  period: string;
  description: string;
  technologies?: string[];
}

export interface Experience {
  id: number;
  company: string;
  roles?: Role[];  // For multiple roles within one company
  position?: string; // Kept for backward compatibility
  period?: string;   // Kept for backward compatibility
  description?: string; // Kept for backward compatibility
  technologies?: string[];
  sort?: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  sort?: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  sort?: number;
  skills?: Skill[];
}

export interface Skill {
  id: number;
  name: string;
  level?: string;
  category?: number;
  sort?: number;
}

// Define the schema for your Directus collections
export interface Schema {
  profile: Profile[];
  experiences: Experience[];
  education: Education[];
  skill_categories: SkillCategory[];
  skills: Skill[];
}

// Helper functions to fetch data
export async function fetchProfile() {
  return {
    id: 1,
    name: 'Philipp Gehrig',
    title: 'Software Engineer',
    bio: 'A passionate software engineer with expertise in embedded systems, C/C++, and web development.',
    profile_image: '/images/Philipp-Gehrig_2025.png',
    linkedin: 'https://linkedin.com/in/philippgehrig',
    github: 'https://github.com/philippgehrig'
  };
}

export async function fetchExperiences() {
  return [
    {
      id: 1,
      company: 'Mercedes Benz',
      period: '2022 - 2025',
      position: 'Corporate Student - Computer Science', // For backward compatibility
      description: 'Participated in a dual study program combining theoretical education with practical work experience at Mercedes Benz.', // For backward compatibility
      roles: [
        {
          title: 'Software Development for ECU Testing',
          period: 'Jan 2024 - Apr 2025',
          description: 'Developed software tools for automated testing of electronic control units (ECUs) in advanced driver assistance systems.',
          technologies: ['C++', 'Python', 'Automotive Systems', 'ECU Testing', 'ADAS']
        },
        {
          title: 'Data Analysis for Vehicle Dynamics',
          period: 'May 2023 - Dec 2023',
          description: 'Analyzed and visualized vehicle dynamics data to improve simulation models for autonomous driving scenarios.',
          technologies: ['Data Analysis', 'Python', 'MATLAB', 'Vehicle Dynamics', 'Autonomous Driving']
        },
        {
          title: 'Embedded Systems Programming',
          period: 'Sep 2022 - Apr 2023',
          description: 'Implemented embedded systems solutions for automotive applications, focusing on real-time performance and reliability.',
          technologies: ['Embedded Systems', 'C', 'Real-time Systems', 'Automotive Architecture']
        }
      ],
      technologies: ['Software Development', 'Embedded Systems', 'C/C++', 'Automotive Systems', 'Data Analysis', 'ADAS', 'Automotive Architecture']
    },
    {
      id: 2,
      company: 'DHBW Engineering e.V.',
      roles: [
        {
          title: 'Lead CFD Engineer',
          period: 'Sep 2023 - Apr 2025',
          description: 'Led a team focused on Computational Fluid Dynamics (CFD) simulations, overseeing project planning, task delegation, and technical implementation of simulation models.',
          technologies: ['CFD', 'Team Leadership', 'Project Management', 'Simulation', 'OpenFOAM', 'Paraview']
        },
        {
          title: 'IT Infrastructure Manager',
          period: 'Feb 2023 - Aug 2023',
          description: 'Managed and optimized computing resources for simulation workflows, implemented version control systems, and developed automation scripts for data processing.',
          technologies: ['Linux', 'Bash Scripting', 'High Performance Computing', 'Git', 'CI/CD', 'Python']
        }
      ],
      // For backward compatibility
      position: 'Lead CFD Engineer',
      period: '2023 - 2025',
      description: 'Led engineering teams and managed IT infrastructure for Formula Student racing team projects.',
      technologies: ['CFD', 'Team Leadership', 'Project Management', 'Simulation', 'IT Infrastructure', 'Linux', 'HPC']
    }
  ];
}

export async function fetchEducation() {
    return [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'DHBW (Baden-Württemberg Cooperative State University)',
        period: '2022 - 2025',
        description: 'Dual study program in cooperation with Mercedes Benz, combining academic studies with practical industry experience in automotive software engineering.'
      }
    ];
  }


export async function fetchSkillCategories() {
    return [
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
  }
