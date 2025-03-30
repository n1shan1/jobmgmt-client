import {
  Modal,
  Title,
  Stack,
  Grid,
  Text,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Group,
  Button,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import {
  CalendarIcon as IconCalendar,
  ChevronDownIcon as IconChevronDown,
  UploadIcon as IconUpload,
} from "lucide-react";
import { DatePickerInput } from "@mantine/dates";

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

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: JobFormState) => Promise<void>;
}

export default function CreateJobModal({
  opened,
  onClose,
  onSubmit,
}: CreateJobModalProps) {
  const {
    control,
    handleSubmit,
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

  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
  );
}
