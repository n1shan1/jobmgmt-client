"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {
  AppShell,
  Burger,
  Group,
  Text,
  Title,
  Button,
  TextInput,
  Select,
  RangeSlider,
  Card,
  Avatar,
  Badge,
  Container,
  Grid,
  Modal,
  Stack,
  Textarea,
  NumberInput,
  Loader,
  Alert,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  SearchIcon as IconSearch,
  MapPinIcon as IconMapPin,
  BriefcaseIcon as IconBriefcase,
  CalendarIcon as IconCalendar,
  ClockIcon as IconClock,
  ChevronDownIcon as IconChevronDown,
  UploadIcon as IconUpload,
  AlertCircleIcon as IconAlertCircle,
} from "lucide-react";

// Define types
type CompanyKey = "amazon" | "tesla" | "swiggy" | string;

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

// Company logos
const companyLogos: CompanyLogos = {
  amazon: "/placeholder.svg?height=80&width=80",
  tesla: "/placeholder.svg?height=80&width=80",
  swiggy: "/placeholder.svg?height=80&width=80",
};

// API URL
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://jobmgmt-server.onrender.com";

// Form state types
interface JobFormState {
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

export default function JobBoard() {
  const [opened, { toggle }] = useDisclosure();
  const [createJobOpened, { open: openCreateJob, close: closeCreateJob }] =
    useDisclosure(false);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);

