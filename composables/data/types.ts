/** Type definitions for all CV data structures used across the application. */

/** Personal profile information displayed in the About section. */
export interface Profile {
  /** Unique identifier for the profile record. */
  id: number;
  /** Full display name (e.g. "Philipp Gehrig"). */
  name: string;
  /** Current job title shown in the hero badge. */
  title: string;
  /** Short biographical text shown below the title. */
  bio: string;
  /** Optional path or URL to a profile photo. */
  profile_image?: string;
  /** Optional full LinkedIn profile URL. */
  linkedin?: string;
  /** Optional full GitHub profile URL. */
  github?: string;
  /** Optional full X (Twitter) profile URL. */
  x?: string;
}

/** A single position held within a company entry that supports multiple roles. */
export interface Role {
  /** Job title for this role. */
  title: string;
  /** Human-readable employment period (e.g. "Oct 2025 – Feb 2026"). */
  period: string;
  /** Description of responsibilities and achievements in this role. */
  description: string;
  /** Optional list of technologies, tools, or frameworks used. */
  technologies?: string[];
}

/**
 * A work-experience entry representing one employer.
 * When `roles` is populated the entry renders an expandable multi-role view;
 * otherwise `position`, `period`, and `description` are used directly.
 */
export interface Experience {
  /** Unique identifier for the experience record. */
  id: number;
  /** Employer or organisation name. */
  company: string;
  /** Optional list of roles held at this company (multi-role view). */
  roles?: Role[];
  /** Overall job title for single-role entries. */
  position?: string;
  /** Overall employment period for this company. */
  period?: string;
  /** Brief overview description for the company entry. */
  description?: string;
  /** Technologies used across all roles at this company (single-role entries). */
  technologies?: string[];
  /** Optional sort order for display (ascending). */
  sort?: number;
}

/** An academic qualification entry displayed in the Education section. */
export interface Education {
  /** Unique identifier for the education record. */
  id: number;
  /** Degree or qualification name (e.g. "Bachelor of Science in Computer Science"). */
  degree: string;
  /** Awarding institution name. */
  institution: string;
  /** Study period (e.g. "2022 – 2025"). */
  period: string;
  /** Description of the programme and any notable outcomes. */
  description: string;
  /** Optional sort order for display (ascending). */
  sort?: number;
}

/** A grouping of related skills (reserved for future use). */
export interface SkillCategory {
  /** Unique identifier for the skill category. */
  id: number;
  /** Category label (e.g. "Frontend", "DevOps"). */
  name: string;
  /** Optional sort order for display (ascending). */
  sort?: number;
  /** Optional list of skills belonging to this category. */
  skills?: Skill[];
}

/** An individual skill entry (reserved for future use). */
export interface Skill {
  /** Unique identifier for the skill. */
  id: number;
  /** Skill name (e.g. "TypeScript"). */
  name: string;
  /** Optional proficiency level (e.g. "Expert", "Intermediate"). */
  level?: string;
  /** Optional ID of the parent `SkillCategory`. */
  category?: number;
  /** Optional sort order within the category (ascending). */
  sort?: number;
}