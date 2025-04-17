// Types definitions for CV data

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
  roles?: Role[]; 
  position?: string; 
  period?: string; 
  description?: string; 
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