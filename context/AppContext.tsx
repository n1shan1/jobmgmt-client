import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { JobListing } from "../types";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";

interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  salaryRange: [number, number];
  setSalaryRange: (range: [number, number]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  selectedJobType: string | null;
  setSelectedJobType: (jobType: string | null) => void;
  jobListings: JobListing[];
  setJobListings: (listings: JobListing[]) => void;
  filteredJobs: JobListing[];
  setFilteredJobs: (listings: JobListing[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  fetchJobs: () => Promise<void>;
  opened: boolean;
  createJobOpened: boolean;
  toggle: () => void;

  openCreateJob: () => void;
  closeCreateJob: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);

  // State for job listings
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [opened, { toggle }] = useDisclosure();
  const [createJobOpened, { open: openCreateJob, close: closeCreateJob }] =
    useDisclosure(false);
  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/jobs`);
      setJobListings(response.data);
      setFilteredJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch job listings");
      setLoading(false);
      console.error("Error fetching jobs:", err);
    }
  };
  useEffect(() => {
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

  const value = {
    user,
    setUser,
    salaryRange,
    setSalaryRange,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedJobType,
    setSelectedJobType,
    jobListings,
    setJobListings,
    filteredJobs,
    setFilteredJobs,
    loading,
    setLoading,
    error,
    setError,
    fetchJobs,
    opened,
    createJobOpened,
    openCreateJob,
    closeCreateJob,
    toggle,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export default AppContext;
