import {
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Notification,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import {
  ChevronsDown,
  ChevronsRight,
  CalendarIcon as IconCalendar,
  ChevronDownIcon as IconChevronDown,
  CheckCircle,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { API_URL } from "../assets/index";
import { JobFormState } from "../types";
import { useState, useEffect } from "react";

interface JobFormProps {
  onClose: () => void;
  onJobCreated: () => void;
}

const DRAFT_STORAGE_KEY = "job-form-draft";

export default function JobForm({ onClose, onJobCreated }: JobFormProps) {
  const [draftSaved, setDraftSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
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

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);

    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);

        // Handle date conversion for applicationDeadline
        if (parsedDraft.applicationDeadline) {
          parsedDraft.applicationDeadline = new Date(
            parsedDraft.applicationDeadline
          );
        }

        // Apply draft values to form
        Object.keys(parsedDraft).forEach((key) => {
          setValue(key as keyof JobFormState, parsedDraft[key]);
        });
      } catch (err) {
        console.error("Error loading draft:", err);
      }
    }
  }, [setValue]);

  const saveDraft = () => {
    try {
      const currentValues = getValues();
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(currentValues));
      setDraftSaved(true);

      // Reset notification after 3 seconds
      setTimeout(() => {
        setDraftSaved(false);
      }, 3000);
    } catch (err) {
      console.error("Error saving draft:", err);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  const onSubmit = async (data: JobFormState) => {
    try {
      console.log("Function Called");
      const formattedData = {
        ...data,
        applicationDeadline: data.applicationDeadline
          ? data.applicationDeadline.toISOString()
          : null,
      };

      await axios.post(`${API_URL}/jobs`, formattedData);

      // Clear draft after successful submission
      clearDraft();

      // Close modal and reset form
      onJobCreated();
      onClose();
      reset();
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack p={"lg"} gap="md">
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
                    radius={"md"}
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
                    radius={"md"}
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
                    radius={"md"}
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
                    placeholder="Select job type"
                    rightSection={<IconChevronDown size={16} />}
                    radius={"md"}
                    data={[
                      { value: "FULL_TIME", label: "Full Time" },
                      { value: "PART_TIME", label: "Part Time" },
                      { value: "CONTRACT", label: "Contract" },
                      { value: "FREELANCE", label: "Freelance" },
                      { value: "INTERNSHIP", label: "Internship" },
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
                      radius={"md"}
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
                      radius={"md"}
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
                    radius={"md"}
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
                radius={"md"}
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
                radius={"md"}
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
                radius={"md"}
                placeholder="Key responsibilities for this role"
                minRows={2}
                {...field}
                error={errors.responsibilities?.message}
              />
            )}
          />
        </Stack>

        <Group justify="space-between" mt="md" style={{ display: "flex" }}>
          <Button
            radius={"md"}
            variant="outline"
            rightSection={<ChevronsDown size={16} />}
            type="button"
            onClick={saveDraft}
            w={"40%"}
            h={"50px"}
          >
            Save Draft
          </Button>
          <Button
            radius={"md"}
            color="blue"
            rightSection={<ChevronsRight size={16} />}
            type="submit"
            w={"40%"}
            h={"50px"}
          >
            Publish
          </Button>
        </Group>

        {draftSaved && (
          <Notification
            icon={<CheckCircle size={18} />}
            color="teal"
            title="Draft saved"
            onClose={() => setDraftSaved(false)}
          >
            Your job post draft has been saved locally
          </Notification>
        )}
      </Stack>
    </form>
  );
}
