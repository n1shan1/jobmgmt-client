import { Group, TextInput, Select, Text, RangeSlider } from "@mantine/core";
import {
  SearchIcon as IconSearch,
  MapPinIcon as IconMapPin,
  BriefcaseIcon as IconBriefcase,
  ChevronDownIcon as IconChevronDown,
} from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  selectedJobType: string | null;
  setSelectedJobType: (jobType: string | null) => void;
  salaryRange: [number, number];
  setSalaryRange: (range: [number, number]) => void;
}

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedJobType,
  setSelectedJobType,
  salaryRange,
  setSalaryRange,
}: SearchFiltersProps) {
  return (
    <>
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
    </>
  );
}
