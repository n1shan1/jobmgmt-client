import {
  Group,
  TextInput,
  Select,
  Text,
  RangeSlider,
  Divider,
} from "@mantine/core";
import {
  SearchIcon as IconSearch,
  MapPinIcon as IconMapPin,
  BriefcaseIcon as IconBriefcase,
  ChevronDownIcon as IconChevronDown,
  User2Icon,
  UserSearchIcon,
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
      <Group
        my={20}
        style={{
          paddingBottom: "30px",
        }}
        justify="space-between"
      >
        <TextInput
          placeholder="Search By Job Title, Role"
          leftSection={<IconSearch size={16} />}
          size="md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          variant="unstyled"
        />
        <Divider orientation="vertical" />
        <Select
          placeholder="Preferred Location"
          leftSection={<IconMapPin size={16} />}
          rightSection={<IconChevronDown size={16} />}
          size="md"
          data={["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai"]}
          value={selectedLocation}
          onChange={setSelectedLocation}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
            shadow: "md",
            radius: "md",
          }}
          variant="unstyled"
          searchable
        />
        <Divider orientation="vertical" />

        <Select
          placeholder="Job type"
          leftSection={<UserSearchIcon size={16} />}
          rightSection={<IconChevronDown size={16} />}
          size="md"
          radius="md"
          variant="unstyled"
          data={[
            { value: "FULL_TIME", label: "Full Time" },
            { value: "PART_TIME", label: "Part Time" },
            { value: "CONTRACT", label: "Contract" },
            { value: "FREELANCE", label: "Freelance" },
            { value: "INTERNSHIP", label: "Internship" },
          ]}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
            shadow: "md",
            radius: "md",
          }}
          value={selectedJobType}
          onChange={setSelectedJobType}
        />
        <Divider orientation="vertical" />

        <Group style={{ display: "flex", flexDirection: "column" }}>
          <Group
            justify="space-around"
            align="center"
            style={{ width: "100%" }}
          >
            <Text fw={500}>Salary Per Month</Text>
            <Text fw={500}>
              ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
            </Text>
          </Group>
          <RangeSlider
            variant="unstyled"
            py={2}
            style={{ width: "100%", color: "black" }}
            min={0}
            max={200}
            size={"sm"}
            step={5}
            minRange={0}
            color="black"
            value={salaryRange}
            onChange={setSalaryRange}
          />
        </Group>
      </Group>
    </>
  );
}
