import {
  Card,
  Group,
  Avatar,
  Badge,
  Title,
  Text,
  Stack,
  Button,
} from "@mantine/core";
import {
  BriefcaseIcon as IconBriefcase,
  MapPinIcon as IconMapPin,
  ClockIcon as IconClock,
} from "lucide-react";

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

interface JobCardProps {
  job: JobListing;
  companyLogos: CompanyLogos;
}

export default function JobCard({ job, companyLogos }: JobCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p="md">
        <Group justify="apart">
          <Avatar
            src={
              companyLogos[job.companyName.toLowerCase()] ||
              "/placeholder.svg?height=80&width=80"
            }
            size="lg"
            radius="sm"
          />
          <Badge color="blue" variant="light">
            {new Date(job.createdAt).toLocaleDateString()}
          </Badge>
        </Group>
      </Card.Section>

      <Title order={4} mt="md" mb="xs">
        {job.title}
      </Title>

      <Group gap="xs" mb="md">
        <Badge variant="light" leftSection={<IconBriefcase size={12} />}>
          {job.jobType}
        </Badge>
        <Badge variant="light" leftSection={<IconMapPin size={12} />}>
          {job.location}
        </Badge>
        <Badge variant="light" leftSection={<IconClock size={12} />}>
          ₹{job.minSalary / 1000}k - ₹{job.maxSalary / 1000}k
        </Badge>
      </Group>

      <Stack gap={5} mb="xl">
        <Text size="sm" c="dimmed">
          • {job.description}
        </Text>
        {job.requirements && (
          <Text size="sm" c="dimmed">
            • {job.requirements}
          </Text>
        )}
      </Stack>

      <Button fullWidth radius="md" color="blue">
        Apply Now
      </Button>
    </Card>
  );
}
