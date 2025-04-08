"use client";

import {
  Alert,
  AppShell,
  Container,
  Grid,
  Group,
  Loader,
  Modal,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AlertCircleIcon as IconAlertCircle } from "lucide-react";

// Import types and constants

// Import components
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
import NavBar from "../components/NavBar";
import SearchFilters from "../components/SearchFilters";
import { useAppContext } from "../context/AppContext";

export default function JobBoard() {
  const {
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
    toggle,
    openCreateJob,
    closeCreateJob,
  } = useAppContext();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 0,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          width: "60%",
          margin: "0 auto",
          borderRadius: "100px",
          marginTop: "20px",
          position: "absolute",
        }}
        display={"inline-block"}
      >
        <NavBar />
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="xl">
          <SearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedJobType={selectedJobType}
            setSelectedJobType={setSelectedJobType}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
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
              {filteredJobs
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((job) => (
                  <Grid.Col
                    key={job.id}
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <JobCard job={job} />
                  </Grid.Col>
                ))}
            </Grid>
          )}
        </Container>

        {/* Create Job Modal */}
        <Modal
          opened={createJobOpened}
          onClose={closeCreateJob}
          title={
            <div>
              <Title
                p={"md"}
                order={2}
                ta="center"
                style={{ width: "100%", textAlign: "center" }}
              >
                Create Job Opening
              </Title>
            </div>
          }
          size="lg"
          centered
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          radius={"lg"}
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <JobForm onClose={closeCreateJob} onJobCreated={fetchJobs} />
        </Modal>
      </AppShell.Main>
    </AppShell>
  );
}
