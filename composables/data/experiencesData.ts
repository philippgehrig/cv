import type { Experience } from './types';

export const experiencesData: Experience[] = [
  {
    id: 1,
    company: 'Mercedes Benz',
    period: '2022 - Present',
    position: 'System Architect & Technical Product Owner/Lead',
    description: 'Started as a Corporate Student in a dual study program combining theoretical education with practical work experience at Mercedes Benz, working across various departments on software development, data analysis, and automotive systems. Transitioned into architecture and technical leadership roles after graduation.',
    roles: [
      {
        title: 'System Architect & Technical Product Owner/Lead',
        period: 'Mar 2026 - Present',
        description: 'Leading technical product ownership and system architecture for automotive software initiatives.',
        technologies: ['System Architecture', 'Technical Leadership', 'Product Management', 'Automotive Software']
      },
      {
        title: 'System Architect',
        period: 'Oct 2025 - Feb 2026',
        description: 'Defined and designed system architectures for automotive software components.',
        technologies: ['System Architecture', 'Automotive Software', 'Hardware Architecture']
      },
      {
        title: 'Corporate Student',
        period: '2022 - Sep 2025',
        description: 'Participated in a dual study program, contributing to projects in embedded systems, CI/CD tooling, data analysis, and zonal E/E architecture.',
        technologies: ['C/C++', 'PCIe', 'CAN Bus', 'Linux', 'CI/CD', 'ADAS', 'Grafana', 'TypeScript', 'Embedded Systems']
      }
    ],
  },
  {
    id: 2,
    company: 'DHBW Engineering e.V.',
    period: '2024 - 2025',
    position: 'Lead Engineer',
    description: 'Worked on various projects related to automotive software engineering',
    roles: [
      {
        title: 'Lead CFD Engineer',
        period: 'Sep 2024 - Sep 2025',
        description: 'Led a team focused on Computational Fluid Dynamics (CFD) simulations, overseeing project planning, task delegation, and technical implementation of simulation models.',
        technologies: ['CFD', 'Team Leadership', 'Project Management', 'Simulation', 'StarCCM', 'Laravel']
      },
      {
        title: 'Vehicle Dynamics Software Engineer',
        period: 'Feb 2024 - Sep 2024',
        description: 'Created a tool for real time monitoring of vehicle data, improving the efficiency of data analysis and decision-making processes.',
        technologies: ['Linux', 'Docker', 'Vehicle Dynamics', 'Grafana', 'CI/CD', 'InfluxDB', 'Matlab/Simulink']
      }
    ],
  }
];