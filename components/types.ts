// Shared types for the job board application

export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  minSalary: number;
  maxSalary: number;
  description: string;
  requirements?: string;
  responsibilities?: string;
  applicationDeadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyLogos {
  amazon: string;
  tesla: string;
  swiggy: string;
  [key: string]: string;
}

export interface JobFormState {
  title: string;
  companyName: string;
  location: string | null;
  jobType: string | null;
  minSalary: number | string;
  maxSalary: number | string;
  applicationDeadline: Date | null;
  description: string;
  requirements?: string;
  responsibilities?: string;
}
