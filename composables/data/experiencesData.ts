import type { Experience } from './types';

export const experiencesData: Experience[] = [
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