"use client";

import {
  Card,
  Avatar,
  Badge,
  Title,
  Text,
  Stack,
  Group,
  Button,
} from "@mantine/core";
import { ClockIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";
import type { JobListing, CompanyLogos } from "@/types";

interface JobCardProps {
  job: JobListing;
  companyLogos: CompanyLogos;
  onApply: (jobId: number) => void;
}

export function JobCard({ job, companyLogos, onApply }: JobCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p="md">
        <Group align="apart">
          <Avatar src={companyLogos[job.company]} size="lg" radius="sm" />
          <Badge color="blue" variant="light">
            {job.postedAgo}
          </Badge>
        </Group>
      </Card.Section>

      <Title order={4} mt="md" mb="xs">
        {job.title}
      </Title>

      <Group gap="xs" mb="md">
        <Badge variant="light" leftSection={<ClockIcon size={12} />}>
          {job.experience}
        </Badge>
        <Badge variant="light" leftSection={<MapPinIcon size={12} />}>
          {job.location}
        </Badge>
        <Badge variant="light" leftSection={<BriefcaseIcon size={12} />}>
          {job.salary}
        </Badge>
      </Group>

      <Stack gap={5} mb="xl">
        {job.description.map((desc, index) => (
          <Text key={index} size="sm" color="dimmed">
            • {desc}
          </Text>
        ))}
      </Stack>

      <Button
        fullWidth
        radius="md"
        color="blue"
        onClick={() => onApply(job.id)}
      >
        Apply Now
      </Button>
    </Card>
  );
}
