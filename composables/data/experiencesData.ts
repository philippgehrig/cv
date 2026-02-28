import type { Experience } from './types';

export const experiencesData: Experience[] = [
  {
    id: 1,
    company: 'Mercedes Benz',
    period: '2022 - Present',
    position: 'System Architect & Technical Product Owner',
    description: 'Started as a Corporate Student in a dual study program combining theoretical education with practical work experience at Mercedes Benz, working across various departments on software development, data analysis, and automotive systems. Transitioned into architecture and technical leadership roles after graduation.',
    roles: [
      {
        title: 'System Architect & Technical Product Owner',
        period: 'Mar 2026 - Present',
        description: 'Leading a team of 5 developers and 3 working students to build an orchestration platform on top of Camunda 8. Designed and developed a higher-level abstraction layer that provides reusable building blocks for BTVs to model their software approval workflows. Defined process standards aligned with VDA2 requirements. Initially conceptualised and prototyped the platform as System Architect before transitioning into the Product Owner role to scale delivery.',
        technologies: ['Camunda 8', 'System Architecture', 'Technical Leadership', 'Product Management', 'VDA2', 'Process Orchestration']
      },
      {
        title: 'System Architect',
        period: 'Oct 2025 - Feb 2026',
        description: 'Conceptualised and designed the architecture for a new orchestration platform built on Camunda 8, providing higher-level building blocks for software approval processes. Defined technical standards based on VDA2 and developed initial prototypes alongside core architectural decisions.',
        technologies: ['System Architecture', 'Camunda 8', 'VDA2', 'Automotive Software', 'Process Modeling']
      },
      {
        title: 'Corporate Student',
        period: '2022 - Sep 2025',
        description: 'Completed a dual study program across multiple departments covering embedded systems, CI/CD tooling, data analysis, and zonal E/E architecture. Wrote bachelor\'s thesis on using PCIe connections between two Nvidia Jetson platforms for automotive connectivity in the transformation to a zonal vehicle architecture.',
        technologies: ['C/C++', 'PCIe', 'Nvidia Jetson', 'CAN Bus', 'Linux', 'CI/CD', 'ADAS', 'Grafana', 'TypeScript', 'Embedded Systems', 'Zonal E/E Architecture']
      }
    ],
  },
  {
    id: 2,
    company: 'DHBW Engineering e.V.',
    period: '2024 - Present',
    position: 'Lead Engineer',
    description: 'Formula Student racing team at DHBW Stuttgart, contributing to aerodynamics simulation, vehicle dynamics tooling, and engineering mentorship.',
    roles: [
      {
        title: 'Alumni Supervisor',
        period: 'Sep 2025 - Present',
        description: 'Supervising a Computer Science student writing a research paper on the continuation and advancement of the CFD simulation toolchain developed during previous involvement with the team.',
        technologies: ['CFD', 'Research Supervision', 'Academic Mentoring']
      },
      {
        title: 'Lead CFD Engineer',
        period: 'Sep 2024 - Sep 2025',
        description: 'Led a team of 4 engineers running Computational Fluid Dynamics simulations for the aerodynamics of the Formula Student car. Responsible for project planning, task delegation, and technical implementation of simulation models.',
        technologies: ['CFD', 'Team Leadership', 'Project Management', 'Simulation', 'StarCCM+', 'Laravel']
      },
      {
        title: 'Vehicle Dynamics Software Engineer',
        period: 'Feb 2024 - Sep 2024',
        description: 'Built a near-real-time vehicle telemetry monitoring tool using Grafana and InfluxDB with approximately 10-second data latency, enabling the team to analyse vehicle performance data during testing sessions and improve decision-making.',
        technologies: ['Linux', 'Docker', 'Vehicle Dynamics', 'Grafana', 'CI/CD', 'InfluxDB', 'Matlab/Simulink']
      }
    ],
  }
];
