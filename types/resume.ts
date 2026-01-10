export interface CustomSectionItem {
  title: string;
  subtitle?: string;
  date?: string;
  bullets: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
  visible: boolean;
}

export interface Resume {
  header: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    portfolio: string;
  };

  summary: string;

  education: {
    institution: string;
    degree: string;
    location: string;
    dates: string;
    bullets: string[];
  }[];

  experience: {
    role: string;
    company: string;
    location: string;
    dates: string;
    bullets: string[];
  }[];

  projects: {
    title: string;
    tech: string;
    dates: string;
    bullets: string[];
  }[];

  skills: {
    programming: string[];
    design: string[];
    tools: string[];
  };

  customSections: CustomSection[];
}
