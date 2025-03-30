"use client";

import { useState } from "react";
import {
  Grid,
  Stack,
  Text,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Group,
  Button,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { ChevronDownIcon, UploadIcon, CalendarIcon } from "lucide-react";
import type { JobFormState } from "../types";

interface CreateJobFormProps {
  onSubmit: (formData: JobFormState) => void;
  onSaveDraft: (formData: JobFormState) => void;
}

export function CreateJobForm({ onSubmit, onSaveDraft }: CreateJobFormProps) {
  const [formState, setFormState] = useState<JobFormState>({
    title: "",
    company: "",
    location: null,
    jobType: null,
    salaryMin: "",
    salaryMax: "",
    deadline: null,
    description: "",
  });

  const handleChange = (field: keyof JobFormState, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Stack gap="md">
      <Grid>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={500}>Job Title</Text>
            <TextInput
              placeholder="Full Stack Developer"
              value={formState.title}
              onChange={(e) => handleChange("title", e.currentTarget.value)}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={500}>Company Name</Text>
            <TextInput
              placeholder="Amazon, Microsoft, Swiggy"
              value={formState.company}
              onChange={(e) => handleChange("company", e.currentTarget.value)}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={500}>Location</Text>
            <Select
              placeholder="Choose Preferred Location"
              rightSection={<ChevronDownIcon size={16} />}
              data={["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai"]}
              value={formState.location}
              onChange={(value) => handleChange("location", value)}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={500}>Job Type</Text>
            <Select
              placeholder="FullTime"
              rightSection={<ChevronDownIcon size={16} />}
              data={[
                "Full Time",
                "Part Time",
                "Contract",
                "Freelance",
                "Internship",
              ]}
              value={formState.jobType}
              onChange={(value) => handleChange("jobType", value)}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={500}>Salary Range</Text>
            <Group grow>
              <NumberInput
                placeholder="₹0"
                leftSection="₹"
                min={0}
                value={formState.salaryMin}
                onChange={(value) => handleChange("salaryMin", value)}
              />
              <NumberInput
                placeholder="₹12,00,000"
                leftSection="₹"
                min={0}
                value={formState.salaryMax}
                onChange={(value) => handleChange("salaryMax", value)}
              />
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={500}>Application Deadline</Text>
            <DatePickerInput
              placeholder="Select date"
              rightSection={<CalendarIcon size={16} />}
              value={formState.deadline}
              onChange={(value) => handleChange("deadline", value)}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      <Stack gap="xs">
        <Text fw={500}>Job Description</Text>
        <Textarea
          placeholder="Please share a description to let the candidate know more about the job role"
          minRows={5}
          value={formState.description}
          onChange={(e) => handleChange("description", e.currentTarget.value)}
        />
      </Stack>

      <Group justify="right" mt="md">
        <Button
          variant="outline"
          rightSection={<ChevronDownIcon size={16} />}
          onClick={() => onSaveDraft(formState)}
        >
          Save Draft
        </Button>
        <Button
          color="blue"
          rightSection={<UploadIcon size={16} />}
          onClick={() => onSubmit(formState)}
        >
          Publish
        </Button>
      </Group>
    </Stack>
  );
}