  // State for job listings
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Form setup using React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormState>({
    defaultValues: {
      title: "",
      companyName: "",
      location: null,
      jobType: null,
      minSalary: "",
      maxSalary: "",
      applicationDeadline: null,
      description: "",
      requirements: "",
      responsibilities: "",
    },
  });

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/jobs`);
        setJobListings(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch job listings");
        setLoading(false);
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search criteria
  useEffect(() => {
    let result = [...jobListings];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.companyName.toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (selectedLocation) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by job type
    if (selectedJobType) {
      result = result.filter((job) =>
        job.jobType.toLowerCase().includes(selectedJobType.toLowerCase())
      );
    }

    // Filter by salary range
    if (salaryRange) {
      result = result.filter((job) => {
        const minSalary = salaryRange[0] * 1000; // Convert to thousands
        const maxSalary = salaryRange[1] * 1000;
        return job.minSalary <= maxSalary && job.maxSalary >= minSalary;
      });
    }

    setFilteredJobs(result);
  }, [
    searchQuery,
    selectedLocation,
    selectedJobType,
    salaryRange,
    jobListings,
  ]);

  // Handle form submission
  const onSubmit = async (data: JobFormState) => {
    try {
      const formattedData = {
        ...data,
        applicationDeadline: data.applicationDeadline
          ? data.applicationDeadline.toISOString()
          : null,
      };

      await axios.post(`${API_URL}/jobs`, formattedData);

      // Refresh job listings
      const response = await axios.get(`${API_URL}/jobs`);
      setJobListings(response.data);

      // Close modal and reset form
      closeCreateJob();
      reset();
    } catch (err) {
      console.error("Error creating job:", err);
      // Here you could set an error state to display to the user
    }
  };

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 0,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Avatar
              src="/placeholder.svg?height=40&width=40"
              alt="Logo"
              size="md"
              radius="sm"
            />
            <Group gap={40} visibleFrom="sm">
              <Text fw={500}>Home</Text>
              <Text fw={500}>Find Jobs</Text>
              <Text fw={500}>Find Talents</Text>
              <Text fw={500}>About us</Text>
              <Text fw={500}>Testimonials</Text>
            </Group>
          </Group>
          <Button onClick={openCreateJob} radius="xl" size="md" color="violet">
            Create Jobs
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="xl">
          <Group mb="xl" grow>
            <TextInput
              placeholder="Search By Job Title, Role"
              leftSection={<IconSearch size={16} />}
              size="md"
              radius="md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <Select
              placeholder="Preferred Location"
              leftSection={<IconMapPin size={16} />}
              rightSection={<IconChevronDown size={16} />}
              size="md"
              radius="md"
              data={["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai"]}
              value={selectedLocation}
              onChange={setSelectedLocation}
            />
            <Select
              placeholder="Job type"
              leftSection={<IconBriefcase size={16} />}
              rightSection={<IconChevronDown size={16} />}
              size="md"
              radius="md"
              data={[
                "Full Time",
                "Part Time",
                "Contract",
                "Freelance",
                "Internship",
              ]}
              value={selectedJobType}
              onChange={setSelectedJobType}
            />
          </Group>

          <Group mb="xl" justify="apart" align="center">
            <Text fw={500}>Salary Per Month</Text>
            <Text fw={500}>
              ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
            </Text>
          </Group>

          <RangeSlider
            mb="xl"
            min={0}
            max={200}
            step={5}
            minRange={10}
            value={salaryRange}
            onChange={setSalaryRange}
            marks={[
              { value: 0, label: "₹0k" },
              { value: 50, label: "₹50k" },
              { value: 100, label: "₹100k" },
              { value: 150, label: "₹150k" },
              { value: 200, label: "₹200k" },
            ]}
          />

          {loading ? (
            <Group justify="center" py="xl">
              <Loader size="lg" />
            </Group>
          ) : error ? (
            <Alert
              color="red"
              icon={<IconAlertCircle size={16} />}
              title="Error"
              mb="md"
            >
              {error}
            </Alert>
          ) : filteredJobs.length === 0 ? (
            <Alert color="blue" title="No jobs found" mb="md">
              No job listings match your search criteria. Try adjusting your
              filters.
            </Alert>
          ) : (
            <Grid>
              {filteredJobs.map((job) => (
                <Grid.Col key={job.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
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
                      <Badge
                        variant="light"
                        leftSection={<IconBriefcase size={12} />}
                      >
                        {job.jobType}
                      </Badge>
                      <Badge
                        variant="light"
                        leftSection={<IconMapPin size={12} />}
                      >
                        {job.location}
                      </Badge>
                      <Badge
                        variant="light"
                        leftSection={<IconClock size={12} />}
                      >
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
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Container>

        {/* Create Job Modal with React Hook Form */}
        <Modal
          opened={createJobOpened}
          onClose={closeCreateJob}
          title={<Title order={3}>Create Job Opening</Title>}
          size="lg"
          centered
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <Grid>
                <Grid.Col span={6}>
                  <Stack gap="xs">
                    <Text fw={500}>Job Title</Text>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Title is required" }}
                      render={({ field }) => (
                        <TextInput
                          placeholder="Full Stack Developer"
                          {...field}
                          error={errors.title?.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack gap="xs">
                    <Text fw={500}>Company Name</Text>
                    <Controller
                      name="companyName"
                      control={control}
                      rules={{ required: "Company name is required" }}
                      render={({ field }) => (
                        <TextInput
                          placeholder="Amazon, Microsoft, Swiggy"
                          {...field}
                          error={errors.companyName?.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={6}>
                  <Stack gap="xs">
                    <Text fw={500}>Location</Text>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <Select
                          placeholder="Choose Preferred Location"
                          rightSection={<IconChevronDown size={16} />}
                          data={[
                            "Bangalore",
                            "Mumbai",
                            "Delhi",
                            "Hyderabad",
                            "Chennai",
                          ]}
                          {...field}
                          error={errors.location?.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack gap="xs">
                    <Text fw={500}>Job Type</Text>
                    <Controller
                      name="jobType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          placeholder="FullTime"
                          rightSection={<IconChevronDown size={16} />}
                          data={[
                            "FULL_TIME",
                            "PART_TIME",
                            "CONTRACT",
                            "FREELANCE",
                            "INTERNSHIP",
                          ]}
                          {...field}
                          error={errors.jobType?.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={6}>
                  <Stack gap="xs">
                    <Text fw={500}>Salary Range</Text>
                    <Group grow>
                      <Controller
                        name="minSalary"
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            placeholder="₹0"
                            leftSection="₹"
                            min={0}
                            {...field}
                            error={errors.minSalary?.message}
                          />
                        )}
                      />
                      <Controller
                        name="maxSalary"
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            placeholder="₹12,00,000"
                            leftSection="₹"
                            min={0}
                            {...field}
                            error={errors.maxSalary?.message}
                          />
                        )}
                      />
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack gap="xs">
                    <Text fw={500}>Application Deadline</Text>
                    <Controller
                      name="applicationDeadline"
                      control={control}
                      render={({ field }) => (
                        <DatePickerInput
                          placeholder="Select date"
                          rightSection={<IconCalendar size={16} />}
                          {...field}
                          error={errors.applicationDeadline?.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid.Col>
              </Grid>

              <Stack gap="xs">
                <Text fw={500}>Job Description</Text>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      placeholder="Please share a description to let the candidate know more about the job role"
                      minRows={3}
                      {...field}
                      error={errors.description?.message}
                    />
                  )}
                />
              </Stack>

              <Stack gap="xs">
                <Text fw={500}>Requirements</Text>
                <Controller
                  name="requirements"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      placeholder="Requirements for the job"
                      minRows={2}
                      {...field}
                      error={errors.requirements?.message}
                    />
                  )}
                />
              </Stack>

              <Stack gap="xs">
                <Text fw={500}>Responsibilities</Text>
                <Controller
                  name="responsibilities"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      placeholder="Key responsibilities for this role"
                      minRows={2}
                      {...field}
                      error={errors.responsibilities?.message}
                    />
                  )}
                />
              </Stack>

              <Group justify="right" mt="md">
                <Button
                  variant="outline"
                  rightSection={<IconChevronDown size={16} />}
                  type="button"
                  onClick={() => {
                    // Save draft functionality here
                    console.log("Draft saved");
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  color="blue"
                  rightSection={<IconUpload size={16} />}
                  type="submit"
                >
                  Publish
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </AppShell.Main>
    </AppShell>
  );
}
