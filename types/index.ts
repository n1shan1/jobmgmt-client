// Job-related types
export type CompanyKey = "amazon" | "tesla" | "swiggy";

export interface JobListing {
  id: number;
  title: string;
  company: CompanyKey;
  experience: string;
  location: string;
  salary: string;
  postedAgo: string;
  description: string[];
}

export interface CompanyLogos {
  amazon: string;
  tesla: string;
  swiggy: string;
}

// Form state types
export interface JobFormState {
  title: string;
  company: string;
  location: string | null;
  jobType: string | null;
  salaryMin: number | string;
  salaryMax: number | string;
  deadline: Date | null;
  description: string;
}

// Filter state types
export interface FilterState {
  searchQuery: string;
  location: string | null;
  jobType: string | null;
  salaryRange: [number, number];
}
