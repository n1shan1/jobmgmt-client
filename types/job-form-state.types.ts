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
