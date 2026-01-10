export interface Resume {
  header: {
    name: string;
    email: string;
    linkedin: string;
    portfolio?: string;
    location: string;
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
}
