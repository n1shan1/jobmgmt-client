import { Grid, Group, Loader, Alert } from "@mantine/core";
import { AlertCircleIcon as IconAlertCircle } from "lucide-react";
import JobCard from "./JobCard";

// Import types
interface JobListing {
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

interface CompanyLogos {
  amazon: string;
  tesla: string;
  swiggy: string;
  [key: string]: string;
}

interface JobListingsProps {
  loading: boolean;
  error: string | null;
  filteredJobs: JobListing[];
  companyLogos: CompanyLogos;
}

export default function JobListings({
  loading,
  error,
  filteredJobs,
  companyLogos,
}: JobListingsProps) {
  if (loading) {
    return (
      <Group justify="center" py="xl">
        <Loader size="lg" />
      </Group>
    );
  }

  if (error) {
    return (
      <Alert
        color="red"
        icon={<IconAlertCircle size={16} />}
        title="Error"
        mb="md"
      >
        {error}
      </Alert>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <Alert color="blue" title="No jobs found" mb="md">
        No job listings match your search criteria. Try adjusting your filters.
      </Alert>
    );
  }

  return (
    <Grid>
      {filteredJobs.map((job) => (
        <Grid.Col key={job.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <JobCard job={job} companyLogos={companyLogos} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
