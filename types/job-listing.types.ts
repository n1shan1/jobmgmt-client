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
