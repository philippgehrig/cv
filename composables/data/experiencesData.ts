import type { Experience } from './types';

export const experiencesData: Experience[] = [
  {
    id: 1,
    company: 'Mercedes Benz',
    period: '2022 - 2025',
    position: 'Corporate Student - Computer Science',
    description: 'Participated in a dual study program combining theoretical education with practical work experience at Mercedes Benz. During this time I worked in various departments, focusing on software development, data analysis, and automotive systems.',
    roles: [
      {
        title: 'Corporate Student - PoC for Zonal Architecture with PCIe',
        period: 'April 2025 - Sep 2025',
        description: 'Developed of a Proof of Concept for a zonal architecture solution with PCIe.',
        technologies: ['PCIe', 'Bus Systems', 'ADAS', 'Linux Driver', 'C/C++', 'Hardware Architecture']
      },
      {
        title: 'Corporate Student - CI/CD Engineer for ADAS Systems',
        period: 'Dez 2025 - Feb 2025',
        description: 'Developed software tools for automated flashing for ADAS systems, improving the efficiency of the testing process by 20%.',
        technologies: ['BASH', 'CI/CD', 'ADAS', 'NVIDIA Jetson']
      },
      {
        title: 'Corporate Student - KPI Analysis for SCRUM Sprints',
        period: 'Jun 2024 - Sep 2024',
        description: 'Automated the creation of key performance indicators (KPIs) for SCRUM sprints, increasing developer productivity by 5%.',
        technologies: ['Data Analysis', 'Grafana', 'SCRUM', 'Jira', 'PostgreSQL', 'TypeScript']
      },
      {
        title: 'Corporate Student - CAN Bus Communication via WiFi',
        period: 'Nov 2023 - Apr 2024',
        description: 'Implemented a solution for analysing CAN bus communication over WiFi, enhancing the debugging process for automotive systems.',
        technologies: ['Embedded Systems', 'C/C++', 'CAN Bus', 'ESP32', 'WiFi', 'Automotive Systems']
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