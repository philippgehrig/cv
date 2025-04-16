// Directus SDK client configuration
import { createDirectus, rest, readItems, readItem } from '@directus/sdk';

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

export interface ContactInfo {
  id: number;
  label: string;
  value: string;
  icon?: string;
  sort?: number;
}

// Define the schema for your Directus collections
export interface Schema {
  profile: Profile[];
  experiences: Experience[];
  education: Education[];
  skill_categories: SkillCategory[];
  skills: Skill[];
  contact: ContactInfo[];
}

// Initialize the Directus client
// You'll need to replace this URL with your actual Directus instance URL
const directusUrl = process.env.DIRECTUS_URL || 'https://your-directus-instance.com';

export const directusClient = createDirectus<Schema>(directusUrl).with(rest());

// Helper functions to fetch data
export async function fetchProfile() {
  try {
    // Assuming you have a single profile item with ID 1
    const profile = await directusClient.request(readItem('profile', 1));
    return profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    // Return default profile data if API call fails
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
}

export async function fetchExperiences() {
  try {
    const experiences = await directusClient.request(
      readItems('experiences', {
        sort: ['sort'],
      })
    );
    return experiences;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    // Return default experience data if API call fails
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
        company: 'DHBW Engineering',
        position: 'Lead CFD Engineer',
        period: '2023 - 2025',
        description: 'Led a team focused on Computational Fluid Dynamics (CFD) simulations, overseeing project planning, task delegation, and technical implementation of simulation models.',
        technologies: ['CFD', 'Team Leadership', 'Project Management', 'Simulation', 'IT Infrastructure', 'Data Analysis']
      }
    ];
  }
}

export async function fetchEducation() {
  try {
    const education = await directusClient.request(
      readItems('education', {
        sort: ['sort'],
      })
    );
    return education;
  } catch (error) {
    console.error('Error fetching education:', error);
    // Return default education data if API call fails
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
}

export async function fetchSkillCategories() {
  try {
    const skillCategories = await directusClient.request(
      readItems('skill_categories', {
        sort: ['sort'],
        fields: ['*', { skills: ['*'] }]
      })
    );
    return skillCategories;
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    // Return default skill categories if API call fails
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
}

export async function fetchContactInfo() {
  try {
    const contactInfo = await directusClient.request(
      readItems('contact', {
        sort: ['sort'],
      })
    );
    return contactInfo;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    // Return default contact info if API call fails
    return [
      {
        id: 1,
        label: 'Email',
        value: 'philipp@gehrig.info',
        icon: '📧'
      },
      {
        id: 2,
        label: 'Phone',
        value: '+49 151 68195162',
        icon: '📱'
      },
      {
        id: 3,
        label: 'Location',
        value: 'Germany',
        icon: '📍'
      }
    ];
  }
}