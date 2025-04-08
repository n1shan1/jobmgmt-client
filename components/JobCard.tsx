import {
  Card,
  Avatar,
  Badge,
  Title,
  Group,
  Text,
  Stack,
  Button,
  Image,
  CardSection,
} from "@mantine/core";
import {
  BriefcaseIcon as IconBriefcase,
  MapPinIcon as IconMapPin,
  ClockIcon as IconClock,
  UserPlus2Icon,
  Layers2Icon,
  Building2Icon,
} from "lucide-react";
import { JobListing } from "../types";
import { companyLogos, LOGO } from "../assets/index";

interface JobCardProps {
  job: JobListing;
}

export default function JobCard({ job }: JobCardProps) {
  // Get the logo based on company name (case insensitive)
  const getCompanyLogo = (companyName: string) => {
    const normalizedName = companyName.toLowerCase();

    // Check if the company name exists as a key in companyLogos (case insensitive)
    const companyKey = Object.keys(companyLogos).find(
      (key) => key.toLowerCase() === normalizedName
    );

    // Return the found logo or placeholder if not found
    return companyKey
      ? companyLogos[companyKey as keyof typeof companyLogos]
      : LOGO;
  };

  const logo = getCompanyLogo(job.companyName);

  return (
    <Card shadow="lg" padding="lg" radius="lg">
      <Card.Section p="sm">
        <Group justify="space-between">
          <Image src={logo.src} height={80} width={80} radius="md" />
          <Badge
            style={{
              backgroundColor: "#B0D9FF",
              color: "black",
              borderRadius: "10px",
              paddingBlock: "15px",
            }}
          >
            {(() => {
              const createdAt = new Date(job.createdAt);
              const now = new Date();
              const diffMs = now.getTime() - createdAt.getTime();
              const diffSecs = Math.floor(diffMs / 1000);
              const diffMins = Math.floor(diffSecs / 60);
              const diffHours = Math.floor(diffMins / 60);
              const diffDays = Math.floor(diffHours / 24);
              const diffWeeks = Math.floor(diffDays / 7);
              const diffMonths = Math.floor(diffDays / 30);

              if (diffMonths > 0) return `${diffMonths}mo ago`;
              if (diffWeeks > 0) return `${diffWeeks}w ago`;
              if (diffDays > 0) return `${diffDays}d ago`;
              if (diffHours > 0) return `${diffHours}h ago`;
              if (diffMins > 0) return `${diffMins}m ago`;
              return "Just now";
            })()}
          </Badge>
        </Group>
      </Card.Section>

      <Title order={4} mt="md" mb="xs">
        {job.title}
      </Title>

      <Group
        mb="md"
        mx={0}
        px={0}
        gap="xs"
        wrap="nowrap"
        h={10}
        justify="space-around"
      >
        <h5
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserPlus2Icon
            stroke="gray"
            size={12}
            style={{ marginRight: "7px" }}
          />
          <p style={{ fontSize: "12px", color: "gray" }}>
            {job.requirements?.slice(0, 3) + " Yrs Exp"}
          </p>
        </h5>
        <h5
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Building2Icon
            stroke="gray"
            size={12}
            style={{ marginRight: "7px" }}
          />

          <p style={{ fontSize: "12px", color: "gray" }}>{job.location}</p>
        </h5>
        <h5
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Layers2Icon stroke="gray" size={12} style={{ marginRight: "7px" }} />
          <p style={{ fontSize: "12px", color: "gray" }}>
            {job.maxSalary / 10000 + " LPA"}
          </p>
        </h5>
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

      <Button
        variant="filled"
        radius={"md"}
        h={45}
        color="#00AAFF"
        fullWidth

        // style={{
        //   paddingBlock: "22px",
        //   borderRadius: "10px",
        //   backgroundColor: "#00AAFF",
        // }}
      >
        Apply Now
      </Button>
    </Card>
  );
}
