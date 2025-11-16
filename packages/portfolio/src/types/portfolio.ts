// Const enums for type safety
export const ExperienceType = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
  CONTRACT: "Contract",
} as const;

export type ExperienceTypeValue =
  (typeof ExperienceType)[keyof typeof ExperienceType];

export const CertificationStatus = {
  COMPLETED: "completed",
  PURSUING: "pursuing",
  PLANNED: "planned",
} as const;

export type CertificationStatusValue =
  (typeof CertificationStatus)[keyof typeof CertificationStatus];

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  bio: string;
  avatar: string;
  availability: {
    isAvailable: boolean;
    message: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  type: ExperienceTypeValue;
  highlights: string[];
  technologies: string[];
  // These are auto-calculated
  period?: string;
  current?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  technologies: string[];
  github: string | null;
  demo: string | null;
  featured: boolean;
  date: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  [category: string]: Skill[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  track?: string;
  current: boolean;
}

export interface Certification {
  name: string;
  status: CertificationStatusValue;
}

export interface PortfolioData {
  personal: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory;
  education: Education[];
  certifications: Certification[];
  interests: string[];
}
